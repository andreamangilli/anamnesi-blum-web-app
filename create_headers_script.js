// SCRIPT PER CREARE AUTOMATICAMENTE GLI HEADER IN GOOGLE SHEETS
// Vai su: https://docs.google.com/spreadsheets/d/1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU/edit
// Premi F12 (Console) → Copia e incolla questo codice → Premi Enter

// Definisce gli header esatti che l'API si aspetta
const headers = [
  'Timestamp',
  'Email', 
  'Telefono',
  'Età',
  'Alimentazione',
  'Esercizio',
  'Sonno', 
  'Stress',
  'Fumo',
  'Alcol',
  'Tipo Pelle',
  'Problematiche',
  'Routine',
  'Prodotti',
  'Obiettivi', 
  'Timeline',
  'Info Extra',
  'Condizioni',
  'Farmaci',
  'Allergie',
  'Protocollo'
];

// Crea gli header nel foglio (solo se sei nel Google Sheets)
try {
  if (window.location.hostname === 'docs.google.com') {
    console.log('🎯 Headers da creare:', headers);
    console.log('📋 Copia questa riga e incollala in A1:');
    console.log(headers.join('\t'));
    alert('Apri la Console (F12) per vedere gli header da copiare!');
  }
} catch (e) {
  console.log('Headers per Google Sheets:', headers);
}
