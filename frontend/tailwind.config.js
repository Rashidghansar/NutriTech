/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4CAF50',
        'brand-secondary': '#2196F3',
        'grade-a': '#4CAF50',
        'grade-b': '#8BC34A',
        'grade-c': '#FFC107',
        'grade-d': '#FF9800',
        'grade-f': '#F44336',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
} 