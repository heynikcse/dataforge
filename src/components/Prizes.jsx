import CountUp from './CountUp.jsx'

const TIERS = [
  { num: '01', label: 'Winner', amount: '₹1,50,000', note: 'Plus internship interviews at partner labs' },
  { num: '02', label: 'Runner-up', amount: '₹80,000', note: 'Plus mentorship from sponsor engineers' },
  { num: '03', label: 'Best Rookie Team', amount: '₹40,000', note: 'For first-time hackathon teams' },
]

export default function Prizes() {
  return (
    <section id="prizes" className="bg-base border-t border-line px-6 sm:px-[6vw] py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.28em] text-gray flex items-center gap-3 mb-8">
          <span className="w-9 h-px bg-orange inline-block" />
          04 / PRIZES
        </div>

        <h2 className="font-display font-extrabold uppercase text-orange leading-[0.95] tracking-tight text-[clamp(2.2rem,6vw,4.5rem)] max-w-3xl mb-16">
          <CountUp end={300000} prefix="₹" animatePrefix duration={2.6} /> on the table.
        </h2>

        <div className="flex flex-col">
          {TIERS.map((t) => (
            <div
              key={t.num}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-8 border-t border-line last:border-b"
            >
              <span className="font-mono text-sm text-gray min-w-[36px]">{t.num}</span>
              <span className="font-display font-bold uppercase text-offwhite text-2xl sm:text-3xl sm:min-w-[280px]">
                {t.label}
              </span>
              <span className="font-display font-extrabold text-orange text-2xl sm:text-3xl sm:ml-auto">
                {t.amount}
              </span>
              <span className="font-body text-sm text-gray sm:max-w-[240px] sm:text-right">
                {t.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}