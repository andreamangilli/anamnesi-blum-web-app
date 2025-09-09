// BLUM Questionario - Interfacce TypeScript
// Basato sul documento strategico di Estetica Avanzata

export interface PersonalData {
  nome: string;
  cognome: string;
  dataNascita: Date;
  professione: string;
  indirizzo: {
    via: string;
    citta: string;
    cap: string;
  };
  telefono: string;
  email: string;
  consensi: {
    trattamentoDati: boolean; // Obbligatorio GDPR
    comunicazioniMarketing: boolean; // Opzionale
    utilizzoFoto: boolean; // Opzionale per documentazione
  };
}

export interface LifestyleProfile {
  alimentazione: {
    consumoAcqua: number; // bicchieri/giorno
    fruttaVerdura: 'quotidiano' | 'frequente' | 'scarso';
    regimiParticolari: string[];
  };
  abitudini: {
    fumo: { 
      status: boolean; 
      quantita?: number; 
    };
    alcol: 'quotidiano' | 'settimanale' | 'occasionale' | 'mai';
  };
  attivitaFisica: {
    pratica: boolean;
    tipo?: string;
    frequenza?: number; // volte/settimana
  };
  sonnoStress: {
    oreSonno: number;
    qualitaSonno: 'riposante' | 'disturbato' | 'insufficiente';
    livelloStress: number; // 1-10 scala
  };
}

export interface SkinProfile {
  tipoPelle: string[];
  inestetismiPrincipali: Array<{
    tipo: 'rughe' | 'macchie' | 'pori-dilatati' | 'couperose' | 'lassita' | 'pelle-spenta' | 'cicatrici' | 'occhiaie';
    priorita: 1 | 2 | 3;
  }>;
  routineCosmetica: {
    detergente: string;
    siero: string;
    cremaGiorno: string;
    cremaNotte: string;
    contornoOcchi: string;
  };
  protezioneSolare: {
    utilizzo: 'quotidiano' | 'solo-esposizione' | 'raramente' | 'mai';
    spf?: number;
  };
  trattamentiPrecedenti: Array<{
    tipo: 'laser' | 'luce-pulsata' | 'radiofrequenza' | 'filler' | 'botox' | 'biostimolazione' | 'altro';
    dataUltimo: Date;
    dettagli?: string;
  }>;
}

export interface ClientGoals {
  obiettivoPrincipale: string; // free text
  areeCritiche: Array<'contorno-occhi' | 'ovale-viso' | 'fronte' | 'collo' | 'guance'>;
  occasioniSpeciali: {
    presente: boolean;
    evento?: string;
    data?: Date;
  };
  tempoDisponibile: 'limitato' | 'flessibile' | 'massimo-risultato';
  aspettative: 'miglioramento-sottile' | 'risultati-evidenti' | 'trasformazione-significativa';
}

export interface MedicalHistory {
  controindicazioni: {
    gravidanzaAllattamento: boolean;
    pacemaker: boolean;
    protesiMetalliche: boolean;
    patologieCardiache: boolean;
    epilessia: boolean;
    neoplasie: boolean;
    patologieTiroide: boolean;
    patologieCutanee: boolean;
    diabete: boolean;
    patologieVascolari: boolean;
  };
  farmaci: string[];
  allergie: string[];
  dettagliControindicazioni: {
    [key: string]: {
      presente: boolean;
      dettagli?: string;
      dataUltimo?: Date;
    };
  };
  note: string;
}

export interface QuestionnaireData {
  id?: string;
  personalData: PersonalData;
  lifestyleProfile: LifestyleProfile;
  skinProfile: SkinProfile;
  clientGoals: ClientGoals;
  medicalHistory: MedicalHistory;
  completedAt?: Date;
  currentStep: number;
  status: 'draft' | 'completed' | 'processed';
}

