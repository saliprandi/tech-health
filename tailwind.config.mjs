/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#12336A',
          dark: '#0a2248',
        },
        blue: {
          DEFAULT: '#2563A8',
          light: '#4A90D9',
          pale: '#EBF3FC',
        },
        white: '#ffffff',
        'off-white': '#F7F9FC',
        gray: {
          DEFAULT: '#8898AA',
        },
        text: {
          DEFAULT: '#1a2332',
          soft: '#4A5568',
        },
        brand: {
          navy: '#1B4D8A',
          gray: '#4A4A4A',
        },
        border: 'rgba(18,51,106,0.12)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        syne: ['"Plus Jakarta Sans"', 'sans-serif'], // Alias to avoid breaking current components
        'dm-sans': ['Inter', 'sans-serif'],      // Alias to avoid breaking current components
      },
      boxShadow: {
        'card-hover': '0 12px 40px rgba(18,51,106,0.08)',
        'hero-card': '0 20px 60px rgba(18,51,106,0.10)',
      },
      borderRadius: {
        card: '20px',
        small: '12px',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '10%, 30%': { transform: 'scale(1.15)' },
          '20%': { transform: 'scale(1.2)' },
        }
      },
      animation: {
        heartbeat: 'heartbeat 1.2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
