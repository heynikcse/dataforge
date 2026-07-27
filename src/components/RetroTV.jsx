import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * A small retro CRT-style monitor that slides down from behind the navbar
 * on load and settles into place with a slight bounce. Pure CSS/DOM —
 * no WebGL, no external assets, so it can't get stuck like the old 3D
 * intro could.
 *
 * To swap the screen content from text to a short looping video, comment
 * out the <span className="retro-tv-text"> block below and uncomment the
 * <video> block. Keep the video muted + playsInline so autoplay works
 * reliably across browsers.
 */
export default function RetroTV() {
  const tvRef = useRef(null)

  useEffect(() => {
    const tv = tvRef.current
    if (!tv) return

    gsap.fromTo(
      tv,
      { y: '-160%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        delay: 0.35,
        ease: 'back.out(1.6)',
      }
    )
  }, [])

  return (
    <div className="retro-tv-wrap">
      <div className="retro-tv" ref={tvRef}>
        <div className="retro-tv-body">
          <div className="retro-tv-screen">
            <div className="retro-tv-glow" />
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