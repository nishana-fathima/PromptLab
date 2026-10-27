import { useEffect, useRef, useState } from "react";

import { AnalysisErrorState } from "../components/analyzer/AnalysisErrorState";
import { AnalysisResults } from "../components/analyzer/AnalysisResults";
import { AnalysisSkeleton } from "../components/analyzer/AnalysisSkeleton";
import { PromptEditor } from "../components/analyzer/PromptEditor";
import { analyzePrompt, AnalysisApiError } from "../services/analysisService";
import type { AnalyzePromptResponse } from "../types/analysis";

export function AnalyzePage() {
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState<AnalyzePromptResponse | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const requestController = useRef<AbortController | null>(null);

  useEffect(() => () => requestController.current?.abort(), []);

  function updatePrompt(value: string) {
    setPrompt(value);
    if (validationError && value.trim()) setValidationError(null);
  }

  async function submitAnalysis() {
    if (!prompt.trim()) {
      setValidationError("Enter a coding prompt before analyzing it.");
      return;
    }

    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    setValidationError(null);
    setError(null);
    setLoading(true);

    try {
      const result = await analyzePrompt({ prompt: prompt.trim() }, controller.signal);
      if (!controller.signal.aborted) setAnalysis(result);
    } catch (requestError) {
      if (controller.signal.aborted) return;
      setError(requestError instanceof AnalysisApiError ? requestError.message : "The analysis could not be completed. Please try again.");
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  return <div className="space-y-8"><div className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-[0.22em] text-violet">Analysis workspace</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Make your next coding prompt count.</h1><p className="mt-3 text-base leading-7 text-slate-500">Describe what you want AI to build. PromptLab will evaluate the request against six quality dimensions and show how to make it more actionable.</p></div><PromptEditor prompt={prompt} loading={loading} validationError={validationError} onPromptChange={updatePrompt} onSubmit={submitAnalysis} />{loading ? <AnalysisSkeleton /> : error ? <AnalysisErrorState message={error} onRetry={submitAnalysis} /> : analysis ? <AnalysisResults analysis={analysis} /> : <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center"><p className="text-sm font-semibold text-slate-600">Your evaluation will appear here</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">Submit a prompt to see its score, relevant gaps, recommendations, and improved version.</p></div>}</div>;
}
