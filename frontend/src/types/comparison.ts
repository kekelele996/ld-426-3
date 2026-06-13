import { DecorStyle } from './enums';

export type PlanSource = 'moodboard' | 'quiz';

export interface ComparisonPlan {
  id: string;
  name: string;
  moodBoardId: string;
  styleTags: DecorStyle[];
  colors: string[];
  createdAt: string;
  source?: PlanSource;
  profileScores?: Record<DecorStyle, number>;
}

export function isMoodboardPlan(plan: ComparisonPlan): boolean {
  return plan.source === 'moodboard' || (!plan.source && !!plan.moodBoardId);
}

export function isQuizPlan(plan: ComparisonPlan): boolean {
  return plan.source === 'quiz';
}
