'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/data/event';
import { TicketTier, BookingData } from '@/types/booking';
import {
  DEFAULT_UPI_ID,
  getPaymentSettings,
  uploadPaymentScreenshot,
  createBooking,
  getBookings
} from '@/lib/bookingsService';
import UpiPaymentBox from '@/components/UpiPaymentBox';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber: string;
  grade: string;
  section: string;
  parentName: string;
  parentPhone: string;
  ticketTier: TicketTier;
  quantity: number;
  dietaryPreference: string;
  agreeToTerms: boolean;
}

const TICKET_TIERS = {
  student: {
    label: 'Student',
    price: 0,
    priceLabel: 'Free',
    description: 'PORPS YOUTH students only',
    color: '#eb0028',
    features: ['Full Event Access', 'Welcome Kit', 'Certificate of Participation', 'Priority Seating'],
    badge: 'MOST POPULAR',
  },
  faculty: {
    label: 'Faculty & Staff',
    price: 0,
    priceLabel: 'Complimentary',
    description: 'PORPS faculty members',
    color: '#6366f1',
    features: ['Full Event Access', 'Reserved Seating', 'Speaker Meet & Greet', 'Exclusive Lounge'],
    badge: 'VIP',
  },
  general: {
    label: 'General Attendee',
    price: 299,
    priceLabel: '₹299',
    description: 'Parents & external guests',
    color: '#f59e0b',
    features: ['Full Event Access', 'Event Booklet', 'Networking Session', 'Live Streaming Link'],
    badge: '',
  },
};

const GRADES = [
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
  'Faculty',
  'Staff',
  'External Guest',
];

