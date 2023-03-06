/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        }
      },
      animation: {
        appear: 'appear 0.2s ease-in-out',
      }
    }
  },
  plugins: [],
}
