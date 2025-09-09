'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, 
  CheckCircle2, 
  AlertCircle,
  Gift
} from 'lucide-react';

interface CompactPersonalDataStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function CompactPersonalDataStep({ data, onUpdate, onNext }: CompactPersonalDataStepProps) {
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
        if (value.length < 2) errors.nome = 'Campo obbligatorio';
        else delete errors.nome;
        break;
      case 'cognome':
        if (value.length < 2) errors.cognome = 'Campo obbligatorio';
        else delete errors.cognome;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) errors.email = 'Email non valida';
        else delete errors.email;
        break;
      case 'telefono':
        const phoneRegex = /^[\+]?[(]?[\+]?[(]?([0-9\s\-\(\)]*)[\)]?[\)]?$/;
        if (!phoneRegex.test(value) || value.length < 10) errors.telefono = 'Numero non valido';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdate({ personalData: formData });
      onNext();
    } catch (error) {
      console.error('❌ Errore nel salvare i dati personali:', error);
      // Procede comunque al prossimo step per non bloccare l'utente
      onNext();
    }
  };

  const isValidForm = formData.nome && formData.cognome && formData.email && 
                     formData.telefono && formData.consensi.trattamentoDati &&
                     Object.keys(validationErrors).length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      
      {/* Compact Offer */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100">
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full text-white mb-3">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            🌟 Offerta Esclusiva BLUM
          </h3>
          <div className="inline-block bg-blum-primary text-white px-4 py-2 rounded-lg font-semibold mb-2">
            ✨ PRIMA CONSULENZA GRATUITA ✨
          </div>
          <p className="text-sm text-slate-600">
            <strong className="text-blum-primary">🔥 Valore €150</strong> • 📅 Valida per 7 giorni
          </p>
        </CardContent>
      </Card>

      {/* Compact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-blum-primary" />
              <h3 className="font-semibold text-slate-900">👤 Informazioni Personali</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="nome" className="text-sm">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => updateFormData('nome', e.target.value)}
                  placeholder="Il tuo nome"
                  className={`mt-1 ${validationErrors.nome ? 'border-red-300' : ''}`}
                  required
                />
                {validationErrors.nome && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {validationErrors.nome}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="cognome" className="text-sm">Cognome *</Label>
                <Input
                  id="cognome"
                  value={formData.cognome}
                  onChange={(e) => updateFormData('cognome', e.target.value)}
                  placeholder="Il tuo cognome"
                  className={`mt-1 ${validationErrors.cognome ? 'border-red-300' : ''}`}
                  required
                />
                {validationErrors.cognome && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {validationErrors.cognome}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-sm">📧 Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="tua.email@esempio.it"
                  className={`mt-1 ${validationErrors.email ? 'border-red-300' : ''}`}
                  required
                />
                {validationErrors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="telefono" className="text-sm">📱 Telefono *</Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => updateFormData('telefono', e.target.value)}
                  placeholder="+39 123 456 7890"
                  className={`mt-1 ${validationErrors.telefono ? 'border-red-300' : ''}`}
                  required
                />
                {validationErrors.telefono && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {validationErrors.telefono}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compact Consents */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">🔒 Consensi Privacy</h3>
            
            {/* Required */}
            <div className="flex items-start space-x-3 p-4 bg-blum-secondary/30 rounded-lg mb-3">
              <Checkbox
                id="consent-required"
                checked={formData.consensi.trattamentoDati}
                onCheckedChange={(checked) => 
                  setFormData({
                    ...formData,
                    consensi: { ...formData.consensi, trattamentoDati: !!checked }
                  })
                }
                required
              />
              <div className="flex-1">
                <Label htmlFor="consent-required" className="text-sm font-medium cursor-pointer">
                  ✅ Consenso al Trattamento Dati *
                </Label>
                <p className="text-xs text-slate-600 mt-1">
                  Obbligatorio per i servizi di consulenza estetica.
                </p>
              </div>
            </div>

            {/* Optional */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg">
                <Checkbox
                  id="consent-marketing"
                  checked={formData.consensi.comunicazioniMarketing}
                  onCheckedChange={(checked) => 
                    setFormData({
                      ...formData,
                      consensi: { ...formData.consensi, comunicazioniMarketing: !!checked }
                    })
                  }
                />
                <Label htmlFor="consent-marketing" className="text-sm cursor-pointer">
                  📢 Comunicazioni Marketing <span className="text-slate-500">(Opzionale)</span>
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg">
                <Checkbox
                  id="consent-photos"
                  checked={formData.consensi.utilizzoFoto}
                  onCheckedChange={(checked) => 
                    setFormData({
                      ...formData,
                      consensi: { ...formData.consensi, utilizzoFoto: !!checked }
                    })
                  }
                />
                <Label htmlFor="consent-photos" className="text-sm cursor-pointer">
                  📸 Uso Foto Anonime <span className="text-slate-500">(Opzionale)</span>
                </Label>
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
              <span>Completa i campi obbligatori</span>
            )}
          </Button>
        </div>
        
      </form>

      {/* BLUM Interior Showcase */}
      <motion.div 
        className="mt-12 pt-8 border-t border-[#DFC8C2]/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-light text-[#3A5762] mb-3 blum-serif">
            Il Tuo Ambiente di Benessere
          </h3>
          <div className="w-16 h-px bg-[#3A5762] mx-auto mb-4"></div>
          <p className="text-[#3A5762]/70 font-light">
            Scopri gli eleganti spazi BLUM nel cuore di Bergamo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Trattamento Room */}
          <motion.div 
            className="group relative overflow-hidden rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-[#F5E6E0] to-[#E8D5CF] flex items-center justify-center">
              {/* Placeholder per la prima immagine - Stanza trattamenti */}
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-[#3A5762]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#3A5762]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-[#3A5762]/60 font-light">
                  Sala Trattamenti
                </p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h4 className="text-white font-light text-lg mb-1">Sala Trattamenti</h4>
              <p className="text-white/90 text-sm font-light">Ambiente rilassante per i tuoi trattamenti personalizzati</p>
            </div>
          </motion.div>

          {/* Lounge Area */}
          <motion.div 
            className="group relative overflow-hidden rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-[#E8E4D9] to-[#D4CFC0] flex items-center justify-center">
              {/* Placeholder per la seconda immagine - Area relax */}
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-[#3A5762]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#3A5762]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-[#3A5762]/60 font-light">
                  Area Lounge
                </p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h4 className="text-white font-light text-lg mb-1">Area Lounge</h4>
              <p className="text-white/90 text-sm font-light">Spazio elegante per il relax pre e post trattamento</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
        
    </motion.div>
  );
}
