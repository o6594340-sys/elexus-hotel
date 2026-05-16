"use client";

import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import BackButton from "../components/BackButton";
import { supabase, type HotelRequest, type RequestStatus } from "../../lib/supabase";

const HOTEL_ID = "elexus";
const ROOM     = "314";

const QUICK_REQUESTS = [
  { id: "towels",     label: "Extra Towels",  icon: TowelIcon },
  { id: "cleaning",   label: "Room Cleaning", icon: CleanIcon },
  { id: "pillows",    label: "Extra Pillows", icon: PillowIcon },
  { id: "toiletries", label: "Toiletries",    icon: ToiletIcon },
  { id: "iron",       label: "Iron & Board",  icon: IronIcon },
  { id: "cot",        label: "Baby Cot",      icon: CotIcon },
];

const STATUS_META: Record<RequestStatus, { label: string; color: string; bg: string }> = {
  new:         { label: "Received",    color: "#c9a96e", bg: "#c9a96e18" },
  in_progress: { label: "In progress", color: "#3b82f6", bg: "#3b82f615" },
  done:        { label: "Completed",   color: "#10b981", bg: "#10b98115" },
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<HotelRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formText, setFormText] = useState("");
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => {
    // Load existing requests
    supabase
      .from("requests")
      .select("*")
      .eq("hotel_id", HOTEL_ID)
      .eq("room", ROOM)
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setRequests(data); });

    // Subscribe to real-time updates
    const channel = supabase
      .channel("requests-guest")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "requests", filter: `hotel_id=eq.${HOTEL_ID}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRequests((prev) => [payload.new as HotelRequest, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setRequests((prev) =>
              prev.map((r) => r.id === (payload.new as HotelRequest).id ? payload.new as HotelRequest : r)
            );
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function sendQuick(label: string) {
    const { data } = await supabase.from("requests").insert({
      hotel_id: HOTEL_ID,
      room: ROOM,
      type: label,
      detail: "Quick request",
      status: "new",
    }).select().single();
    if (data) {
      setSent(label);
      setTimeout(() => setSent(null), 3000);
    }
  }

  async function sendCustom() {
    if (!formText.trim()) return;
    const { data } = await supabase.from("requests").insert({
      hotel_id: HOTEL_ID,
      room: ROOM,
      type: "Custom request",
      detail: formText.trim(),
      status: "new",
    }).select().single();
    if (data) {
      setFormText("");
      setShowForm(false);
      setSent("Your request");
      setTimeout(() => setSent(null), 3000);
    }
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-[var(--color-cream)] relative">
      {/* Header */}
      <div className="relative bg-[var(--color-navy)] px-5 pt-10 pb-5 shrink-0">
        <BackButton />
        <h1 className="text-[28px] text-white" style={{ fontFamily: "var(--font-playfair)" }}>
          Requests
        </h1>
        <p className="text-[13px] text-white/60 mt-0.5">Room 314 · Staff responds within 15 min</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">

        {/* Quick requests */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Quick Requests</p>
          <div className="grid grid-cols-3 gap-2.5">
            {QUICK_REQUESTS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => sendQuick(label)}
                className="flex flex-col items-center gap-2 bg-white rounded-xl p-3 border border-[var(--color-navy)]/6 active:scale-95 transition-transform cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-navy)]/5 flex items-center justify-center text-[var(--color-navy)]">
                  <Icon />
                </div>
                <span className="text-[11px] text-center text-[var(--color-navy)] font-medium leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom request */}
        <div className="px-4 pt-4">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center gap-3 bg-white rounded-xl p-4 border border-dashed border-[var(--color-navy)]/20 active:bg-[var(--color-navy)]/5 transition-colors cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full border border-dashed border-[var(--color-navy)]/20 flex items-center justify-center text-[var(--color-muted)]">
                <PlusIcon />
              </div>
              <span className="text-[14px] text-[var(--color-muted)]">Write a custom request…</span>
            </button>
          ) : (
            <div className="bg-white rounded-xl p-4 border border-[var(--color-navy)]/10">
              <p className="text-[12px] uppercase tracking-wide text-[var(--color-muted)] mb-2">Custom request</p>
              <textarea
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                placeholder="Describe what you need…"
                rows={3}
                className="w-full text-[14px] text-[var(--color-navy)] bg-[var(--color-cream)] rounded-lg p-3 resize-none outline-none placeholder:text-[var(--color-muted)] border border-[var(--color-navy)]/10 focus:border-[var(--color-gold)]"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { setShowForm(false); setFormText(""); }}
                  className="flex-1 py-2.5 rounded-xl border border-[var(--color-navy)]/10 text-[13px] text-[var(--color-muted)] active:bg-[var(--color-navy)]/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={sendCustom}
                  disabled={!formText.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-[var(--color-navy)] text-white text-[13px] font-medium active:opacity-80 disabled:opacity-40 cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>

        {/* History */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Request History
          </p>
          {requests.length === 0 ? (
            <div className="text-center py-10 text-[var(--color-muted)] text-[13px]">No requests yet</div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {requests.map((r) => {
                const meta = STATUS_META[r.status];
                const time = new Date(r.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
                return (
                  <div key={r.id} className="bg-white rounded-xl p-4 border border-[var(--color-navy)]/6 shadow-sm shadow-[var(--color-navy)]/5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold text-[var(--color-navy)]">{r.type}</p>
                        {r.detail !== "Quick request" && (
                          <p className="text-[12px] text-[var(--color-muted)] mt-0.5 leading-relaxed">{r.detail}</p>
                        )}
                      </div>
                      <span
                        className="text-[11px] px-2.5 py-1 rounded-full font-medium shrink-0"
                        style={{ color: meta.color, background: meta.bg }}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--color-muted)] mt-2">Sent at {time}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <BottomNav />

      {/* Toast */}
      {sent && (
        <div
          role="status"
          aria-live="polite"
          className="absolute bottom-24 left-4 right-4 bg-[var(--color-navy)] text-white rounded-xl px-4 py-3.5 flex items-center gap-3 shadow-lg"
          style={{ animation: "fadeSlideUp 0.25s ease" }}
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-medium">{sent} request sent</p>
            <p className="text-[11px] text-white/60">Staff will be with you shortly</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TowelIcon()  { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="4" rx="1"/><path d="M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7"/><path d="M9 11h6"/></svg>; }
function CleanIcon()  { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>; }
function PillowIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="10" rx="5"/></svg>; }
function ToiletIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3h8a1 1 0 0 1 1 1v2H7V4a1 1 0 0 1 1-1z"/><path d="M7 6v3a5 5 0 0 0 10 0V6"/><path d="M12 15v6"/><path d="M9 21h6"/></svg>; }
function IronIcon()   { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 17h18l-2-8H5L3 17z"/><path d="M5 17v2"/><path d="M19 17v2"/></svg>; }
function CotIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="8" rx="2"/><path d="M3 10V6"/><path d="M21 10V6"/><path d="M7 16v3"/><path d="M17 16v3"/></svg>; }
function PlusIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
