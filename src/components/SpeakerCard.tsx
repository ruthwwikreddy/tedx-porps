import React from 'react';
import { Speaker } from '@/data/event';

interface SpeakerCardProps {
  speaker: Speaker;
  onSelect: (speaker: Speaker) => void;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, onSelect }) => {
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

        {/* Elegant Speaker Image Placeholder Box */}
        <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-neutral-700/60 mb-4 relative overflow-hidden flex flex-col items-center justify-center p-4 text-center group-hover:border-[#eb0028]/40 transition-colors">
          {/* Subtle user avatar outline */}
          <div className="w-14 h-14 rounded-full border border-dashed border-neutral-600 flex items-center justify-center mb-2 group-hover:border-[#eb0028] transition-colors">
            <svg className="w-6 h-6 text-neutral-500 group-hover:text-[#eb0028] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            Portrait Placeholder
          </span>

          {/* Hover Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#eb0028] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>

        {/* Speaker Name / Title */}
        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#eb0028] transition-colors">
          {speaker.profession}
        </h3>

        <p className="text-xs font-mono text-neutral-400 mt-1">
          {speaker.organization}
        </p>

        {/* Talk Title Quote */}
        <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed italic">
          &ldquo;{speaker.talkTitle}&rdquo;
        </p>
      </div>

      {/* Action Prompt */}
      <div className="mt-5 pt-3.5 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
        <span>Read Story</span>
        <span className="text-[#eb0028] group-hover:translate-x-1 transition-transform">&rarr;</span>
      </div>
    </div>
  );
};
