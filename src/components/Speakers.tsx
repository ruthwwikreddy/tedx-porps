'use client';

import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { SpeakerCard } from './SpeakerCard';
import { SpeakerModal } from './SpeakerModal';
import { SPEAKERS_DATA } from '@/data/speakers';
import { Speaker } from '@/data/event';

export const Speakers: React.FC = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section id="speakers" className="py-24 bg-[#0d0d0f] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          badge="Voices on Stage"
          title="Tentative Speaker Lineup"
          subtitle="Visionaries across academic research, cinema narrative, grassroots animal welfare, and private aerospace."
        />

        {/* Tentative Lineup Notice from Slide 8 */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-red-950/20 border border-red-900/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#eb0028] animate-pulse flex-shrink-0" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
              Subject to final availability and confirmation
            </span>
          </div>
          <span className="hidden sm:inline text-[11px] font-mono text-neutral-500 uppercase">
            Official 2026 Curatorial Roster
          </span>
        </div>

        {/* Clean, Simple Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPEAKERS_DATA.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              onSelect={(sp) => setSelectedSpeaker(sp)}
            />
          ))}
        </div>

        {/* Speaker Modal Overlay */}
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      </div>
    </section>
  );
};

