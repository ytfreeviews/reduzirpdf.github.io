import React from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff, Cpu } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Privacidade Garantida por Arquitetura</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          No ReduzirPDF, a privacidade não é apenas uma promessa: é garantida pela arquitetura da aplicação.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-sm shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Seus arquivos não saem do seu dispositivo
            </h2>
            <p className="mt-2 text-slate-700 leading-relaxed text-sm sm:text-base">
              Ao utilizar o ReduzirPDF, o arquivo PDF que você seleciona é lido, processado, renderizado e compactado 
              <strong> inteiramente na memória RAM do seu próprio navegador web</strong> (via PDF.js e Canvas API local). 
              Nenhum dado, imagem ou texto do seu documento é enviado para nossos servidores ou para servidores de terceiros.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
            <ServerOff className="w-5 h-5 text-blue-600" />
            1. Ausência de Envio para Servidores (Zero-Upload)
          </h2>
          <p>
            Diferente dos conversores tradicionais de PDF que realizam o upload do arquivo para a nuvem para convertê-lo e 
            depois oferecem um link temporário, o ReduzirPDF executa o código de compressão diretamente na CPU/GPU do seu aparelho 
            (computador, tablet ou smartphone).
          </p>
          <p className="mt-2 text-slate-600">
            Você pode verificar isso inspecionando a aba "Rede" (Network) das ferramentas de desenvolvedor do seu navegador durante 
            a compressão: nenhum arquivo binário é transmitido.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
            <EyeOff className="w-5 h-5 text-blue-600" />
            2. Coleta de Dados e Metadados
          </h2>
          <p>
            Não coletamos seu nome, e-mail, CPF, localização exata ou qualquer dado contido dentro dos documentos. 
            Não é necessário cadastro, login ou fornecimento de cartão de crédito.
          </p>
          <p className="mt-2 text-slate-600">
            Nomes de arquivos, dimensões e número de páginas são utilizados unicamente na interface da sessão ativa para mostrar 
            informações úteis a você e são descartados assim que a aba é fechada ou o botão "Reiniciar" é clicado.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Cpu className="w-5 h-5 text-blue-600" />
            3. Segurança e Limpeza de Memória
          </h2>
          <p>
            Ao finalizar o processamento e download, os buffers binários e URLs de objeto (Blob URLs) são revogados da memória do 
            navegador. Não executamos scripts embutidos eventualmente contidos no PDF (o PDF.js executa em modo seguro sem suporte a 
            JavaScript malicioso de documentos).
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            4. Conformidade com a LGPD
          </h2>
          <p>
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), o ReduzirPDF adota o princípio de 
            <em> Privacy by Design</em> (privacidade desde a concepção) e minimização de dados: já que não armazenamos dados de documentos 
            pessoais, não há risco de vazamento de seus arquivos em nossos servidores.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            5. Contato sobre Privacidade
          </h2>
          <p>
            Caso tenha qualquer dúvida técnica ou queira saber mais sobre a arquitetura de processamento local, entre em contato 
            através da nossa página de suporte e contato.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Última atualização: Novembro de 2026.
          </p>
        </section>
      </div>
    </div>
  );
};
