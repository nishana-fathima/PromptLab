export function AnalysisSkeleton() {
  return <div aria-live="polite" aria-busy="true" className="space-y-5"><p className="sr-only">Analysis is being prepared.</p><div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]"><div className="h-[27rem] animate-pulse rounded-3xl bg-slate-200/70" /><div className="h-[27rem] animate-pulse rounded-3xl bg-slate-200/70" /></div><div className="grid gap-5 lg:grid-cols-2"><div className="h-64 animate-pulse rounded-3xl bg-slate-200/70" /><div className="h-64 animate-pulse rounded-3xl bg-slate-200/70" /></div></div>;
}
