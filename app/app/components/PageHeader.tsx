import Image from "next/image";
import BackButton from "./BackButton";

interface Props {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  label?: string;
  height?: string;
}

export default function PageHeader({ src, alt, title, subtitle, label, height = "h-44" }: Props) {
  return (
    <div className={`relative ${height} shrink-0 overflow-hidden`}>
      <Image src={src} alt={alt} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1824]/30 via-transparent to-[#0c1824]/65" />
      <BackButton />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {label && (
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] mb-1">{label}</span>
        )}
        <h1 className="font-display text-[28px] text-white leading-tight">
          {title}
        </h1>
        <p className="text-[13px] text-white/70 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
