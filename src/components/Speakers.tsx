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
          badge="Lineup"
          title="The Speakers"
          subtitle="Voices. Stories. Perspectives. Six thinkers addressing paradigms shaping tomorrow."
        />

        {/* Clean, Simple Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
