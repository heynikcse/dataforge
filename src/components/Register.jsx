import { useState } from 'react'

const FIELD_CLASS =
  'w-full bg-transparent border-b border-lineStrong focus:border-orange outline-none py-3 font-body text-offwhite placeholder:text-gray transition-colors'

export default function Register() {
  const [form, setForm] = useState({ team: '', email: '', size: '', track: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: wire this up to a real endpoint — e.g. Formspree, Google Forms,
    // or your own API route — before going live. This just simulates success.
    setSubmitted(true)
  }

  return (
    <section id="register" className="border-t border-line px-6 sm:px-[6vw] py-24 sm:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.28em] text-gray flex items-center gap-3 mb-8">
          <span className="w-9 h-px bg-orange inline-block" />
          06 / REGISTER
        </div>

        <h2 className="font-display font-extrabold uppercase text-orange leading-[0.95] tracking-tight text-[clamp(2.2rem,6vw,4.5rem)] mb-4">
          Claim your slot.
        </h2>
        <p className="font-body text-gray text-sm sm:text-base mb-14">
          Teams of 2–4. Registration closes SEPT 5, 2026.
        </p>

        {submitted ? (
          <div className="border border-lineStrong py-16 text-center">
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
    </section>
  )
}