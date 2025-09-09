import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
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

    // Prepara i dati per la riga (ordine delle colonne)
    const rowValues = [
      data.timestamp || new Date().toISOString(),
      data.email || '',
      data.telefono || '',
      data.age || '',
      data.diet || '',
      data.exercise?.toString() || '',
      data.sleep?.toString() || '',
      data.stress?.toString() || '',
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
      range: 'A:U', // Range delle colonne A-U
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
    }

    return NextResponse.json({
      success: false,
      error: 'Errore nel salvataggio: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
