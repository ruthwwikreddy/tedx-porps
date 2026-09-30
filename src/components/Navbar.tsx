'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/data/event';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Home',       href: '#home' },
    { label: 'Speakers',   href: '#speakers' },
    { label: 'Schedule',   href: '#schedule' },
    { label: 'Partners',   href: '#partners' },
    { label: 'FAQ',        href: '#faq' },
    { label: 'Contact',    href: '#contact' },
  ];

  const allLinks = [
    { label: 'Home',       href: '#home' },
    { label: 'About',      href: '#about' },
    { label: 'Theme',      href: '#theme' },
    { label: 'Speakers',   href: '#speakers' },
    { label: 'Schedule',   href: '#schedule' },
    { label: 'Experience', href: '#experience' },
    { label: 'Organizers', href: '#organizers' },
    { label: 'Partners',   href: '#partners' },
    { label: 'FAQ',        href: '#faq' },
    { label: 'Contact',    href: '#contact' },
  ];

  return (
    <>
      {/* Floating Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-5 transition-all duration-300 pointer-events-none">
        <div className="max-w-6xl mx-auto">
          <div
            className={`pointer-events-auto flex items-center justify-between px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl transition-all duration-500 bg-[#0c0c0f]/60 backdrop-blur-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${
              isScrolled
                ? 'bg-[#0a0a0d]/85 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10'
                : 'hover:bg-[#0c0c0f]/75'
            }`}
          >
            {/* Logo — TEDx + PORPS YOUTH on single line */}
            <Link
              href="#home"
              className="flex items-center gap-0 group focus:outline-none flex-shrink-0"
              aria-label="TEDxPORPS Youth Home"
            >
              <div className="flex items-baseline leading-none whitespace-nowrap">
                <span className="text-[1.6rem] sm:text-[1.75rem] font-black tracking-tight text-[#eb0028] uppercase font-sans leading-none">
                  TED
                </span>
                <span className="text-[1.6rem] sm:text-[1.75rem] font-black tracking-tight text-[#eb0028] lowercase font-sans leading-none">
                  x
                </span>
                <span className="ml-2 text-[0.7rem] sm:text-[0.75rem] font-bold tracking-widest text-white/90 group-hover:text-white transition-colors uppercase translate-y-[2px] whitespace-nowrap">
                  PORPS YOUTH
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-0.5 mx-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-2.5 py-1.5 text-[0.68rem] font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right CTA buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {EVENT_CONFIG.BOOKING_ENABLED && (
                <Link
                  href="/tickets"
                  className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-[0.68rem] font-mono uppercase tracking-widest text-white bg-[#eb0028] hover:bg-[#c5001f] rounded-xl transition-all font-bold shadow-[0_0_15px_rgba(235,0,40,0.25)] whitespace-nowrap"
                >
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Tickets
                </Link>
              )}

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-center text-white focus:outline-none transition-all hover:scale-105 active:scale-95"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-[#0a0a0c]/98 backdrop-blur-3xl p-6 sm:p-12 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          {/* Drawer header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 max-w-4xl mx-auto w-full">
            <div className="flex items-baseline whitespace-nowrap">
              <span className="text-2xl font-black uppercase tracking-tight text-[#eb0028] leading-none">TED</span>
              <span className="text-2xl font-black text-[#eb0028] lowercase leading-none">x</span>
              <span className="ml-2 text-xs font-bold text-neutral-300 tracking-widest uppercase translate-y-[2px]">PORPS YOUTH</span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links grid */}
          <div className="py-8 max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allLinks.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="p-4 rounded-xl flex items-center justify-between border border-neutral-800/90 bg-neutral-900/60 hover:bg-neutral-800/80 hover:border-[#eb0028]/50 text-neutral-200 hover:text-white transition-all shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#eb0028] font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </div>
                <span className="text-neutral-500 group-hover:text-[#eb0028] transition-colors">&rarr;</span>
              </Link>
            ))}
          </div>

          {/* Drawer footer */}
          <div className="pt-6 border-t border-white/10 max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            {EVENT_CONFIG.BOOKING_ENABLED && (
              <Link
                href="/tickets"
                onClick={() => setMenuOpen(false)}
                className="py-3 px-6 rounded-xl bg-[#eb0028] hover:bg-[#c5001f] text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Book Ticket — ₹1200
              </Link>
            )}
            <div className="text-xs font-mono text-neutral-500">
              {EVENT_CONFIG.dateText} • Hyderabad • {EVENT_CONFIG.schoolName}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
