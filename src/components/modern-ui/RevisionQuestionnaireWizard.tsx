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
  Heart,
  Search,
  Menu,
  Sun,
  Moon
} from 'lucide-react';
import { QuestionnaireData } from '@/types/questionnaire';

// Import modern step components
import { RevisionPersonalDataStep } from './steps/RevisionPersonalDataStep';
import { ModernLifestyleStep } from './steps/ModernLifestyleStep';
import { ModernSkinProfileStep } from './steps/ModernSkinProfileStep';
import { ModernGoalsStep } from './steps/ModernGoalsStep';
import { ModernMedicalHistoryStep } from './steps/ModernMedicalHistoryStep';
import { ModernResultsStep } from './steps/ModernResultsStep';

interface RevisionQuestionnaireWizardProps {
  onComplete?: (data: QuestionnaireData) => void;
  onSaveProgress?: (data: Partial<QuestionnaireData>, step: number) => void;
}

const TOTAL_STEPS = 6;

export function RevisionQuestionnaireWizard({ onComplete, onSaveProgress }: RevisionQuestionnaireWizardProps) {
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
      title: "Personal Information",
      description: "Basic details and privacy consents",
      icon: Shield,
      number: 1
    },
    {
      id: 'lifestyle',
      title: "Lifestyle", 
      description: "Daily habits and wellness routine",
      icon: Heart,
      number: 2
    },
    {
      id: 'skin',
      title: "Skin Analysis",
      description: "Skin type and beauty routine",
      icon: Sparkles,
      number: 3
    },
    {
      id: 'goals',
      title: "Your Goals",
      description: "What you want to achieve",
      icon: Award,
      number: 4
    },
    {
      id: 'medical',
      title: "Medical History",
      description: "Health background and contraindications",
      icon: Lock,
      number: 5
    },
    {
      id: 'results',
      title: "Results",
      description: "Your personalized recommendations",
      icon: CheckCircle2,
      number: 6
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
      case 0: return <RevisionPersonalDataStep {...stepProps} />;
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
    <div className="min-h-screen bg-white">
      
      {/* REVISION Style Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-indigo-600 p-2 rounded-lg mr-3">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              <span className="text-xl font-bold">BLUM</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Assessment</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Sun className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
                Book Now
              </Button>
              <Menu className="w-6 h-6 md:hidden text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Aesthetic <span className="text-indigo-600">Assessment</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Complete our comprehensive questionnaire to receive personalized beauty recommendations tailored to your unique needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="bg-slate-50 rounded-xl px-6 py-3 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              <span className="text-slate-700">100% Private & Secure</span>
            </div>
            <div className="bg-slate-50 rounded-xl px-6 py-3 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span className="text-slate-700">5-8 minutes</span>
            </div>
            <div className="bg-slate-50 rounded-xl px-6 py-3 flex items-center space-x-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span className="text-slate-700">Scientifically Validated</span>
            </div>
          </motion.div>
        </div>

        {/* Progress Section */}
        <motion.div 
          layout
          className="mb-12"
        >
          <Card className="shadow-sm border-0">
            <CardContent className="p-8">
              
              {/* Steps Indicator */}
              <div className="grid grid-cols-6 gap-4 mb-8">
                {stepConfig.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = completedSteps[index];
                  const isPast = index < currentStep;
                  
                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                        ${isActive ? 'bg-indigo-600 text-white' : 
                          isCompleted || isPast ? 'bg-indigo-100 text-indigo-600' : 
                          'bg-slate-100 text-slate-400'
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          step.number
                        )}
                      </div>
                      
                      <div className="text-center">
                        <p className={`text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm text-slate-600">
                  <span>Progress</span>
                  <span>{Math.round(calculateProgress())}% Complete</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
              </div>
              
              {/* Current Step Info */}
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-8 pt-6 border-t border-slate-100"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {currentStepConfig.title}
                </h2>
                <p className="text-slate-600">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          layout
          className="flex justify-between items-center mt-12"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-6"
            size="lg"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="flex space-x-4">
            <Button
              variant="ghost"
              onClick={() => onSaveProgress?.(questionnaireData, currentStep)}
              disabled={isLoading}
              className="text-slate-600 hover:text-slate-900"
            >
              Save Progress
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-6"
              size="lg"
            >
              <span>
                {currentStep === TOTAL_STEPS - 1 ? 'Complete Assessment' : 'Continue'}
              </span>
              {currentStep < TOTAL_STEPS - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Privacy Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pt-8 border-t border-slate-100"
        >
          <div className="flex justify-center items-center space-x-2 text-sm text-slate-500 mb-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span>Your data is protected according to GDPR regulations.</span>
            <a href="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </a>
          </div>
          <p className="text-xs text-slate-400">
            AES-256 Encryption • GDPR Compliant • Zero Tracking
          </p>
        </motion.div>
      </main>
    </div>
  );
}
