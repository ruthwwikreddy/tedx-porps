'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/data/event';

export const Theme: React.FC = () => {
  const [activeDimension, setActiveDimension] = useState<number | null>(null);

  const dimensions = [
    {
      num: "01",
      title: "Family",
      subtitle: "Inherited Legacies & Filial Benchmarks",
      desc: "Parental sacrifices often transform into unspoken performance debts. We examine how domestic expectations frame early ambitions, self-image, and identity.",
      accent: "from-red-600/20 to-transparent",
      tag: "Domestic Dynamics"
    },
    {
      num: "02",
      title: "School",
      subtitle: "Standardized Metrics & Competitive Ranks",
      desc: "When educational worth is calculated strictly by percentile ranks and test scores, intrinsic intellectual curiosity is eclipsed by performance dread.",
      accent: "from-amber-600/20 to-transparent",
      tag: "Academic Pedagogy"
    },
    {
      num: "03",
      title: "Society",
      subtitle: "Collective Conformity & Milestone Timelines",
      desc: "Community scripts define acceptable careers, marital timelines, and public status. We question the cost of conforming to societal consensus.",
      accent: "from-rose-600/20 to-transparent",
      tag: "Civic Structures"
    },
    {
      num: "04",
      title: "Culture",
      subtitle: "Tradition vs Personal Autonomy",
      desc: "Balancing time-honored heritage with emergent individual philosophies. Negotiating cultural identity in a hyper-connected, globalized world.",
      accent: "from-red-500/20 to-transparent",
      tag: "Cultural Fabric"
    },
    {
      num: "05",
      title: "Ourselves",
      subtitle: "Internalized Perfectionism & Imposter Dread",
      desc: "The loudest critic often lives within. Unraveling the harsh standards we impose on ourselves to prove worthiness in an era of constant comparison.",
      accent: "from-purple-600/20 to-transparent",
      tag: "Intrapersonal Mind"
    }
  ];

  return (
    <section
      id="theme"
      className="py-28 bg-gradient-to-b from-[#0a0a0d] via-black to-[#0a0a0d] relative overflow-hidden border-y border-white/5"
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-[#eb0028]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#eb0028] mb-4 bg-red-950/30 border border-red-900/40 px-3.5 py-1.5 rounded-full">
          <span>03 // OFFICIAL 2026 THEME</span>
        </div>

        <h2 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2">
          CONCEPT FOCUS &amp; CONTEXTUAL DEPTH
        </h2>

        {/* Massive Dominant Typography from Slide 5 */}
        <div className="my-8">
          <div className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white select-none leading-none">
            “THE WEIGHT OF <br className="hidden sm:inline" />
            <span className="text-[#eb0028] drop-shadow-[0_0_40px_rgba(235,0,40,0.35)]">
              EXPECTATIONS
            </span>”
          </div>
          <div className="text-base sm:text-xl md:text-2xl font-light text-neutral-300 mt-6 tracking-wide max-w-3xl mx-auto leading-relaxed">
            {EVENT_CONFIG.themeSubtitle}
          </div>
        </div>

        {/* Curatorial Narrative */}
        <div className="max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl text-left relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#eb0028] font-bold">
              Why The Theme Matters
            </span>
            <span className="text-xs font-mono text-neutral-500">
              PORPS • {EVENT_CONFIG.year}
            </span>
          </div>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            Every generation inherits structures built long before their birth. At TEDxPORPS Youth 2026, we dissect the invisible yet profound burdens placed on youth across the foundational anchors of human life.
          </p>
        </div>

        {/* 5 Dimensions Grid from Slide 6 */}
        <div className="text-left mb-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#eb0028]" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              The Five Core Dimensions Under Examination
            </h3>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dimensions.map((dim, idx) => {
              const isSelected = activeDimension === idx;
              return (
                <div
                  key={dim.num}
                  onClick={() => setActiveDimension(isSelected ? null : idx)}
                  className={`p-6 rounded-2xl bg-gradient-to-br from-neutral-900/80 to-[#121217] border transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                    isSelected
                      ? 'border-[#eb0028] shadow-[0_0_30px_rgba(235,0,40,0.2)] bg-[#171317]'
                      : 'border-white/10 hover:border-white/25 hover:bg-neutral-900'
                  } ${idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-[#eb0028]">
                      {dim.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {dim.tag}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#eb0028] transition-colors mb-1">
                    {dim.title}
                  </h4>
                  <p className="text-xs font-mono text-neutral-400 mb-3">
                    {dim.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {dim.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500 group-hover:text-white transition-colors">
                    <span>Explore Discourse</span>
                    <span className="text-[#eb0028] group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

