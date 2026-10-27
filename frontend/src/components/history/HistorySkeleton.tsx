export function HistorySkeleton() {
  return <div aria-live="polite" aria-busy="true" className="space-y-3"><p className="sr-only">Loading prompt history.</p>{[1, 2, 3].map((item) => <div key={item} className="h-24 animate-pulse rounded-2xl bg-slate-200/70" />)}</div>;
}
