'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  CheckCircle2, 
  Download,
  Calendar,
  Star,
  AlertTriangle,
  TrendingUp,
  Activity,
  Zap,
  Heart,
  Shield,
  Target,
  Clock,
  Award,
  FileDown
} from 'lucide-react';
import { CompactQuestionnaireData } from '@/types/questionnaire';

interface CompactResultsStepProps {
  data: Partial<CompactQuestionnaireData>;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function CompactResultsStep({ data, onNext, isLoading }: CompactResultsStepProps) {
  const resultsPrintRef = useRef<HTMLDivElement>(null);

  // 🚀 SALVATAGGIO AUTOMATICO APPENA SI CARICA LA PAGINA FINALE
  useEffect(() => {
    const autoSave = async () => {
      try {
        console.log('🎯 Salvataggio automatico dei risultati finali...');
        await sendToGoogleSheets();
        console.log('✅ Risultati salvati automaticamente in Google Sheets!');
      } catch (error) {
        console.error('❌ Errore nel salvataggio automatico:', error);
      }
    };

    // Salva automaticamente quando il componente si monta
    autoSave();
  }, []);
  
  const handleComplete = async () => {
    try {
      // 💾 Salva automaticamente i dati quando si completa il questionario
      await sendToGoogleSheets();
      console.log('✅ Questionario completato e salvato in Google Sheets!');
    } catch (error) {
      console.error('❌ Errore nel salvataggio finale:', error);
      // Continua comunque con il completamento anche se il salvataggio fallisce
    }
    onNext();
  };

  // Funzione per scaricare PDF
  const downloadPDF = async () => {
    if (!resultsPrintRef.current) return;
    
    try {
      const element = resultsPrintRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      // Prima pagina
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Pagine aggiuntive se necessario
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Nome file con data
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      const fileName = `BLUM-Analisi-${data?.personalData?.email?.split('@')[0] || 'Cliente'}-${dateStr}.pdf`;
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Errore durante la generazione del PDF:', error);
      alert('Errore durante la generazione del PDF. Riprova.');
    }
  };

  // Funzione per inviare dati a Google Sheets
  const sendToGoogleSheets = async () => {
    try {
      const formattedData = {
        timestamp: new Date().toISOString(),
        // Dati personali COMPLETI
        nome: data?.personalData?.nome || '',
        cognome: data?.personalData?.cognome || '',  
        email: data?.personalData?.email || '',
        telefono: data?.personalData?.telefono || '',
        // Consensi GDPR
        consensoTrattamentoDati: data?.personalData?.consensi?.trattamentoDati ? 'Sì' : 'No',
        consensoMarketing: data?.personalData?.consensi?.comunicazioniMarketing ? 'Sì' : 'No',
        consensoFoto: data?.personalData?.consensi?.utilizzoFoto ? 'Sì' : 'No',
        // Lifestyle
        diet: data?.lifestyle?.diet?.join(', ') || '',
        exercise: data?.lifestyle?.exercise?.toString() || '',
        sleep: data?.lifestyle?.sleep?.toString() || '',
        stress: data?.lifestyle?.stress?.toString() || '',
        smoking: data?.lifestyle?.smoking ? 'Sì' : 'No',
        alcohol: data?.lifestyle?.alcohol || '',
        // Skin profile
        skinType: data?.skinProfile?.skinType || '',
        concerns: data?.skinProfile?.concerns?.join(', ') || '',
        routine: data?.skinProfile?.routine?.join(', ') || '',
        products: data?.skinProfile?.products?.join(', ') || '',
        // Goals
        goals: data?.goals?.goals?.join(', ') || '',
        timeline: data?.goals?.timeline || '',
        additionalInfo: data?.goals?.additionalInfo || '',
        // Medical history  
        conditions: data?.medicalHistory?.conditions?.join(', ') || '',
        medications: data?.medicalHistory?.medications || '',
        allergies: data?.medicalHistory?.allergies || '',
        // Protocollo selezionato
        selectedProtocol: selectedProtocol
      };

      // Invio dati all'API per salvataggio in Google Sheets
      const response = await fetch('/api/save-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Dati salvati in Google Sheets:', result);
        // Backup locale
        const existingData = JSON.parse(localStorage.getItem('blum-questionnaires') || '[]');
        existingData.push(formattedData);
        localStorage.setItem('blum-questionnaires', JSON.stringify(existingData));
      } else {
        throw new Error(result.error || 'Errore sconosciuto');
      }
      
    } catch (error) {
      console.error('❌ Errore durante il salvataggio:', error);
      // Salvataggio di emergenza in localStorage
      try {
        const formattedData = {
          timestamp: new Date().toISOString(),
          email: data?.personalData?.email || '',
          selectedProtocol: selectedProtocol
        };
        const existingData = JSON.parse(localStorage.getItem('blum-questionnaires-backup') || '[]');
        existingData.push(formattedData);
        localStorage.setItem('blum-questionnaires-backup', JSON.stringify(existingData));
        console.log('💾 Salvato backup in localStorage');
      } catch (backupError) {
        console.error('Errore anche nel backup:', backupError);
      }
    }
  };

