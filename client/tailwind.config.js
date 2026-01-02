/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode for Safari and Chrome compatibility
  theme: {
    extend: {
      colors: {
        primary: '#1E5FBF',
        'primary-dark': '#164A99',
        'primary-light': '#2B7FFF',
        'dark-bg': '#0f172a',
        'dark-card': '#1e293b',
        'dark-text': '#f8fafc',
        'blue-bg': '#1E5FBF',
        'blue-card': '#2B7FFF',
        'blue-text': '#ffffff',
      }
    },
  },
  plugins: [
    // Add custom variant for blue theme
    function({ addVariant }) {
      addVariant('blue', '.blue &')
    }
  ],
}
