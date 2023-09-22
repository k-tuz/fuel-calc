/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elems: '#0D1821',
        bg: '#EDEBD7',
        main: '#E3B23C'
      },
    },
  },
  plugins: [
  ],
}

