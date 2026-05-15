"use client";

import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WifiModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wi-Fi details"
      className="absolute inset-0 z-50"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--color-navy)]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6">
        {/* Handle */}
        <div className="w-10 h-1 bg-[var(--color-navy)]/15 rounded-full mx-auto mb-5" />

        <h2
          className="text-[22px] mb-5 text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Wi-Fi Access
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          <WifiRow label="Network"  value="Elexus_Guests" />
          <WifiRow label="Password" value="elexus2024" copyable />
          <WifiRow label="Coverage" value="All hotel areas" />
        </div>

        <p className="text-[12px] text-[var(--color-muted)] mb-6 leading-relaxed">
          Connect from the Settings app on your device. The network is available in all rooms, pools, and restaurants.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[var(--color-navy)] text-white rounded-xl text-[14px] font-medium active:opacity-80 transition-opacity cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

function WifiRow({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
  function copy() {
    navigator.clipboard.writeText(value).catch(() => {});
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--color-navy)]/6">
      <span className="text-[12px] uppercase tracking-wide text-[var(--color-muted)]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-medium text-[var(--color-navy)] font-mono">{value}</span>
        {copyable && (
          <button
            onClick={copy}
            className="text-[var(--color-gold)] active:opacity-60 cursor-pointer"
            aria-label="Copy password"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