function generateBookingId(): string {
  return `TEDx-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
}

export default function TicketsPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<BookingData | null>(null);
  const [copied, setCopied] = useState(false);

  // Payment settings from Firestore
  const [upiId, setUpiId] = useState(DEFAULT_UPI_ID);
  const [customQrUrl, setCustomQrUrl] = useState<string | undefined>(undefined);

  // Payment screenshot upload state
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // Status Lookup Modal
  const [lookupOpen, setLookupOpen] = useState(false);
  const [lookupInput, setLookupInput] = useState('');
  const [lookupResult, setLookupResult] = useState<BookingData | null | 'not_found'>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rollNumber: '',
    grade: 'Grade 11',
    section: '',
    parentName: '',
    parentPhone: '',
    ticketTier: 'student',
    quantity: 1,
    dietaryPreference: 'None',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const spotsLeft = 187;
  const selectedTier = TICKET_TIERS[form.ticketTier];
  const totalPrice = form.ticketTier === 'general' ? 299 * form.quantity : 0;

  useEffect(() => {
    // Pre-generate bookingId so user can see it in payment reference
    if (!bookingId) {
      setBookingId(generateBookingId());
    }

    // Load remote UPI settings if available
    getPaymentSettings().then((settings) => {
      if (settings.upiId) setUpiId(settings.upiId);
      if (settings.customQrUrl) setCustomQrUrl(settings.customQrUrl);
    });
  }, [bookingId]);

  const update = (field: keyof FormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleScreenshotSelected = (file: File | null) => {
    setScreenshotFile(file);
    setPaymentError('');
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setScreenshotPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setScreenshotPreview(null);
    }
  };

  const validateStep1 = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10)
      e.phone = '10-digit number required';
    if (form.ticketTier === 'student' && !form.rollNumber.trim())
      e.rollNumber = 'Required for students';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.agreeToTerms) e.agreeToTerms = 'Please accept the terms to proceed';

    if (form.ticketTier === 'general') {
      if (!screenshotFile) {
        setPaymentError('Please upload your payment screenshot after completing UPI transfer');
        return false;
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2 && validateStep2()) {
      setIsSubmitting(true);
      const currentBookingId = bookingId || generateBookingId();

      try {
        let screenshotUrl = '';
        let screenshotFallback = '';

        // If general tier and screenshot provided, upload
        if (form.ticketTier === 'general' && screenshotFile) {
          const uploadRes = await uploadPaymentScreenshot(currentBookingId, screenshotFile);
          screenshotUrl = uploadRes.url;
          screenshotFallback = uploadRes.dataUrl;
        }

        const newBooking: BookingData = {
          bookingId: currentBookingId,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          rollNumber: form.rollNumber.trim(),
          grade: form.grade,
          section: form.section.trim(),
          parentName: form.parentName.trim(),
          parentPhone: form.parentPhone.trim(),
          ticketTier: form.ticketTier,
          quantity: form.quantity,
          totalPrice,
          dietaryPreference: form.dietaryPreference,
          timestamp: new Date().toISOString(),
          status: form.ticketTier === 'general' ? 'pending_verification' : 'confirmed',
          paymentStatus: form.ticketTier === 'general' ? 'pending' : 'free',
          paymentUpiId: upiId,
          transactionId: transactionId.trim(),
          screenshotUrl: screenshotUrl || screenshotFallback,
          screenshotFallback: screenshotFallback,
        };

        await createBooking(newBooking);
        setSubmittedBooking(newBooking);
        setBookingId(currentBookingId);
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error('Booking submission error:', err);
        alert('There was a problem submitting your booking. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const copyDetails = async () => {
    const text = `TEDx PORPS YOUTH — Booking\nBooking ID: ${bookingId}\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nTicket: ${selectedTier.label}\nStatus: ${
      form.ticketTier === 'general' ? 'Payment Pending Admin Approval' : 'Confirmed'
    }\nVenue: ${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.city}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupInput.trim()) return;
    setIsLookingUp(true);
    setLookupResult(null);

    try {
      const all = await getBookings();
      const q = lookupInput.trim().toUpperCase();
      const found = all.find(
        (b) =>
          b.bookingId.toUpperCase() === q ||
          b.email.toUpperCase() === q ||
          (b.rollNumber && b.rollNumber.toUpperCase() === q)
      );
      setLookupResult(found || 'not_found');
    } catch (err) {
      console.error(err);
      setLookupResult('not_found');
    } finally {
      setIsLookingUp(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-neutral-100 selection:bg-[#eb0028] selection:text-white overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] bg-[#eb0028]/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-indigo-900/[0.04] rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-[#0c0c0f]/80 backdrop-blur-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <Link href="/" className="flex items-baseline gap-0" aria-label="TEDx PORPS YOUTH Home">
              <span className="text-xl sm:text-2xl font-black text-[#eb0028] uppercase">TED</span>
              <span className="text-xl sm:text-2xl font-black text-[#eb0028] lowercase">x</span>
              <span className="ml-1.5 text-xs font-bold text-white/80 uppercase tracking-wider translate-y-[1px]">
                PORPS YOUTH
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLookupOpen(true)}
                className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                🔍 Check Status
              </button>
              <Link
                href="/admin"
                className="hidden sm:inline-flex px-3 py-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                Admin
              </Link>
              <Link
                href="/"
                className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white border border-white/10 rounded-xl transition-all hover:bg-white/5"
              >
                ← Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-20">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eb0028]/10 border border-[#eb0028]/20 text-[#eb0028] text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eb0028] animate-pulse" />
            {spotsLeft} spots remaining
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-3">
            Book Your <span className="text-[#eb0028]">Ticket</span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg">
            {EVENT_CONFIG.dateText} · {EVENT_CONFIG.year} · {EVENT_CONFIG.venue.name}
          </p>
        </div>

        {step < 3 && (
          <>
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-3 mb-10">
              {([
                '1. Attendee Details',
                form.ticketTier === 'general' ? '2. Review & UPI Pay' : '2. Review & Confirm',
              ] as const).map((label, idx) => {
                const s = idx + 1;
                const active = step === s;
                const done = step > s;
                return (
                  <React.Fragment key={label}>
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                        active
                          ? 'bg-[#eb0028] text-white shadow-[0_0_20px_rgba(235,0,40,0.3)]'
                          : done
                          ? 'bg-[#eb0028]/20 text-[#eb0028] border border-[#eb0028]/30'
                          : 'bg-white/5 text-neutral-500 border border-white/10'
                      }`}
                    >
                      <span className="font-black">{done ? '✓' : s}</span>
                      <span className="hidden sm:inline">{label}</span>
                    </div>
                    {idx < 1 && (
                      <div
                        className={`h-px w-8 sm:w-12 transition-colors duration-500 ${
                          step > s ? 'bg-[#eb0028]' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Ticket Tier Selector */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {(
                  Object.entries(TICKET_TIERS) as [TicketTier, (typeof TICKET_TIERS)['student']][]
                ).map(([key, tier]) => {
                  const isSelected = form.ticketTier === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      id={`ticket-tier-${key}`}
                      onClick={() => update('ticketTier', key)}
                      className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                        isSelected
                          ? 'shadow-[0_0_30px_rgba(235,0,40,0.1)]'
                          : 'border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/5'
                      }`}
                      style={{
                        borderColor: isSelected ? tier.color + '60' : undefined,
                        backgroundColor: isSelected ? tier.color + '0d' : undefined,
                      }}
                    >
                      {tier.badge && (
                        <span
                          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white"
                          style={{ backgroundColor: tier.color }}
                        >
                          {tier.badge}
                        </span>
                      )}
                      <div
                        className="text-xs font-mono uppercase tracking-widest mb-1 font-black"
                        style={{ color: tier.color }}
                      >
                        {tier.priceLabel}
                      </div>
                      <div className="text-sm font-black uppercase text-white mb-1">
                        {tier.label}
                      </div>
                      <div className="text-xs text-neutral-500 mb-3">{tier.description}</div>
                      <ul className="space-y-1">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="text-xs text-neutral-400 flex items-center gap-1.5"
                          >
                            <span style={{ color: tier.color }}>✓</span> {f}
                          </li>
                        ))}
                      </ul>
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <span className="text-[10px] font-mono text-white uppercase tracking-widest">
                            Selected ✓
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Area */}
              <div className="lg:col-span-2 space-y-5">
                {/* Step 1: Personal Details */}
                {step === 1 && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#0f0f13] border border-white/8">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#eb0028] flex items-center justify-center text-[10px] font-black text-white flex-shrink-0">
                        1
                      </span>
                      Personal Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                        >
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={form.firstName}
                          onChange={(e) => update('firstName', e.target.value)}
                          placeholder="Arjun"
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#eb0028]/30 transition-all text-sm ${
                            errors.firstName
                              ? 'border-red-500/60'
                              : 'border-white/10 focus:border-[#eb0028]/50'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                        >
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          value={form.lastName}
                          onChange={(e) => update('lastName', e.target.value)}
                          placeholder="Reddy"
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#eb0028]/30 transition-all text-sm ${
                            errors.lastName
                              ? 'border-red-500/60'
                              : 'border-white/10 focus:border-[#eb0028]/50'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder="student@porps.edu.in"
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#eb0028]/30 transition-all text-sm ${
                            errors.email
                              ? 'border-red-500/60'
                              : 'border-white/10 focus:border-[#eb0028]/50'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="9876543210"
                          maxLength={10}
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#eb0028]/30 transition-all text-sm ${
                            errors.phone
                              ? 'border-red-500/60'
                              : 'border-white/10 focus:border-[#eb0028]/50'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* Grade */}
                      <div>
                        <label
                          htmlFor="grade"
                          className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                        >
                          Grade / Category *
                        </label>
                        <select
                          id="grade"
                          value={form.grade}
                          onChange={(e) => update('grade', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-white/10 text-white focus:outline-none focus:border-[#eb0028]/50 focus:ring-1 focus:ring-[#eb0028]/30 transition-all text-sm"
                        >
                          {GRADES.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Student-specific fields */}
                      {form.ticketTier === 'student' && (
                        <>
                          <div>
                            <label
                              htmlFor="rollNumber"
                              className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                            >
                              Roll Number *
                            </label>
                            <input
                              id="rollNumber"
                              type="text"
                              value={form.rollNumber}
                              onChange={(e) => update('rollNumber', e.target.value)}
                              placeholder="PORPS-2024-001"
                              className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#eb0028]/30 transition-all text-sm ${
                                errors.rollNumber
                                  ? 'border-red-500/60'
                                  : 'border-white/10 focus:border-[#eb0028]/50'
                              }`}
                            />
                            {errors.rollNumber && (
                              <p className="text-red-400 text-xs mt-1">{errors.rollNumber}</p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="section"
                              className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                            >
                              Section
                            </label>
                            <input
                              id="section"
                              type="text"
                              value={form.section}
                              onChange={(e) => update('section', e.target.value)}
                              placeholder="A"
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="parentName"
                              className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                            >
                              Parent / Guardian Name
                            </label>
                            <input
                              id="parentName"
                              type="text"
                              value={form.parentName}
                              onChange={(e) => update('parentName', e.target.value)}
                              placeholder="Suresh Reddy"
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="parentPhone"
                              className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                            >
                              Parent Phone
                            </label>
                            <input
                              id="parentPhone"
                              type="tel"
                              value={form.parentPhone}
                              onChange={(e) => update('parentPhone', e.target.value)}
                              placeholder="9876543210"
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
                            />
                          </div>
                        </>
                      )}

                      {/* Quantity for general */}
                      {form.ticketTier === 'general' && (
                        <div>
                          <label
                            htmlFor="quantity"
                            className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                          >
                            Number of Tickets
                          </label>
                          <select
                            id="quantity"
                            value={form.quantity}
                            onChange={(e) => update('quantity', Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-white/10 text-white focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
                          >
                            {[1, 2, 3, 4, 5].map((n) => (
                              <option key={n} value={n}>
                                {n} Ticket{n > 1 ? 's' : ''} (₹{299 * n})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Dietary */}
                      <div className={form.ticketTier === 'student' ? 'sm:col-span-2' : ''}>
                        <label
                          htmlFor="dietary"
                          className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
                        >
                          Dietary Preference
                        </label>
                        <select
                          id="dietary"
                          value={form.dietaryPreference}
                          onChange={(e) => update('dietaryPreference', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-white/10 text-white focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
                        >
                          {['None', 'Vegetarian', 'Vegan', 'Jain', 'No Nuts', 'Gluten Free'].map(
                            (d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Review & UPI Payment */}
                {step === 2 && (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#0f0f13] border border-white/8">
                      <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-5">
                        Attendee Information
                      </h2>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {[
                          ['Name', `${form.firstName} ${form.lastName}`],
                          ['Email', form.email],
                          ['Phone', form.phone],
                          ['Ticket Type', selectedTier.label],
                          ['Grade', form.grade],
                          ...(form.ticketTier === 'student'
                            ? [
                                ['Roll No.', form.rollNumber || '—'],
                                ['Section', form.section || '—'],
                                ['Parent', form.parentName || '—'],
                              ]
                            : []),
                          ...(form.ticketTier === 'general'
                            ? [['Qty', `${form.quantity} ticket${form.quantity > 1 ? 's' : ''}`]]
                            : []),
                          ['Dietary', form.dietaryPreference],
                        ].map(([label, val]) => (
                          <React.Fragment key={label}>
                            <span className="text-xs font-mono text-neutral-600 uppercase tracking-wide">
                              {label}
                            </span>
                            <span className="text-sm text-white font-medium truncate">{val}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* General Tier: Full UPI QR + Screenshot Upload */}
                    {form.ticketTier === 'general' ? (
                      <UpiPaymentBox
                        amount={totalPrice}
                        bookingId={bookingId}
                        upiId={upiId}
                        customQrUrl={customQrUrl}
                        onScreenshotSelected={handleScreenshotSelected}
                        screenshotFile={screenshotFile}
                        screenshotPreview={screenshotPreview}
                        transactionId={transactionId}
                        onTransactionIdChange={setTransactionId}
                        error={paymentError}
                      />
                    ) : (
                      /* Free tier notice */
                      <div className="p-5 rounded-2xl bg-[#eb0028]/8 border border-[#eb0028]/20 flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-[#eb0028] flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <div>
                          <div className="text-sm font-bold text-white">
                            Complimentary — No Payment Required
                          </div>
                          <div className="text-xs text-neutral-400">
                            Your pass is completely free for {selectedTier.label.toLowerCase()}s
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Terms */}
                    <div className="p-6 rounded-2xl bg-[#0f0f13] border border-white/8">
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
                        Terms & Conditions
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-400 mb-5">
                        <li>→ Tickets are non-transferable and non-refundable</li>
                        <li>→ Valid photo ID required on event day</li>
                        <li>→ Photography/videography consent granted upon entry</li>
                        <li>→ Event schedule may change without prior notice</li>
                        <li>→ Confirmation will be verified by the TEDx organizing team</li>
                      </ul>
                      <label
                        className="flex items-start gap-3 cursor-pointer group"
                        htmlFor="agreeToTerms"
                      >
                        <button
                          type="button"
                          id="agreeToTerms"
                          role="checkbox"
                          aria-checked={form.agreeToTerms}
                          onClick={() => update('agreeToTerms', !form.agreeToTerms)}
                          className={`mt-0.5 w-5 h-5 rounded-md flex-shrink-0 border-2 flex items-center justify-center transition-all ${
                            form.agreeToTerms
                              ? 'bg-[#eb0028] border-[#eb0028]'
                              : 'border-white/20 hover:border-white/40 bg-transparent'
                          }`}
                        >
                          {form.agreeToTerms && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <span className="text-sm text-neutral-300 group-hover:text-white transition-colors leading-relaxed">
                          I have read and agree to the terms & conditions, and confirm all entered
                          information is accurate.
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="text-red-400 text-xs mt-2 ml-8">{errors.agreeToTerms}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Sidebar */}
              <div>
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0f0f13] border border-white/8 sticky top-28">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-600 mb-4">
                    Order Summary
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="text-sm font-bold text-white">
                          {selectedTier.label} Ticket
                        </div>
                        <div className="text-xs text-neutral-600">
                          {EVENT_CONFIG.dateText}, {EVENT_CONFIG.year}
                        </div>
                      </div>
                      <div
                        className="text-sm font-black flex-shrink-0"
                        style={{ color: selectedTier.color }}
                      >
                        {selectedTier.priceLabel}
                      </div>
                    </div>

                    {form.ticketTier === 'general' && form.quantity > 1 && (
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>× {form.quantity} tickets</span>
                        <span>₹{totalPrice}</span>
                      </div>
                    )}

                    <div className="h-px bg-white/8" />

                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono uppercase text-neutral-500">Total</span>
                      <span className="text-lg font-black text-white">
                        {totalPrice > 0 ? `₹${totalPrice}` : 'Free'}
                      </span>
                    </div>

                    {form.ticketTier === 'general' && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
                        ⚡ UPI ID: <span className="font-mono font-bold text-white">{upiId}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-white/3 border border-white/5 mb-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1">
                      Venue
                    </div>
                    <div className="text-xs text-neutral-300">{EVENT_CONFIG.venue.name}</div>
                    <div className="text-xs text-neutral-500">{EVENT_CONFIG.venue.city}</div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#eb0028]/8 border border-[#eb0028]/15">
                    <span className="w-2 h-2 rounded-full bg-[#eb0028] animate-pulse flex-shrink-0" />
                    <span className="text-xs text-[#eb0028] font-mono">
                      {spotsLeft} spots left
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
              {step === 2 ? (
                <button
                  type="button"
                  id="back-btn"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl text-sm font-mono uppercase tracking-wider text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 transition-all hover:bg-white/5"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                id="next-btn"
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#eb0028] hover:bg-[#c5001f] text-white font-bold text-sm font-mono uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(235,0,40,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting Booking...
                  </>
                ) : step === 1 ? (
                  'Continue to Payment / Review →'
                ) : form.ticketTier === 'general' ? (
                  'Submit Payment & Book Ticket →'
                ) : (
                  'Confirm Booking →'
                )}
              </button>
            </div>
          </>
        )}

        {/* ─── Step 3: Confirmation ─── */}
        {step === 3 && (
          <div className="max-w-lg mx-auto">
            <div className="relative p-8 sm:p-12 rounded-3xl bg-[#0f0f13] border border-white/10 overflow-hidden text-center">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[#eb0028]/10 rounded-full blur-[80px]" />
              </div>

              <div className="relative z-10">
                {/* Status Icon */}
                <div
                  className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto mb-6 ${
                    form.ticketTier === 'general'
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                      : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                  }`}
                >
                  {form.ticketTier === 'general' ? (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <div
                  className={`text-xs font-mono uppercase tracking-widest mb-2 font-bold ${
                    form.ticketTier === 'general' ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {form.ticketTier === 'general'
                    ? 'Payment Proof Submitted'
                    : 'Booking Confirmed!'}
                </div>

                <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mb-2">
                  {form.ticketTier === 'general' ? 'Verification Pending' : "You're In!"}
                </h2>
                <p className="text-neutral-400 text-sm mb-7">
                  Thank you, <span className="text-white font-semibold">{form.firstName}</span>!{' '}
                  {form.ticketTier === 'general'
                    ? 'Our admin team is reviewing your payment screenshot. You will receive final pass confirmation shortly.'
                    : 'Your spot at TEDx PORPS YOUTH is secured.'}
                </p>

                {/* Booking ID Box */}
                <div className="p-4 rounded-2xl bg-white/4 border border-white/8 mb-6">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                    Booking ID
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#eb0028] tracking-wider font-mono">
                    {bookingId}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Save this ID to check your booking and payment verification status
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                  {[
                    ['Date', `${EVENT_CONFIG.dateText}, ${EVENT_CONFIG.year}`],
                    ['Tier', selectedTier.label],
                    [
                      'Payment',
                      form.ticketTier === 'general'
                        ? 'Pending Admin Approval'
                        : 'Free / Confirmed',
                    ],
                    ['Doors Open', '8:30 AM'],
                  ].map(([l, v]) => (
                    <div key={l} className="p-3 rounded-xl bg-white/3 border border-white/5">
                      <div className="text-[10px] text-neutral-600 font-mono uppercase tracking-wider mb-0.5">
                        {l}
                      </div>
                      <div className="font-semibold text-white text-xs sm:text-sm">{v}</div>
                    </div>
                  ))}
                  <div className="p-3 rounded-xl bg-white/3 border border-white/5 col-span-2">
                    <div className="text-[10px] text-neutral-600 font-mono uppercase tracking-wider mb-0.5">
                      Venue
                    </div>
                    <div className="font-semibold text-white text-xs sm:text-sm">
                      {EVENT_CONFIG.venue.name}, {EVENT_CONFIG.venue.city}
                    </div>
                  </div>
                </div>

                {/* What's next info box */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left mb-6">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#eb0028] mb-2 font-bold">
                    What Happens Next?
                  </div>
                  <ul className="text-xs text-neutral-400 space-y-1.5">
                    {form.ticketTier === 'general' ? (
                      <>
                        <li>
                          ✓ Admin will review your screenshot against UPI ID{' '}
                          <span className="text-white font-mono">{upiId}</span>.
                        </li>
                        <li>
                          ✓ Check status anytime using the{' '}
                          <strong className="text-white">&ldquo;Check Status&rdquo;</strong> button above.
                        </li>
                        <li>✓ Once approved, present your Booking ID at registration desk.</li>
                      </>
                    ) : (
                      <>
                        <li>✓ Bring your School ID card or Roll Number on event day.</li>
                        <li>✓ Arrive at the auditorium by 8:30 AM for badge collection.</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/"
                    id="back-home-btn"
                    className="flex-1 py-3 px-5 rounded-xl text-sm font-mono uppercase tracking-wider text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 transition-all text-center hover:bg-white/5"
                  >
                    Back to Home
                  </Link>
                  <button
                    type="button"
                    id="copy-details-btn"
                    onClick={copyDetails}
                    className="flex-1 py-3 px-5 rounded-xl bg-[#eb0028] hover:bg-[#c5001f] text-white font-bold text-sm font-mono uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {copied ? '✓ Copied Details!' : 'Copy Details'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Status Lookup Modal ─── */}
      {lookupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#0f0f13] border border-white/15 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-white uppercase tracking-wide">
                Check Booking / Payment Status
              </h3>
              <button
                type="button"
                onClick={() => {
                  setLookupOpen(false);
                  setLookupResult(null);
                  setLookupInput('');
                }}
                className="w-8 h-8 rounded-full bg-white/5 text-neutral-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Enter Booking ID, Email, or Roll No.
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={lookupInput}
                    onChange={(e) => setLookupInput(e.target.value)}
                    placeholder="e.g. TEDx-ABC123 or email@gmail.com"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#eb0028]"
                  />
                  <button
                    type="submit"
                    disabled={isLookingUp}
                    className="px-4 py-2.5 rounded-xl bg-[#eb0028] hover:bg-[#c5001f] text-white text-xs font-mono uppercase font-bold tracking-wider transition-all disabled:opacity-50"
                  >
                    {isLookingUp ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>
            </form>

            {/* Results */}
            {lookupResult === 'not_found' && (
              <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-mono">
                No matching booking found. Please check your Booking ID or email.
              </div>
            )}

            {lookupResult && lookupResult !== 'not_found' && (
              <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Status</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono uppercase font-bold ${
                      lookupResult.paymentStatus === 'approved' ||
                      lookupResult.paymentStatus === 'free'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : lookupResult.paymentStatus === 'rejected'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {lookupResult.paymentStatus === 'approved'
                      ? 'Payment Approved ✓'
                      : lookupResult.paymentStatus === 'free'
                      ? 'Confirmed (Free)'
                      : lookupResult.paymentStatus === 'rejected'
                      ? 'Payment Rejected'
                      : 'Payment Pending Review'}
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  {lookupResult.firstName} {lookupResult.lastName}
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  ID: <span className="text-[#eb0028]">{lookupResult.bookingId}</span> · Tier:{' '}
                  {lookupResult.ticketTier}
                </div>
                {lookupResult.rejectionReason && (
                  <div className="text-xs text-red-400 p-2 rounded-lg bg-red-500/10">
                    Note: {lookupResult.rejectionReason}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
