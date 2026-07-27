import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Navbar({ onMenuClick }) {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.to(navRef.current, { opacity: 1, duration: 0.8, delay: 1.0, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="navwrap" ref={navRef}>
      <div className={`navstrip ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="logo-mark">
          <span className="dot" />
          DSC//25
        </div>

        <div className="nav-dots" aria-hidden="true">
          <i /> <i /> <i />
        </div>

        <button className="menu-btn" onClick={onMenuClick} aria-label="Open menu">
          MENU
          <span className="bars">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </div>
  )
}
