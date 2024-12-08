"use client";

import GameSetup from '@/components/game/GameSetup';
import GameBoard from '@/components/game/GameBoard';
import { useGameStore } from '@/lib/store';
import { PageTitle } from '@/components/layout/PageTitle';

export default function Home() {
  const isGameStarted = useGameStore((state) => state.isGameStarted);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <PageTitle />
        {!isGameStarted ? <GameSetup /> : <GameBoard />}
      </div>
    </main>
  );
}