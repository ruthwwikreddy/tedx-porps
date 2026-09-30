'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/data/event';

interface Booking {
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber: string;
  grade: string;
  section: string;
  parentName: string;
  parentPhone: string;
  ticketTier: 'student' | 'faculty' | 'general';
  quantity: number;
  dietaryPreference: string;
  timestamp: string;
  status: 'confirmed' | 'checked-in' | 'cancelled';
}

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

// Seed demo data if localStorage is empty
const DEMO_BOOKINGS: Booking[] = [
  { bookingId: 'TEDx-ABC123-XYZ', firstName: 'Arjun', lastName: 'Reddy', email: 'arjun@porps.edu.in', phone: '9876543210', rollNumber: 'PORPS-2024-001', grade: 'Grade 11', section: 'A', parentName: 'Suresh Reddy', parentPhone: '9876543200', ticketTier: 'student', quantity: 1, dietaryPreference: 'Vegetarian', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), status: 'confirmed' },
  { bookingId: 'TEDx-DEF456-PQR', firstName: 'Priya', lastName: 'Sharma', email: 'priya@porps.edu.in', phone: '9876543211', rollNumber: 'PORPS-2024-042', grade: 'Grade 12', section: 'B', parentName: 'Ravi Sharma', parentPhone: '9876543201', ticketTier: 'student', quantity: 1, dietaryPreference: 'None', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), status: 'checked-in' },
  { bookingId: 'TEDx-GHI789-LMN', firstName: 'Dr. Meena', lastName: 'Kapoor', email: 'meena@porps.edu.in', phone: '9876543212', rollNumber: '', grade: 'Faculty', section: '', parentName: '', parentPhone: '', ticketTier: 'faculty', quantity: 1, dietaryPreference: 'Vegan', timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), status: 'confirmed' },
  { bookingId: 'TEDx-JKL012-STU', firstName: 'Rajesh', lastName: 'Gupta', email: 'rajesh.gupta@gmail.com', phone: '9876543213', rollNumber: '', grade: 'External Guest', section: '', parentName: '', parentPhone: '', ticketTier: 'general', quantity: 2, dietaryPreference: 'No Nuts', timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), status: 'confirmed' },
  { bookingId: 'TEDx-MNO345-VWX', firstName: 'Sneha', lastName: 'Patel', email: 'sneha@porps.edu.in', phone: '9876543214', rollNumber: 'PORPS-2024-087', grade: 'Grade 10', section: 'C', parentName: 'Amit Patel', parentPhone: '9876543204', ticketTier: 'student', quantity: 1, dietaryPreference: 'Jain', timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), status: 'cancelled' },
];

