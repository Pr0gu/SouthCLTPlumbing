'use client';

import { useInView } from 'react-intersection-observer';

const neighborhoods = [
  {
    name: 'Myers Park & Eastover',
    challenge: 'Historic homes, 1920s–1940s plumbing',
    details:
      'Galvanized supply lines that corrode and leak. Cast iron drain lines that crack and root-invade. We specialize in careful repiping that respects historic character.',
  },
  {
    name: 'SouthPark & Foxcroft',
    challenge: 'Mature tree root intrusion',
    details:
      'Decades of landscaping means root growth and scale buildup are the top causes of sewer backups here. We use HD camera inspection and hydro jetting to clear them.',
  },
  {
    name: 'Ballantyne & Weddington',
    challenge: 'Slab leaks + soil movement',
    details:
      'Newer slab foundations paired with Piedmont clay soil means slab leaks happen. Our acoustic and thermal detection finds them without breaking up your floors.',
  },
  {
    name: 'Marvin & Waxhaw',
    challenge: 'Well water + hard minerals',
    details:
      'Hard water wears out water heaters 30% faster and causes scale buildup in fixtures. We install softeners and tankless systems built to last.',
  },
];

export default function LocalExpertise() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding" aria-labelledby="local-heading">
      <div className="container-narrow">
        <div
          ref={ref}
          className={`mb-14 text-center transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-gold">
            Local Expertise
          </p>
          <h2
            id="local-heading"
            className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
          >
            Why South Charlotte homes are different.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Myers Park bungalows, SouthPark estates, Ballantyne slabs, Weddington wells \u2014
            each neighborhood has its own plumbing challenges. We know them all.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {neighborhoods.map((n, i) => (
            <NeighborhoodCard key={n.name} neighborhood={n} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NeighborhoodCard({
  neighborhood,
  index,
}: {
  neighborhood: (typeof neighborhoods)[number];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:border-brand-gold/30 hover:bg-white/[0.05] ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
        {neighborhood.challenge}
      </p>
      <h3 className="mb-3 text-xl font-bold text-white">{neighborhood.name}</h3>
      <p className="text-sm leading-relaxed text-gray-300">{neighborhood.details}</p>
    </div>
  );
}
