'use client';

import { Phone, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-navy/10 bg-white/95 backdrop-blur-md px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden">
      <div className="flex gap-3">
        <a
          href="tel:9804054186"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gold py-3.5 text-sm font-bold text-white shadow-md"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Now
        </a>
        <a
          href="#contact"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-navy py-3.5 text-sm font-bold text-white shadow-md"
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Free Quote
        </a>
      </div>
    </div>
  );
}
