'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BookingData, PaymentStatus, PaymentSettings } from '@/types/booking';
import {
  getBookings,
  updateBooking,
  getPaymentSettings,
  updatePaymentSettings,
  uploadCustomQrImage,
  DEFAULT_UPI_ID,
} from '@/lib/bookingsService';

const TIER_COLOR: Record<string, string> = {
  student: '#eb0028',
  faculty: '#6366f1',
  general: '#f59e0b',
};

const TIER_LABEL: Record<string, string> = {
  student: 'Student',
  faculty: 'Faculty',
  general: 'General',
};

const ADMIN_PASSWORD = 'tedx2026';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters & Tabs
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState<'all' | 'student' | 'faculty' | 'general'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'checked-in' | 'cancelled' | 'pending_verification'>('all');
  const [filterPayment, setFilterPayment] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'free'>('all');
  const [activeTab, setActiveTab] = useState<'bookings' | 'analytics' | 'checkin' | 'settings'>('bookings');

  // Modals & Inspection
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [screenshotModalUrl, setScreenshotModalUrl] = useState<string | null>(null);
  const [rejectionNote, setRejectionNote] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  // Check-In
  const [checkInInput, setCheckInInput] = useState('');
  const [checkInResult, setCheckInResult] = useState<{ success: boolean; message: string; booking?: BookingData } | null>(null);

  // Payment QR Settings
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    upiId: DEFAULT_UPI_ID,
    customQrUrl: '',
  });
  const [newUpiId, setNewUpiId] = useState(DEFAULT_UPI_ID);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [qrUploadStatus, setQrUploadStatus] = useState<string>('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedBookings, settings] = await Promise.all([
        getBookings(),
        getPaymentSettings(),
      ]);
      setBookings(fetchedBookings);
      setPaymentSettings(settings);
      setNewUpiId(settings.upiId || DEFAULT_UPI_ID);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated, loadData]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Try: tedx2026');
    }
  };

  const handleUpdateStatus = async (
    id: string,
    updates: Partial<BookingData>
  ) => {
    const updated = bookings.map((b) =>
      b.bookingId === id ? { ...b, ...updates } : b
    );
    setBookings(updated);

    if (selectedBooking?.bookingId === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, ...updates } : null));
    }

    try {
      await updateBooking(id, updates);
    } catch (err) {
      console.error('Failed to persist update:', err);
    }
  };

  const handleApprovePayment = async (booking: BookingData) => {
    await handleUpdateStatus(booking.bookingId, {
      paymentStatus: 'approved',
      status: 'confirmed',
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'Admin',
    });
    setShowRejectInput(false);
  };

  const handleRejectPayment = async (booking: BookingData) => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }
    await handleUpdateStatus(booking.bookingId, {
      paymentStatus: 'rejected',
      status: 'cancelled',
      rejectionReason: rejectionNote.trim() || 'Payment verification failed',
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'Admin',
    });
    setShowRejectInput(false);
    setRejectionNote('');
  };

  const handleCheckIn = () => {
    const query = checkInInput.trim().toUpperCase();
    const found = bookings.find(
      (b) =>
        b.bookingId.toUpperCase() === query ||
        b.email.toLowerCase() === query.toLowerCase() ||
        (b.rollNumber && b.rollNumber.toLowerCase() === query.toLowerCase())
    );

    if (!found) {
      setCheckInResult({
        success: false,
        message: 'No booking found with this ID, email, or roll number.',
      });
    } else if (found.status === 'cancelled' || found.paymentStatus === 'rejected') {
      setCheckInResult({
        success: false,
        message: 'This booking is cancelled or payment was rejected.',
        booking: found,
      });
    } else if (found.paymentStatus === 'pending') {
      setCheckInResult({
        success: false,
        message: 'Payment verification is still pending for this attendee!',
        booking: found,
      });
    } else if (found.status === 'checked-in') {
      setCheckInResult({
        success: false,
        message: 'Already checked in!',
        booking: found,
      });
    } else {
      handleUpdateStatus(found.bookingId, { status: 'checked-in' });
      setCheckInResult({
        success: true,
        message: 'Check-in successful! Welcome to TEDx.',
        booking: { ...found, status: 'checked-in' },
      });
    }
  };

  const handleSaveUpiId = async () => {
    if (!newUpiId.trim()) return;
    setIsSavingSettings(true);
    try {
      await updatePaymentSettings({ upiId: newUpiId.trim() });
      setPaymentSettings((prev) => ({ ...prev, upiId: newUpiId.trim() }));
      setQrUploadStatus('UPI ID updated successfully!');
      setTimeout(() => setQrUploadStatus(''), 3000);
    } catch {
      setQrUploadStatus('Failed to update UPI ID');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleCustomQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setQrUploadStatus('Uploading & compressing QR code...');
    try {
      const url = await uploadCustomQrImage(file);
      setPaymentSettings((prev) => ({ ...prev, customQrUrl: url }));
      setQrUploadStatus('Custom QR code uploaded and active!');
      setTimeout(() => setQrUploadStatus(''), 4000);
    } catch (err) {
      console.error(err);
      setQrUploadStatus('Failed to upload custom QR');
    }
  };

  const handleRemoveCustomQr = async () => {
    setIsSavingSettings(true);
    try {
      await updatePaymentSettings({ customQrUrl: '' });
      setPaymentSettings((prev) => ({ ...prev, customQrUrl: '' }));
      setQrUploadStatus('Custom QR removed. System will use Auto-generated QR.');
      setTimeout(() => setQrUploadStatus(''), 3000);
    } catch {
      setQrUploadStatus('Failed to remove custom QR');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Filter Bookings
  const filtered = bookings.filter((b) => {
    const matchSearch =
      search === '' ||
      `${b.firstName} ${b.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      (b.rollNumber && b.rollNumber.toLowerCase().includes(search.toLowerCase())) ||
      (b.transactionId && b.transactionId.toLowerCase().includes(search.toLowerCase()));

    const matchTier = filterTier === 'all' || b.ticketTier === filterTier;
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchPayment = filterPayment === 'all' || b.paymentStatus === filterPayment;

    return matchSearch && matchTier && matchStatus && matchPayment;
  });

  // Analytics Metrics
  const totalTickets = bookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
  const checkedIn = bookings.filter((b) => b.status === 'checked-in').length;
  const pendingPayments = bookings.filter((b) => b.paymentStatus === 'pending').length;
  const approvedPayments = bookings.filter((b) => b.paymentStatus === 'approved').length;
  const confirmed = bookings.filter(
    (b) => b.status === 'confirmed' || b.paymentStatus === 'approved' || b.paymentStatus === 'free'
  ).length;
  const studentCount = bookings.filter((b) => b.ticketTier === 'student').length;
  const facultyCount = bookings.filter((b) => b.ticketTier === 'faculty').length;
  const generalCount = bookings.filter((b) => b.ticketTier === 'general').length;
  const revenue = bookings
    .filter((b) => b.paymentStatus === 'approved' || b.paymentStatus === 'pending')
    .reduce((sum, b) => sum + (b.totalPrice || (b.ticketTier === 'student' ? 1200 : b.ticketTier === 'general' ? 299 : 0) * (b.quantity || 1)), 0);

  const paymentBadge = (p: PaymentStatus) => {
    switch (p) {
      case 'approved':
        return 'bg-white/10 text-white border-white/25';
      case 'pending':
        return 'bg-neutral-800 text-neutral-300 border-neutral-700 animate-pulse';
      case 'rejected':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'free':
      default:
        return 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30';
    }
  };

  // ─── Login Screen ───
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#0a0a0c] text-neutral-100 flex items-center justify-center px-4">
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-[#eb0028]/[0.04] rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        </div>

        <div className="relative z-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-baseline gap-0.5 mb-6">
              <span className="text-2xl font-black text-[#eb0028] uppercase">TED</span>
              <span className="text-2xl font-black text-[#eb0028] lowercase">x</span>
              <span className="ml-2 text-xs font-bold text-white/80 uppercase tracking-wider translate-y-[1px]">
                PORPS YOUTH
              </span>
            </Link>
            <h1 className="text-2xl font-black uppercase text-white mb-1">Admin Portal</h1>
            <p className="text-sm text-neutral-500">Firebase-Backed Ticket & Payment Control</p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0f0f13] border border-white/8">
            <div className="mb-5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"
              >
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-[#eb0028]/50 focus:ring-1 focus:ring-[#eb0028]/20 transition-all text-sm"
              />
              {authError && <p className="text-red-400 text-xs mt-2">{authError}</p>}
            </div>

            <button
              type="button"
              id="admin-login-btn"
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-[#eb0028] hover:bg-[#c5001f] text-white font-bold text-sm font-mono uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(235,0,40,0.25)]"
            >
              Login →
            </button>

            <div className="mt-4 p-3 rounded-xl bg-white/3 border border-white/5">
              <p className="text-[11px] text-neutral-600 font-mono text-center">
                Password: <span className="text-neutral-400 font-bold">tedx2026</span>
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-wider"
            >
              ← Back to Main Site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ─── Dashboard ───
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-neutral-100 selection:bg-[#eb0028] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-[#eb0028]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      {/* Top Nav */}
      <header className="sticky top-0 z-50 px-4 py-3 bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-baseline gap-0">
              <span className="text-xl font-black text-[#eb0028] uppercase">TED</span>
              <span className="text-xl font-black text-[#eb0028] lowercase">x</span>
              <span className="ml-1.5 text-[10px] font-bold text-white/70 uppercase tracking-wider translate-y-[1px] hidden sm:inline">
                PORPS YOUTH
              </span>
            </Link>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <h1 className="text-xs font-mono uppercase tracking-widest text-neutral-400 hidden sm:block">
              Admin & Payment Verification
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              disabled={isLoading}
              className="px-3 py-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-1.5"
            >
              <span className={isLoading ? 'animate-spin' : ''}>🔄</span> Refresh
            </button>
            <Link
              href="/tickets"
              className="px-3 py-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
            >
              Ticket Page
            </Link>
            <button
              type="button"
              id="admin-logout-btn"
              onClick={() => setAuthenticated(false)}
              className="px-3 py-2 text-xs font-mono uppercase tracking-widest text-red-400 hover:text-white bg-red-950/30 hover:bg-red-900/40 border border-red-500/20 rounded-xl transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'bookings', label: `📋 Bookings (${bookings.length})` },
            {
              id: 'settings',
              label: '⚙️ UPI & QR Settings',
            },
            { id: 'analytics', label: '📊 Analytics' },
            { id: 'checkin', label: '✅ Event Check-In' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest flex-shrink-0 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#eb0028] text-white shadow-[0_0_20px_rgba(235,0,40,0.25)]'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/8 hover:border-white/15'
              }`}
            >
              {tab.label}
              {tab.id === 'bookings' && pendingPayments > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[#eb0028] text-white font-black text-[10px]">
                  {pendingPayments}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── SETTINGS TAB (UPI ID & Custom QR) ── */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0f0f13] border border-white/8">
              <h2 className="text-base font-black uppercase text-white mb-1">
                UPI Payment & QR Settings
              </h2>
              <p className="text-xs text-neutral-400 mb-6">
                Configure the payment details shown to attendees during checkout.
              </p>

              {/* UPI ID Setting */}
              <div className="space-y-4 mb-8 pb-8 border-b border-white/10">
                <div>
                  <label
                    htmlFor="upi-id-input"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-bold"
                  >
                    Active UPI ID
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="upi-id-input"
                      type="text"
                      value={newUpiId}
                      onChange={(e) => setNewUpiId(e.target.value)}
                      placeholder="e.g. 7842906633@superyes"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#eb0028]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveUpiId}
                      disabled={isSavingSettings}
                      className="px-5 py-3 rounded-xl bg-[#eb0028] hover:bg-[#c5001f] text-white font-bold text-xs font-mono uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-2 font-mono">
                    Current active ID: <span className="text-white font-bold">{paymentSettings.upiId}</span>
                  </p>
                </div>
              </div>

              {/* Custom QR Code Upload */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Custom Payment QR Code</h3>
                    <p className="text-xs text-neutral-400">
                      Upload your official PhonePe / Google Pay QR code image to show attendees.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-dashed border-white/15 bg-white/3 flex flex-col items-center justify-center text-center">
                  {paymentSettings.customQrUrl ? (
                    <div className="space-y-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={paymentSettings.customQrUrl}
                        alt="Custom Payment QR"
                        className="w-48 h-48 object-contain rounded-xl border border-white/20 shadow-xl mx-auto bg-white p-2"
                      />
                      <div className="flex items-center justify-center gap-3">
                        <label
                          htmlFor="custom-qr-upload"
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase cursor-pointer transition-all"
                        >
                          Change QR Image
                        </label>
                        <button
                          type="button"
                          onClick={handleRemoveCustomQr}
                          className="px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 hover:text-white text-xs font-mono uppercase transition-all"
                        >
                          Revert to Auto-Generated QR
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-white mb-1">
                        Currently using Auto-Generated Dynamic QR
                      </p>
                      <p className="text-xs text-neutral-500 mb-4 max-w-sm">
                        Attendees scan dynamic QR tied to <span className="font-mono text-neutral-400">{paymentSettings.upiId}</span>. You can upload a custom QR image instead.
                      </p>
                      <label
                        htmlFor="custom-qr-upload"
                        className="inline-block px-5 py-2.5 rounded-xl bg-[#eb0028] hover:bg-[#c5001f] text-white text-xs font-mono uppercase font-bold tracking-wider cursor-pointer transition-all"
                      >
                        Upload Custom QR Image
                      </label>
                    </div>
                  )}

                  <input
                    id="custom-qr-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleCustomQrUpload}
                    className="hidden"
                  />
                </div>

                {qrUploadStatus && (
                  <p className="text-xs font-mono text-center text-neutral-300 mt-2">
                    {qrUploadStatus}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── ANALYTICS TAB ── */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Bookings', value: bookings.length, sub: `${totalTickets} tickets`, color: '#eb0028' },
                { label: 'Pending Payment', value: pendingPayments, sub: 'needs admin review', color: '#f59e0b' },
                { label: 'Confirmed / Paid', value: confirmed, sub: `${approvedPayments} approved UPI`, color: '#10b981' },
                { label: 'Total Revenue', value: `₹${revenue}`, sub: 'from general tickets', color: '#6366f1' },
              ].map((stat) => (
                <div key={stat.label} className="p-5 rounded-2xl bg-[#0f0f13] border border-white/8">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-neutral-600 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Tier breakdown */}
            <div className="p-6 rounded-2xl bg-[#0f0f13] border border-white/8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-5">
                Ticket Tier Breakdown
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Students (₹1200)', count: studentCount, color: '#eb0028' },
                  { label: 'Faculty & Staff (Free)', count: facultyCount, color: '#6366f1' },
                  { label: 'General Attendees (₹299)', count: generalCount, color: '#f59e0b' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-neutral-300">{item.label}</span>
                      <span className="font-bold" style={{ color: item.color }}>
                        {item.count}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: bookings.length > 0 ? `${(item.count / bookings.length) * 100}%` : '0%',
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CHECK-IN TAB ── */}
        {activeTab === 'checkin' && (
          <div className="max-w-lg mx-auto space-y-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0f0f13] border border-white/8">
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Event Day Check-In
              </h2>
              <p className="text-xs text-neutral-600 mb-6">
                Enter Booking ID, email address, or roll number to check in an attendee.
              </p>

              <div className="flex gap-2">
                <input
                  id="checkin-input"
                  type="text"
                  value={checkInInput}
                  onChange={(e) => {
                    setCheckInInput(e.target.value);
                    setCheckInResult(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckIn()}
                  placeholder="TEDx-ABC123-XYZ or email or roll no."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-[#eb0028]/50 focus:ring-1 focus:ring-[#eb0028]/20 transition-all text-sm"
                />
                <button
                  type="button"
                  id="checkin-submit-btn"
                  onClick={handleCheckIn}
                  className="px-5 py-3 rounded-xl bg-[#eb0028] hover:bg-[#c5001f] text-white font-bold text-sm font-mono uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  ✓
                </button>
              </div>

              {checkInResult && (
                <div
                  className={`mt-4 p-5 rounded-xl border ${
                    checkInResult.success
                      ? 'bg-white/5 border-white/15'
                      : 'bg-red-950/20 border-red-500/30'
                  }`}
                >
                  <div
                    className={`text-base font-bold mb-1 ${
                      checkInResult.success ? 'text-white' : 'text-red-400'
                    }`}
                  >
                    {checkInResult.success ? '✓ ' : '✗ '}
                    {checkInResult.message}
                  </div>
                  {checkInResult.booking && (
                    <div className="text-xs text-neutral-400 space-y-0.5">
                      <div>
                        <span className="text-neutral-600">Name:</span>{' '}
                        {checkInResult.booking.firstName} {checkInResult.booking.lastName}
                      </div>
                      <div>
                        <span className="text-neutral-600">Tier:</span>{' '}
                        {TIER_LABEL[checkInResult.booking.ticketTier]}
                      </div>
                      <div>
                        <span className="text-neutral-600">Payment:</span>{' '}
                        {checkInResult.booking.paymentStatus}
                      </div>
                      {checkInResult.booking.rollNumber && (
                        <div>
                          <span className="text-neutral-600">Roll:</span>{' '}
                          {checkInResult.booking.rollNumber}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recent check-ins */}
            <div className="p-5 rounded-2xl bg-[#0f0f13] border border-white/8">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
                Checked-In Attendees ({checkedIn})
              </div>
              <div className="space-y-2">
                {bookings.filter((b) => b.status === 'checked-in').length === 0 ? (
                  <p className="text-xs text-neutral-600">No check-ins yet.</p>
                ) : (
                  bookings
                    .filter((b) => b.status === 'checked-in')
                    .map((b) => (
                      <div
                        key={b.bookingId}
                        className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {b.firstName} {b.lastName}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {b.bookingId} · {TIER_LABEL[b.ticketTier]}
                          </div>
                        </div>
                        <span className="text-white text-lg">✓</span>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKINGS & PAYMENT REVIEW TAB ── */}
        {activeTab === 'bookings' && (
          <div className="space-y-5">
            {/* Quick Filter Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { label: 'All Bookings', value: bookings.length, color: 'text-white' },
                {
                  label: 'Pending Review',
                  value: pendingPayments,
                  color: pendingPayments > 0 ? 'text-[#eb0028] font-black animate-pulse' : 'text-neutral-400',
                },
                { label: 'Approved', value: approvedPayments, color: 'text-white' },
                { label: 'Checked In', value: checkedIn, color: 'text-white' },
                { label: 'Free Passes', value: studentCount + facultyCount, color: 'text-neutral-300' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-xl bg-[#0f0f13] border border-white/8 text-center"
                >
                  <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="search-bookings"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, booking ID, UTR, roll..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
              />
              <select
                id="filter-payment"
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value as typeof filterPayment)}
                className="px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
              >
                <option value="all">All Payments</option>
                <option value="pending">⏳ Pending Review</option>
                <option value="approved">✓ Approved</option>
                <option value="rejected">✗ Rejected</option>
                <option value="free">Free Passes</option>
              </select>
              <select
                id="filter-tier"
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value as typeof filterTier)}
                className="px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
              >
                <option value="all">All Tiers</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="general">General (₹299)</option>
              </select>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending_verification">Pending Verification</option>
                <option value="checked-in">Checked In</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-[#0f0f13] border border-white/8 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {[
                        'Booking ID',
                        'Attendee',
                        'Tier',
                        'Amount',
                        'Screenshot Proof',
                        'Payment Status',
                        'Attendance',
                        'Actions',
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-widest text-neutral-600 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-neutral-600 text-sm">
                          No bookings match your current filters.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((b, i) => (
                        <tr
                          key={b.bookingId}
                          className={`border-b border-white/5 hover:bg-white/3 transition-colors cursor-pointer ${
                            i % 2 === 0 ? '' : 'bg-white/[0.01]'
                          }`}
                          onClick={() => setSelectedBooking(b)}
                        >
                          {/* Booking ID */}
                          <td className="px-4 py-3 font-mono text-xs text-neutral-400 whitespace-nowrap">
                            {b.bookingId}
                          </td>

                          {/* Attendee */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-semibold text-white">
                              {b.firstName} {b.lastName}
                            </div>
                            <div className="text-[11px] text-neutral-400 truncate max-w-[140px]">
                              {b.email}
                            </div>
                          </td>

                          {/* Tier */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                              style={{
                                backgroundColor: TIER_COLOR[b.ticketTier] + '33',
                                color: TIER_COLOR[b.ticketTier],
                              }}
                            >
                              {TIER_LABEL[b.ticketTier]}
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="px-4 py-3 font-mono font-bold text-white whitespace-nowrap">
                            {b.totalPrice ? `₹${b.totalPrice}` : b.ticketTier === 'student' ? `₹${1200 * (b.quantity || 1)}` : b.ticketTier === 'general' ? `₹${299 * (b.quantity || 1)}` : 'Free'}
                          </td>

                          {/* Screenshot Proof */}
                          <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            {b.screenshotUrl ? (
                              <button
                                type="button"
                                onClick={() => setScreenshotModalUrl(b.screenshotUrl || null)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-neutral-200 transition-all"
                              >
                                <span>📸</span> View Proof
                              </button>
                            ) : b.ticketTier === 'general' ? (
                              <span className="text-[11px] text-red-400 font-mono">No Screenshot</span>
                            ) : (
                              <span className="text-[11px] text-neutral-600 font-mono">—</span>
                            )}
                          </td>

                          {/* Payment Status */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${paymentBadge(
                                b.paymentStatus
                              )}`}
                            >
                              {b.paymentStatus === 'pending'
                                ? '⏳ Pending Review'
                                : b.paymentStatus === 'approved'
                                ? '✓ Approved'
                                : b.paymentStatus === 'rejected'
                                ? '✗ Rejected'
                                : 'Free Pass'}
                            </span>
                          </td>

                          {/* Attendance Status */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                b.status === 'checked-in'
                                  ? 'bg-green-500/20 text-white border border-green-500/30'
                                  : b.status === 'cancelled'
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : 'bg-blue-500/20 text-neutral-300 border border-blue-500/30'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1.5">
                              {b.paymentStatus === 'pending' && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleApprovePayment(b)}
                                    className="px-2 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-white hover:bg-emerald-800/50 text-[10px] font-mono font-bold transition-all"
                                  >
                                    ✓ Approve
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedBooking(b)}
                                    className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white text-[10px] font-mono transition-all"
                                  >
                                    Review
                                  </button>
                                </>
                              )}
                              {b.status !== 'checked-in' && b.paymentStatus !== 'pending' && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateStatus(b.bookingId, { status: 'checked-in' })}
                                  className="px-2 py-1 rounded-lg bg-green-950/40 border border-green-500/30 text-white text-[10px] font-mono hover:bg-green-900/50 transition-all"
                                >
                                  Check In
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t border-white/5 text-xs font-mono text-neutral-600 flex justify-between">
                <span>Showing {filtered.length} of {bookings.length} total bookings</span>
                <span>Active UPI: {paymentSettings.upiId}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Booking Detail & Verification Modal ── */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-[#0f0f13] border border-white/15 p-6 sm:p-8 overflow-y-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-black text-white">
                  {selectedBooking.firstName} {selectedBooking.lastName}
                </h2>
                <div className="text-xs font-mono text-[#eb0028] mt-0.5">
                  {selectedBooking.bookingId}
                </div>
              </div>
              <button
                type="button"
                id="close-modal-btn"
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Payment Verification Banner */}
            {(selectedBooking.paymentStatus === 'pending' || selectedBooking.paymentStatus === 'approved' || selectedBooking.paymentStatus === 'rejected' || selectedBooking.screenshotUrl || (selectedBooking.totalPrice && selectedBooking.totalPrice > 0)) && (
              <div
                className={`p-4 rounded-xl mb-5 border ${
                  selectedBooking.paymentStatus === 'approved'
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-white'
                    : selectedBooking.paymentStatus === 'rejected'
                    ? 'bg-red-950/20 border-red-500/30 text-red-400'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs font-mono uppercase mb-1">
                  <span>Payment Status</span>
                  <span>{selectedBooking.paymentStatus}</span>
                </div>
                <div className="text-xs text-neutral-300">
                  Amount:{' '}
                  <span className="font-bold text-white">
                    ₹{selectedBooking.totalPrice || (selectedBooking.ticketTier === 'student' ? 1200 : 299) * (selectedBooking.quantity || 1)}
                  </span>{' '}
                  ({selectedBooking.quantity || 1} Ticket
                  {(selectedBooking.quantity || 1) > 1 ? 's' : ''})
                </div>
                {selectedBooking.transactionId && (
                  <div className="text-xs font-mono text-neutral-300 mt-1">
                    UTR / Ref No:{' '}
                    <span className="text-white font-bold">{selectedBooking.transactionId}</span>
                  </div>
                )}
                {selectedBooking.rejectionReason && (
                  <div className="text-xs text-red-400 mt-1">
                    Rejection Reason: {selectedBooking.rejectionReason}
                  </div>
                )}
              </div>
            )}

            {/* Screenshot Preview */}
            {selectedBooking.screenshotUrl && (
              <div className="mb-6 p-3 rounded-2xl bg-white/3 border border-white/10 text-center">
                <div className="text-[11px] font-mono uppercase text-neutral-400 mb-2 font-bold flex items-center justify-between">
                  <span>Uploaded Payment Screenshot</span>
                  <a
                    href={selectedBooking.screenshotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#eb0028] hover:underline"
                  >
                    Open Full Image ↗
                  </a>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedBooking.screenshotUrl}
                  alt="Payment proof"
                  className="max-h-56 mx-auto rounded-xl object-contain border border-white/10 shadow-lg cursor-pointer"
                  onClick={() => setScreenshotModalUrl(selectedBooking.screenshotUrl || null)}
                />
              </div>
            )}

            {/* Attendee Details */}
            <div className="space-y-2.5 text-xs mb-6 border-t border-b border-white/8 py-4">
              {[
                ['Email', selectedBooking.email],
                ['Phone', selectedBooking.phone],
                ['Ticket Tier', TIER_LABEL[selectedBooking.ticketTier]],
                ['Grade / Category', selectedBooking.grade],
                ...(selectedBooking.rollNumber ? [['Roll Number', selectedBooking.rollNumber]] : []),
                ...(selectedBooking.section ? [['Section', selectedBooking.section]] : []),
                ...(selectedBooking.parentName ? [['Parent Name', selectedBooking.parentName]] : []),
                ...(selectedBooking.parentPhone ? [['Parent Phone', selectedBooking.parentPhone]] : []),
                ['Dietary', selectedBooking.dietaryPreference],
                ['Booked Time', new Date(selectedBooking.timestamp).toLocaleString('en-IN')],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between gap-4">
                  <span className="font-mono text-neutral-500 uppercase">{label}:</span>
                  <span className="text-white font-medium text-right truncate">{val}</span>
                </div>
              ))}
            </div>

            {/* Rejection input */}
            {showRejectInput && (
              <div className="mb-4 p-4 rounded-xl bg-red-950/30 border border-red-500/30">
                <label className="block text-xs font-mono text-red-300 mb-1.5 uppercase">
                  Rejection Reason (optional note):
                </label>
                <input
                  type="text"
                  value={rejectionNote}
                  onChange={(e) => setRejectionNote(e.target.value)}
                  placeholder="e.g. UTR mismatched / unreadable screenshot"
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-red-500/30 text-white text-xs mb-3 focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleRejectPayment(selectedBooking)}
                    className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase font-mono"
                  >
                    Confirm Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRejectInput(false)}
                    className="px-3 py-2 rounded-lg bg-white/10 text-neutral-300 text-xs font-mono"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Actions for Payment Approval / Rejection */}
            {selectedBooking.ticketTier === 'general' && (
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => handleApprovePayment(selectedBooking)}
                  className="flex-1 py-3 rounded-xl bg-white hover:bg-neutral-200 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg"
                >
                  ✓ Approve Payment
                </button>
                <button
                  type="button"
                  onClick={() => handleRejectPayment(selectedBooking)}
                  className="flex-1 py-3 rounded-xl bg-red-950/50 hover:bg-red-900 border border-red-500/30 text-red-400 hover:text-white font-bold text-xs font-mono uppercase tracking-wider transition-all"
                >
                  ✗ Reject Payment
                </button>
              </div>
            )}

            {/* Attendance Check-in */}
            <div className="flex gap-2 pt-2 border-t border-white/8">
              {selectedBooking.status !== 'checked-in' ? (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedBooking.bookingId, { status: 'checked-in' })}
                  className="flex-1 py-2.5 rounded-xl bg-green-950/40 border border-green-500/30 text-white text-xs font-mono uppercase hover:bg-green-900/50 transition-all font-bold"
                >
                  ✓ Mark Checked-In
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedBooking.bookingId, { status: 'confirmed' })}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-400 text-xs font-mono uppercase hover:bg-white/10 transition-all"
                >
                  Reset Check-In Status
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Standalone Screenshot Lightbox Modal ── */}
      {screenshotModalUrl && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setScreenshotModalUrl(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh] p-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setScreenshotModalUrl(null)}
              className="absolute -top-10 right-0 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-mono uppercase hover:bg-white/30"
            >
              ✕ Close
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshotModalUrl}
              alt="Full payment screenshot"
              className="max-h-[85vh] w-auto rounded-2xl border border-white/20 shadow-2xl object-contain mx-auto"
            />
          </div>
        </div>
      )}
      {/* Footer credit */}
      <footer className="relative z-10 border-t border-white/8 py-6 px-4 text-center text-xs font-mono text-neutral-500">
        <p>
          TEDxPORPS YOUTH Admin Portal &bull; Made by{' '}
          <a
            href="https://ruthwikreddy.live"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#eb0028] font-bold underline transition-colors"
          >
            Ruthwik Reddy
          </a>
        </p>
      </footer>
    </main>
  );
}
