'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Award, 
  CheckCircle2
} from 'lucide-react';

interface CompactGoalsStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function CompactGoalsStep({ data, onUpdate, onNext }: CompactGoalsStepProps) {
  const [formData, setFormData] = useState({
    goals: data?.goals?.goals || [],
    timeline: data?.goals?.timeline || '',
    additionalInfo: data?.goals?.additionalInfo || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ goals: formData });
    onNext();
  };

  const goalOptions = [
    '⏳ Anti-età', '🔴 Trattamento acne', '✨ Illuminare la pelle', '🔍 Riduzione pori', 
    '💧 Idratazione', '🌈 Uniformare il tono', '🩹 Riduzione cicatrici', '🛡️ Prevenzione'
  ];

  const timelineOptions = [
    { value: 'immediate', label: '⚡ 1-3 mesi' },
    { value: 'short', label: '📅 3-6 mesi' },
    { value: 'medium', label: '⏰ 6-12 mesi' },
    { value: 'long', label: '🎯 1+ anni' }
  ];


  const updateGoals = (goal: string) => {
    const newGoals = formData.goals.includes(goal)
      ? formData.goals.filter((g: string) => g !== goal)
      : [...formData.goals, goal];
    setFormData({ ...formData, goals: newGoals });
  };

  const isValidForm = formData.goals.length > 0 && formData.timeline;

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
              <Award className="w-5 h-5 text-blum-primary" />
              <h3 className="font-semibold text-slate-900">🎯 I Tuoi Obiettivi</h3>
            </div>
            
            {/* Goals */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">🌟 Cosa vorresti ottenere? *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {goalOptions.map((goal) => (
                <motion.div 
                  key={goal} 
                  className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.goals.includes(goal)
                      ? 'border-[#3A5762] bg-[#3A5762]/10 text-[#3A5762] shadow-md' 
                      : 'border-gray-200 hover:border-[#3A5762]/50 hover:bg-gray-50'
                  }`}
                  onClick={() => updateGoals(goal)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${
                    formData.goals.includes(goal)
                      ? 'border-[#3A5762] bg-[#3A5762]' 
                      : 'border-gray-300'
                  }`}>
                    {formData.goals.includes(goal) && (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <Label className={`text-sm cursor-pointer font-medium ${
                    formData.goals.includes(goal) ? 'text-[#3A5762]' : 'text-gray-600'
                  }`}>
                    {goal}
                  </Label>
                </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">⏱️ Tempistiche *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {timelineOptions.map((option) => (
                  <motion.div 
                    key={option.value} 
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      formData.timeline === option.value 
                        ? 'border-[#3A5762] bg-[#3A5762]/10 text-[#3A5762] shadow-md scale-105' 
                        : 'border-gray-200 hover:border-[#3A5762]/50 hover:bg-gray-50'
                    }`}
                    onClick={() => setFormData({ ...formData, timeline: option.value })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.timeline === option.value 
                          ? 'border-[#3A5762] bg-[#3A5762]' 
                          : 'border-gray-300'
                      }`}>
                        {formData.timeline === option.value && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        formData.timeline === option.value ? 'text-[#3A5762]' : 'text-gray-600'
                      }`}>
                        {option.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>


            {/* Additional Info */}
            <div>
              <Label htmlFor="additionalInfo" className="text-sm font-medium mb-3 block">
                📝 Informazioni Aggiuntive (Opzionale)
              </Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Raccontaci di più sui tuoi bisogni specifici o preoccupazioni..."
                rows={3}
                className="resize-none"
              />
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
              <span>Completa tutti i campi obbligatori</span>
            )}
          </Button>
        </div>
        
      </form>
    </motion.div>
  );
}
