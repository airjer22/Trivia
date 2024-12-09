import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Team, UsedQuestion } from './types';
import { DEFAULT_WINNING_SCORE } from './constants';

interface GameStore extends GameState {
  initializeGame: (teams: Team[], winningScore: number) => void;
  updateScore: (teamId: string, points: number) => void;
  nextTeam: () => void;
  resetGame: () => void;
  addUsedQuestion: (question: UsedQuestion) => void;
  isQuestionUsed: (category: string, difficulty: string, question: string) => boolean;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      teams: [],
      activeTeamIndex: 0,
      winningScore: DEFAULT_WINNING_SCORE,
      isGameStarted: false,
      usedQuestions: [],

      initializeGame: (teams, winningScore) =>
        set({
          teams,
          winningScore,
          isGameStarted: true,
          activeTeamIndex: 0,
          usedQuestions: [], // Reset used questions when starting new game
        }),

      updateScore: (teamId, points) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId
              ? { ...team, score: Math.max(0, team.score + points) }
              : team
          ),
        })),

      nextTeam: () =>
        set((state) => ({
          activeTeamIndex:
            (state.activeTeamIndex + 1) % state.teams.length,
        })),

      resetGame: () =>
        set({
          teams: [],
          activeTeamIndex: 0,
          winningScore: DEFAULT_WINNING_SCORE,
          isGameStarted: false,
          usedQuestions: [], // Clear used questions on reset
        }),

      addUsedQuestion: (question: UsedQuestion) =>
        set((state) => ({
          usedQuestions: [...state.usedQuestions, question],
        })),

      isQuestionUsed: (category: string, difficulty: string, question: string) => {
        const state = get();
        return state.usedQuestions.some(
          (q) =>
            q.category === category &&
            q.difficulty === difficulty &&
            q.question === question
        );
      },
    }),
    {
      name: 'trivia-game-storage',
    }
  )
);
