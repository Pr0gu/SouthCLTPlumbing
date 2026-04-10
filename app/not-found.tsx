import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-dark px-4">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold mb-3">404</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Page not found</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-gold-light"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
