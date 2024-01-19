/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mulish: [ ' "Mulish"'],
        comfortaa: [ ' "Comfortaa" '],
        museoModerno: [' "MuseoModerno" '],
      }, 
      colors: {
        lightestGreen: '#CAD2C5',
        lightGreen: '#84A98C',
        middleGreen: '#52796F',
        darkGreen: '#354F52',
        veryDarkGreen: '#2F3E46'
      },
    },
   
  },
  plugins: [],
}