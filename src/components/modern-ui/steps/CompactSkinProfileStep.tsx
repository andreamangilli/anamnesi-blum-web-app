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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ skinProfile: formData });
    onNext();
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skinTypes.map((type) => (
                  <div key={type} className={`p-3 border rounded-lg cursor-pointer text-center transition-colors ${
                    formData.skinType === type 
                      ? 'border-blum-primary bg-blum-secondary/50 text-blum-primary' 
                      : 'border-slate-200 hover:border-blum-secondary'
                  }`}
                  onClick={() => setFormData({ ...formData, skinType: type })}
                  >
                    <span className="text-sm font-medium">{type}</span>
                  </div>
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
                  <div key={step} className="flex items-center space-x-2 p-2 border border-slate-200 rounded-lg hover:border-blum-secondary">
                    <Checkbox
                      id={`routine-${step}`}
                      checked={formData.routine.includes(step)}
                      onCheckedChange={() => updateArray('routine', step)}
                    />
                    <Label htmlFor={`routine-${step}`} className="text-sm cursor-pointer">
                      {step}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Preferences */}
            <div>
              <Label className="text-sm font-medium mb-3 block">🛍️ Preferenze Prodotti</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {productTypes.map((product) => (
                  <div key={product} className="flex items-center space-x-2 p-2 border border-slate-200 rounded-lg hover:border-blum-secondary">
                    <Checkbox
                      id={`product-${product}`}
                      checked={formData.products.includes(product)}
                      onCheckedChange={() => updateArray('products', product)}
                    />
                    <Label htmlFor={`product-${product}`} className="text-sm cursor-pointer">
                      {product}
                    </Label>
                  </div>
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
