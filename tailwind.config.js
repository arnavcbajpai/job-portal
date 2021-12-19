module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dodger-blue': {
          50: '#75e1ff',
          100: '#6bd7ff',
          200: '#61cdff',
          300: '#57c3ff',
          400: '#4db9ff',
          500: '#43afff',
          600: '#39a5f5',
          700: '#2f9beb',
          800: '#2591e1',
          900: '#1b87d7',
        },
        'border-color': {
          500: 'hsla(206, 100%, 63%, 0.2)',
        },
      },
    },
  },
  plugins: [],
}
