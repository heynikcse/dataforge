import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
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
import Footer from './components/Footer.jsx'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [landed, setLanded] = useState(false)
  const [overlayGone, setOverlayGone] = useState(false)
  const loaderRef = useRef(null)

  // Smooth scroll for the whole app
  useLenis()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('loading', !landed)
  }, [landed])

  useEffect(() => {
    if (!landed || !loaderRef.current) return
    gsap.to(loaderRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        if (loaderRef.current) loaderRef.current.style.display = 'none'
        setOverlayGone(true) // now safe to hand the TV's z-index back to normal
      },
    })
  }, [landed])

  return (
    <>
      <BackgroundAnimation />

      <Navbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        scrolled={scrolled}
      />
      <Hero landed={landed} onLanded={() => setLanded(true)} tvElevated={!overlayGone} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} scrolled={scrolled} />

      <About />
      <Schedule />
      <Prizes />
      <Sponsors />
      <Register />
      <Footer />

      <div className="page-loader-overlay" ref={loaderRef} />
    </>
  )
}