const ADMIN_PASSWORD = 'tedx2026';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState<'all' | 'student' | 'faculty' | 'general'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'checked-in' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'analytics' | 'checkin'>('bookings');
  const [checkInInput, setCheckInInput] = useState('');
  const [checkInResult, setCheckInResult] = useState<{ success: boolean; message: string; booking?: Booking } | null>(null);

  const loadBookings = useCallback(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('tedx_bookings') || '[]') as Booking[];
      if (stored.length === 0) {
        localStorage.setItem('tedx_bookings', JSON.stringify(DEMO_BOOKINGS));
        setBookings(DEMO_BOOKINGS);
      } else {
        setBookings(stored);
      }
    } catch {
      setBookings(DEMO_BOOKINGS);
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadBookings();
  }, [authenticated, loadBookings]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Try: tedx2026');
    }
  };

  const updateStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => b.bookingId === id ? { ...b, status } : b);
    setBookings(updated);
    try { localStorage.setItem('tedx_bookings', JSON.stringify(updated)); } catch { /* ignore */ }
    if (selectedBooking?.bookingId === id) setSelectedBooking(prev => prev ? { ...prev, status } : null);
  };

  const handleCheckIn = () => {
    const query = checkInInput.trim().toUpperCase();
    const found = bookings.find(b =>
      b.bookingId.toUpperCase() === query ||
      b.email.toLowerCase() === query.toLowerCase() ||
      b.rollNumber.toLowerCase() === query.toLowerCase()
    );
    if (!found) {
      setCheckInResult({ success: false, message: 'No booking found with this ID, email, or roll number.' });
    } else if (found.status === 'cancelled') {
      setCheckInResult({ success: false, message: 'This booking has been cancelled.', booking: found });
    } else if (found.status === 'checked-in') {
      setCheckInResult({ success: false, message: 'Already checked in!', booking: found });
    } else {
      updateStatus(found.bookingId, 'checked-in');
      setCheckInResult({ success: true, message: 'Check-in successful!', booking: { ...found, status: 'checked-in' } });
    }
  };

  const filtered = bookings.filter(b => {
    const matchSearch = search === '' ||
      `${b.firstName} ${b.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      b.rollNumber.toLowerCase().includes(search.toLowerCase());
    const matchTier = filterTier === 'all' || b.ticketTier === filterTier;
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchTier && matchStatus;
  });

  // Analytics
  const totalTickets = bookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
  const checkedIn = bookings.filter(b => b.status === 'checked-in').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const cancelled = bookings.filter(b => b.status === 'cancelled').length;
  const studentCount = bookings.filter(b => b.ticketTier === 'student').length;
  const facultyCount = bookings.filter(b => b.ticketTier === 'faculty').length;
  const generalCount = bookings.filter(b => b.ticketTier === 'general').length;
  const revenue = bookings.filter(b => b.ticketTier === 'general' && b.status !== 'cancelled').reduce((sum, b) => sum + 299 * (b.quantity || 1), 0);

  const statusBadge = (s: string) => {
    const map = {
      'confirmed': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      'checked-in': 'bg-green-500/15 text-green-400 border-green-500/30',
      'cancelled': 'bg-red-500/15 text-red-400 border-red-500/30',
    };
    return map[s as keyof typeof map] || map.confirmed;
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
              <span className="ml-2 text-xs font-bold text-white/80 uppercase tracking-wider translate-y-[1px]">PORPS YOUTH</span>
            </Link>
            <h1 className="text-2xl font-black uppercase text-white mb-1">Admin Portal</h1>
            <p className="text-sm text-neutral-500">Restricted access — authorized personnel only</p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0f0f13] border border-white/8">
            <div className="mb-5">
              <label htmlFor="admin-password" className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
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
              <p className="text-[11px] text-neutral-600 font-mono text-center">Demo password: <span className="text-neutral-400">tedx2026</span></p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-xs font-mono text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-wider">
              ← Back to Main Site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ─── Admin Dashboard ───
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
              <span className="ml-1.5 text-[10px] font-bold text-white/70 uppercase tracking-wider translate-y-[1px] hidden sm:inline">PORPS YOUTH</span>
            </Link>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <h1 className="text-xs font-mono uppercase tracking-widest text-neutral-400 hidden sm:block">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/tickets"
              className="px-3 py-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
            >
              Book Ticket
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
          {(['bookings', 'analytics', 'checkin'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              id={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest flex-shrink-0 transition-all ${
                activeTab === tab
                  ? 'bg-[#eb0028] text-white shadow-[0_0_20px_rgba(235,0,40,0.25)]'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/8 hover:border-white/15'
              }`}
            >
              {tab === 'bookings' ? '📋 Bookings' : tab === 'analytics' ? '📊 Analytics' : '✅ Check-In'}
            </button>
          ))}
        </div>

        {/* ── ANALYTICS TAB ── */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Bookings', value: bookings.length, sub: `${totalTickets} tickets`, color: '#eb0028' },
                { label: 'Confirmed', value: confirmed, sub: 'awaiting event', color: '#6366f1' },
                { label: 'Checked In', value: checkedIn, sub: `${bookings.length > 0 ? Math.round((checkedIn / bookings.length) * 100) : 0}% rate`, color: '#10b981' },
                { label: 'Revenue', value: `₹${revenue}`, sub: 'general tickets only', color: '#f59e0b' },
              ].map(stat => (
                <div key={stat.label} className="p-5 rounded-2xl bg-[#0f0f13] border border-white/8">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">{stat.label}</div>
                  <div className="text-2xl sm:text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs text-neutral-600 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Tier breakdown */}
            <div className="p-6 rounded-2xl bg-[#0f0f13] border border-white/8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-5">Ticket Tier Breakdown</h3>
              <div className="space-y-4">
                {[
                  { label: 'Students', count: studentCount, color: '#eb0028' },
                  { label: 'Faculty & Staff', count: facultyCount, color: '#6366f1' },
                  { label: 'General Attendees', count: generalCount, color: '#f59e0b' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-neutral-300">{item.label}</span>
                      <span className="font-bold" style={{ color: item.color }}>{item.count}</span>
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

            {/* Status breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Confirmed', count: confirmed, icon: '🔵', cls: 'border-blue-500/20 bg-blue-950/10' },
                { label: 'Checked In', count: checkedIn, icon: '✅', cls: 'border-green-500/20 bg-green-950/10' },
                { label: 'Cancelled', count: cancelled, icon: '❌', cls: 'border-red-500/20 bg-red-950/10' },
              ].map(s => (
                <div key={s.label} className={`p-5 rounded-2xl border ${s.cls}`}>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-black text-white mb-1">{s.count}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Dietary */}
            <div className="p-6 rounded-2xl bg-[#0f0f13] border border-white/8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">Dietary Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(
                  bookings.reduce((acc, b) => {
                    acc[b.dietaryPreference] = (acc[b.dietaryPreference] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([pref, count]) => (
                  <div key={pref} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
                    {pref}: <span className="font-bold text-white">{count}</span>
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
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2">Event Day Check-In</h2>
              <p className="text-xs text-neutral-600 mb-6">Enter Booking ID, email address, or roll number to check in an attendee.</p>

              <div className="flex gap-2">
                <input
                  id="checkin-input"
                  type="text"
                  value={checkInInput}
                  onChange={e => { setCheckInInput(e.target.value); setCheckInResult(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleCheckIn()}
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
                <div className={`mt-4 p-5 rounded-xl border ${checkInResult.success ? 'bg-green-950/20 border-green-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
                  <div className={`text-base font-bold mb-1 ${checkInResult.success ? 'text-green-400' : 'text-red-400'}`}>
                    {checkInResult.success ? '✓ ' : '✗ '}{checkInResult.message}
                  </div>
                  {checkInResult.booking && (
                    <div className="text-xs text-neutral-400 space-y-0.5">
                      <div><span className="text-neutral-600">Name:</span> {checkInResult.booking.firstName} {checkInResult.booking.lastName}</div>
                      <div><span className="text-neutral-600">Tier:</span> {TIER_LABEL[checkInResult.booking.ticketTier]}</div>
                      <div><span className="text-neutral-600">Grade:</span> {checkInResult.booking.grade}</div>
                      {checkInResult.booking.rollNumber && <div><span className="text-neutral-600">Roll:</span> {checkInResult.booking.rollNumber}</div>}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recent check-ins */}
            <div className="p-5 rounded-2xl bg-[#0f0f13] border border-white/8">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">Checked-In Attendees ({checkedIn})</div>
              <div className="space-y-2">
                {bookings.filter(b => b.status === 'checked-in').length === 0 ? (
                  <p className="text-xs text-neutral-600">No check-ins yet.</p>
                ) : bookings.filter(b => b.status === 'checked-in').map(b => (
                  <div key={b.bookingId} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-green-950/10 border border-green-500/20">
                    <div>
                      <div className="text-sm font-semibold text-white">{b.firstName} {b.lastName}</div>
                      <div className="text-xs text-neutral-500">{b.bookingId} · {TIER_LABEL[b.ticketTier]}</div>
                    </div>
                    <span className="text-green-400 text-lg">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKINGS TAB ── */}
        {activeTab === 'bookings' && (
          <div className="space-y-5">
            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Total', value: bookings.length, color: 'text-white' },
                { label: 'Confirmed', value: confirmed, color: 'text-blue-400' },
                { label: 'Checked In', value: checkedIn, color: 'text-green-400' },
                { label: 'Cancelled', value: cancelled, color: 'text-red-400' },
              ].map(s => (
                <div key={s.label} className="p-4 rounded-xl bg-[#0f0f13] border border-white/8 text-center">
                  <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="search-bookings"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email, booking ID, roll number..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
              />
              <select
                id="filter-tier"
                value={filterTier}
                onChange={e => setFilterTier(e.target.value as typeof filterTier)}
                className="px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
              >
                <option value="all">All Tiers</option>
                <option value="student">Students</option>
                <option value="faculty">Faculty</option>
                <option value="general">General</option>
              </select>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
                className="px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white focus:outline-none focus:border-[#eb0028]/50 transition-all text-sm"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
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
                      {['Booking ID', 'Name', 'Email', 'Tier', 'Grade', 'Status', 'Date', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-widest text-neutral-600 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-neutral-600 text-sm">No bookings match your filters.</td>
                      </tr>
                    ) : filtered.map((b, i) => (
                      <tr
                        key={b.bookingId}
                        className={`border-b border-white/5 hover:bg-white/3 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
                        onClick={() => setSelectedBooking(b)}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-neutral-400 whitespace-nowrap">{b.bookingId}</td>
                        <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">{b.firstName} {b.lastName}</td>
                        <td className="px-4 py-3 text-neutral-400 text-xs max-w-[160px] truncate">{b.email}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: TIER_COLOR[b.ticketTier] + '33', color: TIER_COLOR[b.ticketTier] }}>
                            {TIER_LABEL[b.ticketTier]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-neutral-400 whitespace-nowrap">{b.grade}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadge(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-neutral-600 whitespace-nowrap">
                          {new Date(b.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                            {b.status !== 'checked-in' && b.status !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() => updateStatus(b.bookingId, 'checked-in')}
                                className="px-2 py-1 rounded-lg bg-green-950/40 border border-green-500/30 text-green-400 text-[10px] font-mono uppercase hover:bg-green-900/50 transition-all whitespace-nowrap"
                              >
                                Check In
                              </button>
                            )}
                            {b.status !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() => updateStatus(b.bookingId, 'cancelled')}
                                className="px-2 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-[10px] font-mono uppercase hover:bg-red-900/50 transition-all whitespace-nowrap"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t border-white/5 text-xs font-mono text-neutral-600">
                Showing {filtered.length} of {bookings.length} bookings
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#0f0f13] border border-white/10 p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-black text-white">{selectedBooking.firstName} {selectedBooking.lastName}</h2>
                <div className="text-xs font-mono text-neutral-500">{selectedBooking.bookingId}</div>
              </div>
              <button
                type="button"
                id="close-modal-btn"
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-400 hover:text-white transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm mb-6">
              {[
                ['Email', selectedBooking.email],
                ['Phone', selectedBooking.phone],
                ['Tier', TIER_LABEL[selectedBooking.ticketTier]],
                ['Grade', selectedBooking.grade],
                ...(selectedBooking.rollNumber ? [['Roll Number', selectedBooking.rollNumber]] : []),
                ...(selectedBooking.section ? [['Section', selectedBooking.section]] : []),
                ...(selectedBooking.parentName ? [['Parent', selectedBooking.parentName]] : []),
                ...(selectedBooking.parentPhone ? [['Parent Phone', selectedBooking.parentPhone]] : []),
                ['Dietary', selectedBooking.dietaryPreference],
                ['Quantity', String(selectedBooking.quantity || 1)],
                ['Booked', new Date(selectedBooking.timestamp).toLocaleString('en-IN')],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between gap-4 py-2 border-b border-white/5">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-600 flex-shrink-0">{label}</span>
                  <span className="text-white text-right text-xs sm:text-sm">{val}</span>
                </div>
              ))}
            </div>

            <div className={`mb-5 px-3 py-2 rounded-lg border inline-block text-xs font-bold uppercase tracking-wider ${statusBadge(selectedBooking.status)}`}>
              {selectedBooking.status}
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedBooking.status !== 'checked-in' && selectedBooking.status !== 'cancelled' && (
                <button
                  type="button"
                  onClick={() => updateStatus(selectedBooking.bookingId, 'checked-in')}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-green-950/40 border border-green-500/30 text-green-400 text-xs font-mono uppercase hover:bg-green-900/50 transition-all"
                >
                  ✓ Check In
                </button>
              )}
              {selectedBooking.status === 'cancelled' && (
                <button
                  type="button"
                  onClick={() => updateStatus(selectedBooking.bookingId, 'confirmed')}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase hover:bg-blue-900/50 transition-all"
                >
                  Restore
                </button>
              )}
              {selectedBooking.status !== 'cancelled' && (
                <button
                  type="button"
                  onClick={() => updateStatus(selectedBooking.bookingId, 'cancelled')}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono uppercase hover:bg-red-900/50 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
