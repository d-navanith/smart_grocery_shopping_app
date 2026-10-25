/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF632B',
          orangeHover: '#e0521d',
          mint: '#78F9B8',
          emerald: '#044F41',
          emeraldDark: '#033b31',
          charcoal: '#2F2F2F',
          darkBg: '#0D0D0D',
          darkCard: '#1C1C1E',
          darkBorder: '#2C2C2E',
        }
      }
    },
  },
  plugins: [],
}
