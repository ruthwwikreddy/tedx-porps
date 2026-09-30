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
          {/* Editorial Visual Card with Official License Confirmation */}
          <div className="lg:col-span-5 relative group">
            <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden relative p-7 shadow-2xl flex flex-col justify-between">
              {/* Graphic TEDx background element */}
              <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-[#eb0028]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex justify-between items-center mb-6">
                <span className="text-[11px] font-mono tracking-widest text-[#eb0028] uppercase border border-[#eb0028]/30 px-3 py-1 rounded-full bg-red-950/20 font-bold">
                  Official TED License
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  Verified
                </span>
              </div>

              <div className="relative z-10 my-4 text-center">
                <div className="text-5xl sm:text-6xl font-black tracking-tighter text-white">
                  TED<span className="text-[#eb0028]">x</span>
                </div>
                <div className="text-xs uppercase tracking-widest font-mono text-neutral-300 font-bold mt-1">
                  PORPS Youth 2026
                </div>
                <p className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 mt-1">
                  x = independently organized event
                </p>
              </div>

              {/* License Approval Snippet from Slide 17 */}
              <div className="relative z-10 p-4 rounded-2xl bg-black/50 border border-white/8 my-3">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                  <span>TED Applications Approval</span>
                  <span className="text-[#eb0028] font-bold">21 August 2026</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  Confirmed approval granted by TED Conferences for TEDxPORPS Youth. Operating in full compliance with global TED parameters.
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="/images/tedx-license.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>View License Certificate</span>
                    <span className="text-[#eb0028]">&rarr;</span>
                  </a>
                  <span className="text-[10px] font-mono text-neutral-600">ID: TEDx-PORPS-26</span>
                </div>
              </div>

              <div className="relative z-10 pt-3 border-t border-neutral-800 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                <span>P. Obul Reddy Public School</span>
                <span>Hyderabad</span>
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
              At our event, <strong className="text-white">{EVENT_CONFIG.name}</strong>, live speakers and curated youth dialogues will challenge conventional wisdom. Operating under official license from TED granted on 21 August 2026, this event is independently led by students and faculty at P. Obul Reddy Public School, Jubilee Hills, Hyderabad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                <div className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#eb0028]" />
                  Global TED Mission
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  International conference platform honoring boundary-pushing technology, entertainment, and design across the globe.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                <div className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  Independent TEDx Youth
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  A student-led crucible for transformative local ideas, global mindsets, and unfiltered dialogue right here in Hyderabad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

