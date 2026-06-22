"use client";

// Placeholder company names — swap with real logos/images when available
const ROW_1 = [
  "TechNova", "BuildRight", "HealthFirst", "RetailMax", "EduGrow",
  "FinanceHub", "ManufactureX", "StyleVault", "FoodChain", "PropTech",
];

const ROW_2 = [
  "MediCare", "AutoDrive", "CleanEnergy", "LogisPro", "AgriTech",
  "CryptoBase", "DataSync", "CloudNet", "GrowthLab", "MarketIQ",
];

function LogoChip({ name }: { name: string }) {
  // Deterministic color based on name for visual variety
  const colors = [
    "bg-blue-50 text-blue-600",
    "bg-purple-50 text-purple-600",
    "bg-emerald-50 text-emerald-600",
    "bg-orange-50 text-orange-600",
    "bg-rose-50 text-rose-600",
    "bg-sky-50 text-sky-600",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];

  return (
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border)] bg-white flex-shrink-0 select-none">
      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${color}`}>
        {name.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-xs font-semibold text-[var(--muted)] whitespace-nowrap tracking-wide">{name}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex gap-3 overflow-hidden">
      <div className={`flex gap-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`} style={{ width: "max-content" }}>
        {[...doubled, ...doubled].map((name, i) => (
          <LogoChip key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

interface MarqueeProps {
  rows?: 1 | 2;
  className?: string;
}

export default function Marquee({ rows = 2, className = "" }: MarqueeProps) {
  return (
    <div
      className={`pause-on-hover overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${className}`}
    >
      <div className="flex flex-col gap-3 py-1">
        <MarqueeRow items={ROW_1} />
        {rows === 2 && (
          <div className="hidden md:block">
            <MarqueeRow items={ROW_2} reverse />
          </div>
        )}
      </div>
    </div>
  );
}
