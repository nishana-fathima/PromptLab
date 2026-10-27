export type CriterionName =
  | "clarity"
  | "specificity"
  | "context"
  | "completeness"
  | "constraints"
  | "expected_output";

export type CriterionScore = {
  name: CriterionName;
  score: number;
  max_score: number;
  assessment: string;
};

export type PromptWeakness = {
  title: string;
  description: string;
  severity?: "high" | "medium" | "low";
  explanation?: string;
};

export type PromptRecommendation = {
  title: string;
  description: string;
  reason: string;
};

export type AnalyzePromptRequest = {
  prompt: string;
};

export type AnalyzePromptResponse = {
  id: number;
  original_prompt: string;
  improved_prompt: string;
  total_score: number;
  score_interpretation: string;
  dimensions: CriterionScore[];
  weaknesses: PromptWeakness[];
  missing_requirements: string[];
  recommendations: PromptRecommendation[];
  rubric_version: string;
  model_name: string;
  created_at: string;
};

export type AnalysisHistoryItem = {
  id: number;
  original_prompt_preview: string;
  total_score: number;
  score_interpretation: string;
  created_at: string;
};

export type AnalysisHistoryResponse = {
  items: AnalysisHistoryItem[];
  total: number;
  limit: number;
  offset: number;
};
