import type { AnalyzePromptResponse } from "../../types/analysis";

import { PromptComparison } from "./PromptComparison";
import { RecommendationList } from "./RecommendationList";
import { ScoreCard } from "./ScoreCard";
import { WeaknessList } from "./WeaknessList";

type AnalysisResultsProps = { analysis: AnalyzePromptResponse };

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return <div className="space-y-5"><div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]"><ScoreCard analysis={analysis} /><div className="space-y-5"><WeaknessList weaknesses={analysis.weaknesses} /><RecommendationList recommendations={analysis.recommendations} /></div></div><PromptComparison originalPrompt={analysis.original_prompt} improvedPrompt={analysis.improved_prompt} /></div>;
}
