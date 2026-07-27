import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ITEMS = [
  { num: '01', label: 'Home', href: '#home' },
  { num: '02', label: 'About', href: '#about' },
  { num: '03', label: 'Schedule', href: '#schedule' },
  { num: '04', label: 'Prizes', href: '#prizes' },
  { num: '05', label: 'Sponsors', href: '#sponsors' },
  { num: '06', label: 'Register', href: '#register' },
]

export default function MenuOverlay({ open, onClose }) {
  const overlayRef = useRef(null)
  const itemsRef = useRef([])
  const topRef = useRef(null)
  const footerRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    gsap.set(overlayRef.current, { y: '-100%' })
    gsap.set(itemsRef.current, { yPercent: 60, opacity: 0 })
    gsap.set(topRef.current, { opacity: 0 })
    gsap.set(footerRef.current, { opacity: 0 })
  }, [])

  useEffect(() => {
    if (tlRef.current) tlRef.current.kill()

    if (open) {
      document.body.classList.add('menu-open')
      const tl = gsap.timeline()
      tl.to(overlayRef.current, { y: '0%', duration: 0.7, ease: 'power4.inOut' })
        .to(topRef.current, { opacity: 1, duration: 0.4 }, '-=0.2')
        .to(
          itemsRef.current,
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
          '-=0.3'
        )
        .to(footerRef.current, { opacity: 1, duration: 0.5 }, '-=0.3')
      tlRef.current = tl
    } else {
      document.body.classList.remove('menu-open')
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(itemsRef.current, { yPercent: 60, opacity: 0 })
          gsap.set(topRef.current, { opacity: 0 })
          gsap.set(footerRef.current, { opacity: 0 })
        },
      })
      tl.to(overlayRef.current, { y: '-100%', duration: 0.6, ease: 'power3.inOut' })
      tlRef.current = tl
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="menu-overlay" ref={overlayRef}>
      <div className="menu-top" ref={topRef}>
        <div className="logo-mark">
          <span className="dot" />
          DSC//25
        </div>
        <button className="menu-close" onClick={onClose} aria-label="Close menu">
          CLOSE
          <span className="x">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className="menu-list">
        {ITEMS.map((item, i) => (
          <a
            href={item.href}
            className="menu-item"
            key={item.num}
            ref={(el) => (itemsRef.current[i] = el)}
            onClick={onClose}
          >
            <span className="num">{item.num}</span>
            <span className="label">{item.label}</span>
            <span className="arrow">↗</span>
          </a>
        ))}
      </div>

      <div className="menu-footer" ref={footerRef}>
        <span>DATAFORGE © 2026</span>
        <span>DATA SCIENCE CLUB</span>
      </div>
    </div>
  )
}
