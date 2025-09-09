'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Clock, 
  Award, 
  Sparkles,
  Lock,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { QuestionnaireData } from '@/types/questionnaire';

// Import modern step components
import { ModernPersonalDataStep } from './steps/ModernPersonalDataStep';
import { ModernLifestyleStep } from './steps/ModernLifestyleStep';
import { ModernSkinProfileStep } from './steps/ModernSkinProfileStep';
import { ModernGoalsStep } from './steps/ModernGoalsStep';
import { ModernMedicalHistoryStep } from './steps/ModernMedicalHistoryStep';
import { ModernResultsStep } from './steps/ModernResultsStep';

interface ModernQuestionnaireWizardProps {
  onComplete?: (data: QuestionnaireData) => void;
  onSaveProgress?: (data: Partial<QuestionnaireData>, step: number) => void;
}

const TOTAL_STEPS = 6;

export function ModernQuestionnaireWizard({ onComplete, onSaveProgress }: ModernQuestionnaireWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionnaireData, setQuestionnaireData] = useState<Partial<QuestionnaireData>>({
    currentStep: 0,
    status: 'draft'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(TOTAL_STEPS).fill(false));

  // Modern step configuration
  const stepConfig = [
    {
      id: 'privacy',
      title: "Privacy & Dati",
      description: "Informazioni personali e consensi GDPR",
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 'lifestyle',
      title: "Stile di Vita", 
      description: "Alimentazione, sonno e benessere quotidiano",
      icon: Heart,
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 'skin',
      title: "Analisi Cutanea",
      description: "Tipo di pelle e routine di bellezza",
      icon: Sparkles,
      color: "from-violet-500 to-purple-500"
    },
    {
      id: 'goals',
      title: "I Tuoi Obiettivi",
      description: "Cosa desideri ottenere dal trattamento",
      icon: Award,
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 'medical',
      title: "Anamnesi Medica",
      description: "Storia clinica e controindicazioni",
      icon: Lock,
      color: "from-red-500 to-pink-500"
    },
    {
      id: 'results',
      title: "I Tuoi Risultati",
      description: "Raccomandazioni personalizzate BLUM",
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500"
    }
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
    
    // Mark current step as completed
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
      // Scroll automatico in alto
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsLoading(true);
      try {
        const completedData: QuestionnaireData = {
          ...questionnaireData as QuestionnaireData,
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
      // Scroll automatico in alto
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
      case 0: return <ModernPersonalDataStep {...stepProps} />;
      case 1: return <ModernLifestyleStep {...stepProps} />;
      case 2: return <ModernSkinProfileStep {...stepProps} />;
      case 3: return <ModernGoalsStep {...stepProps} />;
      case 4: return <ModernMedicalHistoryStep {...stepProps} />;
      case 5: return <ModernResultsStep {...stepProps} />;
      default: return <div>Step non trovato</div>;
    }
  };

  const currentStepConfig = stepConfig[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 py-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          
          {/* Brand Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3 font-serif">
              BLUM
            </h1>
            <div className="flex items-center justify-center space-x-2 text-lg text-muted-foreground">
              <Sparkles className="w-5 h-5" />
              <span>Questionario Estetico Personalizzato</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-4 mb-8"
          >
            <Badge variant="secondary" className="flex items-center space-x-2 py-2 px-4">
              <Shield className="w-4 h-4" />
              <span>100% Privato e Sicuro</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-2 py-2 px-4">
              <Clock className="w-4 h-4" />
              <span>5-8 minuti</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-2 py-2 px-4">
              <Award className="w-4 h-4" />
              <span>Scientificamente Validato</span>
            </Badge>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Modern Progress Section */}
        <motion.div 
          layout
          className="mb-8"
        >
          <Card className="blum-glass blum-shadow">
            <CardHeader className="pb-6">
              
              {/* Steps Indicator */}
              <div className="flex items-center justify-between mb-6">
                {stepConfig.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = completedSteps[index];
                  const isPast = index < currentStep;
                  
                  return (
                    <motion.div
                      key={step.id}
                      className="flex flex-col items-center space-y-2 flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`
                        relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${isActive ? 'border-primary bg-primary text-primary-foreground shadow-lg' : 
                          isCompleted || isPast ? 'border-primary bg-primary/10 text-primary' : 
                          'border-muted-foreground/30 bg-muted text-muted-foreground'
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <StepIcon className="w-6 h-6" />
                        )}
                        
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                      
                      <div className="text-center">
                        <p className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.title}
                        </p>
                        {index < stepConfig.length - 1 && (
                          <div className={`hidden md:block w-8 h-0.5 mt-2 mx-auto transition-colors ${
                            isPast || isCompleted ? 'bg-primary' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Progresso</span>
                  <span>{Math.round(calculateProgress())}%</span>
                </div>
                <Progress 
                  value={calculateProgress()} 
                  className="h-3 progress-enhanced" 
                />
              </div>
              
              {/* Current Step Info */}
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center mt-6"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${currentStepConfig.color} text-white mb-4`}>
                  <currentStepConfig.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl mb-2">
                  {currentStepConfig.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {currentStepConfig.description}
                </p>
              </motion.div>
              
            </CardHeader>
          </Card>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          layout
          className="flex justify-between items-center mt-8"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
            size="lg"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Indietro</span>
          </Button>

          <div className="flex space-x-4">
            <Button
              variant="ghost"
              onClick={() => onSaveProgress?.(questionnaireData, currentStep)}
              disabled={isLoading}
              className="text-muted-foreground"
            >
              Salva Progresso
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center space-x-2"
              size="lg"
            >
              <span>
                {currentStep === TOTAL_STEPS - 1 ? 'Completa' : 'Continua'}
              </span>
              {currentStep < TOTAL_STEPS - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Privacy Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 space-y-2"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>I tuoi dati sono protetti secondo il GDPR.</span>
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Crittografia AES-256 • Conformità GDPR • Zero tracking
          </p>
        </motion.div>
      </div>
    </div>
  );
}
