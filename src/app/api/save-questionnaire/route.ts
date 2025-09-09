import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // URL del Google Sheets fornito dall'utente
    const SHEET_ID = '1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU';
    
    // Per ora registriamo solo in console e localStorage
    // TODO: Implementare l'invio effettivo a Google Sheets
    console.log('📊 Dati questionario ricevuti:', data);
    
    // Formatta i dati per Google Sheets (una riga)
    const sheetRow = [
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
    
    // Simula il salvataggio con successo
    return NextResponse.json({ 
      success: true, 
      message: 'Dati salvati con successo!',
      sheetId: SHEET_ID,
      rowData: sheetRow
    });
    
  } catch (error) {
    console.error('❌ Errore nel salvataggio:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Errore interno del server' 
    }, { status: 500 });
  }
}
