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
          className={`p-4 rounded-lg transition-all ${
            index === activeTeamIndex
              ? 'ring-2 ring-primary'
              : 'ring-1 ring-gray-200'
          }`}
          style={{ 
            backgroundColor: team.color,
            color: getContrastColor(team.color)
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{team.name}</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => updateScore(team.id, -1)}
              >
                -
              </Button>
              <span className="text-xl font-bold min-w-[3ch] text-center">
                {team.score}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => updateScore(team.id, 1)}
              >
                +
              </Button>
            </div>
          </div>
          {team.score >= useGameStore.getState().winningScore && (
            <div className="mt-2 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Winner!
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Helper function to determine text color based on background
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#ffffff';
}