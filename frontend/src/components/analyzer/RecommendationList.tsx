import { ArrowUpRight, CheckCheck } from "lucide-react";

import type { PromptRecommendation } from "../../types/analysis";

type RecommendationListProps = { recommendations: PromptRecommendation[] };

export function RecommendationList({ recommendations }: RecommendationListProps) {
  return <section aria-labelledby="recommendations-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-start justify-between gap-4"><div><h2 id="recommendations-heading" className="text-xl font-semibold tracking-tight">Recommendations</h2><p className="mt-1 text-sm text-slate-500">Practical changes suggested by the evaluator.</p></div><ArrowUpRight size={19} className="text-violet" /></div>{recommendations.length === 0 ? <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600"><CheckCheck size={18} />No recommendations were returned.</div> : <ul className="mt-6 space-y-3">{recommendations.map((recommendation, index) => <li key={`${recommendation.title}-${index}`} className="rounded-2xl border border-slate-100 p-4"><h3 className="text-sm font-semibold">{recommendation.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{recommendation.description}</p><div className="mt-3 border-l-2 border-violet/30 pl-3 text-xs leading-5 text-slate-500"><span className="font-semibold text-slate-700">Why this helps: </span>{recommendation.reason}</div></li>)}</ul>}</section>;
}
