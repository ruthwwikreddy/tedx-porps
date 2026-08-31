import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Countdown } from '@/components/Countdown';
import { AboutTedx } from '@/components/AboutTedx';
import { AboutEvent } from '@/components/AboutEvent';
import { Theme } from '@/components/Theme';
import { Speakers } from '@/components/Speakers';
import { Schedule } from '@/components/Schedule';
import { Experience } from '@/components/Experience';
import { Venue } from '@/components/Venue';
import { Organizers } from '@/components/Organizers';
import { Partners } from '@/components/Partners';
import { FAQ } from '@/components/FAQ';
import { Gallery } from '@/components/Gallery';
import { Updates } from '@/components/Updates';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0f] text-neutral-100 flex flex-col selection:bg-[#eb0028] selection:text-white">
      {/* Sticky & Floating Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Live Event Countdown */}
      <Countdown />

      {/* About TED & TEDx */}
      <AboutTedx />

      {/* About The P. Obul Reddy Public School Event */}
      <AboutEvent />

      {/* Theme Section */}
      <Theme />

      {/* Curated Speakers Grid & Detail Modal */}
      <Speakers />

      {/* Timeline Schedule */}
      <Schedule />

      {/* Thematic Experience Dimensions */}
      <Experience />

      {/* Venue & Location */}
      <Venue />

      {/* Organizing Team & Student Core */}
      <Organizers />

      {/* Partners & Sponsors Tier */}
      <Partners />

      {/* Moments & Memories Visual Gallery */}
      <Gallery />

      {/* Dispatches & News from the Event */}
      <Updates />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Direct Contact & Collaboration Form */}
      <Contact />

      {/* Dark Editorial Footer */}
      <Footer />
    </main>
  );
}
