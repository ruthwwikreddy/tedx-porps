'use client';

import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { FAQ_DATA } from '@/data/content';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#0d0d0f] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="10"
          badge="Inquiries & Clarity"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know regarding TEDx PORPS YOUTH, speaker curation, and event guidelines."
        />

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-neutral-900/50 border border-neutral-800/80 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb0028]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#eb0028] font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-mono text-neutral-300 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#eb0028] text-white' : ''
                    }`}
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-neutral-800/50 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase">
                      <span>Category: {faq.category}</span>
                      <span>•</span>
                      <span>Official Event Policy</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
