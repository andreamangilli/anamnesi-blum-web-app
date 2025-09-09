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
  Gift,
  Star
} from 'lucide-react';

interface RevisionPersonalDataStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function RevisionPersonalDataStep({ data, onUpdate, onNext }: RevisionPersonalDataStepProps) {
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
        if (value.length < 2) errors.nome = 'Name must be at least 2 characters';
        else delete errors.nome;
        break;
      case 'cognome':
        if (value.length < 2) errors.cognome = 'Last name must be at least 2 characters';
        else delete errors.cognome;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) errors.email = 'Please enter a valid email';
        else delete errors.email;
        break;
      case 'telefono':
        const phoneRegex = /^[\+]?[(]?[\+]?[(]?([0-9\s\-\(\)]*)[\)]?[\)]?$/;
        if (!phoneRegex.test(value) || value.length < 10) errors.telefono = 'Please enter a valid phone number';
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
      
      {/* Special Offer */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100 shadow-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full text-white mb-6"
              >
                <Gift className="w-8 h-8" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Exclusive BLUM Offer
              </h3>
              
              <div className="space-y-3 mb-6">
                <p className="text-lg text-slate-700">
                  Complete the assessment today and receive
                </p>
                <div className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold">
                  FREE First Consultation
                </div>
                <p className="text-indigo-700 font-medium">
                  Valid for the next 7 days
                </p>
              </div>
              
              <div className="bg-white/70 rounded-lg p-4 border border-indigo-200">
                <p className="text-sm text-slate-600">
                  <strong className="text-indigo-600">€150 Value</strong> • Only for assessment completions today<br/>
                  Includes: Computerized analysis + Personalized treatment plan
                </p>
              </div>
              
              <Badge className="mt-4 bg-red-500 text-white animate-pulse">
                Limited Time Offer
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy Assurance */}
      <motion.div variants={itemVariants}>
        <Card className="border-green-100 bg-green-50/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 flex items-center space-x-2">
                  <span>Your Data is Protected</span>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </h3>
                <p className="text-green-700 text-sm">
                  AES-256 Encryption • GDPR Compliant • Zero Tracking
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Information */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <User className="w-5 h-5 text-indigo-600" />
                <span>Personal Information</span>
              </CardTitle>
              <p className="text-slate-600">
                Your details help us personalize your recommendations
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium text-slate-700">
                    First Name *
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => updateFormData('nome', e.target.value)}
                    placeholder="Your first name"
                    className={`${validationErrors.nome ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'}`}
                    required
                  />
                  {validationErrors.nome && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-1 text-red-500 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{validationErrors.nome}</span>
                    </motion.div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cognome" className="text-sm font-medium text-slate-700">
                    Last Name *
                  </Label>
                  <Input
                    id="cognome"
                    type="text"
                    value={formData.cognome}
                    onChange={(e) => updateFormData('cognome', e.target.value)}
                    placeholder="Your last name"
                    className={`${validationErrors.cognome ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'}`}
                    required
                  />
                  {validationErrors.cognome && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-1 text-red-500 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{validationErrors.cognome}</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={`${validationErrors.email ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'}`}
                  required
                />
                {validationErrors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-1 text-red-500 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.email}</span>
                  </motion.div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number *</span>
                </Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => updateFormData('telefono', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={`${validationErrors.telefono ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'}`}
                  required
                />
                {validationErrors.telefono && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-1 text-red-500 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.telefono}</span>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Consents */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Lock className="w-5 h-5 text-indigo-600" />
                <span>Privacy Consents</span>
              </CardTitle>
              <p className="text-slate-600">
                Select the permissions you&apos;d like to grant us
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Required Consent */}
              <div className="flex items-start space-x-4 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
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
                  <Label htmlFor="consent-required" className="text-sm font-medium text-slate-900 cursor-pointer">
                    Consent to Personal Data Processing *
                  </Label>
                  <Badge className="ml-2 bg-indigo-100 text-indigo-800">Required</Badge>
                  <p className="text-xs text-slate-600 mt-2">
                    I authorize the processing of my personal data under GDPR for aesthetic consultation services.
                  </p>
                </div>
              </div>

              {/* Optional Consents */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
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
                    <Label htmlFor="consent-marketing" className="text-sm font-medium text-slate-900 cursor-pointer">
                      Marketing Communications
                    </Label>
                    <Badge variant="outline" className="ml-2 text-xs">Optional</Badge>
                    <p className="text-xs text-slate-600 mt-2">
                      Receive beauty tips, exclusive offers, and updates about our services.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
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
                    <Label htmlFor="consent-photos" className="text-sm font-medium text-slate-900 cursor-pointer flex items-center space-x-2">
                      <span>Anonymous Photo Usage</span>
                      <Eye className="w-4 h-4" />
                    </Label>
                    <Badge variant="outline" className="ml-2 text-xs">Optional</Badge>
                    <p className="text-xs text-slate-600 mt-2">
                      Authorize the use of before/after photos in completely anonymous form for scientific documentation.
                    </p>
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg"
          >
            {isValidForm ? (
              <span className="flex items-center space-x-2">
                <span>Continue Assessment</span>
                <CheckCircle2 className="w-5 h-5" />
              </span>
            ) : (
              <span>Please complete all required fields</span>
            )}
          </Button>
        </motion.div>
        
      </form>

      {/* Security Notice */}
      <motion.div 
        variants={itemVariants}
        className="text-center text-xs text-slate-500 mt-8 p-4 bg-slate-50 rounded-lg"
      >
        <div className="flex items-center justify-center space-x-2">
          <Shield className="w-4 h-4 text-indigo-600" />
          <span>Secure SSL Connection • Encrypted Data • GDPR Compliant</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
