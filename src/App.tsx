import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UploadCard } from './components/UploadCard';
import { TargetSizeSelector } from './components/TargetSizeSelector';
import { ProgressIndicator } from './components/ProgressIndicator';
import { ResultCard } from './components/ResultCard';
import { HowItWorks } from './components/HowItWorks';
import { WhyReduzirPdf } from './components/WhyReduzirPdf';
import { UseCasesSection } from './components/UseCasesSection';
import { FaqSection } from './components/FaqSection';
import { RelatedSizesSection } from './components/RelatedSizesSection';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { ContactPage } from './components/ContactPage';
import { AdSensePlaceholder } from './components/AdSensePlaceholder';

import { PDFInspectionResult, TargetSizePresetId, CompressionProgress, CompressionResult, TARGET_PRESETS } from './types';
import { PAGES_CONFIG } from './lib/routesConfig';
import { formatBytes } from './lib/fileUtils';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const KNOWN_ROUTES = [
  '/',
  '/comprimir-pdf-para-100kb',
  '/comprimir-pdf-para-200kb',
  '/comprimir-pdf-para-500kb',
  '/comprimir-pdf-para-1mb-gratis',
  '/compactar-pdf-para-enviar',
  '/diminuir-tamanho-de-pdf',
  '/privacidade',
  '/termos',
  '/contato'
];

function getRepoBase(): string {
  if (typeof window === 'undefined') return '';
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  // Se o primeiro segmento existir e não for uma rota conhecida, é o nome do repositório no GitHub Pages
  if (segments.length > 0 && !KNOWN_ROUTES.includes('/' + segments[0])) {
    return '/' + segments[0];
  }
  return '';
}

function normalizeRoute(rawPath: string): string {
  if (!rawPath || rawPath === '') return '/';
  let path = rawPath;
  if (path.startsWith('#')) {
    path = path.slice(1);
  }
  const repoBase = getRepoBase();
  if (repoBase && path.startsWith(repoBase)) {
    path = path.slice(repoBase.length);
  }
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path || '/';
}

