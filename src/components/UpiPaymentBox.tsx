'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface UpiPaymentBoxProps {
  amount: number;
  bookingId: string;
  upiId: string;
  customQrUrl?: string;
  onScreenshotSelected: (file: File | null) => void;
  screenshotFile: File | null;
  screenshotPreview: string | null;
  transactionId: string;
  onTransactionIdChange: (val: string) => void;
  error?: string;
}

export default function UpiPaymentBox({
  amount,
  bookingId,
  upiId,
  customQrUrl,
  onScreenshotSelected,
  screenshotFile,
  screenshotPreview,
  transactionId,
  onTransactionIdChange,
  error,
}: UpiPaymentBoxProps) {
  const [copied, setCopied] = useState(false);
  const [qrMode, setQrMode] = useState<'auto' | 'custom'>(customQrUrl ? 'custom' : 'auto');

  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    'TEDx PORPS YOUTH'
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(`TEDx Ticket ${bookingId}`)}`;

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onScreenshotSelected(file);
  };

  return (
    <div className="space-y-6">
      {/* Payment Overview Card */}
      <div className="p-6 rounded-2xl bg-[#0f0f13] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#eb0028]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#eb0028] font-bold mb-1">
              Step 2 of 2 · UPI Payment
            </div>
            <h3 className="text-xl font-black text-white">Scan & Pay ₹{amount}</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Pay via Google Pay, PhonePe, Paytm, or any UPI app
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-white/10 text-white border border-white/20">
              Amount Due: ₹{amount}
            </span>
          </div>
        </div>

        {/* QR Code Selector (Auto QR vs Custom Uploaded QR) */}
        {customQrUrl && (
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-6 max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => setQrMode('custom')}
              className={`flex-1 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                qrMode === 'custom'
                  ? 'bg-[#eb0028] text-white font-bold shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Official QR
            </button>
            <button
              type="button"
              onClick={() => setQrMode('auto')}
              className={`flex-1 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                qrMode === 'auto'
                  ? 'bg-[#eb0028] text-white font-bold shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Auto-Generated QR
            </button>
          </div>
        )}

        {/* QR Display */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/4 border border-white/10 mb-6">
          <div className="p-4 bg-white rounded-2xl shadow-[0_0_30px_rgba(235,0,40,0.2)] mb-4">
            {qrMode === 'custom' && customQrUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={customQrUrl}
                alt="Official TEDx Payment QR"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
              />
            ) : (
              <QRCodeSVG
                value={upiLink}
                size={210}
                level="M"
                includeMargin={false}
              />
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10 max-w-full overflow-hidden">
            <span className="text-neutral-500">UPI ID:</span>
            <span className="font-bold text-white tracking-wide truncate">{upiId}</span>
            <button
              type="button"
              onClick={copyUpiId}
              className="ml-2 px-2.5 py-1 rounded-lg bg-[#eb0028]/20 hover:bg-[#eb0028] text-[#eb0028] hover:text-white text-[11px] font-bold transition-all flex-shrink-0"
            >
              {copied ? (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  Copied!
                </span>
              ) : 'Copy'}
            </button>
          </div>

          {/* Mobile direct UPI trigger */}
          <div className="mt-4 sm:hidden w-full">
            <a
              href={upiLink}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <span>Open Directly in UPI App</span>
            </a>
          </div>
        </div>

        {/* Payment Verification Steps Instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-6">
          <div className="p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="text-[#eb0028] font-bold font-mono mb-1">1. Scan & Pay</div>
            <div className="text-neutral-400">Scan QR above or copy UPI ID <span className="text-white">{upiId}</span> and transfer ₹{amount}.</div>
          </div>
          <div className="p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="text-[#eb0028] font-bold font-mono mb-1">2. Take Screenshot</div>
            <div className="text-neutral-400">Save the payment confirmation screenshot on your phone or PC.</div>
          </div>
          <div className="p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="text-[#eb0028] font-bold font-mono mb-1">3. Upload Proof</div>
            <div className="text-neutral-400">Upload screenshot below for admin verification & ticket issue.</div>
          </div>
        </div>

        {/* Screenshot Upload Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold mb-2">
              Upload Payment Screenshot *
            </label>
            <div className="relative">
              <input
                id="payment-screenshot"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="payment-screenshot"
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                  screenshotPreview
                    ? 'border-[#eb0028]/60 bg-[#eb0028]/5'
                    : 'border-white/20 hover:border-[#eb0028]/50 bg-white/3 hover:bg-white/5'
                }`}
              >
                {screenshotPreview ? (
                  <div className="flex flex-col items-center text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={screenshotPreview}
                      alt="Payment screenshot preview"
                      className="max-h-48 rounded-xl object-contain border border-white/10 mb-3 shadow-lg"
                    />
                    <div className="text-xs font-mono text-white font-bold flex items-center gap-1 mb-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                      Screenshot Selected ({screenshotFile?.name})
                    </div>
                    <span className="text-[11px] text-neutral-400 underline">
                      Click to choose a different image
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-white mb-1">
                      Click to upload payment screenshot
                    </span>
                    <span className="text-xs text-neutral-500">
                      Supports JPG, PNG, WEBP (auto-compressed)
                    </span>
                  </div>
                )}
              </label>
            </div>
            {error && <p className="text-red-400 text-xs mt-2 font-mono">{error}</p>}
          </div>

          {/* UTR / Transaction ID (Optional but recommended) */}
          <div>
            <label htmlFor="transactionId" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              UPI Reference No. / UTR (Optional)
            </label>
            <input
              id="transactionId"
              type="text"
              value={transactionId}
              onChange={(e) => onTransactionIdChange(e.target.value)}
              placeholder="e.g. 423456789012"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-[#eb0028]/50 text-sm font-mono"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Found on your UPI transaction receipt — helps our admin team verify your payment instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
