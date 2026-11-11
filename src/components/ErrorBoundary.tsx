import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ReduzirPDF Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg text-center">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h1 className="text-xl font-bold text-slate-900 mb-2">
              Não foi possível carregar a aplicação
            </h1>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Ocorreu uma falha inesperada durante a inicialização no seu navegador.
            </p>

            <button
              type="button"
              onClick={() => {
                window.location.href = window.location.origin + window.location.pathname;
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors cursor-pointer w-full shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Recarregar página</span>
            </button>

            {this.state.error && (
              <details className="mt-6 text-left border-t border-slate-100 pt-4">
                <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600 font-medium">
                  Detalhes técnicos
                </summary>
                <pre className="mt-2 text-[10px] p-3 rounded-lg bg-slate-100 text-slate-700 overflow-x-auto whitespace-pre-wrap font-mono">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
