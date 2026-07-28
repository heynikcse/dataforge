import BulbHeading from './BulbHeading.jsx'

const SPONSORS = ['NEXORA AI', 'QUANTECH', 'VERTEX LABS', 'PIXEL & CO', 'STRATA DATA', 'HELIX CLOUD']

export default function Sponsors() {
  return (
    <section id="sponsors" className="border-t border-line px-6 sm:px-[6vw] py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.28em] text-gray flex items-center gap-3 mb-8">
          <span className="w-9 h-px bg-orange inline-block" />
          05 / SPONSORS
        </div>

        <BulbHeading
          as="h2" 
          className="font-display font-extrabold uppercase text-orange leading-[0.95] tracking-tight text-[clamp(2.2rem,6vw,4.5rem)] max-w-3xl mb-16"
        >
          Backed by builders.
        </BulbHeading>

        <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-l border-line">
          {SPONSORS.map((s) => (
            <div
              key={s}
              className="sponsor-tile border-r border-b border-line py-12 flex items-center justify-center text-center px-4"
            >
              <span className="font-display font-bold uppercase tracking-wide text-[#F5F5F3] opacity-70 text-sm sm:text-[16px] transition-opacity duration-300">
                {s}
              </span>
            </div>
          ))}
        </div>

        <p className="font-mono text-[11px] text-gray tracking-[0.1em] mt-8">
          INTERESTED IN SPONSORING? WRITE TO SPONSORS@DATAFORGE.EVENT
        </p>
      </div>
    </section>
  )
}