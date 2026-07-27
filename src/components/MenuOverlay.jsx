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

export default function MenuOverlay({ open, onClose, scrolled }) {
  const panelRef = useRef(null)
  const itemsRef = useRef([])
  const tlRef = useRef(null)

  useEffect(() => {
    gsap.set(panelRef.current, { autoAlpha: 0, xPercent: -50, y: -12, scale: 0.96 })
    gsap.set(itemsRef.current, { autoAlpha: 0, y: -6 })
  }, [])

  useEffect(() => {
    if (tlRef.current) tlRef.current.kill()

    if (open) {
      const tl = gsap.timeline()
      tl.to(panelRef.current, {
        autoAlpha: 1,
        xPercent: -50,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: 'power3.out',
      }).to(
        itemsRef.current,
        { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out' },
        '-=0.15'
      )
      tlRef.current = tl
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(itemsRef.current, { autoAlpha: 0, y: -6 })
        },
      })
      tl.to(panelRef.current, {
        autoAlpha: 0,
        xPercent: -50,
        y: -12,
        scale: 0.96,
        duration: 0.25,
        ease: 'power2.in',
      })
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

  useEffect(() => {
    function onClickOutside(e) {
      if (!open) return
      if (panelRef.current && panelRef.current.contains(e.target)) return
      if (e.target.closest('.nav-dots-btn') || e.target.closest('.menu-btn')) return
      onClose()
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open, onClose])

  return (
    <div className={`menu-panel ${scrolled ? 'is-wide' : ''}`} ref={panelRef}>
      <div className="menu-panel-list">
        {ITEMS.map((item, i) => (
          <a
            href={item.href}
            className="menu-panel-item"
            key={item.num}
            ref={(el) => (itemsRef.current[i] = el)}
            onClick={onClose}
          >
            <span className="num">{item.num}</span>
            <span className="label">{item.label}</span>
          </a>
        ))}
      </div>

      <div className="menu-panel-footer">
        <span>DATAFORGE © 2026</span>
        <span>DATA SCIENCE CLUB</span>
      </div>
    </div>
  )
}