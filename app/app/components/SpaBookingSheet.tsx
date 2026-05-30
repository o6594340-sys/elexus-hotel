"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const TREATMENTS = [
  { name: "Swedish Massage",    duration: "60 min", price: "€60" },
  { name: "Deep Tissue Massage", duration: "90 min", price: "€90" },
  { name: "Aromatherapy",       duration: "45 min", price: "€50" },
  { name: "Facial Treatment",   duration: "60 min", price: "€70" },
  { name: "Hammam & Scrub",     duration: "45 min", price: "€40" },
  { name: "Hot Stone Massage",  duration: "75 min", price: "€80" },
];

const TIME_SLOTS = [
  { label: "Morning",   sub: "09:00–12:00" },
  { label: "Afternoon", sub: "12:00–17:00" },
  { label: "Evening",   sub: "17:00–20:00" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SpaBookingSheet({ open, onClose }: Props) {
  const [step, setStep] = useState<"list" | "form" | "done">("list");
  const [selected, setSelected] = useState<typeof TREATMENTS[0] | null>(null);
  const [day, setDay] = useState<"today" | "tomorrow">("today");
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep("list");
      setSelected(null);
      setDay("today");
      setTimeSlot(null);
      setNotes("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  async function submit() {
    if (!selected || !timeSlot) return;
    setLoading(true);
    try {
      const detail = `${selected.name} (${selected.duration}) | ${day === "today" ? "Today" : "Tomorrow"} | ${timeSlot}${notes ? ` | Notes: ${notes}` : ""}`;
      const { error } = await supabase.from("requests").insert({
        hotel_id: "elexus",
        room: "314",
        type: "Spa Booking",
        detail,
        status: "new",
      });
      if (!error) setStep("done");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Spa booking" className="absolute inset-0 z-50">
      <div className="absolute inset-0 bg-[var(--color-navy)]/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl">
        <div className="w-10 h-1 bg-[var(--color-navy)]/15 rounded-full mx-auto mt-4" />

        {step === "list" && (
          <div className="p-6">
            <h2 className="text-[22px] mb-1 text-[var(--color-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
              Spa & Wellness
            </h2>
            <p className="text-[12px] text-[var(--color-muted)] mb-5">Select a treatment to request an appointment</p>
            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
              {TREATMENTS.map((t) => (
                <button
                  key={t.name}
                  onClick={() => { setSelected(t); setStep("form"); }}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--color-navy)]/8 active:bg-[var(--color-navy)]/5 cursor-pointer text-left w-full"
                >
                  <div>
                    <p className="text-[14px] font-medium text-[var(--color-navy)]">{t.name}</p>
                    <p className="text-[12px] text-[var(--color-muted)]">{t.duration}</p>
                  </div>
                  <span className="text-[15px] font-semibold text-[var(--color-gold)]">{t.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "form" && selected && (
          <div className="p-6">
            <button
              onClick={() => setStep("list")}
              className="flex items-center gap-1 text-[12px] text-[var(--color-muted)] mb-4 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>

            <div className="bg-[var(--color-navy)]/4 rounded-xl p-3.5 mb-5">
              <p className="text-[15px] font-semibold text-[var(--color-navy)]">{selected.name}</p>
              <p className="text-[12px] text-[var(--color-muted)]">{selected.duration} · {selected.price}</p>
            </div>

            <p className="text-[11px] uppercase tracking-wide text-[var(--color-muted)] mb-2">Preferred day</p>
            <div className="flex gap-2 mb-5">
              {(["today", "tomorrow"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-medium cursor-pointer transition-colors"
                  style={{
                    background: day === d ? "var(--color-navy)" : "transparent",
                    color: day === d ? "white" : "var(--color-muted)",
                    border: day === d ? "none" : "1px solid rgba(12,24,36,0.1)",
                  }}
                >
                  {d === "today" ? "Today" : "Tomorrow"}
                </button>
              ))}
            </div>

            <p className="text-[11px] uppercase tracking-wide text-[var(--color-muted)] mb-2">Preferred time</p>
            <div className="flex gap-2 mb-5">
              {TIME_SLOTS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setTimeSlot(s.label)}
                  className="flex-1 py-2 px-1 rounded-xl text-center cursor-pointer transition-colors"
                  style={{
                    background: timeSlot === s.label ? "var(--color-navy)" : "transparent",
                    border: timeSlot === s.label ? "none" : "1px solid rgba(12,24,36,0.1)",
                  }}
                >
                  <p className="text-[12px] font-medium" style={{ color: timeSlot === s.label ? "white" : "var(--color-navy)" }}>
                    {s.label}
                  </p>
                  <p className="text-[10px]" style={{ color: timeSlot === s.label ? "rgba(255,255,255,0.6)" : "var(--color-muted)" }}>
                    {s.sub}
                  </p>
                </button>
              ))}
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any preferences or notes… (optional)"
              rows={2}
              className="w-full border border-[var(--color-navy)]/10 rounded-xl px-3.5 py-3 text-[13px] text-[var(--color-navy)] placeholder:text-[var(--color-muted)]/60 resize-none mb-5 outline-none focus:border-[var(--color-navy)]/30"
            />

            <button
              onClick={submit}
              disabled={!timeSlot || loading}
              className="w-full py-3.5 rounded-xl text-[14px] font-semibold cursor-pointer transition-opacity active:opacity-80 disabled:opacity-40"
              style={{ background: "var(--color-gold)", color: "var(--color-navy)" }}
            >
              {loading ? "Sending…" : "Request Appointment"}
            </button>
            <p className="text-[11px] text-center text-[var(--color-muted)] mt-3 pb-1">
              The Spa team will contact you to confirm the exact time.
            </p>
          </div>
        )}

        {step === "done" && (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--color-gold)]/15 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-[20px] text-[var(--color-navy)] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              Request Sent
            </h2>
            <p className="text-[13px] text-[var(--color-muted)] mb-6 leading-relaxed">
              The Spa team will contact you to confirm your appointment.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[var(--color-navy)] text-white rounded-xl text-[14px] font-medium cursor-pointer active:opacity-80"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
