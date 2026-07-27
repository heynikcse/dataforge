import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import MenuOverlay from './components/MenuOverlay.jsx'
import About from './components/About.jsx'
import Schedule from './components/Schedule.jsx'
import Prizes from './components/Prizes.jsx'
import Sponsors from './components/Sponsors.jsx'
import Register from './components/Register.jsx'
import useLenis from './hooks/useLenis.js'
import BackgroundAnimation from './components/BackgroundAnimation.jsx'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Smooth scroll for the whole app
  useLenis()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Mounted once here so it renders behind every section on the page,
          instead of only existing while Hero is mounted. */}
      <BackgroundAnimation />

      <Navbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        scrolled={scrolled}
      />
      <Hero />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} scrolled={scrolled} />

      <About />
      <Schedule />
      <Prizes />
      <Sponsors />
      <Register />
    </>
  )
}