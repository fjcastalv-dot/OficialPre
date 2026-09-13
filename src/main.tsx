import {StrictMode, Component, ReactNode, ErrorInfo} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold mb-3 text-red-400">Hubo un problema al cargar el sitio</h2>
          <p className="text-slate-400 max-w-md mb-6">{this.state.error?.message || 'Error inesperado'}</p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg shadow cursor-pointer transition-colors"
          >
            Restablecer y Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

