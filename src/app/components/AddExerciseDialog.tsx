'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dumbbell, Search } from 'lucide-react';
import { Exercise } from '../types';
import { commonExercises, formatTime } from '../utils';

interface AddExerciseDialogProps {
  onAddExercise: (exercise: Exercise) => void;
}

export function AddExerciseDialog({ onAddExercise }: AddExerciseDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<typeof commonExercises[0] | null>(null);
  const [duration, setDuration] = useState('30');

  const filteredExercises = commonExercises.filter(ex =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExercise = () => {
    if (selectedExercise && duration) {
      const durationNum = parseInt(duration);
      const caloriesPerMinute = selectedExercise.caloriesBurned / selectedExercise.duration;
      const newExercise: Exercise = {
        id: Date.now().toString(),
        name: selectedExercise.name,
        duration: durationNum,
        caloriesBurned: Math.round(caloriesPerMinute * durationNum),
        type: selectedExercise.type,
        time: formatTime(new Date()),
      };
      onAddExercise(newExercise);
      setOpen(false);
      setSearchTerm('');
      setSelectedExercise(null);
      setDuration('30');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
          <Dumbbell className="w-4 h-4 mr-2" />
          Adicionar Exercício
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Adicionar Exercício</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="search-exercise">Buscar Exercício</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="search-exercise"
                placeholder="Digite o nome do exercício..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {searchTerm && (
            <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-2">
              {filteredExercises.map((exercise, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExercise(exercise)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedExercise?.name === exercise.name
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{exercise.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exercise.caloriesBurned} cal • {exercise.duration} min • {exercise.type}
                  </p>
                </button>
              ))}
            </div>
          )}

          {selectedExercise && (
            <>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{selectedExercise.name}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Tipo:</span>
                    <span className="font-semibold ml-2 text-gray-900 dark:text-gray-100 capitalize">{selectedExercise.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Calorias/min:</span>
                    <span className="font-semibold ml-2 text-gray-900 dark:text-gray-100">
                      {(selectedExercise.caloriesBurned / selectedExercise.duration).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duração (minutos)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="30"
                />
                {duration && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Calorias queimadas: <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {Math.round((selectedExercise.caloriesBurned / selectedExercise.duration) * parseInt(duration))} kcal
                    </span>
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
            Cancelar
          </Button>
          <Button
            onClick={handleAddExercise}
            disabled={!selectedExercise || !duration}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Adicionar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
