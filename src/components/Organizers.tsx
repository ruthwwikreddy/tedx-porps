import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ORGANIZERS_DATA } from '@/data/content';

export const Organizers: React.FC = () => {
  return (
    <section id="organizers" className="py-24 bg-[#0d0d0f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="08"
          badge="Curators & Producers"
          title="The Team Behind The Event"
          subtitle="Driven by student ambition, dedicated mentorship, and an unyielding commitment to sharing transformative ideas."
        />

        {/* Category I: Core Leadership & Department Heads */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">
              TEDx Executive Team
            </h3>
            <div className="h-[1px] flex-1 bg-neutral-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ORGANIZERS_DATA.leadership.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#eb0028]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-mono text-[#eb0028] mb-4 group-hover:border-[#eb0028] transition-colors">
                  {member.role.charAt(0)}
                </div>
                <h4 className="text-base font-bold text-white uppercase tracking-tight">
                  {member.name}
                </h4>
                <p className="text-xs font-mono text-[#eb0028] mt-1">
                  {member.role}
                </p>
                <span className="inline-block mt-3 text-[10px] font-mono text-neutral-500 bg-neutral-800/50 px-2 py-0.5 rounded">
                  {member.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
