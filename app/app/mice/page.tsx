"use client";

import Image from "next/image";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import PageHeader from "../components/PageHeader";

const CONCERTS = [
  { date: "12 Jun",    day: "Fri", artist: "Ayta Sözerı",   genre: "Pop" },
  { date: "27 Jun",    day: "Sat", artist: "Ebru Gündeş",   genre: "Pop" },
  { date: "11 Jul",    day: "Sat", artist: "Koray Avcı",    genre: "Pop" },
  { date: "25 Jul",    day: "Fri", artist: "Ebru Gündeş",   genre: "Pop" },
  { date: "8 Aug",     day: "Sat", artist: "Candan Erçetin", genre: "Pop" },
  { date: "29 Aug",    day: "Sat", artist: "Ebru Gündeş",   genre: "Pop" },
  { date: "6 Nov",     day: "Fri", artist: "Ayta Sözerı",   genre: "Pop" },
];

const VENUES = [
  {
    name: "Congress Hall",
    image: "/conference-room.jpg",
    capacity: 1200,
    area: "1 800 m²",
    floor: "Level 1",
    features: ["Stage & podium", "LED screen wall", "Professional A/V", "Simultaneous translation", "Fiber internet"],
    layouts: [
      { type: "Theatre",  cap: 1200 },
      { type: "Banquet",  cap: 600 },
      { type: "Cocktail", cap: 1500 },
    ],
  },
  {
    name: "Conference Room A",
    image: "/conference-room2.jpg",
    capacity: 120,
    area: "280 m²",
    floor: "Level 1",
    features: ["Smart board", "Video conferencing", "Daylight & blackout", "Fiber internet"],
    layouts: [
      { type: "Theatre",  cap: 120 },
      { type: "Classroom", cap: 60 },
      { type: "U-shape",  cap: 40 },
    ],
  },
  {
    name: "Conference Room B",
    image: "/conference-room3.jpg",
    capacity: 80,
    area: "160 m²",
    floor: "Level 1",
    features: ["Smart board", "Video conferencing", "Daylight & blackout", "Fiber internet"],
    layouts: [
      { type: "Theatre",  cap: 80 },
      { type: "Classroom", cap: 40 },
      { type: "U-shape",  cap: 30 },
    ],
  },
];

const SERVICES = [
  { icon: CateringIcon,   label: "Catering",          note: "Coffee breaks, lunches, gala dinners" },
  { icon: AvIcon,         label: "A/V & Tech",         note: "Full equipment, on-site technician" },
  { icon: TranslateIcon,  label: "Translation",        note: "Simultaneous, up to 6 languages" },
  { icon: TransferIcon,   label: "Transfers",          note: "Airport, city, partner hotels" },
  { icon: AccomIcon,      label: "Accommodation",      note: "600 rooms, group rates available" },
  { icon: TeamIcon,       label: "Team Building",      note: "Beach, pool & indoor activities" },
];

