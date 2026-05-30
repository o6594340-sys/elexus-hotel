export default function RequestToast({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-slide-up absolute bottom-24 left-4 right-4 bg-[var(--color-navy)] text-white rounded-xl px-4 py-3.5 flex items-center gap-3 shadow-lg"
    >
      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
