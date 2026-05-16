import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:opacity-70"
      aria-label="Back to home"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </Link>
  );
}
