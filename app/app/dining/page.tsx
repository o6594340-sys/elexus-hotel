"use client";

import Image from "next/image";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import BackButton from "../components/BackButton";

type Tab = "all" | "restaurants" | "bars" | "included";

const RESTAURANTS = [
  {
    id: "meyan",
    name: "Meyan Ocakbaşı",
    cuisine: "International Buffet",
    image: "/restaurant__meyan.webp",
    hours: [
      { label: "Breakfast", time: "07:00 – 10:00" },
      { label: "Lunch",     time: "13:00 – 15:00" },
      { label: "Dinner",    time: "19:00 – 22:00" },
    ],
    included: true,
    dresscode: null,
    note: "Local dishes, grills, and appetizers prepared with special Turkish recipes.",
  },
  {
    id: "reflection",
    name: "Reflection",
    cuisine: "International Buffet",
    image: "/restaurant_reflection.webp",
    hours: [
      { label: "Breakfast", time: "07:00 – 10:00" },
      { label: "Lunch",     time: "12:30 – 14:30" },
      { label: "Dinner",    time: "19:00 – 22:00" },
    ],
    included: true,
    dresscode: null,
    note: "Main buffet restaurant with world and Turkish cuisine across seven open buffet stations.",
  },
  {
    id: "leaf",
    name: "Leaf",
    cuisine: "Open Buffet",
    image: "/restaurant_leaf.webp",
    hours: [
      { label: "Afternoon", time: "15:00 – 17:00" },
      { label: "Dinner",    time: "19:00 – 22:00" },
    ],
    included: true,
    dresscode: null,
    note: "Open buffet with light and fresh dishes served in the afternoon and evening.",
  },
  {
    id: "snack",
    name: "Snack Bar",
    cuisine: "Light Bites · Pool Side",
    image: "/restaurant_snack.webp",
    hours: [
      { label: "All day", time: "10:00 – 18:00" },
    ],
    included: true,
    dresscode: null,
    note: "Light snacks, sandwiches, and refreshments by the pool.",
  },
  {
    id: "bistro24",
    name: "Bistro 24",
    cuisine: "All-Day Dining",
    image: "/restaurant_bistro24.webp",
    hours: [
      { label: "Open", time: "24 hours" },
    ],
    included: true,
    dresscode: null,
    note: "International cuisine around the clock — rich menu and sea terrace views.",
  },
  {
    id: "myoga",
    name: "Myoga",
    cuisine: "Far East · Asian",
    image: "/restaurant_myoga.webp",
    hours: [
      { label: "Dinner", time: "19:00 – 23:00" },
    ],
    included: false,
    dresscode: "Smart casual",
    note: "Exotic Far Eastern and Asian flavours. Reservation required.",
  },
  {
    id: "kaluga",
    name: "Kaluga",
    cuisine: "Seafood · À la carte",
    image: "/restaurant_kaluga.webp",
    hours: [
      { label: "Dinner", time: "19:00 – 23:00" },
    ],
    included: false,
    dresscode: "Smart casual",
    note: "Fresh Mediterranean seafood in a distinctive à la carte setting. Reservation required.",
  },
  {
    id: "cannoli",
    name: "Cannoli Patisserie",
    cuisine: "Italian · Café · Pastries",
    image: "/restaurant_cannoli-patisserie.webp",
    hours: [
      { label: "Morning", time: "09:00 – 12:00" },
      { label: "Evening", time: "15:00 – 22:00" },
    ],
    included: false,
    dresscode: null,
    note: "Luxury Italian-style patisserie with artisan pastries and premium coffee.",
  },
];

