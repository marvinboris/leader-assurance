import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

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
          className="fixed bottom-0 left-0 right-0 z-50 bg-primary-950 text-white p-4 shadow-2xl"
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Cookie size={20} className="text-gold-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                {t('cookie.message')}{' '}
                <Link to="/privacy#cookies" className="text-gold-400 hover:underline">
                  {t('cookie.learnMore')}
                </Link>
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button onClick={decline} className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:border-gray-400 transition-colors">
                {t('cookie.decline')}
              </button>
              <button onClick={accept} className="px-4 py-2 text-sm bg-gold-500 hover:bg-gold-600 text-white rounded-lg transition-colors font-medium">
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
