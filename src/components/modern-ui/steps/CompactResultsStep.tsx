'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Download,
  Calendar,
  Mail,
  Star,
  AlertTriangle,
  TrendingUp,
  Activity,
  Zap,
  Heart,
  Shield,
  Target,
  Clock,
  Award
} from 'lucide-react';
import { CompactQuestionnaireData } from '@/types/questionnaire';

interface CompactResultsStepProps {
  data: CompactQuestionnaireData;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function CompactResultsStep({ data, onNext, isLoading }: CompactResultsStepProps) {
  const handleComplete = () => {
    onNext();
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
      phases: [
        {
          name: 'Fase 1: Rigenerazione e Stimolazione',
          sessions: '1-4',
          focus: 'Risveglio metabolismo cutaneo e neocollagenesi',
          technologies: ['Radiofrequenza intensiva', 'Ultrasuoni rigenerativi', 'Veicolazione peptidi'],
          results: ['Miglioramento texture cutanea', 'Inizio stimolazione collagene', 'Maggiore idratazione']
        },
        {
          name: 'Fase 2: Lifting e Perfezionamento',
          sessions: '5-8',
          focus: 'Consolidamento effetto lifting e perfezionamento qualità pelle',
          technologies: ['Radiofrequenza mirata', 'Veicolazione Acido Ialuronico', 'Antiossidanti avanzati'],
          results: ['Riduzione rughe visibile', 'Effetto lifting naturale', 'Luminosità e tonicità ottimali']
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
      phases: [
        {
          name: 'Fase Unica: Illuminazione e Perfezionamento',
          sessions: '1-6',
          focus: 'Massimizzazione luminosità e affinamento texture',
          technologies: ['Ultrasuoni esfolianti', 'Veicolazione Vitamina C', 'Radiofrequenza delicata'],
          results: ['Pelle luminosa e uniforme', 'Pori minimizzati', 'Idratazione profonda', 'Effetto glass skin']
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
      phases: [
        {
          name: 'Fase Unica: Rassodamento Intensivo',
          sessions: '1-10',
          focus: 'Effetto lifting non chirurgico e ridefinizione contorni',
          technologies: ['Radiofrequenza tightening', 'Ultrasuoni profondi', 'Veicolazione DMAE'],
          results: ['Ridefinizione ovale viso', 'Rassodamento intensivo', 'Effetto lifting progressivo']
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
      phases: [
        {
          name: 'Fase Unica: Correzione e Rigenerazione',
          sessions: '1-8',
          focus: 'Uniformità colorito e miglioramento cicatrici',
          technologies: ['Ultrasuoni rigenerativi', 'Veicolazione depigmentanti', 'Radiofrequenza riparatrice'],
          results: ['Riduzione macchie evidenti', 'Levigatura cicatrici', 'Texture uniforme']
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
    if (data?.lifestyle?.exercise >= 3) pros.push('Attività fisica regolare favorisce la circolazione e l&apos;ossigenazione cutanea');
    if (data?.lifestyle?.sleep >= 7) pros.push('Sonno adeguato ottimizza i processi riparativi cutanei');
    if (data?.lifestyle?.diet?.includes('equilibrata')) pros.push('Alimentazione equilibrata supporta la salute della pelle');
    if (!data?.lifestyle?.smoking) pros.push('Non fumatore: ottimale per la microcircolazione cutanea');

    // Analisi fattori di rischio
    if (data?.lifestyle?.exercise < 2) cons.push('Scarsa attività fisica può ridurre l&apos;ossigenazione dei tessuti');
    if (data?.lifestyle?.sleep < 6) cons.push('Sonno insufficiente compromette i processi riparativi notturni');
    if (data?.lifestyle?.stress >= 7) cons.push('Alto livello di stress può accelerare l&apos;invecchiamento cutaneo');
    if (data?.lifestyle?.smoking) cons.push('Il fumo danneggia il collagene e riduce l&apos;efficacia dei trattamenti');

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

          {/* Timeline delle Fasi */}
          <div className="space-y-6">
            <h5 className="font-medium text-[#3A5762] mb-4">📅 Timeline di Sviluppo della Terapia</h5>
            {currentProtocol.phases.map((phase, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-[#DFC8C2]/50 rounded-lg p-6 bg-white/50"
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-[#3A5762] text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                    {index + 1}
                  </div>
                  <h6 className="font-medium text-[#3A5762]">{phase.name}</h6>
                </div>
                
                <p className="text-sm text-[#3A5762]/70 mb-4"><strong>Sedute {phase.sessions}:</strong> {phase.focus}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-[#3A5762] mb-2">🔬 Tecnologie HAURA Utilizzate:</p>
                    <ul className="text-sm text-[#3A5762]/70 space-y-1">
                      {phase.technologies.map((tech, techIndex) => (
                        <li key={techIndex} className="flex items-center">
                          <Zap className="w-3 h-3 mr-2 text-[#3A5762]" />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-[#3A5762] mb-2">✨ Risultati Attesi:</p>
                    <ul className="text-sm text-[#3A5762]/70 space-y-1">
                      {phase.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-center">
                          <Star className="w-3 h-3 mr-2 text-[#3A5762]" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-[#DFC8C2] rounded-lg text-center hover:bg-[#F0E7E2]/30 transition-colors"
            >
              <Download className="w-8 h-8 text-[#3A5762] mx-auto mb-2" />
              <h4 className="font-medium text-[#3A5762] mb-1">📄 Scarica Report</h4>
              <p className="text-sm text-[#3A5762]/70">Consulenza completa personalizzata</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-[#DFC8C2] rounded-lg text-center hover:bg-[#F0E7E2]/30 transition-colors"
            >
              <Calendar className="w-8 h-8 text-[#3A5762] mx-auto mb-2" />
              <h4 className="font-medium text-[#3A5762] mb-1">📅 Prenota Consulenza</h4>
              <p className="text-sm text-[#3A5762]/70">PRIMA visita GRATUITA</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-[#DFC8C2] rounded-lg text-center hover:bg-[#F0E7E2]/30 transition-colors"
            >
              <Mail className="w-8 h-8 text-[#3A5762] mx-auto mb-2" />
              <h4 className="font-medium text-[#3A5762] mb-1">📧 Ricevi via Email</h4>
              <p className="text-sm text-[#3A5762]/70">Report nella tua casella</p>
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
          onClick={handleComplete}
          disabled={isLoading}
          size="lg"
          className="bg-[#3A5762] hover:bg-[#21333A] text-white px-8 py-3"
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
      
    </motion.div>
  );
}