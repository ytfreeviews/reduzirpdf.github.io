import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50 text-slate-600 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Coluna 1: Marca e Posicionamento */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 12v6" />
                  <path d="m9 15 3-3 3 3" />
                </svg>
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tight">
                Reduzir<span className="text-blue-600">PDF</span>
              </span>
            </div>

            <p className="text-slate-700 font-semibold text-sm">
              "Reduza seu PDF para o tamanho que você precisa."
            </p>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md">
              Grátis, rápido e sem enviar seus arquivos para um servidor. Todo o processamento é executado localmente no seu dispositivo.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacidade absoluta: zero upload para servidores</span>
            </div>
          </div>

          {/* Coluna 2: Tamanhos Populares */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Tamanhos Populares
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/comprimir-pdf-para-100kb')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Comprimir para 100 KB
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/comprimir-pdf-para-200kb')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Comprimir para 200 KB
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/comprimir-pdf-para-500kb')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Comprimir para 500 KB
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/comprimir-pdf-para-1mb-gratis')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Comprimir para 1 MB grátis
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/compactar-pdf-para-enviar')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Compactar para enviar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/diminuir-tamanho-de-pdf')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Diminuir tamanho de PDF
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Institucional */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Informações
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/privacidade')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/termos')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contato')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Contato & Suporte
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Início
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Nota de Desvinculação e Esclarecimento */}
        <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-2">
          <p>
            * Esclarecimento: Menções a plataformas e serviços públicos ou privados (como gov.br, Meu INSS, Prouni, SISU, tribunais, WhatsApp, Gmail) 
            são feitas estritamente como exemplos informativos de limites técnicos de arquivos estabelecidos por tais sistemas. O ReduzirPDF é uma ferramenta 
            independente e não possui nenhuma afiliação, vínculo comercial ou endosso oficial desses órgãos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} ReduzirPDF. Todos os direitos reservados. Feito para o Brasil.</p>
            <p className="flex items-center gap-1">
              Desenvolvido com foco em privacidade e alto desempenho
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
