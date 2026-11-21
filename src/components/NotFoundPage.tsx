import React from 'react';
import { Logo } from './Logo';

// Shared by the no-JavaScript HTTP error document and client-side routing.
export default function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-title" className="min-h-screen bg-[#f8fafc] px-6 py-28 md:py-32 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white border border-slate-100 rounded-3xl p-8 md:p-12 text-center shadow-sm space-y-6">
        <div aria-hidden="true" className="flex justify-center"><Logo size={64} /></div>
        <p className="font-sans font-semibold text-slate-900">Project Luminary</p>
        <p className="font-mono font-bold text-emerald-600 text-lg">404</p>
        <h1 id="not-found-title" className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">Page not found</h1>
        <p className="font-sans text-slate-500 leading-relaxed">We couldn’t find a page at this address. Check the URL or return to the homepage.</p>
        <a href="/" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold px-6 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">Back to homepage</a>
      </div>
    </section>
  );
}
