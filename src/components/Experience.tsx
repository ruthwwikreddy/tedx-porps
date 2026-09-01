import React from 'react';
import { SectionHeading } from './SectionHeading';

export const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Ideas",
      tagline: "Discover perspectives that challenge how you think.",
      desc: "Immerse yourself in talks engineered to disrupt conventional assumptions across cutting-edge technology, ethics, and philosophy.",
      badge: "INTELLECT",
      color: "from-red-950/40 via-neutral-900 to-neutral-900",
      svgIcon: (
        <svg className="w-6 h-6 text-[#eb0028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Conversations",
      tagline: "Meet people who see the world differently.",
      desc: "Step into our dedicated networking salons where students, educators, and guest thinkers exchange divergent viewpoints without hierarchy.",
      badge: "DIALOGUE",
      color: "from-neutral-900 via-neutral-900 to-neutral-900",
      svgIcon: (
        <svg className="w-6 h-6 text-[#eb0028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Creativity",
      tagline: "Experience student creativity and expression.",
      desc: "Witness live student musical and dramatic interludes woven seamlessly into the event fabric.",
      badge: "EXPRESSION",
      color: "from-neutral-900 via-neutral-900 to-red-950/30",
      svgIcon: (
        <svg className="w-6 h-6 text-[#eb0028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4 5 5 0 013-4.5V5a2 2 0 114 0v1.5a5 5 0 013 4.5 4 4 0 01-4 4H7zm10-7a4 4 0 01-4-4 5 5 0 013-4.5V5a2 2 0 114 0v1.5a5 5 0 013 4.5 4 4 0 01-4 4h-2z" />
        </svg>
      )
    },
    {
      title: "Community",
      tagline: "Connect with a community built around curiosity.",
      desc: "Join a passionate collective of learners committed to social resilience, environmental regeneration, and technological ethics.",
      badge: "COLLECTIVE",
      color: "from-neutral-900 via-neutral-900 to-neutral-900",
      svgIcon: (
        <svg className="w-6 h-6 text-[#eb0028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Inspiration",
      tagline: "Leave with an idea worth carrying forward.",
      desc: "Take home tangible sparks and frameworks to fuel your own student initiatives, creative projects, and civic action.",
      badge: "CATALYST",
      color: "from-red-950/30 via-neutral-900 to-neutral-900",
      svgIcon: (
        <svg className="w-6 h-6 text-[#eb0028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section id="experience" className="py-24 bg-[#0d0d0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06"
          badge="Immersive Journey"
          title="More Than A Stage"
          subtitle="Beyond the talks, TEDx PORPS YOUTH creates an atmosphere designed to evoke wonder and action."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((item, idx) => (
            <div
              key={item.title}
              className={`p-8 rounded-3xl bg-gradient-to-b ${item.color} border border-neutral-800/80 hover:border-[#eb0028]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Clean SVG Vector Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#eb0028]/40 transition-colors shadow-inner">
                    {item.svgIcon}
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#eb0028] font-bold">
                    0{idx + 1} // {item.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2 group-hover:text-neutral-100 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm font-semibold text-[#eb0028] mb-3">
                  {item.tagline}
                </p>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Minimalist Graphic Element */}
              <div className="mt-8 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Visual Dimension Element</span>
                <span className="text-neutral-600 group-hover:text-[#eb0028] group-hover:translate-x-1 transition-all">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
