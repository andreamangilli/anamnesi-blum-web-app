'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Shield, 
  AlertTriangle,
  Heart,
  Pill,
  Zap,
  Lock,
  Plus,
  X,
  Eye,
  Activity,
  Brain,
  Stethoscope
} from 'lucide-react';

interface ModernMedicalHistoryStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function ModernMedicalHistoryStep({ data, onUpdate, onNext }: ModernMedicalHistoryStepProps) {
  const [formData, setFormData] = useState({
    controindicazioni: {
      gravidanzaAllattamento: data?.medicalHistory?.controindicazioni?.gravidanzaAllattamento || false,
      pacemaker: data?.medicalHistory?.controindicazioni?.pacemaker || false,
      protesiMetalliche: data?.medicalHistory?.controindicazioni?.protesiMetalliche || false,
      patologieCardiache: data?.medicalHistory?.controindicazioni?.patologieCardiache || false,
      epilessia: data?.medicalHistory?.controindicazioni?.epilessia || false,
      neoplasie: data?.medicalHistory?.controindicazioni?.neoplasie || false,
      patologieTiroide: data?.medicalHistory?.controindicazioni?.patologieTiroide || false,
      patologieCutanee: data?.medicalHistory?.controindicazioni?.patologieCutanee || false,
      diabete: data?.medicalHistory?.controindicazioni?.diabete || false,
      patologieVascolari: data?.medicalHistory?.controindicazioni?.patologieVascolari || false,
    },
    farmaci: data?.medicalHistory?.farmaci || [],
    allergie: data?.medicalHistory?.allergie || [],
    note: data?.medicalHistory?.note || ''
  });

  const [newFarmaco, setNewFarmaco] = useState('');
  const [newAllergia, setNewAllergia] = useState('');
  const [hasContraindicazioni, setHasContraindicazioni] = useState(false);

  // Medical conditions with icons and descriptions
  const medicalConditions = [
    {
      key: 'gravidanzaAllattamento',
      label: 'Gravidanza o Allattamento',
      icon: '🤱',
      severity: 'critical',
      description: 'Controindicazione assoluta per tutti i trattamenti'
    },
    {
      key: 'pacemaker',
      label: 'Pacemaker/Dispositivi Elettronici',
      icon: '⚡',
      severity: 'critical',
      description: 'Controindicazione assoluta per RF e tecnologie elettriche'
    },
    {
      key: 'protesiMetalliche',
      label: 'Protesi Metalliche nel Viso/Collo',
      icon: '🦴',
      severity: 'warning',
      description: 'Include impianti dentali, placche, viti'
    },
    {
      key: 'patologieCardiache',
      label: 'Patologie Cardiache',
      icon: '💗',
      severity: 'warning',
      description: 'Aritmie, ipertensione non controllata'
    },
    {
      key: 'epilessia',
      label: 'Epilessia',
      icon: '🧠',
      severity: 'warning',
      description: 'Patologie neurologiche significative'
    },
    {
      key: 'neoplasie',
      label: 'Storia di Tumori',
      icon: '🎗️',
      severity: 'critical',
      description: 'Attuali o pregresse, chemio/radioterapia'
    },
    {
      key: 'patologieTiroide',
      label: 'Patologie Tiroidee',
      icon: '🦋',
      severity: 'info',
      description: 'Iper/ipotiroidismo, disfunzioni tiroidee'
    },
    {
      key: 'patologieCutanee',
      label: 'Patologie Cutanee Attive',
      icon: '🌿',
      severity: 'warning',
      description: 'Dermatiti, eczemi, infezioni, herpes attivo'
    },
    {
      key: 'diabete',
      label: 'Diabete Non Controllato',
      icon: '🩺',
      severity: 'warning',
      description: 'Glicemia non stabilizzata'
    },
    {
      key: 'patologieVascolari',
      label: 'Patologie Vascolari',
      icon: '🔴',
      severity: 'info',
      description: 'Vene varicose evidenti, flebiti'
    }
  ];

  const addFarmaco = () => {
    if (newFarmaco.trim() && !formData.farmaci.includes(newFarmaco.trim())) {
      setFormData({
        ...formData,
        farmaci: [...formData.farmaci, newFarmaco.trim()]
      });
      setNewFarmaco('');
    }
  };

  const removeFarmaco = (index: number) => {
    setFormData({
      ...formData,
      farmaci: formData.farmaci.filter((_: string, i: number) => i !== index)
    });
  };

  const addAllergia = () => {
    if (newAllergia.trim() && !formData.allergie.includes(newAllergia.trim())) {
      setFormData({
        ...formData,
        allergie: [...formData.allergie, newAllergia.trim()]
      });
      setNewAllergia('');
    }
  };

  const removeAllergia = (index: number) => {
    setFormData({
      ...formData,
      allergie: formData.allergie.filter((_: string, i: number) => i !== index)
    });
  };

