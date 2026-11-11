import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Download, RotateCcw, Sliders, CheckCircle2, AlertTriangle, FileDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { CompressionResult, TargetSizePresetId } from '../types';
import { formatBytes, triggerFileDownload } from '../lib/fileUtils';

interface ResultCardProps {
  result: CompressionResult;
  onRetryDifferentTarget: () => void;
  onCompressNewFile: () => void;
  onApplySuggestedPreset?: (presetId: TargetSizePresetId, bytes: number) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onRetryDifferentTarget,
  onCompressNewFile,
  onApplySuggestedPreset
}) => {
  useEffect(() => {
    if (result.success) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#2563EB', '#3B82F6', '#60A5FA', '#10B981']
        });
      } catch {
        // Fallback se confetti falhar
      }
    }
  }, [result.success]);

  const handleDownload = () => {
    if (!result.downloadUrl) return;
    const baseName = result.originalFileName.replace(/\.pdf$/i, '');
    const targetLabel = formatBytes(result.compressedSizeBytes).replace(/\s+/g, '').toLowerCase();
    const downloadFileName = `${baseName}-reduzido-${targetLabel}.pdf`;
    triggerFileDownload(result.downloadUrl, downloadFileName);
  };

  const isSmaller = result.compressedSizeBytes < result.originalSizeBytes;

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      {result.success ? (
        <div>
          {/* Cabeçalho de Sucesso */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Seu PDF foi comprimido!
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              O documento foi processado com sucesso e respeitou o limite solicitado.
            </p>
          </div>

          {/* Comparativo de Tamanhos (Antes x Depois) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Antes
              </span>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-700 mt-1">
                {formatBytes(result.originalSizeBytes)}
              </p>
              <span className="text-[11px] text-slate-400">
                {result.originalSizeBytes.toLocaleString('pt-BR')} bytes
              </span>
            </div>

            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-center ring-1 ring-blue-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Depois
              </span>
              <p className="text-xl sm:text-2xl font-extrabold text-blue-700 mt-1">
                {formatBytes(result.compressedSizeBytes)}
              </p>
              <span className="text-[11px] text-blue-600 font-medium">
                {result.compressedSizeBytes.toLocaleString('pt-BR')} bytes
              </span>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Redução
              </span>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1">
                {isSmaller ? `${result.reductionPercentage.toString().replace('.', ',')}%` : '0%'}
              </p>
              <span className="text-[11px] text-emerald-700 font-medium">
                {isSmaller
                  ? `Economia de ${formatBytes(result.originalSizeBytes - result.compressedSizeBytes)}`
                  : 'Mesmo tamanho'}
              </span>
            </div>
          </div>

          {/* Metadados e Método */}
          <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-600 bg-white border border-slate-100 rounded-xl p-4">
            <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-100">
              <span className="text-slate-500">Arquivo original:</span>
              <span className="font-semibold text-slate-800 truncate max-w-xs" title={result.originalFileName}>
                {result.originalFileName}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-500">Tamanho alvo máximo:</span>
              <span className="font-semibold text-slate-800">
                Até {formatBytes(result.targetSizeBytes)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-500">Método aplicado:</span>
              <span className="font-medium text-slate-800">
                {result.methodDescription}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Tempo de processamento:</span>
              <span className="text-slate-700">
                {(result.durationMs / 1000).toFixed(1).replace('.', ',')} segundos
              </span>
            </div>
          </div>

          {/* Aviso sobre rasterização / seleção se aplicável */}
          {result.warningNotice && (
            <div className="mb-6 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-blue-900 text-xs flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{result.warningNotice}</span>
            </div>
          )}

          {/* Botão de Ação Primária: Baixar PDF */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Baixar PDF comprimido</span>
            </button>
          </div>

          {/* Ações Secundárias */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={onRetryDifferentTarget}
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 p-1.5 transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Tentar outro tamanho</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={onCompressNewFile}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 p-1.5 transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Comprimir outro PDF</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={onCompressNewFile}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-rose-600 p-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
      ) : (
        /* Caso o limite solicitado seja impossível sem destruir a qualidade */
        <div>
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Não foi possível atingir o tamanho desejado sem comprometer excessivamente a qualidade.
            </h3>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
              Para proteger a legibilidade das letras e a integridade do seu documento, o ReduzirPDF interrompeu a redução antes de tornar o texto ilegível.
            </p>
          </div>

          {/* Comparativo de tentativas */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 mb-6 text-sm text-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Tamanho original:</span>
              <span className="font-bold">{formatBytes(result.originalSizeBytes)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Tamanho solicitado:</span>
              <span className="font-bold text-rose-600">Até {formatBytes(result.targetSizeBytes)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-amber-200/60 font-semibold">
              <span className="text-slate-800">Menor tamanho seguro obtido:</span>
              <span className="text-amber-800">{formatBytes(result.compressedSizeBytes)}</span>
            </div>
          </div>

          {/* Sugestão de Preset */}
          {result.suggestedPreset && onApplySuggestedPreset && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-blue-900 uppercase">Sugestão Recomendada</p>
                <p className="text-sm text-blue-800">
                  Tente comprimir para <strong>{result.suggestedPreset.label}</strong> para obter um arquivo legível e aceito.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onApplySuggestedPreset(result.suggestedPreset!.id, result.suggestedPreset!.bytes)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shrink-0"
              >
                <span>Usar {result.suggestedPreset.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Se houver arquivo com menor tamanho seguro, permite baixar */}
          {result.downloadUrl && (
            <div className="mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50 text-center">
              <p className="text-xs text-slate-600 mb-2">
                Você pode baixar a versão mais leve obtida ({formatBytes(result.compressedSizeBytes)}):
              </p>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-semibold text-xs shadow-2xs hover:bg-slate-100 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Baixar melhor tentativa ({formatBytes(result.compressedSizeBytes)})</span>
              </button>
            </div>
          )}

          {/* Ações */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRetryDifferentTarget}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              <Sliders className="w-4 h-4" />
              <span>Escolher outro tamanho</span>
            </button>
            <button
              type="button"
              onClick={onCompressNewFile}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
