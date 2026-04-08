'use client';

import { MapPin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const areas = [
  'Myers Park',
  'SouthPark',
  'Ballantyne',
  'Foxcroft',
  'Eastover',
  'Quail Hollow',
  'Montibello',
  'Mountainbrook',
  'Weddington',
  'Marvin',
  'Piper Glen',
  'Providence Plantation',
  'Olde Providence',
  'Barclay Downs',
  'Hembstead',
  "Governor's Square",
  'Pineville',
  'Matthews',
];

function AreaBadge({ name, index }: { name: string; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group flex items-center gap-3 rounded-xl border border-brand-navy/10 bg-white px-5 py-4 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-gold/30 hover:shadow-md ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${(index % 9) * 60}ms` }}
    >
      <MapPin
        className="h-4 w-4 shrink-0 text-brand-gold transition-transform group-hover:scale-110"
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-brand-navy">{name}</span>
    </div>
  );
}

export default function ServiceAreas() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="areas"
      className="section-padding relative overflow-hidden bg-brand-cream"
      aria-labelledby="areas-heading"
    >
      {/* Decorative background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-brand-gold/5 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-brand-navy/5 blur-3xl" />
      </div>

      <div className="container-narrow relative">
        {/* Section header */}
        <div
          ref={ref}
          className={`mb-14 text-center transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-gold">
            Service Areas
          </p>
          <h2
            id="areas-heading"
            className="text-balance text-3xl font-extrabold text-brand-navy sm:text-4xl md:text-5xl"
          >
            Proudly Serving South Charlotte&rsquo;s
            <br className="hidden sm:block" /> Finest Communities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            From the tree-lined streets of Myers Park to the growing communities of Weddington and
            Marvin, we provide premium plumbing service to Charlotte&rsquo;s most distinguished
            neighborhoods.
          </p>
        </div>

        {/* Areas grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {areas.map((area, i) => (
            <AreaBadge key={area} name={area} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&rsquo;t see your neighborhood?{' '}
          <a
            href="tel:9804054186"
            className="font-semibold text-brand-gold transition-colors hover:text-brand-gold-dark"
          >
            Call us
          </a>{' '}
          — we likely serve your area too.
        </p>
      </div>
    </section>
  );
}
