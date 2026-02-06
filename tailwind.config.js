/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0e27',
        'bg-secondary': '#1a1f3a',
        'gold': '#d4af37',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
      },
    },
  },
  plugins: [],
}