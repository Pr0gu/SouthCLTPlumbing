'use client';

import { useState } from 'react';
import {
  Phone,
  Siren,
  Droplets,
  Wrench,
  Flame,
  Zap,
  Construction,
  PipetteIcon,
  Camera,
  Waves,
  Layers,
  Clock,
  Timer,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { formatPhoneNumber } from '@/lib/validations';
import { SITE } from '@/lib/constants';

/* ── Service categories (full plumbing, south Charlotte) ── */
const categories = [
  {
    id: 'emergency',
    name: 'Emergency',
    description: 'Urgent repairs',
    Icon: Siren,
    services: [
      { id: 'burst-pipe', name: 'Burst Pipe', description: 'Immediate response', Icon: AlertTriangle },
      { id: 'flooding', name: 'Flooding / Water Damage', description: 'Water mitigation', Icon: Droplets },
      { id: 'no-water', name: 'No Water', description: 'Restore water flow', Icon: Zap },
      { id: 'gas-leak', name: 'Gas Leak', description: 'Emergency response', Icon: Siren },
    ],
  },
  {
    id: 'drain-sewer',
    name: 'Drain & Sewer',
    description: 'Clogs & backups',
    Icon: PipetteIcon,
    services: [
      { id: 'drain-cleaning', name: 'Drain Cleaning', description: 'Clear clogs fast', Icon: PipetteIcon },
      { id: 'main-sewer', name: 'Main Sewer Line', description: 'Repair or replace', Icon: Construction },
      { id: 'hydro-jetting', name: 'Hydro Jetting', description: 'Deep cleaning', Icon: Waves },
      { id: 'camera-inspection', name: 'Camera Inspection', description: 'Diagnose the issue', Icon: Camera },
    ],
  },
  {
    id: 'repairs',
    name: 'Repairs & Fixes',
    description: 'Leaks & fixtures',
    Icon: Wrench,
    services: [
      { id: 'leak-repair', name: 'Leak Detection & Repair', description: 'Find & stop leaks', Icon: Droplets },
      { id: 'faucet', name: 'Faucet Repair / Replace', description: 'Fix drips & flow', Icon: Wrench },
      { id: 'toilet', name: 'Toilet Repair', description: 'Running or leaking', Icon: Wrench },
      { id: 'pipe-repair', name: 'Pipe Repair / Repiping', description: 'Full pipe service', Icon: Layers },
    ],
  },
  {
    id: 'water-heaters',
    name: 'Water Heaters',
    description: 'Repair & install',
    Icon: Flame,
    services: [
      { id: 'heater-repair', name: 'Water Heater Repair', description: 'No hot water fix', Icon: Flame },
      { id: 'heater-replace', name: 'Water Heater Replacement', description: 'Full installation', Icon: Flame },
      { id: 'tankless', name: 'Tankless Water Heater', description: 'Endless hot water', Icon: Flame },
      { id: 'heater-maintenance', name: 'Maintenance / Flush', description: 'Extend lifespan', Icon: Wrench },
    ],
  },
];

const urgencyOptions = [
  { id: 'routine', label: 'Routine', description: 'Within 1–2 days', Icon: Clock },
  { id: 'priority', label: 'Priority', description: 'Within 24 hours', Icon: Timer },
  { id: 'urgent', label: 'Urgent', description: 'Same day', Icon: Zap },
  { id: 'emergency', label: 'Emergency', description: 'Immediate help', Icon: Siren },
];

type Step = 'category' | 'service' | 'urgency' | 'contact';

interface SelectedCategory { id: string; name: string; services: typeof categories[0]['services'] }
interface SelectedService { id: string; name: string }

export default function QuoteCalculator() {
  const [step, setStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory | null>(null);
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', message: '', website: '' });
  const [formLoadedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleBack = () => {
    if (step === 'contact') setStep('urgency');
    else if (step === 'urgency') { setStep('service'); setSelectedService(null); }
    else if (step === 'service') { setStep('category'); setSelectedCategory(null); }
  };

  const handleReset = () => {
    setStep('category');
    setSelectedCategory(null);
    setSelectedService(null);
    setSelectedUrgency('');
    setForm({ name: '', phone: '', email: '', address: '', message: '', website: '' });
    setSubmitted(false);
    setError('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === 'phone' ? formatPhoneNumber(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) { setError('Enter a valid 10-digit phone number'); setSubmitting(false); return; }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          service: selectedService?.name || '',
          urgency: selectedUrgency,
          _formLoadedAt: formLoadedAt,
        }),
      });
      if (res.ok) { setSubmitted(true); }
      else { const d = await res.json(); throw new Error(d.error || 'Failed to send'); }
    } catch (err) {
      setError(`${err instanceof Error ? err.message : 'Failed to send'}. Call ${SITE.phone}.`);
    } finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="flex flex-col justify-center rounded-2xl border border-brand-gold/30 bg-white/95 backdrop-blur-md p-8 min-h-[420px] sm:min-h-[520px] shadow-2xl">
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-600" />
          <h3 className="text-xl font-bold text-brand-navy mb-2">Request Sent!</h3>
          <p className="text-sm text-gray-600 mb-4">We&rsquo;ll respond within 2 hours during business hours.</p>
          <div className="rounded-xl bg-brand-cream p-4 mb-4 text-left">
            <p className="text-xs font-semibold text-brand-navy mb-2">Your FREE estimate includes:</p>
            <ul className="space-y-1.5 text-xs text-gray-600">
              {['Full inspection of your plumbing issue', 'Detailed written quote — all costs upfront', 'No obligation — zero pressure to proceed'].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-green-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Need immediate help?{' '}
            <a href={SITE.phoneHref} className="font-bold text-brand-gold hover:underline">{SITE.phone}</a>
          </p>
          <button onClick={handleReset} className="text-sm text-brand-gold hover:underline">Submit another request</button>
        </div>
      </div>
    );
  }

  const stepNum = step === 'category' ? 1 : step === 'service' ? 2 : step === 'urgency' ? 3 : 4;

  return (
    <div className="flex flex-col rounded-2xl border border-brand-gold/30 bg-white/95 backdrop-blur-md p-6 sm:p-8 min-h-[420px] sm:min-h-[520px] shadow-2xl">
      {/* Header */}
      <div className="mb-1 text-center">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-700">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          100% Free
        </div>
        <h3 className="text-xl font-bold text-brand-navy">
          {step === 'contact' ? 'Almost Done!' : 'Get Your Free Quote'}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Step {stepNum} of 4:{' '}
          {step === 'category' && 'Select service category'}
          {step === 'service' && 'Choose specific service'}
          {step === 'urgency' && 'When do you need service?'}
          {step === 'contact' && 'Your contact information'}
        </p>
        <div className="mt-3 h-1 w-full rounded-full bg-brand-navy/10">
          <div
            className="h-1 rounded-full bg-brand-gold transition-all duration-300"
            style={{ width: `${stepNum * 25}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        {step === 'category' && (
          <div className="grid grid-cols-2 gap-3 flex-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => { setSelectedCategory(cat); setStep('service'); }}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-brand-navy/10 bg-brand-cream/50 p-4 text-center transition-all hover:border-brand-gold/40 hover:bg-brand-gold/5"
              >
                <cat.Icon className="h-8 w-8 text-brand-navy" />
                <span className="text-sm font-bold text-brand-navy">{cat.name}</span>
                <span className="text-xs text-gray-500">{cat.description}</span>
              </button>
            ))}
          </div>
        )}

        {step === 'service' && selectedCategory && (
          <>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {selectedCategory.services.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => { setSelectedService(svc); setStep('urgency'); }}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-brand-navy/10 bg-brand-cream/50 p-4 text-center transition-all hover:border-brand-gold/40 hover:bg-brand-gold/5"
                >
                  <svc.Icon className="h-8 w-8 text-brand-navy" />
                  <span className="text-sm font-bold text-brand-navy">{svc.name}</span>
                  <span className="text-xs text-gray-500">{svc.description}</span>
                </button>
              ))}
            </div>
            <button type="button" onClick={handleBack} className="mt-3 flex items-center gap-1 text-sm text-gray-500 hover:text-brand-gold">
              <ArrowLeft className="h-3 w-3" /> Back
            </button>
          </>
        )}

        {step === 'urgency' && (
          <>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {urgencyOptions.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => { setSelectedUrgency(u.id); setStep('contact'); }}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-brand-navy/10 bg-brand-cream/50 p-4 text-center transition-all hover:border-brand-gold/40 hover:bg-brand-gold/5"
                >
                  <u.Icon className="h-8 w-8 text-brand-navy" />
                  <span className="text-sm font-bold text-brand-navy">{u.label}</span>
                  <span className="text-xs text-gray-500">{u.description}</span>
                </button>
              ))}
            </div>
            <button type="button" onClick={handleBack} className="mt-3 flex items-center gap-1 text-sm text-gray-500 hover:text-brand-gold">
              <ArrowLeft className="h-3 w-3" /> Back
            </button>
          </>
        )}

        {step === 'contact' && (
          <>
            {error && (
              <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleInput}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] opacity-0"
              />
              <div>
                <label htmlFor="calc-name" className="mb-1 block text-xs font-semibold text-brand-navy">Full Name *</label>
                <input id="calc-name" name="name" required value={form.name} onChange={handleInput}
                  className="w-full rounded-lg border border-brand-navy/20 bg-white px-3 py-2.5 text-sm text-brand-navy placeholder:text-gray-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                  placeholder="Your full name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="calc-phone" className="mb-1 block text-xs font-semibold text-brand-navy">Phone *</label>
                  <input id="calc-phone" name="phone" type="tel" required value={form.phone} onChange={handleInput}
                    className="w-full rounded-lg border border-brand-navy/20 bg-white px-3 py-2.5 text-sm text-brand-navy placeholder:text-gray-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                    placeholder="(980) 555-0123" />
                </div>
                <div>
                  <label htmlFor="calc-email" className="mb-1 block text-xs font-semibold text-brand-navy">Email *</label>
                  <input id="calc-email" name="email" type="email" required value={form.email} onChange={handleInput}
                    className="w-full rounded-lg border border-brand-navy/20 bg-white px-3 py-2.5 text-sm text-brand-navy placeholder:text-gray-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                    placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="calc-address" className="mb-1 block text-xs font-semibold text-brand-navy">Service Address *</label>
                <input id="calc-address" name="address" required value={form.address} onChange={handleInput}
                  className="w-full rounded-lg border border-brand-navy/20 bg-white px-3 py-2.5 text-sm text-brand-navy placeholder:text-gray-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                  placeholder="Street, City, State" />
              </div>
              <div>
                <label htmlFor="calc-message" className="mb-1 block text-xs font-semibold text-brand-navy">Describe Your Issue *</label>
                <textarea id="calc-message" name="message" required rows={2} value={form.message} onChange={handleInput}
                  className="w-full rounded-lg border border-brand-navy/20 bg-white px-3 py-2.5 text-sm text-brand-navy placeholder:text-gray-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20 resize-none"
                  placeholder="What are you experiencing?" />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={handleBack}
                  className="rounded-lg border border-brand-navy/20 px-4 py-2.5 text-sm font-semibold text-brand-navy hover:border-brand-gold/40 hover:text-brand-gold transition">
                  <ArrowLeft className="inline h-3 w-3 mr-1" />Back
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 rounded-lg bg-brand-gold py-2.5 text-sm font-bold text-white transition hover:bg-brand-gold-dark disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? 'Sending...' : 'Get Your Quote'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {step !== 'contact' && (
        <div className="mt-auto space-y-2 pt-4">
          <a
            href={SITE.phoneHref}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-navy py-3 text-sm font-bold text-white transition hover:bg-brand-navy-light"
          >
            <Phone className="h-4 w-4" />
            Call for Emergencies: {SITE.phone}
          </a>
          <p className="text-center text-xs text-gray-500">
            Or continue for a <strong className="text-brand-navy">written quote</strong>
          </p>
        </div>
      )}
    </div>
  );
}
