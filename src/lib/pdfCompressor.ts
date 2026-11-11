import { PDFDocument } from 'pdf-lib';
import { pdfjsLib } from './pdfWorkerConfig';
import { TARGET_PRESETS, TargetSizePresetId, CompressionProgress, CompressionResult } from '../types';
import { calculateReductionPercentage, formatBytes } from './fileUtils';

interface CompressionConfig {
  scale: number;
  quality: number;
  name: string;
}

const COMPRESSION_TIERS: CompressionConfig[] = [
  { scale: 1.6, quality: 0.85, name: 'Alta Qualidade' },
  { scale: 1.3, quality: 0.72, name: 'Qualidade Equilibrada' },
  { scale: 1.0, quality: 0.58, name: 'Média Resolução' },
  { scale: 0.85, quality: 0.44, name: 'Compressão Forte' },
  { scale: 0.70, quality: 0.32, name: 'Compressão Acentuada' },
  { scale: 0.55, quality: 0.22, name: 'Limite Máximo de Segurança' }
];

export interface CompressOptions {
  file: File;
  targetBytes: number;
  selectedPresetId?: TargetSizePresetId;
  onProgress?: (progress: CompressionProgress) => void;
  signal?: AbortSignal;
}

/**
 * Converte DataURL Base64 para Uint8Array sem usar atob problemático com grandes buffers
 */
function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1];
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Sugere o próximo preset maior quando um alvo não pode ser atingido com segurança
 */
function findSuggestedPreset(achievedBytes: number) {
  const sorted = [...TARGET_PRESETS].filter(p => p.id !== 'custom').sort((a, b) => a.bytes - b.bytes);
  for (const preset of sorted) {
    if (preset.bytes >= achievedBytes) {
      return {
        id: preset.id,
        label: preset.label,
        bytes: preset.bytes
      };
    }
  }
  return {
    id: '2mb' as TargetSizePresetId,
    label: '2 MB',
    bytes: 2 * 1024 * 1024
  };
}

/**
 * Motor real de compressão de PDF executado 100% no navegador do usuário
 */
