import { FoodItem, Exercise, DailyStats, DailyGoals } from './types';

export const calculateDailyStats = (
  foods: FoodItem[],
  exercises: Exercise[]
): DailyStats => {
  const caloriesConsumed = foods.reduce((sum, food) => sum + food.calories, 0);
  const caloriesBurned = exercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0);
  const proteinConsumed = foods.reduce((sum, food) => sum + food.protein, 0);
  const carbsConsumed = foods.reduce((sum, food) => sum + food.carbs, 0);
  const fatConsumed = foods.reduce((sum, food) => sum + food.fat, 0);
  const exerciseMinutes = exercises.reduce((sum, ex) => sum + ex.duration, 0);

  return {
    caloriesConsumed,
    caloriesBurned,
    proteinConsumed,
    carbsConsumed,
    fatConsumed,
    exerciseMinutes,
    netCalories: caloriesConsumed - caloriesBurned,
  };
};

export const getProgressPercentage = (current: number, goal: number): number => {
  if (goal === 0) return 0;
  return Math.min((current / goal) * 100, 100);
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

// Common food database
export const commonFoods = [
  { name: 'Arroz Branco', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, serving: '100g' },
  { name: 'Feijão Preto', calories: 132, protein: 8.9, carbs: 23.7, fat: 0.5, serving: '100g' },
  { name: 'Frango Grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g' },
  { name: 'Ovo Cozido', calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: '1 unidade' },
  { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: '1 unidade' },
  { name: 'Maçã', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, serving: '1 unidade' },
  { name: 'Pão Integral', calories: 247, protein: 13, carbs: 41, fat: 3.4, serving: '100g' },
  { name: 'Iogurte Natural', calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3, serving: '100g' },
  { name: 'Batata Doce', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: '100g' },
  { name: 'Salmão', calories: 208, protein: 20, carbs: 0, fat: 13, serving: '100g' },
  { name: 'Aveia', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, serving: '100g' },
  { name: 'Leite Integral', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, serving: '100ml' },
];

// Common exercises
export const commonExercises = [
  { name: 'Corrida', caloriesBurned: 300, duration: 30, type: 'cardio' as const },
  { name: 'Caminhada', caloriesBurned: 150, duration: 30, type: 'cardio' as const },
  { name: 'Ciclismo', caloriesBurned: 250, duration: 30, type: 'cardio' as const },
  { name: 'Natação', caloriesBurned: 400, duration: 30, type: 'cardio' as const },
  { name: 'Musculação', caloriesBurned: 200, duration: 45, type: 'strength' as const },
  { name: 'Yoga', caloriesBurned: 120, duration: 45, type: 'flexibility' as const },
  { name: 'Futebol', caloriesBurned: 350, duration: 60, type: 'sports' as const },
  { name: 'Basquete', caloriesBurned: 300, duration: 60, type: 'sports' as const },
  { name: 'Dança', caloriesBurned: 250, duration: 45, type: 'cardio' as const },
  { name: 'Pilates', caloriesBurned: 180, duration: 45, type: 'flexibility' as const },
];
