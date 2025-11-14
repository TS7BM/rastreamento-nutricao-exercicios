'use client';

import { useState, useEffect } from 'react';
import { Flame, Activity, Drumstick, Dumbbell, Target, TrendingUp, Calendar } from 'lucide-react';
import { FoodItem, Exercise, DailyGoals } from './types';
import { calculateDailyStats } from './utils';
import { StatsCard } from './components/StatsCard';
import { AddFoodDialog } from './components/AddFoodDialog';
import { AddExerciseDialog } from './components/AddExerciseDialog';
import { FoodList } from './components/FoodList';
import { ExerciseList } from './components/ExerciseList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [goals] = useState<DailyGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    exercise: 60,
  });

  // Load data from localStorage
  useEffect(() => {
    const savedFoods = localStorage.getItem('foods');
    const savedExercises = localStorage.getItem('exercises');
    if (savedFoods) setFoods(JSON.parse(savedFoods));
    if (savedExercises) setExercises(JSON.parse(savedExercises));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('foods', JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  const stats = calculateDailyStats(foods, exercises);

  const handleAddFood = (food: FoodItem) => {
    setFoods([...foods, food]);
  };

  const handleRemoveFood = (id: string) => {
    setFoods(foods.filter(f => f.id !== id));
  };

  const handleAddExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
  };

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter(e => e.id !== id));
  };

  const caloriesRemaining = goals.calories - stats.netCalories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  FitTracker
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Seu diário de saúde</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              <span className="sm:hidden">{new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Calories Summary Card */}
        <div className="mb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm sm:text-base opacity-90 mb-1">Calorias Restantes</p>
              <h2 className="text-4xl sm:text-6xl font-bold">
                {caloriesRemaining > 0 ? caloriesRemaining.toFixed(0) : 0}
              </h2>
              <p className="text-sm sm:text-base opacity-90 mt-2">
                Meta: {goals.calories} kcal
              </p>
            </div>
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Flame className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white/30">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Drumstick className="w-4 h-4" />
                <p className="text-xs sm:text-sm opacity-90">Consumido</p>
              </div>
              <p className="text-xl sm:text-2xl font-bold">{stats.caloriesConsumed}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Dumbbell className="w-4 h-4" />
                <p className="text-xs sm:text-sm opacity-90">Queimado</p>
              </div>
              <p className="text-xl sm:text-2xl font-bold">{stats.caloriesBurned}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4" />
                <p className="text-xs sm:text-sm opacity-90">Líquido</p>
              </div>
              <p className="text-xl sm:text-2xl font-bold">{stats.netCalories}</p>
            </div>
          </div>
        </div>

        {/* Macros Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatsCard
            title="Proteína"
            current={stats.proteinConsumed}
            goal={goals.protein}
            unit="g"
            icon={TrendingUp}
            color="bg-gradient-to-r from-blue-500 to-indigo-600"
          />
          <StatsCard
            title="Carboidratos"
            current={stats.carbsConsumed}
            goal={goals.carbs}
            unit="g"
            icon={TrendingUp}
            color="bg-gradient-to-r from-orange-500 to-red-600"
          />
          <StatsCard
            title="Gordura"
            current={stats.fatConsumed}
            goal={goals.fat}
            unit="g"
            icon={TrendingUp}
            color="bg-gradient-to-r from-yellow-500 to-orange-600"
          />
          <StatsCard
            title="Exercício"
            current={stats.exerciseMinutes}
            goal={goals.exercise}
            unit="min"
            icon={Activity}
            color="bg-gradient-to-r from-purple-500 to-pink-600"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="food" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-1">
            <TabsTrigger value="food" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
              <Drumstick className="w-4 h-4 mr-2" />
              Alimentos
            </TabsTrigger>
            <TabsTrigger value="exercise" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <Dumbbell className="w-4 h-4 mr-2" />
              Exercícios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="food" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Refeições de Hoje</h2>
              <AddFoodDialog onAddFood={handleAddFood} />
            </div>
            <FoodList foods={foods} onRemoveFood={handleRemoveFood} />
          </TabsContent>

          <TabsContent value="exercise" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Atividades de Hoje</h2>
              <AddExerciseDialog onAddExercise={handleAddExercise} />
            </div>
            <ExerciseList exercises={exercises} onRemoveExercise={handleRemoveExercise} />
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Dicas para Hoje
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Beba pelo menos 2 litros de água ao longo do dia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Faça refeições a cada 3-4 horas para manter o metabolismo ativo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Inclua proteínas em todas as refeições para maior saciedade</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
