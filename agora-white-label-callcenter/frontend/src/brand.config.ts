type BrandConfig = {
  productName: string
  logo: string
  primaryColor: string
  accentColor: string
  footerText: string
  loginSubtitle: string
  sidebarUserLabel: string
  sidebarUserRole: string
  demoBanner: {
    enabled: boolean
    text: string
  }
  demoCredentials: {
    username: string
    password: string
  }
}

const env = import.meta.env

function envString(key: string, fallback: string): string {
  const value = env[key]
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function envBool(key: string, fallback: boolean): boolean {
  const value = env[key]
  if (value == null || value === '') return fallback
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase())
}

export const brandConfig: BrandConfig = {
  productName: envString('VITE_BRAND_PRODUCT_NAME', 'Call Center Console'),
  logo: envString('VITE_BRAND_LOGO_URL', ''),
  primaryColor: envString('VITE_BRAND_PRIMARY_COLOR', '#2563EB'),
  accentColor: envString('VITE_BRAND_ACCENT_COLOR', '#059669'),
  footerText: envString('VITE_BRAND_FOOTER_TEXT', 'Powered by Voice AI Platform'),
  loginSubtitle: envString('VITE_BRAND_LOGIN_SUBTITLE', 'Manage campaigns, agents, and call outcomes'),
  sidebarUserLabel: envString('VITE_BRAND_SIDEBAR_USER_LABEL', 'Demo Admin'),
  sidebarUserRole: envString('VITE_BRAND_SIDEBAR_USER_ROLE', 'Administrator'),
  demoBanner: {
    enabled: envBool('VITE_BRAND_DEMO_BANNER', true),
    text: envString('VITE_BRAND_DEMO_BANNER_TEXT', 'Demo environment. Not for production use.'),
  },
  demoCredentials: {
    username: envString('VITE_DEMO_USERNAME', 'demo'),
    password: envString('VITE_DEMO_PASSWORD', 'demo'),
  },
}

function hexToRgb(hex: string): string | null {
  const normalized = hex.trim().replace(/^#/, '')
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null
  const n = Number.parseInt(normalized, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

export function applyBrandTheme(config: BrandConfig = brandConfig) {
  const root = document.documentElement
  const primary = hexToRgb(config.primaryColor) ?? '37 99 235'
  const accent = hexToRgb(config.accentColor) ?? '5 150 105'

  // Keep the document title in sync with the configured product name so a single
  // VITE_BRAND_PRODUCT_NAME override re-brands the browser tab too.
  document.title = config.productName

  root.style.setProperty('--brand-primary', primary)
  root.style.setProperty('--brand-primary-50', `${primary} / 0.08`)
  root.style.setProperty('--brand-primary-100', `${primary} / 0.14`)
  root.style.setProperty('--brand-primary-200', `${primary} / 0.24`)
  root.style.setProperty('--brand-primary-300', `${primary} / 0.36`)
  root.style.setProperty('--brand-primary-400', `${primary} / 0.68`)
  root.style.setProperty('--brand-primary-500', `${primary} / 0.86`)
  root.style.setProperty('--brand-accent', accent)
}
