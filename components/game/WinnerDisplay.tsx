"use client";

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Star, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Team } from '@/lib/types';

interface WinnerDisplayProps {
  winner: Team;
  onRestart: () => void;
}

export default function WinnerDisplay({ winner, onRestart }: WinnerDisplayProps) {
  useEffect(() => {
    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Continuous side cannons
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 20,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 20,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 text-center space-y-8 animate-in zoom-in-95">
        <div 
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${winner.color}30` }}
        >
          <Trophy className="w-20 h-20" style={{ color: winner.color }} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold">Champion!</h1>
            <Crown className="w-8 h-8 text-yellow-500" />
          </div>
          
          <p className="text-2xl font-semibold" style={{ color: winner.color }}>
            {winner.name}
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <p className="text-xl">Final Score: {winner.score}</p>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button 
            size="lg"
            onClick={onRestart}
            className="gap-2"
          >
            <PartyPopper className="w-5 h-5" />
            Play Again
          </Button>
        </div>
      </Card>
    </div>
  );
}