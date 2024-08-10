/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grayBG: "#F0F0F0",
        blackBG: "#252525"
      }
    },
  },
  plugins: [],
}