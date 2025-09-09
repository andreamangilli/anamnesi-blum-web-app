'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  Phone,
  User,
  MapPin
} from 'lucide-react';

interface ModernPersonalDataStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function ModernPersonalDataStep({ data, onUpdate, onNext }: ModernPersonalDataStepProps) {
  const [formData, setFormData] = useState({
    nome: data?.personalData?.nome || '',
    cognome: data?.personalData?.cognome || '',
    email: data?.personalData?.email || '',
    telefono: data?.personalData?.telefono || '',
    consensi: {
      trattamentoDati: data?.personalData?.consensi?.trattamentoDati || false,
      comunicazioniMarketing: data?.personalData?.consensi?.comunicazioniMarketing || false,
      utilizzoFoto: data?.personalData?.consensi?.utilizzoFoto || false,
    }
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const errors = { ...validationErrors };
    
    switch (field) {
      case 'nome':
        if (value.length < 2) errors.nome = 'Il nome deve avere almeno 2 caratteri';
        else delete errors.nome;
        break;
      case 'cognome':
        if (value.length < 2) errors.cognome = 'Il cognome deve avere almeno 2 caratteri';
        else delete errors.cognome;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) errors.email = 'Email non valida';
        else delete errors.email;
        break;
      case 'telefono':
        const phoneRegex = /^[\+]?[(]?[\+]?[(]?([0-9\s\-\(\)]*)[\)]?[\)]?$/;
        if (!phoneRegex.test(value) || value.length < 10) errors.telefono = 'Numero di telefono non valido';
        else delete errors.telefono;
        break;
    }
    
    setValidationErrors(errors);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (typeof value === 'string') {
      validateField(field, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ personalData: formData });
    onNext();
  };

  const isValidForm = formData.nome && formData.cognome && formData.email && 
                     formData.telefono && formData.consensi.trattamentoDati &&
                     Object.keys(validationErrors).length === 0;

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
      
