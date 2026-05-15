"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/",        label: "Home",     icon: HomeIcon },
  { href: "/dining",  label: "Dining",   icon: DiningIcon },
  { href: "/spa",     label: "Spa",      icon: SpaIcon },
  { href: "/map",     label: "Map",      icon: MapIcon },
  { href: "/requests",label: "Requests", icon: RequestsIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--color-navy)]/8 flex items-center px-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center py-2.5 gap-1"
          >
            <Icon active={active} />
            <span
              className="text-[10px] uppercase tracking-wide font-medium"
              style={{ color: active ? "var(--color-gold)" : "var(--color-muted)" }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-gold)" : "var(--color-muted)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function DiningIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-gold)" : "var(--color-muted)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function SpaIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-gold)" : "var(--color-muted)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6 2 4 8 4 12c0 4 3 8 8 8s8-4 8-8c0-4-2-10-8-10z" />
      <path d="M8 12c0-2 2-4 4-4s4 2 4 4" />
    </svg>
  );
}

function MapIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-gold)" : "var(--color-muted)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

function RequestsIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-gold)" : "var(--color-muted)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  );
}
