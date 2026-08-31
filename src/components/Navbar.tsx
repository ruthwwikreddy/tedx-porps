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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Theme', href: '#theme' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Experience', href: '#experience' },
    { label: 'Organizers', href: '#organizers' },
    { label: 'Partners', href: '#partners' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Floating Navbar Container */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-6 transition-all duration-300 pointer-events-none">
        <div className="max-w-6xl mx-auto">
          {/* Translucent Frosted Glassmorphic Container with Blur */}
          <div
            className={`pointer-events-auto flex items-center justify-between px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl transition-all duration-500 bg-[#0c0c0f]/60 backdrop-blur-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${
              isScrolled
                ? 'bg-[#0a0a0d]/80 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10'
                : 'hover:bg-[#0c0c0f]/75'
            }`}
          >
            {/* Official TEDx Wordmark: Regular lowercase x + Subscript PORPS */}
            <Link
              href="#home"
              className="flex items-center group focus:outline-none"
              aria-label="TEDx P. Obul Reddy Public School Home"
            >
              <div className="flex items-baseline leading-none">
                {/* TED in bold red with direct lowercase x */}
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#eb0028] uppercase font-sans">
                  TED
                </span>
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#eb0028] lowercase font-sans">
                  x
                </span>

                {/* Subscript PORPS */}
                <span className="ml-2 text-xs sm:text-sm font-bold tracking-wider text-white/90 group-hover:text-white transition-colors uppercase translate-y-1">
                  PORPS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 8).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: CONTACT Curved-Rectangle Button + Mobile Hamburger Menu */}
            <div className="flex items-center gap-3">
              {/* Secondary Designs Button (Desktop) */}
              <Link
                href="/sample-designs"
                className="hidden xl:inline-flex px-3.5 py-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                Designs
              </Link>

              {/* Crimson CONTACT Button */}
              <Link
                href="#contact"
                className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs font-mono uppercase tracking-widest font-bold text-white bg-gradient-to-r from-[#5a1b24] via-[#75202b] to-[#5a1b24] hover:from-[#75202b] hover:to-[#912837] border border-red-500/20 shadow-[0_4px_20px_rgba(235,0,40,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                CONTACT
              </Link>

              {/* Curved Square Menu Button (Mobile Only) */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-[#eb0028] transition-all hover:scale-105 active:scale-95 shadow-sm"
                aria-expanded={menuOpen}
                aria-label="Toggle mobile navigation menu"
              >
                {menuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-[#0a0a0c]/98 backdrop-blur-3xl p-6 sm:p-12 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          {/* Header inside overlay */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 max-w-4xl mx-auto w-full">
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#eb0028]">
                TED
              </span>
              <span className="text-base font-bold text-[#eb0028] uppercase translate-y-1 ml-[1px]">
                x
              </span>
              <span className="ml-2.5 text-xs font-bold text-neutral-300">
                PORPS
              </span>
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

          {/* Navigation Links Grid */}
          <div className="py-8 max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {navLinks.map((link, idx) => (
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

          {/* Footer inside menu */}
          <div className="pt-6 border-t border-white/10 max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/sample-designs"
              onClick={() => setMenuOpen(false)}
              className="py-3 px-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#eb0028] animate-ping" />
              <span>Sample Designs Archive (3 HTMLs)</span>
            </Link>

            <div className="text-xs font-mono text-neutral-500">
              {EVENT_CONFIG.dateText} • Hyderabad • {EVENT_CONFIG.schoolName}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
