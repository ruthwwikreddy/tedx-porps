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

interface FlattenedMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  category: string;
}

const OrganizerCard: React.FC<{ member: FlattenedMember; idx: number }> = ({ member, idx }) => {
  const initials = getInitials(member.name);
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-[#111114] border border-neutral-800/80 hover:border-neutral-600 hover:bg-[#15151a] transition-all duration-300 group flex flex-col justify-between p-4 sm:p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1"
      style={{ minHeight: '155px' }}
    >
      {/* Background initials watermark */}
      <div
        className="absolute -right-2 -bottom-4 text-[4.5rem] sm:text-[5rem] font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        {initials}
      </div>

      {/* Red top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#eb0028]/20 via-[#eb0028] to-[#eb0028]/20 group-hover:h-[3px] transition-all" />

      <div className="relative flex flex-col justify-between h-full">
        <div>
          {/* Top row: badge & number */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eb0028] flex-shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#eb0028] font-bold truncate">
                {member.badge}
              </span>
            </div>
            <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-wider flex-shrink-0">
              #{String(idx + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Name */}
          <h4 className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight group-hover:text-white transition-colors">
            {member.name}
          </h4>

          {/* Role */}
          <p className="text-xs text-neutral-400 mt-1 font-mono leading-relaxed">
            {member.role}
          </p>
        </div>

        {/* Bottom row: category and initials avatar */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
            {member.category}
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#eb0028]/10 border border-[#eb0028]/20 flex items-center justify-center group-hover:border-[#eb0028]/40 group-hover:bg-[#eb0028]/20 transition-all flex-shrink-0">
            <span className="text-[9px] font-black font-mono text-[#eb0028]">{initials}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Organizers: React.FC = () => {
  // Flatten leadership organizers (Top 3)
  const leadershipMembers: FlattenedMember[] = ORGANIZERS_DATA.leadership.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    badge: m.role.toLowerCase().includes('teacher') ? 'Faculty Lead' : 'Leadership',
    category: m.category,
  }));

  // Flatten executive board members adjacent to each other
  const ebMembers: FlattenedMember[] = ORGANIZERS_DATA.executiveBoard.flatMap((dept, deptIdx) =>
    dept.heads.map((name, headIdx) => ({
      id: `eb-${deptIdx}-${headIdx}-${name.toLowerCase().replace(/\s+/g, '-')}`,
      name,
      role: dept.department,
      badge: dept.badge,
      category: 'Executive Board',
    }))
  );

  const totalMembers = leadershipMembers.length + ebMembers.length;

  return (
    <section id="organizers" className="py-24 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="08"
          badge="The Team"
          title="The People Behind The Event"
          subtitle="Student-led from start to finish. Every department, every detail."
        />

        {/* Status / Count Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#eb0028] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#eb0028] font-bold">
              Organising Team
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            {totalMembers} Members
          </span>
        </div>

        {/* ── TOP 3 ORGANIZERS (Centered on top) ── */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
            {leadershipMembers.map((member, idx) => (
              <OrganizerCard key={member.id} member={member} idx={idx} />
            ))}
          </div>
        </div>

        {/* ── OTHER ORGANIZERS / EXECUTIVE BOARD (Continuous adjacent grid below) ── */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 justify-items-stretch">
          {ebMembers.map((member, idx) => (
            <OrganizerCard
              key={member.id}
              member={member}
              idx={leadershipMembers.length + idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
