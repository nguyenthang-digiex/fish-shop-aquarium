/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        500: '#0ea5e9',
        600: '#0284c7',
        deep: '#0f172a',
        ocean: '#0ea5e9',
        aqua: '#22d3ee',
        coral: '#f43f5e',
        sand: '#f8fafc',
      },
    },
  },
  plugins: [],
};
