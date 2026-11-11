import React from 'react';
import { Building2, Briefcase, Scale, Mail, ShieldCheck, FileCheck } from 'lucide-react';
import { PageConfig } from '../lib/routesConfig';

interface UseCasesSectionProps {
  title: string;
  useCases: PageConfig['useCases'];
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ title, useCases }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'building':
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'briefcase':
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'scale':
        return <Scale className="w-5 h-5 text-blue-600" />;
      case 'mail':
        return <Mail className="w-5 h-5 text-blue-600" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <FileCheck className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          Otimizado para atender às exigências reais dos principais sistemas e editais brasileiros.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {useCases.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-blue-300 transition-colors flex items-start gap-4"
          >
            <div className="p-3 bg-blue-50 rounded-xl shrink-0">
              {getIcon(item.icon)}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
