import { BarChart3, CircleHelp } from "lucide-react";

import type { AnalyzePromptResponse } from "../../types/analysis";

const criterionLabels: Record<string, string> = {
  clarity: "Clarity",
  specificity: "Specificity",
  context: "Context",
  completeness: "Completeness",
  constraints: "Constraints",
  expected_output: "Expected output",
};

function scoreColor(score: number) {
  if (score >= 81) return "text-emerald-600";
  if (score >= 61) return "text-sky-600";
  if (score >= 41) return "text-amber-600";
  return "text-rose-600";
}

type ScoreCardProps = {
  analysis: AnalyzePromptResponse;
};

export function ScoreCard({ analysis }: ScoreCardProps) {
  const score = Math.max(0, Math.min(100, analysis.total_score));
  const progress = { background: `conic-gradient(#6657d9 ${score * 3.6}deg, #e8eaf2 0deg)` };

  return (
    <section aria-labelledby="score-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-center justify-between gap-4"><div><div className="flex items-center gap-2 text-violet"><BarChart3 size={17} /><span className="font-mono text-xs uppercase tracking-[0.18em]">Evaluation</span></div><h2 id="score-heading" className="mt-3 text-xl font-semibold tracking-tight">Prompt quality score</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] text-slate-500">RUBRIC {analysis.rubric_version}</span></div>
      <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-center">
        <div className="relative grid h-36 w-36 shrink-0 place-items-center self-center rounded-full" style={progress} aria-label={`Prompt quality score: ${score} out of 100`} role="img"><div className="grid h-28 w-28 place-items-center rounded-full bg-white"><div className="text-center"><strong className="block text-3xl font-semibold tracking-tight">{score}</strong><span className="text-xs text-slate-400">/ 100</span></div></div></div>
        <div><p className={`text-xl font-semibold ${scoreColor(score)}`}>{analysis.score_interpretation}</p><p className="mt-2 max-w-md text-sm leading-6 text-slate-500">This is a heuristic evaluation based on the documented PromptLab rubric, not a guarantee of implementation success.</p></div>
      </div>
      <div className="mt-8 border-t border-slate-100 pt-6"><div className="mb-4 flex items-center gap-2"><h3 className="text-sm font-semibold">Scoring criteria</h3><CircleHelp size={15} className="text-slate-400" aria-label="Scores are provided by the analysis API" /></div><div className="grid gap-4 sm:grid-cols-2">{analysis.dimensions.map((dimension) => <div key={dimension.name}><div className="flex items-center justify-between gap-3 text-sm"><span className="font-medium text-slate-700">{criterionLabels[dimension.name]}</span><span className="font-mono text-xs text-slate-500">{dimension.score} / {dimension.max_score}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-violet transition-all duration-500" style={{ width: `${(dimension.score / dimension.max_score) * 100}%` }} /></div><p className="mt-2 text-xs leading-5 text-slate-500">{dimension.assessment}</p></div>)}</div></div>
    </section>
  );
}
