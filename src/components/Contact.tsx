'use client';

import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { EVENT_CONFIG } from '@/data/event';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="13"
          badge="Direct Inquiries"
          title="Let's Connect"
          subtitle="Reach out to the TEDx PORPS YOUTH curatorial and operations committee."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info from Slide 19 */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 shadow-xl space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#eb0028] font-bold">
                  Direct Enquiries &amp; Organisers
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">
                  TEDxPORPS Youth 2026
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  P. Obul Reddy Public School, Jubilee Hills, Hyderabad
                </p>
              </div>

              {/* Co-Organiser 1 */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#eb0028] uppercase tracking-wider font-bold">Co-Organiser</span>
                <div className="text-sm font-bold text-white">Yelamanchili Ananya</div>
                <div className="text-xs text-neutral-400 font-mono">
                  Email: <a href="mailto:yananyaanu@gmail.com" className="text-white hover:text-[#eb0028] transition-colors">yananyaanu@gmail.com</a>
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  Phone: <a href="tel:8977540506" className="text-white hover:text-[#eb0028] transition-colors">8977540506</a>
                </div>
              </div>

              {/* Co-Organiser 2 */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#eb0028] uppercase tracking-wider font-bold">Co-Organiser</span>
                <div className="text-sm font-bold text-white">Abhirami Vutla</div>
                <div className="text-xs text-neutral-400 font-mono">
                  Email: <a href="mailto:Abhiramivutla@gmail.com" className="text-white hover:text-[#eb0028] transition-colors">Abhiramivutla@gmail.com</a>
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  Phone: <a href="tel:+919959302051" className="text-white hover:text-[#eb0028] transition-colors">+91 99593 02051</a>
                </div>
              </div>

              {/* Teacher Organiser */}
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#eb0028] uppercase tracking-wider font-bold">Teacher Organiser</span>
                <div className="text-sm font-bold text-white">Ms. C. Shruti Reddy</div>
                <div className="text-xs text-neutral-400">P. Obul Reddy Public School</div>
                <div className="text-xs text-neutral-400 font-mono">
                  Phone: <a href="tel:+919177071678" className="text-white hover:text-[#eb0028] transition-colors">+91 91 77071 678</a>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30 text-xs text-neutral-400">
                <span className="text-[#eb0028] font-bold">Partnerships &amp; Media:</span> Contact us directly for brand alignments, stall setups, or official press access.
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/40 border border-white/10 shadow-2xl backdrop-blur-md">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#eb0028]/20 text-[#eb0028] flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h4 className="text-2xl font-bold uppercase tracking-tight text-white">
                    Message Received
                  </h4>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you for reaching out to {EVENT_CONFIG.name}. Our student liaison team will review your message and reply promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-mono uppercase tracking-widest text-white transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Maya Rao"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#eb0028] focus:ring-1 focus:ring-[#eb0028] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#eb0028] focus:ring-1 focus:ring-[#eb0028] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Message / Inquiry
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      placeholder="Share your inquiry or proposal with the team..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#eb0028] focus:ring-1 focus:ring-[#eb0028] transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#eb0028] hover:bg-[#b8001f] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-xl shadow-red-950/40"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
