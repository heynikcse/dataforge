import { useState, useEffect, useRef } from 'react'

const FIELD_CLASS =
  'w-full bg-transparent border-b border-lineStrong focus:border-orange outline-none py-3 font-body text-offwhite placeholder:text-gray transition-colors'

const REGISTRATION_DEADLINE = new Date('2026-09-05T23:59:59')

function getTimeLeft(target) {
  const diff = +target - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, closed: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    closed: false,
  }
}

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

function CountdownChip({ value, label }) {
  return (
    <div className="flex flex-col items-center border border-lineStrong px-3 py-2 min-w-[56px]">
      <span className="font-mono text-lg sm:text-xl text-orange tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-mono text-[9px] tracking-[0.14em] text-gray mt-1">{label}</span>
    </div>
  )
}

export default function Register() {
  const [form, setForm] = useState({ team: '', email: '', size: '', track: '' })
  const [submitted, setSubmitted] = useState(false)
  const cardRef = useRef(null)
  const timeLeft = useCountdown(REGISTRATION_DEADLINE)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: wire this up to a real endpoint — e.g. Formspree, Google Forms,
    // or your own API route — before going live. This just simulates success.
    setSubmitted(true)
  }

  function handleCardMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mx', `${x}%`)
    card.style.setProperty('--my', `${y}%`)
  }

  return (
    <section id="register" className="border-t border-line px-6 sm:px-[6vw] py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
      <div className="max-w-3xl">
        <div className="font-mono text-[11px] tracking-[0.28em] text-gray flex items-center gap-3 mb-8">
          <span className="w-9 h-px bg-orange inline-block" />
          06 / REGISTER
        </div>

        <h2 className="font-display font-extrabold uppercase text-orange leading-[0.95] tracking-tight text-[clamp(2.2rem,6vw,4.5rem)] mb-4">
          Claim your slot.
        </h2>
        <p className="font-body text-gray text-sm sm:text-base mb-6">
          Teams of 2–4. Registration closes SEPT 5, 2026.
        </p>

        {!timeLeft.closed ? (
          <div className="flex items-center gap-2 sm:gap-3 mb-14">
            <CountdownChip value={timeLeft.days} label="DAYS" />
            <span className="font-mono text-orange text-lg pb-4">:</span>
            <CountdownChip value={timeLeft.hours} label="HRS" />
            <span className="font-mono text-orange text-lg pb-4">:</span>
            <CountdownChip value={timeLeft.minutes} label="MIN" />
            <span className="font-mono text-orange text-lg pb-4">:</span>
            <CountdownChip value={timeLeft.seconds} label="SEC" />
          </div>
        ) : (
          <p className="font-mono text-[11px] tracking-[0.14em] text-orange mb-14">
            REGISTRATION CLOSED
          </p>
        )}

        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          className="group relative border border-lineStrong hover:border-orange/40 bg-black/45 backdrop-blur-md rounded-sm p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-300 overflow-hidden"
          style={{ '--mx': '50%', '--my': '50%' }}
        >
          {/* mouse-tracked glow — follows cursor, invisible until hovered */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(420px circle at var(--mx) var(--my), rgba(255,90,31,0.16), transparent 65%)',
            }}
          />
          <span className="absolute -top-px -left-px w-2.5 h-2.5 bg-orange" />

          <div className="relative">
            {submitted ? (
              <div className="py-12 text-center">
                <p className="font-display font-bold uppercase text-orange text-xl">
                  Registration received
                </p>
                <p className="font-body text-gray text-sm mt-3">
                  We'll email your team confirmation and problem statement access shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-gray">TEAM NAME</span>
                    <input
                      required
                      name="team"
                      value={form.team}
                      onChange={handleChange}
                      placeholder="e.g. Gradient Descent"
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-gray">CONTACT EMAIL</span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="team@example.com"
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-gray">TEAM SIZE</span>
                    <input
                      required
                      name="size"
                      value={form.size}
                      onChange={handleChange}
                      placeholder="2–4"
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-gray">PREFERRED TRACK</span>
                    <input
                      name="track"
                      value={form.track}
                      onChange={handleChange}
                      placeholder="ML / NLP / Computer Vision / Open"
                      className={FIELD_CLASS}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="self-start font-mono text-[12px] tracking-[0.18em] uppercase bg-orange text-base px-8 py-4 hover:bg-offwhite transition-colors"
                >
                  Submit registration
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}