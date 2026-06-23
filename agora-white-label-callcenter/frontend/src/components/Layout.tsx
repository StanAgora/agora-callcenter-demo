import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'
import { PlusCircle, Radio, PhoneCall, Bot, History, PhoneIncoming, BarChart2, LogOut, Settings, UserCircle2 } from 'lucide-react'
import { LANGUAGES, setLang, type Lang } from '../i18n'
import { logout } from '../lib/auth'
import { brandConfig } from '../brand.config'

export function Layout() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const NAV = [
    { to: '/dashboard',       label: 'Dashboard',                icon: BarChart2 },
    { to: '/surveys/new',     label: t('nav.new_campaign'),      icon: PlusCircle },
    { to: '/campaigns',       label: t('app_nav.campaigns'),     icon: Radio },
    { to: '/inbound-routing', label: 'Inbound Routing',          icon: PhoneIncoming },
    { to: '/phone-numbers',   label: t('app_nav.phone_numbers'), icon: PhoneCall },
    { to: '/agents',          label: t('app_nav.agents'),        icon: Bot },
    { to: '/call-history',    label: t('app_nav.call_history'),  icon: History },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-4 h-14 flex items-center gap-2.5 border-b border-gray-100">
          {brandConfig.logo ? (
            <img src={brandConfig.logo} alt={brandConfig.productName} className="h-7 max-w-[128px] object-contain" />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
              {brandConfig.productName.slice(0, 1).toUpperCase()}
            </div>
          )}
          <span className="text-[11px] font-semibold text-gray-500 tracking-wide truncate">
            {brandConfig.productName}
          </span>
        </div>
        {brandConfig.demoBanner.enabled && (
          <div className="mx-3 mt-3 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] font-medium leading-4 text-amber-700">
            {brandConfig.demoBanner.text}
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2.25 : 1.75}
                    className={isActive ? 'text-primary-600' : 'text-gray-400'}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Language switcher */}
        <div className="px-3 py-3 border-t border-gray-100">
          <select
            value={i18n.language}
            onChange={e => setLang(e.target.value as Lang)}
            className="w-full px-3 py-1.5 rounded-lg text-xs text-gray-600 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
          >
            {LANGUAGES.map(({ code, flag, label }) => (
              <option key={code} value={code}>
                {flag} {label}
              </option>
            ))}
          </select>
        </div>

        {/* User profile */}
        <div className="px-3 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-gray-50">
            <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <UserCircle2 size={15} className="text-primary-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">{brandConfig.sidebarUserLabel}</p>
              <p className="text-[10px] text-gray-400 truncate">{brandConfig.sidebarUserRole}</p>
            </div>
            <NavLink
              to="/settings"
              title={t('nav.settings')}
              className={({ isActive }) =>
                cn(
                  'p-1 rounded-lg transition-colors',
                  isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                )
              }
            >
              <Settings size={14} />
            </NavLink>
            <button
              onClick={handleLogout}
              title={t('login.logout')}
              className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
