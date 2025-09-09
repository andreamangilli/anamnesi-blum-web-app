# 🚀 SETUP COMPLETO GOOGLE SHEETS - API PRONTE

## ✅ API NEXT.JS GIÀ CONFIGURATA
- `/api/save-questionnaire` già pronta
- Gestione errori completa  
- Logging per debugging
- Variabile ambiente per URL sicuro

---

## 📋 STEP 1: CONFIGURA GOOGLE SHEETS (2 minuti)

### A) Apri il tuo Google Sheets
👉 https://docs.google.com/spreadsheets/d/1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU/edit

### B) Aggiungi gli header nella RIGA 1:
Copia questa riga e incollala da A1 a U1:

```
Timestamp	Email	Telefono	Età	Alimentazione	Esercizio	Sonno	Stress	Fumo	Alcol	Tipo Pelle	Problematiche	Routine	Prodotti	Obiettivi	Timeline	Info Extra	Condizioni	Farmaci	Allergie	Protocollo
```

---

## 🔧 STEP 2: CREA GOOGLE APPS SCRIPT (3 minuti)

### A) Apri Apps Script
Nel Google Sheets: **Estensioni** → **Apps Script**

### B) Sostituisci tutto il codice con questo:

```javascript
function doPost(e) {
  try {
    // Log per debugging
    console.log('Ricevuta richiesta POST:', e);
    
    // Ottieni il foglio di lavoro
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dei dati JSON
    const data = JSON.parse(e.postData.contents);
    console.log('Dati parsed:', data);
    
    // Crea array con i dati nell'ordine delle colonne
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.email || '',
      data.telefono || '', 
      data.age || '',
      data.diet || '',
      data.exercise || '',
      data.sleep || '',
      data.stress || '',
      data.smoking || '',
      data.alcohol || '',
      data.skinType || '',
      data.concerns || '',
      data.routine || '',
      data.products || '',
      data.goals || '',
      data.timeline || '',
      data.additionalInfo || '',
      data.conditions || '',
      data.medications || '',
      data.allergies || '',
      data.selectedProtocol || ''
    ];
    
    // Aggiungi la riga al foglio
    sheet.appendRow(rowData);
    
    // Log di successo
    const lastRow = sheet.getLastRow();
    console.log('Dati salvati nella riga:', lastRow);
    
    // Risposta di successo
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        message: 'Dati salvati con successo!',
        row: lastRow,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log dell'errore
    console.error('Errore nel salvataggio:', error);
    
    // Risposta di errore
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Funzione di test (opzionale)
function testFunction() {
  const testData = {
    timestamp: new Date().toISOString(),
    email: 'test@example.com',
    selectedProtocol: 'test-protocol'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}
```

### C) Salva il progetto
- **Salva** (Ctrl+S)
- Nome progetto: "BLUM Questionario API"

---

## 🌐 STEP 3: PUBBLICA COME WEB APP (1 minuto)

### A) Deployment
1. Clicca **"Implementa"** → **"Nuova implementazione"**
2. **Tipo**: Seleziona ⚙️ "App web"
3. **Descrizione**: "BLUM Questionario Data Collector"

### B) Configurazione Accesso ⚠️ IMPORTANTE
- **Esegui come**: **"Me (tu@email.com)"**  
- **Accesso**: **"Chiunque"** ← FONDAMENTALE per ricevere dati

### C) Autorizzazioni
1. **Implementa**  
2. Ti chiederà di **autorizzare** → **Esamina autorizzazioni**
3. **Avanzate** → **Vai a BLUM Questionario API (non sicuro)**  
4. **Consenti** ← Normale per le tue app

### D) Copia l'URL 📋
Ti darà un URL tipo:
```
https://script.google.com/macros/s/AKfycbw123ABC456.../exec
```
**COPIA QUESTO URL!**

---

## 🔗 STEP 4: COLLEGA L'URL ALL'APP (30 secondi)

### A) Aggiorna il file .env.local
Nel file `.env.local`, sostituisci:
```
GOOGLE_SCRIPT_URL=IL_TUO_URL_COPIATO
```

### B) Esempio:
```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbw123ABC456.../exec
```

---

## 🧪 STEP 5: TEST COMPLETO

### A) Test dal locale
```bash
npm run dev
```

### B) Compila un questionario di test
- Inserisci dati fittizi
- Scarica PDF
- Controlla se appare una riga nel Google Sheets

### C) Debug (se non funziona)
1. **Console Browser** (F12) → Cerca errori
2. **Google Apps Script** → **Esecuzioni** → Vedi i log
3. **Verifica URL** in .env.local

---

## 🎉 RISULTATO FINALE

✅ **Questionario compilato** → **Riga automatica in Google Sheets**  
✅ **PDF scaricabile** per ogni cliente  
✅ **21 colonne organizzate** con tutti i dati  
✅ **Backup automatico** in localStorage  
✅ **Log completi** per monitoraggio  

---

## 🆘 RISOLUZIONE PROBLEMI

### Problema: "Accesso negato"
- **Soluzione**: Verifica che "Accesso" sia su "Chiunque"

### Problema: "Nessuna riga aggiunta"  
- **Soluzione**: Controlla i log in Apps Script → Esecuzioni

### Problema: "Errore 404"
- **Soluzione**: Verifica l'URL in .env.local

### Problema: "CORS Error"
- **Soluzione**: Google Apps Script gestisce CORS automaticamente se ben configurato

---

**Dimmi quando hai l'URL e lo aggiorno subito nell'app!** 🚀
