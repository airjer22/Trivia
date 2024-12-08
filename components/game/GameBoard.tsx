"use client";

import { useState } from 'react';
import { useGameStore } from '@/lib/store';
import CategoryGrid from './CategoryGrid';
import Scoreboard from './Scoreboard';
import QuestionModal from './QuestionModal';
import DifficultyModal from './DifficultyModal';
import { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { PageTitle } from '@/components/layout/PageTitle';

export default function GameBoard() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const resetGame = useGameStore((state) => state.resetGame);

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
        <ThemeToggle />
      </div>

      <PageTitle />
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
    </div>
  );
}