      {/* Offerta Speciale CTA */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-slate-200 shadow-lg">
          <CardHeader>
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white mb-4 shadow-lg"
              >
                <span className="text-2xl">🎁</span>
              </motion.div>
              
              <CardTitle className="text-2xl font-bold text-amber-800 mb-2">
                🌟 Offerta Esclusiva BLUM
              </CardTitle>
              
              <div className="space-y-2">
                <p className="text-lg font-semibold text-orange-700">
                  Completa l&apos;anamnesi e ricevi
                </p>
                <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg text-lg font-semibold shadow-lg">
                  ✨ PRIMA SEDUTA GRATUITA ✨
                </div>
                <p className="text-amber-700 font-medium">
                  📅 Valida per i prossimi 7 giorni
                </p>
              </div>
              
              <div className="mt-3 p-3 bg-white/70 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-700">
                  🔥 <strong>Valore €150</strong> • Solo per chi completa il questionario oggi<br/>
                  💎 Include: Analisi computerizzata + Trattamento personalizzato Haura
                </p>
              </div>
              
              <Badge className="mt-3 bg-red-500 text-white animate-pulse">
                ⏰ Offerta limitata nel tempo
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Privacy Assurance Header */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-green-200/50 blum-glass">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-green-800 flex items-center space-x-2">
                  <span>I Tuoi Dati Sono Protetti</span>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </CardTitle>
                <p className="text-green-700 text-sm mt-1">
                  Crittografia AES-256 • Conformità GDPR • Zero tracking
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Information */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Informazioni Personali</span>
              </CardTitle>
              <p className="text-muted-foreground">
                I tuoi dati per personalizzare al meglio le raccomandazioni
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium">
                    Nome *
                  </Label>
                  <div className="relative">
                    <Input
                      id="nome"
                      type="text"
                      value={formData.nome}
                      onChange={(e) => updateFormData('nome', e.target.value)}
                      placeholder="Il tuo nome"
                      className={`pl-4 ${validationErrors.nome ? 'border-red-500 focus:ring-red-500' : ''}`}
                      required
                    />
                    {validationErrors.nome && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{validationErrors.nome}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cognome" className="text-sm font-medium">
                    Cognome *
                  </Label>
                  <div className="relative">
                    <Input
                      id="cognome"
                      type="text"
                      value={formData.cognome}
                      onChange={(e) => updateFormData('cognome', e.target.value)}
                      placeholder="Il tuo cognome"
                      className={`pl-4 ${validationErrors.cognome ? 'border-red-500 focus:ring-red-500' : ''}`}
                      required
                    />
                    {validationErrors.cognome && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{validationErrors.cognome}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email *</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="tua.email@esempio.it"
                    className={`pl-4 ${validationErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    required
                  />
                  {validationErrors.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{validationErrors.email}</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-sm font-medium flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Telefono *</span>
                </Label>
                <div className="relative">
                  <Input
                    id="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => updateFormData('telefono', e.target.value)}
                    placeholder="+39 123 456 7890"
                    className={`pl-4 ${validationErrors.telefono ? 'border-red-500 focus:ring-red-500' : ''}`}
                    required
                  />
                  {validationErrors.telefono && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{validationErrors.telefono}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Consents */}
        <motion.div variants={itemVariants}>
          <Card className="blum-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-primary" />
                <span>Consensi Privacy</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Seleziona le autorizzazioni che desideri concederci
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Required Consent */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-start space-x-4 p-6 bg-blue-50/50 rounded-xl border border-blue-200/50"
              >
                <Checkbox
                  id="consent-required"
                  checked={formData.consensi.trattamentoDati}
                  onCheckedChange={(checked) => 
                    setFormData({
                      ...formData,
                      consensi: { ...formData.consensi, trattamentoDati: !!checked }
                    })
                  }
                  className="mt-1"
                  required
                />
                <div className="flex-1">
                  <Label htmlFor="consent-required" className="text-sm font-medium text-foreground cursor-pointer">
                    Consenso al trattamento dei dati personali *
                  </Label>
                  <Badge variant="secondary" className="ml-2">Obbligatorio</Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    Autorizzo il trattamento dei miei dati personali ai sensi del GDPR per l&apos;erogazione del servizio di consulenza estetica.
                  </p>
                </div>
              </motion.div>

              {/* Optional Consents */}
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                >
                  <Checkbox
                    id="consent-marketing"
                    checked={formData.consensi.comunicazioniMarketing}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData,
                        consensi: { ...formData.consensi, comunicazioniMarketing: !!checked }
                      })
                    }
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="consent-marketing" className="text-sm font-medium cursor-pointer">
                      Comunicazioni marketing
                    </Label>
                    <Badge variant="outline" className="ml-2 text-xs">Opzionale</Badge>
                    <p className="text-xs text-muted-foreground mt-2">
                      Ricevi consigli di bellezza, offerte esclusive e aggiornamenti sui nostri servizi.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                >
                  <Checkbox
                    id="consent-photos"
                    checked={formData.consensi.utilizzoFoto}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData,
                        consensi: { ...formData.consensi, utilizzoFoto: !!checked }
                      })
                    }
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="consent-photos" className="text-sm font-medium cursor-pointer flex items-center space-x-2">
                      <span>Utilizzo foto anonime</span>
                      <Eye className="w-4 h-4" />
                    </Label>
                    <Badge variant="outline" className="ml-2 text-xs">Opzionale</Badge>
                    <p className="text-xs text-muted-foreground mt-2">
                      Autorizza l&apos;uso di foto prima/dopo in forma completamente anonima per documentazione scientifica.
                    </p>
                  </div>
                </motion.div>
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
            {isValidForm ? (
              <span className="flex items-center space-x-2">
                <span>Continua</span>
                <CheckCircle2 className="w-5 h-5" />
              </span>
            ) : (
              <span>Compila tutti i campi</span>
            )}
          </Button>
        </motion.div>
        
      </form>

      {/* Security Notice */}
      <motion.div 
        variants={itemVariants}
        className="text-center text-xs text-muted-foreground mt-8 p-4 bg-muted/30 rounded-lg"
      >
        <div className="flex items-center justify-center space-x-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Connessione sicura SSL • Dati crittografati • Conforme GDPR</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
