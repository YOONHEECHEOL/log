/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: { min: '320px', max: '719px' },
      md: { min: '720px', max: '1439px' },
      lg: { min: '1440px' }
    },
    minHeight: {
      'screen': 'calc(100vh - 8rem)',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
