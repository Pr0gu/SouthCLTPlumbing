'use client';

import { ShieldCheck, Clock, Star, ArrowDown } from 'lucide-react';
import QuoteCalculator from '@/components/QuoteCalculator';

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Licensed NC & SC' },
  { icon: Clock, label: '30-Min Response' },
  { icon: Star, label: '5-Star Rated' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative lg:min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Dark overlay — video is global fixed background */}
      <div className="absolute inset-0 bg-brand-dark/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-transparent to-brand-dark/80" />

      {/* Two-column content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
              South Charlotte&rsquo;s
              <br />
              <span className="bg-gradient-to-r from-brand-gold to-brand-gold-light bg-clip-text text-transparent">
                trusted plumber.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg sm:text-xl text-gray-300 leading-relaxed">
              Serving Myers Park, SouthPark, Ballantyne and the rest of South Charlotte&rsquo;s
              finest communities. Licensed, insured, 24/7 emergency. Free estimates, always.
            </p>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-gray-400">
                  <badge.icon className="h-4 w-4 text-brand-gold" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quote Calculator */}
          <div id="quote">
            <QuoteCalculator />
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#services"
          aria-label="Scroll to services"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/30 hover:text-brand-gold hover:border-brand-gold/30 transition-colors"
        >
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
