'use client';

import { Phone, FileText, CheckCircle2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: '6+', label: 'Years Serving Charlotte' },
  { value: '2,400+', label: 'Jobs Completed' },
  { value: '30 min', label: 'Avg. Response Time' },
];

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-brand-dark"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-navy to-brand-dark" />
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-gold/5 blur-3xl" />
        <div className="absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full bg-brand-navy-light/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 md:py-40 lg:px-8 transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Copy */}
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              Your plumber
              <br />
              shouldn&rsquo;t be
              <br />
              <span className="bg-gradient-to-r from-brand-gold to-brand-gold-light bg-clip-text text-transparent">
                a stranger.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300">
              We&rsquo;re the team Myers Park and Ballantyne homeowners call first — and recommend
              to their neighbors. Same-day service, honest pricing, zero surprises.
            </p>

            <ul className="mt-6 space-y-2">
              {[
                'Licensed in NC & SC — not a franchise',
                'On-site within 30–45 minutes, 24/7',
                'You approve the price before we start',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-300">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold"
                    aria-hidden="true"
                  />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:9804054186"
                className="group flex items-center justify-center gap-3 rounded-xl bg-brand-gold px-8 py-4 text-lg font-bold text-white shadow-lg shadow-brand-gold/25 transition-all hover:bg-brand-gold-dark hover:shadow-xl sm:flex-initial"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                980-405-4186
              </a>
              <a
                href="#contact"
                className="group flex items-center justify-center gap-3 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-brand-gold/50 hover:bg-brand-gold/10 sm:flex-initial"
              >
                <FileText className="h-5 w-5" aria-hidden="true" />
                Free Estimate
              </a>
            </div>
          </div>

          {/* Right: Stats + social proof */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-sm"
                >
                  <p className="text-4xl font-extrabold text-brand-gold">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-gray-400">{stat.label}</p>
                </div>
              ))}
              {/* Google review callout */}
              <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 px-8 py-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-brand-gold text-brand-gold"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-300">
                  &ldquo;Called at 10 PM, they were here by 10:35. Fixed our burst pipe and cleaned
                  up everything. These guys are the real deal.&rdquo;
                </p>
                <p className="mt-2 text-xs text-gray-500">— Recent Google Review, Ballantyne</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
