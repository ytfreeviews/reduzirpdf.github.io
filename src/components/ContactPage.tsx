import React, { useState } from 'react';
import { Mail, MessageSquare, CheckCircle, HelpCircle, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: 'Dúvida geral',
    mensagem: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) {
      return;
    }
    // Confirmação instantânea e feedback amigável
    setEnviado(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
          <Mail className="w-4 h-4 text-blue-600" />
          <span>Fale Conosco</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contato e Suporte Técnico
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          Sugestões, dúvidas técnicas ou relatos sobre arquivos PDF? Envie uma mensagem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {enviado ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Mensagem Recebida!</h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Obrigado pelo seu contato, {formData.nome}. Nossa equipe analisa feedbacks e sugestões para aprimorar o motor de compressão.
              </p>
              <button
                type="button"
                onClick={() => {
                  setEnviado(false);
                  setFormData({ nome: '', email: '', assunto: 'Dúvida geral', mensagem: '' });
                }}
                className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition-colors"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-1">
                  Seu Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Carlos Silva"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                  E-mail de Contato
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu.email@exemplo.com.br"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 text-sm"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-semibold text-slate-700 mb-1">
                  Assunto
                </label>
                <select
                  id="assunto"
                  value={formData.assunto}
                  onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 text-sm bg-white"
                >
                  <option value="Dúvida geral">Dúvida geral sobre o ReduzirPDF</option>
                  <option value="Relato de problema em arquivo">Relatar problema em um PDF específico</option>
                  <option value="Sugestão de funcionalidade">Sugestão de nova funcionalidade</option>
                  <option value="Outro assunto">Outro assunto</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-semibold text-slate-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  required
                  rows={4}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  placeholder="Descreva sua dúvida, sugestão ou observação..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Atendimento Direto
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dúvidas frequentes são respondidas diretamente em nossa seção de perguntas da página inicial.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
              <p>Tempo médio de resposta:</p>
              <p className="font-semibold text-slate-700 mt-0.5">Em até 24 horas úteis</p>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6">
            <h3 className="text-base font-bold text-blue-900 flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Privacidade em primeiro lugar
            </h3>
            <p className="text-xs text-blue-800 leading-relaxed">
              Lembre-se: nunca envie arquivos confidenciais por e-mail ou mensagens sem necessidade. O ReduzirPDF nunca pede seus documentos por mensagem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
