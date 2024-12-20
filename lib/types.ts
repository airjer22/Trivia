// Game Types
export interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
}

export interface UsedQuestion {
  category: string;
  difficulty: string;
  question: string;
}

export interface GameState {
  teams: Team[];
  activeTeamIndex: number;
  winningScore: number;
  isGameStarted: boolean;
  usedQuestions: UsedQuestion[];
}

export interface Question {
  category: string;
  difficulty: 'easy' | 'hard' | 'expert';
  question: string;
  answer: string;
  points: number;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Difficulty = {
  level: 'easy' | 'hard' | 'expert';
  points: number;
  color: string;
};
