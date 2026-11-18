"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ProjectDashboardPreview } from "@/components/ProjectDashboardPreview";
import { TechIcon } from "@/components/TechIcon";
import {
  projectCategories,
  type ProjectCategory,
  type RecentProject,
} from "@/data/showcase";

const META = "font-mono text-[11px] uppercase tracking-[0.14em]";

const actionBtn =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-tint px-3.5 text-xs font-medium text-fg shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong hover:bg-surface-hover";

type Filter = "All" | ProjectCategory;

const NOTE_LABELS = [
  ["problem", "Problem"],
  ["approach", "Approach"],
  ["outcome", "Outcome"],
] as const;

function ProjectCard({ p }: { p: RecentProject }) {
  const steps = p.architectureSummary
    ?.replace(/\.$/, "")
    .split("➔")
    .map((s) => s.trim());

  const classificationLabel = p.category === "Web apps" ? "Web App" : "System";

  return (
    <li className="group/card lift flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[inset_0_1px_0_0_var(--highlight)] hover:border-line-strong">
      <ProjectDashboardPreview project={p} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-accent/40 bg-tint px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg">
            {p.domain}
          </span>
          <span className="rounded-full border border-line bg-tint px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {classificationLabel}
          </span>
        </div>

        <h3 className="mt-3.5 min-h-[3.25rem] text-xl font-semibold leading-[1.2] tracking-[-0.025em] text-fg">
          {p.title}
        </h3>
        <p className="mt-2 min-h-[4.25rem] text-sm leading-relaxed text-fg-2">
          {p.description}
        </p>

        <ul
          aria-label="Technologies"
          className="mt-4 flex min-h-[4.1rem] flex-wrap content-start gap-1.5"
        >
          {p.tech.slice(0, 4).map((t) => (
            <li
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-tint px-2.5 py-1 text-[13px] text-fg-2"
            >
              <TechIcon label={t} />
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
        <details className="group mt-5 border-t border-line pt-3">
          <summary
            className={`${META} flex cursor-pointer list-none items-center justify-between gap-2 rounded text-fg-2 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent [&::-webkit-details-marker]:hidden`}
          >
            Build notes
            <ChevronDown
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <dl className="mt-3 space-y-3 rounded-md border-l-2 border-line-strong bg-tint/50 p-3">
            {NOTE_LABELS.map(([key, label]) =>
              p.notes[key] ? (
                <div key={key}>
                  <dt className={`${META} text-muted`}>{label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg-2">
                    {p.notes[key]}
                  </dd>
                </div>
              ) : null,
            )}
            {steps && (
              <div>
                <dt className={`${META} text-muted`}>Architecture pipeline</dt>
                <dd>
                  <ol className="mt-1 space-y-1">
                    {steps.map((s, n) => (
                      <li
                        key={s}
                        className="flex gap-2 font-mono text-xs leading-relaxed text-fg-2"
                      >
                        <span aria-hidden="true" className="text-muted">
                          {n === 0 ? "▸" : "➔"}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </dd>
              </div>
            )}
          </dl>
        </details>

        <div className="flex flex-wrap items-center gap-2 pt-5">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionBtn}
            >
              Demo
              <ArrowUpRight aria-hidden="true" className="size-3" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {p.repoUrl && (
            <a
              href={p.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionBtn}
            >
              GitHub
              <ArrowUpRight aria-hidden="true" className="size-3" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {!p.liveUrl && !p.repoUrl && (
            <span className={`${META} text-muted`}>Internal build</span>
          )}
        </div>
        </div>
      </div>
    </li>
  );
}

export function FeaturedProjects({ projects }: { projects: RecentProject[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const filters: { id: Filter; count: number }[] = [
    { id: "All", count: projects.length },
    ...projectCategories.map((c) => ({
      id: c as Filter,
      count: projects.filter((p) => p.category === c).length,
    })),
  ];
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      aria-labelledby="featured-heading"
      className="py-12 lg:py-16"
    >
      <p className={`${META} text-muted`}>Featured projects</p>
      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2
            id="featured-heading"
            className="text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl"
          >
            Selected projects,{" "}
            <span className="text-muted">in-house and independent.</span>
          </h2>
          <p className="mt-5 max-w-[60ch] leading-relaxed text-fg-2">
            I start from a real operational problem and scope it tightly. Then
            I test the edge cases before users find them, and ship web apps and
            systems that stay maintainable.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter projects by classification"
          className="flex shrink-0 flex-wrap items-center gap-2"
        >
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`relative rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
                  active
                    ? "border-transparent text-accent-fg"
                    : "border-line bg-surface text-fg-2 hover:border-line-strong hover:text-fg"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="featuredProjectsFilter"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-accent shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  {f.id}{" "}
                  <span className="opacity-70">{f.count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2"
        >
          {visible.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}
