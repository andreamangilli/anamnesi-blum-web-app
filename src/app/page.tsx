'use client';

import { CompactQuestionnaireWizard } from '@/components/modern-ui/CompactQuestionnaireWizard';
import { CompactQuestionnaireData } from '@/types/questionnaire';

export default function Home() {
  const handleQuestionnaireComplete = async (data: CompactQuestionnaireData) => {
    console.log('🎉 Questionario completato:', data);
    
    // TODO: Implementare logiche backend
    // - Analizzare dati raccolti
    // - Generare raccomandazioni personalizzate con AI
    // - Inviare email report PDF
    // - Salvare nel database clienti
    // - Triggerare follow-up automation
    
    // Simulazione success feedback
    alert('✅ Congratulazioni! Il tuo profilo BLUM è stato completato con successo!');
  };

  const handleSaveProgress = async (data: Partial<CompactQuestionnaireData>, step: number) => {
    console.log('💾 Auto-save progresso:', { step: step + 1, timestamp: new Date() });
    
    // TODO: Implementare salvataggio
    // - LocalStorage per recovery session
    // - Database per backup
    // - Analytics per drop-off analysis
    
    // Per ora salva in localStorage
    localStorage.setItem('blum-questionnaire-progress', JSON.stringify({
      data,
      step,
      lastSaved: new Date().toISOString()
    }));
  };

  return (
    <CompactQuestionnaireWizard 
      onComplete={handleQuestionnaireComplete}
      onSaveProgress={handleSaveProgress}
    />
  );
}
