"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";

type View = "roi" | "architecture";

const VIEWS: { id: View; label: string }[] = [
  { id: "roi", label: "Business ROI" },
  { id: "architecture", label: "Technical Architecture" },
];

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-base leading-relaxed text-ink/80">
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
      className="inline-flex w-full rounded-lg border border-line bg-canvas p-0.5 sm:w-auto"
    >
      {VIEWS.map((v) => {
        const active = v.id === view;
        return (
          <button
            key={v.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(v.id)}
            className={`h-8 flex-1 rounded-md px-3 text-[13px] font-medium transition-colors sm:flex-none ${
              active
                ? "bg-card text-primary shadow-[0_1px_2px_rgb(15_23_42/0.1)]"
                : "text-muted hover:text-ink"
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

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-card shadow-card transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[0_1px_2px_rgb(15_23_42/0.06),0_16px_32px_-16px_rgb(15_23_42/0.2)]">
      {/* Folder strip */}
      <div className="flex items-center justify-between gap-4 border-b border-line bg-canvas px-5 py-2.5 sm:px-8">
        <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted">
          <span className="font-semibold text-primary">{num}</span>
          <span aria-hidden="true">▸</span>
          <span className="truncate">{project.slug}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted">
          {access.type === "public" ? (
            <>
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-primary"
              />
              Public
            </>
          ) : (
            <>
              <span aria-hidden="true">🔒</span>
              Internal
            </>
          )}
        </span>
      </div>

      <div className="p-5 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-xs text-muted">{project.role}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">
              {project.name}
            </h3>
          </div>
          <Toggle view={view} onChange={setView} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {view === "roi" ? (
            <>
              <dl className="space-y-4 lg:col-span-6">
                <Block label="Problem">{roi.problem}</Block>
                <Block label="Operational bottleneck">{roi.bottleneck}</Block>
              </dl>
              <div className="flex flex-col justify-between gap-5 rounded-lg border border-line bg-canvas p-5 lg:col-span-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    Outcome
                  </p>
                  <p className="mt-2 text-2xl font-semibold leading-snug tracking-tight sm:text-[1.75rem]">
                    {roi.outcome}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    Time / cost saved
                  </p>
                  <p className="mt-1.5 text-lg font-semibold text-primary">
                    {roi.timeSaved}
                  </p>
                </div>
                {project.metrics.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {project.metrics.map((m) => (
                      <li
                        key={m}
                        className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <dl className="space-y-4 lg:col-span-6">
                <Block label="Trigger">{architecture.trigger}</Block>
                <Block label="LLM pipeline">{architecture.aiPipeline}</Block>
              </dl>
              <div className="flex flex-col justify-between gap-5 rounded-lg border border-line bg-canvas p-5 lg:col-span-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    Guardrails
                  </p>
                  <p className="mt-2 text-2xl font-semibold leading-snug tracking-tight sm:text-[1.75rem]">
                    {architecture.guardrail}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {project.trustBadges.map((b) => (
                    <li
                      key={b}
                      className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tech + action */}
      <div className="flex flex-col gap-4 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <ul className="flex flex-wrap gap-1.5">
          {architecture.stack.map((t) => (
            <li
              key={t}
              className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted"
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
              className="font-mono text-sm text-primary underline-offset-4 hover:underline"
            >
              Source ↗
            </a>
          )}
          {access.type === "public" ? (
            <a
              href={access.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Visit live site
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <span className="inline-flex h-10 items-center rounded-lg border border-dashed border-line px-4 font-mono text-xs text-muted">
              {access.note}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
