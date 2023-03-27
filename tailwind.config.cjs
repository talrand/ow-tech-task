/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        'ow-orange': '#FF6C50',
        'ow-dark-blue': '#006A87',
        'ow-light-blue': '#26DEEB'
      }
    },
  },
  plugins: [],
}
