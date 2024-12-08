"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useGameStore } from '@/lib/store';
import { MIN_TEAMS, MAX_TEAMS, DEFAULT_WINNING_SCORE } from '@/lib/constants';

export default function GameSetup() {
  const [teamCount, setTeamCount] = useState(MIN_TEAMS);
  const [winningScore, setWinningScore] = useState(DEFAULT_WINNING_SCORE);
  const [teams, setTeams] = useState(
    Array(MIN_TEAMS).fill('').map((_, i) => ({
      id: `team-${i}`,
      name: `Team ${i + 1}`,
      color: `hsl(${(i * 360) / MIN_TEAMS}, 70%, 50%)`,
      score: 0,
    }))
  );

  const initializeGame = useGameStore((state) => state.initializeGame);

  const handleTeamCountChange = (count: number) => {
    if (count >= MIN_TEAMS && count <= MAX_TEAMS) {
      setTeamCount(count);
      setTeams(
        Array(count)
          .fill('')
          .map((_, i) => ({
            id: `team-${i}`,
            name: `Team ${i + 1}`,
            color: `hsl(${(i * 360) / count}, 70%, 50%)`,
            score: 0,
          }))
      );
    }
  };

  const handleStartGame = () => {
    initializeGame(teams, winningScore);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Trivia Game Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Number of Teams</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleTeamCountChange(teamCount - 1)}
              disabled={teamCount <= MIN_TEAMS}
            >
              -
            </Button>
            <span className="flex items-center justify-center w-12">
              {teamCount}
            </span>
            <Button
              variant="outline"
              onClick={() => handleTeamCountChange(teamCount + 1)}
              disabled={teamCount >= MAX_TEAMS}
            >
              +
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Team Names</Label>
          {teams.map((team, index) => (
            <div key={team.id} className="flex gap-4">
              <Input
                value={team.name}
                onChange={(e) => {
                  const newTeams = [...teams];
                  newTeams[index].name = e.target.value;
                  setTeams(newTeams);
                }}
                placeholder={`Team ${index + 1}`}
              />
              <input
                type="color"
                value={team.color}
                onChange={(e) => {
                  const newTeams = [...teams];
                  newTeams[index].color = e.target.value;
                  setTeams(newTeams);
                }}
                className="w-12 h-10 rounded border"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Label>Winning Score</Label>
          <Input
            type="number"
            value={winningScore}
            onChange={(e) =>
              setWinningScore(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="1"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleStartGame}
          disabled={teams.some((team) => !team.name.trim())}
        >
          Start Game
        </Button>
      </CardFooter>
    </Card>
  );
}