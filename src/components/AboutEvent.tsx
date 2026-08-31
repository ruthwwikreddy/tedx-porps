import React from 'react';
import { SectionHeading } from './SectionHeading';
import { EVENT_CONFIG } from '@/data/event';

export const AboutEvent: React.FC = () => {
  const blocks = [
    {
      num: "01",
      title: "IDEAS",
      desc: "Thought-provoking perspectives and stories addressing science, social impact, technology, and art.",
      tag: "Intellectual Vitality"
    },
    {
      num: "02",
      title: "PEOPLE",
      desc: "Students, educators, creators, and changemakers coming together under one shared roof.",
      tag: "Diverse Community"
    },
    {
      num: "03",
      title: "CONVERSATIONS",
      desc: "Dialogues and debates that spark on the stage and reverberate through school halls and beyond.",
      tag: "Lasting Impact"
    },
    {
      num: "04",
      title: "EXPERIENCE",
      desc: "A memorable day engineered around curiosity, youthful energy, discovery, and artistic performance.",
      tag: "Sensory Engagement"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <SectionHeading
            number="02"
            badge={EVENT_CONFIG.schoolName}
            title="A Day Built Around Ideas"
            subtitle={`${EVENT_CONFIG.name} is a premier student-curated ideas forum taking place on ${EVENT_CONFIG.dateText}. We assemble visionary minds to inspire our student body and extended community.`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blocks.map((block) => (
            <div
              key={block.num}
              className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-[#eb0028]/40 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#eb0028]/5 rounded-bl-full pointer-events-none group-hover:bg-[#eb0028]/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black font-mono text-[#eb0028]">
                    {block.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded">
                    {block.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-3 group-hover:text-neutral-100 transition-colors">
                  {block.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {block.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800/60 flex items-center text-xs font-mono text-neutral-500 group-hover:text-[#eb0028] transition-colors">
                <span>Explore Dimension &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
