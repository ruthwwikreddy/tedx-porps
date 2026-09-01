'use client';

import React from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/data/event';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#0a0a0c] via-[#0d0d10] to-[#0a0a0c]">
      {/* Abstract TEDx background glow & geometry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Ambient Red Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#eb0028]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#eb0028]/10 rounded-full blur-[100px]" />

        {/* Watermark "TEDx" */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-white/[0.015] select-none pointer-events-none leading-none">
          TEDx
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Tagline Pill with Glassmorphism */}
        <div className="inline-flex flex-wrap items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm sm:text-xs font-mono tracking-wider text-neutral-300 mb-8 backdrop-blur-xl shadow-lg" aria-label="Official TEDx event badge">
          <span className="w-2 h-2 rounded-full bg-[#eb0028] animate-pulse" aria-hidden="true" />
          <span className="text-white font-bold tracking-wider">OFFICIAL TEDx EVENT</span>
          <span className="mx-1 text-neutral-500">•</span>
          <span className="text-neutral-300">{EVENT_CONFIG.schoolName}</span>
        </div>

        {/* Cinematic Main Title */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase leading-[0.95]">
            <span className="text-[#eb0028]">TEDx</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
              P. Obul Reddy
            </span>
            <span className="block text-2xl sm:text-4xl md:text-5xl font-light text-neutral-300 mt-2 tracking-normal">
              Public School
            </span>
          </h1>
        </div>

        {/* Glassmorphic Central Theme & Date Matrix */}
        <div className="my-4 p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-2xl max-w-2xl w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-[#eb0028]/40 transition-all duration-300">
          {/* Top Label */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-[11px] font-mono uppercase tracking-widest">
            <span className="text-[#eb0028] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eb0028]" />
              {EVENT_CONFIG.dateText}
            </span>
            <span className="text-neutral-400">Hyderabad, India</span>
          </div>

          {/* Theme Title */}
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
            {EVENT_CONFIG.themeSubtitle}
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            {EVENT_CONFIG.theme}
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 mt-3 max-w-md mx-auto leading-relaxed">
            {EVENT_CONFIG.tagline}
          </p>
        </div>

        {/* Clean CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <Link
            href="#about"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#eb0028] hover:bg-[#b8001f] text-white font-bold text-xs font-mono tracking-widest uppercase transition-all shadow-xl shadow-red-950/50 hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            Explore the Event &rarr;
          </Link>
          <Link
            href="#speakers"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/15 font-semibold text-xs font-mono tracking-widest uppercase transition-all backdrop-blur-xl text-center"
          >
            Meet the Speakers
          </Link>
        </div>
      </div>
    </section>
  );
};
