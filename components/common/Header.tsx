'use client';

import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Areas', href: '#areas' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" aria-label="South Charlotte Plumbing - Back to top">
          <Logo size="sm" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-brand-gold ${
                scrolled ? 'text-brand-navy' : 'text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="tel:9804054186"
          className="hidden items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-brand-gold-dark hover:shadow-xl md:flex"
          aria-label="Call us at 980-405-4186"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span>980-405-4186</span>
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`rounded-lg p-2 transition-colors md:hidden ${
            scrolled ? 'text-brand-navy hover:bg-brand-navy/10' : 'text-white hover:bg-white/10'
          }`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-brand-navy transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <Logo size="sm" />
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-6 px-6 pt-12" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-xl font-semibold text-white transition-colors hover:text-brand-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:9804054186"
            onClick={handleNavClick}
            className="mt-4 flex items-center gap-3 rounded-full bg-brand-gold px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-gold-dark"
            aria-label="Call us at 980-405-4186"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span>980-405-4186</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
