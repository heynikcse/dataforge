import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * A real 6-faced 3D cube (front = CRT screen, other 5 faces = bezel
 * panels). Falls + spins into place once (see the "run once" guard —
 * no tl.kill() on cleanup, so Strict Mode's dev double-mount can't
 * kill it mid-flight). Once landed, drag-to-rotate takes over —
 * LEFT/RIGHT ONLY (rotateY), no vertical tilt — with a short inertia
 * decay on release. It stays wherever you leave it.
 */
export default function RetroTV({ onLanded, elevated }) {
  const tvRef = useRef(null) // outer: fall (y / opacity / scale)
  const cubeRef = useRef(null) // inner: all rotation (entrance spin + drag)
  const glowRef = useRef(null)
  const onLandedRef = useRef(onLanded)
  const hasPlayedRef = useRef(false)
  const drag = useRef({
    enabled: false,
    dragging: false,
    rotY: 0,
    lastX: 0,
    lastT: 0,
    velX: 0,
  })

  useEffect(() => {
    onLandedRef.current = onLanded
  }, [onLanded])

  // entrance: fall + spin, runs exactly once
  useEffect(() => {
    if (hasPlayedRef.current) return
    hasPlayedRef.current = true

    const tv = tvRef.current
    const cube = cubeRef.current
    if (!tv || !cube) return

    gsap.set(tv, { y: -480, opacity: 0, scale: 0.82 })
    gsap.set(cube, { rotateY: 0, rotateX: 0 })

    gsap
      .timeline({ delay: 0.65 }) // a little later before it starts coming down
      .to(tv, { y: 0, opacity: 1, scale: 1, duration: 1.9, ease: 'power3.inOut' }, 0) // faster fall
      .to(cube, { rotateY: 720, duration: 1.9, ease: 'power3.inOut' }, 0) // coin-flip spins while falling
      .to(tv, { y: -14, duration: 0.13, ease: 'power1.out' }) // pre-bounce lift
      .to(tv, {
        y: 0,
        duration: 0.45,
        ease: 'bounce.out', // weighted landing
        onComplete: () => {
          if (glowRef.current) {
            glowRef.current.classList.remove('is-landed')
            void glowRef.current.offsetWidth
            glowRef.current.classList.add('is-landed')
          }
          cube.classList.remove('is-landed')
          void cube.offsetWidth
          cube.classList.add('is-landed')

          // normalize spin (720 % 360 = 0, so this is visually seamless)
          const normalizedY = gsap.getProperty(cube, 'rotateY') % 360
          drag.current.rotY = normalizedY
          gsap.set(cube, { rotateY: normalizedY, rotateX: 0 })
          drag.current.enabled = true // hand control to the mouse/touch

          onLandedRef.current && onLandedRef.current()
        },
      })
    // intentionally no cleanup/kill — must survive Strict Mode's dev double-mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // drag-to-rotate — horizontal only, only acts once drag.enabled is flipped true above
  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return
    const state = drag.current

    function onPointerDown(e) {
      if (!state.enabled) return
      state.dragging = true
      state.lastX = e.clientX
      state.lastT = performance.now()
      state.velX = 0
      gsap.killTweensOf(cube)
      cube.setPointerCapture && cube.setPointerCapture(e.pointerId)
      cube.classList.add('is-dragging')
    }

    function onPointerMove(e) {
      if (!state.dragging) return
      const now = performance.now()
      const dt = Math.max(now - state.lastT, 1)
      const dx = e.clientX - state.lastX

      state.rotY += dx * 0.4
      state.velX = (dx / dt) * 16

      state.lastX = e.clientX
      state.lastT = now

      gsap.set(cube, { rotateY: state.rotY, rotateX: 0 })
    }

    function onPointerUp() {
      if (!state.dragging) return
      state.dragging = false
      cube.classList.remove('is-dragging')

      // brief inertia, then ease to a stop — stays wherever it lands
      const proxy = { rotY: state.rotY }
      gsap.to(proxy, {
        rotY: state.rotY + state.velX * 6,
        duration: 1.1,
        ease: 'power3.out',
        onUpdate: () => {
          state.rotY = proxy.rotY
          gsap.set(cube, { rotateY: proxy.rotY, rotateX: 0 })
        },
      })
    }

    cube.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      cube.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  return (
    <div className={`retro-tv-wrap${elevated ? ' is-loading' : ''}`}>
      <div className="retro-tv" ref={tvRef}>
        <div className="tv-cube" ref={cubeRef}>
          <div className="tv-face tv-face--front">
            <div className="retro-tv-screen">
              <div className="retro-tv-glow" ref={glowRef} />
              <div className="retro-tv-content">
                <video
                  className="retro-tv-video"
                  src="/videos/tv-loop.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <div className="retro-tv-scanlines" />
            </div>
          </div>

          <div className="tv-face tv-face--back">
            <span className="tv-face-mark" />
          </div>
          <div className="tv-face tv-face--right">
            <span className="tv-face-mark" />
          </div>
          <div className="tv-face tv-face--left">
            <span className="tv-face-mark" />
          </div>
          <div className="tv-face tv-face--top">
            <span className="tv-face-mark" />
          </div>
          <div className="tv-face tv-face--bottom">
            <span className="tv-face-mark" />
          </div>
        </div>

        <div className="retro-tv-label">
          <span className="retro-tv-dot" />
          {/* DSC//25 */}
        </div>
      </div>

      <div className="retro-tv-stand" />
    </div>
  )
}