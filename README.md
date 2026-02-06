# 🎬 CineLog - React SPA with Routing

A modern Single Page Application (SPA) for discovering movies and TV series, built with React, TypeScript, and React Router.

**Built by:** Amir Hemmatnia 
**Course:** JavaScript 2 (30 YHP)  
**Project Type:** Examination B - React SPA with Routing

---
## 📑 Table of Contents

- [Examination Requirements Met](#-examination-requirements-met)
  - [A. SPA + Routing](#-a-spa--routing-react-router)
  - [B. Component Structure + Props](#-b-component-structure--props)
  - [C. State + Interactivity](#-c-state--interactivity-usestate)
  - [D. Additional Features](#-d-additional-features)
- [Getting Started](#-getting-started)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Code Notes](#-code-notes)

---
## 📚 Examination Requirements Met

This project fulfills **all requirements** for JavaScript 2 Examination B:

### ✅ A. SPA + Routing (React Router)

**Client-side routing** - Navigation happens via JavaScript without page reloads  
**Dynamic routes** - Individual movie pages using URL parameters (`/movie/:id`)  
**URL updates** - Search state saved in URL (`/?q=Avatar&type=movie&sort=year-desc`)  
**404 handling** - Graceful handling of undefined routes

### ✅ B. Component Structure + Props

**Reusable components** - MovieCard used in 3 different pages  
**Props flow** - Data flows from parent to child components  
**Component hierarchy** - Organized folder structure (pages, components, services, hooks)  
**Separation of concerns** - Each component has a single responsibility

### ✅ C. State + Interactivity (useState)

**Multiple state variables** - Loading, errors, movies, filters, favorites  
**Event handling** - Search, filter, sort, favorite toggle  
**Re-rendering** - UI updates when state changes  
**Persistent state** - Favorites saved to localStorage

### ✅ D. Additional Features

**Custom hooks** - useFavorites for localStorage management  
**TypeScript** - Full type safety with interfaces  
**API integration** - OMDB API for movie data  
**Responsive design** - Works on mobile, tablet, desktop  
**SEO** - Dynamic meta tags with React Helmet

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev          # Starts at http://localhost:5173/
```

### Production
```bash
npm run build        # Creates /dist folder
npm run preview      # Preview at http://localhost:4173/
```

### Code Quality
```bash
npm run lint         # Check for errors
```

---

## ✨ Features

✅ Search movies & series  
✅ Filter by type (all, movies, series, games)  
✅ Sort by year, rating, or name  
✅ Movie details with backdrop, plot, cast  
✅ Save & manage favorites  
✅ Responsive design  
✅ Error handling  
✅ Loading states  
✅ 404 page handling  

---

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, React Router v6  
**Styling:** Tailwind CSS, Framer Motion  
**Build:** Vite, esbuild  
**API:** OMDB Movie Database  
**Icons:** Lucide React  

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Full-page components
├── services/        # API integration
├── hooks/           # Custom React hooks
├── App.tsx          # Route configuration
├── types.ts         # TypeScript definitions
└── index.tsx        # Entry point
```

---


This version includes line-by-line comments explaining:
- How React hooks work
- Why components are structured this way
- API integration patterns
- State management concepts

---

**Course:** JavaScript 2, 30 YHP  
**Status:** ✅ Complete