const BARS = [
  {
    id: "pool-bar",
    name: "Pool Bar",
    hours: "10:00 – 19:00",
    included: false,
    note: "Cold drinks and cocktails in the comfortable pool-side setting.",
  },
  {
    id: "mia-bar",
    name: "Mia Beach Club",
    hours: "10:00 – 18:00",
    included: false,
    note: "Beachside bar — drinks and snacks in the glow of the Mediterranean sun.",
  },
  {
    id: "deep-bar",
    name: "Deep Bar",
    hours: "18:00 – 01:00",
    included: false,
    note: "On the pier, right above the sea. Cocktails with panoramic sunset views.",
  },
  {
    id: "lobby-bar",
    name: "Lobby Bar",
    hours: "09:00 – 00:00",
    included: false,
    note: "Rich beverage menu in the main lobby. Cool off at the hottest hours.",
  },
  {
    id: "lounge-bar",
    name: "Lounge Bar",
    hours: "20:00 – 02:00",
    included: false,
    note: "Art Deco interior with live performances and evening entertainment.",
  },
];

const INCLUDED_ITEMS = [
  {
    category: "Meals",
    icon: IncludedFoodIcon,
    items: [
      { label: "Breakfast — Meyan Ocakbaşı & Reflection", included: true },
      { label: "Lunch — Meyan Ocakbaşı & Leaf",           included: true },
      { label: "Dinner — Meyan Ocakbaşı",                 included: true },
      { label: "Afternoon tea & snacks — Leaf",           included: true },
      { label: "Late night snacks — Bistro 24",           included: true },
      { label: "Myoga, Kaluga, Cannoli Patisserie",        included: false, note: "Extra charge" },
    ],
  },
  {
    category: "Drinks",
    icon: IncludedDrinksIcon,
    items: [
      { label: "Non-alcoholic drinks at all meals",       included: true },
      { label: "Local alcoholic drinks at meals",         included: true },
      { label: "Soft drinks throughout the day",          included: true },
      { label: "Cocktails & premium spirits",             included: false, note: "Extra charge" },
      { label: "Minibar",                                 included: false, note: "Extra charge" },
    ],
  },
  {
    category: "Facilities & Activities",
    icon: IncludedPoolIcon,
    items: [
      { label: "7 outdoor pools & indoor pool",           included: true },
      { label: "Aqua Park",                               included: true },
      { label: "Private beach & sun loungers",            included: true },
      { label: "Fitness centre",                          included: true },
      { label: "Beach volleyball & tennis",               included: true },
      { label: "Kids' Mini Club",                         included: true },
      { label: "Evening shows & live concerts",           included: true },
      { label: "Zoya Spa treatments",                     included: false, note: "Extra charge" },
      { label: "Motorised water sports",                  included: false, note: "Extra charge" },
      { label: "Casino",                                  included: false, note: "Extra charge" },
    ],
  },
];

