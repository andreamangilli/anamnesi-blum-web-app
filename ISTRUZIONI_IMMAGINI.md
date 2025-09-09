# 📸 Come Aggiungere le Immagini degli Interni BLUM

## 🎯 Passi per aggiungere le tue immagini:

### 1. **Salva le Immagini**
Salva le due immagini che hai caricato con questi nomi:
- `blum-treatment-room.jpg` (prima immagine - stanza trattamenti)
- `blum-lounge-area.jpg` (seconda immagine - area lounge)

### 2. **Posiziona i File**
Metti entrambe le immagini nella cartella:
```
/Users/andrea/Desktop/BLUM_Questionario/public/images/interiors/
```

### 3. **Aggiorna il Codice**
Sostituisci i placeholder nel file `CompactPersonalDataStep.tsx` con:

```tsx
{/* Trattamento Room */}
<motion.div className="group relative overflow-hidden rounded-2xl shadow-lg">
  <img 
    src="/images/interiors/blum-treatment-room.jpg"
    alt="Sala Trattamenti BLUM"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
    <h4 className="text-white font-light text-lg mb-1">Sala Trattamenti</h4>
    <p className="text-white/90 text-sm font-light">Ambiente rilassante per i tuoi trattamenti personalizzati</p>
  </div>
</motion.div>

{/* Lounge Area */}
<motion.div className="group relative overflow-hidden rounded-2xl shadow-lg">
  <img 
    src="/images/interiors/blum-lounge-area.jpg"
    alt="Area Lounge BLUM"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
    <h4 className="text-white font-light text-lg mb-1">Area Lounge</h4>
    <p className="text-white/90 text-sm font-light">Spazio elegante per il relax pre e post trattamento</p>
  </div>
</motion.div>
```

## ✨ Risultato
Le immagini appariranno elegantemente sotto il pulsante "continua" nella prima pagina del questionario!
