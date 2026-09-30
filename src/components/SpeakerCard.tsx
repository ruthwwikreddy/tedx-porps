'use client';

import React, { useState } from 'react';
import { Speaker } from '@/data/event';

interface SpeakerCardProps {
  speaker: Speaker;
  onSelect: (speaker: Speaker) => void;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onSelect(speaker)}
      className="group cursor-pointer rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-[#eb0028]/50 transition-all duration-300 p-5 flex flex-col justify-between hover:bg-neutral-900/80 shadow-xl hover:-translate-y-1 relative"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(speaker);
        }
      }}
      aria-label={`View details for ${speaker.name} - ${speaker.profession}`}
    >
      <div>
        {/* Top: Number & Category Badge */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-mono tracking-widest uppercase text-[#eb0028] font-bold">
            0{speaker.placeholderIndex}
          </span>
          <span className="text-[10px] font-mono tracking-wider text-neutral-400 bg-neutral-800/80 px-2.5 py-0.5 rounded-full border border-white/5">
            {speaker.category}
          </span>
        </div>

        {/* Speaker Image Box */}
        <div className="aspect-[4/3] w-full rounded-xl bg-neutral-950 border border-neutral-800 mb-4 relative overflow-hidden group-hover:border-[#eb0028]/50 transition-colors">
          {speaker.image && !imgError ? (
            <img
              src={speaker.image}
              alt={`${speaker.name} speaking`}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <div className="w-12 h-12 rounded-full border border-dashed border-neutral-700 flex items-center justify-center mb-2">
                <span className="text-xs font-mono text-neutral-400 font-bold">0{speaker.placeholderIndex}</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                {speaker.name}
              </span>
            </div>
          )}

          {/* Hover Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#eb0028] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>

        {/* Speaker Name / Title */}
        <h3 className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-[#eb0028] transition-colors leading-snug">
          {speaker.name}
        </h3>

        <p className="text-xs font-mono text-[#eb0028] mt-1 font-semibold">
          {speaker.profession}
        </p>

        <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
          {speaker.organization}
        </p>

        {/* Talk Title Quote */}
        <p className="text-xs text-neutral-300 mt-3 leading-relaxed italic line-clamp-2">
          &ldquo;{speaker.talkTitle}&rdquo;
        </p>
      </div>

      {/* Action Prompt */}
      <div className="mt-5 pt-3.5 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
        <span>Speaker Profile</span>
        <span className="text-[#eb0028] group-hover:translate-x-1 transition-transform">&rarr;</span>
      </div>
    </div>
  );
};
