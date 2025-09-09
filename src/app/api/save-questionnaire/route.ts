import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Controlla se le credenziali sono configurate
    if (!process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL.includes('your-project')) {
      console.error('❌ Google Service Account non configurato!');
      return NextResponse.json({
        success: false,
        error: 'Google Service Account non configurato. Configura il file .env.local con le tue credenziali.'
      }, { status: 500 });
    }
    
    // Configurazione Service Account
    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`
    };

    // ID del Google Sheets
    const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU';

    console.log('📊 Salvando dati in Google Sheets con Service Account...');

    // Autenticazione con Service Account
    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Inizializza Google Sheets API
    const sheets = google.sheets({ version: 'v4', auth });

    // Prepara i dati per la riga (ordine delle colonne COMPLETO)
    const rowValues = [
      data.timestamp || new Date().toISOString(),
      data.nome || '',
      data.cognome || '',
      data.email || '',
      data.telefono || '',
      data.consensoTrattamentoDati || '',
      data.consensoMarketing || '',
      data.consensoFoto || '',
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

    // Aggiungi i dati al Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'A:Y', // Range delle colonne A-Y (25 colonne totali)
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });

    console.log('✅ Dati salvati con successo:', response.data);

    return NextResponse.json({
      success: true,
      message: 'Dati salvati con successo in Google Sheets!',
      updatedRows: response.data.updates?.updatedRows || 1,
      updatedRange: response.data.updates?.updatedRange
    });

  } catch (error) {
    console.error('❌ Errore nel salvataggio Google Sheets:', error);
    
    // Log dettagliato per debugging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Errori comuni e soluzioni
      if (error.message.includes('invalid_grant')) {
        return NextResponse.json({
          success: false,
          error: '🔐 Credenziali Service Account non valide. Controlla GOOGLE_PRIVATE_KEY nel file .env.local'
        }, { status: 500 });
      }
      
      if (error.message.includes('Forbidden') || error.message.includes('forbidden')) {
        return NextResponse.json({
          success: false,
          error: '🚫 Service Account non ha accesso al Google Sheets. Condividi il foglio con l\'email del service account.'
        }, { status: 403 });
      }
      
      if (error.message.includes('not found')) {
        return NextResponse.json({
          success: false,
          error: '📄 Google Sheets non trovato. Verifica GOOGLE_SHEET_ID nel file .env.local'
        }, { status: 404 });
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Errore nel salvataggio: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
