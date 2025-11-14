// Types for Food & Exercise Tracker

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  time: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface Exercise {
  id: string;
  name: string;
  duration: number; // in minutes
  caloriesBurned: number;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports';
  time: string;
}

export interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  exercise: number; // minutes
}

export interface DailyStats {
  caloriesConsumed: number;
  caloriesBurned: number;
  proteinConsumed: number;
  carbsConsumed: number;
  fatConsumed: number;
  exerciseMinutes: number;
  netCalories: number;
}
