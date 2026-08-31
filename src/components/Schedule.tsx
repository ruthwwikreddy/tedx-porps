import React from 'react';
import { SectionHeading } from './SectionHeading';
import { SCHEDULE_DATA } from '@/data/schedule';
import { EVENT_CONFIG } from '@/data/event';

export const Schedule: React.FC = () => {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Talk':
        return 'bg-red-950/40 text-[#eb0028] border-red-900/50';
      case 'Ceremony':
      case 'Closing':
        return 'bg-amber-950/40 text-amber-400 border-amber-900/50';
      case 'Break':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50';
      case 'Interactive':
        return 'bg-purple-950/40 text-purple-400 border-purple-900/50';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <section id="schedule" className="py-24 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <SectionHeading
            number="05"
            badge="Program & Timeline"
            title="The Day"
            subtitle="A curated journey through ideas, stories, and conversations. Timings are provisional."
          />

          <div className="mb-12">
            <span className="text-xs font-mono tracking-widest uppercase text-amber-500/90 bg-amber-950/30 border border-amber-900/40 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Tentative Schedule • Subject to Revision
            </span>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central guide line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-800 transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {SCHEDULE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } group`}
                >
                  {/* Timeline Indicator Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#0d0d0f] border-2 border-[#eb0028] transform -translate-x-1/2 mt-6 z-10 group-hover:scale-125 transition-transform shadow-lg shadow-red-950" />

                  {/* Content Card */}
                  <div className="ml-10 md:ml-0 md:w-1/2 md:px-8 w-full">
                    <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 group-hover:border-[#eb0028]/40 transition-all duration-300 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-lg font-black font-mono text-white tracking-tight">
                          {item.time}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${getBadgeColor(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-2 group-hover:text-neutral-100 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-500 gap-2">
                        {item.speaker && (
                          <span className="text-neutral-300">
                            Features: <strong className="text-white">{item.speaker}</strong>
                          </span>
                        )}
                        <span className="text-neutral-500">
                          {item.venue || EVENT_CONFIG.venue.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
