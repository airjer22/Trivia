"use client";

import { useGameStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

export default function Scoreboard() {
  const { teams, activeTeamIndex, updateScore } = useGameStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team, index) => (
        <div
          key={team.id}
          className={`p-4 rounded-lg ${
            index === activeTeamIndex
              ? 'ring-2 ring-primary'
              : 'ring-1 ring-gray-200'
          }`}
          style={{ backgroundColor: team.color + '20' }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{team.name}</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateScore(team.id, -1)}
              >
                -
              </Button>
              <span className="text-xl font-bold min-w-[3ch] text-center">
                {team.score}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateScore(team.id, 1)}
              >
                +
              </Button>
            </div>
          </div>
          {team.score >= useGameStore.getState().winningScore && (
            <div className="mt-2 flex items-center text-yellow-600">
              <Trophy className="w-5 h-5 mr-2" />
              Winner!
            </div>
          )}
        </div>
      ))}
    </div>
  );
}