export default function DiningPage() {
  const [tab, setTab] = useState<Tab>("all");

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-[var(--color-cream)] relative">
      {/* Header */}
      <div className="relative h-44 shrink-0 overflow-hidden">
        <Image src="/restaurant__meyan.webp" alt="Dining" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1824]/25 via-transparent to-[#0c1824]/60" />
        <BackButton />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <h1 className="text-[28px] text-white leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Dining
          </h1>
          <p className="text-[13px] text-white/70 mt-0.5">Restaurants, bars & what's included</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4 pb-2 overflow-x-auto shrink-0">
        {(["all", "restaurants", "bars", "included"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium uppercase tracking-wide transition-colors cursor-pointer"
            style={{
              background: tab === t ? "var(--color-navy)" : "white",
              color: tab === t ? "white" : "var(--color-muted)",
              border: tab === t ? "none" : "1px solid rgba(12,24,36,0.1)",
            }}
          >
            {t === "included" ? "What's Included" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 px-4">

        {(tab === "all" || tab === "restaurants") && (
          <div className="pt-2">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Restaurants</p>
            <div className="flex flex-col gap-3">
              {RESTAURANTS.map((r) => (
                <RestaurantCard key={r.id} {...r} />
              ))}
            </div>
          </div>
        )}

        {(tab === "all" || tab === "bars") && (
          <div className="pt-5">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Bars</p>
            <div className="flex flex-col gap-3">
              {BARS.map((b) => (
                <BarCard key={b.id} {...b} />
              ))}
            </div>
          </div>
        )}

        {(tab === "all" || tab === "included") && (
          <div className="pt-5">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">What's Included</p>
            <div className="bg-[var(--color-navy)]/5 rounded-xl p-3 mb-4" style={{ borderLeft: "3px solid var(--color-navy)", paddingLeft: "12px" }}>
              <p className="text-[13px] text-[var(--color-navy)] font-medium">All Inclusive Plus</p>
              <p className="text-[12px] text-[var(--color-muted)] mt-0.5 leading-relaxed">
                Meals at Meyan Ocakbaşı, Reflection, Leaf and Bistro 24 are included. Local drinks at meals included. Spa, à la carte restaurants and premium spirits are charged separately.
              </p>
            </div>
            {INCLUDED_ITEMS.map((section) => (
              <div key={section.category} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <section.icon />
                  <p className="text-[12px] uppercase tracking-wide text-[var(--color-muted)] font-medium">{section.category}</p>
                </div>
                <div className="bg-white rounded-xl overflow-hidden border border-[var(--color-navy)]/6">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-navy)]/6 last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.included ? "bg-emerald-100" : "bg-red-50"}`}>
                          {item.included
                            ? <CheckIcon color="#10b981" />
                            : <CrossIcon color="#ef4444" />
                          }
                        </div>
                        <span className="text-[13px] text-[var(--color-navy)]">{item.label}</span>
                      </div>
                      {!item.included && item.note && (
                        <span className="text-[11px] text-[var(--color-muted)] ml-2 shrink-0">{item.note}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function RestaurantCard({ name, cuisine, image, hours, included, dresscode, note }: typeof RESTAURANTS[0]) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[var(--color-navy)]/6 shadow-sm shadow-[var(--color-navy)]/5">
      <div className="relative h-32">
        <Image src={image} alt={name} fill className="object-cover" />
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${included ? "bg-[var(--color-navy)] text-white" : "bg-white/90 text-[var(--color-navy)]"}`}>
            {included ? "Included" : "Extra charge"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-[16px] font-semibold text-[var(--color-navy)]">{name}</h3>
        </div>
        <p className="text-[12px] text-[var(--color-muted)] mb-3">{cuisine}</p>
        <div className="flex flex-col gap-1 mb-3">
          {hours.map((h, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-[12px] text-[var(--color-muted)]">{h.label}</span>
              <span className="text-[12px] font-medium text-[var(--color-navy)] tabular-nums">{h.time}</span>
            </div>
          ))}
        </div>
        {dresscode && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[11px] bg-[var(--color-navy)]/8 text-[var(--color-navy)] px-2 py-0.5 rounded-full">{dresscode}</span>
          </div>
        )}
        <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">{note}</p>
      </div>
    </div>
  );
}

function BarCard({ name, hours, included, note }: typeof BARS[0]) {
  return (
    <div className="bg-white rounded-xl p-4 border border-[var(--color-navy)]/6 shadow-sm shadow-[var(--color-navy)]/5 flex items-start justify-between gap-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[15px] font-semibold text-[var(--color-navy)]">{name}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${included ? "bg-[var(--color-navy)] text-white" : "bg-[var(--color-navy)]/8 text-[var(--color-muted)]"}`}>
            {included ? "Included" : "Extra charge"}
          </span>
        </div>
        <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">{note}</p>
      </div>
      <span className="text-[12px] font-medium text-[var(--color-navy)] tabular-nums shrink-0">{hours}</span>
    </div>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon({ color }: { color: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IncludedFoodIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function IncludedDrinksIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2h8l-1 8H9L8 2z" /><path d="M9 10c0 5 6 8 6 8H9s6-3 6-8" />
    </svg>
  );
}

function IncludedPoolIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12h20" /><path d="M2 17c2-2 4 0 6 0s4-2 6 0 4 2 6 0" /><path d="M2 7c2-2 4 0 6 0s4-2 6 0 4 2 6 0" />
    </svg>
  );
}
