"use client";

import Image from "next/image";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import RequestToast from "../components/RequestToast";

const SPA_TREATMENTS = [
  {
    category: "Massage",
    items: [
      { name: "Classic Massage",      duration: "50 min", price: "€60" },
      { name: "Deep Tissue Massage",  duration: "50 min", price: "€70" },
      { name: "Thai Massage",         duration: "60 min", price: "€75" },
      { name: "Hot Stone Massage",    duration: "60 min", price: "€80" },
      { name: "Couples Massage",      duration: "50 min", price: "€110" },
    ],
  },
  {
    category: "Hammam",
    items: [
      { name: "Traditional Hammam",         duration: "45 min", price: "€45" },
      { name: "Hammam + Foam Massage",      duration: "60 min", price: "€65" },
      { name: "Royal Hammam Experience",    duration: "90 min", price: "€95" },
    ],
  },
  {
    category: "Face & Body",
    items: [
      { name: "Hydrating Facial",           duration: "50 min", price: "€65" },
      { name: "Anti-Age Treatment",         duration: "60 min", price: "€80" },
      { name: "Body Scrub",                 duration: "30 min", price: "€40" },
      { name: "Body Wrap",                  duration: "45 min", price: "€55" },
    ],
  },
];

const SPA_FACILITIES = [
  { icon: SaunaIcon,   label: "Sauna",         note: "Finnish & infrared" },
  { icon: SteamIcon,   label: "Steam Room",    note: "Aromatherapy" },
  { icon: HammamIcon,  label: "Turkish Hammam", note: "Traditional" },
  { icon: PoolIcon,    label: "Indoor Pool",   note: "Semi-olympic" },
  { icon: RelaxIcon,   label: "Relaxation",    note: "Lounge & terrace" },
  { icon: FitIcon,     label: "Fitness",       note: "Modern equipment" },
];

export default function SpaPage() {
  const [requested, setRequested] = useState(false);

  function handleBook() {
    setRequested(true);
    setTimeout(() => setRequested(false), 3500);
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-[var(--color-cream)] relative">
      {/* Header */}
      <div className="relative h-52 shrink-0 overflow-hidden">
        <Image src="/spa.jpg" alt="Spa & Wellness" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1824]/20 via-transparent to-[#0c1824]/65" />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] mb-1">Wellness Centre</span>
          <h1 className="text-[28px] text-white leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Spa & Wellness
          </h1>
          <p className="text-[13px] text-white/70 mt-0.5">4 500 m² · Panoramic sea view</p>
        </div>
      </div>

      {/* Scroll content */}
      <div className="flex-1 overflow-y-auto pb-20">

        {/* Key facts */}
        <div className="grid grid-cols-3 gap-3 px-4 pt-4">
          {[
            { value: "4 500", unit: "m²", label: "Total area" },
            { value: "12",    unit: "",   label: "VIP cabins" },
            { value: "08:00", unit: "",   label: "Opens at" },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-3 text-center border border-[var(--color-navy)]/6">
              <p className="text-[20px] font-semibold text-[var(--color-navy)]">
                {f.value}<span className="text-[12px] text-[var(--color-muted)]">{f.unit}</span>
              </p>
              <p className="text-[11px] text-[var(--color-muted)] mt-0.5">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Facilities */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Facilities</p>
          <div className="grid grid-cols-3 gap-2.5">
            {SPA_FACILITIES.map((f) => (
              <div key={f.label} className="bg-white rounded-xl p-3 flex flex-col items-center gap-1.5 border border-[var(--color-navy)]/6">
                <div className="w-9 h-9 rounded-full bg-[var(--color-navy)]/5 flex items-center justify-center text-[var(--color-navy)]">
                  <f.icon />
                </div>
                <p className="text-[12px] font-medium text-[var(--color-navy)] text-center">{f.label}</p>
                <p className="text-[10px] text-[var(--color-muted)] text-center">{f.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Treatments */}
        {SPA_TREATMENTS.map((section) => (
          <div key={section.category} className="px-4 pt-5">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">{section.category}</p>
            <div className="bg-white rounded-xl overflow-hidden border border-[var(--color-navy)]/6 shadow-sm shadow-[var(--color-navy)]/5">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3.5 border-b border-[var(--color-navy)]/6 last:border-0"
                >
                  <div>
                    <p className="text-[14px] font-medium text-[var(--color-navy)]">{item.name}</p>
                    <p className="text-[12px] text-[var(--color-muted)]">{item.duration}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold text-[var(--color-navy)]">{item.price}</span>
                    <button
                      onClick={handleBook}
                      className="text-[11px] border border-[var(--color-navy)]/30 text-[var(--color-navy)] px-3 py-1 rounded-full active:bg-[var(--color-navy)]/8 transition-colors cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Hours & Note */}
        <div className="px-4 pt-5 pb-2">
          <div className="bg-[var(--color-navy)] rounded-xl p-4 text-white">
            <p className="text-[13px] font-semibold mb-2">Opening Hours</p>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="text-white/60">Daily</span>
              <span>08:00 – 21:00</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-white/60">Last appointment</span>
              <span>19:30</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-[12px] text-white/60 leading-relaxed">
                Reservations recommended. Contact reception or use the Book button above.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />

      {requested && <RequestToast label="Spa appointment" />}
    </div>
  );
}

function SaunaIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 14s-2-4 0-8" /><path d="M12 14s-2-4 0-8" /><path d="M16 14s-2-4 0-8" /><rect x="2" y="14" width="20" height="8" rx="2" /></svg>;
}
function SteamIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9c0 3 4 3 4 6" /><path d="M14 9c0 3 4 3 4 6" /><path d="M10 3c0 3 4 3 4 6" /></svg>;
}
function HammamIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></svg>;
}
function PoolIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12h20" /><path d="M2 17c2-2 4 0 6 0s4-2 6 0 4 2 6 0" /></svg>;
}
function RelaxIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 17l4-8 4 4 4-6 4 10" /></svg>;
}
function FitIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4M6 12h12" /></svg>;
}
