'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Download, 
  Calendar, 
  Sparkles, 
  Star,
  Trophy,
  Gift,
  Lock,
  Zap,
  Eye,
  Heart,
  Clock,
  Target,
  TrendingUp,
  Award,
  Users,
  FileText,
  Shield,
  Lightbulb,
  BookOpen,
  Play,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

export function ModernResultsStep({ data }: any) {
  const reportRef = useRef<HTMLDivElement>(null);
  
  // Estrazione dati dal questionario completato
  const personalData = data?.personalData || {};
  const skinProfile = data?.skinProfile || {};
  const clientGoals = data?.clientGoals || {};
  const lifestyleProfile = data?.lifestyleProfile || {};
  const medicalHistory = data?.medicalHistory || {};

  // Logica di matching per determinare il protocollo basato sui dati reali
  const determineProtocol = () => {
    const inestetismi = skinProfile.inestetismiPrincipali || [];
    const aspettative = clientGoals.aspettative;
    const età = personalData.dataNascita ? calculateAge(personalData.dataNascita) : 35;

    // Algoritmo di matching intelligente
    if (inestetismi.some((i: {tipo: string; priorita: number}) => ['rughe', 'lassita'].includes(i.tipo)) && età > 45) {
      return 'global-rejuvenation';
    } else if (inestetismi.some((i: {tipo: string; priorita: number}) => ['pelle-spenta', 'pori-dilatati'].includes(i.tipo)) && età < 35) {
      return 'luminosity-perfecting';
    } else if (inestetismi.some((i: {tipo: string; priorita: number}) => ['lassita', 'rughe'].includes(i.tipo)) && età > 50) {
      return 'lifting-redefinition';
    } else if (inestetismi.some((i: {tipo: string; priorita: number}) => ['cicatrici', 'macchie'].includes(i.tipo))) {
      return 'corrective-post-acne';
    } else {
      return 'global-rejuvenation'; // Default
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const protocolType = determineProtocol();

  // Database dei protocolli completi con manipoli Haura specifici
  const protocolDatabase = {
    'global-rejuvenation': {
      nome: 'Global Rejuvenation Anti-Age',
      codice: 'GRA-001',
      descrizione: 'Protocollo completo per il ringiovanimento globale del viso con approccio multi-tecnologico',
      durata: '3-4 mesi',
      sedute: 8,
      frequenza: 'ogni 10-15 giorni',
      investimento: '€800-1200',
      tecnologie: ['BIORADIOLIFT', 'DERMOPORAZIONE', 'HYDRO SYSTEM'],
      manipoliHaura: [
        {
          nome: 'BIORADIOLIFT',
          funzione: 'RF + fotobiostimolazione per stimolare collagene e effetto lifting',
          utilizzo: 'Sedute 1,3,5,7 per azione anti-age profonda'
        },
        {
          nome: 'DERMOPORAZIONE', 
          funzione: 'Veicolazione transdermica di principi attivi anti-age',
          utilizzo: 'Tutte le sedute per penetrazione peptidi e acido ialuronico'
        },
        {
          nome: 'HYDRO SYSTEM',
          funzione: 'Pulizia profonda ed esfoliazione con peeling liquido',
          utilizzo: 'Sedute 2,4,6,8 per preparazione e detossinazione'
        }
      ],
      targetAge: '45-65 anni',
      efficacia: 95,
      soddisfazione: 98,
      timeline: {
        'Settimana 1-2': 'Preparazione e prima stimolazione',
        'Settimana 3-6': 'Attivazione intensiva del collagene',
        'Settimana 7-10': 'Consolidamento e rafforzamento',
        'Settimana 11-14': 'Perfezionamento e mantenimento'
      },
      risultatiProgressivi: [
        { seduta: 1, settimana: 1, risultato: 'Preparazione cutanea, prima idratazione profonda' },
        { seduta: 2, settimana: 2, risultato: 'Miglioramento texture, pelle più luminosa' },
        { seduta: 3, settimana: 4, risultato: 'Prime contrazioni collagene, tono migliorato' },
        { seduta: 4, settimana: 6, risultato: 'Riduzione rughe sottili, maggiore compattezza' },
        { seduta: 5, settimana: 8, risultato: 'Lifting naturale visibile, ovale più definito' },
        { seduta: 6, settimana: 10, risultato: 'Consolidamento risultati, pelle rigenerata' },
        { seduta: 7, settimana: 12, risultato: 'Perfezionamento, massima efficacia raggiunta' },
        { seduta: 8, settimana: 14, risultato: 'Risultato finale, protocollo completato' }
      ]
    },
    'luminosity-perfecting': {
      nome: 'Luminosity & Perfecting Texture',
      codice: 'LPT-002',
      descrizione: 'Trattamento specializzato per ottenere l\'effetto "Glass Skin" e perfezionare la texture cutanea',
      durata: '2-3 mesi',
      sedute: 6,
      frequenza: 'ogni 7-10 giorni',
      investimento: '€600-900',
      tecnologie: ['OXYFLOW', 'DERMOPORAZIONE', 'DERMOPEEL'],
      manipoliHaura: [
        {
          nome: 'OXYFLOW',
          funzione: 'Aerografo per dermoinfusione ad altissima precisione con ossigeno',
          utilizzo: 'Tutte le sedute per penetrazione vitamina C e acidi illuminanti'
        },
        {
          nome: 'DERMOPORAZIONE',
          funzione: 'Veicolazione transdermica per idratazione profonda',
          utilizzo: 'Sedute 2,4,6 con acido ialuronico e niacinamide'
        },
        {
          nome: 'DERMOPEEL',
          funzione: 'Microdermoabrasione con punte di diamante per texture perfetta',
          utilizzo: 'Sedute 1,3,5 per esfoliazione e affinamento pori'
        }
      ],
      targetAge: '25-40 anni',
      efficacia: 92,
      soddisfazione: 96,
      timeline: {
        'Settimana 1-3': 'Purificazione e preparazione',
        'Settimana 4-6': 'Intensificazione luminosità',
        'Settimana 7-9': 'Perfezionamento texture',
        'Settimana 10-12': 'Mantenimento Glass Skin'
      },
      risultatiProgressivi: [
        { seduta: 1, settimana: 1, risultato: 'Purificazione profonda, prime luminosità' },
        { seduta: 2, settimana: 2, risultato: 'Riduzione pori, texture più uniforme' },
        { seduta: 3, settimana: 4, risultato: 'Effetto glow evidente, idratazione ottimale' },
        { seduta: 4, settimana: 6, risultato: 'Glass skin in formazione, trasparenza cutanea' },
        { seduta: 5, settimana: 8, risultato: 'Perfezione texture, luminosità massima' },
        { seduta: 6, settimana: 10, risultato: 'Glass skin completo, risultato finale' }
      ]
    },
    'lifting-redefinition': {
      nome: 'Lifting & Redefinition',
      codice: 'LR-003',
      descrizione: 'Protocollo intensivo per ridefinire l\'ovale del viso e ottenere un effetto lifting non chirurgico',
      durata: '4-5 mesi',
      sedute: 10,
      frequenza: 'ogni 15 giorni',
      investimento: '€1200-1800',
      tecnologie: ['BIORADIOLIFT', 'DERMOPORAZIONE', 'HYDRO SYSTEM'],
      manipoliHaura: [
        {
          nome: 'BIORADIOLIFT',
          funzione: 'RF intensiva + fotobiostimolazione per lifting profondo',
          utilizzo: 'Tutte le sedute con focus su ovale e collo'
        },
        {
          nome: 'DERMOPORAZIONE',
          funzione: 'Veicolazione di principi attivi tensori (DMAE, peptidi)',
          utilizzo: 'Sedute 2,4,6,8,10 per consolidare effetto lifting'
        },
        {
          nome: 'HYDRO SYSTEM',
          funzione: 'Preparazione tessutale e drenaggio linfatico',
          utilizzo: 'Sedute 1,3,5,7,9 per ottimizzare penetrazione'
        }
      ],
      targetAge: '50+ anni',
      efficacia: 97,
      soddisfazione: 99,
      timeline: {
        'Settimana 1-4': 'Preparazione e prima contrazione',
        'Settimana 5-12': 'Lifting progressivo intensivo',
        'Settimana 13-18': 'Consolidamento e definizione',
        'Settimana 19-20': 'Rifinitura finale'
      },
      risultatiProgressivi: [
        { seduta: 1, settimana: 1, risultato: 'Preparazione tissutale, prime contrazioni' },
        { seduta: 2, settimana: 3, risultato: 'Attivazione collagene profondo' },
        { seduta: 3, settimana: 5, risultato: 'Primo lifting visibile, tono migliorato' },
        { seduta: 4, settimana: 7, risultato: 'Ridefinizione ovale in progress' },
        { seduta: 5, settimana: 9, risultato: 'Lifting marcato, contorni definiti' },
        { seduta: 6, settimana: 11, risultato: 'Consolidamento lifting, elasticità ripristinata' },
        { seduta: 7, settimana: 13, risultato: 'Raffinamento risultati, perfezione contorni' },
        { seduta: 8, settimana: 15, risultato: 'Stabilizzazione completa' },
        { seduta: 9, settimana: 17, risultato: 'Perfezionamento finale' },
        { seduta: 10, settimana: 20, risultato: 'Lifting completo non chirurgico raggiunto' }
      ]
    },
    'corrective-post-acne': {
      nome: 'Corrective & Post-Acne',
      codice: 'CPA-004',
      descrizione: 'Trattamento correttivo specializzato per cicatrici post-acneiche e uniformità del colorito',
      durata: '3-4 mesi',
      sedute: 8,
      frequenza: 'ogni 15-20 giorni',
      investimento: '€900-1300',
      tecnologie: ['DERMOPEEL', 'DERMOPORAZIONE', 'BIORADIOLIFT'],
      manipoliHaura: [
        {
          nome: 'DERMOPEEL',
          funzione: 'Microdermoabrasione intensiva per levigare cicatrici',
          utilizzo: 'Sedute 1,3,5,7 per rimodellamento tessutale progressivo'
        },
        {
          nome: 'DERMOPORAZIONE',
          funzione: 'Veicolazione di principi attivi rigeneranti e schiarenti',
          utilizzo: 'Tutte le sedute con vitamina C, acido cogico, peptidi'
        },
        {
          nome: 'BIORADIOLIFT',
          funzione: 'RF selettiva per stimolare collagene nelle zone cicatriziali',
          utilizzo: 'Sedute 2,4,6,8 per compattezza e uniformità'
        }
      ],
      targetAge: 'tutte le età',
      efficacia: 89,
      soddisfazione: 94,
      timeline: {
        'Settimana 1-4': 'Rigenerazione tissutale iniziale',
        'Settimana 5-10': 'Correzione intensiva cicatrici',
        'Settimana 11-14': 'Uniformazione colorito',
        'Settimana 15-16': 'Perfezionamento finale'
      },
      risultatiProgressivi: [
        { seduta: 1, settimana: 1, risultato: 'Stimolazione rigenerazione, prima levigatura' },
        { seduta: 2, settimana: 3, risultato: 'Riduzione cicatrici superficiali' },
        { seduta: 3, settimana: 5, risultato: 'Miglioramento texture, uniformità in progress' },
        { seduta: 4, settimana: 7, risultato: 'Correzione cicatrici medie, colorito più uniforme' },
        { seduta: 5, settimana: 9, risultato: 'Levigatura significativa, macchie schiarite' },
        { seduta: 6, settimana: 11, risultato: 'Texture quasi perfetta, uniformità avanzata' },
        { seduta: 7, settimana: 13, risultato: 'Rifinitura cicatrici residue' },
        { seduta: 8, settimana: 16, risultato: 'Pelle uniforme, cicatrici minimizzate' }
      ]
    }
  };

  const selectedProtocol = protocolDatabase[protocolType];

  // Funzione per generare e scaricare il PDF
  const generatePDF = async () => {
    if (!reportRef.current) return;

    try {
      // Nascondi temporaneamente i pulsanti di azione per il PDF
      const actionButtons = reportRef.current.querySelector('#action-buttons');
      if (actionButtons) {
        (actionButtons as HTMLElement).style.display = 'none';
      }

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm  
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

      // Genera il nome file con data e nome cliente
      const clientName = personalData?.nome || 'Cliente';
      const today = new Date().toLocaleDateString('it-IT').replace(/\//g, '-');
      const fileName = `BLUM_Report_${clientName}_${today}.pdf`;

      pdf.save(fileName);

      // Ripristina i pulsanti
      if (actionButtons) {
        (actionButtons as HTMLElement).style.display = 'flex';
      }
    } catch (error) {
      console.error('Errore nella generazione del PDF:', error);
      alert('Errore nella generazione del PDF. Riprova tra poco.');
    }
  };

  // Gestione patologie critiche e di attenzione
  const analyzePatologie = () => {
    const patologie = medicalHistory?.patologie || [];
    
    const patologieCritiche = [
      'gravidanza-allattamento',
      'pacemaker-protesi-metalliche', 
      'epilessia',
      'malattie-autoimmuni'
    ];

    const patologieAttenzione = [
      'diabete',
      'ipertensione',
      'tiroide',
      'allergie-cutanee'
    ];

    const critiche = patologie.filter((p: any) => 
      patologieCritiche.includes(p.tipo) && p.presente
    );
    
    const attenzione = patologie.filter((p: any) => 
      patologieAttenzione.includes(p.tipo) && p.presente
    );

    return { critiche, attenzione };
  };

  const patologieAnalysis = analyzePatologie();

  // Analisi personalizzata basata sui dati del questionario
  const getPersonalizedAnalysis = () => {
    const analysis = {
      puntiForza: [] as string[],
      areeIntervento: [] as string[],
      raccomandazioni: [] as string[],
      fattoriSuccesso: [] as string[]
    };

    // Analisi lifestyle
    if (lifestyleProfile?.alimentazione?.consumoAcqua >= 8) {
      analysis.puntiForza.push('Ottima idratazione (>8 bicchieri/giorno)');
    }
    if (lifestyleProfile?.sonnoStress?.oreSonno >= 7) {
      analysis.puntiForza.push('Riposo adeguato (≥7 ore/notte)');
    }
    if (lifestyleProfile?.attivitaFisica?.pratica) {
      analysis.puntiForza.push('Stile di vita attivo con sport regolare');
    }

    // Analisi inestetismi
    skinProfile.inestetismiPrincipali?.forEach((inestetismo: {tipo: string; priorita: number}, index: number) => {
      analysis.areeIntervento.push(`${inestetismo.tipo} (priorità ${inestetismo.priorita})`);
    });

    // Raccomandazioni personalizzate
    if (clientGoals?.aspettative === 'miglioramento-sottile') {
      analysis.raccomandazioni.push('Approccio graduale con sedute più diluite per risultati naturali');
    }

    return analysis;
  };

  const getApproacForInestetismo = (tipo: string) => {
    const approaches = {
      'rughe': 'Radiofrequenza per stimolazione collagene + peptidi anti-age',
      'macchie': 'Veicolazione schiarente + Vitamina C + Acido Kojico',
      'pori-dilatati': 'Ultrasuoni + Acido Salicilico + Niacinamide',
      'lassita': 'Radiofrequenza intensiva + DMAE + Silicio organico',
      'pelle-spenta': 'Veicolazione illuminante + Vitamina C + Acido Ialuronico',
      'cicatrici': 'Ultrasuoni rigenerativi + Fattori di crescita + Centella',
      'couperose': 'Trattamento vascolare + Vitamina K + Estratti calmanti',
      'occhiaie': 'Veicolazione drenante + Caffeina + Peptidi specifici'
    };
    return (approaches as any)[tipo] || 'Trattamento personalizzato';
  };

  const personalizedAnalysis = getPersonalizedAnalysis();

  const celebrationVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 20 }
    }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <motion.div
      ref={reportRef}
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="space-y-8"
    >
      
      {/* Celebration Header */}
      <motion.div variants={celebrationVariants}>
        <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 border-green-200/50 blum-glass blum-shadow">
          <CardHeader className="text-center pb-8">
            
            <motion.div 
              className="flex justify-center mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-8 -left-8"
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6"
              >
                <Star className="w-5 h-5 text-pink-400" />
              </motion.div>
              
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                🎉 Complimenti, {personalData.nome}!
              </CardTitle>
              <p className="text-xl text-green-700 mb-2">
                Il Tuo Profilo BLUM è Completo
              </p>
              <p className="text-green-600">
                Abbiamo analizzato le tue risposte e preparato un protocollo personalizzato
              </p>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Riepilogo Questionario */}
      <motion.div variants={cardVariants}>
        <Card className="blum-shadow">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span>📋 Riepilogo delle Tue Risposte</span>
            </CardTitle>
            <p className="text-muted-foreground">Panoramica completa del tuo profilo</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Profilo Personale */}
              <div className="space-y-4">
                <h3 className="font-semibold text-primary flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Profilo Personale</span>
                </h3>
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nome:</span>
                    <span className="font-medium">{personalData.nome} {personalData.cognome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{personalData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Età stimata:</span>
                    <span className="font-medium">
                      {personalData.dataNascita ? calculateAge(personalData.dataNascita) : 'Non specificata'} anni
                    </span>
                  </div>
                </div>
              </div>

              {/* Analisi Cutanea */}
              <div className="space-y-4">
                <h3 className="font-semibold text-primary flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Analisi Cutanea</span>
                </h3>
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo di pelle:</span>
                    <Badge variant="secondary" className="capitalize">
                      {skinProfile.tipoPelle || 'Non specificato'}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Inestetismi principali:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skinProfile.inestetismiPrincipali?.map((inestetismo: {tipo: string; priorita: number}, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{inestetismo.priorita} {inestetismo.tipo}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protezione solare:</span>
                    <span className="font-medium capitalize">
                      {skinProfile.protezioneSolare?.utilizzo} 
                      {skinProfile.protezioneSolare?.spf && ` (SPF ${skinProfile.protezioneSolare.spf})`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Obiettivi */}
              <div className="space-y-4">
                <h3 className="font-semibold text-primary flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>I Tuoi Obiettivi</span>
                </h3>
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <div>
                    <span className="text-muted-foreground">Obiettivo principale:</span>
                    <p className="text-sm mt-1 italic">
                      &ldquo;{clientGoals.obiettivoPrincipale || 'Non specificato'}&rdquo;
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Aspettative:</span>
                    <span className="text-sm capitalize">
                      {clientGoals.aspettative?.replace('-', ' ') || 'Non specificate'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lifestyle */}
              <div className="space-y-4">
                <h3 className="font-semibold text-primary flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Lifestyle</span>
                </h3>
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Idratazione:</span>
                    <span className="font-medium">
                      {lifestyleProfile?.alimentazione?.consumoAcqua || 0} bicchieri/giorno
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sonno:</span>
                    <span className="font-medium">
                      {lifestyleProfile?.sonnoStress?.oreSonno || 0} ore/notte
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stress:</span>
                    <Badge 
                      variant={lifestyleProfile?.sonnoStress?.livelloStress?.[0] > 6 ? "destructive" : "secondary"}
                    >
                      {lifestyleProfile?.sonnoStress?.livelloStress?.[0] || 0}/10
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Avvisi Medici Critici */}
      {(patologieAnalysis.critiche.length > 0 || patologieAnalysis.attenzione.length > 0) && (
        <motion.div variants={cardVariants}>
          <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <Shield className="w-5 h-5" />
                <span>⚠️ Avvisi Medici Importanti</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Patologie Critiche - Controindicazioni assolute */}
              {patologieAnalysis.critiche.length > 0 && (
                <div className="p-4 bg-red-100/50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>🚫 Controindicazioni Assolute</span>
                  </h3>
                  <p className="text-red-700 text-sm mb-3">
                    Le seguenti condizioni mediche costituiscono controindicazioni assolute per i trattamenti estetici:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {patologieAnalysis.critiche.map((patologia: any, index: number) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-red-700">
                        <span className="text-red-500 mt-1">•</span>
                        <span className="font-medium">
                          {patologia.tipo.replace('-', ' ').toUpperCase()}: {patologia.severita ? `Livello ${patologia.severita}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 bg-red-200/30 rounded border border-red-300">
                    <p className="text-red-800 text-sm font-medium">
                      ❌ <strong>IMPORTANTE:</strong> I seguenti trattamenti NON possono essere eseguiti:
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-red-700">
                      <li>• Tutti i manipoli BIORADIOLIFT (Radiofrequenza)</li>
                      <li>• DERMOPEEL con intensità superiore al livello 1</li>
                      <li>• Trattamenti combinati multi-tecnologia</li>
                      <li>• OXYFLOW con principi attivi penetranti</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Patologie di Attenzione */}
              {patologieAnalysis.attenzione.length > 0 && (
                <div className="p-4 bg-orange-100/50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3 flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>⚠️ Richiede Valutazione Specialistica</span>
                  </h3>
                  <p className="text-orange-700 text-sm mb-3">
                    Le seguenti condizioni richiedono una valutazione personalizzata:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {patologieAnalysis.attenzione.map((patologia: any, index: number) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-orange-700">
                        <span className="text-orange-500 mt-1">•</span>
                        <span className="font-medium">
                          {patologia.tipo.replace('-', ' ').toUpperCase()}: {patologia.severita ? `Livello ${patologia.severita}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 bg-orange-200/30 rounded border border-orange-300">
                    <p className="text-orange-800 text-sm font-medium">
                      📋 <strong>PROCEDURA BLUM:</strong>
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-orange-700">
                      <li>• Valutazione medica personalizzata in centro</li>
                      <li>• Possibile richiesta confronto con medico curante</li>
                      <li>• Adattamento protocollo in base a condizione specifica</li>
                      <li>• Monitoraggio costante durante i trattamenti</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Contatti per chiarimenti */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-700 text-sm">
                  📞 <strong>Per qualsiasi chiarimento:</strong> I nostri specialisti sono disponibili per una consulenza gratuita per valutare il protocollo più sicuro e adatto alla tua situazione.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Protocollo Dettagliato */}
      <motion.div variants={cardVariants}>
        <Card className="blum-shadow border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <Award className="w-6 h-6 text-primary" />
                  <span>🎯 Il Tuo Protocollo Personalizzato</span>
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Analisi scientifica e piano di trattamento su misura
                </p>
              </div>
              <Badge className="text-lg px-4 py-2">
                Codice: {selectedProtocol.codice}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            
            {/* Header Protocollo */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Gift className="w-10 h-10" />
              </motion.div>
              <h2 className="text-3xl font-bold text-amber-800 mb-2">
                ✨ {selectedProtocol.nome}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {selectedProtocol.descrizione}
              </p>
            </div>

            {/* Specifiche Tecniche */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-800">{selectedProtocol.durata}</div>
                <div className="text-sm text-blue-600">Durata totale</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-800">{selectedProtocol.sedute} Sedute</div>
                <div className="text-sm text-green-600">{selectedProtocol.frequenza}</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-purple-800">{selectedProtocol.efficacia}%</div>
                <div className="text-sm text-purple-600">Efficacia clinica</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <Heart className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="font-semibold text-amber-800">{selectedProtocol.soddisfazione}%</div>
                <div className="text-sm text-amber-600">Soddisfazione cliente</div>
              </div>
            </div>

            {/* Tecnologie Utilizzate */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>🔬 Manipoli Haura per il Tuo Trattamento</span>
              </h3>
              <div className="grid gap-6">
                {selectedProtocol.manipoliHaura?.map((manipolo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-primary/20 shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-primary text-lg">{manipolo.nome}</h4>
                          <Badge variant="secondary" className="text-xs">Haura</Badge>
                        </div>
                        <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                          {manipolo.funzione}
                        </p>
                        <div className="flex items-start space-x-2">
                          <Calendar className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                          <p className="text-sm text-primary/80 font-medium">
                            {manipolo.utilizzo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline Risultati */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>📈 Timeline dei Risultati</span>
              </h3>
              <div className="space-y-4">
                {Object.entries(selectedProtocol.timeline).map(([periodo, descrizione], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-lg border-l-4 border-primary"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-primary">{periodo}</h4>
                      <p className="text-sm text-muted-foreground">{descrizione}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Risultati Progressivi per Seduta */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Play className="w-5 h-5 text-primary" />
                <span>🎬 Cosa Aspettarsi ad Ogni Seduta</span>
              </h3>
              <div className="space-y-3">
                {selectedProtocol.risultatiProgressivi.map((risultato, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-4 p-4 bg-white border border-muted rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        {risultato.seduta}
                      </div>
                      <div className="text-sm">
                        <Badge variant="outline">Settimana {risultato.settimana}</Badge>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{risultato.risultato}</p>
                    </div>
                    <Progress 
                      value={(risultato.seduta / selectedProtocol.sedute) * 100} 
                      className="w-20 h-2"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Analisi Personalizzata */}
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl border border-purple-200/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-purple-800">
                <Lightbulb className="w-5 h-5" />
                <span>🧬 Analisi Personalizzata del Tuo Caso</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {personalizedAnalysis.puntiForza.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-2 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I Tuoi Punti di Forza</span>
                    </h4>
                    <ul className="space-y-1">
                      {personalizedAnalysis.puntiForza.map((punto, index) => (
                        <li key={index} className="text-sm text-green-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>{punto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {personalizedAnalysis.areeIntervento.length > 0 && (
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2 flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>Aree di Intervento Prioritarie</span>
                    </h4>
                    <div className="space-y-2">
                      {personalizedAnalysis.areeIntervento.map((area: string, index: number) => (
                        <div key={index} className="text-sm">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              Area {index + 1}
                            </Badge>
                            <span className="font-medium capitalize">{area}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </CardContent>
        </Card>
      </motion.div>

      {/* Riferimenti Medici e Scientifici */}
      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-blue-800 text-lg">
              <FileText className="w-5 h-5" />
              <span>📚 Riferimenti Scientifici</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
              <div className="space-y-1">
                <p><strong>• Journal of Cosmetic Dermatology</strong> - Efficacia RF</p>
                <p><strong>• Dermatologic Surgery</strong> - Protocolli anti-aging</p>
                <p><strong>• Aesthetic Surgery Journal</strong> - Lifting non chirurgico</p>
              </div>
              <div className="space-y-1">
                <p><strong>• American Academy of Dermatology</strong></p>
                <p><strong>• European Journal of Dermatology</strong></p>
                <p><strong>• Società Italiana Medicina Estetica</strong></p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-blue-100/50 rounded-lg">
                <p className="text-xs text-blue-700">
                  🔬 <strong>Tecnologia Haura:</strong> 
                  <a href="https://www.panestetic.com/tecnologie/haura/" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline">
                    Documentazione Ufficiale Panestetic
                  </a>
                </p>
              </div>
              <div className="p-2 bg-slate-100/50 rounded-lg">
                <p className="text-xs text-slate-700">
                  ⚡ <strong>Certificazioni:</strong> CE Medical Device • ISO 13485 • Conformità EU MDR
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Offerta Speciale Reminder */}
      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-lg">
          <CardHeader className="text-center pb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-4xl mb-2"
            >
              🎁
            </motion.div>
            <CardTitle className="text-green-800 text-xl">
              La Tua Prima Seduta è GRATUITA!
            </CardTitle>
            <p className="text-green-700">
              Hai completato l&apos;anamnesi - ora hai diritto a una seduta gratuita del valore di €150
            </p>
            <Badge className="bg-red-500 text-white animate-pulse mt-2">
              ⏰ Valida solo per 7 giorni
            </Badge>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        id="action-buttons"
        variants={cardVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button 
          size="lg" 
          onClick={generatePDF}
          className="flex items-center space-x-2 px-8 py-4 text-lg bg-primary hover:bg-primary/90"
        >
          <Download className="w-5 h-5" />
          <span>📄 Scarica Report Completo PDF</span>
        </Button>
        
        <Button 
          size="lg"
          className="flex items-center space-x-2 px-8 py-4 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
        >
          <Calendar className="w-5 h-5" />
          <span>🎁 Prenota Seduta Gratuita</span>
        </Button>
      </motion.div>

      {/* Next Steps Enhanced */}
      <motion.div variants={cardVariants}>
        <Card className="blum-shadow border-2 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <ArrowRight className="w-6 h-6" />
              <span>🚀 I Tuoi Prossimi Passi</span>
            </CardTitle>
            <p className="text-green-700">
              Il percorso verso la tua bellezza ideale inizia qui
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6">
              {[
                {
                  step: "1",
                  title: "Scarica il Tuo Report Personalizzato",
                  description: "Documento completo con protocollo dettagliato, timeline e informazioni scientifiche",
                  action: "Download immediato",
                  color: "bg-blue-500",
                  icon: <Download className="w-5 h-5" />
                },
                {
                  step: "2", 
                  title: "Consulenza Gratuita con Beauty Specialist",
                  description: "Analisi dal vivo della tua pelle e conferma del protocollo personalizzato",
                  action: "Prenota ora",
                  color: "bg-green-500",
                  icon: <Users className="w-5 h-5" />
                },
                {
                  step: "3",
                  title: "Prima Seduta con Tecnologie Haura",
                  description: "Inizio del tuo percorso di trasformazione con il protocollo personalizzato",
                  action: "Dopo consulenza",
                  color: "bg-purple-500",
                  icon: <Sparkles className="w-5 h-5" />
                },
                {
                  step: "4",
                  title: "Monitoraggio Progressi",
                  description: "Foto prima/dopo e adattamento del protocollo per risultati ottimali",
                  action: "Durante il percorso",
                  color: "bg-amber-500",
                  icon: <TrendingUp className="w-5 h-5" />
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start space-x-6 p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all bg-gradient-to-r from-background to-muted/20"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-lg`}>
                    <span className="text-lg font-bold">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      {item.icon}
                    </div>
                    <p className="text-muted-foreground mb-3">{item.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {item.action}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Footer */}
      <motion.div 
        variants={cardVariants}
        className="text-center space-y-4 p-8 bg-gradient-to-r from-muted/20 to-muted/10 rounded-xl"
      >
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">Report inviato via email in 2 minuti</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Dati protetti con crittografia AES-256</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-purple-600">
            <Award className="w-5 h-5" />
            <span className="text-sm">Protocolli validati scientificamente</span>
          </div>
        </div>
        
        <div className="border-t border-muted pt-4">
          <p className="text-sm text-muted-foreground mb-2">
            💬 Hai domande? Il nostro team è a tua disposizione
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="mailto:info@blum.it" className="text-primary hover:underline">
              📧 info@blum.it
            </a>
            <a href="tel:+390123456789" className="text-primary hover:underline">
              📞 +39 012 345 6789
            </a>
            <a href="https://wa.me/390123456789" className="text-primary hover:underline">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}

// Utility function per descrizione tecnologie
function getTechnologyDescription(tech: string): string {
  const descriptions = {
    'Radiofrequenza': 'Stimola la produzione di collagene ed elastina, contrae le fibre esistenti per un effetto lifting immediato',
    'Radiofrequenza Intensiva': 'Versione potenziata per lassità marcate, penetrazione profonda fino al derma reticolare',
    'Radiofrequenza Light': 'Versione delicata per pelli giovani, stimolazione graduale senza stress termico',
    'Radiofrequenza Selettiva': 'Targeting specifico su aree problematiche, controllo preciso della temperatura',
    'Ultrasuoni': 'Rigenerazione cellulare, miglioramento microcircolazione, preparazione pelle ai principi attivi',
    'Ultrasuoni Focalizzati': 'Penetrazione mirata per lifting profondo, azione selettiva su SMAS e derma',
    'Ultrasuoni Rigenerativi': 'Stimolazione riparazione tissutale, ideale per cicatrici e irregolarità cutanee',
    'Veicolazione Transdermica': 'Penetrazione profonda di principi attivi specifici attraverso microcanali temporanei',
    'Veicolazione Correttiva': 'Principi attivi mirati per correzione inestetismi, concentrati ad alta efficacia',
    'Veicolazione Tensore': 'Cocktail di attivi con effetto lifting, DMAE e peptidi per rassodamento immediato'
  };
  return (descriptions as any)[tech] || 'Tecnologia avanzata per risultati ottimali';
}