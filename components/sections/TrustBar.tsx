'use client';

import { Star, ShieldCheck, Clock, Award, DollarSign } from 'lucide-react';

const badges = [
  { Icon: Star, label: '4.9 / 5 Google', sub: '100+ reviews' },
  { Icon: Award, label: 'Licensed NC & SC', sub: 'Fully insured' },
  { Icon: Clock, label: '24/7 Emergency', sub: '30-45 min arrival' },
  { Icon: DollarSign, label: 'No Trip Fee', sub: 'Free estimates' },
  { Icon: ShieldCheck, label: 'Since 2020', sub: '6 years in business' },
];

export default function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-brand-dark/50 py-6" aria-label="Trust signals">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10">
                <b.Icon className="h-4 w-4 text-brand-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">{b.label}</p>
                <p className="text-xs text-gray-400 leading-tight">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
