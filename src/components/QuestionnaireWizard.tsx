'use client';

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Shield, Clock, Award } from 'lucide-react';
import { QuestionnaireData } from '@/types/questionnaire';

// Importeremo i componenti step specifici
import { PersonalDataStep } from './steps/PersonalDataStep';
import { LifestyleStep } from './steps/LifestyleStep';
import { SkinProfileStep } from './steps/SkinProfileStep';
import { GoalsStep } from './steps/GoalsStep';
import { MedicalHistoryStep } from './steps/MedicalHistoryStep';
import { ResultsStep } from './steps/ResultsStep';

interface QuestionnaireWizardProps {
  onComplete?: (data: QuestionnaireData) => void;
  onSaveProgress?: (data: Partial<QuestionnaireData>, step: number) => void;
}

const TOTAL_STEPS = 6;

export function QuestionnaireWizard({ onComplete, onSaveProgress }: QuestionnaireWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionnaireData, setQuestionnaireData] = useState<Partial<QuestionnaireData>>({
    currentStep: 0,
    status: 'draft'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Step titles for progress indicator
  const stepTitles = [
    "Privacy & Dati",
    "Stile di Vita", 
    "Analisi Cutanea",
    "Obiettivi",
    "Anamnesi Medica",
    "Risultati"
  ];

  const stepDescriptions = [
    "Informazioni personali e consensi privacy",
    "Alimentazione, sonno e abitudini di vita", 
    "Tipo di pelle e routine cosmetica attuale",
    "Cosa desideri ottenere dai trattamenti",
    "Storia medica e possibili controindicazioni",
    "Le tue raccomandazioni personalizzate"
  ];

  // Auto-save progress ogni 30 secondi
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
    
    // Save progress immediately after update
    if (onSaveProgress) {
      onSaveProgress(updatedData, currentStep);
    }
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completamento questionario
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
      case 0:
        return <PersonalDataStep {...stepProps} />;
      case 1:
        return <LifestyleStep {...stepProps} />;
      case 2:
        return <SkinProfileStep {...stepProps} />;
      case 3:
        return <GoalsStep {...stepProps} />;
      case 4:
        return <MedicalHistoryStep {...stepProps} />;
      case 5:
        return <ResultsStep {...stepProps} />;
      default:
        return <div>Step non trovato</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header con brand e progress */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2 font-serif">
            BLUM Questionario Estetico
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Rispondi alle domande per ricevere raccomandazioni personalizzate 
            per il tuo percorso di bellezza e benessere
          </p>
        </div>

        {/* Progress Bar & Trust Indicators */}
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>100% Privato e Sicuro</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>5-8 minuti</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Award className="w-4 h-4 text-green-600" />
                  <span>Basato su evidenze scientifiche</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} di {TOTAL_STEPS}
              </span>
            </div>
            
            <Progress 
              value={calculateProgress()} 
              className="h-2 mb-4" 
            />
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {stepTitles[currentStep]}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {stepDescriptions[currentStep]}
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Current Step Content */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {renderCurrentStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Indietro</span>
          </Button>

          <div className="flex space-x-4">
            <Button
              variant="secondary"
              onClick={() => onSaveProgress?.(questionnaireData, currentStep)}
              disabled={isLoading}
            >
              Salva Progress
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              <span>
                {currentStep === TOTAL_STEPS - 1 ? 'Completa' : 'Avanti'}
              </span>
              {currentStep < TOTAL_STEPS - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Privacy Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>
            🔒 I tuoi dati sono protetti secondo il GDPR. 
            <a href="/privacy" className="text-green-600 hover:underline ml-1">
              Leggi la Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
