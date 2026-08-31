import React from 'react';
import { SectionHeading } from './SectionHeading';
import { UPDATES_DATA } from '@/data/content';

export const Updates: React.FC = () => {
  return (
    <section className="py-24 bg-[#0d0d0f] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="12"
          badge="Dispatches & News"
          title="From The Event"
          subtitle="Editorial releases, curatorial logs, speaker announcements, and stage production diaries."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPDATES_DATA.map((update) => (
            <article
              key={update.id}
              className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/80 hover:border-[#eb0028]/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#eb0028] bg-red-950/30 border border-red-900/40 px-2.5 py-1 rounded-full">
                    {update.badge}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    {update.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3 group-hover:text-neutral-100 transition-colors">
                  {update.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {update.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>{update.readTime}</span>
                <span className="text-neutral-400 group-hover:text-[#eb0028] transition-colors">
                  Official Dispatch &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