  // Algoritmo di selezione protocollo basato sui dati del questionario
  const selectProtocol = () => {
    const age = data?.personalData?.age ? parseInt(data.personalData.age) : 30;
    const mainConcerns = data?.skinProfile?.concerns || [];
    const skinType = data?.skinProfile?.skinType || '';
    
    // Algoritmo intelligente basato sull'analisi di mercato
    if (age >= 50 && (mainConcerns.includes('lassità') || mainConcerns.includes('rughe profonde'))) {
      return 'lifting-redefinition';
    } else if (age >= 45 && (mainConcerns.includes('rughe') || mainConcerns.includes('perdita tono'))) {
      return 'global-rejuvenation';
    } else if (mainConcerns.includes('macchie') || mainConcerns.includes('cicatrici') || mainConcerns.includes('acne')) {
      return 'corrective-post-acne';
    } else {
      return 'luminosity-perfecting';
    }
  };

  const selectedProtocol = selectProtocol();

  // Definizione protocolli HAURA basati sull'analisi di mercato
  const protocols = {
    'global-rejuvenation': {
      name: 'Global Rejuvenation Anti-Age',
      sessions: 8,
      frequency: 'ogni 10-15 giorni',
      duration: '4-5 mesi',
      mainTech: 'Radiofrequenza',
      description: 'Protocollo completo per il ringiovanimento globale del viso',
      detailedSessions: [
        {
          number: 1,
          title: 'Prima Valutazione e Preparazione',
          week: 'Settimana 1',
          technologies: ['Radiofrequenza preparatoria', 'Ultrasuoni diagnostici', 'Veicolazione Acido Ialuronico'],
          focus: 'Analisi cutanea approfondita e prima stimolazione delicata',
          results: ['Pelle più idratata', 'Leggero miglioramento texture', 'Maggiore luminosità'],
          notes: 'Sessione di adattamento per valutare la risposta cutanea'
        },
        {
          number: 2,
          title: 'Attivazione Metabolismo Cellulare',
          week: 'Settimana 3',
          technologies: ['Radiofrequenza intensiva', 'Ultrasuoni rigenerativi', 'Veicolazione Peptidi bio-attivi'],
          focus: 'Stimolazione profonda del metabolismo e neocollagenesi',
          results: ['Inizio rassodamento', 'Miglioramento elasticità', 'Riduzione rughe superficiali'],
          notes: 'Prima seduta intensiva per attivare i processi riparativi'
        },
        {
          number: 3,
          title: 'Consolidamento e Potenziamento',
          week: 'Settimana 5',
          technologies: ['Radiofrequenza mirata', 'Ultrasuoni focalizzati', 'Veicolazione Vitamina C + E'],
          focus: 'Consolidamento risultati e potenziamento effetto anti-ossidante',
          results: ['Tono cutaneo migliorato', 'Colorito più uniforme', 'Rughe meno evidenti'],
          notes: 'Intensificazione del protocollo con focus su rughe specifiche'
        },
        {
          number: 4,
          title: 'Ottimizzazione Texture',
          week: 'Settimana 7',
          technologies: ['Radiofrequenza + Ultrasuoni combinati', 'Veicolazione Acido Glicolico'],
          focus: 'Affinamento texture cutanea e levigazione superficie',
          results: ['Pelle più liscia', 'Pori minimizzati', 'Effetto lifting visibile'],
          notes: 'Trattamento combinato per massimizzare il rinnovamento cellulare'
        },
        {
          number: 5,
          title: 'Lifting Intensivo',
          week: 'Settimana 9',
          technologies: ['Radiofrequenza lifting mirata', 'Ultrasuoni HIFU-like', 'Veicolazione DMAE'],
          focus: 'Effetto lifting intensivo su contorni viso e collo',
          results: ['Ridefinizione ovale', 'Rassodamento collo', 'Effetto lifting marcato'],
          notes: 'Seduta chiave per il rassodamento e ridefinizione dei contorni'
        },
        {
          number: 6,
          title: 'Perfezionamento e Luminosità',
          week: 'Settimana 11',
          technologies: ['Radiofrequenza modulata', 'Ultrasuoni esfolianti', 'Veicolazione Niacinamide'],
          focus: 'Perfezionamento risultati e massimizzazione luminosità',
          results: ['Pelle radiosa', 'Colorito perfetto', 'Texture vellutata'],
          notes: 'Focus su luminosità e uniformità dell\'incarnato'
        },
        {
          number: 7,
          title: 'Stabilizzazione Avanzata',
          week: 'Settimana 13',
          technologies: ['Radiofrequenza stabilizzante', 'Veicolazione Collagene marino'],
          focus: 'Stabilizzazione e consolidamento di tutti i risultati ottenuti',
          results: ['Risultati consolidati', 'Pelle rigenerata', 'Effetto naturale duraturo'],
          notes: 'Consolidamento finale prima dell\'ultima seduta'
        },
        {
          number: 8,
          title: 'Sigillatura e Mantenimento',
          week: 'Settimana 15',
          technologies: ['Radiofrequenza sigillante', 'Veicolazione Acido Ialuronico premium'],
          focus: 'Sigillatura risultati e programmazione mantenimento',
          results: ['Massimo risultato raggiunto', 'Pelle completamente rigenerata', 'Effetto lifting naturale ottimale'],
          notes: 'Seduta finale con indicazioni per il mantenimento a lungo termine'
        }
      ]
    },
    'luminosity-perfecting': {
      name: 'Luminosity & Perfecting Texture (Glass Skin)',
      sessions: 6,
      frequency: 'ogni 7-10 giorni',
      duration: '2-3 mesi',
      mainTech: 'Veicolazione Transdermica',
      description: 'Percorso per ottenere l&apos;effetto "pelle di porcellana"',
      detailedSessions: [
        {
          number: 1,
          title: 'Preparazione Glass Skin',
          week: 'Settimana 1',
          technologies: ['Ultrasuoni esfolianti delicati', 'Veicolazione Acido Ialuronico puro'],
          focus: 'Preparazione cutanea e prima idratazione profonda',
          results: ['Pelle più morbida', 'Prima luminosità visibile', 'Texture levigata'],
          notes: 'Base perfetta per il percorso glass skin'
        },
        {
          number: 2,
          title: 'Illuminazione Intensiva',
          week: 'Settimana 2',
          technologies: ['Veicolazione Vitamina C 20%', 'Ultrasuoni micro-esfolianti'],
          focus: 'Massimizzazione luminosità e uniformità incarnato',
          results: ['Luminosità intensa', 'Colorito uniforme', 'Macchie attenuate'],
          notes: 'Trattamento chiave per l\'effetto radioso'
        },
        {
          number: 3,
          title: 'Perfezionamento Pori',
          week: 'Settimana 4',
          technologies: ['Veicolazione Niacinamide + Zinco', 'Ultrasuoni purificanti'],
          focus: 'Minimizzazione pori e affinamento texture',
          results: ['Pori visibilmente ridotti', 'Texture raffinata', 'Sebo equilibrato'],
          notes: 'Seduta specifica per perfezionare la grana della pelle'
        },
        {
          number: 4,
          title: 'Idratazione Suprema',
          week: 'Settimana 6',
          technologies: ['Veicolazione Acido Ialuronico multi-peso', 'Radiofrequenza idratante'],
          focus: 'Idratazione profonda multi-strato per effetto plump',
          results: ['Pelle turgida', 'Rughe di disidratazione scomparse', 'Effetto rimpolpante'],
          notes: 'Massima idratazione per l\'effetto glass skin'
        },
        {
          number: 5,
          title: 'Levigazione Finale',
          week: 'Settimana 8',
          technologies: ['Ultrasuoni leviganti', 'Veicolazione Peptidi liscianti'],
          focus: 'Perfezionamento finale della superficie cutanea',
          results: ['Superficie perfettamente liscia', 'Zero imperfezioni', 'Luminosità cristallina'],
          notes: 'Rifinitura finale per la perfezione glass skin'
        },
        {
          number: 6,
          title: 'Sigillatura Glass Skin',
          week: 'Settimana 10',
          technologies: ['Veicolazione Ceramidi + Squalano', 'Radiofrequenza protettiva'],
          focus: 'Sigillatura e protezione del risultato glass skin ottenuto',
          results: ['Effetto glass skin completo', 'Pelle trasparente', 'Perfezione assoluta'],
          notes: 'Risultato finale: pelle perfetta come vetro'
        }
      ]
    },
    'lifting-redefinition': {
      name: 'Lifting & Redefinition',
      sessions: 10,
      frequency: 'ogni 15 giorni',
      duration: '5-6 mesi',
      mainTech: 'Radiofrequenza Intensiva',
      description: 'Lifting non chirurgico per ridefinire i contorni del viso',
      detailedSessions: [
        {
          number: 1,
          title: 'Valutazione e Preparazione Lifting',
          week: 'Settimana 1',
          technologies: ['Radiofrequenza preparatoria', 'Mapping contorni viso'],
          focus: 'Analisi dettagliata dei contorni e prima stimolazione',
          results: ['Pelle più tonica', 'Leggero rassodamento iniziale'],
          notes: 'Valutazione delle aree da trattare per il lifting'
        },
        {
          number: 2,
          title: 'Attivazione Collagene Profondo',
          week: 'Settimana 3',
          technologies: ['Radiofrequenza intensiva profonda', 'Ultrasuoni HIFU-like'],
          focus: 'Stimolazione produzione collagene negli strati profondi',
          results: ['Inizio contrazione tessuti', 'Miglioramento elasticità'],
          notes: 'Prima seduta intensiva per attivare la neocollagenesi'
        },
        {
          number: 3,
          title: 'Rassodamento Guance e Zigomi',
          week: 'Settimana 5',
          technologies: ['RF mirata zona zigomatica', 'Veicolazione DMAE concentrato'],
          focus: 'Rassodamento specifico della zona medio-facciale',
          results: ['Zigomi più definiti', 'Guance rassodante', 'Sollevamento medio-facciale'],
          notes: 'Focus specifico sulla ridefinizione degli zigomi'
        },
        {
          number: 4,
          title: 'Ridefinizione Ovale Mandibolare',
          week: 'Settimana 7',
          technologies: ['RF lifting bordo mandibolare', 'Ultrasuoni tightening'],
          focus: 'Ridefinizione precisa del bordo mandibolare',
          results: ['Ovale più definito', 'Riduzione jowls', 'Jawline marcata'],
          notes: 'Seduta chiave per ridefinire l\'ovale del viso'
        },
        {
          number: 5,
          title: 'Rassodamento Collo e Sottomento',
          week: 'Settimana 9',
          technologies: ['RF intensiva collo', 'Veicolazione peptidi tensori'],
          focus: 'Trattamento intensivo di collo e area sottomento',
          results: ['Collo più sodo', 'Riduzione doppio mento', 'Profilo migliorato'],
          notes: 'Estensione del lifting alla zona collo'
        },
        {
          number: 6,
          title: 'Consolidamento Lifting',
          week: 'Settimana 11',
          technologies: ['RF tightening totale', 'Ultrasuoni consolidanti'],
          focus: 'Consolidamento di tutti i risultati di rassodamento',
          results: ['Lifting visibile consolidato', 'Contorni netti', 'Effetto duraturo'],
          notes: 'Consolidamento intermedio dei risultati'
        },
        {
          number: 7,
          title: 'Perfezionamento Contorni',
          week: 'Settimana 13',
          technologies: ['RF sculpting mirata', 'Veicolazione silicio organico'],
          focus: 'Perfezionamento finale dei contorni facciali',
          results: ['Contorni perfetti', 'Definizione massima', 'Sculpting facciale'],
          notes: 'Rifinitura artistica dei contorni'
        },
        {
          number: 8,
          title: 'Intensificazione Anti-Gravità',
          week: 'Settimana 15',
          technologies: ['RF anti-gravity', 'Ultrasuoni lifting verticali'],
          focus: 'Massimo effetto anti-gravità su tutti i tessuti',
          results: ['Sollevamento massimo', 'Effetto anti-gravity', 'Tessuti sospesi'],
          notes: 'Seduta di massima intensità anti-gravità'
        },
        {
          number: 9,
          title: 'Stabilizzazione Lifting',
          week: 'Settimana 17',
          technologies: ['RF stabilizzante', 'Veicolazione collagene marino'],
          focus: 'Stabilizzazione finale di tutti i risultati lifting',
          results: ['Lifting stabile', 'Risultati consolidati', 'Effetto naturale'],
          notes: 'Stabilizzazione prima della seduta finale'
        },
        {
          number: 10,
          title: 'Lifting Definitivo',
          week: 'Settimana 19',
          technologies: ['RF sigillante lifting', 'Protocollo mantenimento'],
          focus: 'Completamento lifting e programmazione mantenimento',
          results: ['Lifting completo', 'Risultato definitivo', 'Ringiovanimento totale'],
          notes: 'Risultato finale: lifting non chirurgico completo'
        }
      ]
    },
    'corrective-post-acne': {
      name: 'Corrective & Post-Acne',
      sessions: 8,
      frequency: 'ogni 15-20 giorni',
      duration: '4-5 mesi',
      mainTech: 'Ultrasuoni',
      description: 'Correzione esiti cicatriziali e discromici da acne',
      detailedSessions: [
        {
          number: 1,
          title: 'Valutazione e Preparazione Correttiva',
          week: 'Settimana 1',
          technologies: ['Ultrasuoni diagnostici', 'Mapping cicatrici e macchie'],
          focus: 'Analisi dettagliata delle imperfezioni e preparazione cutanea',
          results: ['Pelle preparata', 'Prime macchie attenuate', 'Texture migliorata'],
          notes: 'Valutazione precisa per trattamento personalizzato'
        },
        {
          number: 2,
          title: 'Attivazione Rigenerativa',
          week: 'Settimana 3',
          technologies: ['Ultrasuoni rigenerativi intensivi', 'Veicolazione Vitamina C + Arbutina'],
          focus: 'Stimolazione rigenerazione cellulare e schiarimento',
          results: ['Accelerazione turnover', 'Macchie più chiare', 'Pelle più luminosa'],
          notes: 'Prima seduta intensiva per attivare la rigenerazione'
        },
        {
          number: 3,
          title: 'Levigazione Cicatrici',
          week: 'Settimana 5',
          technologies: ['Ultrasuoni micro-dermoabrasivi', 'Veicolazione TCA peeling'],
          focus: 'Levigazione specifica delle cicatrici atrofiche',
          results: ['Cicatrici meno profonde', 'Superficie più liscia', 'Texture uniformata'],
          notes: 'Trattamento specifico per levigare le cicatrici'
        },
        {
          number: 4,
          title: 'Correzione Discromie',
          week: 'Settimana 7',
          technologies: ['Veicolazione Acido Kojico + Retinolo', 'Ultrasuoni depigmentanti'],
          focus: 'Correzione intensiva delle macchie post-infiammatorie',
          results: ['Macchie significativamente schiarite', 'Tono più uniforme', 'Colorito omogeneo'],
          notes: 'Focus specifico sulle discromie residue'
        },
        {
          number: 5,
          title: 'Riparazione Profonda',
          week: 'Settimana 9',
          technologies: ['Ultrasuoni riparativi', 'Veicolazione Fattori di Crescita EGF'],
          focus: 'Riparazione profonda dei tessuti danneggiati',
          results: ['Tessuti rigenerati', 'Cicatrici riparate', 'Qualità cutanea migliorata'],
          notes: 'Riparazione profonda a livello cellulare'
        },
        {
          number: 6,
          title: 'Perfezionamento Texture',
          week: 'Settimana 11',
          technologies: ['Ultrasuoni leviganti finali', 'Veicolazione Acido Ialuronico riparativo'],
          focus: 'Perfezionamento finale della texture cutanea',
          results: ['Texture perfettamente uniforme', 'Cicatrici quasi impercettibili', 'Pelle levigata'],
          notes: 'Rifinitura finale della texture'
        },
        {
          number: 7,
          title: 'Consolidamento Correttivo',
          week: 'Settimana 13',
          technologies: ['Radiofrequenza riparatrice', 'Veicolazione Ceramidi + Pantenolo'],
          focus: 'Consolidamento di tutti i risultati correttivi',
          results: ['Risultati consolidati', 'Pelle riparata stabilmente', 'Colorito uniforme duraturo'],
          notes: 'Stabilizzazione prima della seduta finale'
        },
        {
          number: 8,
          title: 'Finalizzazione Post-Acne',
          week: 'Settimana 15',
          technologies: ['Protocollo finale protettivo', 'Veicolazione SPF + Antiossidanti'],
          focus: 'Finalizzazione e protezione dei risultati ottenuti',
          results: ['Correzione completa', 'Pelle perfettamente uniforme', 'Zero imperfezioni visibili'],
          notes: 'Risultato finale: pelle completamente corretta'
        }
      ]
    }
  };

