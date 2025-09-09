'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Heart, 
  Droplets, 
  Utensils, 
  Moon, 
  Dumbbell,
  Wine,
  Cigarette,
  Clock,
  Brain,
  Plus,
  X
} from 'lucide-react';

interface ModernLifestyleStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function ModernLifestyleStep({ data, onUpdate, onNext }: ModernLifestyleStepProps) {
  const [formData, setFormData] = useState({
    alimentazione: {
      consumoAcqua: data?.lifestyleProfile?.alimentazione?.consumoAcqua || 6,
      fruttaVerdura: data?.lifestyleProfile?.alimentazione?.fruttaVerdura || '',
      regimiParticolari: data?.lifestyleProfile?.alimentazione?.regimiParticolari || []
    },
    abitudini: {
      fumo: {
        status: data?.lifestyleProfile?.abitudini?.fumo?.status || false,
        quantita: data?.lifestyleProfile?.abitudini?.fumo?.quantita || 0
      },
      alcol: data?.lifestyleProfile?.abitudini?.alcol || ''
    },
    attivitaFisica: {
      pratica: data?.lifestyleProfile?.attivitaFisica?.pratica || false,
      tipo: data?.lifestyleProfile?.attivitaFisica?.tipo || '',
      frequenza: data?.lifestyleProfile?.attivitaFisica?.frequenza || 0
    },
    sonnoStress: {
      oreSonno: data?.lifestyleProfile?.sonnoStress?.oreSonno || 7,
      qualitaSonno: data?.lifestyleProfile?.sonnoStress?.qualitaSonno || '',
      livelloStress: data?.lifestyleProfile?.sonnoStress?.livelloStress || [5]
    }
  });

