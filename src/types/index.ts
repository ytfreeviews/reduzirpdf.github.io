export type TargetSizePresetId = '100kb' | '200kb' | '500kb' | '1mb' | '2mb' | 'custom';

export interface TargetPreset {
  id: TargetSizePresetId;
  label: string;
  bytes: number; // in bytes (1 KB = 1024 bytes)
  description: string;
  recommendedFor?: string;
}

export const TARGET_PRESETS: TargetPreset[] = [
  {
    id: '100kb',
    label: '100 KB',
    bytes: 100 * 1024,
    description: 'Máxima redução. Ideal para tribunais, órgãos públicos e portais com limite de 100 KB.',
    recommendedFor: 'Tribunais, TJ, e-SAJ e portais estaduais'
  },
  {
    id: '200kb',
    label: '200 KB',
    bytes: 200 * 1024,
    description: 'Equilíbrio para documentos escaneados e formulários digitais.',
    recommendedFor: 'INSS, Prouni, SISU e portais do governo'
  },
  {
    id: '500kb',
    label: '500 KB',
    bytes: 500 * 1024,
    description: 'Excelente nitidez. Recomendado para currículos e formulários de RH.',
    recommendedFor: 'Currículos, RH, Gupy, vagas de emprego'
  },
  {
    id: '1mb',
    label: '1 MB',
    bytes: 1 * 1024 * 1024,
    description: 'Alta legibilidade para relatórios, contratos e anexos de e-mail.',
    recommendedFor: 'Envio por e-mail, contratos e relatórios'
  },
  {
    id: '2mb',
    label: '2 MB',
    bytes: 2 * 1024 * 1024,
    description: 'Mantém quase a qualidade original com redução de fotos pesadas.',
    recommendedFor: 'Apresentações e portfólios'
  },
  {
    id: 'custom',
    label: 'Personalizado',
    bytes: 300 * 1024,
    description: 'Defina exatamente o tamanho máximo que você precisa em KB ou MB.',
    recommendedFor: 'Limites específicos de sistemas'
  }
];

export interface PDFInspectionResult {
  fileName: string;
  fileSizeBytes: number;
  formattedFileSize: string;
  pageCount: number;
  isEncrypted: boolean;
  dimensions: {
    width: number;
    height: number;
    orientation: 'portrait' | 'landscape' | 'mixed';
  };
  hasImageContent: boolean;
  isValidPdf: boolean;
  error?: string;
}

export type CompressionStage = 
  | 'idle'
  | 'inspecting'
  | 'lossless'
  | 'rasterizing'
  | 'packaging'
  | 'verifying'
  | 'done'
  | 'error';

export interface CompressionProgress {
  stage: CompressionStage;
  stageDescription: string;
  attempt: number;
  maxAttempts: number;
  currentPage: number;
  totalPages: number;
  percentage: number;
  currentEstimateBytes?: number;
}

export interface CompressionResult {
  success: boolean;
  originalFileName: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  targetSizeBytes: number;
  reductionPercentage: number;
  method: 'lossless' | 'raster_jpeg' | 'failed';
  methodDescription: string;
  blob?: Blob;
  downloadUrl?: string;
  suggestedPreset?: {
    id: TargetSizePresetId;
    label: string;
    bytes: number;
  };
  errorMessage?: string;
  durationMs: number;
  warningNotice?: string;
}