  const currentProtocol = protocols[selectedProtocol as keyof typeof protocols];

  // Analisi lifestyle e controindicazioni
  const analyzeLifestyle = () => {
    const pros: string[] = [];
    const cons: string[] = [];
    const warnings: string[] = [];

    // Analisi abitudini positive
    if (data?.lifestyle?.exercise && data.lifestyle.exercise >= 3) pros.push('Attività fisica regolare favorisce la circolazione e l&apos;ossigenazione cutanea');
    if (data?.lifestyle?.sleep && data.lifestyle.sleep >= 7) pros.push('Sonno adeguato ottimizza i processi riparativi cutanei');
    if (data?.lifestyle?.diet?.includes('equilibrata')) pros.push('Alimentazione equilibrata supporta la salute della pelle');
    if (data?.lifestyle?.smoking === false) pros.push('Non fumatore: ottimale per la microcircolazione cutanea');

    // Analisi fattori di rischio
    if (data?.lifestyle?.exercise && data.lifestyle.exercise < 2) cons.push('Scarsa attività fisica può ridurre l&apos;ossigenazione dei tessuti');
    if (data?.lifestyle?.sleep && data.lifestyle.sleep < 6) cons.push('Sonno insufficiente compromette i processi riparativi notturni');
    if (data?.lifestyle?.stress && data.lifestyle.stress >= 7) cons.push('Alto livello di stress può accelerare l&apos;invecchiamento cutaneo');
    if (data?.lifestyle?.smoking === true) cons.push('Il fumo danneggia il collagene e riduce l&apos;efficacia dei trattamenti');

    // Controindicazioni mediche
    if (data?.medicalHistory?.pregnancy) warnings.push('Gravidanza: controindicazione temporanea per tutte le tecnologie HAURA');
    if (data?.medicalHistory?.conditions?.includes('pacemaker')) warnings.push('Pacemaker: controindicazione assoluta per Radiofrequenza e Ultrasuoni');
    if (data?.medicalHistory?.conditions?.includes('epilessia')) warnings.push('Epilessia: richiede valutazione medica prima del trattamento');
    if (data?.medicalHistory?.conditions?.includes('neoplasie')) warnings.push('Storia di neoplasie: necessaria autorizzazione medica specialistica');

    return { pros, cons, warnings };
  };

