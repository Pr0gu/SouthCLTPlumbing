'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-dark px-4">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-red-400 mb-3">Error</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          We&rsquo;re sorry for the inconvenience. Please try again or call us at{' '}
          <a href="tel:+19804054186" className="text-brand-gold hover:underline font-bold">
            980-405-4186
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-gold-light"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
