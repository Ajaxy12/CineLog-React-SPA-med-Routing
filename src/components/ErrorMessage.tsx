import { AlertCircle, RefreshCw } from 'lucide-react';
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-red-900/20 p-4 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
      <p className="text-gray-400 mb-6 max-w-md">{message}</p>
      {onRetry &&
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2 bg-bg-secondary rounded-lg hover:bg-white/10 transition-colors text-white border border-white/10">

          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      }
    </div>);

}