import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ORGANIZERS_DATA } from '@/data/content';

// Department accent colours cycling through a warm palette
const DEPT_COLORS = [
  '#eb0028', '#e85d04', '#f48c06', '#7209b7',
  '#3a0ca3', '#4361ee', '#4cc9f0', '#06d6a0',
  '#ff006e', '#8338ec',
];

// Flatten each head into its own card entry
type PersonCard = {
  name: string;
  department: string;
  badge: string;
  deptIndex: number;
};

export const Organizers: React.FC = () => {
  const allPeople: PersonCard[] = ORGANIZERS_DATA.executiveBoard.flatMap((dept, idx) =>
    dept.heads.map((name) => ({
      name,
      department: dept.department,
      badge: dept.badge,
      deptIndex: idx,
    }))
  );

  return (
    <section id="organizers" className="py-24 bg-[#0d0d0f] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#eb0028]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          number="08"
          badge="Curators & Producers"
          title="The Team Behind The Event"
          subtitle="Driven by student ambition, dedicated mentorship, and an unyielding commitment to sharing transformative ideas."
        />

        {/* ── Leadership ── */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-[#eb0028] font-bold whitespace-nowrap">
              TEDx Leadership &amp; Core Organisers
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-[#eb0028]/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ORGANIZERS_DATA.leadership.map((member) => (
              <div
                key={member.id}
                className="relative p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#eb0028]/50 transition-all duration-300 group overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#eb0028]/0 to-[#eb0028]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                <div className="flex items-center gap-4 relative">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black text-white flex-shrink-0 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #eb0028, #7a0015)' }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">{member.name}</h4>
                    <p className="text-xs font-mono text-[#eb0028] mt-0.5 font-semibold">{member.role}</p>
                    <span className="inline-block mt-1.5 text-[10px] font-mono text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded uppercase tracking-wider">
                      {member.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Executive Board ── */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-[#eb0028] font-bold whitespace-nowrap">
              TEDxPORPS Youth 2026 — Executive Board
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-[#eb0028]/40 to-transparent" />
          </div>

          {/* Department sections — each dept gets a labelled row of person cards */}
          <div className="space-y-10">
            {ORGANIZERS_DATA.executiveBoard.map((dept, deptIdx) => {
              const color = DEPT_COLORS[deptIdx % DEPT_COLORS.length];
              return (
                <div key={dept.department}>
                  {/* Dept label row */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[10px] font-mono uppercase tracking-[0.18em] font-bold px-2.5 py-1 rounded-full border"
                      style={{ color, borderColor: `${color}40`, background: `${color}12` }}
                    >
                      {dept.badge}
                    </span>
                    <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      {dept.department}
                    </span>
                    <div className="h-px flex-1 bg-neutral-800" />
                    <span className="text-[10px] font-mono text-neutral-600">
                      {String(deptIdx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Person cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {dept.heads.map((name) => {
                      const initials = name
                        .split(' ')
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w) => w[0].toUpperCase())
                        .join('');
                      return (
                        <div
                          key={name}
                          className="relative flex items-center gap-3 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 group overflow-hidden"
                        >
                          {/* Left accent bar */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ background: color }}
                          />

                          {/* Avatar circle */}
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0 shadow-md"
                            style={{
                              background: `linear-gradient(135deg, ${color}cc, ${color}55)`,
                              border: `1px solid ${color}30`,
                            }}
                          >
                            {initials}
                          </div>

                          {/* Name */}
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white leading-tight truncate">{name}</p>
                            <p className="text-[10px] font-mono text-neutral-500 mt-0.5 truncate">{dept.badge}</p>
                          </div>
                        </div>
                      );
                    })}
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
