import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'

/**
 * Sets up Lenis smooth scrolling and syncs it with GSAP's ticker
 * so any ScrollTrigger-based animations stay in step with the scroll.
 */
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Drive Lenis from GSAP's ticker so any ScrollTrigger-based
    // animations stay perfectly in sync with the smooth scroll.
    function update(time) {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])
}
