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
        field: {
          DEFAULT: "#EFF3EC",
          // Deeper sage for borders/accents — the pale DEFAULT tone reads
          // as visually identical to the cream page background (confirmed
          // via computed styles: ~11 RGB points apart), so anything meant
          // to read as a distinct color needs this instead.
          dark: "#C9D6C7"
        },
        forest: {
          DEFAULT: "#1F3D2B",
          dark: "#16301F"
        }
      }
    }
  },
  plugins: []
};
