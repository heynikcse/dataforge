import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wraps a heading and reveals it letter-by-letter, in random order, the
 * first time it scrolls into view. Each letter pops from invisible to
 * a bright glow, then the whole heading settles to a soft resting glow
 * once every letter has landed. Fires once per heading — never replays
 * on scroll-back.
 *
 * Usage: <BulbHeading as="h2" className="...">Claim your slot.</BulbHeading>
 * Multi-line headings work too: pass an array of strings, one per line.
 *   <BulbHeading as="h2" className="...">{['48 Hours, Mapped', 'Out.']}</BulbHeading>
 */
export default function BulbHeading({ children, as: Tag = 'h2', className = '', ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const letters = el.querySelectorAll('.bulb-letter')

    gsap.set(letters, { opacity: 0, filter: 'drop-shadow(0 0 0px rgba(255,90,31,0))' })

    const tl = gsap.timeline({ paused: true })

    tl.to(letters, {
      opacity: 1,
      filter: 'drop-shadow(0 0 14px rgba(255,90,31,0.9))',
      duration: 0.18,
      ease: 'power1.out',
      stagger: { each: 0.035, from: 'random' },
    }).to(
      letters,
      {
        filter: 'drop-shadow(0 0 5px rgba(255,90,31,0.25))',
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.1'
    )

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => tl.play(),
    })

    return () => {
      trigger.kill()
      tl.kill()
    }
  }, [])

  const lines = Array.isArray(children) ? children : [children]

  return (
    <Tag ref={ref} className={className} {...props}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.split(' ').map((word, wi, arr) => (
            <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {[...word].map((char, ci) => (
                <span key={ci} className="bulb-letter" style={{ display: 'inline-block' }}>
                  {char}
                </span>
              ))}
              {wi < arr.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}