export default function MicePage() {
  const [activeVenue, setActiveVenue] = useState(0);
  const [requested, setRequested] = useState(false);

  function handleRequest() {
    setRequested(true);
    setTimeout(() => setRequested(false), 3500);
  }

  const venue = VENUES[activeVenue];

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-[var(--color-cream)] relative">

      <PageHeader
        src="/conference-room.jpg"
        alt="MICE & Events"
        title="MICE & Conferences"
        subtitle="3 venues · Up to 1 200 guests · Full service"
        label="Meetings & Events"
        height="h-52"
      />

      <div className="flex-1 overflow-y-auto pb-20">

        {/* Key stats */}
        <div className="grid grid-cols-4 gap-2 px-4 pt-4">
          {[
            { value: "1 200", label: "Max guests" },
            { value: "3",     label: "Venues" },
            { value: "6",     label: "Languages" },
            { value: "24/7",  label: "Support" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-2.5 text-center border border-[var(--color-navy)]/6">
              <p className="text-[16px] font-semibold text-[var(--color-navy)]">{s.value}</p>
              <p className="text-[10px] text-[var(--color-muted)] mt-0.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Concerts */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Concerts 2026</p>
          <div className="bg-white rounded-xl overflow-hidden border border-[var(--color-navy)]/6 shadow-sm shadow-[var(--color-navy)]/5">
            {CONCERTS.map((c, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-navy)]/6 last:border-0">
                <div className="w-12 shrink-0 text-center">
                  <p className="text-[13px] font-semibold text-[var(--color-navy)] tabular-nums leading-tight">{c.date}</p>
                  <p className="text-[10px] text-[var(--color-muted)]">{c.day}</p>
                </div>
                <div className="w-px h-8 bg-[var(--color-navy)]/10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[var(--color-navy)] truncate">{c.artist}</p>
                  <p className="text-[11px] text-[var(--color-muted)]">{c.genre}</p>
                </div>
                <MicIcon />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[var(--color-muted)] mt-2 px-1">Reservations: +90 533 830 66 66</p>
        </div>

        {/* Venue selector */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Venues</p>
          <div className="flex gap-2 mb-3">
            {VENUES.map((v, i) => (
              <button
                key={i}
                onClick={() => setActiveVenue(i)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                  activeVenue === i ? "bg-navy text-white" : "bg-white text-muted border border-navy/10"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>

          {/* Venue card */}
          <div className="bg-white rounded-xl overflow-hidden border border-[var(--color-navy)]/6 shadow-sm shadow-[var(--color-navy)]/5">
            <div className="relative h-40">
              <Image src={venue.image} alt={venue.name} fill className="object-cover" />
              <div className="absolute top-3 right-3 bg-[var(--color-navy)] text-white text-[11px] px-2.5 py-1 rounded-full font-medium">
                Up to {venue.capacity.toLocaleString()} pax
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-[16px] font-semibold text-[var(--color-navy)]">{venue.name}</h3>
                  <p className="text-[12px] text-[var(--color-muted)]">{venue.area} · {venue.floor}</p>
                </div>
              </div>

              {/* Layouts */}
              <div className="flex gap-2 mb-3">
                {venue.layouts.map((l) => (
                  <div key={l.type} className="flex-1 bg-[var(--color-navy)]/4 rounded-lg p-2 text-center">
                    <p className="text-[13px] font-semibold text-[var(--color-navy)]">{l.cap}</p>
                    <p className="text-[10px] text-[var(--color-muted)]">{l.type}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5">
                {venue.features.map((f) => (
                  <span key={f} className="text-[11px] bg-[var(--color-navy)]/5 text-[var(--color-navy)] px-2.5 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photo strip */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Gallery</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["/conference-room.jpg", "/conference-room2.jpg", "/conference-room3.jpg", "/coffee-break.jpg"].map((src, i) => (
              <div key={i} className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Included Services</p>
          <div className="grid grid-cols-3 gap-2.5">
            {SERVICES.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-3 flex flex-col items-center gap-1.5 border border-[var(--color-navy)]/6 text-center">
                <div className="w-9 h-9 rounded-full bg-[var(--color-navy)]/5 flex items-center justify-center text-[var(--color-navy)]">
                  <s.icon />
                </div>
                <p className="text-[12px] font-medium text-[var(--color-navy)]">{s.label}</p>
                <p className="text-[10px] text-[var(--color-muted)] leading-tight">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 pt-5 pb-2">
          <div className="bg-[var(--color-navy)] rounded-xl p-5">
            <p className="font-display text-[16px] font-semibold text-white mb-1">
              Plan your event with us
            </p>
            <p className="text-[12px] text-white/60 mb-4 leading-relaxed">
              Our MICE team responds within 2 hours. Site inspection available on request.
            </p>
            <button
              onClick={handleRequest}
              className="w-full py-3 rounded-xl bg-[var(--color-gold)] text-[var(--color-navy)] text-[14px] font-semibold active:opacity-80 cursor-pointer transition-opacity"
            >
              Request a Proposal
            </button>
          </div>
        </div>

      </div>

      <BottomNav />

      {/* Toast */}
      {requested && (
        <div
          role="status"
          aria-live="polite"
          className="animate-fade-slide-up absolute bottom-24 left-4 right-4 bg-[var(--color-navy)] text-white rounded-xl px-4 py-3.5 flex items-center gap-3 shadow-lg"
        >
          <div className="w-6 h-6 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-medium">Request sent</p>
            <p className="text-[11px] text-white/60">Our MICE team will contact you shortly</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MicIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
}
function CateringIcon()  { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>; }
function AvIcon()        { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><polygon points="10 9 15 12 10 15 10 9"/></svg>; }
function TranslateIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>; }
function TransferIcon()  { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>; }
function AccomIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 22V8l9-6 9 6v14"/><path d="M9 22V12h6v10"/></svg>; }
function TeamIcon()      { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }
