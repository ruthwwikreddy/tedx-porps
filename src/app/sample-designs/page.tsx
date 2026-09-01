import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { EVENT_CONFIG } from '@/data/event';

export const metadata: Metadata = {
  title: `Sample Designs & Prototypes | ${EVENT_CONFIG.name}`,
  description: `Browse sample designs, theme concepts, and interactive standalone HTML prototypes for ${EVENT_CONFIG.name}.`,
};

const sampleDesigns = [
  {
    id: "1",
    filename: "1.html",
    path: "/designs/1.html",
    themePath: "/themes/1.html",
    title: "Design Concept 01 — Kinetic Horizon",
    badge: "Sample Design 1",
    accent: "from-red-950/40 via-neutral-900 to-neutral-900"
  },
  {
    id: "2",
    filename: "2.html",
    path: "/designs/2.html",
    themePath: "/themes/2.html",
    title: "Design Concept 02 — Neural Synergy",
    badge: "Sample Design 2",
    accent: "from-neutral-900 via-neutral-900 to-neutral-900"
  },
  {
    id: "3",
    filename: "3.html",
    path: "/designs/3.html",
    themePath: "/themes/3.html",
    title: "Design Concept 03 — Unbound Catalysts",
    badge: "Sample Design 3",
    accent: "from-neutral-900 via-neutral-900 to-red-950/30"
  }
];

export default function SampleDesignsPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0f] text-neutral-100 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between selection:bg-[#eb0028] selection:text-white">
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <span>&larr; Back to Official Website</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#eb0028]">
            <span className="w-2 h-2 rounded-full bg-[#eb0028] animate-ping" />
            HTML Design Archive
          </div>
        </div>

        {/* Hero Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest text-[#eb0028] bg-red-950/30 border border-red-900/40 uppercase mb-4 font-bold">
            Curatorial Concept Archive
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Sample Designs
          </h1>
        </div>

        {/* Designs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleDesigns.map((design) => (
            <div
              key={design.id}
              className={`rounded-3xl bg-gradient-to-b ${design.accent} border border-neutral-800 hover:border-[#eb0028]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl group`}
            >
              {/* Visual Preview Area */}
              <div className="aspect-video w-full bg-black/40 border-b border-neutral-800 relative overflow-hidden group-hover:bg-black/20 transition-colors">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#eb0028]/10 border border-[#eb0028]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                       <span className="text-[#eb0028] font-mono text-xs">HTML</span>
                    </div>
                 </div>
                 {/* Simple mock window controls */}
                 <div className="absolute top-3 left-3 flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-neutral-700" />
                    <div className="w-2 h-2 rounded-full bg-neutral-700" />
                    <div className="w-2 h-2 rounded-full bg-neutral-700" />
                 </div>
              </div>

              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#eb0028] font-bold bg-neutral-950/80 px-3 py-1 rounded-full border border-white/5">
                      {design.badge}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {design.filename}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-6 group-hover:text-neutral-100 transition-colors">
                    {design.title}
                  </h2>
                </div>

                <div className="space-y-3 pt-6 border-t border-neutral-800/80">
                  <a
                    href={design.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#eb0028] hover:bg-[#b8001f] text-white font-bold text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 text-center"
                  >
                    <span>Launch Live Preview</span>
                    <span>&rarr;</span>
                  </a>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 px-1">
                    <span className="truncate mr-2">File: /public/designs/{design.filename}</span>
                    <a
                      href={design.path}
                      download={design.filename}
                      className="hover:text-neutral-300 transition-colors underline shrink-0"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Public Directory Structure Index */}
        <div className="mt-16 p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800/80">
          <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 font-bold flex items-center gap-2">
            <svg className="w-4 h-4 text-[#eb0028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Public Folder Design HTML Index
          </h3>
          
          <div className="bg-black/60 rounded-xl p-4 font-mono text-xs text-neutral-300 space-y-2 border border-neutral-800">
            <div className="text-neutral-500"># Available static HTML files in /public/designs:</div>
            <div className="flex items-center justify-between hover:text-white">
              <span>├── /public/designs/1.html</span>
              <a href="/designs/1.html" target="_blank" className="text-[#eb0028] hover:underline">/designs/1.html &rarr;</a>
            </div>
            <div className="flex items-center justify-between hover:text-white">
              <span>├── /public/designs/2.html</span>
              <a href="/designs/2.html" target="_blank" className="text-[#eb0028] hover:underline">/designs/2.html &rarr;</a>
            </div>
            <div className="flex items-center justify-between hover:text-white">
              <span>└── /public/designs/3.html</span>
              <a href="/designs/3.html" target="_blank" className="text-[#eb0028] hover:underline">/designs/3.html &rarr;</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto w-full pt-16 mt-16 border-t border-neutral-900 text-center text-xs font-mono text-neutral-500">
        TEDx PORPS YOUTH • {EVENT_CONFIG.dateText} • Sample Designs Archive
      </div>
    </main>
  );
}
