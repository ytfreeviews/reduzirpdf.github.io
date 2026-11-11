import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onScrollToSection }) => {
  const handleNavClick = (e: React.MouseEvent, target: 'como-funciona' | 'perguntas-frequentes') => {
    e.preventDefault();
    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (onScrollToSection) {
      onScrollToSection(target);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Marca */}
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
            {/* Ícone de documento com setas de compressão */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M12 12v6" />
              <path d="m9 15 3-3 3 3" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
              Reduzir<span className="text-blue-600">PDF</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-tight mt-0.5 hidden xs:inline">
              100% no navegador
            </span>
          </div>
        </button>

        {/* Navegação Simplificada e Direta */}
        <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'como-funciona')}
            className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer text-xs sm:text-sm"
          >
            Como funciona
          </button>
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'perguntas-frequentes')}
            className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer text-xs sm:text-sm"
          >
            Perguntas frequentes
          </button>

          {/* Selo sutil de privacidade na barra */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Sem envio para servidor</span>
          </div>
        </nav>
      </div>
    </header>
  );
};
