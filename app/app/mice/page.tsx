"use client";

import { useState } from "react";
import BottomNav from "../components/BottomNav";

const EVENT = {
  name: "CIS Business Forum 2026",
  hotel: "Elexus Hotel & Resort",
  day: 1,
  totalDays: 3,
  date: "16 May 2026",
  wifi: { ssid: "ELEXUS_CONF", password: "Forum2026" },
  manager: { name: "Ayşe Kaya", role: "Conference Manager", phone: "+90 392 444 00 00" },
};

const PROGRAM = [
  { time: "09:00", end: "09:30", title: "Registration & Welcome Coffee",    room: "Foyer, Level 1",   type: "break" },
  { time: "09:30", end: "11:00", title: "Opening Keynote",                  room: "Congress Hall",    type: "session", speaker: "Dr. A. Petrov" },
  { time: "11:00", end: "11:30", title: "Networking Coffee Break",          room: "Foyer, Level 1",   type: "break" },
  { time: "11:30", end: "13:00", title: "Panel: Digital Transformation",   room: "Congress Hall",    type: "session" },
  { time: "13:00", end: "14:00", title: "Lunch",                            room: "Main Restaurant",  type: "break" },
  { time: "14:00", end: "15:30", title: "Workshop A: Market Strategy",     room: "Conference Room A", type: "session" },
  { time: "15:30", end: "16:00", title: "Coffee Break",                    room: "Foyer, Level 1",   type: "break" },
  { time: "16:00", end: "17:30", title: "Workshop B: Investment Trends",   room: "Conference Room B", type: "session" },
  { time: "19:30", end: "22:00", title: "Gala Dinner",                     room: "Sky Bar & Terrace", type: "gala" },
];

const REQUESTS = [
  { id: "chair",     label: "Extra Chair",      icon: ChairIcon },
  { id: "projector", label: "Tech Support",     icon: ProjectorIcon },
  { id: "print",     label: "Print Document",   icon: PrintIcon },
  { id: "water",     label: "Cold Water",       icon: WaterIcon },
];

function getMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export default function MicePage() {
  const [copied, setCopied] = useState<"ssid" | "pass" | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  const now = new Date();
  const currentMin = now.getHours() * 60 + now.getMinutes();

  let currentIdx = -1;
  let nextIdx = -1;
  PROGRAM.forEach((item, i) => {
    const start = getMinutes(item.time);
    const end = getMinutes(item.end);
    if (currentMin >= start && currentMin < end) currentIdx = i;
  });
  nextIdx = currentIdx >= 0 ? currentIdx + 1 : PROGRAM.findIndex((item) => getMinutes(item.time) > currentMin);

  const current = currentIdx >= 0 ? PROGRAM[currentIdx] : null;
  const next = nextIdx >= 0 && nextIdx < PROGRAM.length ? PROGRAM[nextIdx] : null;

  function copy(type: "ssid" | "pass") {
    const val = type === "ssid" ? EVENT.wifi.ssid : EVENT.wifi.password;
    navigator.clipboard?.writeText(val).catch(() => {});
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }

  function sendRequest(label: string) {
    setSent(label);
    setTimeout(() => setSent(null), 3000);
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-[var(--color-cream)] relative">

      {/* Header */}
      <div className="bg-[var(--color-navy)] px-5 pt-10 pb-5 shrink-0">
        <p className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] mb-1">{EVENT.hotel}</p>
        <h1 className="text-[24px] text-white leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
          {EVENT.name}
        </h1>
        <p className="text-[13px] text-white/60 mt-0.5">Day {EVENT.day} of {EVENT.totalDays} · {EVENT.date}</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">

        {/* Now / Next */}
        {(current || next) && (
          <div className="px-4 pt-4 flex flex-col gap-2">
            {current && (
              <div className="bg-white rounded-xl p-4 border-l-4 border-[var(--color-gold)] shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] mb-1">Now · {current.time}–{current.end}</p>
                <p className="text-[15px] font-semibold text-[var(--color-navy)]">{current.title}</p>
                <p className="text-[12px] text-[var(--color-muted)] mt-0.5">{current.room}</p>
                {current.speaker && <p className="text-[11px] text-[var(--color-muted)] mt-0.5">{current.speaker}</p>}
              </div>
            )}
            {next && (
              <div className="bg-white rounded-xl p-4 border border-[var(--color-navy)]/6">
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-1">Next · {next.time}–{next.end}</p>
                <p className="text-[14px] font-medium text-[var(--color-navy)]">{next.title}</p>
                <p className="text-[12px] text-[var(--color-muted)] mt-0.5">{next.room}</p>
              </div>
            )}
          </div>
        )}

        {/* Quick requests */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Quick Requests</p>
          <div className="grid grid-cols-4 gap-2">
            {REQUESTS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => sendRequest(label)}
                className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-3 border border-[var(--color-navy)]/6 active:scale-95 transition-transform cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[var(--color-navy)]/5 flex items-center justify-center text-[var(--color-navy)]">
                  <Icon />
                </div>
                <span className="text-[10px] text-center text-[var(--color-navy)] font-medium leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wi-Fi */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Conference Wi-Fi</p>
          <div className="bg-white rounded-xl overflow-hidden border border-[var(--color-navy)]/6 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[var(--color-navy)]/6">
              <div>
                <p className="text-[11px] text-[var(--color-muted)]">Network</p>
                <p className="text-[15px] font-semibold text-[var(--color-navy)] font-mono">{EVENT.wifi.ssid}</p>
              </div>
              <button onClick={() => copy("ssid")} className="text-[11px] border border-[var(--color-navy)]/20 text-[var(--color-navy)] px-3 py-1.5 rounded-full cursor-pointer active:bg-[var(--color-navy)]/5">
                {copied === "ssid" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <div>
                <p className="text-[11px] text-[var(--color-muted)]">Password</p>
                <p className="text-[15px] font-semibold text-[var(--color-navy)] font-mono">{EVENT.wifi.password}</p>
              </div>
              <button onClick={() => copy("pass")} className="text-[11px] border border-[var(--color-navy)]/20 text-[var(--color-navy)] px-3 py-1.5 rounded-full cursor-pointer active:bg-[var(--color-navy)]/5">
                {copied === "pass" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Full program */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Today's Programme</p>
          <div className="flex flex-col">
            {PROGRAM.map((item, i) => {
              const start = getMinutes(item.time);
              const end = getMinutes(item.end);
              const isPast = currentMin >= end;
              const isCurrent = currentMin >= start && currentMin < end;

              return (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-11 shrink-0 pt-0.5">
                    <span className={`text-[11px] font-medium tabular-nums ${isCurrent ? "text-[var(--color-gold)]" : isPast ? "text-[var(--color-muted)]" : "text-[var(--color-navy)]"}`}>
                      {item.time}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${isCurrent ? "bg-[var(--color-gold)]" : isPast ? "bg-[var(--color-muted)]/30" : item.type === "gala" ? "bg-[var(--color-gold)]/40" : "bg-[var(--color-navy)]/20"}`} />
                    {i < PROGRAM.length - 1 && <div className="w-px flex-1 bg-[var(--color-navy)]/10 my-1 min-h-4" />}
                  </div>
                  <div className="pb-4 flex-1">
                    <p className={`text-[13px] font-medium leading-tight ${isPast ? "text-[var(--color-muted)]" : "text-[var(--color-navy)]"}`}>
                      {item.title}
                      {isCurrent && <span className="ml-2 text-[10px] bg-[var(--color-gold)]/15 text-[var(--color-gold)] px-1.5 py-0.5 rounded-full font-normal">Now</span>}
                      {item.type === "gala" && <span className="ml-2 text-[10px] bg-[var(--color-navy)]/8 text-[var(--color-navy)] px-1.5 py-0.5 rounded-full font-normal">Evening</span>}
                    </p>
                    <p className="text-[11px] text-[var(--color-muted)] mt-0.5">{item.room}</p>
                    {item.speaker && <p className="text-[11px] text-[var(--color-muted)]/70 mt-0.5">{item.speaker}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conference manager */}
        <div className="px-4 pt-2 pb-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Your Conference Manager</p>
          <div className="bg-[var(--color-navy)] rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <PersonIcon />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-white">{EVENT.manager.name}</p>
              <p className="text-[12px] text-white/60">{EVENT.manager.role}</p>
            </div>
            <a
              href={`tel:${EVENT.manager.phone}`}
              className="w-10 h-10 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center shrink-0"
            >
              <PhoneIcon />
            </a>
          </div>
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
            <p className="text-[13px] font-medium">{sent} requested</p>
            <p className="text-[11px] text-white/60">Conference manager notified</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ChairIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 20v-8"/><path d="M18 20v-8"/><path d="M4 12h16"/><path d="M6 4h12v8H6z"/></svg>; }
function ProjectorIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><polygon points="10 9 15 12 10 15 10 9"/></svg>; }
function PrintIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>; }
function WaterIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v6"/><path d="M5.2 11.2A7 7 0 1 0 18.8 17a7 7 0 0 0-13.6-5.8z"/></svg>; }
function PersonIcon()    { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>; }
function PhoneIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.12 4.18 2 2 0 0 1 6.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L10.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }
