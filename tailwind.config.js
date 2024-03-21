/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#163020',
				'primary': '#304D30',
				'secondary': '#B6C4B6',
        'light': '#EEF0E5'
      },
    },
  },
  plugins: [],
}