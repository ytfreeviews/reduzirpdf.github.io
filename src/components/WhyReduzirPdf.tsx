import React from 'react';
import { Gift, UserX, Cpu, Smartphone, Sliders, Sparkles } from 'lucide-react';

export const WhyReduzirPdf: React.FC = () => {
  const benefits = [
    {
      title: 'Gratuito',
      description: 'Sem cobranças escondidas, planos premium ou marcas d’água nos seus documentos.',
      icon: Gift
    },
    {
      title: 'Sem cadastro',
      description: 'Abra a página e use imediatamente. Não pedimos e-mail, telefone ou senha.',
      icon: UserX
    },
    {
      title: 'Processamento no navegador',
      description: 'Seus arquivos confidenciais nunca saem do seu celular ou computador. Privacidade de ponta.',
      icon: Cpu
    },
    {
      title: 'Compatível com celulares e computadores',
      description: 'Funcione perfeitamente no Android Chrome, iPhone Safari, Windows, Mac e Linux.',
      icon: Smartphone
    },
    {
      title: 'Tamanhos personalizados',
      description: 'Defina exatamente o teto que seu edital ou sistema exige (ex: 150 KB, 300 KB, 800 KB).',
      icon: Sliders
    },
    {
      title: 'Interface simples',
      description: 'Sem dezenas de botões confusos ou popups invasivos. Foco exclusivo em comprimir com perfeição.',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-blue-50/40 rounded-3xl p-6 sm:p-10 my-10 border border-blue-100/80">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Por que usar o ReduzirPDF?
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          Projetado especialmente para quem precisa resolver o limite de envio de arquivos com rapidez e segurança.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow flex items-start gap-3.5"
            >
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
