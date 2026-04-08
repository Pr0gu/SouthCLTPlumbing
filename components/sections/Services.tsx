'use client';

import { Droplets, Flame, PipetteIcon, Siren, Wrench, Construction } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    icon: Droplets,
    title: 'Leak Detection',
    description:
      'Advanced technology to locate hidden leaks, slab leaks, and pipe leaks without tearing up your home. Save water and prevent costly damage.',
  },
  {
    icon: Flame,
    title: 'Water Heaters',
    description:
      'Expert repair, replacement, and installation. Traditional and tankless systems from all major brands. Same-day service available.',
  },
  {
    icon: PipetteIcon,
    title: 'Drain & Sewer',
    description:
      'Professional drain cleaning, hydro jetting, and camera inspection. We clear the toughest clogs and diagnose hidden sewer problems.',
  },
  {
    icon: Siren,
    title: 'Emergency 24/7',
    description:
      'Burst pipes, flooding, and urgent repairs handled fast. Our team arrives in 30-45 minutes, any time of day or night.',
  },
  {
    icon: Wrench,
    title: 'Pipe Repair & Repiping',
    description:
      'Whole-house repiping with copper or PEX. We fix leaky, corroded, or outdated pipes to restore full water pressure and quality.',
  },
  {
    icon: Construction,
    title: 'Sewer Line Repair',
    description:
      'Full sewer line replacement and trenchless repair options that minimize disruption to your yard and landscaping.',
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-xl ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gold top accent on hover */}
      <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-gold to-brand-gold-light transition-transform duration-300 group-hover:scale-x-100" />

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-navy/5 transition-colors group-hover:bg-brand-gold/10">
        <service.icon
          className="h-7 w-7 text-brand-navy transition-colors group-hover:text-brand-gold"
          aria-hidden="true"
        />
      </div>

      <h3 className="mb-3 text-xl font-bold text-brand-navy">{service.title}</h3>

      <p className="leading-relaxed text-gray-600">{service.description}</p>

      <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-brand-gold opacity-0 transition-opacity group-hover:opacity-100">
        Learn More
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="services"
      className="section-padding bg-brand-cream"
      aria-labelledby="services-heading"
    >
      <div className="container-narrow">
        {/* Section header */}
        <div
          ref={ref}
          className={`mb-16 text-center transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-gold">
            Our Services
          </p>
          <h2
            id="services-heading"
            className="text-balance text-3xl font-extrabold text-brand-navy sm:text-4xl md:text-5xl"
          >
            Full-Service Plumbing Solutions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            From routine maintenance to complex repairs, our licensed technicians handle every
            plumbing need with precision and care.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
