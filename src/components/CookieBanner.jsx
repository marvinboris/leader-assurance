import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import './CookieBanner.css'

const BANNER_GAP = 16 // px, correspond à pb-4

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Publie la hauteur de la bannière pour que le chatbot se place au-dessus (pas de chevauchement)
  useEffect(() => {
    const root = document.documentElement
    if (!visible || !panelRef.current) return
    const update = () => root.style.setProperty('--cookie-banner-h', `${panelRef.current.offsetHeight + BANNER_GAP}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(panelRef.current)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--cookie-banner-h')
    }
  }, [visible])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed inset-x-0 bottom-0 z-50 pb-4"
        >
          <div className="site-wrap">
            <aside ref={panelRef} className="cookie-panel" aria-label={t('ui.cookie.label')}>
              <div className="flex items-start gap-4">
                <span className="cookie-mark" aria-hidden="true">i</span>
                <div>
                  <h3 className="font-sans text-base font-extrabold text-white">{t('ui.cookie.title')}</h3>
                  <p className="mt-2 max-w-2xl text-small leading-relaxed text-white/75">
                    {t('cookie.message')}{' '}
                    <Link to="/privacy#cookies" className="cookie-link">{t('cookie.learnMore')}</Link>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="button button-outline" type="button" onClick={decline}>{t('cookie.decline')}</button>
                <button className="button button-gold" type="button" onClick={accept}>{t('cookie.accept')}</button>
              </div>
            </aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
