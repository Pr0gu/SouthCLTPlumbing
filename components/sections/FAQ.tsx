'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { SITE } from '@/lib/constants';

const faqs = [
  {
    q: 'Do you offer free estimates?',
    a: 'Yes — 100% free. We provide a full written estimate before any work begins. You only pay if you accept the quote. No trip fees, no hidden charges.',
  },
  {
    q: 'How fast can you respond to an emergency?',
    a: 'Most emergencies in South Charlotte (Myers Park, SouthPark, Ballantyne, Weddington) are responded to within 30–45 minutes, 24/7.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. We are fully licensed and insured in both North Carolina and South Carolina. Every technician is background-checked and factory-trained.',
  },
  {
    q: 'Is plumbing damage covered by homeowner insurance?',
    a: 'In many cases, yes — sudden and accidental water damage is typically covered by standard homeowner policies. We work with insurance adjusters and provide the documentation needed for your claim.',
  },
  {
    q: 'Do you specialize in historic homes?',
    a: 'Yes. Myers Park and Eastover are full of 1920s–1940s homes with unique plumbing challenges. We specialize in respecting historic character while providing modern solutions.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve all of South Charlotte including Myers Park, SouthPark, Ballantyne, Foxcroft, Eastover, Quail Hollow, Weddington, Marvin, Providence, and surrounding communities.',
  },
  {
    q: 'Do you handle whole-house repiping?',
    a: 'Yes. We repipe entire homes with copper or PEX, protect all finishes, and typically complete jobs in 2–5 days depending on size. Free consultation and quote.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Cash, check, all major credit cards, and financing options for larger jobs. Call ' + SITE.phone + ' for details.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    <section id="faq" className="section-padding" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-gold">FAQ</p>
          <h2 id="faq-heading" className="text-3xl font-extrabold text-white sm:text-4xl">
            Common questions
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 md:items-start">
          <div className="space-y-3">
            {left.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} isOpen={openIndex === i} onToggle={() => toggle(i)} />
            ))}
          </div>
          <div className="space-y-3">
            {right.map((faq, i) => {
              const realIndex = mid + i;
              return (
                <FAQItem key={faq.q} faq={faq} isOpen={openIndex === realIndex} onToggle={() => toggle(realIndex)} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl border bg-white/[0.03] transition-colors duration-200 ${
        isOpen ? 'border-brand-gold/30' : 'border-white/5'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-gold transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed text-gray-300">{faq.a}</p>
        </div>
      )}
    </div>
  );
}
