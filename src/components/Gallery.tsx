'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionHeading } from './SectionHeading';

const PHOTOS = [
  { id: 'p1',  src: '/images/tedx-previous/0N7A8948.JPG', alt: 'TEDx PORPS — Stage Moment' },
  { id: 'p2',  src: '/images/tedx-previous/0N7A8950.JPG', alt: 'TEDx PORPS — Audience Energy' },
  { id: 'p3',  src: '/images/tedx-previous/0N7A9080.JPG', alt: 'TEDx PORPS — Speaker on Stage' },
  { id: 'p4',  src: '/images/tedx-previous/0N7A9086.JPG', alt: 'TEDx PORPS — Red Circle Moment' },
  { id: 'p5',  src: '/images/tedx-previous/0N7A9278.JPG', alt: 'TEDx PORPS — Conversation' },
  { id: 'p6',  src: '/images/tedx-previous/0N7A9279.JPG', alt: 'TEDx PORPS — Behind The Scenes' },
  { id: 'p7',  src: '/images/tedx-previous/0N7A9341.JPG', alt: 'TEDx PORPS — Stage Lighting' },
  { id: 'p8',  src: '/images/tedx-previous/0N7A9347.JPG', alt: 'TEDx PORPS — Audience Reflection' },
  { id: 'p9',  src: '/images/tedx-previous/0N7A9457.JPG', alt: 'TEDx PORPS — Panel Discussion' },
  { id: 'p10', src: '/images/tedx-previous/0N7A9459.JPG', alt: 'TEDx PORPS — Standing Ovation' },
  { id: 'p11', src: '/images/tedx-previous/0N7A9506.JPG', alt: 'TEDx PORPS — Closing Ceremony' },
  { id: 'p12', src: '/images/tedx-previous/0N7A9518.JPG', alt: 'TEDx PORPS — Organizers Gather' },
];

type Photo = typeof PHOTOS[number];

export const Gallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const open = (photo: Photo, idx: number) => {
    setActivePhoto(photo);
    setActiveIdx(idx);
  };

  const close = () => setActivePhoto(null);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = (activeIdx - 1 + PHOTOS.length) % PHOTOS.length;
    setActivePhoto(PHOTOS[newIdx]);
    setActiveIdx(newIdx);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = (activeIdx + 1) % PHOTOS.length;
    setActivePhoto(PHOTOS[newIdx]);
    setActiveIdx(newIdx);
  };

  // Two rows for marquee; duplicate for seamless loop
  const rowOne = [...PHOTOS.slice(0, 6), ...PHOTOS.slice(0, 6)];
  const rowTwo = [...PHOTOS.slice(6, 12), ...PHOTOS.slice(6, 12)];

  const PhotoCard = ({ photo, idx, rowKey }: { photo: Photo; idx: number; rowKey: string }) => (
    <div
      key={`${rowKey}-${photo.id}-${idx}`}
      onClick={() => open(photo, PHOTOS.indexOf(photo))}
      className="w-64 sm:w-80 h-44 sm:h-56 rounded-2xl overflow-hidden relative shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer flex-shrink-0 group border border-neutral-800/80 hover:border-[#eb0028]/60"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') open(photo, PHOTOS.indexOf(photo)); }}
      aria-label={photo.alt}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 256px, 320px"
      />
      {/* Dark hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
      {/* Expand icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        ↗
      </div>
      {/* Red bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#eb0028] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );

  return (
    <section className="py-24 bg-[#0a0a0c] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeading
          number="11"
          badge="Visual Archive"
          title="Moments & Memories"
          subtitle="Photographs from a previous TEDxPORPS event — the energy, the stage, the people."
        />
      </div>

      <div className="space-y-6 relative">
        {/* Edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scroll left */}
        <div className="overflow-hidden">
          <div className="animate-marquee-left flex gap-5 sm:gap-6">
            {rowOne.map((photo, idx) => (
              <PhotoCard key={`r1-${photo.id}-${idx}`} photo={photo} idx={idx} rowKey="r1" />
            ))}
          </div>
        </div>

        {/* Row 2 — scroll right */}
        <div className="overflow-hidden">
          <div className="animate-marquee-right flex gap-5 sm:gap-6">
            {rowTwo.map((photo, idx) => (
              <PhotoCard key={`r2-${photo.id}-${idx}`} photo={photo} idx={idx} rowKey="r2" />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          onClick={close}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none z-10"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption + nav */}
            <div className="flex items-center justify-between mt-4 px-1">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Previous photo"
              >
                ←
              </button>
              <div className="text-center">
                <p className="text-sm text-neutral-300">{activePhoto.alt}</p>
                <p className="text-xs font-mono text-neutral-500 mt-0.5">
                  {activeIdx + 1} / {PHOTOS.length}
                </p>
              </div>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Next photo"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
