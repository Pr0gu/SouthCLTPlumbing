'use client';

import {
  DollarSign,
  Ear,
  Droplets,
  Wind,
  TrendingDown,
  Gauge,
  ThermometerSun,
  AlertTriangle,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const signs = [
  { icon: DollarSign, text: 'Unexpected spike in your water bill' },
  { icon: Ear, text: 'Sound of running water when nothing is on' },
  { icon: Droplets, text: 'Wet or damp spots on floors, walls, or ceilings' },
  { icon: Wind, text: 'Musty or mold smell in a specific area' },
  { icon: AlertTriangle, text: 'Cracks forming in your foundation or walls' },
  { icon: Gauge, text: 'Water meter spinning when all fixtures are off' },
  { icon: TrendingDown, text: 'Noticeable drop in water pressure' },
  { icon: ThermometerSun, text: 'Warm spots on your floor (hot water line leak)' },
];

export default function WarningSigns() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding overflow-hidden" aria-labelledby="signs-heading">
      <div className="container-narrow">
        <div
          ref={ref}
          className={`mb-14 text-center transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-red-500">
            Warning Signs
          </p>
          <h2 id="signs-heading" className="text-3xl font-extrabold text-white sm:text-4xl">
            Think you might have a leak?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            If you notice any of these, call us for a free assessment. Early detection
            saves thousands in repair costs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {signs.map((sign, i) => (
            <SignCard key={sign.text} sign={sign} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400">
            Not sure? Try this:{' '}
            <a href="#diy-test" className="font-semibold text-brand-gold hover:underline">
              run a free water meter test yourself
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function SignCard({ sign, index }: { sign: (typeof signs)[number]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 hover:border-red-400/30 hover:bg-white/[0.05] ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
        <sign.icon className="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <p className="text-sm leading-relaxed text-gray-200">{sign.text}</p>
    </div>
  );
}
