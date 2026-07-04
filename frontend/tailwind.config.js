/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A365D",
        accent: "#10B981",
        brand: {
          500: "#4CC9F0",
          600: "#2CB3D6",
        },
        dark: {
          900: "#07111F",
          800: "#0D1B2D",
          700: "#16233A",
          600: "#23354F",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
