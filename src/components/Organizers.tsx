import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ORGANIZERS_DATA } from '@/data/content';

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export const Organizers: React.FC = () => {
  const totalEB = ORGANIZERS_DATA.executiveBoard.reduce(
    (acc, dept) => acc + dept.heads.length,
    0
  );

  return (
    <section id="organizers" className="py-24 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="08"
          badge="The Team"
          title="The People Behind The Event"
          subtitle="Student-led from start to finish. Every department, every detail."
        />

        {/* ── LEADERSHIP ─────────────────────────────────── */}
        <div className="mb-16">
          {/* Section label */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eb0028]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#eb0028] font-bold">
                Organisers
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              {ORGANIZERS_DATA.leadership.length} Members
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ORGANIZERS_DATA.leadership.map((member) => {
              const initials = getInitials(member.name);
              return (
                <div
                  key={member.id}
                  className="relative overflow-hidden rounded-2xl bg-[#111114] border border-neutral-800 hover:border-neutral-700 transition-all duration-300 group"
                  style={{ minHeight: '160px' }}
                >
                  {/* Background initials watermark */}
                  <div
                    className="absolute -right-4 -bottom-6 text-[7rem] font-black text-white/[0.03] leading-none select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {initials}
                  </div>

                  {/* Red top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#eb0028]" />

                  <div className="relative p-6 flex flex-col justify-between h-full">
                    {/* Role */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-5 h-[1px] bg-[#eb0028]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#eb0028] font-bold">
                        {member.role}
                      </span>
                    </div>

                    {/* Name */}
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-white leading-tight tracking-tight">
                        {member.name}
                      </h4>
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-end justify-between mt-6">
                      <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider">
                        {member.category}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#eb0028]/10 border border-[#eb0028]/20 flex items-center justify-center">
                        <span className="text-[9px] font-black font-mono text-[#eb0028]">{initials}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── EXECUTIVE BOARD ──────────────────────────────── */}
        <div>
          {/* Section label */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                Executive Board
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              {totalEB} Members
            </span>
          </div>

          {/* One block per department */}
          <div className="space-y-8">
            {ORGANIZERS_DATA.executiveBoard.map((dept, deptIdx) => (
              <div key={dept.department}>
                {/* Department header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-neutral-600">
                      {String(deptIdx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 font-bold px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                      {dept.badge}
                    </span>
                    <span className="text-xs text-neutral-500 uppercase tracking-wide">
                      {dept.department}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-700 uppercase tracking-widest">
                    {dept.heads.length} {dept.heads.length === 1 ? 'Member' : 'Members'}
                  </span>
                </div>

                {/* Person cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {dept.heads.map((name) => {
                    const initials = getInitials(name);
                    return (
                      <div
                        key={name}
                        className="relative overflow-hidden rounded-xl bg-[#111114] border border-neutral-800/80 hover:border-neutral-700 hover:bg-[#161619] transition-all duration-200 group"
                        style={{ minHeight: '130px' }}
                      >
                        {/* Background initials watermark */}
                        <div
                          className="absolute -right-2 -bottom-4 text-[4.5rem] font-black text-white/[0.04] leading-none select-none pointer-events-none"
                          aria-hidden="true"
                        >
                          {initials}
                        </div>

                        <div className="relative p-4 flex flex-col justify-between h-full">
                          {/* Role label */}
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="w-4 h-[1px] bg-neutral-700 group-hover:bg-[#eb0028]/60 transition-colors" />
                            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-neutral-600 group-hover:text-neutral-500 transition-colors truncate">
                              {dept.badge}
                            </span>
                          </div>

                          {/* Name */}
                          <p className="text-sm font-bold text-white leading-snug tracking-tight flex-1">
                            {name}
                          </p>

                          {/* Initials badge */}
                          <div className="flex justify-end mt-4">
                            <span className="text-[9px] font-black font-mono text-neutral-700 group-hover:text-neutral-500 transition-colors">
                              {initials}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