  const [newRegime, setNewRegime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ lifestyleProfile: formData });
    onNext();
  };

  const addRegime = () => {
    if (newRegime.trim()) {
      setFormData({
        ...formData,
        alimentazione: {
          ...formData.alimentazione,
          regimiParticolari: [...formData.alimentazione.regimiParticolari, newRegime.trim()]
        }
      });
      setNewRegime('');
    }
  };

  const removeRegime = (index: number) => {
    setFormData({
      ...formData,
      alimentazione: {
        ...formData.alimentazione,
        regimiParticolari: formData.alimentazione.regimiParticolari.filter((_: string, i: number) => i !== index)
      }
    });
  };

  const isValidForm = formData.alimentazione.fruttaVerdura && 
                     formData.abitudini.alcol && 
                     formData.sonnoStress.qualitaSonno;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
        <Card className="text-center bg-gradient-to-r from-pink-50/50 to-rose-50/50 border-pink-200/50 blum-glass">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-pink-800">Stile di Vita & Benessere</CardTitle>
            <p className="text-pink-700">
              Le tue abitudini quotidiane influenzano profondamente la salute e bellezza della tua pelle
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Alimentazione e Idratazione */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span>Alimentazione & Idratazione</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Consumo Acqua */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Quanti bicchieri d&apos;acqua bevi mediamente al giorno?
                </Label>
                <div className="space-y-2">
                  <Slider
                    value={[formData.alimentazione.consumoAcqua]}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      alimentazione: { ...formData.alimentazione, consumoAcqua: value[0] }
                    })}
                    max={15}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 bicchiere</span>
                    <Badge variant="secondary" className="text-blue-600">
                      {formData.alimentazione.consumoAcqua} bicchieri/giorno
                    </Badge>
                    <span>15+ bicchieri</span>
                  </div>
                </div>
              </div>

              {/* Frutta e Verdura */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Il tuo consumo di frutta e verdura è:
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'quotidiano', label: 'Quotidiano', icon: '🥗' },
                    { value: 'frequente', label: 'Frequente', icon: '🍎' },
                    { value: 'scarso', label: 'Scarso', icon: '🤔' }
                  ].map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({
                        ...formData,
                        alimentazione: { ...formData.alimentazione, fruttaVerdura: option.value as any }
                      })}
                      className={`
                        p-4 rounded-xl border-2 cursor-pointer text-center transition-all
                        ${formData.alimentazione.fruttaVerdura === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="font-medium">{option.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Regimi Alimentari */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Segui regimi alimentari particolari?
                </Label>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      value={newRegime}
                      onChange={(e) => setNewRegime(e.target.value)}
                      placeholder="es. Vegetariano, Vegano, Senza glutine..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={addRegime}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {formData.alimentazione.regimiParticolari.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.alimentazione.regimiParticolari.map((regime: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center space-x-1"
                        >
                          <span>{regime}</span>
                          <button
                            type="button"
                            onClick={() => removeRegime(index)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Abitudini */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wine className="w-5 h-5 text-purple-500" />
                <span>Abitudini</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Fumo */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="fumo"
                    checked={formData.abitudini.fumo.status}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      abitudini: {
                        ...formData.abitudini,
                        fumo: { ...formData.abitudini.fumo, status: !!checked }
                      }
                    })}
                  />
                  <Label htmlFor="fumo" className="flex items-center space-x-2 cursor-pointer">
                    <Cigarette className="w-4 h-4" />
                    <span>Sono fumatore/trice</span>
                  </Label>
                </div>
                
                {formData.abitudini.fumo.status && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-6 space-y-2"
                  >
                    <Label className="text-sm text-muted-foreground">
                      Quante sigarette al giorno?
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={formData.abitudini.fumo.quantita}
                      onChange={(e) => setFormData({
                        ...formData,
                        abitudini: {
                          ...formData.abitudini,
                          fumo: { ...formData.abitudini.fumo, quantita: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="w-32"
                    />
                  </motion.div>
                )}
              </div>

              {/* Alcol */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Consumo di bevande alcoliche:
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'mai', label: 'Mai', icon: '🚫' },
                    { value: 'occasionale', label: 'Occasionale', icon: '🍷' },
                    { value: 'settimanale', label: 'Settimanale', icon: '📅' },
                    { value: 'quotidiano', label: 'Quotidiano', icon: '🍻' }
                  ].map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({
                        ...formData,
                        abitudini: { ...formData.abitudini, alcol: option.value as any }
                      })}
                      className={`
                        p-3 rounded-lg border-2 cursor-pointer text-center transition-all
                        ${formData.abitudini.alcol === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="text-xl mb-1">{option.icon}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Attività Fisica */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Dumbbell className="w-5 h-5 text-orange-500" />
                <span>Attività Fisica</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="sport"
                  checked={formData.attivitaFisica.pratica}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    attivitaFisica: { ...formData.attivitaFisica, pratica: !!checked }
                  })}
                />
                <Label htmlFor="sport" className="cursor-pointer">
                  Pratico sport o attività fisica regolarmente
                </Label>
              </div>
              
              {formData.attivitaFisica.pratica && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 ml-6"
                >
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Che tipo di attività?
                    </Label>
                    <Input
                      value={formData.attivitaFisica.tipo}
                      onChange={(e) => setFormData({
                        ...formData,
                        attivitaFisica: { ...formData.attivitaFisica, tipo: e.target.value }
                      })}
                      placeholder="es. Palestra, Corsa, Yoga, Nuoto..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Frequenza settimanale:
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((freq) => (
                        <motion.div
                          key={freq}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFormData({
                            ...formData,
                            attivitaFisica: { ...formData.attivitaFisica, frequenza: freq }
                          })}
                          className={`
                            p-2 text-center rounded-lg border cursor-pointer transition-all
                            ${formData.attivitaFisica.frequenza === freq 
                              ? 'border-primary bg-primary text-primary-foreground' 
                              : 'border-border hover:border-primary/50'
                            }
                          `}
                        >
                          {freq}{freq > 7 ? '+' : ''}
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      volte/settimana
                    </p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sonno e Stress */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Moon className="w-5 h-5 text-indigo-500" />
                <span>Sonno e Stress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Ore di sonno */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Ore di sonno per notte:</span>
                </Label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {[4, 5, 6, 7, 8, 9, 10, 11].map((ore) => (
                    <motion.div
                      key={ore}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({
                        ...formData,
                        sonnoStress: { ...formData.sonnoStress, oreSonno: ore }
                      })}
                      className={`
                        p-3 text-center rounded-lg border cursor-pointer transition-all
                        ${formData.sonnoStress.oreSonno === ore 
                          ? 'border-primary bg-primary text-primary-foreground' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      {ore}h
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Qualità sonno */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Come consideri la qualità del tuo sonno?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'riposante', label: 'Riposante', icon: '😴', color: 'text-green-600' },
                    { value: 'disturbato', label: 'Disturbato', icon: '😵', color: 'text-yellow-600' },
                    { value: 'insufficiente', label: 'Insufficiente', icon: '😫', color: 'text-red-600' }
                  ].map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({
                        ...formData,
                        sonnoStress: { ...formData.sonnoStress, qualitaSonno: option.value as any }
                      })}
                      className={`
                        p-4 rounded-xl border-2 cursor-pointer text-center transition-all
                        ${formData.sonnoStress.qualitaSonno === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className={`font-medium ${option.color}`}>{option.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Livello stress */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>Livello di stress attuale (1-10):</span>
                </Label>
                <div className="space-y-4">
                  <Slider
                    value={formData.sonnoStress.livelloStress}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      sonnoStress: { ...formData.sonnoStress, livelloStress: value }
                    })}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">😌 Rilassato</span>
                    <Badge 
                      variant="secondary" 
                      className={`
                        ${formData.sonnoStress.livelloStress[0] <= 3 ? 'text-green-600' : 
                          formData.sonnoStress.livelloStress[0] <= 6 ? 'text-yellow-600' : 
                          'text-red-600'}
                      `}
                    >
                      Stress: {formData.sonnoStress.livelloStress[0]}/10
                    </Badge>
                    <span className="text-red-600">😰 Molto stressato</span>
                  </div>
                </div>
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
            {isValidForm ? 'Continua al Passo Successivo' : 'Completa tutti i campi'}
          </Button>
        </motion.div>
        
      </form>
    </motion.div>
  );
}