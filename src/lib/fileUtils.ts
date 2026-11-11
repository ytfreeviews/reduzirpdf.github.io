/**
 * Utilitários de arquivo e cálculo de tamanho seguindo estritamente:
 * 1 KB = 1024 bytes
 * 1 MB = 1024 * 1024 bytes = 1.048.576 bytes
 * Notação brasileira com vírgula para casas decimais.
 */

export const KB = 1024;
export const MB = 1024 * 1024;

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 KB';
  if (bytes < KB) {
    return `${bytes} B`;
  }
  if (bytes < MB) {
    const kb = bytes / KB;
    return `${kb.toFixed(decimals).replace('.', ',')} KB`;
  }
  const mb = bytes / MB;
  return `${mb.toFixed(decimals).replace('.', ',')} MB`;
}

/**
 * Validação rigorosa de cabeçalho PDF (%PDF-)
 */
export async function validatePdfSignature(file: File | Blob): Promise<boolean> {
  try {
    const slice = file.slice(0, 8);
    const arrayBuffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const header = String.fromCharCode(...bytes);
    return header.startsWith('%PDF-');
  } catch {
    return false;
  }
}

/**
 * Cálculo seguro de percentual de redução
 */
export function calculateReductionPercentage(originalBytes: number, compressedBytes: number): number {
  if (originalBytes <= 0 || compressedBytes >= originalBytes) {
    return 0;
  }
  const reduction = ((originalBytes - compressedBytes) / originalBytes) * 100;
  return Math.round(reduction * 10) / 10;
}

/**
 * Baixar arquivo para o computador ou celular
 */
export function triggerFileDownload(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
