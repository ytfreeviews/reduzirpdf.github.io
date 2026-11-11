import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium mb-4">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Regras e Condições</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Termos de Uso
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          Condições de utilização do serviço gratuito ReduzirPDF.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            1. Natureza do Serviço
          </h2>
          <p>
            O ReduzirPDF é uma ferramenta web de uso gratuito desenvolvida para auxiliar usuários a redimensionar e compactar 
            arquivos no formato PDF para atingir limites de tamanho estritos (como 100 KB, 200 KB, 500 KB, 1 MB ou valores personalizados).
          </p>
          <p className="mt-2 text-slate-600">
            O serviço é fornecido "no estado em que se encontra" (as-is), sem necessidade de assinatura ou pagamento.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            2. Limitações Técnicas e Legibilidade
          </h2>
          <p>
            A compressão de arquivos digitais envolve compromissos entre fidelidade de imagem e peso em bytes. Embora o ReduzirPDF 
            implemente salvaguardas para proteger a clareza dos textos, documentos com elevado número de páginas ou fontes excessivamente 
            pequenas podem apresentar perdas visuais caso o usuário force limites extremamente agressivos (por exemplo, 100 KB para um documento de 30 páginas).
          </p>
          <p className="mt-2 text-slate-600">
            O usuário é o único responsável por conferir o documento gerado e validar sua legibilidade antes de submetê-lo a órgãos oficiais, 
            bancas examinadoras, tribunais ou processos seletivos.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            3. Responsabilidade pelo Conteúdo
          </h2>
          <p>
            Como todo o processamento ocorre no próprio equipamento do usuário sem trânsito em servidores, o ReduzirPDF não tem acesso, 
            controle ou conhecimento sobre o teor dos documentos processados. O usuário declara possuir os direitos legais necessários sobre 
            os arquivos que submete à ferramenta.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            4. Disponibilidade e Isenção de Garantias
          </h2>
          <p>
            Empregamos os melhores padrões de engenharia para assegurar a estabilidade do código no navegador. No entanto, o desempenho 
            pode variar de acordo com a memória RAM e capacidade de processamento do dispositivo do usuário.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Última revisão: Novembro de 2026.
          </p>
        </section>
      </div>
    </div>
  );
};