  const lifestyleAnalysis = analyzeLifestyle();

  // Riepilogo cliente
  const clientSummary = {
    age: data?.personalData?.age || "Non specificato",
    name: `${data?.personalData?.nome || ''} ${data?.personalData?.cognome || ''}`.trim() || "Cliente",
    skinType: data?.skinProfile?.skinType || "Non specificato", 
    mainConcerns: data?.skinProfile?.concerns || [],
    lifestyle: {
      exercise: data?.lifestyle?.exercise || 0,
      stress: data?.lifestyle?.stress || 1,
      sleep: data?.lifestyle?.sleep || 7,
      smoking: data?.lifestyle?.smoking || false
    },
    goals: data?.goals?.goals || []
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Pulsanti di Azione */}
      <Card className="bg-gradient-to-r from-[#3A5762] to-[#21333A] text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="font-semibold mb-2">📋 I tuoi risultati sono pronti!</h3>
              <p className="text-sm opacity-90">Scarica l&apos;analisi completa o procedi con la prenotazione</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={async () => {
                  // 💾 Salva automaticamente i dati quando scarica il PDF
                  await sendToGoogleSheets();
                  await downloadPDF();
                }}
                className="bg-white text-[#3A5762] hover:bg-gray-100 flex items-center space-x-2 font-medium"
              >
                <FileDown className="w-4 h-4" />
                <span>Scarica PDF</span>
              </Button>
              <Button 
                onClick={async () => {
                  // 💾 Salva automaticamente i dati quando prenota
                  await sendToGoogleSheets();
                  window.open('https://appuntamenti.blumlife.it/v2/#book/category/10/service/59/count/1/provider/any/', '_blank');
                }}
                className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-[#3A5762] flex items-center space-x-2 font-semibold px-4 backdrop-blur-sm"
              >
                <Calendar className="w-4 h-4" />
                <span className="whitespace-nowrap">Prenota Visita Gratuita</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Container per PDF - tutto il contenuto dei risultati */}
      <div ref={resultsPrintRef} className="pdf-content bg-white space-y-8">
      
