import React from 'react';
import { SectionHeading } from './SectionHeading';
import { EVENT_CONFIG } from '@/data/event';

export const Venue: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="07"
          badge="Location & Setting"
          title="The Venue"
          subtitle="Hosted at the world-class auditorium of P. Obul Reddy Public School, Hyderabad."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Venue Image / Visual Placeholder */}
          <div className="lg:col-span-7 rounded-3xl bg-neutral-900 border border-neutral-800 p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-2xl">
            {/* Visual background layers */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#eb0028]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest text-[#eb0028] uppercase border border-[#eb0028]/30 px-3 py-1 rounded-full bg-red-950/20">
                Auditorium & Stage Hub
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Jubilee Hills, Hyd
              </span>
            </div>

            <div className="relative z-10 my-8">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Official Campus Stage
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
                {EVENT_CONFIG.venue.name}
              </h3>
              <p className="text-sm text-neutral-300 mt-2 max-w-lg">
                Equipped with cutting-edge acoustic engineering, digital projection matrices, and an amphitheater seating arrangement.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>High-Resolution Venue Photography Placeholder</span>
              <span className="text-neutral-400">{EVENT_CONFIG.dateText}</span>
            </div>
          </div>

          {/* Venue Details & Directions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 shadow-xl space-y-6 flex-1">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#eb0028] font-semibold">
                  Address
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  {EVENT_CONFIG.schoolName}
                </h4>
                <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                  {EVENT_CONFIG.venue.address}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <span className="text-xs font-mono uppercase tracking-widest text-[#eb0028] font-semibold">
                  Event Timing
                </span>
                <p className="text-sm text-white font-mono mt-1">
                  {EVENT_CONFIG.dateText} • Doors open 09:00 AM IST
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <span className="text-xs font-mono uppercase tracking-widest text-[#eb0028] font-semibold">
                  Access & Transit
                </span>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Located in central Jubilee Hills with convenient proximity to Hyderabad Metro stations and dedicated attendee drop-off zones.
                </p>
              </div>
            </div>

            {/* View on Map Button (No Ticketing) */}
            <a
              href="https://maps.google.com/?q=P.+Obul+Reddy+Public+School+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 group shadow-lg text-center"
            >
              <span>View on Google Maps</span>
              <svg className="w-4 h-4 text-[#eb0028] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
