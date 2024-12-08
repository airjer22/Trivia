"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DIFFICULTIES } from '@/lib/constants';

interface DifficultyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (difficulty: string) => void;
}

export default function DifficultyModal({
  open,
  onOpenChange,
  onSelect,
}: DifficultyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Difficulty</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {DIFFICULTIES.map((diff) => (
            <Button
              key={diff.level}
              className={`h-16 text-black font-bold text-lg hover:opacity-90 ${
                diff.level === 'easy'
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : diff.level === 'hard'
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
              onClick={() => onSelect(diff.level)}
            >
              {diff.level.charAt(0).toUpperCase() + diff.level.slice(1)} (
              {diff.points} {diff.points === 1 ? 'point' : 'points'})
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}