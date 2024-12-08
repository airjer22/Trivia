import { Category, Difficulty } from './types';
import {
  Atom,
  History,
  Calculator,
  Globe2,
  Monitor,
  Trophy,
  Lightbulb,
  Rocket,
} from 'lucide-react';

export const CATEGORIES: Category[] = [
  { id: 'science', name: 'Science & Nature', icon: 'Atom' },
  { id: 'history', name: 'History', icon: 'History' },
  { id: 'math', name: 'Math', icon: 'Calculator' },
  { id: 'geography', name: 'Geography', icon: 'Globe2' },
  { id: 'computers', name: 'Computers', icon: 'Monitor' },
  { id: 'sports', name: 'Sports', icon: 'Trophy' },
  { id: 'funfacts', name: 'Fun Facts', icon: 'Lightbulb' },
  { id: 'space', name: 'Space', icon: 'Rocket' },
];

export const DIFFICULTIES: Difficulty[] = [
  { level: 'easy', points: 1, color: 'bg-emerald-500' },
  { level: 'hard', points: 2, color: 'bg-orange-500' },
  { level: 'expert', points: 3, color: 'bg-red-500' },
];

export const DEFAULT_WINNING_SCORE = 15;
export const MIN_TEAMS = 2;
export const MAX_TEAMS = 6;
export const TIMER_DURATION = 30;