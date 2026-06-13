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
