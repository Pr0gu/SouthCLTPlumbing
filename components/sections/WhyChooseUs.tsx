'use client';

import { ShieldCheck, Timer, DollarSign, Home } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const differentiators = [
  {
    icon: ShieldCheck,
    title: 'Licensed & Insured in NC & SC',
    description:
      'Fully licensed and insured across both Carolinas. Every technician is background-checked, drug-tested, and factory-trained to deliver the highest standard of work.',
  },
  {
    icon: Timer,
    title: '30-45 Min Response Time',
    description:
      'When you have a plumbing emergency, every minute counts. Our local team is strategically positioned throughout South Charlotte for rapid response.',
  },
  {
    icon: DollarSign,
    title: 'Upfront Pricing, No Hidden Fees',
    description:
      'You approve the price before we start. No surprise charges, no hourly billing games. What we quote is what you pay — guaranteed.',
  },
  {
    icon: Home,
    title: 'Locally Owned Since 2020',
    description:
      'We live and work in South Charlotte. This is our community, and our reputation depends on treating every customer like a neighbor.',
  },
];

function DifferentiatorCard({
  item,
  index,
}: {
  item: (typeof differentiators)[number];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center text-center transition-all duration-600 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Icon circle */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-gold/10 ring-1 ring-brand-gold/20">
        <item.icon className="h-9 w-9 text-brand-gold" aria-hidden="true" />
      </div>

      <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
      <p className="max-w-xs leading-relaxed text-gray-300">{item.description}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-us" className="section-padding bg-transparent" aria-labelledby="why-us-heading">
      <div className="container-narrow">
        {/* Section header */}
        <div
          ref={ref}
          className={`mb-16 text-center transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-gold">
            Why Choose Us
          </p>
          <h2
            id="why-us-heading"
            className="text-balance text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
          >
            The South Charlotte Difference
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            We&rsquo;re not a franchise. We&rsquo;re your neighbors — and we bring the
            professionalism of a national brand with the care of a local family business.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, i) => (
            <DifferentiatorCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
