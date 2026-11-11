import React from 'react';
import { Loader2, ShieldCheck, XCircle } from 'lucide-react';
import { CompressionProgress } from '../types';

interface ProgressIndicatorProps {
  progress: CompressionProgress;
  onCancel: () => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, onCancel }) => {
  return (
    <div className="w-full bg-white border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
        Comprimindo seu PDF...
      </h3>

      <p className="text-sm font-medium text-blue-600 mb-4 min-h-[1.5rem]">
        {progress.stageDescription || 'Processando documento...'}
      </p>

      {/* Barra de progresso */}
      <div className="max-w-md mx-auto mb-3">
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(5, progress.percentage)}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-xs text-slate-500 mt-1.5 font-medium px-1">
          <span>
            {progress.totalPages > 0 && progress.currentPage > 0
              ? `Página ${progress.currentPage} de ${progress.totalPages}`
              : `Tentativa ${progress.attempt} de ${progress.maxAttempts}`}
          </span>
          <span>{Math.round(progress.percentage)}%</span>
        </div>
      </div>

      {/* Botão de Cancelamento */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:border-rose-400 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-semibold transition-colors"
        >
          <XCircle className="w-4 h-4" />
          <span>Cancelar processamento</span>
        </button>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
        <span>Processamento 100% local no seu navegador. Os dados nunca saem do seu computador ou celular.</span>
      </div>
    </div>
  );
};
