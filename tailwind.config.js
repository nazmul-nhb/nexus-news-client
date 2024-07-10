/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
      },
      colors: {
        'nexus-primary': '#6897bb',
        'nexus-secondary': '#31404b',
        'nexusBG': '#b6d1e488',
        'navBG': '#b6d1e4F2'
      },
      fontFamily: {
        kreonSerif: '"Kreon", serif;',
        sourceSans: '"Source Sans 3", sans-serif;',
      },
      backgroundImage: {
        nexusFixedBG: 'url("/src/assets/shapes.svg")',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        '.scrollbar-hide': {
          'scrollbar-width': 'none', /* For Firefox */
          '-ms-overflow-style': 'none',  /* For Internet Explorer and Edge */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none', /* For Chrome, Safari, and Opera */
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin', /* For Firefox */
        },
        '.scrollbar-custom': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#a0aec0 transparent',
        },
        '.scrollbar-custom::-webkit-scrollbar': {
          'width': '8px',
        },
        '.scrollbar-custom::-webkit-scrollbar-track': {
          'background': 'transparent',
        },
        '.scrollbar-custom::-webkit-scrollbar-thumb': {
          'background-color': '#a0aec0',
          'border-radius': '10px',
          'border': '3px solid transparent',
          'background-clip': 'padding-box',
        },
        '.scrollbar-custom::-webkit-scrollbar-button': {
          'display': 'none',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}