export default function App() {
  // Roteamento SPA nativo e compatível com GitHub Pages e domínios raiz
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    // Verificar se veio de redirecionamento 404 do GitHub Pages (?p=...)
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('p');
    if (redirectPath) {
      const norm = normalizeRoute(redirectPath);
      const repoBase = getRepoBase();
      try {
        window.history.replaceState(null, '', repoBase + (norm === '/' ? '/' : norm));
      } catch {
        // Fallback se pushState for restrito
      }
      return norm;
    }
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return normalizeRoute(window.location.hash.slice(1));
    }
    return normalizeRoute(window.location.pathname);
  });

  // Estado do Arquivo e Inspeção
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inspection, setInspection] = useState<PDFInspectionResult | null>(null);
  const [isLoadingFile] = useState<boolean>(false);

  // Obter configuração da página atual garantindo fallback para '/'
  const pageConfig = PAGES_CONFIG[currentPath] || PAGES_CONFIG['/'];

  // Estado do Tamanho Alvo
  const [selectedPresetId, setSelectedPresetId] = useState<TargetSizePresetId>(pageConfig.defaultPreset || '500kb');
  const [customTargetBytes, setCustomTargetBytes] = useState<number | null>(null);

  // Estado do Motor de Compressão
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [progress, setProgress] = useState<CompressionProgress>({
    stage: 'idle',
    stageDescription: '',
    attempt: 1,
    maxAttempts: 1,
    currentPage: 0,
    totalPages: 0,
    percentage: 0
  });
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);

  // Controlador de Abort/Cancelamento
  const abortControllerRef = useRef<AbortController | null>(null);

  // Atualizar preset padrão e metadados de SEO ao mudar de rota
  useEffect(() => {
    const config = PAGES_CONFIG[currentPath];
    if (config) {
      document.title = config.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', config.metaDescription);
      }
      setSelectedPresetId(config.defaultPreset);
    }
  }, [currentPath]);

  // Listener para botões voltar/avançar do navegador (popstate e hashchange)
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        setCurrentPath(normalizeRoute(window.location.hash.slice(1)));
      } else {
        setCurrentPath(normalizeRoute(window.location.pathname));
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Navegação sem reload preservando o prefixo do repositório no GitHub Pages
  const navigate = (path: string) => {
    const normalized = normalizeRoute(path);
    const repoBase = getRepoBase();
    const fullTargetUrl = repoBase + (normalized === '/' ? '/' : normalized);

    if (normalized !== currentPath) {
      try {
        window.history.pushState(null, '', fullTargetUrl);
      } catch {
        window.location.hash = normalized;
      }
      setCurrentPath(normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Obter os bytes do tamanho alvo atual
  const getTargetBytes = (): number => {
    if (selectedPresetId === 'custom' && customTargetBytes) {
      return customTargetBytes;
    }
    const preset = TARGET_PRESETS.find((p) => p.id === selectedPresetId);
    return preset ? preset.bytes : 500 * 1024;
  };

  // Manipular seleção de arquivo
  const handleFileSelected = (file: File, inspectRes: PDFInspectionResult) => {
    setSelectedFile(file);
    setInspection(inspectRes);
    setCompressionResult(null);
  };

  // Resetar tudo
  const handleReset = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (compressionResult?.downloadUrl) {
      URL.revokeObjectURL(compressionResult.downloadUrl);
    }
    setSelectedFile(null);
    setInspection(null);
    setCompressionResult(null);
    setIsCompressing(false);
  };

  // Iniciar compressão real (carregando o motor de compressão sob demanda)
  const handleStartCompression = async () => {
    if (!selectedFile || !inspection) return;

    const targetBytes = getTargetBytes();

    setIsCompressing(true);
    setCompressionResult(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Importação dinâmica para não pesar o bundle inicial da página
      const { compressPdf } = await import('./lib/pdfCompressor');

      const result = await compressPdf({
        file: selectedFile,
        targetBytes,
        selectedPresetId,
        signal: controller.signal,
        onProgress: (prog) => {
          setProgress(prog);
        }
      });

      setCompressionResult(result);
    } catch (err: unknown) {
      const error = err as Error;
      if (error?.name === 'AbortError') {
        // Cancelado pelo usuário
      } else {
        setCompressionResult({
          success: false,
          originalFileName: selectedFile.name,
          originalSizeBytes: selectedFile.size,
          compressedSizeBytes: selectedFile.size,
          targetSizeBytes: targetBytes,
          reductionPercentage: 0,
          method: 'failed',
          methodDescription: 'Falha durante o processamento.',
          errorMessage: error?.message || 'Ocorreu um erro inesperado ao comprimir o PDF.',
          durationMs: 0
        });
      }
    } finally {
      setIsCompressing(false);
      abortControllerRef.current = null;
    }
  };

  // Cancelar processamento
  const handleCancelCompression = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsCompressing(false);
  };

  // Aplicar preset sugerido
  const handleApplySuggestedPreset = (presetId: TargetSizePresetId, bytes: number) => {
    setSelectedPresetId(presetId);
    if (presetId === 'custom') {
      setCustomTargetBytes(bytes);
    }
    // Reexecutar compressão com o tamanho seguro
    setTimeout(() => {
      handleStartCompression();
    }, 50);
  };

  const isTargetLargerThanOriginal = inspection && getTargetBytes() >= inspection.fileSizeBytes && selectedPresetId !== 'custom';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Cabeçalho */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Roteamento de Páginas Institucionais */}
      {currentPath === '/privacidade' && (
        <main className="flex-1">
          <PrivacyPage />
        </main>
      )}

      {currentPath === '/termos' && (
        <main className="flex-1">
          <TermsPage />
        </main>
      )}

      {currentPath === '/contato' && (
        <main className="flex-1">
          <ContactPage />
        </main>
      )}

      {/* Roteamento das Páginas com a Ferramenta Principal e Landing Pages de SEO */}
      {currentPath !== '/privacidade' && currentPath !== '/termos' && currentPath !== '/contato' && (
        <main className="flex-1">
          {/* Seção Hero e Ferramenta Principal */}
          <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 max-w-4xl mx-auto">
            {/* Tagline e Selo de Confiança */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-4 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Grátis, rápido e sem enviar seus arquivos para um servidor</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight text-balance leading-tight">
                {pageConfig.h1}
              </h1>

              <p className="mt-3.5 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                {pageConfig.introDescription}
              </p>
            </div>

            {/* Container Central da Ferramenta de Compressão */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-5 sm:p-8 space-y-6">
              {/* Se o resultado de compressão estiver ativo */}
              {compressionResult ? (
                <ResultCard
                  result={compressionResult}
                  onRetryDifferentTarget={() => setCompressionResult(null)}
                  onCompressNewFile={handleReset}
                  onApplySuggestedPreset={handleApplySuggestedPreset}
                />
              ) : isCompressing ? (
                /* Em processamento com barra de progresso e cancelamento */
                <ProgressIndicator
                  progress={progress}
                  onCancel={handleCancelCompression}
                />
              ) : (
                /* Formulário Principal: Upload + Seletor de Tamanho + Botão de Ação */
                <>
                  {/* Área de Upload */}
                  <UploadCard
                    inspection={inspection}
                    isLoadingFile={isLoadingFile}
                    onFileSelected={handleFileSelected}
                    onReset={handleReset}
                    disabled={isCompressing}
                  />

                  {/* Seletor de Tamanho Alvo */}
                  <TargetSizeSelector
                    selectedPresetId={selectedPresetId}
                    onSelectPreset={(presetId, bytes) => {
                      setSelectedPresetId(presetId);
                      if (bytes) setCustomTargetBytes(bytes);
                    }}
                    originalSizeBytes={inspection?.fileSizeBytes}
                    disabled={isCompressing}
                  />

                  {/* Botão de Ação Primária */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={!selectedFile || isCompressing}
                      onClick={handleStartCompression}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
                        !selectedFile || isCompressing
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                          : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25 hover:shadow-lg active:scale-[0.99]'
                      }`}
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Comprimir PDF</span>
                      <ArrowRight className="w-5 h-5 ml-1" />
                    </button>

                    {/* Dica amigável sob o botão */}
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
                      <span>
                        {selectedFile
                          ? `Alvo escolhido: ${formatBytes(getTargetBytes())}`
                          : 'Selecione um arquivo acima para habilitar'}
                      </span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Privacidade local
                      </span>
                    </div>

                    {isTargetLargerThanOriginal && (
                      <p className="mt-2 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                        Aviso: O limite selecionado ({formatBytes(getTargetBytes())}) é maior do que o tamanho atual do seu arquivo ({formatBytes(inspection.fileSizeBytes)}). Recomendamos escolher um tamanho menor para haver redução.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Espaço reservado para AdSense (não intrusivo, sem obstruir a ferramenta) */}
          <AdSensePlaceholder />

          {/* Como Funciona */}
          <div className="max-w-5xl mx-auto px-4">
            <HowItWorks />
          </div>

          {/* Por que usar o ReduzirPDF */}
          <div className="max-w-5xl mx-auto px-4">
            <WhyReduzirPdf />
          </div>

          {/* Casos de Uso Específicos da Página */}
          <UseCasesSection
            title={pageConfig.useCasesTitle}
            useCases={pageConfig.useCases}
          />

          {/* FAQ Específico com Schema JSON-LD */}
          <FaqSection faqs={pageConfig.faqs} />

          {/* Links Internos para outros tamanhos */}
          <RelatedSizesSection
            relatedPaths={pageConfig.relatedPresetPaths}
            onNavigate={navigate}
          />
        </main>
      )}

      {/* Rodapé */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
