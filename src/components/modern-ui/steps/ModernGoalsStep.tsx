'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Award, 
  Target,
  Calendar,
  Clock,
  Heart,
  Sparkles,
  Users
} from 'lucide-react';

interface ModernGoalsStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function ModernGoalsStep({ data, onUpdate, onNext }: ModernGoalsStepProps) {
  const [formData, setFormData] = useState({
    obiettivoPrincipale: data?.clientGoals?.obiettivoPrincipale || '',
    areeCritiche: data?.clientGoals?.areeCritiche || [],
    occasioniSpeciali: {
      presente: data?.clientGoals?.occasioniSpeciali?.presente || false,
      evento: data?.clientGoals?.occasioniSpeciali?.evento || '',
      data: data?.clientGoals?.occasioniSpeciali?.data || ''
    },
    tempoDisponibile: data?.clientGoals?.tempoDisponibile || '',
    aspettative: data?.clientGoals?.aspettative || ''
  });

  const areeCriticheOptions = [
    { value: 'contorno-occhi', label: 'Contorno Occhi', icon: '👁️' },
    { value: 'ovale-viso', label: 'Ovale del Viso', icon: '🫨' },
    { value: 'fronte', label: 'Fronte', icon: '🧠' },
    { value: 'collo', label: 'Collo', icon: '🦢' },
    { value: 'guance', label: 'Guance', icon: '😊' },
    { value: 'labbra', label: 'Zona Labbra', icon: '💋' }
  ];


  const tempoOptions = [
    { value: 'limitato', label: 'Limitato', icon: '⏰', description: 'Poco tempo libero' },
    { value: 'flessibile', label: 'Flessibile', icon: '🕐', description: 'Tempo moderato' },
    { value: 'massimo-risultato', label: 'Massimo Risultato', icon: '🎯', description: 'Tutto il tempo necessario' }
  ];

  const aspettativeOptions = [
    { value: 'miglioramento-sottile', label: 'Miglioramento Sottile', icon: '✨', description: 'Risultati naturali e graduali' },
    { value: 'risultati-evidenti', label: 'Risultati Evidenti', icon: '💫', description: 'Cambiamenti chiaramente visibili' },
    { value: 'trasformazione-significativa', label: 'Trasformazione', icon: '🌟', description: 'Cambiamento importante' }
  ];

  const handleAreaCriticaToggle = (area: string) => {
    const isSelected = formData.areeCritiche.includes(area);
    if (isSelected) {
      setFormData({
        ...formData,
        areeCritiche: formData.areeCritiche.filter((a: string) => a !== area)
      });
    } else {
      setFormData({
        ...formData,
        areeCritiche: [...formData.areeCritiche, area]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ clientGoals: formData });
    onNext();
  };

  const isValidForm = formData.obiettivoPrincipale.trim() && 
                     formData.tempoDisponibile &&
                     formData.aspettative &&
                     formData.areeCritiche.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      
      {/* Header */}
      <motion.div variants={itemVariants}>
        <Card className="text-center bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-amber-200/50 blum-glass">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-amber-800">I Tuoi Obiettivi di Bellezza</CardTitle>
            <p className="text-amber-700">
              Dimmi cosa desideri ottenere per creare il percorso perfetto per te
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Obiettivo Principale */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-pink-500" />
                <span>Il Tuo Obiettivo Principale</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Descrivi con parole tue cosa vorresti ottenere
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.obiettivoPrincipale}
                onChange={(e) => setFormData({ ...formData, obiettivoPrincipale: e.target.value })}
                placeholder="es. Vorrei ridurre le rughe intorno agli occhi e avere una pelle più luminosa e tonica..."
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Sii specifica sui tuoi desideri</span>
                <span>{formData.obiettivoPrincipale.length}/500</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Aree Critiche */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span>Aree di Maggiore Interesse</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Su quali zone del viso vorresti concentrarti di più?
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {areeCriticheOptions.map((area) => {
                  const isSelected = formData.areeCritiche.includes(area.value);
                  return (
                    <motion.div
                      key={area.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAreaCriticaToggle(area.value)}
                      className={`
                        p-4 rounded-xl border-2 cursor-pointer text-center transition-all
                        ${isSelected 
                          ? 'border-primary bg-primary/10 shadow-md' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="text-2xl mb-2">{area.icon}</div>
                      <div className="text-sm font-medium">{area.label}</div>
                      {isSelected && (
                        <Badge className="mt-2" variant="secondary">Selezionata</Badge>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Occasioni Speciali */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span>Occasioni Speciali</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="occasione"
                  checked={formData.occasioniSpeciali.presente}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    occasioniSpeciali: { ...formData.occasioniSpeciali, presente: !!checked }
                  })}
                />
                <Label htmlFor="occasione" className="cursor-pointer">
                  Sto preparando la mia pelle per un evento speciale
                </Label>
              </div>
              
              {formData.occasioniSpeciali.presente && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                >
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Che evento?
                    </Label>
                    <Input
                      value={formData.occasioniSpeciali.evento}
                      onChange={(e) => setFormData({
                        ...formData,
                        occasioniSpeciali: { ...formData.occasioniSpeciali, evento: e.target.value }
                      })}
                      placeholder="es. Matrimonio, Laurea, Compleanno importante..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Quando?
                    </Label>
                    <Input
                      type="date"
                      value={formData.occasioniSpeciali.data}
                      onChange={(e) => setFormData({
                        ...formData,
                        occasioniSpeciali: { ...formData.occasioniSpeciali, data: e.target.value }
                      })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>


        {/* Tempo Disponibile */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                <span>Tempo a Disposizione</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tempoOptions.map((tempo) => (
                  <motion.div
                    key={tempo.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, tempoDisponibile: tempo.value as any })}
                    className={`
                      p-6 rounded-xl border-2 cursor-pointer text-center transition-all
                      ${formData.tempoDisponibile === tempo.value 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="text-2xl mb-3">{tempo.icon}</div>
                    <h3 className="font-semibold mb-2">{tempo.label}</h3>
                    <p className="text-sm text-muted-foreground">{tempo.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Aspettative */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Le Tue Aspettative</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Che tipo di risultati ti aspetti?
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {aspettativeOptions.map((aspettativa) => (
                  <motion.div
                    key={aspettativa.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setFormData({ ...formData, aspettative: aspettativa.value as any })}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center space-x-4
                      ${formData.aspettative === aspettativa.value 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="text-2xl">{aspettativa.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{aspettativa.label}</h3>
                      <p className="text-sm text-muted-foreground">{aspettativa.description}</p>
                    </div>
                    {formData.aspettative === aspettativa.value && (
                      <Badge>Selezionato</Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-end"
        >
          <Button
            type="submit"
            disabled={!isValidForm}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            {isValidForm ? 'Continua all\'Anamnesi Medica' : 'Completa tutti i campi'}
          </Button>
        </motion.div>
        
      </form>
    </motion.div>
  );
}