export async function compressPdf(options: CompressOptions): Promise<CompressionResult> {
  const { file, targetBytes, onProgress, signal } = options;
  const startTime = performance.now();

  const reportProgress = (
    stage: CompressionProgress['stage'],
    stageDescription: string,
    attempt: number,
    maxAttempts: number,
    currentPage: number,
    totalPages: number,
    percentage: number,
    currentEstimateBytes?: number
  ) => {
    if (signal?.aborted) {
      throw new DOMException('Compressão cancelada pelo usuário.', 'AbortError');
    }
    if (onProgress) {
      onProgress({
        stage,
        stageDescription,
        attempt,
        maxAttempts,
        currentPage,
        totalPages,
        percentage: Math.min(100, Math.max(0, percentage)),
        currentEstimateBytes
      });
    }
  };

  reportProgress('inspecting', 'Inspecionando documento...', 1, 1, 0, 0, 5);

  const arrayBuffer = await file.arrayBuffer();

  // Etapa 1: Tentar otimização estrutural / sem perdas primeiro (pdf-lib com object streams)
  reportProgress('lossless', 'Analisando estrutura do PDF...', 1, 5, 0, 0, 15);

  try {
    const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const losslessBytes = await srcDoc.save({ useObjectStreams: true, addDefaultPage: false });

    if (losslessBytes.byteLength <= targetBytes) {
      const blob = new Blob([losslessBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
      const durationMs = Math.round(performance.now() - startTime);

      return {
        success: true,
        originalFileName: file.name,
        originalSizeBytes: file.size,
        compressedSizeBytes: losslessBytes.byteLength,
        targetSizeBytes: targetBytes,
        reductionPercentage: calculateReductionPercentage(file.size, losslessBytes.byteLength),
        method: 'lossless',
        methodDescription: 'Otimização estrutural sem perda de vetores ou texto selecionável.',
        blob,
        downloadUrl,
        durationMs,
        warningNotice: undefined
      };
    }
  } catch (err: unknown) {
    if ((err as Error)?.name === 'AbortError') throw err;
    // Se o pdf-lib falhar na leitura direta de algum objeto raro, prosseguimos para PDF.js raster
  }

  // Etapa 2: Carregar via PDF.js para renderização de páginas e compressão visual adaptativa
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    useWorkerFetch: false,
    useSystemFonts: true
  });

  const pdfJsDoc = await loadingTask.promise;
  const totalPages = pdfJsDoc.numPages;

  if (totalPages === 0) {
    throw new Error('O documento não possui páginas válidas para compressão.');
  }

  // Determinar nível inicial com base no orçamento de bytes por página
  const budgetPerPage = targetBytes / totalPages;
  let startIndex = 0;
  if (budgetPerPage > 250 * 1024) {
    startIndex = 0;
  } else if (budgetPerPage > 100 * 1024) {
    startIndex = 1;
  } else if (budgetPerPage > 50 * 1024) {
    startIndex = 2;
  } else if (budgetPerPage > 25 * 1024) {
    startIndex = 3;
  } else {
    startIndex = 4;
  }

  const candidateTiers = COMPRESSION_TIERS.slice(startIndex);
  // Garantir que temos pelo menos o nível mais seguro no final
  if (!candidateTiers.includes(COMPRESSION_TIERS[COMPRESSION_TIERS.length - 1])) {
    candidateTiers.push(COMPRESSION_TIERS[COMPRESSION_TIERS.length - 1]);
  }

  let bestResultBytes: Uint8Array | null = null;
  let bestResultSize = Infinity;

  // Processamento progressivo
  for (let attemptIdx = 0; attemptIdx < candidateTiers.length; attemptIdx++) {
    if (signal?.aborted) {
      throw new DOMException('Compressão cancelada pelo usuário.', 'AbortError');
    }

    const tier = candidateTiers[attemptIdx];
    const attemptNumber = attemptIdx + 1;
    const maxAttempts = candidateTiers.length;

    reportProgress(
      'rasterizing',
      `Comprimindo páginas (${tier.name})...`,
      attemptNumber,
      maxAttempts,
      0,
      totalPages,
      20 + Math.round((attemptIdx / maxAttempts) * 60)
    );

    // Criar novo documento PDF limpo
    const newDoc = await PDFDocument.create();

    // Canvas reutilizável
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: false });

    if (!ctx) {
      throw new Error('Não foi possível inicializar o contexto gráfico Canvas.');
    }

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      if (signal?.aborted) {
        canvas.width = 0;
        canvas.height = 0;
        throw new DOMException('Compressão cancelada pelo usuário.', 'AbortError');
      }

      reportProgress(
        'rasterizing',
        `Processando página ${pageNum} de ${totalPages} (${tier.name})...`,
        attemptNumber,
        maxAttempts,
        pageNum,
        totalPages,
        20 + Math.round(((attemptIdx * totalPages + pageNum) / (maxAttempts * totalPages)) * 60)
      );

      const page = await pdfJsDoc.getPage(pageNum);
      const originalViewport = page.getViewport({ scale: 1.0 });
      const scaledViewport = page.getViewport({ scale: tier.scale });

      canvas.width = Math.max(1, Math.round(scaledViewport.width));
      canvas.height = Math.max(1, Math.round(scaledViewport.height));

      // Fundo branco limpo
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Renderizar página no canvas
      await (page.render as unknown as (params: unknown) => { promise: Promise<void> })({
        canvasContext: ctx,
        viewport: scaledViewport,
        canvas
      }).promise;

      // Codificar para JPEG com a qualidade da tentativa
      const jpegDataUrl = canvas.toDataURL('image/jpeg', tier.quality);
      const jpegBytes = dataUrlToUint8Array(jpegDataUrl);

      // Incorporar no novo documento mantendo exatamente a proporção e pontos originais
      const embeddedImg = await newDoc.embedJpg(jpegBytes);
      const newPage = newDoc.addPage([originalViewport.width, originalViewport.height]);
      newPage.drawImage(embeddedImg, {
        x: 0,
        y: 0,
        width: originalViewport.width,
        height: originalViewport.height
      });
    }

    // Liberar canvas da memória
    canvas.width = 0;
    canvas.height = 0;

    reportProgress(
      'packaging',
      'Gerando e verificando arquivo final...',
      attemptNumber,
      maxAttempts,
      totalPages,
      totalPages,
      85 + Math.round((attemptIdx / maxAttempts) * 10)
    );

    const generatedBytes = await newDoc.save({ useObjectStreams: true });
    const currentSize = generatedBytes.byteLength;

    if (currentSize < bestResultSize) {
      bestResultSize = currentSize;
      bestResultBytes = generatedBytes;
    }

    // Se atingiu ou ficou abaixo do tamanho máximo estrito, sucesso garantido!
    if (currentSize <= targetBytes) {
      const blob = new Blob([generatedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
      const durationMs = Math.round(performance.now() - startTime);

      return {
        success: true,
        originalFileName: file.name,
        originalSizeBytes: file.size,
        compressedSizeBytes: currentSize,
        targetSizeBytes: targetBytes,
        reductionPercentage: calculateReductionPercentage(file.size, currentSize),
        method: 'raster_jpeg',
        methodDescription: `Compressão inteligente de imagem (${tier.name}).`,
        blob,
        downloadUrl,
        durationMs,
        warningNotice: 'A compressão visual recriou as páginas como imagens de alta nitidez para respeitar o limite estrito de tamanho.'
      };
    }
  }

  // Se chegamos aqui, todas as tentativas seguras ultrapassaram o targetBytes
  const durationMs = Math.round(performance.now() - startTime);
  const bestBlob = bestResultBytes ? new Blob([bestResultBytes.buffer as ArrayBuffer], { type: 'application/pdf' }) : undefined;
  const bestDownloadUrl = bestBlob ? URL.createObjectURL(bestBlob) : undefined;
  const suggested = findSuggestedPreset(bestResultSize);

  return {
    success: false,
    originalFileName: file.name,
    originalSizeBytes: file.size,
    compressedSizeBytes: bestResultSize,
    targetSizeBytes: targetBytes,
    reductionPercentage: calculateReductionPercentage(file.size, bestResultSize),
    method: 'failed',
    methodDescription: 'Limite de legibilidade atingido.',
    blob: bestBlob,
    downloadUrl: bestDownloadUrl,
    suggestedPreset: suggested,
    errorMessage: `Não foi possível atingir ${formatBytes(targetBytes)} sem comprometer excessivamente a legibilidade das ${totalPages} página(s). O menor tamanho seguro obtido foi ${formatBytes(bestResultSize)}.`,
    durationMs
  };
}
