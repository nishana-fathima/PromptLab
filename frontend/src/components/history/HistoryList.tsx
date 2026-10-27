import { ArrowUpRight, CalendarDays, Hash, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";

import type { AnalysisHistoryItem } from "../../types/analysis";
import { formatDate } from "../../utils/format";

type HistoryListProps = { items: AnalysisHistoryItem[] };

export function HistoryList({ items }: HistoryListProps) {
  return <div className="space-y-3">{items.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-violet/40 hover:shadow-sm sm:p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400"><span className="inline-flex items-center gap-1"><Hash size={13} />{item.id}</span><span className="inline-flex items-center gap-1"><CalendarDays size={13} />{formatDate(item.created_at)}</span></div><div className="mt-3 flex items-start gap-2"><MessageSquareText size={17} className="mt-0.5 shrink-0 text-violet" /><p className="line-clamp-2 text-sm leading-6 text-slate-700">{item.original_prompt_preview}</p></div></div><div className="flex items-center justify-between gap-4 sm:justify-end"><div className="text-left sm:text-right"><p className="font-mono text-2xl font-semibold tracking-tight text-ink">{item.total_score}<span className="text-sm font-normal text-slate-400">/100</span></p><p className="text-xs font-medium text-slate-500">{item.score_interpretation}</p></div><Link to={`/history/${item.id}`} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-violet/40 hover:text-violet focus:outline-none focus:ring-4 focus:ring-violet/10">Details<ArrowUpRight size={14} /></Link></div></div></article>)}</div>;
}
