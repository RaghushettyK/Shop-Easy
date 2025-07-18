/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 this line is critical
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
