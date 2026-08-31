import React from 'react';
import { SectionHeading } from './SectionHeading';
import { PARTNERS_DATA } from '@/data/content';

export const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-24 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="09"
          badge="Supporters & Allies"
          title="Our Partners"
          subtitle="Collaborators whose generous support empowers youth curiosity, storytelling, and high-production event execution."
        />

        <div className="space-y-12">
          {PARTNERS_DATA.map((tier) => (
            <div key={tier.tierName} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-neutral-800 pb-3">
                <h3 className="text-lg font-bold uppercase tracking-tight text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#eb0028]" />
                  {tier.tierName}
                </h3>
                <p className="text-xs font-mono text-neutral-400">
                  {tier.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {tier.partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col items-center justify-center text-center group min-h-[140px]"
                  >
                    <div className="text-sm font-bold font-mono tracking-wider text-neutral-300 group-hover:text-white uppercase">
                      {partner.logoPlaceholder}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 mt-2">
                      {partner.category}
                    </span>
                    {partner.tagline && (
                      <span className="text-[10px] text-neutral-400 mt-1 italic max-w-xs">
                        &ldquo;{partner.tagline}&rdquo;
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Inquiries Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-neutral-900/30 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-tight">
              Interested in Partnering With Us?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Join visionary organizations championing youth-driven innovation in Hyderabad.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-widest text-white border border-white/15 transition-all text-center whitespace-nowrap"
          >
            Inquire For Partnership &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
