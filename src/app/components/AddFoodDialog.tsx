'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { FoodItem } from '../types';
import { commonFoods, formatTime } from '../utils';

interface AddFoodDialogProps {
  onAddFood: (food: FoodItem) => void;
}

export function AddFoodDialog({ onAddFood }: AddFoodDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<typeof commonFoods[0] | null>(null);
  const [meal, setMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');

  const filteredFoods = commonFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFood = () => {
    if (selectedFood) {
      const newFood: FoodItem = {
        id: Date.now().toString(),
        ...selectedFood,
        meal,
        time: formatTime(new Date()),
      };
      onAddFood(newFood);
      setOpen(false);
      setSearchTerm('');
      setSelectedFood(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Alimento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Adicionar Alimento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="search">Buscar Alimento</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Digite o nome do alimento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {searchTerm && (
            <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-2">
              {filteredFoods.map((food, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFood(food)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedFood?.name === food.name
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-500'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{food.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {food.calories} cal • {food.protein}g prot • {food.serving}
                  </p>
                </button>
              ))}
            </div>
          )}

          {selectedFood && (
            <>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{selectedFood.name}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Calorias:</span>
                    <span className="font-semibold ml-2 text-gray-900 dark:text-gray-100">{selectedFood.calories} kcal</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Proteína:</span>
                    <span className="font-semibold ml-2 text-gray-900 dark:text-gray-100">{selectedFood.protein}g</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Carboidratos:</span>
                    <span className="font-semibold ml-2 text-gray-900 dark:text-gray-100">{selectedFood.carbs}g</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Gordura:</span>
                    <span className="font-semibold ml-2 text-gray-900 dark:text-gray-100">{selectedFood.fat}g</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meal">Refeição</Label>
                <Select value={meal} onValueChange={(value: any) => setMeal(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Café da Manhã</SelectItem>
                    <SelectItem value="lunch">Almoço</SelectItem>
                    <SelectItem value="dinner">Jantar</SelectItem>
                    <SelectItem value="snack">Lanche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
            Cancelar
          </Button>
          <Button
            onClick={handleAddFood}
            disabled={!selectedFood}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          >
            Adicionar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
