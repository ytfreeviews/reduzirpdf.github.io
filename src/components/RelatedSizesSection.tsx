import React from 'react';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { PageConfig } from '../lib/routesConfig';

interface RelatedSizesSectionProps {
  relatedPaths: PageConfig['relatedPresetPaths'];
  onNavigate: (path: string) => void;
}

export const RelatedSizesSection: React.FC<RelatedSizesSectionProps> = ({ relatedPaths, onNavigate }) => {
  if (!relatedPaths || relatedPaths.length === 0) return null;

  return (
    <section className="py-8 max-w-5xl mx-auto px-4 border-t border-slate-100">
      <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-sm">
        <SlidersHorizontal className="w-4 h-4 text-blue-600" />
        <span>Outros tamanhos e opções de compressão:</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {relatedPaths.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => {
              onNavigate(item.path);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <span>{item.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
          </button>
        ))}
      </div>
    </section>
  );
};
