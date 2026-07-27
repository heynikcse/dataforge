import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Coin-flip fall: runs exactly ONCE, ever. hasPlayedRef guards against
 * re-firing (scroll re-renders, etc). onLandedRef lets us call the
 * latest callback without needing it in the dependency array.
 *
 * IMPORTANT: no tl.kill() on cleanup — React 18 Strict Mode's dev-only
 * mount→cleanup→mount cycle would kill the timeline mid-flight on the
 * synthetic first cleanup, and since hasPlayedRef is already flipped
 * true by then, the animation would never get to replay or complete —
 * onLanded never fires and the loader overlay is stuck forever.
 */
export default function RetroTV({ onLanded, elevated }) {
  const tvRef = useRef(null)
  const glowRef = useRef(null)
  const bodyRef = useRef(null)
  const onLandedRef = useRef(onLanded)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    onLandedRef.current = onLanded
  }, [onLanded])

  useEffect(() => {
    if (hasPlayedRef.current) return // already played — never replay, ever
    hasPlayedRef.current = true

    const tv = tvRef.current
    if (!tv) return

    gsap.set(tv, { y: -480, opacity: 0, scale: 0.82, rotateY: 0 })

    gsap
      .timeline({ delay: 0.35 })
      .to(tv, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateY: 1080, // three full coin-flip spins on the way down
        duration: 3, // slow motion
        ease: 'power3.inOut',
      })
      .to(tv, { y: -16, duration: 0.16, ease: 'power1.out' }) // tiny pre-bounce lift
      .to(tv, {
        y: 0,
        duration: 0.55,
        ease: 'bounce.out', // weighted landing
        onComplete: () => {
          if (glowRef.current) {
            glowRef.current.classList.remove('is-landed')
            void glowRef.current.offsetWidth
            glowRef.current.classList.add('is-landed')
          }
          if (bodyRef.current) {
            bodyRef.current.classList.remove('is-landed')
            void bodyRef.current.offsetWidth
            bodyRef.current.classList.add('is-landed')
          }
          onLandedRef.current && onLandedRef.current()
        },
      })

    // intentionally no cleanup/kill — see comment above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`retro-tv-wrap${elevated ? ' is-loading' : ''}`}>
      <div className="retro-tv" ref={tvRef}>
        <div className="retro-tv-body" ref={bodyRef}>
          <div className="retro-tv-screen">
            <div className="retro-tv-glow" ref={glowRef} />
            <div className="retro-tv-content">
              <span className="retro-tv-text">
                THIS IS
                <br />
                YOUR MOMENT
              </span>

              {/*
              <video
                className="retro-tv-video"
                src="/your-clip.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              */}
            </div>
            <div className="retro-tv-scanlines" />
          </div>

          <div className="retro-tv-label">
            <span className="retro-tv-dot" />
            DSC//25
          </div>
        </div>

        <div className="retro-tv-stand" />
      </div>
    </div>
  )
}