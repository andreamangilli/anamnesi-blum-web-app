# BLUM Questionario

Una web app moderna costruita con Next.js, TypeScript e Tailwind CSS.

## Tecnologie Utilizzate

- **Next.js 14** - Framework React per applicazioni web
- **TypeScript** - Linguaggio tipizzato basato su JavaScript
- **Tailwind CSS** - Framework CSS utility-first
- **ESLint** - Linting per JavaScript e TypeScript

## Iniziare

### Installazione delle dipendenze

```bash
npm install
```

### Avvio del server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel tuo browser per vedere il risultato.

### Altri Script Disponibili

- `npm run build` - Costruisce l'applicazione per la produzione
- `npm run start` - Avvia l'applicazione in modalità produzione
- `npm run lint` - Esegue ESLint per controllare il codice

## Struttura del Progetto

```
src/
  app/
    globals.css    # Stili globali e configurazione Tailwind
    layout.tsx     # Layout principale dell'applicazione
    page.tsx       # Homepage
```

## Configurazione

- `next.config.js` - Configurazione Next.js
- `tailwind.config.js` - Configurazione Tailwind CSS
- `tsconfig.json` - Configurazione TypeScript
- `postcss.config.js` - Configurazione PostCSS per Tailwind

Puoi iniziare modificando `src/app/page.tsx`. La pagina si aggiorna automaticamente quando modifichi il file.
