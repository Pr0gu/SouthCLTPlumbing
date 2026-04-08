'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';

const serviceAreas = [
  'Myers Park',
  'SouthPark',
  'Ballantyne',
  'Foxcroft',
  'Eastover',
  'Quail Hollow',
  'Weddington',
  'Marvin',
  'Piper Glen',
  'Matthews',
  'Pineville',
  'Indian Trail',
];

const services = [
  'Leak Detection',
  'Water Heaters',
  'Drain & Sewer',
  'Emergency 24/7',
  'Pipe Repair & Repiping',
  'Sewer Line Repair',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: 'South Charlotte Plumbing',
    url: 'https://southcharlotteplumbing.com',
    telephone: '+19804054186',
    email: 'info@artfixplumbing.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3412 Brooktree Ln',
      addressLocality: 'Indian Trail',
      addressRegion: 'NC',
      postalCode: '28079',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.0768,
      longitude: -80.6593,
    },
    areaServed: [
      { '@type': 'City', name: 'Charlotte', addressRegion: 'NC' },
      { '@type': 'City', name: 'Indian Trail', addressRegion: 'NC' },
      { '@type': 'City', name: 'Matthews', addressRegion: 'NC' },
      { '@type': 'City', name: 'Weddington', addressRegion: 'NC' },
      { '@type': 'City', name: 'Marvin', addressRegion: 'NC' },
      { '@type': 'City', name: 'Pineville', addressRegion: 'NC' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        description: 'Emergency service available 24/7',
        opens: '00:00',
        closes: '23:59',
      },
    ],
    priceRange: '$$',
    image: 'https://southcharlotteplumbing.com/og-image.png',
    sameAs: [],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  };

  return (
    <footer className="bg-brand-dark text-gray-300" role="contentinfo">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + Contact */}
          <div className="lg:col-span-1">
            <Logo size="sm" />
            <p className="mb-6 mt-4 text-sm leading-relaxed text-gray-400">
              South Charlotte&rsquo;s most trusted plumbing service. Licensed, insured, and
              committed to excellence.
            </p>
            <div className="space-y-3">
              <a
                href="tel:9804054186"
                className="flex items-center gap-3 text-sm transition-colors hover:text-brand-gold"
              >
                <Phone className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                980-405-4186
              </a>
              <a
                href="mailto:info@artfixplumbing.com"
                className="flex items-center gap-3 text-sm transition-colors hover:text-brand-gold"
              >
                <Mail className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                info@artfixplumbing.com
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                3412 Brooktree Ln, Indian Trail, NC 28079
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-sm transition-colors hover:text-brand-gold">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Service Areas
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <a href="#areas" className="text-sm transition-colors hover:text-brand-gold">
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Business Hours
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white">Mon - Fri</p>
                  <p>7:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white">Saturday</p>
                  <p>8:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white">Sunday</p>
                  <p>Emergency Service 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {currentYear} South Charlotte Plumbing. All rights reserved. Licensed in NC &amp;
            SC.
          </p>
        </div>
      </div>
    </footer>
  );
}
