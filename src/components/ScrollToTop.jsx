import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Ancre (#devis…) : la page vient d'être rendue, on vise l'élément ; sinon retour en haut.
    let id = hash.slice(1)
    try { id = decodeURIComponent(id) } catch { /* ancre mal encodée (#%) : on garde la valeur brute */ }
    const target = id && document.getElementById(id)
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
