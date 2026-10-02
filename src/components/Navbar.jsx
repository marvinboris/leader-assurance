import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'fr', label: 'Français · FR', short: 'FR' },
  { code: 'en', label: 'English · EN', short: 'EN' },
  { code: 'es', label: 'Español · ES', short: 'ES' },
  { code: 'ar', label: 'العربية · AR', short: 'AR' },
  { code: 'zh', label: '中文 · ZH', short: '中文' },
]

const Chevron = () => (
  <svg aria-hidden="true" viewBox="0 0 12 12" fill="none">
    <path d="m2 4 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function LanguageList({ current, onPick, label }) {
  return (
    <div className="shell-language-list" role="group" aria-label={label}>
      {languages.map(l => (
        <button key={l.code} type="button" lang={l.code} aria-pressed={current === l.code} onClick={() => onPick(l.code)}>
          {l.label}
        </button>
      ))}
    </div>
  )
}

// <details> contrôlé : React garde l'état, le navigateur garde le comportement natif (clavier, summary).
function LanguageMenu({ open, setOpen, current, onPick, t }) {
  return (
    <details className="shell-languages" open={open} onToggle={e => setOpen(e.currentTarget.open)}>
      <summary className="shell-language-trigger" aria-label={t('ui.shell.chooseLanguage')}>
        {languages.find(l => l.code === current)?.short ?? 'FR'} <Chevron />
      </summary>
      <LanguageList current={current} onPick={onPick} label={t('ui.shell.languages')} />
    </details>
  )
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileLangOpen, setMobileLangOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const current = (i18n.language || 'fr').slice(0, 2)

  const closeAll = () => { setMenuOpen(false); setLangOpen(false); setMobileLangOpen(false); setPagesOpen(false) }

  useEffect(closeAll, [location])

  useEffect(() => {
    const onKey = e => {
      if (e.key !== 'Escape') return
      if (menuOpen) toggleRef.current?.focus()
      closeAll()
    }
    const onClick = e => { if (!headerRef.current?.contains(e.target)) closeAll() }
    const onResize = () => { if (window.matchMedia('(min-width: 1280px)').matches) setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const pickLanguage = code => { i18n.changeLanguage(code); closeAll() }

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/solutions', label: t('nav.solutions') },
    { path: '/partners', label: t('nav.partners') },
    { path: '/news', label: t('nav.news') },
    { path: '/faq', label: t('nav.faq') },
    { path: '/contact', label: t('nav.contact') },
  ]

  return (
    <header ref={headerRef} className="shell-header relative z-20 bg-paper">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-3 focus:text-ink">
        {t('ui.shell.skip')}
      </a>
      <div className="site-wrap nav-height flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0" aria-label={t('ui.shell.homeLabel')}>
          <img src="/logo.svg" alt="Leader Assurance" className="h-12 w-auto" />
        </Link>

        <div className="shell-mobile-controls">
          <button
            ref={toggleRef}
            className="shell-mobile-menu"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(o => !o)}
          >
            {t('ui.shell.menu')}
          </button>
          <LanguageMenu open={mobileLangOpen} setOpen={setMobileLangOpen} current={current} onPick={pickLanguage} t={t} />
        </div>

        <nav id="main-nav" className={`shell-nav${menuOpen ? ' is-open' : ''}`} aria-label={t('ui.shell.mainNav')}>
          <div className="shell-links">
            {navLinks.map(l => (
              <NavLink key={l.path} to={l.path} end={l.path === '/'} className="shell-link">{l.label}</NavLink>
            ))}
          </div>
          <details className="shell-pages" open={pagesOpen} onToggle={e => setPagesOpen(e.currentTarget.open)}>
            <summary className="shell-link">{t('ui.shell.pages')} <span aria-hidden="true">⌄</span></summary>
            <div className="shell-pages-list">
              {navLinks.map(l => (
                <NavLink key={l.path} to={l.path} end={l.path === '/'}>{l.label}</NavLink>
              ))}
            </div>
          </details>
          <LanguageMenu open={langOpen} setOpen={setLangOpen} current={current} onPick={pickLanguage} t={t} />
          <Link className="button button-gold" to="/contact#devis">
            {t('nav.quote')} <span aria-hidden="true" className="rtl:-scale-x-100">↗</span>
          </Link>
          <div className="shell-mobile-languages">
            <p className="eyebrow text-muted">{t('ui.shell.language')}</p>
            <LanguageList current={current} onPick={pickLanguage} label={t('ui.shell.languages')} />
          </div>
        </nav>
      </div>
    </header>
  )
}
