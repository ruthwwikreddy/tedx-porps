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

        {/* Sponsorship Package Highlight from Slide 11 & 12 */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900/90 via-black to-neutral-900/90 border border-white/10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#eb0028] bg-red-950/40 border border-red-900/50 px-3 py-1 rounded-full mb-2">
                <span>Direct Sponsorship Level</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Corporate &amp; Patron Partnership
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                Direct support levels structured to enable production excellence while offering clean, tasteful brand positioning.
              </p>
            </div>
            <div className="lg:text-right">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                Investment Threshold
              </span>
              <span className="text-3xl sm:text-4xl font-black text-white font-mono text-[#eb0028]">
                ₹50,000+
              </span>
            </div>
          </div>

          {/* 6 Partner Benefits Grid */}
          <div className="pt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 font-bold">
              What Our Sponsors Receive (Slide 12)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { n: "01", t: "Social Media", d: "Featured digital promotion across channels" },
                { n: "02", t: "Event Branding", d: "Stage backdrop & venue architecture" },
                { n: "03", t: "Dedicated Stall", d: "Interactive physical presence zone" },
                { n: "04", t: "Video Recognition", d: "Pre-roll on archival TEDx talks" },
                { n: "05", t: "On-Event Honors", d: "Verbal recognition during ceremonies" },
                { n: "06", t: "Sponsor Thanks", d: "Official certificate & appreciation memento" }
              ].map((b) => (
                <div key={b.n} className="p-3.5 rounded-xl bg-white/3 border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#eb0028] font-bold">{b.n}</span>
                    <h5 className="text-xs font-bold text-white uppercase mt-1">{b.t}</h5>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-2 font-light">{b.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fund Allocation from Slide 16 */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
              <span className="uppercase tracking-wider font-bold text-neutral-300">Where Your Support Goes (Slide 16)</span>
              <span className="text-neutral-500 hidden sm:inline">100% Student &amp; Event Reinvestment</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-[#eb0028] font-mono font-bold">01 //</span>
                <div className="font-semibold text-white mt-1">Infrastructure</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Venue styling &amp; AV setup</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-[#eb0028] font-mono font-bold">02 //</span>
                <div className="font-semibold text-white mt-1">Production</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Livestreaming &amp; 4K recording</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-[#eb0028] font-mono font-bold">03 //</span>
                <div className="font-semibold text-white mt-1">Speaker Care</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Hospitality &amp; guest coordination</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-[#eb0028] font-mono font-bold">04 //</span>
                <div className="font-semibold text-white mt-1">Engagement</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Delegate kits &amp; workshops</div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Inquiries Callout */}
        <div className="p-8 rounded-2xl bg-neutral-900/30 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-tight">
              Interested in Partnering With Us?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Associate with ideas worth spreading. Explore our complete 2026 Sponsorship Proposal presentation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/pitchdesk.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#eb0028] hover:bg-[#b8001f] text-xs font-mono uppercase tracking-widest text-white font-bold transition-all text-center whitespace-nowrap shadow-lg shadow-red-950/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              View Sponsorship Deck &rarr;
            </a>
            <a
              href="/pitchdesk.pdf"
              download="TEDxPORPS_Youth_2026_Sponsorship_Proposal.pdf"
              className="px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white border border-white/15 transition-all text-center whitespace-nowrap"
            >
              PDF &darr;
            </a>
            <a
              href="/pitchdesk.pptx"
              download="TEDxPORPS_Youth_2026_Sponsorship_Proposal.pptx"
              className="px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white border border-white/15 transition-all text-center whitespace-nowrap"
            >
              PPT &darr;
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-widest text-white border border-white/15 transition-all text-center whitespace-nowrap"
            >
              Inquire For Partnership &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
