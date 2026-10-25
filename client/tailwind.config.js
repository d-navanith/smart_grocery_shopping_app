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
          orangeHover: '#E0531E',
          mint: '#78F9B8',
          mintLight: '#E8FAF1',
          emerald: '#044F41',
          emeraldDark: '#033B31',
          charcoal: '#2F2F2F',
          darkBg: '#0D0D0D',
          darkCard: '#18181A',
          darkCardHover: '#232326',
          darkBorder: '#28282B',
          darkMuted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
