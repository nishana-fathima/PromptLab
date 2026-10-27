import { RefreshCw, TriangleAlert } from "lucide-react";

type AnalysisErrorStateProps = { message: string; onRetry: () => void };

export function AnalysisErrorState({ message, onRetry }: AnalysisErrorStateProps) {
  return <div role="alert" className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-950"><div className="flex items-start gap-3"><TriangleAlert className="mt-0.5 shrink-0 text-rose-600" size={20} /><div><h2 className="font-semibold">Analysis could not be completed</h2><p className="mt-1 text-sm leading-6 text-rose-800">{message}</p><button type="button" onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-rose-800 shadow-sm transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-200"><RefreshCw size={16} />Try again</button></div></div></div>;
}
