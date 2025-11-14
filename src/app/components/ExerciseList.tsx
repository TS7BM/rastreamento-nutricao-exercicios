'use client';

import { Dumbbell, Trash2, Activity, Heart, Zap, Trophy } from 'lucide-react';
import { Exercise } from '../types';
import { Button } from '@/components/ui/button';

interface ExerciseListProps {
  exercises: Exercise[];
  onRemoveExercise: (id: string) => void;
}

const typeIcons = {
  cardio: Activity,
  strength: Dumbbell,
  flexibility: Heart,
  sports: Trophy,
};

const typeColors = {
  cardio: 'from-red-500 to-pink-600',
  strength: 'from-blue-500 to-indigo-600',
  flexibility: 'from-purple-500 to-pink-500',
  sports: 'from-orange-500 to-red-600',
};

export function ExerciseList({ exercises, onRemoveExercise }: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
        <Zap className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Nenhum exercício registrado hoje</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Adicione sua primeira atividade!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {exercises.map((exercise) => {
        const Icon = typeIcons[exercise.type];
        const colorClass = typeColors[exercise.type];
        
        return (
          <div
            key={exercise.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2.5 bg-gradient-to-r ${colorClass} rounded-xl`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">{exercise.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{exercise.time}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" />
                      {exercise.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      {exercise.caloriesBurned} cal
                    </span>
                    <span className="capitalize text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                      {exercise.type}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveExercise(exercise.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
