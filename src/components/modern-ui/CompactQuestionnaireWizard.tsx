'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Clock, 
  Award, 
  Sparkles,
  Lock,
  CheckCircle2,
  Heart,
  Search,
  Menu,
  Sun
} from 'lucide-react';
import { CompactQuestionnaireData } from '@/types/questionnaire';

// Import compact step components
import { CompactPersonalDataStep } from './steps/CompactPersonalDataStep';
import { CompactLifestyleStep } from './steps/CompactLifestyleStep';
import { CompactSkinProfileStep } from './steps/CompactSkinProfileStep';
import { CompactGoalsStep } from './steps/CompactGoalsStep';
import { CompactMedicalHistoryStep } from './steps/CompactMedicalHistoryStep';
import { CompactResultsStep } from './steps/CompactResultsStep';

interface CompactQuestionnaireWizardProps {
  onComplete?: (data: CompactQuestionnaireData) => void;
  onSaveProgress?: (data: Partial<CompactQuestionnaireData>, step: number) => void;
}

const TOTAL_STEPS = 6;

export function CompactQuestionnaireWizard({ onComplete, onSaveProgress }: CompactQuestionnaireWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionnaireData, setQuestionnaireData] = useState<Partial<CompactQuestionnaireData>>({
    currentStep: 0,
    status: 'draft'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(TOTAL_STEPS).fill(false));

  // Minimal step configuration
  const stepConfig = [
    { id: 'personal', title: "Dati Personali", description: "Informazioni di base e consensi privacy" },
    { id: 'lifestyle', title: "Stile di Vita", description: "Abitudini quotidiane e benessere" },
    { id: 'skin', title: "Analisi Cutanea", description: "Tipo di pelle e routine di bellezza" },
    { id: 'goals', title: "I Tuoi Obiettivi", description: "Cosa desideri ottenere" },
    { id: 'medical', title: "Anamnesi Medica", description: "Storia clinica e controindicazioni" },
    { id: 'results', title: "I Tuoi Risultati", description: "Le tue raccomandazioni personalizzate" }
  ];

  // Auto-save every 30 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (onSaveProgress && questionnaireData) {
        onSaveProgress(questionnaireData, currentStep);
      }
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [questionnaireData, currentStep, onSaveProgress]);

  const updateQuestionnaireData = (stepData: any) => {
    const updatedData = { 
      ...questionnaireData, 
      ...stepData, 
      currentStep 
    };
    setQuestionnaireData(updatedData);
    
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[currentStep] = true;
    setCompletedSteps(newCompletedSteps);
    
    if (onSaveProgress) {
      onSaveProgress(updatedData, currentStep);
    }
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsLoading(true);
      try {
        const completedData: CompactQuestionnaireData = {
          ...questionnaireData as CompactQuestionnaireData,
          completedAt: new Date(),
          status: 'completed'
        };
        
        if (onComplete) {
          await onComplete(completedData);
        }
      } catch (error) {
        console.error('Errore nel completamento:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateProgress = () => {
    return ((currentStep + 1) / TOTAL_STEPS) * 100;
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: questionnaireData,
      onUpdate: updateQuestionnaireData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isLoading
    };

    switch (currentStep) {
      case 0: return <CompactPersonalDataStep {...stepProps} />;
      case 1: return <CompactLifestyleStep {...stepProps} />;
      case 2: return <CompactSkinProfileStep {...stepProps} />;
      case 3: return <CompactGoalsStep {...stepProps} />;
      case 4: return <CompactMedicalHistoryStep {...stepProps} />;
      case 5: return <CompactResultsStep {...stepProps} />;
      default: return <div>Step non trovato</div>;
    }
  };

  const currentStepConfig = stepConfig[currentStep];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Natural BLUM Header - Matching Image Style */}
      <header className="relative overflow-hidden min-h-[300px] flex items-center justify-center">
        {/* Organic Background matching the image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9A9B89] via-[#B8B5A4] via-[#C8C5B0] to-[#A8A596]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#8B8D7A]/20 via-transparent to-[#B0AE9C]/30"></div>
        <div className="absolute inset-0 backdrop-blur-[1px] opacity-90"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center">
            {/* BLUM Logo in White - Matching Image */}
            <div className="mb-4">
              <h1 className="text-6xl md:text-7xl font-light tracking-wider text-white mb-3" 
                  style={{fontFamily: 'Georgia, "Times New Roman", serif', textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                BLUM
              </h1>
              <div className="w-20 h-px bg-white/80 mx-auto mb-4"></div>
              <p className="text-white/95 text-base md:text-lg font-light tracking-widest uppercase" 
                 style={{letterSpacing: '0.25em', textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
                IL TUO MOMENTO DI EQUILIBRIO
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Elegant Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#3A5762] mb-4" 
                style={{fontFamily: 'Georgia, "Times New Roman", serif'}}>
              Questionario Personalizzato
            </h2>
            <div className="w-24 h-px bg-[#3A5762] mx-auto mb-6"></div>
            <p className="text-lg text-[#3A5762]/80 max-w-3xl mx-auto font-light leading-relaxed">
              Ascolta la tua pelle: compila il questionario e lasciati guidare in un primo trattamento Haura gratuito nel cuore di Bergamo.
            </p>
          </motion.div>

          {/* Refined Trust Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="flex items-center space-x-3 text-[#3A5762]/70">
              <div className="w-8 h-8 bg-[#DFC8C2]/50 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#3A5762]" />
              </div>
              <span className="text-sm font-light tracking-wide">100% RISERVATO</span>
            </div>
            <div className="flex items-center space-x-3 text-[#3A5762]/70">
              <div className="w-8 h-8 bg-[#DFC8C2]/50 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#3A5762]" />
              </div>
              <span className="text-sm font-light tracking-wide">5 MINUTI</span>
            </div>
            <div className="flex items-center space-x-3 text-[#3A5762]/70">
              <div className="w-8 h-8 bg-[#DFC8C2]/50 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-[#3A5762]" />
              </div>
              <span className="text-sm font-light tracking-wide">VALIDATO SCIENTIFICAMENTE</span>
            </div>
          </motion.div>
        </div>

        {/* Refined Progress Section */}
        <motion.div className="mb-16">
          <Card className="blum-glass border-[#DFC8C2]/30 shadow-lg">
            <CardContent className="p-8">
              {/* Elegant Steps Indicator */}
              <div className="flex justify-between items-center mb-8">
                {stepConfig.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = completedSteps[index];
                  const isPast = index < currentStep;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-light transition-all duration-300
                        ${isActive ? 'bg-[#3A5762] text-white shadow-lg' : 
                          isCompleted || isPast ? 'bg-[#DFC8C2] text-[#3A5762] border-2 border-[#3A5762]/20' : 
                          'bg-white border-2 border-[#DFC8C2] text-[#3A5762]/40'
                        }
                      `}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                      </div>
                      <span className={`text-xs mt-2 font-light tracking-wide ${
                        isActive ? 'text-[#3A5762] font-normal' : 'text-[#3A5762]/60'
                      }`}>
                        {step.title.split(' ')[0].toUpperCase()}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Sophisticated Progress Bar */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm text-[#3A5762]/70 font-light">
                  <span className="tracking-wide">PROGRESSO</span>
                  <span>{Math.round(calculateProgress())}% COMPLETATO</span>
                </div>
                <div className="w-full bg-[#DFC8C2]/30 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-[#3A5762] to-[#586F78] h-1 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
              </div>
              
              {/* Current Step Info */}
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-6 border-t border-[#DFC8C2]/30"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#DFC8C2]/50 to-[#DFC8C2]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-[#3A5762]" />
                </div>
                <h3 className="text-2xl font-light text-[#3A5762] mb-2 blum-serif">
                  {currentStepConfig.title}
                </h3>
                <p className="text-[#3A5762]/70 text-sm font-light leading-relaxed">
                  {currentStepConfig.description}
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>

        {/* Compact Navigation */}
        <motion.div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Indietro</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-blum-primary hover:bg-[#21333A]"
          >
            <span>{currentStep === TOTAL_STEPS - 1 ? 'Completa' : 'Continua'}</span>
            {currentStep < TOTAL_STEPS - 1 && <ChevronRight className="w-4 h-4" />}
          </Button>
        </motion.div>

        {/* Elegant Footer */}
        <div className="text-center mt-16 pt-8 border-t border-[#DFC8C2]/30">
          <div className="flex justify-center items-center space-x-3 text-xs text-[#3A5762]/60 font-light">
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 text-[#3A5762]/70" />
              <span className="tracking-wide">I TUOI DATI SONO PROTETTI SECONDO IL GDPR</span>
            </div>
            <span>·</span>
            <a href="/privacy" className="text-[#3A5762] hover:text-[#3A5762]/80 transition-colors tracking-wide">
              PRIVACY POLICY
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
