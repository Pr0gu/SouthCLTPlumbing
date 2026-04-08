'use client';

import { Phone, FileText, Shield, Clock, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const trustBadges = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Clock, label: '24/7 Emergency' },
  { icon: Star, label: '5-Star Rated' },
];

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-brand-dark"
      aria-label="Hero"
    >
      {/* Background gradient + geometric shapes */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-navy to-brand-dark" />

        {/* Geometric accent shapes */}
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-gold/5 blur-3xl" />
        <div className="absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full bg-brand-navy-light/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-72 w-72 rotate-45 rounded-3xl border border-brand-gold/10" />
        <div className="absolute bottom-1/4 left-1/3 h-48 w-48 rotate-12 rounded-2xl border border-white/5" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 md:py-40 lg:px-8 transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-sm font-medium text-brand-gold">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" aria-hidden="true" />
            Serving South Charlotte Since 2020
          </div>

          {/* Headline */}
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            South Charlotte&rsquo;s Most{' '}
            <span className="bg-gradient-to-r from-brand-gold to-brand-gold-light bg-clip-text text-transparent">
              Trusted Plumber
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            Licensed, insured, and locally owned. From emergency repairs to whole-house repiping, we
            deliver premium plumbing service to Charlotte&rsquo;s finest neighborhoods.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:9804054186"
              className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-brand-gold px-8 py-4 text-lg font-bold text-white shadow-lg shadow-brand-gold/25 transition-all hover:bg-brand-gold-dark hover:shadow-xl hover:shadow-brand-gold/30 sm:flex-initial"
            >
              <Phone
                className="h-5 w-5 transition-transform group-hover:scale-110"
                aria-hidden="true"
              />
              Call Now
            </a>
            <a
              href="#contact"
              className="group flex flex-1 items-center justify-center gap-3 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-brand-gold/50 hover:bg-brand-gold/10 sm:flex-initial"
            >
              <FileText
                className="h-5 w-5 transition-transform group-hover:scale-110"
                aria-hidden="true"
              />
              Get Free Estimate
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap gap-8">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/15">
                  <badge.icon className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-gray-300">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
