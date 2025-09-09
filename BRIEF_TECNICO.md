# BRIEF TECNICO - Web App Questionario Anamnestico BLUM
## **Estetica Avanzata & Protocolli Personalizzati**

---

## 📋 **PANORAMICA DEL PROGETTO**

### **Obiettivo Principale**
Sviluppare una web application React responsive e user-friendly che permetta ai clienti di completare autonomamente un questionario anamnestico dettagliato per l'estetica avanzata. Il sistema dovrà generare automaticamente raccomandazioni personalizzate per percorsi terapeutici BLUM basati sulle tecnologie Haura (Radiofrequenza, Ultrasuoni, Veicolazione Transdermica).

### **Target Audience**
- **Primario**: Clienti di centri estetici (25-65 anni), prevalentemente donne
- **Secondario**: Operatori estetici e beauty specialist per consultazione dati

### **Value Proposition**
- **Per il Cliente**: Consulenza professionale personalizzata, risparmio di tempo, privacy nella compilazione
- **Per il Centro**: Standardizzazione dell'anamnesi, riduzione errori, ottimizzazione tempi consulenza, database clienti strutturato

---

## 🎯 **OBIETTIVI SPECIFICI**

### **Funzionali**
1. **Raccolta Dati Completa**: Implementare questionario multi-modulo basato su standard medici
2. **Algoritmo di Matching**: Generare raccomandazioni personalizzate tramite logica decisionale
3. **Gestione Privacy**: Piena conformità GDPR con consensi granulari
4. **Output Professionale**: Report PDF scaricabile con raccomandazioni e fonti
5. **Validazione Sicurezza**: Sistema di alert per controindicazioni mediche

### **Non-Funzionali**
1. **Usabilità**: Interface intuitiva, mobile-first, accessibilità WCAG 2.1
2. **Performance**: Caricamento < 3 secondi, PWA ready
3. **Sicurezza**: Crittografia dati, backup automatico, audit trail
4. **Scalabilità**: Architettura modulare per future espansioni

---

## 📱 **STRUTTURA DELL'APPLICAZIONE**

### **1. Landing Page & Onboarding**
```
- Hero section con value proposition BLUM
- Breve spiegazione del processo (3-4 step)
- CTA principale "Inizia il Questionario"
- Trust indicators (certificazioni, privacy, sicurezza)
```

### **2. Questionario Multi-Step (5 Moduli)**

#### **MODULO A: Privacy & Dati Anagrafici**
```typescript
interface PersonalData {
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
    trattamentoDati: boolean; // Obbligatorio
    comunicazioniMarketing: boolean; // Opzionale
    utilizzoFoto: boolean; // Opzionale
  };
}
```

#### **MODULO B: Lifestyle & Benessere**
```typescript
interface LifestyleProfile {
  alimentazione: {
    consumoAcqua: number; // bicchieri/giorno
    fruttaVerdura: 'quotidiano' | 'frequente' | 'scarso';
    regimiParticolari: string[];
  };
  abitudini: {
    fumo: { status: boolean; quantita?: number };
    alcol: 'quotidiano' | 'settimanale' | 'occasionale' | 'mai';
  };
  attivitaFisica: {
    pratica: boolean;
    tipo?: string;
    frequenza?: number;
  };
  sonnoStress: {
    oreSonno: number;
    qualitaSonno: 'riposante' | 'disturbato' | 'insufficiente';
    livelloStress: number; // 1-10
  };
}
```

#### **MODULO C: Anamnesi Cutanea**
```typescript
interface SkinProfile {
  tipoPelle: 'secca' | 'grassa' | 'mista' | 'sensibile' | 'normale' | 'acneica';
  inestetismiPrincipali: Array<{
    tipo: string;
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
    utilizzo: 'quotidiano' | 'solo-esposizione' | 'raramente';
    spf?: number;
  };
  trattamentiPrecedenti: Array<{
    tipo: string;
    dataUltimo: Date;
  }>;
}
```

#### **MODULO D: Obiettivi & Aspettative**
```typescript
interface ClientGoals {
  obiettivoPrincipale: string; // free text
  areeCritiche: string[];
  occasioniSpeciali: {
    presente: boolean;
    evento?: string;
    data?: Date;
  };
  budgetRange: 'economy' | 'medium' | 'premium';
  tempoDisponibile: 'limitato' | 'flessibile' | 'massimo-risultato';
}
```

#### **MODULO E: Anamnesi Medica (CRITICO)**
```typescript
interface MedicalHistory {
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
  note: string;
}
```

### **3. Sistema di Valutazione & Matching**

#### **Algoritmo di Raccomandazione**
```typescript
interface TreatmentRecommendation {
  protocolloConsigliato: {
    nome: string;
    descrizione: string;
    tecnologiePrincipali: Array<'RF' | 'US' | 'VT'>;
    numeroSedute: number;
    frequenza: string;
    durataPercorso: string;
  };
  principiAttivi: string[];
  controindicazioni: string[];
  aspettativeRealistiche: string[];
  curadomiciliare: string[];
  investimentoEconomico: 'economy' | 'medium' | 'premium';
}
```

