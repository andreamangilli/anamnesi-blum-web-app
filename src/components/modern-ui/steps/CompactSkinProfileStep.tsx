'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

interface CompactSkinProfileStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function CompactSkinProfileStep({ data, onUpdate, onNext }: CompactSkinProfileStepProps) {
  const [formData, setFormData] = useState({
    skinType: data?.skinProfile?.skinType || '',
    concerns: data?.skinProfile?.concerns || [],
    routine: data?.skinProfile?.routine || [],
    products: data?.skinProfile?.products || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdate({ skinProfile: formData });
      onNext();
    } catch (error) {
      console.error('❌ Errore nel salvare il profilo della pelle:', error);
      // Procede comunque al prossimo step per non bloccare l'utente
      onNext();
    }
  };

  const skinTypes = ['💧 Secca', '🔆 Grassa', '⚖️ Mista', '😔 Sensibile', '✨ Normale'];
  const concerns = ['🔴 Acne', '👵 Rughe', '🌑 Macchie scure', '🌹 Rosacea', '🔍 Pori', '😴 Opacità'];
  const routineSteps = ['🧼 Detergente', '💧 Tonico', '🧪 Siero', '🧴 Idratante', '☀️ Protezione solare', '✨ Esfoliante'];
  const productTypes = ['💊 Farmacia', '💎 Premium', '🌿 Naturale/Bio', '🏥 Clinico/Prescrizione'];

  const updateArray = (field: string, value: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item: string) => item !== value)
      : [...currentArray, value];
    setFormData({ ...formData, [field]: newArray });
  };

  const isValidForm = formData.skinType && formData.concerns.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      data-step-content
    >
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-5 h-5 text-blum-primary" />
              <h3 className="font-semibold text-slate-900">✨ Analisi Cutanea</h3>
            </div>
            
            {/* Skin Type */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">🌸 Tipo di Pelle *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skinTypes.map((type) => (
                  <motion.div 
                    key={type} 
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      formData.skinType === type 
                        ? 'border-[#3A5762] bg-[#3A5762]/10 text-[#3A5762] shadow-md scale-105' 
                        : 'border-gray-200 hover:border-[#3A5762]/50 hover:bg-gray-50'
                    }`}
                    onClick={() => setFormData({ ...formData, skinType: type })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.skinType === type 
                          ? 'border-[#3A5762] bg-[#3A5762]' 
                          : 'border-gray-300'
                      }`}>
                        {formData.skinType === type && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        formData.skinType === type ? 'text-[#3A5762]' : 'text-gray-600'
                      }`}>
                        {type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skin Concerns */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">🎯 Problematiche Principali *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {concerns.map((concern) => (
                  <div key={concern} className="flex items-center space-x-2 p-2 border border-slate-200 rounded-lg hover:border-blum-secondary">
                    <Checkbox
                      id={`concern-${concern}`}
                      checked={formData.concerns.includes(concern)}
                      onCheckedChange={() => updateArray('concerns', concern)}
                    />
                    <Label htmlFor={`concern-${concern}`} className="text-sm cursor-pointer">
                      {concern}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Routine */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">💆‍♀️ Routine Attuale</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {routineSteps.map((step) => (
                  <motion.div 
                    key={step} 
                    className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.routine.includes(step)
                        ? 'border-[#3A5762] bg-[#3A5762]/10 text-[#3A5762] shadow-md' 
                        : 'border-gray-200 hover:border-[#3A5762]/50 hover:bg-gray-50'
                    }`}
                    onClick={() => updateArray('routine', step)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${
                      formData.routine.includes(step)
                        ? 'border-[#3A5762] bg-[#3A5762]' 
                        : 'border-gray-300'
                    }`}>
                      {formData.routine.includes(step) && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <Label className={`text-sm cursor-pointer font-medium ${
                      formData.routine.includes(step) ? 'text-[#3A5762]' : 'text-gray-600'
                    }`}>
                      {step}
                    </Label>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Product Preferences */}
            <div>
              <Label className="text-sm font-medium mb-3 block">🛍️ Preferenze Prodotti</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {productTypes.map((product) => (
                  <motion.div 
                    key={product} 
                    className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.products.includes(product)
                        ? 'border-[#3A5762] bg-[#3A5762]/10 text-[#3A5762] shadow-md' 
                        : 'border-gray-200 hover:border-[#3A5762]/50 hover:bg-gray-50'
                    }`}
                    onClick={() => updateArray('products', product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${
                      formData.products.includes(product)
                        ? 'border-[#3A5762] bg-[#3A5762]' 
                        : 'border-gray-300'
                    }`}>
                      {formData.products.includes(product) && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <Label className={`text-sm cursor-pointer font-medium ${
                      formData.products.includes(product) ? 'text-[#3A5762]' : 'text-gray-600'
                    }`}>
                      {product}
                    </Label>
                  </motion.div>
                ))}
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
              <span>Seleziona tipo di pelle e problematiche</span>
            )}
          </Button>
        </div>
        
      </form>
    </motion.div>
  );
}
