import Image from "next/image";
import BottomNav from "../components/BottomNav";
import PageHeader from "../components/PageHeader";
import type { ComponentType } from "react";

type Place = { name: string; floor: string; hours: string; Icon: ComponentType };

const AREAS: { zone: string; color: string; places: Place[] }[] = [
  {
    zone: "Main Building",
    color: "#0c1824",
    places: [
      { name: "Reception & Concierge",  floor: "Ground",   hours: "24/7",             Icon: KeyIcon },
      { name: "Meyan Ocakbaşı",            floor: "Ground",   hours: "07:00–22:00",      Icon: DiningIcon },
      { name: "Reflection Restaurant",   floor: "Ground",   hours: "07:30–10:30",      Icon: TeaIcon },
      { name: "Lobby Bar",               floor: "Ground",   hours: "09:00–00:00",      Icon: CocktailIcon },
      { name: "Casino",                  floor: "Ground",   hours: "24/7",             Icon: CasinoIcon },
    ],
  },
  {
    zone: "Wellness",
    color: "#5b8fa8",
    places: [
      { name: "Zoya Spa & Wellness",      floor: "Level 1",  hours: "08:00–21:00",      Icon: SpaIcon },
      { name: "Turkish Hammam",           floor: "Level 1",  hours: "08:00–21:00",      Icon: HammamIcon },
      { name: "Fitness Centre",           floor: "Level 1",  hours: "07:00–22:00",      Icon: FitnessIcon },
      { name: "Indoor Pool (Olympic)",    floor: "Level 1",  hours: "08:00–20:00",      Icon: PoolIcon },
    ],
  },
  {
    zone: "Outdoor & Beach",
    color: "#2d7d6e",
    places: [
      { name: "Main Outdoor Pool",        floor: "Terrace",  hours: "08:00–20:00",      Icon: PoolIcon },
      { name: "Adults Pool (16+)",        floor: "Terrace",  hours: "08:00–20:00",      Icon: PoolIcon },
      { name: "Aqua Park",                floor: "Terrace",  hours: "10:00–18:00",      Icon: WaterslideIcon },
      { name: "Pool Bar",                 floor: "Terrace",  hours: "10:00–19:00",      Icon: CocktailIcon },
      { name: "Private Beach (1.3 km)",   floor: "Sea level", hours: "08:00–19:00",     Icon: BeachIcon },
      { name: "Mia Beach Club",           floor: "Sea level", hours: "10:00–18:00",     Icon: CocktailIcon },
      { name: "Deep Bar",                 floor: "Pier",      hours: "18:00–01:00",     Icon: CocktailIcon },
    ],
  },
  {
    zone: "Entertainment",
    color: "#8b6914",
    places: [
      { name: "Amphitheatre",             floor: "Terrace",  hours: "Evening shows",    Icon: StageIcon },
      { name: "Lounge Bar",               floor: "Ground",   hours: "20:00–02:00",      Icon: CocktailIcon },
      { name: "Mini Club (Kids)",         floor: "Ground",   hours: "09:00–18:00",      Icon: KidsIcon },
      { name: "Games Room",               floor: "Ground",   hours: "10:00–22:00",      Icon: GamesIcon },
    ],
  },
  {
    zone: "Conference & MICE",
    color: "#4a3f6b",
    places: [
      { name: "Congress Hall",            floor: "Level 1",  hours: "By arrangement",   Icon: PresentationIcon },
      { name: "Conference Rooms (×3)",    floor: "Level 1",  hours: "By arrangement",   Icon: PresentationIcon },
      { name: "Business Centre",          floor: "Level 1",  hours: "08:00–20:00",      Icon: BriefcaseIcon },
    ],
  },
];

export default function MapPage() {
  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-[var(--color-cream)] relative">
      <PageHeader
        src="/pool.jpg"
        alt="Hotel territory"
        title="Hotel Map"
        subtitle="277 000 m² · Find your way around"
      />

      {/* Territory photo strip */}
      <div className="flex gap-2 px-4 pt-4 overflow-x-auto shrink-0 pb-1">
        {["/aqua-park.jpg", "/spa.jpg", "/restaurant.jpg", "/lobby.jpg"].map((src, i) => (
          <div key={i} className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Area directory */}
      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
        <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-3">Facilities Directory</p>
        {AREAS.map((area) => (
          <div key={area.zone} className="mb-4">
            <div
              className="flex items-center gap-2 mb-2 px-3 py-2 rounded-lg"
              style={{ background: area.color + "15" }}
            >
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: area.color }} />
              <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: area.color }}>
                {area.zone}
              </p>
            </div>
            <div className="bg-white rounded-xl overflow-hidden border border-[var(--color-navy)]/6 shadow-sm shadow-[var(--color-navy)]/5">
              {area.places.map((place, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-navy)]/6 last:border-0"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: area.color + "18", color: area.color }}
                  >
                    <place.Icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[var(--color-navy)] truncate">{place.name}</p>
                    <p className="text-[12px] text-[var(--color-navy)]/50">{place.floor}</p>
                  </div>
                  <span className="text-[12px] text-[var(--color-navy)]/50 tabular-nums shrink-0">{place.hours}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-[var(--color-navy)]/5 rounded-xl p-4 mb-2">
          <p className="text-[14px] font-medium text-[var(--color-navy)] mb-1">Need help finding something?</p>
          <p className="text-[12px] text-[var(--color-navy)]/60 leading-relaxed">
            Our reception team is available 24/7. Ask at the front desk or use the Requests tab.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ─── SVG Icons ─── */
function KeyIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L22 7l-3-3"/></svg>;
}
function DiningIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>;
}
function TeaIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>;
}
function CocktailIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 22h8"/><path d="M12 11v11"/><path d="M20 2H4l8 9.46L20 2z"/></svg>;
}
function CasinoIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><circle cx="12" cy="10" r="2"/></svg>;
}
function SpaIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C6 2 4 8 4 12c0 4 3 8 8 8s8-4 8-8c0-4-2-10-8-10z"/><path d="M8 12c0-2 2-4 4-4s4 2 4 4"/></svg>;
}
function HammamIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 14s-2-4 0-8"/><path d="M12 14s-2-4 0-8"/><path d="M16 14s-2-4 0-8"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>;
}
function FitnessIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4M6 12h12"/></svg>;
}
function PoolIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12h20"/><path d="M2 17c2-2 4 0 6 0s4-2 6 0 4 2 6 0"/><path d="M2 7c2-2 4 0 6 0s4-2 6 0 4 2 6 0"/></svg>;
}
function WaterslideIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3h18"/><path d="M3 3c0 9 6 12 9 18"/><path d="M21 3c0 9-6 12-9 18"/></svg>;
}
function BeachIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}
function StageIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 20h20"/><path d="M6 20V10"/><path d="M18 20V10"/><path d="M12 20V4"/><path d="M2 10h20"/></svg>;
}
function StarIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
function KidsIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="3"/><path d="M6 22v-5l-2-3 4-3h8l4 3-2 3v5"/><path d="M10 22v-3h4v3"/></svg>;
}
function GamesIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="16" cy="10" r="1" fill="currentColor"/><circle cx="18" cy="14" r="1" fill="currentColor"/></svg>;
}
function PresentationIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21l4-4 4 4"/><path d="M12 17V21"/></svg>;
}
function BriefcaseIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/><path d="M2 12h20"/></svg>;
}