  const handleContraindicazioneChange = (key: string, value: boolean) => {
    const newControindicazioni = {
      ...formData.controindicazioni,
      [key]: value
    };
    
    setFormData({
      ...formData,
      controindicazioni: newControindicazioni
    });

    // Check if any contraindication is selected
    const hasAny = Object.values(newControindicazioni).some(v => v);
    setHasContraindicazioni(hasAny);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ medicalHistory: formData });
    onNext();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-300 bg-red-50/50';
      case 'warning': return 'border-yellow-300 bg-yellow-50/50';
      default: return 'border-blue-300 bg-blue-50/50';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return <Badge variant="destructive" className="text-xs">CRITICO</Badge>;
      case 'warning': return <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">ATTENZIONE</Badge>;
      default: return <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">INFO</Badge>;
    }
  };

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
      
      {/* Header con Warning */}
      <motion.div variants={itemVariants}>
        <Card className="text-center bg-gradient-to-r from-red-50/50 to-pink-50/50 border-red-200/50 blum-glass">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-red-800 flex items-center justify-center space-x-2">
              <Lock className="w-6 h-6" />
              <span>Anamnesi Medica</span>
            </CardTitle>
            <div className="flex items-center justify-center space-x-2 text-red-700 mt-2">
              <AlertTriangle className="w-5 h-5" />
              <p>
                Informazioni riservate necessarie per la tua sicurezza
              </p>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Controindicazioni Mediche */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-red-500" />
                <span>Condizioni Mediche</span>
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>Seleziona TUTTE le condizioni che ti riguardano. La sicurezza è la priorità.</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="grid grid-cols-1 gap-4">
                {medicalConditions.map((condition) => (
                  <motion.div
                    key={condition.key}
                    whileHover={{ scale: 1.01 }}
                    className={`
                      p-4 rounded-xl border-2 transition-all
                      ${formData.controindicazioni[condition.key as keyof typeof formData.controindicazioni] 
                        ? `${getSeverityColor(condition.severity)} shadow-md` 
                        : 'border-border hover:border-muted-foreground/50'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id={condition.key}
                        checked={formData.controindicazioni[condition.key as keyof typeof formData.controindicazioni]}
                        onCheckedChange={(checked) => 
                          handleContraindicazioneChange(condition.key, !!checked)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-xl">{condition.icon}</span>
                          <Label htmlFor={condition.key} className="text-sm font-medium cursor-pointer">
                            {condition.label}
                          </Label>
                          {getSeverityBadge(condition.severity)}
                        </div>
                        <p className="text-xs text-muted-foreground ml-8">
                          {condition.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasContraindicazioni && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                >
                  <div className="flex items-center space-x-2 text-yellow-800">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">Attenzione Richiesta</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Hai indicato delle condizioni che potrebbero richiedere una valutazione medica preliminare 
                    o modifiche al protocollo di trattamento. Il nostro team ti contatterà per approfondire.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Farmaci */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="w-5 h-5 text-blue-500" />
                <span>Farmaci Attuali</span>
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Elenca tutti i farmaci che assumi regolarmente (inclusi integratori)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="flex space-x-2">
                <Input
                  value={newFarmaco}
                  onChange={(e) => setNewFarmaco(e.target.value)}
                  placeholder="es. Cardioaspirina, Eutirox, Vitamina D..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFarmaco())}
                />
                <Button
                  type="button"
                  onClick={addFarmaco}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {formData.farmaci.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Farmaci inseriti:</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {formData.farmaci.map((farmaco: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-200/50"
                      >
                        <div className="flex items-center space-x-2">
                          <Pill className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">{farmaco}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFarmaco(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.farmaci.length === 0 && (
                <div className="text-center p-6 text-muted-foreground">
                  <Pill className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nessun farmaco inserito</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Allergie */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span>Allergie Conosciute</span>
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Sostanze, metalli, prodotti cosmetici o farmaci che ti danno allergia
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="flex space-x-2">
                <Input
                  value={newAllergia}
                  onChange={(e) => setNewAllergia(e.target.value)}
                  placeholder="es. Nichel, Parabeni, Penicillina, Lattice..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergia())}
                />
                <Button
                  type="button"
                  onClick={addAllergia}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {formData.allergie.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Allergie inserite:</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.allergie.map((allergia: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center space-x-2 bg-orange-100 text-orange-800"
                      >
                        <span>{allergia}</span>
                        <button
                          type="button"
                          onClick={() => removeAllergia(index)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Note Aggiuntive */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <span>Note Aggiuntive</span>
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Altre informazioni mediche importanti che vuoi condividere
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="es. Interventi chirurgici recenti, particolari sensibilità, altre condizioni mediche..."
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Dichiarazione e Submit */}
        <motion.div variants={itemVariants} className="space-y-6">
          
          <Card className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-green-200/50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-800 mb-2">
                    Dichiarazione di Responsabilità
                  </h3>
                  <p className="text-sm text-green-700">
                    Dichiaro che tutte le informazioni fornite sono veritiere e complete. 
                    Comprendo che nascondere informazioni mediche rilevanti può compromettere 
                    la mia sicurezza durante i trattamenti estetici.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="px-8 py-4 text-lg"
            >
              Completa il Questionario
            </Button>
          </div>
        </motion.div>
        
      </form>
    </motion.div>
  );
}