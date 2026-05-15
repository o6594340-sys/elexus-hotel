export default function RequestToast({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute bottom-24 left-4 right-4 bg-[var(--color-navy)] text-white rounded-xl px-4 py-3.5 flex items-center gap-3 shadow-lg"
      style={{ animation: "fadeSlideUp 0.25s ease" }}
    >
      <div className="w-6 h-6 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center shrink-0">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div>
        <p className="text-[13px] font-medium">{label} request sent</p>
        <p className="text-[11px] text-white/60">Staff will be with you shortly</p>
      </div>
    </div>
  );
}
