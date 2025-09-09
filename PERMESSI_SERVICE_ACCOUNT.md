# 🔐 CONFIGURAZIONE PERMESSI SERVICE ACCOUNT

## ⚠️ STEP FONDAMENTALE - CONDIVISIONE GOOGLE SHEETS

### 1. DOPO AVER CREATO IL SERVICE ACCOUNT
Quando crei il service account otterrai un **email** tipo:
```
blum-questionario-service@tuo-progetto-123456.iam.gserviceaccount.com
```

### 2. CONDIVIDI IL GOOGLE SHEETS
1. **Apri il Google Sheets**: 
   https://docs.google.com/spreadsheets/d/1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU/edit

2. **Clicca "Condividi"** (pulsante blu in alto a destra)

3. **Aggiungi l'email del service account**:
   - Incolla: `blum-questionario-service@tuo-progetto.iam.gserviceaccount.com`
   - **Ruolo**: "Editor" (può leggere e scrivere)
   - **DESELEZIONA** "Notifica persone" 
   - Clicca **"Invia"**

### 3. VERIFICA PERMESSI
Il service account ora può:
- ✅ Leggere il foglio
- ✅ Aggiungere righe  
- ✅ Scrivere dati
- ❌ Non può eliminare il foglio (sicurezza)

## 🧪 TEST PERMESSI

### Metodo 1: API Test
Dopo aver configurato tutto, testa con:
```bash
npm run dev
# Compila un questionario di test
# Controlla se appare una riga nel Google Sheets
```

### Metodo 2: Console Log
Controlla i log in Next.js:
```
✅ Salvando dati in Google Sheets con Service Account...  
✅ Dati salvati con successo: {updatedRows: 1}
```

### Metodo 3: Google Cloud Console  
1. Vai su **Google Cloud Console**
2. **IAM e amministrazione** → **Account di servizio** 
3. Clicca sul tuo service account
4. **Verifica** che sia attivo e abbia le autorizzazioni

## 🆘 RISOLUZIONE PROBLEMI

### Errore: "Forbidden" o "Access denied"
- **Causa**: Service account non ha accesso al Google Sheets
- **Soluzione**: Ri-condividi il Google Sheets con l'email corretta del service account

### Errore: "Sheet not found"
- **Causa**: ID Google Sheets sbagliato
- **Soluzione**: Verifica che `GOOGLE_SHEET_ID` sia: `1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU`

### Errore: "Invalid credentials"
- **Causa**: File JSON service account malformattato
- **Soluzione**: Ri-scarica il file JSON e ricopia le credenziali in `.env.local`
