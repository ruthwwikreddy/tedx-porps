'use client';

import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { GALLERY_DATA } from '@/data/content';
import { GalleryItem } from '@/data/event';

export const Gallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Split gallery items into two alternating rows for visual depth
  const rowOne = [...GALLERY_DATA.slice(0, 6), ...GALLERY_DATA.slice(0, 6)];
  const rowTwo = [...GALLERY_DATA.slice(6, 12), ...GALLERY_DATA.slice(6, 12)];

  return (
    <section className="py-24 bg-[#0a0a0c] border-t border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeading
          number="11"
          badge="Visual Archive"
          title="Moments & Memories"
          subtitle="Explore the photographic atmosphere, backstage craft, stage production, and audience energy."
        />
      </div>

      {/* Marquee Carousel Rows (Text-free, pure visual frames) */}
      <div className="space-y-6 relative">
        {/* Left & Right Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Leftward Infinite Marquee */}
        <div className="overflow-hidden">
          <div className="animate-marquee-left flex gap-5 sm:gap-6">
            {rowOne.map((item, idx) => (
              <div
                key={`r1-${item.id}-${idx}`}
                onClick={() => setActiveItem(item)}
                className="w-64 sm:w-80 h-44 sm:h-56 rounded-2xl bg-neutral-900 border border-neutral-800/90 hover:border-[#eb0028]/60 overflow-hidden relative shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer flex-shrink-0 group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveItem(item);
                }}
                aria-label={`View photo item ${idx + 1}`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${item.placeholderColor} flex items-center justify-center p-6 relative`}>
                  {/* Subtle Camera Graphic */}
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:border-[#eb0028] group-hover:text-[#eb0028] transition-all shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  {/* Corner Expand Icon */}
                  <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </div>

                  {/* Red bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#eb0028] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Infinite Marquee */}
        <div className="overflow-hidden">
          <div className="animate-marquee-right flex gap-5 sm:gap-6">
            {rowTwo.map((item, idx) => (
              <div
                key={`r2-${item.id}-${idx}`}
                onClick={() => setActiveItem(item)}
                className="w-64 sm:w-80 h-44 sm:h-56 rounded-2xl bg-neutral-900 border border-neutral-800/90 hover:border-[#eb0028]/60 overflow-hidden relative shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer flex-shrink-0 group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveItem(item);
                }}
                aria-label={`View photo item ${idx + 1}`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${item.placeholderColor} flex items-center justify-center p-6 relative`}>
                  {/* Subtle Camera Graphic */}
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:border-[#eb0028] group-hover:text-[#eb0028] transition-all shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  {/* Corner Expand Icon */}
                  <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </div>

                  {/* Red bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#eb0028] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal on Image Click */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl bg-[#121216] border border-white/15 p-6 sm:p-8 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            <div className={`aspect-video w-full rounded-2xl bg-gradient-to-br ${activeItem.placeholderColor} border border-neutral-700 flex flex-col items-center justify-center p-8 text-center mb-6 relative overflow-hidden`}>
              <div className="w-16 h-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-[#eb0028] mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#eb0028]">
                Visual Event Archive
              </span>
              <p className="text-xs font-mono text-neutral-400 mt-2">
                Full Resolution Photograph Placeholder
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800">
              <span>TEDx PORPS YOUTH</span>
              <span className="text-[#eb0028] uppercase">21 November Archive</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
