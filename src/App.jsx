import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import MenuOverlay from './components/MenuOverlay.jsx'
import About from './components/About.jsx'
import Schedule from './components/Schedule.jsx'
import Prizes from './components/Prizes.jsx'
import Sponsors from './components/Sponsors.jsx'
import Register from './components/Register.jsx'
import useLenis from './hooks/useLenis.js'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Smooth scroll for the whole app
  useLenis()

  return (
    <>
      <Navbar onMenuClick={() => setMenuOpen(true)} />
      <Hero />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <About />
      <Schedule />
      <Prizes />
      <Sponsors />
      <Register />
    </>
  )
}
