import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DAYS = [
  {
    day: 'DAY 01',
    date: 'SEPT 12',
    events: [
      ['09:00', 'Check-in & team formation'],
      ['11:00', 'Opening keynote'],
      ['12:00', 'Problem statements released'],
      ['13:00', 'Hacking begins'],
    ],
  },
  {
    day: 'DAY 02',
    date: 'SEPT 13',
    events: [
      ['10:00', 'Mentor round 1'],
      ['15:00', 'Mentor round 2'],
      ['20:00', 'Midnight snack + workshop'],
    ],
  },
  {
    day: 'DAY 03',
    date: 'SEPT 14',
    events: [
      ['09:00', 'Hacking ends'],
      ['10:00', 'Submissions close'],
      ['12:00', 'Final presentations'],
      ['16:00', 'Awards & closing'],
    ],
  },
]

export default function Schedule() {
  const wrapRef = useRef(null)
  const fillRef = useRef(null)
  const dotRefs = useRef([])
  const eventRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress fill tied directly to scroll position across the
      // whole timeline block — grows 0% to 100% as you scroll through it.
      gsap.to(fillRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 75%',
          end: 'bottom 65%',
          scrub: true,
        },
      })

      // Each day's dot lights up orange once the timeline reaches it.
      dotRefs.current.forEach((dot) => {
        if (!dot) return
        ScrollTrigger.create({
          trigger: dot,
          start: 'top 75%',
          onEnter: () => dot.classList.add('is-lit'),
          onLeaveBack: () => dot.classList.remove('is-lit'),
        })
      })

      // Each event line unblurs/sharpens in, same treatment as the
      // Hero title characters, as it scrolls into view.
      eventRefs.current.forEach((el) => {
        if (!el) return
        gsap.to(el, {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  let eventIndex = 0

  return (
    <section id="schedule" className="border-t border-line px-6 sm:px-[6vw] py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.28em] text-gray flex items-center gap-3 mb-8">
          <span className="w-9 h-px bg-orange inline-block" />
          03 / SCHEDULE
        </div>

        <h2 className="font-display font-extrabold uppercase text-orange leading-[0.95] tracking-tight text-[clamp(2.2rem,6vw,4.5rem)] max-w-3xl mb-20">
          48 hours, mapped out.
        </h2>

        <div className="timeline-wrap max-w-2xl" ref={wrapRef}>
          <div className="timeline-rail" />
          <div className="timeline-fill" ref={fillRef} />

          {DAYS.map((d, dayIdx) => (
            <div className="timeline-day" key={d.day}>
              <span
                className="timeline-dot"
                ref={(el) => (dotRefs.current[dayIdx] = el)}
              >
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>

              <div className="flex items-baseline justify-between border-b border-lineStrong pb-4 mb-2">
                <span className="font-display font-bold uppercase text-offwhite text-lg tracking-wide">
                  {d.day}
                </span>
                <span className="font-mono text-[11px] text-gray">{d.date}</span>
              </div>

              {d.events.map(([time, label]) => {
                const idx = eventIndex++
                return (
                  <div
                    key={time}
                    ref={(el) => (eventRefs.current[idx] = el)}
                    className="timeline-event flex items-baseline gap-4 py-3 border-b border-line"
                    style={{
                      filter: 'blur(10px)',
                      opacity: 0,
                      transform: 'translateY(14px)',
                    }}
                  >
                    <span className="font-mono text-[11px] text-orange min-w-[42px]">{time}</span>
                    <span className="font-body text-sm text-offwhite/80">{label}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}