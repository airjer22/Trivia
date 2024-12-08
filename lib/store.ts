import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Team } from './types';
import { DEFAULT_WINNING_SCORE } from './constants';

interface GameStore extends GameState {
  initializeGame: (teams: Team[], winningScore: number) => void;
  updateScore: (teamId: string, points: number) => void;
  nextTeam: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      teams: [],
      activeTeamIndex: 0,
      winningScore: DEFAULT_WINNING_SCORE,
      isGameStarted: false,

      initializeGame: (teams, winningScore) =>
        set({
          teams,
          winningScore,
          isGameStarted: true,
          activeTeamIndex: 0,
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
        }),
    }),
    {
      name: 'trivia-game-storage',
    }
  )
);