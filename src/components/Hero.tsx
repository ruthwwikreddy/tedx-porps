'use client';

import React from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/data/event';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#0a0a0c]">
      {/* Luxury Minimal Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#eb0028]/[0.03] rounded-full blur-[120px]" />
        {/* Ultra-fine Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
        {/* Minimalist Top Indicator */}
        <div className="mb-12 animate-fade-in">
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-500 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-neutral-800" />
            {EVENT_CONFIG.dateText}
            <span className="w-8 h-[1px] bg-neutral-800" />
          </span>
        </div>

        {/* High-Impact Typography */}
        <div className="mb-16">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white uppercase leading-[0.85] transition-all duration-700">
            <span className="text-[#eb0028] drop-shadow-sm">TEDx</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              PORPS YOUTH
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light text-neutral-500 mt-8 tracking-[0.2em] uppercase opacity-60">
            P. Obul Reddy Public School
          </p>
        </div>

        {/* Floating Theme Section (No Box) */}
        <div className="mb-20 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-[#eb0028] mb-4 opacity-80">
            {EVENT_CONFIG.themeSubtitle}
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-tight mb-6">
            {EVENT_CONFIG.theme}
          </h2>
          <div className="h-px w-16 bg-[#eb0028] mx-auto mb-6" />
          <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed font-light">
            {EVENT_CONFIG.tagline}
          </p>
        </div>

        {/* Ultra-Sleek CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {EVENT_CONFIG.BOOKING_ENABLED && (
            <Link
              href={EVENT_CONFIG.bookingUrl}
              id="hero-book-ticket-btn"
              className="group relative w-full sm:w-auto px-10 py-4 rounded-full bg-[#eb0028] text-white font-bold text-xs font-mono tracking-widest uppercase transition-all hover:scale-105 active:scale-95 text-center overflow-hidden shadow-2xl shadow-red-900/40"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                {EVENT_CONFIG.bookingCtaText}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          )}
          <Link
            href="#about"
            id="hero-explore-btn"
            className="group relative w-full sm:w-auto px-10 py-4 rounded-full bg-transparent text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 font-semibold text-xs font-mono tracking-widest uppercase transition-all text-center overflow-hidden hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Enter the Experience</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
          <Link
            href="#speakers"
            id="hero-speakers-btn"
            className="hidden sm:inline-flex w-full sm:w-auto px-10 py-4 rounded-full bg-transparent text-neutral-500 hover:text-neutral-300 border border-neutral-900 hover:border-neutral-800 font-semibold text-xs font-mono tracking-widest uppercase transition-all text-center hover:scale-105 active:scale-95"
          >
            The Speakers
          </Link>
        </div>
      </div>
    </section>
  );
};
