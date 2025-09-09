'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Lock, 
  CheckCircle2
} from 'lucide-react';

interface CompactMedicalHistoryStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function CompactMedicalHistoryStep({ data, onUpdate, onNext }: CompactMedicalHistoryStepProps) {
  const [formData, setFormData] = useState({
    conditions: data?.medicalHistory?.conditions || [],
    medications: data?.medicalHistory?.medications || '',
    allergies: data?.medicalHistory?.allergies || '',
    previousTreatments: data?.medicalHistory?.previousTreatments || [],
    pregnancy: data?.medicalHistory?.pregnancy || false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdate({ medicalHistory: formData });
      onNext();
    } catch (error) {
      console.error('❌ Errore nel salvare la storia medica:', error);
      // Procede comunque al prossimo step per non bloccare l'utente
      onNext();
    }
  };

  const conditions = [
    '🩺 Diabete', '🔬 Disturbi autoimmuni', '🎗️ Tumore della pelle', '🔴 Eczema/Dermatite', 
    '🌹 Rosacea', '🌑 Melasma', '🔘 Psoriasi', '✅ Nessuna'
  ];

  const treatments = [
    '🧪 Peeling chimici', '⚡ Trattamenti laser', '💉 Botox/Filler', '🔬 Microneedling',
    '💎 Dermoabrasione', '💡 IPL', '✅ Nessuno'
  ];

  const updateArray = (field: string, value: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item: string) => item !== value)
      : [...currentArray, value];
    setFormData({ ...formData, [field]: newArray });
  };

  const isValidForm = true; // Medical history can be empty

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
              <Lock className="w-5 h-5 text-blum-primary" />
              <h3 className="font-semibold text-slate-900">🏥 Anamnesi Medica</h3>
            </div>
            
            {/* Medical Conditions */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">🩺 Patologie Mediche</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {conditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2 p-2 border border-slate-200 rounded-lg hover:border-blum-secondary">
                    <Checkbox
                      id={`condition-${condition}`}
                      checked={formData.conditions.includes(condition)}
                      onCheckedChange={() => updateArray('conditions', condition)}
                    />
                    <Label htmlFor={`condition-${condition}`} className="text-sm cursor-pointer">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Medications */}
            <div className="mb-6">
              <Label htmlFor="medications" className="text-sm font-medium mb-2 block">
                💊 Farmaci Attuali
              </Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                placeholder="Elenca eventuali farmaci che stai assumendo attualmente..."
                rows={2}
                className="resize-none"
              />
            </div>

            {/* Allergies */}
            <div className="mb-6">
              <Label htmlFor="allergies" className="text-sm font-medium mb-2 block">
                🤧 Allergie Conosciute
              </Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="Elenca eventuali allergie a farmaci, ingredienti cosmetici, ecc..."
                rows={2}
                className="resize-none"
              />
            </div>

            {/* Previous Treatments */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">💅 Trattamenti Estetici Precedenti</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {treatments.map((treatment) => (
                  <div key={treatment} className="flex items-center space-x-2 p-2 border border-slate-200 rounded-lg hover:border-blum-secondary">
                    <Checkbox
                      id={`treatment-${treatment}`}
                      checked={formData.previousTreatments.includes(treatment)}
                      onCheckedChange={() => updateArray('previousTreatments', treatment)}
                    />
                    <Label htmlFor={`treatment-${treatment}`} className="text-sm cursor-pointer">
                      {treatment}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Pregnancy */}
            <div className="flex items-center space-x-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
              <Checkbox
                id="pregnancy"
                checked={formData.pregnancy}
                onCheckedChange={(checked) => setFormData({ ...formData, pregnancy: !!checked })}
              />
              <Label htmlFor="pregnancy" className="text-sm cursor-pointer font-medium">
                🤱 Attualmente sono incinta o sto allattando
              </Label>
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
            <span className="flex items-center space-x-2">
              <span>Continua</span>
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </Button>
        </div>
        
      </form>
    </motion.div>
  );
}
