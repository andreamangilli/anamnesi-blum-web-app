'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Sun, 
  Droplets,
  Eye,
  Zap,
  Plus,
  X,
  ArrowUpDown
} from 'lucide-react';

interface ModernSkinProfileStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function ModernSkinProfileStep({ data, onUpdate, onNext }: ModernSkinProfileStepProps) {
  const [formData, setFormData] = useState({
    tipoPelle: data?.skinProfile?.tipoPelle || [],
    inestetismiPrincipali: data?.skinProfile?.inestetismiPrincipali || [],
    protezioneSolare: {
      utilizzo: data?.skinProfile?.protezioneSolare?.utilizzo || '',
      spf: data?.skinProfile?.protezioneSolare?.spf || 30
    }
  });

  const skinTypes = [
    { value: 'secca', label: 'Secca', icon: '🏜️', description: 'Tirante, desquamazione' },
    { value: 'grassa', label: 'Grassa', icon: '✨', description: 'Lucida, pori dilatati' },
    { value: 'mista', label: 'Mista', icon: '🎭', description: 'Zona T grassa' },
    { value: 'sensibile', label: 'Sensibile', icon: '🌸', description: 'Reattiva, arrossamenti' },
    { value: 'normale', label: 'Normale', icon: '😊', description: 'Equilibrata' },
    { value: 'acneica', label: 'Acneica', icon: '🎯', description: 'Brufoli, infiammazioni' }
  ];

  const inestetismiOptions = [
    { value: 'rughe', label: 'Rughe', icon: '〰️' },
    { value: 'macchie', label: 'Macchie scure', icon: '🟤' },
    { value: 'pori-dilatati', label: 'Pori dilatati', icon: '🕳️' },
    { value: 'couperose', label: 'Rossori', icon: '🔴' },
    { value: 'lassita', label: 'Perdita tono', icon: '⬇️' },
    { value: 'pelle-spenta', label: 'Pelle spenta', icon: '🌫️' },
    { value: 'cicatrici', label: 'Cicatrici', icon: '⚪' },
    { value: 'occhiaie', label: 'Occhiaie', icon: '👁️' }
  ];

  const handleInestetismoToggle = (inestetismo: any) => {
    const exists = formData.inestetismiPrincipali.find((i: {tipo: string; priorita: number}) => i.tipo === inestetismo.value);
    
    if (exists) {
      setFormData({
        ...formData,
        inestetismiPrincipali: formData.inestetismiPrincipali.filter((i: {tipo: string; priorita: number}) => i.tipo !== inestetismo.value)
      });
    } else {
      if (formData.inestetismiPrincipali.length < 3) {
        setFormData({
          ...formData,
          inestetismiPrincipali: [...formData.inestetismiPrincipali, {
            tipo: inestetismo.value,
            priorita: formData.inestetismiPrincipali.length + 1
          }]
        });
      }
    }
  };

  const handleTipoPelleToggle = (tipo: string) => {
    const isSelected = formData.tipoPelle.includes(tipo);
    if (isSelected) {
      setFormData({
        ...formData,
        tipoPelle: formData.tipoPelle.filter((t: string) => t !== tipo)
      });
    } else {
      setFormData({
        ...formData,
        tipoPelle: [...formData.tipoPelle, tipo]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ skinProfile: formData });
    onNext();
  };

  const isValidForm = formData.tipoPelle.length > 0 && 
                     formData.protezioneSolare.utilizzo &&
                     formData.inestetismiPrincipali.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
        <Card className="text-center bg-gradient-to-r from-violet-50/50 to-purple-50/50 border-violet-200/50 blum-glass">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-violet-800">Analisi Cutanea</CardTitle>
            <p className="text-violet-700">
              Analizziamo la tua pelle per creare il protocollo perfetto
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Tipo di Pelle */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span>Il Tuo Tipo di Pelle</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skinTypes.map((type) => (
                  <motion.div
                    key={type.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTipoPelleToggle(type.value)}
                    className={`
                      p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${formData.tipoPelle.includes(type.value)
                        ? 'border-primary bg-primary/10 shadow-md' 
                        : 'border-border hover:border-primary/30'
                      }
                    `}
                  >
                    <div className="text-center relative">
                      {formData.tipoPelle.includes(type.value) && (
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                          ✓
                        </Badge>
                      )}
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <h3 className="font-medium mb-1 text-sm">{type.label}</h3>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inestetismi */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-amber-500" />
                <span>Inestetismi Principali</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Seleziona fino a 3 inestetismi (max 3)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {inestetismiOptions.map((inestetismo) => {
                  const isSelected = formData.inestetismiPrincipali.some((i: {tipo: string; priorita: number}) => i.tipo === inestetismo.value);
                  const priority = formData.inestetismiPrincipali.find((i: {tipo: string; priorita: number}) => i.tipo === inestetismo.value)?.priorita;
                  const canSelect = formData.inestetismiPrincipali.length < 3 || isSelected;
                  
                  return (
                    <motion.div
                      key={inestetismo.value}
                      whileHover={canSelect ? { scale: 1.02 } : {}}
                      onClick={() => canSelect && handleInestetismoToggle(inestetismo)}
                      className={`
                        relative p-3 rounded-lg border-2 cursor-pointer text-center transition-all
                        ${isSelected 
                          ? 'border-primary bg-primary/10' 
                          : canSelect 
                            ? 'border-border hover:border-primary/50' 
                            : 'border-muted opacity-50 cursor-not-allowed'
                        }
                      `}
                    >
                      {isSelected && (
                        <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center">
                          {priority}
                        </Badge>
                      )}
                      <div className="text-lg mb-1">{inestetismo.icon}</div>
                      <div className="text-xs font-medium">{inestetismo.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Protezione Solare */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sun className="w-5 h-5 text-yellow-500" />
                <span>Protezione Solare</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'quotidiano', label: 'Tutti i giorni', icon: '☀️' },
                  { value: 'solo-esposizione', label: 'Solo al sole', icon: '🏖️' },
                  { value: 'raramente', label: 'Raramente', icon: '🤔' },
                  { value: 'mai', label: 'Mai', icon: '❌' }
                ].map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setFormData({
                      ...formData,
                      protezioneSolare: { ...formData.protezioneSolare, utilizzo: option.value as any }
                    })}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer text-center
                      ${formData.protezioneSolare.utilizzo === option.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </motion.div>
                ))}
              </div>

              {formData.protezioneSolare.utilizzo && formData.protezioneSolare.utilizzo !== 'mai' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-3 md:grid-cols-6 gap-2"
                >
                  {[15, 20, 30, 50, 60, 90].map((spf) => (
                    <Button
                      key={spf}
                      type="button"
                      variant={formData.protezioneSolare.spf === spf ? "default" : "outline"}
                      onClick={() => setFormData({
                        ...formData,
                        protezioneSolare: { ...formData.protezioneSolare, spf }
                      })}
                    >
                      SPF {spf}
                    </Button>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="flex justify-end">
          <Button
            type="submit"
            disabled={!isValidForm}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            {isValidForm ? 'Continua ai Tuoi Obiettivi' : 'Completa i campi'}
          </Button>
        </motion.div>
        
      </form>
    </motion.div>
  );
}