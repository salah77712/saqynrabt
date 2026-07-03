/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // QAR Accent Green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          950: '#022c22',
        },
        dark: {
          900: '#090d16', // Dark space background
          800: '#0f172a', // Card bg
          700: '#1e293b', // Border/line bg
          600: '#334155', // Input border bg
        }
      },
      fontSize: {
        'hero-mobile': '40px',   // Rule 1
        'hero-desktop': '56px',  // Rule 1
      },
      minHeight: {
        'touch': '44px',         // Rule 1
      }
    },
  },
  plugins: [],
}
