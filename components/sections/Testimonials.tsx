'use client';

import { Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    name: 'John M.',
    area: 'Myers Park',
    rating: 5,
    text: "Two other plumbers told us we needed to tear up the kitchen floor. These guys showed up with detection equipment and found the leak in 40 minutes — it was behind the master bath wall, not under the slab. Saved us about $4,000 and a week of demo. We've used them three times since.",
  },
  {
    name: 'Sarah K.',
    area: 'Ballantyne',
    rating: 5,
    text: "Water heater went out Saturday night. I expected to wait until Monday. They picked up immediately — not a call center, an actual plumber — and someone was at our house in 35 minutes. Diagnosed a failed thermocouple, replaced it on the spot. $280 total. I've recommended them to half my street.",
  },
  {
    name: 'David & Lisa R.',
    area: 'Weddington',
    rating: 5,
    text: 'Whole-house repipe, copper to PEX. 4,000 sq ft, two stories. They covered every floor with drop cloths, cut clean access holes they patched after, and finished a day ahead of schedule. Water pressure went from barely-a-trickle to hotel-shower. Worth every penny.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'fill-brand-gold text-brand-gold' : 'fill-gray-200 text-gray-200'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`flex flex-col rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-600 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <StarRating rating={testimonial.rating} />

      <blockquote className="mt-5 flex-1 text-gray-600 leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
        {/* Avatar placeholder */}
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">
          {testimonial.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div>
          <p className="font-bold text-brand-navy">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.area}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="testimonials"
      className="section-padding bg-white"
      aria-labelledby="testimonials-heading"
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
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="text-balance text-3xl font-extrabold text-brand-navy sm:text-4xl md:text-5xl"
          >
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Don&rsquo;t just take our word for it. Here&rsquo;s what homeowners across South
            Charlotte have to say about our work.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
