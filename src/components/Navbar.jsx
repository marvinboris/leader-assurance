import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown, Phone } from 'lucide-react'

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/solutions', label: t('nav.solutions') },
    { path: '/partners', label: t('nav.partners') },
    { path: '/news', label: t('nav.news') },
    { path: '/faq', label: t('nav.faq') },
    { path: '/contact', label: t('nav.contact') },
  ]

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-primary-900 text-white text-sm py-1.5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Phone size={14} />
            <a href="tel:+237696411012" className="hover:text-gold-400 transition-colors">+237 696 41 10 12</a>
            <span className="mx-2">|</span>
            <a href="tel:+237681806975" className="hover:text-gold-400 transition-colors">+237 681 80 69 75</a>
          </span>
          <span>
            <a href="mailto:leaderassurance1@yahoo.fr" className="hover:text-gold-400 transition-colors">
              leaderassurance1@yahoo.fr
            </a>
          </span>
        </div>
      </div>

      <nav className={`container mx-auto px-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/logo.jpg" alt="Leader Assurance" className="h-12 w-auto rounded" />
            <div className="hidden sm:block">
              <div className="text-primary-900 font-heading font-bold text-lg leading-tight">
                LEADER ASSURANCE
              </div>
              <div className="text-gold-500 text-xs font-semibold tracking-widest uppercase">
                ASSUREUR CONSEIL
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-900 bg-primary-50 font-semibold'
                    : 'text-gray-700 hover:text-primary-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Globe size={16} />
                <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[160px] z-50"
                  >
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false) }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          i18n.language === lang.code ? 'text-primary-900 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className="btn-primary text-sm">
              {t('nav.quote')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile language dropdown */}
        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="grid grid-cols-5 gap-2 py-3">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false) }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-colors ${
                      i18n.language === lang.code ? 'bg-primary-50 text-primary-900 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-gray-100 mt-2">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary-900 bg-primary-50 font-semibold'
                        : 'text-gray-700 hover:text-primary-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3">
                  <Link to="/contact" className="btn-primary w-full text-center block">
                    {t('nav.quote')}
                  </Link>
                </div>
                <div className="pt-2 border-t border-gray-100 mt-2">
                  <a href="tel:+237696411012" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
                    <Phone size={14} />
                    +237 696 41 10 12
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
