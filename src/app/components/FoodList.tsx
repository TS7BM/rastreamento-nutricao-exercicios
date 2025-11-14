'use client';

import { Apple, Trash2, Coffee, Utensils, Moon, Cookie } from 'lucide-react';
import { FoodItem } from '../types';
import { Button } from '@/components/ui/button';

interface FoodListProps {
  foods: FoodItem[];
  onRemoveFood: (id: string) => void;
}

const mealIcons = {
  breakfast: Coffee,
  lunch: Utensils,
  dinner: Moon,
  snack: Cookie,
};

const mealLabels = {
  breakfast: 'Café da Manhã',
  lunch: 'Almoço',
  dinner: 'Jantar',
  snack: 'Lanche',
};

export function FoodList({ foods, onRemoveFood }: FoodListProps) {
  if (foods.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
        <Apple className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Nenhum alimento registrado hoje</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Adicione sua primeira refeição!</p>
      </div>
    );
  }

  const groupedFoods = foods.reduce((acc, food) => {
    if (!acc[food.meal]) acc[food.meal] = [];
    acc[food.meal].push(food);
    return acc;
  }, {} as Record<string, FoodItem[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedFoods).map(([meal, items]) => {
        const Icon = mealIcons[meal as keyof typeof mealIcons];
        const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
        
        return (
          <div key={meal} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {mealLabels[meal as keyof typeof mealLabels]}
                </h3>
              </div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {totalCalories} kcal
              </span>
            </div>
            
            <div className="space-y-2">
              {items.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{food.name}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{food.time}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-600 dark:text-gray-400">
                      <span>{food.calories} cal</span>
                      <span>P: {food.protein}g</span>
                      <span>C: {food.carbs}g</span>
                      <span>G: {food.fat}g</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFood(food.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
