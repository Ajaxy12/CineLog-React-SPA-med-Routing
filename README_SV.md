# 🎬 CineLog - React SPA med Routing

En modern Single Page Application (SPA) för att upptäcka filmer och TV-serier, byggd med React, TypeScript och React Router.

**Byggt av:** Amir Hemmatnia  
**Kurs:** JavaScript 2 (30 YHP)  
**Projekttyp:** Examination B - React SPA med Routing

---

## 📑 Innehållsförteckning

- [Examinationskrav](#-examinationskrav-uppfyllda)
  - [A. SPA + Routing](#-a-spa--routing-react-router)
  - [B. Komponentstruktur + Props](#-b-komponentstruktur--props)
  - [C. State + Interaktivitet](#-c-state--interaktivitet-usestate)
  - [D. Ytterligare Funktioner](#-d-ytterligare-funktioner)
- [Kom igång](#-kom-igång)
- [Funktioner](#-funktioner)
- [Teknikstack](#-teknikstack)
- [Projektstruktur](#-projektstruktur)
- [Kodanteckningar](#-kodanteckningar)

---

## 📚 Examinationskrav Uppfyllda

Det här projektet uppfyller **alla krav** för JavaScript 2 Examination B:

### ✅ A. SPA + Routing (React Router)

**Routing på klientsidan** - Navigering sker via JavaScript utan sidladdningar  
**Dynamiska rutter** - Individuella filmsidor med URL-parametrar (`/movie/:id`)  
**URL-uppdateringar** - Sökstatus sparad i URL (`/?q=Avatar&type=movie&sort=year-desc`)  
**404-hantering** - Elegant hantering av odefinierade rutter

### ✅ B. Komponentstruktur + Props

**Återanvändbara komponenter** - MovieCard används i 3 olika sidor  
**Props-flöde** - Data flödar från föräldrakomponent till barnkomponent  
**Komponenthierarki** - Organiserad mappstruktur (pages, components, services, hooks)  
**Separation av ansvar** - Varje komponent har ett enda ansvar

### ✅ C. State + Interaktivitet (useState)

**Flera tillståndsvariabler** - Loading, errors, movies, filters, favorites  
**Händelsehantering** - Sök, filtrera, sortera, favorit-toggle  
**Omåterrendering** - UI uppdateras när tillståndet ändras  
**Persistent state** - Favoriter sparade i localStorage

### ✅ D. Ytterligare Funktioner

**Anpassade hooks** - useFavorites för localStorage-hantering  
**TypeScript** - Fullständig typsäkerhet med gränssnitt  
**API-integrering** - OMDB API för filmdata  
**Responsiv design** - Fungerar på mobil, surfplatta, skrivbord  
**SEO** - Dynamiska meta-taggar med React Helmet

---

## 🚀 Kom igång

### Utveckling
```bash
npm install
npm run dev          # Startar på http://localhost:5173/
```

### Produktion
```bash
npm run build        # Skapar /dist-mapp
npm run preview      # Förhandsgranska på http://localhost:4173/
```

### Kodkvalitet
```bash
npm run lint         # Kontrollera fel
```

---

## ✨ Funktioner

✅ Sök efter filmer & serier  
✅ Filtrera efter typ (alla, filmer, serier, spel)  
✅ Sortera efter år, betyg eller namn  
✅ Filmdetaljer med bakgrund, handling, skådespelare  
✅ Spara & hantera favoriter  
✅ Responsiv design  
✅ Felhantering  
✅ Laddningstillstånd  
✅ 404-sidhantering  

---

## 🛠️ Teknikstack

**Frontend:** React 18, TypeScript, React Router v6  
**Styling:** Tailwind CSS, Framer Motion  
**Build:** Vite, esbuild  
**API:** OMDB filmdatabas  
**Ikoner:** Lucide React  

---

## 📂 Projektstruktur

```
src/
├── components/       # Återanvändbara UI-komponenter
├── pages/           # Helsideskomponenter
├── services/        # API-integrering
├── hooks/           # Anpassade React-hooks
├── App.tsx          # Ruttkonfiguration
├── types.ts         # TypeScript-definitioner
└── index.tsx        # Ingångspunkt
```

---

## 🧠 Inlärningsresultat

Det här projektet demonstrerar:

1. **React-grunder**
   - Komponenter och JSX
   - Hooks (useState, useEffect, useContext)
   - Props och dataflöde
   - Omåterrendeningsutlösare

2. **Avancerad React**
   - Anpassade hooks
   - Context API
   - Komponentkomposition
   - Kodåteranvändning

3. **Routing & SPA-arkitektur**
   - Routing på klientsidan
   - Dynamiska rutter med parametrar
   - Navigering utan sidladdningar
   - URL-tillståndshantering

4. **Modernt JavaScript**
   - ES6+ syntax
   - Asynk/vänta API-anrop
   - Arraymetoder (map, filter, find)
   - Destrukturering och spridningsoperator

5. **TypeScript**
   - Typsäkerhet
   - Gränssnitt och typer
   - Generiska typer
   - Typinferens

6. **Webstandarder**
   - Semantisk HTML
   - CSS Flexbox & Grid
   - localStorage API
   - fetch API

---

## 📝 Kodanteckningar

För detaljerad kodkommentarer och förklaringar, se den **kommenterade versionen**:  
`React-SPA-with-Routing - with commnets`

Den versionen innehåller rad-för-rad-kommentarer som förklarar:
- Hur React-hooks fungerar
- Varför komponenter är strukturerade på det här sättet
- API-integreringsmönster
- State management-koncept

---

## ✓ Testkontrollista

- [ ] Sök efter filmer fungerar
- [ ] Filterknapparna uppdaterar resultaten
- [ ] Sorteringsrullgardinen ändrar ordningen
- [ ] Klick på filmkort → visar detaljer
- [ ] **Sidladdning på detaljsidan** → visar fortfarande film (SPA-routing fungerar!)
- [ ] Lägg till i favoriter → hjärtknapp ändrar färg
- [ ] Uppdatera sidan → favoriter finns kvar (localStorage fungerar)
- [ ] Klick på favoritlänk → visar bara favoritfilmer
- [ ] Klick på 404-sida → visar inte funnen-meddelande
- [ ] URL innehåller sökparametrar
- [ ] Fungerar på mobil (prova responsivläge i DevTools)

---

**Kurs:** JavaScript 2, 30 YHP  
**Status:** ✅ Slutförd
