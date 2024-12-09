"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Category } from '@/lib/types';
import { useGameStore } from '@/lib/store';
import { DIFFICULTIES } from '@/lib/constants';

interface QuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  difficulty: string | null;
}

export default function QuestionModal({
  open,
  onOpenChange,
  category,
  difficulty,
}: QuestionModalProps) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [question, setQuestion] = useState<{
    question: string;
    answer: string;
    explanation: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { updateScore, nextTeam, addUsedQuestion, isQuestionUsed } = useGameStore();

  const resetState = () => {
    setTimeLeft(30);
    setIsAnswerRevealed(false);
    setQuestion(null);
  };

  useEffect(() => {
    async function fetchQuestion() {
      if (category && difficulty && open) {
        setIsLoading(true);
        resetState();
        try {
          const response = await fetch('/api/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              category: category.name,
              difficulty,
            }),
          });
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }

          // Check if question is already used
          if (isQuestionUsed(category.name, difficulty, data.question)) {
            // If we've tried too many times, use the question anyway to prevent infinite loops
            if (retryCount >= 5) {
              setQuestion(data);
              setRetryCount(0);
            } else {
              setRetryCount(prev => prev + 1);
              // Retry fetching a new question
              fetchQuestion();
              return;
            }
          } else {
            setQuestion(data);
            setRetryCount(0);
          }
          
          setTimeLeft(30);
        } catch (error) {
          console.error('Error fetching question:', error);
          setQuestion({
            question: 'Failed to load question. Please try again.',
            answer: 'N/A',
            explanation: 'There was an error generating the question.',
          });
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchQuestion();
  }, [category, difficulty, open, isQuestionUsed, retryCount]);

  useEffect(() => {
    if (open && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [open, timeLeft]);

  const handleCorrect = () => {
    const points = DIFFICULTIES.find((d) => d.level === difficulty)?.points || 1;
    
    // Add question to used questions list
    if (category && difficulty && question) {
      addUsedQuestion({
        category: category.name,
        difficulty,
        question: question.question,
      });
    }
    
    updateScore(
      useGameStore.getState().teams[useGameStore.getState().activeTeamIndex].id,
      points
    );
    onOpenChange(false);
    nextTeam();
  };

  const handleIncorrect = () => {
    // Add question to used questions list even if incorrect
    if (category && difficulty && question) {
      addUsedQuestion({
        category: category.name,
        difficulty,
        question: question.question,
      });
    }
    
    onOpenChange(false);
    nextTeam();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {category?.name} - {difficulty?.toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 min-h-[300px]">
          <div className="relative">
            <div
              className={`w-32 h-32 rounded-full border-8 mx-auto mb-4 transition-all duration-300 ${
                timeLeft <= 10 ? 'border-red-500 animate-pulse' : 'border-gray-200'
              }`}
              style={{
                background: `conic-gradient(${
                  timeLeft <= 10 ? '#ef4444' : '#3b82f6'
                } ${
                  (timeLeft / 30) * 360
                }deg, transparent 0deg)`,
                transform: timeLeft <= 10 ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.2s',
              }}
            >
              <div className={`absolute inset-0 flex items-center justify-center text-4xl font-bold transition-colors ${
                timeLeft <= 10 ? 'text-red-500' : ''
              }`}>
                {timeLeft}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <p className="text-xl text-center">{question?.question}</p>

              {!isAnswerRevealed ? (
                <Button
                  className="w-full"
                  onClick={() => setIsAnswerRevealed(true)}
                >
                  Reveal Answer
                </Button>
              ) : (
                <>
                  <div className="space-y-4">
                    <p className="text-xl text-center font-bold">{question?.answer}</p>
                    <p className="text-sm text-muted-foreground text-center">{question?.explanation}</p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={handleCorrect}
                    >
                      Correct
                    </Button>
                    <Button
                      className="flex-1 bg-red-500 hover:bg-red-600"
                      onClick={handleIncorrect}
                    >
                      Incorrect
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
