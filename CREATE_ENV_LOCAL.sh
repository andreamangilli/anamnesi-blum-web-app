#!/bin/bash

# Script per creare il file .env.local corretto
echo "🔧 Creazione file .env.local per BLUM Questionario..."

# Crea il file .env.local
cat > .env.local << 'EOF'
# Google Service Account Configuration per BLUM
# ⚠️ SOSTITUISCI CON LE TUE CREDENZIALI REALI DAL FILE JSON

GOOGLE_PROJECT_ID=your-project-id-here
GOOGLE_PRIVATE_KEY_ID=your-private-key-id-here
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-content-here\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_SHEET_ID=1ak8_S-_gF7_mk6nPTqsexEyDwI8ttmTvaSAJfhU24bU
EOF

echo "✅ File .env.local creato!"
echo "📝 Ora modifica il file con le tue credenziali reali dal Google Service Account JSON"
echo ""
echo "🎯 Prossimi step:"
echo "1. Modifica .env.local con le tue credenziali"
echo "2. npm run dev"
echo "3. Testa il questionario"
