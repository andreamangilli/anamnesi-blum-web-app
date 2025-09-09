# 🚨 RISOLUZIONE ERRORE "Internal Server Error"

## 🎯 **CAUSA PRINCIPALE**
L'errore è causato dalla **mancanza del file `.env.local`** con le credenziali del Google Service Account.

---

## 🔧 **SOLUZIONE RAPIDA**

### **STEP 1: Crea il file .env.local** (1 minuto)

Nella **root del progetto** (`/Users/andrea/Desktop/BLUM_Questionario/`), crea un file chiamato `.env.local` con questo contenuto:

```bash
# Google Service Account Configuration
# ⚠️ SOSTITUISCI CON LE TUE CREDENZIALI REALI
GOOGLE_PROJECT_ID=your-project-id-here
GOOGLE_PRIVATE_KEY_ID=your-private-key-id-here
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-here\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_SHEET_ID=1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU
```

### **STEP 2: Configurazione Google Service Account**

Se **NON hai ancora** creato il Service Account:

1. **Google Cloud Console**: https://console.cloud.google.com
2. **Crea progetto** → **Abilita Google Sheets API**
3. **Service Account** → **Scarica JSON**
4. **Copia credenziali** dal JSON nel file `.env.local`
5. **Condividi Google Sheets** con email service account

📋 **Guida completa**: `SETUP_SERVICE_ACCOUNT.md`

### **STEP 3: Test immediato** (30 secondi)

```bash
# Riavvia il server
npm run dev

# Prova il questionario
# Ora dovrebbe funzionare!
```

---

## 🛠️ **MODALITÀ SVILUPPO (TEMPORANEA)**

Se vuoi **testare subito** senza configurare Google Sheets, posso creare una modalità "solo localStorage":

### **Opzione A: Solo localStorage** 
- I dati vengono salvati nel browser
- Nessuna configurazione Google
- Perfetto per test rapidi

### **Opzione B: Mock API**
- Simula il salvataggio su Google Sheets  
- Log completi nella console
- Per sviluppo e debug

**Quale preferisci?**

---

## 🔍 **DIAGNOSI ERRORI COMUNI**

L'API ora ti darà **errori specifici**:

| Errore | Causa | Soluzione |
|--------|-------|-----------|
| 🔐 **invalid_grant** | Private key malformattata | Verifica `GOOGLE_PRIVATE_KEY` |
| 🚫 **Forbidden** | Service account no accesso | Condividi Google Sheets |
| 📄 **not found** | Sheet ID sbagliato | Verifica `GOOGLE_SHEET_ID` |
| ⚙️ **not configured** | File .env.local mancante | Crea file .env.local |

---

## 🎯 **PROSSIMI STEP**

1. **Crea `.env.local`** (anche con placeholder)
2. **Riavvia server** (`npm run dev`)
3. **Testa questionario** → Errore più specifico
4. **Configura Service Account** seguendo la guida
5. **Test finale** → Tutto funzionante!

**Dimmi se vuoi che ti aiuti con uno step specifico!** 🚀
