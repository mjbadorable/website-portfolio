import { ArrowUpRight } from "lucide-react";
import { recentProjects, stack } from "@/data/showcase";

const META = "font-mono text-[11px] uppercase tracking-[0.18em]";

const pill =
  "rounded-full border border-line bg-tint px-3 py-1.5 font-mono text-[13px] text-fg-2 shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong hover:bg-tint-2 hover:text-fg";

function Dots() {
  return (
    <span aria-hidden="true" className="flex gap-1.5">
      <span className="size-2.5 rounded-full bg-line-strong" />
      <span className="size-2.5 rounded-full bg-line-strong" />
      <span className="size-2.5 rounded-full bg-line-strong" />
    </span>
  );
}

export function TechStackAndProjects() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="stack-heading"
      className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-canvas p-6 text-fg sm:mt-10 sm:p-10 lg:p-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_85%_0%,var(--glow),transparent_70%)]"
      />
      <div className="relative">
        <p className={`${META} text-muted`}>[ Tech stack // Recent projects ]</p>
        <h2
          id="stack-heading"
          className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl"
        >
          Daily drivers.{" "}
          <span className="text-muted">What I&apos;ve shipped lately.</span>
        </h2>

        {/* Part 1: stack.json editor card */}
        <div className="mt-10 overflow-hidden rounded-lg border border-line bg-surface shadow-[inset_0_1px_0_0_var(--highlight)]">
          <div className="flex items-center gap-4 border-b border-line bg-tint px-4 py-2.5">
            <Dots />
            <span className="inline-flex items-center gap-2 rounded-t border border-b-0 border-line bg-canvas px-3 py-1 font-mono text-xs text-fg">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-ok"
              />
              {stack.file}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-px bg-line">
            {stack.categories.map((c, i) => (
              <div
                key={c.key}
                className={`col-span-12 bg-canvas p-5 sm:p-6 ${
                  i === 0 || i === 3 ? "lg:col-span-7" : "lg:col-span-5"
                }`}
              >
                <h3 className={`${META} text-muted`}>
                  {`"${c.key}"`}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.items.map((item) => (
                    <li key={item} className={pill}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: recent projects */}
        <div className="mt-14">
          <h3 className={`${META} text-fg-2`}>Recent projects</h3>
          <ul className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-6">
            {recentProjects.map((p) => (
              <li
                key={p.title}
                className="lift flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-[inset_0_1px_0_0_var(--highlight)] hover:border-line-strong"
              >
                <div className="flex items-center gap-3 border-b border-line bg-tint px-3.5 py-2.5">
                  <Dots />
                  <span className="min-w-0 flex-1 truncate rounded border border-line bg-sunken px-2.5 py-1 font-mono text-[11px] text-fg-2">
                    {p.host}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h4 className="text-xl font-medium leading-[1.15] tracking-[-0.03em] text-fg">
                    {p.title}
                  </h4>
                  <ul className="mt-4 space-y-1.5">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-2 text-sm leading-relaxed text-fg-2"
                      >
                        <span aria-hidden="true" className="text-muted">
                          ▸
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-tint px-3.5 text-[13px] font-medium text-fg shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong hover:bg-surface-hover"
                      >
                        Visit live site
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] text-muted">
                        Internal build · address bar simulated
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
