/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        surface: 'var(--color-surface)',
        accent: 'var(--color-accent)',
        'accent-foreground': 'var(--color-accent-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        pill: 'var(--spacing-pill)',
      },
      boxShadow: {
        geo: 'var(--shadow-geo)',
        'geo-hover': 'var(--shadow-geo-hover)',
        glow: 'var(--shadow-glow)',
        'glow-strong': 'var(--shadow-glow-strong)',
        'elevation-low': 'var(--shadow-elevation-low)',
        'elevation-mid': 'var(--shadow-elevation-mid)',
        'elevation-high': 'var(--shadow-elevation-high)',
      },
      fontSize: {
        xs: ['var(--fs-xs)', { lineHeight: 'var(--leading-normal)' }],
        sm: ['var(--fs-sm)', { lineHeight: 'var(--leading-normal)' }],
        base: ['var(--fs-base)', { lineHeight: 'var(--leading-normal)' }],
        lg: ['var(--fs-lg)', { lineHeight: 'var(--leading-normal)' }],
        xl: ['var(--fs-xl)', { lineHeight: 'var(--leading-snug)' }],
        '2xl': ['var(--fs-2xl)', { lineHeight: 'var(--leading-snug)' }],
        '3xl': ['var(--fs-3xl)', { lineHeight: 'var(--leading-tight)' }],
        '4xl': ['var(--fs-4xl)', { lineHeight: 'var(--leading-tight)' }],
        '5xl': ['var(--fs-5xl)', { lineHeight: 'var(--leading-tight)' }],
        '6xl': ['var(--fs-6xl)', { lineHeight: 'var(--leading-tight)' }],
      },
      lineHeight: {
        tight: 'var(--leading-tight)',
        snug: 'var(--leading-snug)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
      },
      spacing: {
        'section-sm': 'var(--section-gap-sm)',
        'section-md': 'var(--section-gap-md)',
        'section-lg': 'var(--section-gap-lg)',
        pill: 'var(--spacing-pill)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-out': 'fadeOut 0.2s ease-in forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'slide-down-exit': 'slideDownExit 0.2s ease-in forwards',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 3s ease-in-out infinite',
        'spring-in': 'springIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideDownExit: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        springIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rainbow: {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '200%' },
        },
      },
    },
  },
  plugins: [],
}