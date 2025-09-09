# 📊 Configurazione Google Sheets per BLUM Questionario

## 🎯 Obiettivo
Ogni volta che un cliente compila il questionario, i dati vengono automaticamente salvati nel Google Sheets che hai fornito:
**[https://docs.google.com/spreadsheets/d/1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU/edit?usp=sharing)**

## 📋 Struttura delle Colonne 
Ogni questionario occuperà **una sola riga** con queste colonne:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Email | Telefono | Età | Alimentazione | Esercizio | Sonno | Stress | Fumo | Alcol | Tipo Pelle | Problematiche | Routine | Prodotti | Obiettivi | Timeline | Info Extra | Condizioni | Farmaci | Allergie | Protocollo |

## 🔧 Metodo 1: Google Apps Script (CONSIGLIATO)

### Passo 1: Crea il Header nel Foglio
1. Apri il [Google Sheets](https://docs.google.com/spreadsheets/d/1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU/edit)
2. Nella **riga 1**, inserisci i header:
   ```
   A1: Timestamp
   B1: Email  
   C1: Telefono
   D1: Età
   E1: Alimentazione
   F1: Esercizio
   G1: Sonno
   H1: Stress
   I1: Fumo
   J1: Alcol
   K1: Tipo Pelle
   L1: Problematiche
   M1: Routine
   N1: Prodotti
   O1: Obiettivi
   P1: Timeline
   Q1: Info Extra
   R1: Condizioni
   S1: Farmaci
   T1: Allergie
   U1: Protocollo
   ```

### Passo 2: Crea Google Apps Script
1. Nel Google Sheets, vai su **Estensioni** → **Apps Script**
2. Sostituisci tutto il codice con:

```javascript
function doPost(e) {
  try {
    // Ottieni il foglio
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dei dati ricevuti
    const data = JSON.parse(e.postData.contents);
    
    // Crea la riga di dati
    const rowData = [
      data.timestamp,
      data.email,
      data.telefono, 
      data.age,
      data.diet,
      data.exercise,
      data.sleep,
      data.stress,
      data.smoking,
      data.alcohol,
      data.skinType,
      data.concerns,
      data.routine,
      data.products,
      data.goals,
      data.timeline,
      data.additionalInfo,
      data.conditions,
      data.medications,
      data.allergies,
      data.selectedProtocol
    ];
    
    // Aggiungi la riga
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, row: sheet.getLastRow()}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Passo 3: Pubblica come Web App
1. Clicca **"Implementa"** → **"Nuova implementazione"**
2. Tipo: **"App web"**
3. Descrizione: **"BLUM Questionario API"**
4. Esegui come: **"Me"**
5. Accesso: **"Chiunque"**
6. Clicca **"Implementa"**
7. **COPIA L'URL** che appare (es: `https://script.google.com/macros/s/ABC123.../exec`)

### Passo 4: Aggiorna il Codice Next.js
Nel file `/src/app/api/save-questionnaire/route.ts`, sostituisci `TODO:` con:

```typescript
// Sostituisci con il tuo URL di Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/IL_TUO_ID_SCRIPT/exec';

const response = await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formattedData)
});

const result = await response.json();
if (!result.success) {
  throw new Error('Errore Google Sheets: ' + result.error);
}
```

## 🎉 Test e Verifica

1. **Compila un questionario di test** sul sito
2. **Verifica nel Google Sheets** che appaia una nuova riga
3. **Controlla la console** del browser per eventuali errori

## 🔒 Sicurezza e Privacy

- ✅ I dati sono salvati nel TUO Google Sheets
- ✅ Solo tu hai accesso ai dati
- ✅ Backup automatico in localStorage del browser
- ✅ Log completi nella console per debugging

## 📞 Supporto

Se hai problemi:
1. Controlla la **Console del Browser** (F12)
2. Verifica che il **Google Apps Script** sia pubblicato correttamente
3. Assicurati che il **Google Sheets** sia accessibile

---

**🎯 Risultato finale**: Ogni cliente che compila il questionario vedrà automaticamente i suoi dati aggiunti al tuo Google Sheets, con possibilità di scaricare il PDF personalizzato!
