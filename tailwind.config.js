/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salbei: '#8A9A5B',
        beige: '#F5F5DC',
        anthrazit: '#333333',
      }
    },
  },
  plugins: [],
}