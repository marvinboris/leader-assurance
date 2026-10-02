import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Comme la maquette : chaque <section> de <main>, sauf la première (hero), apparaît au scroll.
export default function useRevealSections() {
  const { pathname } = useLocation()
  useEffect(() => {
    const sections = [...document.querySelectorAll('#contenu section')].slice(1)
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }), { threshold: 0.12 })
    sections.forEach(s => { s.classList.add('reveal'); observer.observe(s) })
    return () => observer.disconnect()
  }, [pathname])
}
