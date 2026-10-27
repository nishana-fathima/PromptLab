import { Check, Copy, GitCompareArrows } from "lucide-react";
import { useState } from "react";

type PromptComparisonProps = { originalPrompt: string; improvedPrompt: string };

export function PromptComparison({ originalPrompt, improvedPrompt }: PromptComparisonProps) {
  const [copied, setCopied] = useState<"original" | "improved" | null>(null);

  async function copyPrompt(kind: "original" | "improved", value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied((current) => (current === kind ? null : current)), 1800);
    } catch {
      setCopied(null);
    }
  }

  function PromptPanel({ kind, title, value }: { kind: "original" | "improved"; title: string; value: string }) {
    const isCopied = copied === kind;
    return <article className="flex min-h-72 min-w-0 flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-4"><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-semibold">{title}</h3><button type="button" onClick={() => copyPrompt(kind, value)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-ink focus:outline-none focus:ring-4 focus:ring-violet/10" aria-label={`Copy ${title.toLowerCase()}`}>{isCopied ? <><Check size={14} className="text-emerald-600" />Copied</> : <><Copy size={14} />Copy</>}</button></div><p className="mt-4 flex-1 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">{value}</p></article>;
  }

  return <section aria-labelledby="comparison-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-start gap-3"><GitCompareArrows className="mt-0.5 text-violet" size={20} /><div><h2 id="comparison-heading" className="text-xl font-semibold tracking-tight">Prompt comparison</h2><p className="mt-1 text-sm text-slate-500">See what was preserved and what the evaluator made more explicit.</p></div></div><div className="mt-6 grid gap-4 lg:grid-cols-2"><PromptPanel kind="original" title="Original prompt" value={originalPrompt} /><PromptPanel kind="improved" title="Improved prompt" value={improvedPrompt} /></div></section>;
}
