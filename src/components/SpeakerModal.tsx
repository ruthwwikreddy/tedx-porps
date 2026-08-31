'use client';

import React, { useEffect } from 'react';
import { Speaker } from '@/data/event';

interface SpeakerModalProps {
  speaker: Speaker | null;
  onClose: () => void;
}

export const SpeakerModal: React.FC<SpeakerModalProps> = ({ speaker, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (speaker) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [speaker, onClose]);

  if (!speaker) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-modal-title"
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#121216] border border-white/15 p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#eb0028]"
          aria-label="Close speaker modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Speaker Portrait Box */}
          <div className="md:col-span-5">
            <div className="aspect-[4/5] rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#eb0028]/40 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-[#eb0028] font-bold">
                SPEAKER 0{speaker.placeholderIndex}
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                {speaker.profession}
              </div>
              <div className="text-[11px] text-neutral-400 font-mono mt-1">
                {speaker.organization}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 w-full text-[10px] font-mono text-neutral-500">
                Official Headshot To Be Released
              </div>
            </div>

            {/* Talk Category */}
            <div className="mt-4 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Category</span>
              <span className="text-white font-semibold">{speaker.category}</span>
            </div>
          </div>

          {/* Right: Speaker Talk Details */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#eb0028]">
                Talk Title
              </span>
              <h3
                id="speaker-modal-title"
                className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mt-1"
              >
                {speaker.talkTitle}
              </h3>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                About the Speaker & Background
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {speaker.bio}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#eb0028] font-bold mb-1">
                Why this idea matters
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {speaker.whyMatters}
              </p>
            </div>

            {/* Social links placeholder */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                Social Profile Handles
              </span>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                <span>[Twitter]</span>
                <span>[LinkedIn]</span>
                <span>[Web]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
