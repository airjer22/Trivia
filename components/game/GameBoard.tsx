"use client";

import { useState } from 'react';
import { useGameStore } from '@/lib/store';
import CategoryGrid from './CategoryGrid';
import Scoreboard from './Scoreboard';
import QuestionModal from './QuestionModal';
import DifficultyModal from './DifficultyModal';
import { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Home, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import WinnerDisplay from './WinnerDisplay';

export default function GameBoard() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const { teams, winningScore, resetGame } = useGameStore();
  const { theme, setTheme } = useTheme();

  const winner = teams.find((team) => team.score >= winningScore);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setIsDifficultyModalOpen(true);
  };

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setIsDifficultyModalOpen(false);
    setIsQuestionModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={resetGame}
          className="rounded-full"
        >
          <Home className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Return to home</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <Scoreboard />
      <CategoryGrid onCategorySelect={handleCategorySelect} />

      <DifficultyModal
        open={isDifficultyModalOpen}
        onOpenChange={setIsDifficultyModalOpen}
        onSelect={handleDifficultySelect}
      />

      <QuestionModal
        open={isQuestionModalOpen}
        onOpenChange={setIsQuestionModalOpen}
        category={selectedCategory}
        difficulty={selectedDifficulty}
      />
      
      {winner && (
        <WinnerDisplay
          winner={winner}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}