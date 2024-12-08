"use client";

import { CATEGORIES } from '@/lib/constants';
import { Category } from '@/lib/types';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface CategoryGridProps {
  onCategorySelect: (category: Category) => void;
}

export default function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {CATEGORIES.map((category) => {
        const IconComponent = Icons[category.icon as keyof typeof Icons] as LucideIcon;
        
        return (
          <Card
            key={category.id}
            className="p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onCategorySelect(category)}
          >
            <div className="flex flex-col items-center space-y-4">
              <IconComponent className="w-12 h-12" />
              <h3 className="text-lg font-semibold text-center">
                {category.name}
              </h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
}