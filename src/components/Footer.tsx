import React from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/data/event';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Theme', href: '#theme' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Experience', href: '#experience' },
    { label: 'Organizers', href: '#organizers' },
    { label: 'Partners', href: '#partners' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
    { label: 'Sample Designs', href: '/sample-designs' },
  ];

  return (
    <footer className="bg-black text-neutral-400 border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-neutral-900">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-[#eb0028]">
                TED<span className="text-sm uppercase font-black -top-1 relative">x</span>
              </span>
              <span className="ml-2 text-sm font-semibold tracking-tight text-white">
                PORPS YOUTH
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              {EVENT_CONFIG.tagline} Taking place on {EVENT_CONFIG.dateText} at {EVENT_CONFIG.venue.name}.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eb0028]" />
              {EVENT_CONFIG.dateText} • Hyderabad
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-neutral-400 hover:text-white transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials & Compliance */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={EVENT_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono text-neutral-300 hover:text-[#eb0028] hover:border-[#eb0028] transition-all"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono text-neutral-300 hover:text-[#eb0028] hover:border-[#eb0028] transition-all"
                aria-label="X Twitter"
              >
                X
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono text-neutral-300 hover:text-[#eb0028] hover:border-[#eb0028] transition-all"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono text-neutral-300 hover:text-[#eb0028] hover:border-[#eb0028] transition-all"
                aria-label="YouTube"
              >
                YT
              </a>
            </div>

            <p className="text-[11px] font-mono text-neutral-500 pt-2">
              Official updates posted on our social channels.
            </p>
          </div>
        </div>

        {/* Bottom Legal & TEDx Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="text-center md:text-left text-[11px] leading-relaxed max-w-xl">
            {EVENT_CONFIG.disclaimer}
          </p>

          <p className="font-mono text-[11px] text-neutral-400">
            &copy; {currentYear} {EVENT_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
