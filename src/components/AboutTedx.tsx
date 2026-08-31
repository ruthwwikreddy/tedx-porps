import React from 'react';
import { SectionHeading } from './SectionHeading';
import { EVENT_CONFIG } from '@/data/event';

export const AboutTedx: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0d0d0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="01"
          badge="Global Movement"
          title="Ideas Worth Spreading"
          subtitle="Understanding the TED and TEDx mission."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Visual Card */}
          <div className="lg:col-span-5 relative group">
            <div className="aspect-[4/5] rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden relative flex flex-col justify-between p-8 shadow-2xl">
              {/* Graphic TEDx background element */}
              <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-[#eb0028]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xs font-mono tracking-widest text-[#eb0028] uppercase border border-[#eb0028]/30 px-3 py-1 rounded-full bg-red-950/20">
                  Global License
                </span>
                <span className="text-2xl font-black text-neutral-700">x</span>
              </div>

              <div className="relative z-10 my-auto text-center py-8">
                <div className="text-6xl sm:text-7xl font-black tracking-tighter text-white">
                  TED<span className="text-[#eb0028]">x</span>
                </div>
                <p className="text-xs uppercase tracking-widest font-mono text-neutral-400 mt-2">
                  x = independently organized event
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-neutral-800 text-xs font-mono text-neutral-400">
                Operated under official license granted by TED Conferences LLC.
              </div>
            </div>
          </div>

          {/* Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300">
            <div className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
              TED is a nonprofit organization devoted to Ideas Worth Spreading, usually in the form of short, powerful talks delivered by today&apos;s leading thinkers and doers.
            </div>

            <p className="text-base leading-relaxed text-neutral-400">
              In the spirit of discovering perspectives that can change attitudes, lives, and ultimately the world, TED has created <strong className="text-white">TEDx</strong>. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
            </p>

            <p className="text-base leading-relaxed text-neutral-400">
              At our event, <strong className="text-white">{EVENT_CONFIG.name}</strong>, live speakers and curated performances will spark deep dialogue and connection. The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are independently self-organized by our passionate student community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                <div className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#eb0028]" />
                  TED
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Annual global conferences celebrating technology, entertainment, and design at massive scale.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                <div className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  TEDx Event
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Independently organized community events fostering localized dialogue and ground-breaking stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