// Tecnologie Haura disponibili
export type HauraTechnology = 'RF' | 'US' | 'VT'; // Radiofrequenza, Ultrasuoni, Veicolazione Transdermica

export interface TreatmentProtocol {
  id: string;
  nome: string;
  descrizione: string;
  profiloTarget: {
    etaMin: number;
    etaMax: number;
    inestetismiPrincipali: string[];
  };
  tecnologiePrincipali: HauraTechnology[];
  numeroSedute: number;
  frequenza: string; // "ogni 10-15 giorni"
  durataPercorso: string; // "2-3 mesi"
  principiAttivi: string[];
  risultatiAttesi: string[];
  controindicazioniSpecifiche: string[];
  investimentoRange: 'economy' | 'medium' | 'premium';
  mantenimento: {
    frequenza: string;
    durata: string;
  };
}

export interface TreatmentRecommendation {
  protocolloConsigliato: TreatmentProtocol;
  matchingScore: number; // 0-100 confidence score
  motivazione: string;
  alternativeProtocols: TreatmentProtocol[];
  curadomiciliare: {
    prodottiConsigliati: string[];
    routine: {
      mattino: string[];
      sera: string[];
    };
  };
  aspettativeRealistiche: string[];
  timelineRisultati: {
    '2-settimane': string;
    '1-mese': string;
    '3-mesi': string;
    '6-mesi': string;
  };
  controindicazioniRilevate: string[];
  consiglioMedico: boolean;
}

// Safety & Compliance Types
export interface SafetyCheck {
  haControindicazioni: boolean;
  controindicazioniRF: string[];
  controindicazioniUS: string[];
  controindicazioniVT: string[];
  richiediVisitaMedica: boolean;
  noteSpeciali: string[];
}

export interface ConsentRecord {
  userId: string;
  consentType: 'data-processing' | 'marketing' | 'photos' | 'medical-data';
  granted: boolean;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

// Report & Analytics Types
export interface QuestionnaireAnalytics {
  completionRate: number;
  averageCompletionTime: number; // in minutes
  dropOffPoints: {
    step: number;
    percentage: number;
  }[];
  mostCommonConcerns: {
    concern: string;
    frequency: number;
  }[];
  ageDistribution: {
    range: string;
    count: number;
  }[];
}

export interface PDFReport {
  userId: string;
  questionnaireId: string;
  generatedAt: Date;
  sections: {
    executive_summary: boolean;
    profilo_cliente: boolean;
    protocollo_dettagliato: boolean;
    cronologia_sedute: boolean;
    cura_domiciliare: boolean;
    controindicazioni: boolean;
    bibliografia: boolean;
    contatti_centro: boolean;
  };
  fileName: string;
  downloadCount: number;
}

// === TIPI SEMPLIFICATI PER COMPONENTI COMPACT ===
// Questi tipi sono compatibili con i componenti CompactXXXStep

export interface CompactPersonalData extends PersonalData {
  age?: string; // Campo aggiunto per compatibilità
}

export interface CompactLifestyleData {
  diet: string[];
  exercise: number;
  sleep: number;
  stress: number;
  smoking: boolean;
  alcohol: string;
}

export interface CompactSkinData {
  skinType: string;
  concerns: string[];
  routine: string[];
  products: string[];
}

export interface CompactGoalsData {
  goals: string[];
  timeline: string;
  budget: string;
  additionalInfo: string;
}

export interface CompactMedicalData {
  conditions: string[];
  medications: string;
  allergies: string;
  previousTreatments: string[];
  pregnancy: boolean;
}

// Interfaccia dati semplificata per i componenti Compact
export interface CompactQuestionnaireData {
  id?: string;
  personalData: CompactPersonalData;
  lifestyle: CompactLifestyleData;
  skinProfile: CompactSkinData;
  goals: CompactGoalsData;
  medicalHistory: CompactMedicalData;
  completedAt?: Date;
  currentStep: number;
  status: 'draft' | 'completed' | 'processed';
}