      {/* Header di Completamento */}
      <Card className="text-center bg-gradient-to-r from-[#E6D7CF] to-[#F0E7E2] border-[#DFC8C2]">
        <CardContent className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-[#3A5762] rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-light text-[#3A5762] mb-2 blum-serif">
            🎉 Analisi Completa BLUM
          </h2>
          <p className="text-[#3A5762]/70 font-light">
            La tua consulenza estetica personalizzata è pronta. Protocollo HAURA su misura per te.
          </p>
        </CardContent>
      </Card>

      {/* Riepilogo Profilo Cliente */}
      <Card>
        <CardContent className="p-8">
          <h3 className="text-2xl font-light text-[#3A5762] mb-6 blum-serif flex items-center">
            <Target className="mr-3 w-6 h-6" />
            Il Tuo Profilo BLUM Personalizzato
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#3A5762]/80 font-light">
            <div className="space-y-3">
              <p><strong>👤 Cliente:</strong> {clientSummary.name}</p>
              <p><strong>🎂 Età:</strong> {clientSummary.age} anni</p>
              <p><strong>🌸 Tipo di Pelle:</strong> {clientSummary.skinType}</p>
              <p><strong>🎯 Problematiche Principali:</strong> {clientSummary.mainConcerns.join(', ') || "Nessuna specifica"}</p>
            </div>
            <div className="space-y-3">
              <p><strong>🏃‍♀️ Attività Fisica:</strong> {clientSummary.lifestyle.exercise} volte/settimana</p>
              <p><strong>😴 Sonno:</strong> {clientSummary.lifestyle.sleep} ore/notte</p>
              <p><strong>😰 Livello Stress:</strong> {clientSummary.lifestyle.stress}/10</p>
              <p><strong>🚬 Fumatore:</strong> {clientSummary.lifestyle.smoking ? 'Sì' : 'No'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analisi Lifestyle: Pro e Contro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fattori Positivi */}
        <Card className="border-green-200 bg-green-50/30">
          <CardContent className="p-6">
            <h4 className="font-medium text-green-700 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              ✅ Fattori Favorevoli
            </h4>
            {lifestyleAnalysis.pros.length > 0 ? (
              <ul className="space-y-2 text-sm text-green-600">
                {lifestyleAnalysis.pros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {pro}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-green-600">Nessun fattore particolarmente favorevole identificato.</p>
            )}
          </CardContent>
        </Card>

        {/* Fattori da Migliorare */}
        <Card className="border-amber-200 bg-amber-50/30">
          <CardContent className="p-6">
            <h4 className="font-medium text-amber-700 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              ⚠️ Aree di Miglioramento
            </h4>
            {lifestyleAnalysis.cons.length > 0 ? (
              <ul className="space-y-2 text-sm text-amber-600">
                {lifestyleAnalysis.cons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {con}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-amber-600">Nessuna area critica identificata nel tuo stile di vita.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Controindicazioni Mediche */}
      {lifestyleAnalysis.warnings.length > 0 && (
        <Card className="border-red-200 bg-red-50/30">
          <CardContent className="p-6">
            <h4 className="font-medium text-red-700 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              🩺 Valutazioni Mediche Importanti
            </h4>
            <ul className="space-y-3 text-sm text-red-600">
              {lifestyleAnalysis.warnings.map((warning, index) => (
                <li key={index} className="flex items-start p-3 bg-red-100/50 rounded-lg">
                  <Shield className="w-4 h-4 mt-0.5 mr-3 flex-shrink-0 text-red-500" />
                  {warning}
                </li>
              ))}
            </ul>
            <div className="mt-4 p-4 bg-red-100 rounded-lg">
              <p className="text-sm text-red-700 font-medium">
                ⚕️ <strong>Importante:</strong> Le condizioni evidenziate richiedono una valutazione preliminare da parte di un professionista qualificato, eventualmente con confronto con il medico curante, prima di procedere con i trattamenti HAURA.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Protocollo HAURA Personalizzato */}
      <Card>
        <CardContent className="p-8">
          <h3 className="text-2xl font-light text-[#3A5762] mb-6 blum-serif flex items-center">
            <Zap className="mr-3 w-6 h-6" />
            Il Tuo Protocollo HAURA Personalizzato
          </h3>
          
          <div className="mb-6 p-6 bg-[#F0E7E2]/50 rounded-lg">
            <h4 className="text-xl font-medium text-[#3A5762] mb-3">{currentProtocol.name}</h4>
            <p className="text-[#3A5762]/70 mb-4">{currentProtocol.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-[#3A5762]" />
                <span><strong>{currentProtocol.sessions} sedute</strong></span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-[#3A5762]" />
                <span><strong>{currentProtocol.frequency}</strong></span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-[#3A5762]" />
                <span><strong>{currentProtocol.duration}</strong></span>
              </div>
            </div>
          </div>

          {/* Timeline Cronologica Dettagliata Seduta per Seduta */}
          <div className="space-y-4">
            <h5 className="font-medium text-[#3A5762] mb-6">📅 Timeline Cronologica Completa - Seduta per Seduta</h5>
            <div className="relative">
              {/* Linea temporale verticale */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#DFC8C2]"></div>
              
              {currentProtocol.detailedSessions.map((session, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative pl-12 pb-8"
                >
                  {/* Numero seduta sulla timeline */}
                  <div className="absolute left-0 w-8 h-8 bg-[#3A5762] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {session.number}
                  </div>
                  
                  {/* Card della seduta */}
                  <div className="border border-[#DFC8C2]/50 rounded-xl p-6 bg-gradient-to-r from-white to-[#F0E7E2]/20 shadow-sm">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-semibold text-[#3A5762] text-lg">{session.title}</h6>
                        <Badge variant="outline" className="text-[#3A5762] border-[#3A5762]/50">
                          {session.week}
                        </Badge>
                      </div>
                      <p className="text-[#3A5762]/70 text-sm italic mb-3">{session.focus}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Tecnologie utilizzate */}
                      <div>
                        <p className="font-medium text-[#3A5762] mb-3 flex items-center">
                          <Zap className="w-4 h-4 mr-2" />
                          Tecnologie HAURA:
                        </p>
                        <ul className="text-sm text-[#3A5762]/70 space-y-2">
                          {session.technologies.map((tech, techIndex) => (
                            <li key={techIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-[#3A5762]/40 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                              <span>{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Risultati attesi */}
                      <div>
                        <p className="font-medium text-[#3A5762] mb-3 flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          Risultati Attesi:
                        </p>
                        <ul className="text-sm text-[#3A5762]/70 space-y-2">
                          {session.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Note specialistiche */}
                    <div className="mt-4 p-3 bg-[#3A5762]/5 rounded-lg border-l-4 border-[#3A5762]">
                      <p className="text-xs text-[#3A5762]/60">
                        <strong>💡 Note Specialistiche:</strong> {session.notes}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tecnologie HAURA nel Dettaglio */}
      <Card>
        <CardContent className="p-8">
          <h3 className="text-2xl font-light text-[#3A5762] mb-6 blum-serif flex items-center">
            <Activity className="mr-3 w-6 h-6" />
            Le Tecnologie HAURA: Scienza e Benefici
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Radiofrequenza */}
            <div className="p-4 border border-[#DFC8C2]/50 rounded-lg bg-[#F0E7E2]/30">
              <h4 className="font-medium text-[#3A5762] mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Radiofrequenza
              </h4>
              <p className="text-sm text-[#3A5762]/70 mb-3">
                Stimolazione profonda del collagene attraverso calore controllato per rassodamento e lifting naturale.
              </p>
              <ul className="text-xs text-[#3A5762]/60 space-y-1">
                <li>• Contrazione fibre collagene esistenti</li>
                <li>• Stimolazione neocollagenesi</li>
                <li>• Effetto lifting immediato e progressivo</li>
                <li>• Ridefinizione contorni viso</li>
              </ul>
            </div>

            {/* Ultrasuoni */}
            <div className="p-4 border border-[#DFC8C2]/50 rounded-lg bg-[#F0E7E2]/30">
              <h4 className="font-medium text-[#3A5762] mb-3 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Ultrasuoni Terapeutici
              </h4>
              <p className="text-sm text-[#3A5762]/70 mb-3">
                Rigenerazione tissutale profonda per miglioramento texture e riparazione cicatrici.
              </p>
              <ul className="text-xs text-[#3A5762]/60 space-y-1">
                <li>• Stimolazione metabolismo cellulare</li>
                <li>• Rigenerazione tessuti danneggiati</li>
                <li>• Levigazione cicatrici e rughe</li>
                <li>• Miglioramento microcircolazione</li>
              </ul>
            </div>

            {/* Veicolazione Transdermica */}
            <div className="p-4 border border-[#DFC8C2]/50 rounded-lg bg-[#F0E7E2]/30">
              <h4 className="font-medium text-[#3A5762] mb-3 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Veicolazione Transdermica
              </h4>
              <p className="text-sm text-[#3A5762]/70 mb-3">
                Penetrazione profonda di principi attivi specifici attraverso microcanali temporanei.
              </p>
              <ul className="text-xs text-[#3A5762]/60 space-y-1">
                <li>• Veicolazione mirata di attivi</li>
                <li>• Idratazione profonda</li>
                <li>• Nutrizione cellulare specifica</li>
                <li>• Potenziamento risultati</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prossimi Passi */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <h3 className="text-2xl font-light text-[#3A5762] mb-6 blum-serif flex items-center">
            <Calendar className="mr-3 w-6 h-6" />
            I Tuoi Prossimi Passi
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-[#DFC8C2] rounded-lg text-center hover:bg-[#F0E7E2]/30 transition-colors cursor-pointer"
              onClick={async () => {
                // 💾 Salva automaticamente i dati quando scarica il PDF
                await sendToGoogleSheets();
                await downloadPDF();
              }}
            >
              <Download className="w-8 h-8 text-[#3A5762] mx-auto mb-2" />
              <h4 className="font-medium text-[#3A5762] mb-1">📄 Scarica Report</h4>
              <p className="text-sm text-[#3A5762]/70">Consulenza completa personalizzata</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-[#DFC8C2] rounded-lg text-center hover:bg-[#F0E7E2]/30 transition-colors cursor-pointer"
              onClick={async () => {
                // 💾 Salva automaticamente i dati quando prenota
                await sendToGoogleSheets();
                window.open('https://appuntamenti.blumlife.it/v2/#book/category/10/service/59/count/1/provider/any/', '_blank');
              }}
            >
              <Calendar className="w-8 h-8 text-[#3A5762] mx-auto mb-2" />
              <h4 className="font-medium text-[#3A5762] mb-1">📅 Prenota Consulenza</h4>
              <p className="text-sm text-[#3A5762]/70">PRIMA visita GRATUITA</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Bibliografia Medica */}
      <Card className="border-[#3A5762]/20 bg-[#3A5762]/5">
        <CardContent className="p-6">
          <h4 className="font-medium text-[#3A5762] mb-4 text-sm">📚 Bibliografia e Fonti Mediche</h4>
          <div className="text-xs text-[#3A5762]/60 space-y-1 max-h-32 overflow-y-auto">
            <p>1. Tendenze di bellezza e medicina estetica per il 2025 - Youplast</p>
            <p>2. Modelli Di Business Estetici Redditizi Nel 2024 - Onnafit</p>
            <p>3. Global Non-invasive Aesthetic Treatment Market - Grand View Research</p>
            <p>4. Radiofrequenza medicale - My Personal Trainer</p>
            <p>5. Ultrasuoni in Estetica Avanzata - Pearl&apos;age</p>
            <p>6. Veicolazione transdermica - Corso Venezia 8</p>
            <p>7. Come riconoscere un&apos;anamnesi estetica professionale - D-Beauty</p>
            <p>8. Haura Tecnologia Avanzata - Panestetic</p>
            <p>9. Controindicazioni Radiofrequenza - EsteticaLab</p>
            <p>10. Ultrasuonoterapia - Humanitas Gavazzeni</p>
            <p className="text-[#3A5762]/40 italic">Consulta la bibliografia completa nell&apos;analisi di mercato BLUM 2025</p>
          </div>
        </CardContent>
      </Card>

      {/* Testimonial */}
      <Card className="text-center bg-[#F0E7E2]/50 border-[#DFC8C2]/50">
        <CardContent className="p-8">
          <div className="flex justify-center mb-3">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-[#3A5762]/80 italic mb-3 font-light">
            &ldquo;Il protocollo HAURA personalizzato ha trasformato completamente la mia pelle. Risultati naturali e duraturi!&rdquo;
          </blockquote>
          <cite className="text-sm text-[#3A5762]/60 font-light">- Cliente Soddisfatta BLUM</cite>
        </CardContent>
      </Card>

      {/* Complete Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => window.open('https://appuntamenti.blumlife.it/v2/#book/category/10/service/59/count/1/provider/any/', '_blank')}
          disabled={isLoading}
          size="lg"
          className="bg-[#3A5762] hover:bg-[#21333A] text-white px-8 py-3 cursor-pointer"
        >
          {isLoading ? (
            <span>⏳ Elaborazione...</span>
          ) : (
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>🎯 Inizia il Tuo Percorso BLUM</span>
            </span>
          )}
        </Button>
      </div>
      
      </div> {/* Fine container PDF */}
    </motion.div>
  );
}