const META = "font-mono text-xs uppercase tracking-[0.14em]";

// Page-level heading for the inner routes: a mono label and one punchy H1.
export function PageTitle({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-1 pb-2 pt-2">
      <p className={`${META} text-muted`}>{label}</p>
      <h1 className="mt-3 text-5xl font-medium leading-[1.04] tracking-[-0.04em] text-fg md:text-7xl">
        {children}
      </h1>
    </div>
  );
}
