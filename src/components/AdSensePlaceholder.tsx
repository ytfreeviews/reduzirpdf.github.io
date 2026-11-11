import React from 'react';

/**
 * Área reservada para monetização compatível com as diretrizes do Google AdSense.
 * Mantida limpa e neutra no lançamento inicial, sem anúncios intrusivos ou botões enganosos.
 */
export const AdSensePlaceholder: React.FC = () => {
  return (
    <div className="my-8 max-w-4xl mx-auto px-4" aria-hidden="true">
      <div className="w-full h-20 rounded-xl border border-dashed border-slate-200/60 bg-slate-50/50 flex items-center justify-center text-slate-400 text-xs font-medium">
        <span>Espaço reservado • ReduzirPDF</span>
      </div>
    </div>
  );
};
