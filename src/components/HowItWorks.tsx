import React from 'react';
import { UploadCloud, Sliders, Download } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '1',
      title: 'Selecione seu arquivo PDF',
      description: 'Escolha um documento do seu celular ou computador.',
      icon: UploadCloud
    },
    {
      step: '2',
      title: 'Escolha o tamanho desejado',
      description: 'Selecione um dos tamanhos disponíveis ou informe um limite personalizado.',
      icon: Sliders
    },
    {
      step: '3',
      title: 'Comprima e baixe',
      description: 'Aguarde o processamento e baixe seu PDF quando estiver pronto.',
      icon: Download
    }
  ];

  return (
    <section id="como-funciona" className="py-12 sm:py-16 border-t border-slate-100">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Como comprimir um PDF?
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          Três passos simples para ter seu documento no tamanho exato sem complicações.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-blue-300 transition-all text-center flex flex-col items-center"
            >
              <div className="absolute -top-3 left-6 px-2.5 py-0.5 bg-blue-600 text-white text-xs font-black rounded-full shadow-2xs">
                Passo {item.step}
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 mt-2">
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
