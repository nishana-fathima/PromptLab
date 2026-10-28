import { ChevronLeft, ChevronRight, History, RefreshCw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { AnalysisErrorState } from "../components/analyzer/AnalysisErrorState";
import { HistoryList } from "../components/history/HistoryList";
import { HistorySkeleton } from "../components/history/HistorySkeleton";
import { clearLocalAnalysisHistory, getLocalAnalysisHistory } from "../services/localAnalysisHistory";
import type { AnalysisHistoryResponse } from "../types/analysis";

const PAGE_SIZE = 20;

export function HistoryPage() {
  const [history, setHistory] = useState<AnalysisHistoryResponse | null>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback((nextOffset: number) => {
    setLoading(true);
    setError(null);
    try {
      setHistory(getLocalAnalysisHistory(PAGE_SIZE, nextOffset));
      setOffset(nextOffset);
    } catch {
      setError("Saved demo history could not be loaded from this browser.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory(0);
  }, [loadHistory]);

  const canGoBack = offset > 0;
  const canGoForward = Boolean(history && offset + history.items.length < history.total);

  function clearHistory() {
    if (!window.confirm("Clear all saved demo analyses? This cannot be undone.")) return;
    clearLocalAnalysisHistory();
    loadHistory(0);
  }

  return <div className="space-y-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-violet">Archive</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Prompt history</h1><p className="mt-2 text-slate-500">Review saved evaluations from this browser and compare improvements over time.</p></div><div className="flex gap-2 self-start sm:self-auto"><button type="button" onClick={() => loadHistory(offset)} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-violet/40 hover:text-violet focus:outline-none focus:ring-4 focus:ring-violet/10 disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} />Refresh</button><button type="button" onClick={clearHistory} disabled={loading || !history?.total} className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Clear history"><Trash2 size={15} />Clear</button></div></div>{loading ? <HistorySkeleton /> : error ? <AnalysisErrorState message={error} onRetry={() => loadHistory(offset)} /> : history && history.items.length > 0 ? <><div className="flex items-center justify-between text-xs text-slate-400"><span>{history.total} saved {history.total === 1 ? "analysis" : "analyses"}</span><span>Showing {offset + 1}-{Math.min(offset + history.items.length, history.total)}</span></div><HistoryList items={history.items} /><div className="flex justify-end gap-2"><button type="button" onClick={() => loadHistory(Math.max(0, offset - PAGE_SIZE))} disabled={!canGoBack || loading} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={16} />Previous</button><button type="button" onClick={() => loadHistory(offset + PAGE_SIZE)} disabled={!canGoForward || loading} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Next<ChevronRight size={16} /></button></div></> : <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center"><div><History className="mx-auto text-slate-300" size={36} strokeWidth={1.4} /><p className="mt-4 text-sm font-semibold text-slate-600">No analyses yet</p><p className="mt-1 text-sm text-slate-400">Complete your first prompt analysis to see it here.</p></div></div>}</div>;
}
