/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary accent, driven by frontend/src/brand.config.ts.
        primary: {
          50:  'rgb(var(--brand-primary-50))',
          100: 'rgb(var(--brand-primary-100))',
          200: 'rgb(var(--brand-primary-200))',
          300: 'rgb(var(--brand-primary-300))',
          400: 'rgb(var(--brand-primary-400))',
          500: 'rgb(var(--brand-primary-500))',
          600: 'rgb(var(--brand-primary) / <alpha-value>)',
          700: 'rgb(var(--brand-primary) / <alpha-value>)',
        },
        // Semantic surfaces
        surface: {
          DEFAULT: '#F9FAFB',
          card:    '#FFFFFF',
          hover:   '#F9FAFB',
          pressed: '#F3F4F6',
        },
        // Semantic text
        ink: {
          DEFAULT:   '#111827',
          secondary: '#6B7280',
          tertiary:  '#9CA3AF',
          disabled:  '#D1D5DB',
        },
        // Semantic borders
        border: {
          DEFAULT: '#E5E7EB',
          light:   '#F3F4F6',
          focus:   '#4F46E5',
        },
        // Status colours (low-saturation)
        status: {
          success:     '#059669',
          'success-bg':'#ECFDF5',
          warning:     '#D97706',
          'warning-bg':'#FFFBEB',
          error:       '#DC2626',
          'error-bg':  '#FEF2F2',
          info:        '#2563EB',
          'info-bg':   '#EFF6FF',
        },
        // Legacy aliases — kept so old Google-color classes don't break
        gblue:   { 50:'#EEF2FF', 100:'#E0E7FF', 200:'#C7D2FE', 400:'#818CF8', 500:'#4F46E5', 600:'#4338CA', 700:'#3730A3' },
        ggreen:  { 50:'#ECFDF5', 100:'#D1FAE5', 400:'#34D399', 500:'#059669', 600:'#047857' },
        gyellow: { 50:'#FFFBEB', 100:'#FEF3C7', 400:'#FBBF24', 500:'#F59E0B', 600:'#D97706' },
        gred:    { 50:'#FEF2F2', 100:'#FEE2E2', 400:'#F87171', 500:'#EF4444', 600:'#DC2626' },
        gpurple: { 50:'#F5F3FF', 100:'#EDE9FE', 400:'#A78BFA', 500:'#7C3AED', 600:'#6D28D9' },
        gteal:   { 50:'#F0FDFA', 400:'#2DD4BF', 500:'#0D9488' },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans KR', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      boxShadow: {
        xs:   '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm:   '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        card: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 1px 3px 0 rgb(0 0 0 / 0.06)',
        menu: '0 4px 16px 0 rgb(0 0 0 / 0.10), 0 1px 4px 0 rgb(0 0 0 / 0.06)',
        fab:  '0 2px 8px 0 rgb(0 0 0 / 0.12)',
      },
      borderRadius: {
        google: '8px',
      },
    },
  },
  plugins: [],
}
