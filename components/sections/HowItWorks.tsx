'use client';

import { Phone, ClipboardCheck, Wrench } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    num: '01',
    icon: Phone,
    title: 'Call or Request Online',
    description:
      'Tell us what\u2019s going on. No scripts, no call centers \u2014 you talk to a real plumber who can diagnose over the phone.',
  },
  {
    num: '02',
    icon: ClipboardCheck,
    title: 'We Show Up & Quote',
    description:
      'A licensed technician arrives within 30\u201345 minutes, inspects the issue, and gives you an exact price. You approve it before any work starts.',
  },
  {
    num: '03',
    icon: Wrench,
    title: 'Fixed Right, Guaranteed',
    description:
      'We complete the repair, clean up, and walk you through what we did. If it\u2019s not right, we come back \u2014 no charge.',
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-transparent" aria-labelledby="how-heading">
      <div className="container-narrow">
        <div
          ref={ref}
          className={`mb-16 text-center transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-gold">
            How It Works
          </p>
          <h2
            id="how-heading"
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            Three steps. No runaround.
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-14 left-[16.5%] right-[16.5%] hidden h-0.5 bg-gradient-to-r from-brand-gold/20 via-brand-gold/40 to-brand-gold/20 md:block"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center text-center transition-all duration-600 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Number circle */}
      <div className="relative z-10 mb-5 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white/[0.05] ring-2 ring-brand-gold/20">
        <span className="text-xs font-bold tracking-widest text-brand-gold">{step.num}</span>
        <step.icon className="mt-1 h-8 w-8 text-white" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
      <p className="max-w-xs text-sm leading-relaxed text-gray-300">{step.description}</p>
    </div>
  );
}
