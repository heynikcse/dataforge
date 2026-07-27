import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import RetroTV from './RetroTV.jsx'

const TITLE = 'DATAFORGE'

export default function Hero({ landed, onLanded, tvElevated }) {
  const titleRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    if (!landed) return

    const ctx = gsap.context(() => {
      const chars = titleRef.current.querySelectorAll('.char')

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.eyebrow',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .to(
          chars,
          {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.035,
            ease: 'power4.out',
          },
          '-=0.3'
        )
        .fromTo('.presented', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    }, scope)

    return () => ctx.revert()
  }, [landed])

  return (
    <section className="hero" id="home" ref={scope}>
      <RetroTV onLanded={onLanded} elevated={tvElevated} />

      <div className="grid-overlay" />
      <div className="overlay-scrim" />

      <div className="hero-inner">
        <div className="eyebrow">
          <span className="rule" />
          48HR NATIONAL HACKATHON
          <span className="rule" />
        </div>

        <h1 className="hero-title" ref={titleRef}>
          <span className="word">
            {[...TITLE].map((ch, i) => (
              <span
                className="char"
                key={i}
                style={{ filter: 'blur(14px)', opacity: 0, transform: 'translateY(40px)' }}
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>

        <div className="presented">
          <span className="p1">Presented by</span>
          <span className="p2">Data Science Club</span>
          <span className="p3">VIT Bhopal</span>
        </div>
      </div>
    </section>
  )
}