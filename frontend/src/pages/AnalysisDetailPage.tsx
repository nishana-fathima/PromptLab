import { ArrowLeft, CalendarDays, Hash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AnalysisErrorState } from "../components/analyzer/AnalysisErrorState";
import { AnalysisResults } from "../components/analyzer/AnalysisResults";
import { AnalysisSkeleton } from "../components/analyzer/AnalysisSkeleton";
import { getLocalAnalysis } from "../services/localAnalysisHistory";
import type { AnalyzePromptResponse } from "../types/analysis";
import { formatDate } from "../utils/format";

export function AnalysisDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<AnalyzePromptResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setAnalysis(null);
    if (!id || !/^\d+$/.test(id)) {
      setError("That analysis ID is not valid.");
      setLoading(false);
      return () => controller.abort();
    }
    const result = getLocalAnalysis(id);
    if (result) setAnalysis(result);
    else setError("This saved analysis could not be found in local history.");
    setLoading(false);
    return () => controller.abort();
  }, [id]);

  return <div className="space-y-6"><Link to="/history" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet focus:outline-none focus:ring-4 focus:ring-violet/10"><ArrowLeft size={16} />Back to history</Link>{loading ? <AnalysisSkeleton /> : error ? <AnalysisErrorState message={error} onRetry={() => window.location.reload()} /> : analysis ? <><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-violet">Saved analysis</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Analysis #{analysis.id}</h1><div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400"><span className="inline-flex items-center gap-1"><Hash size={13} />{analysis.id}</span><span className="inline-flex items-center gap-1"><CalendarDays size={13} />{formatDate(analysis.created_at)}</span></div></div><AnalysisResults analysis={analysis} /></> : null}</div>;
}
