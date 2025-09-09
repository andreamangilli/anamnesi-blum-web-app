'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Heart, 
  CheckCircle2
} from 'lucide-react';

interface CompactLifestyleStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function CompactLifestyleStep({ data, onUpdate, onNext }: CompactLifestyleStepProps) {
  const [formData, setFormData] = useState({
    diet: data?.lifestyle?.diet || [],
    exercise: data?.lifestyle?.exercise || 3,
    sleep: data?.lifestyle?.sleep || 7,
    stress: data?.lifestyle?.stress || 3,
    smoking: data?.lifestyle?.smoking || false,
    alcohol: data?.lifestyle?.alcohol || 'occasionally'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ lifestyle: formData });
    onNext();
  };

  const dietOptions = [
    '🥗 Equilibrata', '🥬 Vegetariana', '🌱 Vegana', '🥑 Chetogenica', '🫒 Mediterranea', '🍗 Low-carb'
  ];

  const alcoholOptions = [
    { value: 'never', label: '🚫 Mai' },
    { value: 'rarely', label: '🟡 Raramente' },
    { value: 'occasionally', label: '🟠 Occasionalmente' },
    { value: 'regularly', label: '🔴 Regolarmente' }
  ];

  const updateDiet = (option: string) => {
    const newDiet = formData.diet.includes(option)
      ? formData.diet.filter((d: string) => d !== option)
      : [...formData.diet, option];
    setFormData({ ...formData, diet: newDiet });
  };

  const isValidForm = formData.diet.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-5 h-5 text-blum-primary" />
              <h3 className="font-semibold text-slate-900">💪 Abitudini di Vita</h3>
            </div>
            
            {/* Diet */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">🍽️ Tipo di Alimentazione *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {dietOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-2 border border-slate-200 rounded-lg hover:border-blum-secondary">
                    <Checkbox
                      id={`diet-${option}`}
                      checked={formData.diet.includes(option)}
                      onCheckedChange={() => updateDiet(option)}
                    />
                    <Label htmlFor={`diet-${option}`} className="text-sm cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercise */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">
                🏃‍♀️ Esercizio Fisico (giorni a settimana): {formData.exercise}
              </Label>
              <Slider
                value={[formData.exercise]}
                onValueChange={(value) => setFormData({ ...formData, exercise: value[0] })}
                max={7}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Mai</span>
                <span>Ogni giorno</span>
              </div>
            </div>

            {/* Sleep */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">
                😴 Sonno (ore per notte): {formData.sleep}
              </Label>
              <Slider
                value={[formData.sleep]}
                onValueChange={(value) => setFormData({ ...formData, sleep: value[0] })}
                max={12}
                min={4}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>4h</span>
                <span>12h</span>
              </div>
            </div>

            {/* Stress */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">
                😰 Livello di Stress: {formData.stress}/5
              </Label>
              <Slider
                value={[formData.stress]}
                onValueChange={(value) => setFormData({ ...formData, stress: value[0] })}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Basso</span>
                <span>Alto</span>
              </div>
            </div>

            {/* Quick Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg">
                <Checkbox
                  id="smoking"
                  checked={formData.smoking}
                  onCheckedChange={(checked) => setFormData({ ...formData, smoking: !!checked })}
                />
                <Label htmlFor="smoking" className="text-sm cursor-pointer">
                  🚬 Fumo
                </Label>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">🍷 Consumo di Alcol</Label>
                <div className="grid grid-cols-2 gap-1">
                  {alcoholOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 p-2 border border-slate-200 rounded hover:border-blum-secondary">
                      <input
                        type="radio"
                        id={`alcohol-${option.value}`}
                        name="alcohol"
                        value={option.value}
                        checked={formData.alcohol === option.value}
                        onChange={(e) => setFormData({ ...formData, alcohol: e.target.value })}
                        className="w-3 h-3"
                      />
                      <Label htmlFor={`alcohol-${option.value}`} className="text-sm cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isValidForm}
            className="bg-blum-primary hover:bg-[#21333A] text-white px-6"
          >
            {isValidForm ? (
              <span className="flex items-center space-x-2">
                <span>Continua</span>
                <CheckCircle2 className="w-4 h-4" />
              </span>
            ) : (
              <span>Seleziona il tipo di alimentazione</span>
            )}
          </Button>
        </div>
        
      </form>
    </motion.div>
  );
}
