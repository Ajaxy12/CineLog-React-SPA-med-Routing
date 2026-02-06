
# CineLog - Film Katalog SPA 🎬

Ett modernt filmbibliotek byggt med React och TypeScript för kursen JavaScript 2.

## Beskrivning
CineLog är en Single Page Application (SPA) där användare kan söka efter filmer, serier och spel, se detaljerad information och spara sina favoriter. Applikationen använder OMDB API för data och har ett mörkt, biografliknande tema.

## Installation & Start

1. Klona repot
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Starta utvecklingsservern:
   ```bash
   npm run dev
   ```

## Kravuppfyllnad (Checklista)

### G-krav (Godkänt)
- [x] **SPA + Routing**: Använder React Router med 3 routes (`/`, `/movie/:id`, `/favorites`).
- [x] **Komponentstruktur**: Uppdelad i återanvändbara komponenter (MovieCard, SearchBar, etc.) med props.
- [x] **State + Interaktivitet**: `useState` används för sökning, filter och favoriter.
- [x] **Data + API**: Hämtar data från OMDB API med `useEffect` och `fetch`. Hanterar loading/error states.
- [x] **README**: Innehåller beskrivning och instruktioner.

### VG-krav (Väl Godkänt)
- [x] **Struktur**: Tydlig uppdelning i `pages/`, `components/`, `services/`, `hooks/`.
- [x] **useParams**: Detaljvyn använder URL-parametern ID för att hämta rätt film.
- [x] **Extra UI**: Sortering (år/titel) och filtrering (film/serie/spel).
- [x] **Favorites**: Funktion för att spara favoriter lokalt (localStorage).
- [x] **Reflektion**: Se nedan.

---

## Tekniska val - Reflektion

### Filstruktur & Arkitektur
Jag valde en funktionsbaserad struktur (`pages`, `components`, `services`, `hooks`) för att separera ansvar tydligt.
- **Pages**: Håller sid-specifik logik och layout.
- **Components**: Dumma UI-komponenter som tar emot data via props (t.ex. `MovieCard`).
- **Services**: Isolerar API-anrop (`movieApi.ts`) så att komponenterna slipper veta URL:er eller API-nycklar.
- **Hooks**: `useFavorites` extraherades till en custom hook för att separera affärslogik (localStorage-hantering) från UI.

### Routing & Navigation
React Router används för att skapa en äkta SPA-känsla. En `Layout`-komponent med `<Outlet />` används för att hålla navigationsmenyn konstant medan innehållet byts ut. Detta minskar kodupprepning och ger en stabil användarupplevelse.

### State Management
Jag valde att använda lokal state (`useState`) för det mesta eftersom appen är relativt liten.
- **Sök/Filter**: Ligger i `HomePage` och skickas ner som props.
- **Favoriter**: Eftersom favoriter behövs på flera ställen (kortet, detaljvyn, favoritsidan) skapade jag en custom hook `useFavorites` som synkar med `localStorage`. Detta fungerar som en enkel "global store" utan behov av Redux eller Context för denna skala.

### API & Data
OMDB API valdes för att det är enkelt och ger bra data (poster, år, handling). Jag implementerade felhantering (try/catch) och loading-states för att ge användaren feedback om nätverket är långsamt eller om en film inte hittas.

### Design & UX
Jag satsade på ett "Cinema"-tema (mörkt/guld) för att matcha innehållet. Framer Motion används för att ge appen en polerad känsla med mjuka övergångar och hover-effekter, vilket höjer upplevelsen från en enkel skoluppgift till en mer professionell produkt.
