'use client';

import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '@/data/event';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date(EVENT_CONFIG.eventDateISO).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isPast: false,
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n: number) => {
    return n.toString().padStart(2, '0');
  };

  const timeBlocks = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'SECONDS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <section className="relative py-16 bg-[#0a0a0c] border-y border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-[#eb0028]/10 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#eb0028] font-semibold">
            MARK YOUR CALENDAR
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            Counting Down to {EVENT_CONFIG.dateText}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-2">
            Target Year: {EVENT_CONFIG.year} • PORPS YOUTH
          </p>
        </div>

        {mounted ? (
          timeLeft.isPast ? (
            <div className="p-8 text-center rounded-2xl bg-neutral-900/80 border border-neutral-800 max-w-2xl mx-auto">
              <div className="inline-block p-3 rounded-full bg-[#eb0028]/20 text-[#eb0028] mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                THE EVENT HAS BEGUN
              </h3>
              <p className="text-neutral-400 text-sm mt-2">
                Thank you for being part of TEDx PORPS YOUTH. Follow our live social channels for updates and stage highlights.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {timeBlocks.map((block) => (
                <div
                  key={block.label}
                  className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center relative overflow-hidden group hover:border-[#eb0028]/40 transition-all shadow-lg"
                >
                  <div className="text-4xl sm:text-6xl md:text-7xl font-black font-mono tracking-tight text-white group-hover:text-[#eb0028] transition-colors">
                    {block.value}
                  </div>
                  <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-400 mt-2 font-medium">
                    {block.label}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#eb0028]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-36 rounded-2xl bg-neutral-900/60 border border-neutral-800" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
