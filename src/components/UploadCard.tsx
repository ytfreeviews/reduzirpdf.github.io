import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle, Sparkles, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { PDFInspectionResult } from '../types';

interface UploadCardProps {
  inspection: PDFInspectionResult | null;
  isLoadingFile: boolean;
  onFileSelected: (file: File, inspection: PDFInspectionResult) => void;
  onReset: () => void;
  disabled?: boolean;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  inspection,
  isLoadingFile,
  onFileSelected,
  onReset,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingSample, setIsGeneratingSample] = useState(false);

  const handleProcessFile = async (file: File) => {
    setLocalError(null);

    // Validação de tipo rápida no cliente
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setLocalError('Por favor, selecione um arquivo no formato PDF (.pdf).');
      return;
    }

    setIsProcessing(true);
    try {
      const { inspectPdfFile } = await import('../lib/pdfInspector');
      const inspectRes = await inspectPdfFile(file);
      if (!inspectRes.isValidPdf || inspectRes.error) {
        setLocalError(inspectRes.error || 'Não foi possível ler este arquivo PDF.');
        return;
      }

      onFileSelected(file, inspectRes);
    } catch {
      setLocalError('Ocorreu um erro ao inspecionar o PDF. Tente outro arquivo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || isLoadingFile || isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const onDragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isLoadingFile && !isProcessing) {
      setIsDragOver(true);
    }
  };

  const onDragLeaveHandler = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleSampleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || isLoadingFile || isGeneratingSample || isProcessing) return;
    setIsGeneratingSample(true);
    setLocalError(null);
    try {
      const { generateSamplePdfFile } = await import('../lib/samplePdfGenerator');
      const { inspectPdfFile } = await import('../lib/pdfInspector');
      const sampleFile = await generateSamplePdfFile();
      const inspectRes = await inspectPdfFile(sampleFile);
      onFileSelected(sampleFile, inspectRes);
    } catch {
      setLocalError('Não foi possível gerar o arquivo de teste.');
    } finally {
      setIsGeneratingSample(false);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleProcessFile(e.target.files[0]);
          }
          // Reset value para permitir re-seleção do mesmo arquivo
          e.target.value = '';
        }}
      />

      {!inspection ? (
        <div
          onDrop={onDrop}
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onClick={() => {
            if (!disabled && !isLoadingFile && !isGeneratingSample) {
              fileInputRef.current?.click();
            }
          }}
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-blue-600 bg-blue-50/70 scale-[1.01] shadow-md'
              : 'border-slate-300 hover:border-blue-500 bg-white hover:bg-slate-50/50 shadow-sm'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
              {isProcessing ? (
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              ) : (
                <UploadCloud className="w-8 h-8" />
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">
              {isProcessing ? 'Inspecionando documento...' : 'Arraste seu PDF aqui ou clique para selecionar'}
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mb-4">
              {isProcessing
                ? 'Lendo estrutura e metadados localmente no navegador...'
                : 'Selecione um arquivo PDF do seu dispositivo. Compatível com celular e computador.'}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>100% no navegador • Seus arquivos não saem do seu dispositivo</span>
            </div>
          </div>

          {/* Botão de Teste Rápido com PDF de Exemplo */}
          <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-xs text-slate-500">Não tem um PDF em mãos agora?</span>
            <button
              type="button"
              onClick={handleSampleClick}
              disabled={isGeneratingSample || disabled}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-medium text-xs transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {isGeneratingSample ? 'Gerando arquivo de teste...' : 'Testar com PDF de exemplo (1,5 MB com fotos)'}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Card com PDF selecionado e inspecionado */
        <div className="bg-white border-2 border-blue-500/80 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="p-3 bg-blue-600 text-white rounded-xl shadow-xs shrink-0">
                <FileText className="w-6 h-6" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900 truncate" title={inspection.fileName}>
                    {inspection.fileName}
                  </h4>
                  <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Válido
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">
                    Tamanho original: {inspection.formattedFileSize}
                  </span>
                  <span>•</span>
                  <span>
                    {inspection.pageCount} {inspection.pageCount === 1 ? 'página' : 'páginas'}
                  </span>
                  <span>•</span>
                  <span>
                    {inspection.dimensions.width} × {inspection.dimensions.height} pt ({inspection.dimensions.orientation === 'portrait' ? 'Retrato' : 'Paisagem'})
                  </span>
                </div>

                <div className="mt-2 text-xs text-blue-700 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Arquivo carregado localmente na memória. Nenhum byte enviado a servidores.</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onReset}
              disabled={disabled}
              title="Trocar ou remover PDF"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Alerta de erro de validação */}
      {localError && (
        <div className="mt-3 flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Atenção</p>
            <p className="text-rose-700 text-xs mt-0.5">{localError}</p>
          </div>
          <button
            type="button"
            onClick={() => setLocalError(null)}
            className="text-rose-500 hover:text-rose-800 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
