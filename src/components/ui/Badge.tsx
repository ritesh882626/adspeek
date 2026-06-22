interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-[var(--surface-2)] text-[var(--foreground)]",
    accent: "bg-[var(--accent-light)] text-[var(--accent)]",
    muted: "bg-[var(--surface)] text-[var(--muted)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
