import CountUp from './CountUp.jsx'

const STATS = [
  { end: 48, prefix: '', suffix: '', label: 'HOURS' },
  { end: 300, prefix: '', suffix: '+', label: 'HACKERS' },
  { end: 3, prefix: '₹', suffix: 'L', label: 'IN PRIZES' },
  { end: 12, prefix: '', suffix: '', label: 'MENTORS' },
]

export default function About() {
  return (
    <section id="about" className="border-t border-line px-6 sm:px-[6vw] py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.28em] text-gray flex items-center gap-3 mb-8">
          <span className="w-9 h-px bg-orange inline-block" />
          02 / ABOUT
        </div>

        <h2 className="font-display font-extrabold uppercase text-orange leading-[0.95] tracking-tight text-[clamp(2.2rem,6vw,4.5rem)] max-w-3xl">
          Where data meets deadline.
        </h2>

        <p className="font-body text-offwhite/70 text-base sm:text-lg leading-relaxed max-w-2xl mt-8">
          DATAFORGE is a 48-hour national hackathon hosted by the Data Science Club at
          VIT Bhopal. Teams of two to four build real machine-learning and data
          products end-to-end — from raw dataset to working demo — under the
          mentorship of practitioners from industry and academia.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 mt-16 border-t border-line pt-10">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-offwhite">
                <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="font-mono text-[11px] tracking-[0.18em] text-gray mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}