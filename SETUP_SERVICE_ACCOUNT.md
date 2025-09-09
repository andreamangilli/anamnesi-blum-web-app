# 🔐 SETUP SERVICE ACCOUNT GOOGLE SHEETS - SOLUZIONE PROFESSIONALE

## ✅ **API NEXT.JS GIÀ CONFIGURATA**
- Usa **googleapis** con Service Account
- **Autenticazione sicura** senza endpoint esposti
- **Controllo permessi granulare**
- **Perfetto per production**

---

## 🚀 **STEP 1: GOOGLE CLOUD CONSOLE (3 minuti)**

### A) Crea/Accedi a Google Cloud Console
👉 **https://console.cloud.google.com**

### B) Crea un nuovo progetto (se necessario)
1. Clicca **"Seleziona progetto"** in alto
2. **"Nuovo progetto"**
3. Nome: **"BLUM Questionario"**
4. **"Crea"**

### C) Abilita Google Sheets API
1. Nel menu laterale: **"API e servizi"** → **"Libreria"**
2. Cerca: **"Google Sheets API"**
3. Clicca su **Google Sheets API** → **"Abilita"**

---

## 🤖 **STEP 2: CREA SERVICE ACCOUNT (2 minuti)**

### A) Vai ai Service Account
1. Menu laterale: **"IAM e amministrazione"** → **"Account di servizio"**
2. **"Crea account di servizio"**

### B) Configura Service Account
- **Nome account**: `blum-questionario-service`
- **ID account**: `blum-questionario-service` (auto-generato)
- **Descrizione**: `Service account per salvare dati questionario BLUM`
- **"Crea e continua"**

### C) Permessi (opzionale per questo caso)
- **Salta** → **"Continua"** → **"Fine"**

---

## 🗝️ **STEP 3: GENERA CHIAVE JSON (1 minuto)**

### A) Crea chiave privata
1. Clicca sul **service account** appena creato
2. Tab **"Chiavi"** → **"Aggiungi chiave"** → **"Crea nuova chiave"**
3. Tipo: **"JSON"** → **"Crea"**
4. **Scarica il file JSON** → **CONSERVALO AL SICURO!**

### B) Il file JSON contiene:
```json
{
  "type": "service_account",
  "project_id": "your-project-123456",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "blum-questionario-service@your-project.iam.gserviceaccount.com",
  "client_id": "123456789...",
  ...
}
```

---

## 📊 **STEP 4: CONFIGURA GOOGLE SHEETS (2 minuti)**

### A) Apri il tuo Google Sheets
👉 **https://docs.google.com/spreadsheets/d/1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU/edit**

### B) Aggiungi gli header nella RIGA 1
Copia e incolla da A1 a U1:
```
Timestamp	Email	Telefono	Età	Alimentazione	Esercizio	Sonno	Stress	Fumo	Alcol	Tipo Pelle	Problematiche	Routine	Prodotti	Obiettivi	Timeline	Info Extra	Condizioni	Farmaci	Allergie	Protocollo
```

### C) Condividi con Service Account ⚠️ **FONDAMENTALE**
1. **"Condividi"** (pulsante in alto a destra)
2. **Aggiungi email**: `blum-questionario-service@your-project.iam.gserviceaccount.com`
   *(sostituisci con l'email dal tuo JSON)*
3. **Ruolo**: **"Editor"**
4. **Deseleziona** "Notifica persone" 
5. **"Invia"**

---

## ⚙️ **STEP 5: CONFIGURA VARIABILI AMBIENTE (2 minuti)**

### A) Crea file `.env.local` nella root del progetto
```bash
# Copia dal tuo file JSON scaricato
GOOGLE_PROJECT_ID=your-project-123456
GOOGLE_PRIVATE_KEY_ID=abc123def456...
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQ...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=blum-questionario-service@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=123456789012345678901
GOOGLE_SHEET_ID=1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU
```

### B) ⚠️ **IMPORTANTE - Private Key**
Il `GOOGLE_PRIVATE_KEY` deve:
- Essere tra **virgolette doppie**
- Includere **\n** per le interruzioni di riga
- Iniziare con `"-----BEGIN PRIVATE KEY-----\n`
- Finire con `\n-----END PRIVATE KEY-----\n"`

### C) ⚠️ **SICUREZZA**
- **MAI** committare `.env.local` su Git
- Il file è già in `.gitignore`
- **MAI** condividere le credenziali del service account

---

## 🧪 **STEP 6: TEST COMPLETO**

### A) Avvia in locale
```bash
npm run dev
```

### B) Test questionario
1. Vai su **http://localhost:3000**
2. **Compila un questionario di test** con dati fittizi
3. **Scarica il PDF**
4. **Controlla il Google Sheets** → dovrebbe apparire una nuova riga

### C) Debug (se non funziona)
1. **Console del browser** (F12) → cerca errori
2. **Console Node.js** → guarda i log dettagliati
3. **Verifica permessi** del Google Sheets
4. **Controlla variabili ambiente** in `.env.local`

---

## 🎉 **VANTAGGI SERVICE ACCOUNT**

✅ **Sicurezza massima** - Nessun endpoint esposto pubblicamente  
✅ **Controllo permessi** - Solo il service account può scrivere  
✅ **Scalabilità** - Perfetto per produzione e alte performance  
✅ **Monitoring** - Log dettagliati in Google Cloud Console  
✅ **Rate limits alti** - Quota molto generosa di Google Sheets API  
✅ **Backup automatico** - Fallback localStorage integrato  

---

## 🛠️ **DEPLOY SU VERCEL**

### A) Configura variabili ambiente Vercel
1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. **Aggiungi tutte le variabili** da `.env.local`:
   - `GOOGLE_PROJECT_ID`
   - `GOOGLE_PRIVATE_KEY_ID`  
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_SHEET_ID`
3. **Deploy** automatico

---

## 🆘 **RISOLUZIONE PROBLEMI COMUNI**

### "Error: invalid_grant"
- **Causa**: Private key malformattata
- **Soluzione**: Verifica che `GOOGLE_PRIVATE_KEY` abbia `\n` e virgolette corrette

### "Error: Forbidden"
- **Causa**: Service account non ha accesso al Google Sheets
- **Soluzione**: Ri-condividi il Google Sheets con email del service account

### "Error: API not enabled"
- **Causa**: Google Sheets API non abilitata
- **Soluzione**: Vai su Google Cloud Console → Libreria → Abilita Google Sheets API

### "Error: Sheet not found"
- **Causa**: ID Google Sheets sbagliato
- **Soluzione**: Verifica `GOOGLE_SHEET_ID` nell'URL del tuo foglio

---

## 📋 **CHECKLIST FINALE**

- [ ] ✅ Progetto Google Cloud creato
- [ ] ✅ Google Sheets API abilitata  
- [ ] ✅ Service Account creato
- [ ] ✅ File JSON scaricato e al sicuro
- [ ] ✅ Google Sheets condiviso con service account
- [ ] ✅ Header aggiunti al Google Sheets (riga 1)
- [ ] ✅ File `.env.local` configurato
- [ ] ✅ Test locale funzionante
- [ ] ✅ Deploy Vercel con variabili ambiente

**🎯 Risultato**: Ogni questionario compilato apparirà automaticamente nel tuo Google Sheets con massima sicurezza!

---

**Hai bisogno di aiuto con qualche step? Dimmi dove ti sei bloccato!** 🚀
