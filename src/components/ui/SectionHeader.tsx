import Badge from "./Badge";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <Badge variant="accent" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-[28px] leading-[1.15] font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-[var(--muted)] max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
