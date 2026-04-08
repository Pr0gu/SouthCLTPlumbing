'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const serviceOptions = [
  'Leak Detection',
  'Water Heater Repair / Replacement',
  'Drain & Sewer Cleaning',
  'Emergency Plumbing',
  'Pipe Repair & Repiping',
  'Sewer Line Repair',
  'Other',
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputBase =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-brand-dark placeholder:text-gray-400 transition-all focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:outline-none';
  const errorClass = 'border-red-300 focus:border-red-400 focus:ring-red-200/30';

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-brand-cream"
      aria-labelledby="contact-heading"
    >
      {/* Decorative background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-gold/5 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-navy/5 blur-3xl" />
      </div>

      <div className="container-narrow relative">
        <div className="mx-auto max-w-3xl">
          {/* Section header */}
          <div
            ref={sectionRef}
            className={`mb-12 text-center transition-all duration-700 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-gold">
              Get In Touch
            </p>
            <h2
              id="contact-heading"
              className="text-balance text-3xl font-extrabold text-brand-navy sm:text-4xl md:text-5xl"
            >
              Request a Free Estimate
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
              Fill out the form below and we&rsquo;ll get back to you within 30 minutes during
              business hours. For emergencies, call us directly.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={`space-y-5 rounded-2xl border border-gray-200/80 bg-white p-8 shadow-lg sm:p-10 transition-all duration-700 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Name + Phone row */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-semibold text-brand-navy"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  className={`${inputBase} ${errors.name ? errorClass : ''}`}
                  {...register('name', { required: 'Name is required' })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-semibold text-brand-navy"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(980) 555-0123"
                  className={`${inputBase} ${errors.phone ? errorClass : ''}`}
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[\d\s()+-]{7,20}$/,
                      message: 'Enter a valid phone number',
                    },
                  })}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-brand-navy">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={`${inputBase} ${errors.email ? errorClass : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Service dropdown */}
            <div>
              <label
                htmlFor="service"
                className="mb-1.5 block text-sm font-semibold text-brand-navy"
              >
                Service Needed <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat ${errors.service ? errorClass : ''}`}
                defaultValue=""
                {...register('service', { required: 'Please select a service' })}
                aria-invalid={errors.service ? 'true' : 'false'}
              >
                <option value="" disabled>
                  Select a service...
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-sm text-red-500" role="alert">
                  {errors.service.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-semibold text-brand-navy"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about your plumbing issue..."
                className={`${inputBase} resize-none`}
                {...register('message')}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-brand-gold px-8 py-4 text-lg font-bold text-white shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Send
                    className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  Send Request
                </>
              )}
            </button>

            {/* Status messages */}
            {status === 'success' && (
              <div
                className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700"
                role="alert"
              >
                <CheckCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <p className="text-sm font-medium">
                  Thank you! We&rsquo;ve received your request and will get back to you shortly.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div
                className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700"
                role="alert"
              >
                <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <p className="text-sm font-medium">
                  Something went wrong. Please call us at{' '}
                  <a href="tel:9804054186" className="font-bold underline">
                    980-405-4186
                  </a>{' '}
                  instead.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
