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
  return (
    <section id="schedule" className="border-t border-line px-6 sm:px-[6vw] py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.28em] text-gray flex items-center gap-3 mb-8">
          <span className="w-9 h-px bg-orange inline-block" />
          03 / SCHEDULE
        </div>

        <h2 className="font-display font-extrabold uppercase text-orange leading-[0.95] tracking-tight text-[clamp(2.2rem,6vw,4.5rem)] max-w-3xl mb-16">
          48 hours, mapped out.
        </h2>

        <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">
          {DAYS.map((d) => (
            <div key={d.day}>
              <div className="flex items-baseline justify-between border-b border-lineStrong pb-4 mb-2">
                <span className="font-display font-bold uppercase text-offwhite text-lg tracking-wide">
                  {d.day}
                </span>
                <span className="font-mono text-[11px] text-gray">{d.date}</span>
              </div>
              {d.events.map(([time, label]) => (
                <div
                  key={time}
                  className="flex items-baseline gap-4 py-3 border-b border-line"
                >
                  <span className="font-mono text-[11px] text-orange min-w-[42px]">{time}</span>
                  <span className="font-body text-sm text-offwhite/80">{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}