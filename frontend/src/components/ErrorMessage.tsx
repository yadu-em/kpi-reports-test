import type { ApiError } from '@/types';
import './ErrorMessage.css';

interface ErrorMessageProps {
  error: ApiError;
  title?: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ error, title = 'Error Loading Data', onRetry }: ErrorMessageProps): JSX.Element => {
  const getErrorMessage = (): string => {
    if (error.status === 404) {
      return 'The requested resource was not found.';
    }
    if (error.status === 500) {
      return 'Internal server error. Please try again later.';
    }
    if (error.status === 0 || !error.status) {
      return 'Unable to connect to the server. Please check your connection.';
    }
    return error.message || 'An unexpected error occurred.';
  };

  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">{title}</h3>
      <p className="error-text">{getErrorMessage()}</p>
      {error.status && (
        <p className="error-status">Status Code: {error.status}</p>
      )}
      {onRetry && (
        <button className="error-retry" onClick={onRetry} type="button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

