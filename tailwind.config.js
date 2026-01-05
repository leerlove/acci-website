/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 브랜드 컬러 - 공존 테마 (B)
        primary: {
          DEFAULT: '#6B2D4A',
          50: '#F9F0F4',
          100: '#F2E0E8',
          200: '#E5C1D1',
          300: '#D8A2BA',
          400: '#CB83A3',
          500: '#BE648C',
          600: '#A14B73',
          700: '#843C5D',
          800: '#6B2D4A',
          900: '#521E38',
        },
        secondary: {
          DEFAULT: '#D98BA3',
          50: '#FCF5F7',
          100: '#F9EBEF',
          200: '#F3D7DF',
          300: '#EDC3CF',
          400: '#E7AFBF',
          500: '#D98BA3',
          600: '#CB6787',
          700: '#BD436B',
          800: '#9A3756',
          900: '#772B43',
        },
        accent: {
          DEFAULT: '#F2C4D0',
          light: '#F8DDE5',
          dark: '#E9A5B7',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F8F8F8',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        heading: ['Pretendard', 'Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['2.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.45', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(107, 45, 74, 0.1), 0 10px 20px -2px rgba(107, 45, 74, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
