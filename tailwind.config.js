/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] 
      },
      colors:{
        'flame': '#EB5E28',
        'red': colors.red,
        'mustard': '#FFD275',
        'yellow': colors.yellow,
        'bud-green': "#6DA34D",
        'green': colors.green,
        'indigo': colors.indigo,
        'white': "#ffffff",
        'teal': '#91ffe9',
        'slate': colors.slate,
        'gray': colors.gray,
        'zinc': colors.zinc,
      },
    },
  },
  plugins: [],
}