#### **Matrice di Matching**
```
Profilo Cliente → Analisi Algoritmica → Protocollo Personalizzato

ESEMPI:
- Età 45-60 + Rughe + Lassità → "Global Rejuvenation Anti-Age"
- Età 25-40 + Pelle spenta + Pori → "Luminosity & Glass Skin"  
- Età 50+ + Lassità marcata → "Lifting & Redefinition"
- Post-acne + Cicatrici + Macchie → "Corrective & Post-Acne"
```

### **4. Report & Output**

#### **Dashboard Risultati**
```
📊 Il Tuo Profilo BLUM
├── Analisi Cutanea Personalizzata
├── Protocollo Raccomandato
├── Timeline Trattamenti
├── Investimento Richiesto
├── Cosa Aspettarsi (Before/After simulato)
└── Prossimi Passi
```

#### **PDF Report Scaricabile**
```
1. Executive Summary
2. Profilo Cliente & Obiettivi
3. Protocollo Terapeutico Dettagliato
4. Cronologia Sedute Pianificate
5. Cura Domiciliare Prescritta
6. Controindicazioni & Precauzioni
7. Bibliografia & Fonti Mediche
8. Contatti Centro BLUM
```

---

## 🔒 **PRIVACY & COMPLIANCE**

### **GDPR Compliance**
```typescript
interface PrivacyCompliance {
  dataMinimization: boolean; // Solo dati necessari
  explicitConsent: boolean; // Consensi granulari e espliciti
  rightToErasure: boolean; // Diritto alla cancellazione
  dataPortability: boolean; // Export dati in formato standard
  securityMeasures: {
    encryption: 'AES-256';
    backup: 'daily-automated';
    accessControl: 'role-based';
  };
}
```

### **Consensi Granulari**
1. **Obbligatorio**: Trattamento dati per servizio
2. **Opzionale**: Marketing e comunicazioni
3. **Opzionale**: Utilizzo foto anonime per documentazione
4. **Opzionale**: Condivisione dati con partner (labs, specialisti)

### **Data Retention**
```
- Dati anamnesi: 10 anni (requisito medico)
- Dati marketing: 24 mesi max
- Backup sicurezza: 5 anni
- Log accessi: 12 mesi
```

---

## 🎨 **UI/UX DESIGN REQUIREMENTS**

### **Design System**
```scss
// Brand Colors BLUM
$primary: #2C5530; // Verde scuro elegante
$secondary: #F4E4C1; // Beige caldo
$accent: #8B4513; // Marrone raffinato
$success: #22C55E;
$warning: #F59E0B;
$danger: #EF4444;

// Typography
$font-primary: 'Inter', sans-serif; // Leggibilità
$font-heading: 'Playfair Display', serif; // Eleganza
```

### **Mobile-First Approach**
```
📱 Mobile: 375px - 768px (80% utenti)
💻 Tablet: 768px - 1024px (15% utenti)  
🖥️ Desktop: 1024px+ (5% utenti)
```

### **Micro-Interactions**
- Progress bar animato per questionario
- Validation in real-time con feedback visivo
- Loading states eleganti
- Success animations post-submit

### **Accessibility (WCAG 2.1 AA)**
- Contrasto colori ≥ 4.5:1
- Navigation keyboard-only
- Screen reader compatibility
- Alt text per immagini
- Focus indicators chiari

---

## ⚙️ **STACK TECNOLOGICO CONSIGLIATO**

### **Frontend**
```
📦 Framework: Next.js 14 (già setup)
🎨 Styling: Tailwind CSS + shadcn/ui
📝 Forms: React Hook Form + Zod validation
📊 Charts: Recharts per dashboard
🎭 Icons: Lucide React
📱 PWA: next-pwa
```

### **Backend & Database**
```
🗄️ Database: PostgreSQL (dati strutturati) + Redis (cache)
🔐 Auth: NextAuth.js o Clerk
📤 API: REST API con Next.js API routes
📧 Email: Resend o SendGrid
📄 PDF: Puppeteer o React-PDF
☁️ Hosting: Vercel o AWS
```

### **Security & Monitoring**
```
🔒 Encryption: crypto-js per dati sensibili
📊 Analytics: Vercel Analytics + privacy-focused
🚨 Error Tracking: Sentry
📈 Performance: Web Vitals monitoring
🛡️ Security: Content Security Policy (CSP)
```

---

## 📚 **FONTI MEDICHE & BIBLIOGRAFIA**

### **Riferimenti Scientifici Integrati**
La web app dovrà includere una sezione dedicata con tutte le 34 fonti mediche citate nel documento di riferimento, organizzate per categoria:

```
📖 Sezione "Evidenze Scientifiche"
├── Studi su Radiofrequenza (8 fonti)
├── Ricerche su Ultrasuoni Estetici (6 fonti)
├── Veicolazione Transdermica (5 fonti)
├── Protocolli Anamnesi Estetica (4 fonti)
├── Trend Mercato Estetica 2025 (6 fonti)
└── Guidelines Controindicazioni (5 fonti)
```

