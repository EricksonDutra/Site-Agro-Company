import { cn } from '@/lib/utils';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

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
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  override render() {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.DEV;

      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <AlertTriangle size={48} className={styles.icon} />

            <h2 className={styles.title}>Oops! Algo deu errado</h2>

            <p className={styles.message}>
              Pedimos desculpas pelo inconveniente. Por favor, recarregue a página.
            </p>

            {isDevelopment && this.state.error && (
              <div className={styles.errorDetails}>
                <pre className={styles.errorStack}>{this.state.error.stack}</pre>
              </div>
            )}

            <button onClick={this.handleReload} className={cn(styles.button)} type="button">
              <RotateCcw size={16} />
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
