"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { PROJECT_SIMS } from "./ProjectSims";
import { SpotlightCard } from "./SpotlightCard";

type View = "roi" | "architecture";

const VIEWS: { id: View; label: string }[] = [
  { id: "roi", label: "Business ROI" },
  { id: "architecture", label: "Technical Architecture" },
];

const META = "font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500";

const SURFACE =
  "rounded-lg border border-white/[0.08] bg-zinc-900/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-colors hover:border-white/20";

const chip =
  "rounded border border-white/[0.1] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-300";

const button =
  "inline-flex h-10 items-center gap-1.5 rounded-md border border-white/[0.14] bg-white/[0.03] px-4 text-sm font-medium text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/30 hover:bg-white/[0.07]";

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className={META}>{label}</dt>
      <dd className="mt-2 max-w-[60ch] leading-relaxed text-zinc-400">
        {children}
      </dd>
    </div>
  );
}

function Toggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Case study view"
      className="inline-flex w-full rounded-md border border-white/[0.08] bg-white/[0.04] p-0.5 sm:w-auto"
    >
      {VIEWS.map((v) => {
        const active = v.id === view;
        return (
          <button
            key={v.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(v.id)}
            className={`h-8 flex-1 rounded px-3 text-[13px] font-medium transition-colors sm:flex-none ${
              active
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [view, setView] = useState<View>("roi");
  const { access, roi, architecture } = project;
  const num = String(index + 1).padStart(2, "0");
  const Sim = PROJECT_SIMS[project.slug];
  const simFirst = index % 2 === 1; // alternate the simulation side on desktop

  return (
    <article>
      <SpotlightCard surface={SURFACE} className="overflow-hidden">
        {/* Folder strip */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] bg-white/[0.03] px-5 py-2.5 sm:px-8">
          <span className="flex min-w-0 items-center gap-2 font-mono text-xs">
            <span aria-hidden="true" className="text-zinc-500">
              ▸
            </span>
            <span className="font-semibold text-zinc-100">{num}</span>
            <span className="truncate text-zinc-500">{project.slug}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 font-mono text-xs text-zinc-400">
            {access.type === "public" ? (
              <>
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]"
                />
                Public
              </>
            ) : (
              <>
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full border border-zinc-500"
                />
                Internal
              </>
            )}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-6 p-5 sm:p-8 lg:gap-8">
          {/* Story */}
          <div
            className={`col-span-12 lg:col-span-7 ${simFirst ? "lg:order-2" : ""}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className={META}>{project.role}</p>
                <h3 className="mt-2 max-w-[28ch] text-2xl font-medium leading-[1.08] tracking-[-0.035em] text-zinc-100">
                  {project.name}
                </h3>
              </div>
              <Toggle view={view} onChange={setView} />
            </div>

            {view === "roi" ? (
              <>
                <dl className="mt-6 space-y-5">
                  <Block label="Problem">{roi.problem}</Block>
                  <Block label="Operational bottleneck">{roi.bottleneck}</Block>
                </dl>
                <div className="mt-6 rounded-md border border-white/[0.06] bg-white/[0.02] p-5">
                  <p className={META}>Outcome</p>
                  <p className="mt-2 max-w-[40ch] text-xl font-medium leading-[1.2] tracking-[-0.03em] text-zinc-100 sm:text-2xl">
                    {roi.outcome}
                  </p>
                  <p className={`${META} mt-5`}>Time / cost saved</p>
                  <p className="mt-1.5 font-mono text-sm text-emerald-500">
                    {roi.timeSaved}
                  </p>
                  {project.metrics.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.metrics.map((m) => (
                        <li key={m} className={chip}>
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <dl className="mt-6 space-y-5">
                  <Block label="Trigger">{architecture.trigger}</Block>
                  <Block label="LLM pipeline">{architecture.aiPipeline}</Block>
                </dl>
                <div className="mt-6 rounded-md border border-white/[0.06] bg-white/[0.02] p-5">
                  <p className={META}>Guardrails</p>
                  <p className="mt-2 max-w-[44ch] text-xl font-medium leading-[1.2] tracking-[-0.03em] text-zinc-100 sm:text-2xl">
                    {architecture.guardrail}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.trustBadges.map((b) => (
                      <li
                        key={b}
                        className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-400"
                      >
                        <span aria-hidden="true">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Code-as-media */}
          {Sim && (
            <div
              className={`col-span-12 lg:col-span-5 lg:self-start ${
                simFirst ? "lg:order-1" : ""
              }`}
            >
              <Sim />
            </div>
          )}
        </div>

        {/* Tech + action */}
        <div className="flex flex-col gap-4 border-t border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <ul className="flex flex-wrap gap-1.5">
            {architecture.stack.map((t) => (
              <li
                key={t}
                className="rounded border border-white/[0.08] px-2 py-0.5 font-mono text-xs text-zinc-400"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline"
              >
                Source ↗
              </a>
            )}
            {access.type === "public" ? (
              <a
                href={access.url}
                target="_blank"
                rel="noopener noreferrer"
                className={button}
              >
                Visit live site
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <span className="inline-flex h-10 items-center rounded-md border border-dashed border-white/15 px-4 font-mono text-xs text-zinc-500">
                {access.note}
              </span>
            )}
          </div>
        </div>
      </SpotlightCard>
    </article>
  );
}
