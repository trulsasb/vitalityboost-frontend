/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F3",
        field: "#EFF3EC",
        forest: {
          DEFAULT: "#1F3D2B",
          dark: "#16301F"
        }
      }
    }
  },
  plugins: []
};
