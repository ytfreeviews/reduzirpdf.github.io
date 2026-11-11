import { pdfjsLib } from './pdfWorkerConfig';
import { formatBytes, validatePdfSignature } from './fileUtils';
import { PDFInspectionResult } from '../types';

/**
 * Inspeciona o arquivo PDF localmente no navegador sem enviar a nenhum servidor.
 */
export async function inspectPdfFile(file: File): Promise<PDFInspectionResult> {
  const result: PDFInspectionResult = {
    fileName: file.name,
    fileSizeBytes: file.size,
    formattedFileSize: formatBytes(file.size),
    pageCount: 0,
    isEncrypted: false,
    dimensions: {
      width: 0,
      height: 0,
      orientation: 'portrait'
    },
    hasImageContent: false,
    isValidPdf: false
  };

  // 1. Validação básica de extensão e tamanho
  const lowerName = file.name.toLowerCase();
  if (!lowerName.endsWith('.pdf')) {
    result.error = 'O arquivo selecionado não possui a extensão .pdf válida.';
    return result;
  }

  if (file.size === 0) {
    result.error = 'O arquivo está vazio (0 bytes).';
    return result;
  }

  // 2. Validação da assinatura mágica %PDF-
  const isSignatureValid = await validatePdfSignature(file);
  if (!isSignatureValid) {
    result.error = 'O arquivo selecionado não parece ser um PDF válido ou está corrompido (cabeçalho %PDF ausente).';
    return result;
  }

  // 3. Leitura e inspeção via PDF.js
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useWorkerFetch: false,
      useSystemFonts: true
    });

    // Tratamento para PDFs protegidos por senha
    loadingTask.onPassword = () => {
      throw new Error('PASSWORD_PROTECTED');
    };

    const pdfDoc = await loadingTask.promise;
    result.pageCount = pdfDoc.numPages;
    result.isValidPdf = true;

    // Inspecionar dimensões da primeira página
    if (pdfDoc.numPages > 0) {
      const firstPage = await pdfDoc.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1.0 });
      result.dimensions = {
        width: Math.round(viewport.width),
        height: Math.round(viewport.height),
        orientation: viewport.width > viewport.height ? 'landscape' : 'portrait'
      };

      // Inspecionar operadores para detectar imagens
      try {
        const ops = await firstPage.getOperatorList();
        // Em PDF.js, paintImageXObject ou paintInlineImageXObject indicam conteúdo de imagem
        const hasImages = ops.fnArray.some(
          (fn) => fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject
        );
        result.hasImageContent = hasImages;
      } catch {
        // Fallback silencioso se operador falhar
        result.hasImageContent = true;
      }
    }

    return result;
  } catch (err: unknown) {
    const error = err as Error;
    if (error?.message === 'PASSWORD_PROTECTED' || error?.name === 'PasswordException') {
      result.isEncrypted = true;
      result.error = 'Este arquivo PDF está protegido por senha. Remova a proteção antes de comprimir.';
      return result;
    }

    result.error = 'Não foi possível ler o PDF. O arquivo pode estar corrompido ou ter formato incompatível.';
    return result;
  }
}
