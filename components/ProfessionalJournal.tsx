"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { journalEntries, type JournalEntry } from "@/data/portfolioData";

const META = "font-mono text-[11px] uppercase tracking-[0.18em]";

// Only years that actually have an entry, newest first.
const YEARS = [...new Set(journalEntries.map((e) => e.year))].sort(
  (a, b) => Number(b) - Number(a),
);

const FILTERS = [
  { id: "all", label: "[ All Years ]" },
  ...YEARS.map((y) => ({ id: y, label: `[ ${y} ]` })),
];

function Entry({ e }: { e: JournalEntry }) {
  return (
    <li className="lift rounded-lg border border-line bg-surface shadow-[inset_0_1px_0_0_var(--highlight)] hover:border-line-strong">
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-line bg-tint-2 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg">
            {e.category}
          </span>
          <span className={`${META} text-muted`}>{e.year}</span>
          {e.period && (
            <span className={`${META} text-muted`}>· {e.period}</span>
          )}
        </div>

        <h4 className="mt-4 max-w-[34ch] text-xl font-medium leading-[1.15] tracking-[-0.03em] text-fg sm:text-2xl">
          {e.title}
        </h4>
        {e.organization && (
          <p className="mt-2 text-sm font-medium text-fg-2">
            {e.organization}
          </p>
        )}
        <p className="mt-3 max-w-[60ch] leading-relaxed text-fg-2">
          {e.description}
        </p>

        {e.image && (
          <figure className="mt-5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-line">
              <Image
                src={e.image.src}
                alt={e.image.alt}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>
            {e.image.caption && (
              <figcaption className="mt-2 text-sm text-muted">
                {e.image.caption}
              </figcaption>
            )}
          </figure>
        )}

        {e.details && (
          <details className="group mt-5 border-t border-line pt-4">
            <summary
              className={`${META} flex cursor-pointer list-none items-center justify-between text-fg-2 hover:text-fg [&::-webkit-details-marker]:hidden`}
            >
              Highlights ({e.details.length})
              <ChevronDown
                aria-hidden="true"
                className="size-4 transition-transform group-open:rotate-180"
              />
            </summary>
            <ul className="mt-3 space-y-2">
              {e.details.map((d) => (
                <li
                  key={d}
                  className="flex gap-2 text-sm leading-relaxed text-fg-2"
                >
                  <span aria-hidden="true" className="text-muted">
                    ▸
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </details>
        )}

        {e.tags && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {e.tags.map((t) => (
              <li
                key={t}
                className="rounded border border-line px-2 py-0.5 font-mono text-xs text-fg-2"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export function ProfessionalJournal() {
  const [filter, setFilter] = useState<string>("all");
  const visibleYears = filter === "all" ? YEARS : YEARS.filter((y) => y === filter);

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-canvas p-6 text-fg sm:mt-10 sm:p-10 lg:p-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_85%_0%,var(--glow),transparent_70%)]"
      />
      <div className="relative">
        <p className={`${META} text-muted`}>
          Journal · Professional &amp; academic milestones
        </p>
        <h2
          id="journal-heading"
          className="mt-4 max-w-[22ch] text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl"
        >
          A chronological record of milestones,{" "}
          <span className="text-muted">
            student leadership, and systems engineering.
          </span>
        </h2>

        {/* Year selector */}
        <div
          role="group"
          aria-label="Filter by year"
          className="mt-8 inline-flex flex-wrap gap-0.5 rounded-lg border border-line bg-tint-2 p-0.5"
        >
          {FILTERS.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`relative rounded-md px-3.5 py-2 font-mono text-xs transition-colors ${
                  active ? "text-accent-fg" : "text-fg-2 hover:text-fg"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeJournalYear"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md bg-accent shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative mt-10 pl-6"
          >
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-px bg-line"
            />
            <ol className="space-y-12">
              {visibleYears.map((year) => (
                <li key={year} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] top-3 size-2 rounded-full bg-fg ring-4 ring-canvas"
                  />
                  <h3 className="font-mono text-3xl font-medium tracking-[-0.04em] text-fg">
                    {year}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {journalEntries
                      .filter((e) => e.year === year)
                      .map((e) => (
                        <Entry key={e.id} e={e} />
                      ))}
                  </ul>
                </li>
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
