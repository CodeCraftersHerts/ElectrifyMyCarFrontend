/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        standardBlue1: '#2B295D',
        standardBlueLight: '#4C4AA5',        // Lighter version for navbar background
        standardTertiary: '#FF6F61', 
      }
    },
  },
  plugins: [],
}

