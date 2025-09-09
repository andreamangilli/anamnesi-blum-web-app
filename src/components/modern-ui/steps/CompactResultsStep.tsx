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
  Star
} from 'lucide-react';

interface CompactResultsStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export function CompactResultsStep({ data, onNext, isLoading }: CompactResultsStepProps) {
  const handleComplete = () => {
    onNext();
  };

  // Riepilogo delle risposte del cliente
  const clientSummary = {
    age: data?.personalData?.age || "Non specificato",
    skinType: data?.skinProfile?.skinType || "Non specificato", 
    mainConcerns: data?.skinProfile?.concerns || [],
    lifestyle: {
      exercise: data?.lifestyle?.exercise || 0,
      stress: data?.lifestyle?.stress || 1,
      sleep: data?.lifestyle?.sleep || 7
    },
    goals: data?.goals?.goals || []
  };

  // Tecnologie Haura
  const hauraTechnologies = [
    {
      name: "Radiofrequenza Micro-focalizzata",
      description: "Stimolazione profonda del collagene per rassodamento e lifting naturale",
      benefits: ["Riduzione rughe", "Rassodamento cutaneo", "Miglioramento elasticità"]
    },
    {
      name: "Ultrasuoni Terapeutici HIFU",
      description: "Tecnologia ad ultrasuoni focalizzati per rinnovamento cellulare",
      benefits: ["Rigenerazione tissutale", "Stimolazione metabolismo", "Detox cellulare"]
    },
    {
      name: "LED Terapia Avanzata", 
      description: "Luce a specifiche lunghezze d'onda per biostimolazione",
      benefits: ["Anti-infiammatorio", "Cicatrizzazione", "Produzione collagene"]
    }
  ];

  // Piano terapeutico personalizzato
  const therapyPlan = {
    duration: "12 settimane",
    sessions: 8,
    frequency: "1 seduta ogni 10-14 giorni",
    phases: [
      {
        phase: "Fase 1 - Preparazione (Settimane 1-3)",
        sessions: "2 sedute",
        focus: "Purificazione e preparazione della pelle",
        benefits: ["Pelle più luminosa", "Riduzione imperfezioni superficiali", "Miglioramento texture"]
      },
      {
        phase: "Fase 2 - Attivazione (Settimane 4-8)", 
        sessions: "4 sedute",
        focus: "Stimolazione profonda del collagene",
        benefits: ["Riduzione rughe visibile", "Rassodamento progressivo", "Miglioramento tono"]
      },
      {
        phase: "Fase 3 - Consolidamento (Settimane 9-12)",
        sessions: "2 sedute", 
        focus: "Mantenimento e ottimizzazione risultati",
        benefits: ["Risultati consolidati", "Pelle rigenerata", "Effetto lifting naturale"]
      }
    ]
  };

  const mockRecommendations = [
    {
      category: "🧴 Skincare Quotidiana",
      items: ["🧼 Detergente delicato con ceramidi", "🍊 Siero vitamina C", "☀️ Protezione solare SPF 30+"]
    },
    {
      category: "💅 Trattamenti Professionali", 
      items: ["🧪 Serie di peeling chimici", "🔬 Sessioni microneedling", "💡 Terapia con luce LED"]
    },
    {
      category: "💪 Stile di Vita",
      items: ["💧 Aumentare l'assunzione d'acqua", "😴 Orari di sonno regolari", "🧘‍♀️ Gestione dello stress"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      
      {/* Success Header */}
      <Card className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            🎉 Questionario Completato!
          </h2>
          <p className="text-slate-600">
            Le tue raccomandazioni di bellezza personalizzate BLUM sono pronte.
          </p>
        </CardContent>
      </Card>

      {/* Raccomandazioni Aggiuntive */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <h3 className="text-2xl font-light text-[#3A5762] mb-6 blum-serif flex items-center">
            <span className="mr-3">✨</span> Raccomandazioni Complementari
          </h3>
          
          <div className="space-y-4">
            {mockRecommendations.map((section, index) => (
              <motion.div 
                key={section.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-slate-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-900">{section.category}</h4>
                  <Badge variant="outline" className="text-blum-primary">
                    {section.items.length} elementi
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blum-primary rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prossimi Passi */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <h3 className="text-2xl font-light text-[#3A5762] mb-6 blum-serif flex items-center">
            <span className="mr-3">📋</span> I Tuoi Prossimi Passi
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-slate-200 rounded-lg text-center hover:border-blum-secondary transition-colors"
            >
              <Download className="w-8 h-8 text-blum-primary mx-auto mb-2" />
              <h4 className="font-medium text-slate-900 mb-1">📄 Scarica Report</h4>
              <p className="text-sm text-slate-600">Ottieni la valutazione completa in PDF</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-slate-200 rounded-lg text-center hover:border-blum-secondary transition-colors"
            >
              <Calendar className="w-8 h-8 text-blum-primary mx-auto mb-2" />
              <h4 className="font-medium text-slate-900 mb-1">📅 Prenota Consulenza</h4>
              <p className="text-sm text-slate-600">PRIMO appuntamento GRATUITO</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-slate-200 rounded-lg text-center hover:border-blum-secondary transition-colors"
            >
              <Mail className="w-8 h-8 text-blum-primary mx-auto mb-2" />
              <h4 className="font-medium text-slate-900 mb-1">📧 Risultati via Email</h4>
              <p className="text-sm text-slate-600">Inviati nella tua casella di posta</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonial */}
      <Card className="bg-slate-50">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-3">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-slate-600 italic mb-3">
            &ldquo;Il questionario BLUM ha completamente trasformato la mia routine di bellezza. Le raccomandazioni personalizzate erano perfette!&rdquo;
          </blockquote>
          <cite className="text-sm text-slate-500">- Maria K., Cliente Soddisfatta</cite>
        </CardContent>
      </Card>

      {/* Complete Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleComplete}
          disabled={isLoading}
          size="lg"
          className="bg-blum-primary hover:bg-[#21333A] text-white px-8"
        >
          {isLoading ? (
            <span>⏳ Elaborazione...</span>
          ) : (
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>🎯 Completa Valutazione</span>
            </span>
          )}
        </Button>
      </div>
      
    </motion.div>
  );
}