### **Disclaimer Medico**
```
⚖️ "Le raccomandazioni generate da questo sistema sono basate su 
evidenze scientifiche pubblicate e rappresentano suggerimenti generali. 
Ogni trattamento deve essere sempre valutato e approvato da un 
professionista qualificato. BLUM non fornisce diagnosi mediche."
```

---

## 🚀 **ROADMAP DI SVILUPPO**

### **FASE 1: MVP Core (4-6 settimane)**
- ✅ Setup Next.js + Tailwind (COMPLETATO)
- 📝 Implementazione questionario multi-step
- 🧮 Algoritmo base di matching
- 📊 Dashboard risultati semplice
- 🔒 Sistema privacy GDPR-compliant

### **FASE 2: Enhancement (3-4 settimane)**
- 📄 Generazione PDF professionale
- 📧 Sistema email automatico
- 💾 Database integration
- 🎨 UI/UX refinement
- 📱 PWA implementation

### **FASE 3: Advanced Features (2-3 settimane)**
- 📈 Analytics e reporting
- 🔐 Area riservata operatori
- 🤖 Chatbot supporto
- 📊 Dashboard amministrativa
- 🧪 A/B testing setup

### **FASE 4: Optimization (2 settimane)**
- 🚀 Performance optimization
- 🔍 SEO enhancement
- 🛡️ Security audit
- 📱 Mobile app (Progressive Web App)
- 🌐 Multi-language support

---

## 💼 **BUSINESS LOGIC**

### **Flusso Utente Ottimizzato**
```
1. Landing → Value Prop chiara (conversione 15-20%)
2. Onboarding → 4 step, 2 min max (drop-off < 30%)
3. Questionario → Progress clear, save & resume (completion 85%)
4. Risultati → Wow factor, CTA prenotazione (conversion 25%)
5. Follow-up → Email automated, nurturing (lifetime value ↑)
```

### **KPI da Monitorare**
```
📊 Completion Rate: >80%
⏱️ Time to Complete: <8 minuti
📱 Mobile Usage: >75%
🎯 Lead Conversion: >20%
⭐ User Satisfaction: >4.5/5
🔄 Return Rate: >30%
```

### **Monetization Strategy**
```
💰 Lead Generation: ogni questionario = potenziale cliente
📈 Upselling: raccomandazioni premium = maggior valore
🎯 Targeting: segmentazione precisa per marketing
📊 Data Insights: analytics per ottimizzazione business
```

---

## 🔧 **CONSIDERAZIONI TECNICHE SPECIFICHE**

### **Performance Requirements**
```
⚡ First Contentful Paint: < 1.5s
📱 Mobile Page Speed: > 90/100
🎯 Largest Contentful Paint: < 2.5s
⚖️ Cumulative Layout Shift: < 0.1
```

### **Database Schema Preliminare**
```sql
-- Tabelle principali
users (id, email, created_at, updated_at)
questionnaires (id, user_id, status, completed_at, data_json)
treatments (id, name, description, technologies, target_age, price_range)
recommendations (id, questionnaire_id, treatment_id, confidence_score)
consent_logs (id, user_id, consent_type, granted, timestamp)
```

### **API Endpoints Necessari**
```
POST /api/questionnaire/start
POST /api/questionnaire/save-section
POST /api/questionnaire/submit
GET /api/recommendations/:id
POST /api/generate-pdf
POST /api/send-email
GET /api/treatments
POST /api/book-consultation
```

---

## ✅ **CRITERI DI SUCCESSO**

### **Tecnici**
- [ ] Questionario completabile in < 8 minuti
- [ ] Responsive design perfetto su tutti i device
- [ ] Conformità GDPR al 100%
- [ ] Uptime > 99.9%
- [ ] Security audit passed

### **Business**
- [ ] Conversion rate > 20%
- [ ] Customer satisfaction > 4.5/5
- [ ] Lead quality score > 8/10
- [ ] Support tickets < 5/settimana
- [ ] ROI positivo entro 6 mesi

---

## 📞 **PROSSIMI PASSI**

1. **Approval Brief**: Revisione e approvazione stakeholder
2. **Design System**: Creazione componenti UI/UX
3. **Database Design**: Schema definitivo e migrations
4. **Development Sprint**: Iniziare con MVP core
5. **Testing Phase**: QA completo su tutti i device
6. **Launch Preparation**: Deploy, monitoring, backup

---

*Documento creato il: 20 Gennaio 2025*  
*Versione: 1.0*  
*Progetto: BLUM Questionario Anamnestico Web App*

---

**🔗 Links di Riferimento:**
- [Documento Strategico BLUM](./documento-strategico-blum.pdf)
- [Next.js Documentation](https://nextjs.org/docs)
- [GDPR Compliance Guide](https://gdpr.eu/)
- [Medical Device Software Guidelines](https://www.fda.gov/medical-devices)
