import { AlertCircle, RefreshCw } from "lucide-react";
export default function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-8 text-center">
      <AlertCircle className="mx-auto text-red-400" size={34} />
      <h2 className="mt-3 font-bold text-red-100">Something went wrong</h2>
      <p className="mt-1 text-sm text-red-300">{message}</p>
      <button type="button" onClick={onRetry} data-testid="retry-button" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-400">
        <RefreshCw size={16} /> Retry Loading
      </button>
    </div>
  );
}