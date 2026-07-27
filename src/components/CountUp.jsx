import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CountUp({
  end,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  locale = 'en-IN',
  className = '',
  animatePrefix = false,
}) {
  const wrapRef = useRef(null)
  const prefixRef = useRef(null)
  const numRef = useRef(null)

  useEffect(() => {
    const trigger = wrapRef.current
    const numEl = numRef.current
    const prefixEl = prefixRef.current
    if (!trigger || !numEl) return

    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

    const obj = { val: 0 }
    let pulseTween

    const st = ScrollTrigger.create({
      trigger,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // Prefix flips around the Y axis (like a coin spinning) while the number counts,
        // then eases to a clean stop the moment it lands on the target.
        if (animatePrefix && prefixEl) {
          pulseTween = gsap.to(prefixEl, {
            rotationY: '+=360',
            transformPerspective: 400,
            duration: 1,
            repeat: -1,
            ease: 'linear',
          })
        }

        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            numEl.textContent = formatter.format(obj.val)
          },
          onComplete: () => {
            if (pulseTween) {
              pulseTween.kill()
              const current = gsap.getProperty(prefixEl, 'rotationY')
              const nearestFullTurn = Math.ceil(current / 360) * 360
              gsap.to(prefixEl, {
                rotationY: nearestFullTurn,
                duration: 0.5,
                ease: 'power2.out',
              })
            }
          },
        })
      },
    })

    return () => {
      st.kill()
      if (pulseTween) pulseTween.kill()
    }
  }, [end, duration, prefix, suffix, decimals, locale, animatePrefix])

  const zero = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(0)

  return (
    <span ref={wrapRef} className={className}>
      {prefix && (
        <span ref={prefixRef} className="inline-block" style={{ transformOrigin: '50% 60%' }}>
          {prefix}
        </span>
      )}
      <span ref={numRef}>{zero}</span>
      {suffix}
    </span>
  )
}