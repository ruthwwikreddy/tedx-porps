'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/data/event';

export const Theme: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="theme"
      className="py-28 bg-gradient-to-b from-[#0d0d0f] via-black to-[#0d0d0f] relative overflow-hidden border-y border-white/5"
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-[#eb0028]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#eb0028] mb-4 bg-red-950/30 border border-red-900/40 px-3 py-1 rounded-full">
          <span>03 // THEME MANIFESTO</span>
        </div>

        <h2 className="text-sm sm:text-base font-mono uppercase tracking-widest text-neutral-400 mb-4">
          THE OFFICIAL THEME
        </h2>

        {/* Massive Dominant Typography */}
        <div className="my-8">
          <div className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white select-none leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-500">
              {EVENT_CONFIG.theme}
            </span>
          </div>
          <div className="text-lg sm:text-2xl md:text-3xl font-light text-neutral-300 mt-6 tracking-wide max-w-2xl mx-auto">
            {EVENT_CONFIG.themeSubtitle}
          </div>
        </div>

        {/* Expandable Theme Narrative Box */}
        <div className="max-w-3xl mx-auto mt-10 p-8 sm:p-10 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl text-left relative group hover:border-[#eb0028]/30 transition-all">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#eb0028] font-semibold">
              Curatorial Statement Placeholder
            </span>
            <span className="text-xs font-mono text-neutral-500">
              PORPS • {EVENT_CONFIG.year}
            </span>
          </div>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            {EVENT_CONFIG.themeDescription}
          </p>

          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-white/10 space-y-4 text-sm text-neutral-400 leading-relaxed animate-in fade-in duration-300">
              <p>
                In a world punctuated by rapid technological breakthroughs and shifting ecological realities, how do we anchor our human ethos? This year&apos;s theme invites thinkers to examine intersections: where science meets human vulnerability, where ancient traditions dialogue with artificial intelligence, and where student voices become catalysts for civic revitalization.
              </p>
              <p>
                Through six curated talks and sensory installations, attendees will traverse ideas that refuse to remain within established boundaries.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white flex items-center gap-2 group-hover:text-[#eb0028] transition-colors focus:outline-none"
            >
              <span>{isExpanded ? 'Read Less' : 'Read Expanded Narrative'}</span>
              <span>{isExpanded ? '↑' : '↓'}</span>
            </button>

            <span className="text-[11px] font-mono text-neutral-600 uppercase">
              Editable in event.ts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
