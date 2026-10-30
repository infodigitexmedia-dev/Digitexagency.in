import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[DIGITEX Uncaught Application Error]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#FAFAF8] px-4 py-16">
          <div className="max-w-md w-full bg-white border border-[#E5E5E3] rounded-3xl p-8 sm:p-10 text-center shadow-lg space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E11D2E] flex items-center justify-center mx-auto border border-red-100">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-[#111111] tracking-tight">
                Something went wrong
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-2 leading-relaxed">
                We encountered an unexpected rendering issue. Our solutions engineering team has been notified.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="text-left bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl p-3 text-[11px] font-mono text-[#6B7280] overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#E11D2E] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FAFAF8] hover:bg-neutral-100 text-[#111111] border border-[#E5E5E3] text-xs font-bold transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
