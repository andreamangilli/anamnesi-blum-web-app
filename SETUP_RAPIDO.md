# 🚀 SETUP GOOGLE SHEETS - 3 MINUTI

## ⚡ PASSO 1: Header nel Google Sheets (30 secondi)

1. **Apri**: https://docs.google.com/spreadsheets/d/1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU/edit?usp=sharing

2. **Copia e incolla** questa riga nella riga 1 (da A1 a U1):

```
Timestamp	Email	Telefono	Età	Alimentazione	Esercizio	Sonno	Stress	Fumo	Alcol	Tipo Pelle	Problematiche	Routine	Prodotti	Obiettivi	Timeline	Info Extra	Condizioni	Farmaci	Allergie	Protocollo
```

*Nota: Sono separati da TAB, quindi quando incolli si distribuiranno automaticamente nelle colonne*

## ⚡ PASSO 2: Google Apps Script (1 minuto)

1. **Nel Google Sheets** → **Estensioni** → **Apps Script**
2. **Cancella tutto** il codice esistente
3. **Copia e incolla** questo codice:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
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

4. **Salva** (Ctrl+S)

## ⚡ PASSO 3: Pubblica (1 minuto)

1. **Clicca** "Implementa" → "Nuova implementazione"
2. **Tipo**: "App web"
3. **Descrizione**: "BLUM API"
4. **Esegui come**: "Me" 
5. **Accesso**: "Chiunque"
6. **Implementa**
7. **COPIA L'URL** che appare (tipo: `https://script.google.com/macros/s/ABC123.../exec`)

## ⚡ PASSO 4: Incolla URL nel Codice (30 secondi)

**DIMMI L'URL** che hai copiato e io aggiorno il codice per te!

---

## 🎯 FATTO! 

Appena finiti questi passi:
- ✅ Ogni questionario compilato apparirà automaticamente nel tuo Google Sheets
- ✅ PDF scaricabile per ogni cliente  
- ✅ Tutto organizzato e pronto

**Vuoi che ti faccia il passo 4 appena mi dai l'URL?**
