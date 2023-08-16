/** @type {import('tailwindcss').Config} */
export default {
  future: {
    removeDeprecatedGapUtilities: true
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'movie-pattern': "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), var(--img)" 
      }
    },
  },
  plugins: [],
}

