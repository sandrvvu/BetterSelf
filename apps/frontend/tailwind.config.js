/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        gravitas: ["var(--font-gravitas-one)"]
      }
    },
  },
  plugins: [],
}

