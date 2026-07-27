import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Navbar({ menuOpen, onToggleMenu, scrolled }) {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.to(navRef.current, { opacity: 1, duration: 0.8, delay: 1.0, ease: 'power2.out' })
  }, [])

  return (
    <div className="navwrap" ref={navRef}>
      <div className={`navstrip ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="logo-mark">
          <span className="dot" />
          DSC
        </div>

        <button
          className={`nav-dots-btn ${menuOpen ? 'is-open' : ''}`}
          onClick={onToggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="nav-dots">
            <i /> <i /> <i /> <i /> <i />
          </span>
        </button>

        <button className="menu-btn" onClick={onToggleMenu} aria-label="Open menu">
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