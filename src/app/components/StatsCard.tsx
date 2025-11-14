'use client';

import { LucideIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StatsCardProps {
  title: string;
  current: number;
  goal: number;
  unit: string;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({ title, current, goal, unit, icon: Icon, color }: StatsCardProps) {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  const remaining = Math.max(goal - current, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {current.toFixed(0)}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                / {goal} {unit}
              </span>
            </p>
          </div>
        </div>
      </div>
      
      <Progress value={percentage} className="h-2.5 mb-2" />
      
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {remaining > 0 ? (
          <>Faltam <span className="font-semibold text-gray-700 dark:text-gray-300">{remaining.toFixed(0)} {unit}</span> para a meta</>
        ) : (
          <span className="font-semibold text-green-600 dark:text-green-400">Meta atingida! 🎉</span>
        )}
      </p>
    </div>
  );
}
