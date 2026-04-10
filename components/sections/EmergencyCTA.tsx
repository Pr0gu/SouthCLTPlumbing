'use client';

import { Phone, AlertTriangle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function EmergencyCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      aria-label="Emergency plumbing call to action"
    >
      {/* Background effects */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Red/urgent gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-brand-dark to-red-900/20" />
        {/* Animated pulse ring */}
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/10 animate-ping"
          style={{ animationDuration: '3s' }}
        />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/5" />
      </div>

      <div
        ref={ref}
        className={`container-narrow relative text-center transition-all duration-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        {/* Warning icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15 ring-2 ring-red-500/30">
          <AlertTriangle className="h-8 w-8 text-red-400" aria-hidden="true" />
        </div>

        <h2 className="text-balance text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Plumbing Emergency?
          <br />
          <span className="text-red-400">We&rsquo;re On Our Way.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
          Burst pipes, flooding, gas leaks, or sewage backup? Our emergency team responds in 30-45
          minutes, 24 hours a day, 7 days a week.
        </p>

        <a
          href="tel:9804054186"
          className="group mt-8 inline-flex items-center gap-3 rounded-full bg-red-600 px-10 py-5 text-xl font-bold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30"
          aria-label="Call emergency plumbing at 980-405-4186"
        >
          <Phone className="h-6 w-6 animate-pulse" aria-hidden="true" />
          980-405-4186
        </a>

        <p className="mt-4 text-sm text-gray-500">
          Available 24/7 &mdash; including weekends and holidays
        </p>
      </div>
    </section>
  );
}
