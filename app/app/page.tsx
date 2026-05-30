"use client";

import Image from "next/image";
import { useState } from "react";
import BottomNav from "./components/BottomNav";
import WifiModal from "./components/WifiModal";
import SpaBookingSheet from "./components/SpaBookingSheet";
import RequestToast from "./components/RequestToast";

const SCHEDULE = [
  { time: "07:00", title: "Breakfast",              place: "Meyan Ocakbaşı · Reflection" },
  { time: "09:00", title: "Morning Yoga",            place: "Beach Terrace" },
  { time: "10:00", title: "Aqua Park Opens",         place: "Outdoor Area" },
  { time: "11:30", title: "Beach Volleyball",        place: "Private Beach" },
  { time: "13:00", title: "Lunch",                   place: "Meyan Ocakbaşı · Leaf" },
  { time: "15:00", title: "Pool Games & Animation",  place: "Main Pool" },
  { time: "17:00", title: "Happy Hour",              place: "Mia Beach Club" },
  { time: "19:00", title: "Dinner",                  place: "Meyan Ocakbaşı" },
  { time: "21:00", title: "Live Music",              place: "Lobby Bar" },
  { time: "22:30", title: "Evening Show",            place: "Amphitheatre" },
];

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Concert — Ayta Sözerı",
    body: "12 June at the Amphitheatre. One of Turkey's most beloved voices. Reservations: +90 533 830 66 66.",
    badge: "12 Jun",
  },
  {
    id: 2,
    title: "Zoya Spa — Summer Offer",
    body: "Book any treatment this week and receive a complimentary hammam session. Limited availability.",
    badge: "Offer",
  },
  {
    id: 3,
    title: "Happy Hour at Mia Beach Club",
    body: "Every day 17:00–19:00 — selected cocktails at half price. Direct on the beach.",
    badge: "Daily",
  },
];

type RequestType = "towels" | "reception" | null;

const REQUEST_LABELS: Record<NonNullable<RequestType>, string> = {
  towels: "Extra Towels",
  reception: "Reception",
};

export default function Home() {
  const [wifiOpen, setWifiOpen] = useState(false);
  const [spaOpen, setSpaOpen] = useState(false);
  const [sentRequest, setSentRequest] = useState<RequestType>(null);

  function handleRequest(type: NonNullable<RequestType>) {
    setSentRequest(type);
    setTimeout(() => setSentRequest(null), 3500);
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-[var(--color-cream)] relative">

      {/* Hero */}
      <div className="relative h-52 shrink-0 overflow-hidden">
        <Image
          src="/lobby.jpg"
          alt="Elexus Hotel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1824]/30 via-transparent to-[#0c1824]/60" />
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-gold)]">
              StayGuide
            </span>
            <span className="text-[10px] text-white/60">Room 314</span>
          </div>
          <div>
            <h1 className="font-display text-[28px] leading-tight text-white">
              Elexus Hotel
            </h1>
            <p className="text-[13px] text-white/70 mt-0.5">
              Good {now.getHours() < 12 ? "morning" : now.getHours() < 18 ? "afternoon" : "evening"} · All Inclusive Plus
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20">

        {/* Action buttons */}
        <div className="px-4 pt-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Quick Actions
          </p>
          <div className="grid grid-cols-4 gap-3">
            <ActionButton
              icon={<TowelIcon />}
              label="Towels"
              onClick={() => handleRequest("towels")}
            />
            <ActionButton
              icon={<SpaIcon />}
              label="Spa"
              onClick={() => setSpaOpen(true)}
            />
            <ActionButton
              icon={<WifiIcon />}
              label="Wi-Fi"
              onClick={() => setWifiOpen(true)}
            />
            <ActionButton
              icon={<BellIcon />}
              label="Reception"
              onClick={() => handleRequest("reception")}
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="px-4 pt-6">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Today&apos;s Schedule
          </p>
          <div className="flex flex-col">
            {SCHEDULE.map((item, i) => {
              const [h, m] = item.time.split(":").map(Number);
              const itemMinutes = h * 60 + m;
              const isPast = itemMinutes < currentMinutes;
              const isNext =
                !isPast &&
                (i === 0 || (() => {
                  const [ph, pm] = SCHEDULE[i - 1].time.split(":").map(Number);
                  return ph * 60 + pm < currentMinutes;
                })());

              return (
                <div key={i} className="flex gap-3 items-start">
                  {/* Time column */}
                  <div className="w-12 shrink-0 pt-0.5">
                    <span
                      className={`text-[12px] font-medium tabular-nums ${
                        isPast
                          ? "text-[var(--color-muted)]"
                          : isNext
                          ? "text-[var(--color-gold)]"
                          : "text-[var(--color-navy)]"
                      }`}
                    >
                      {item.time}
                    </span>
                  </div>
                  {/* Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                        isNext
                          ? "bg-[var(--color-gold)]"
                          : isPast
                          ? "bg-[var(--color-muted)]/30"
                          : "bg-[var(--color-navy)]/20"
                      }`}
                    />
                    {i < SCHEDULE.length - 1 && (
                      <div className="w-px flex-1 bg-[var(--color-navy)]/10 my-1 min-h-4" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-4">
                    <p
                      className={`text-[14px] font-medium leading-tight ${
                        isPast ? "text-[var(--color-muted)]" : "text-[var(--color-navy)]"
                      }`}
                    >
                      {item.title}
                      {isNext && (
                        <span className="ml-2 text-[10px] bg-[var(--color-gold)]/15 text-[var(--color-gold)] px-1.5 py-0.5 rounded-full font-normal">
                          Next
                        </span>
                      )}
                    </p>
                    <p className="text-[12px] text-[var(--color-muted)] mt-0.5">{item.place}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Announcements */}
        <div className="px-4 pt-2 pb-2">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Announcements
          </p>
          <div className="flex flex-col gap-3">
            {ANNOUNCEMENTS.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-xl p-4 border border-[var(--color-navy)]/6 shadow-sm shadow-[var(--color-navy)]/5"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[14px] font-semibold text-[var(--color-navy)]">{a.title}</p>
                  <span className="text-[10px] bg-[var(--color-gold)]/15 text-[var(--color-gold)] px-2 py-0.5 rounded-full">
                    {a.badge}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--color-muted)] leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav />

      {/* Wi-Fi modal */}
      <WifiModal open={wifiOpen} onClose={() => setWifiOpen(false)} />

      {/* Spa booking sheet */}
      <SpaBookingSheet open={spaOpen} onClose={() => setSpaOpen(false)} />

      {/* Request toast */}
      {sentRequest && (
        <RequestToast label={REQUEST_LABELS[sentRequest]} />
      )}
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-3 border border-[var(--color-navy)]/6 active:scale-95 transition-transform cursor-pointer"
    >
      <div className="w-9 h-9 rounded-full bg-[var(--color-navy)]/5 flex items-center justify-center text-[var(--color-navy)]">
        {icon}
      </div>
      <span className="text-[10px] uppercase tracking-wide text-[var(--color-navy)] font-medium">
        {label}
      </span>
    </button>
  );
}

function TowelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="4" rx="1" />
      <path d="M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" />
      <path d="M9 11h6" />
    </svg>
  );
}

function SpaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 2 4 8 4 12c0 4 3 8 8 8s8-4 8-8c0-4-2-10-8-10z" />
      <path d="M8 12c0-2 2-4 4-4s4 2 4 4" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
