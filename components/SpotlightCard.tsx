"use client";

const DEFAULT_SURFACE =
  "rounded-xl border border-line bg-tint shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong";

// Layered dark surface with a radial spotlight that follows the pointer.
// Pass `surface` to replace the default fill, border, radius and highlight.
export function SpotlightCard({
  children,
  className = "",
  innerClassName = "",
  surface = DEFAULT_SURFACE,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  surface?: string;
}) {
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={`group lift relative ${surface} ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 0%), var(--spot), transparent 70%)",
        }}
      />
      <div className={`relative h-full ${innerClassName}`}>{children}</div>
    </div>
  );
}
