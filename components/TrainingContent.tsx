"use client";

import Image from "next/image";
import type { TrainingArea, TrainingEvent } from "@/data/portfolioData";

const META = "font-mono text-xs uppercase tracking-[0.14em]";

const chip =
  "rounded border border-line bg-tint px-2.5 py-1 font-mono text-xs text-fg-2 shadow-[inset_0_1px_0_0_var(--highlight)]";

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-sm leading-relaxed text-fg-2">
      <span aria-hidden="true" className="text-muted">
        ▸
      </span>
      {children}
    </li>
  );
}

function AreaCard({ area }: { area: TrainingArea }) {
  return (
    <li className="lift flex flex-col rounded-xl border border-line bg-surface p-6 shadow-[inset_0_1px_0_0_var(--highlight)] hover:border-line-strong sm:p-7">
      <h4 className="text-xl font-semibold leading-[1.15] tracking-[-0.03em] text-fg">
        {area.title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-fg-2">
        {area.description}
      </p>

      <dl className="mt-5 space-y-2.5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <dt className={`${META} w-20 shrink-0 text-muted`}>Audience</dt>
          <dd className="text-sm text-fg-2">{area.audience}</dd>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <dt className={`${META} w-20 shrink-0 text-muted`}>
            {area.platformLabel}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {area.platforms.map((p) => (
                <li key={p} className={chip}>
                  {p}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <div aria-hidden="true" className="my-5 border-t border-line" />

      <ul className="space-y-1.5">
        {area.topics.map((t) => (
          <Bullet key={t}>{t}</Bullet>
        ))}
      </ul>
    </li>
  );
}

function Highlight({ e }: { e: TrainingEvent }) {
  return (
    <li className="lift overflow-hidden rounded-xl border border-line-strong bg-tint-2 p-6 shadow-[inset_0_1px_0_0_var(--highlight)] sm:p-7">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
        <div className={e.image ? "lg:col-span-7" : "lg:col-span-12"}>
          <div className="flex flex-wrap items-center gap-2">
            {e.format && (
              <span className="inline-flex items-center rounded border border-line bg-tint px-2.5 py-1 font-mono text-xs text-fg">
                {e.format}
              </span>
            )}
            {e.year && <span className={`${META} text-muted`}>{e.year}</span>}
          </div>

          <h4 className="mt-4 max-w-[34ch] text-2xl font-semibold leading-[1.12] tracking-[-0.03em] text-fg">
            {e.title}
          </h4>

          <dl className="mt-4 space-y-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <dt className={`${META} w-20 shrink-0 text-muted`}>Audience</dt>
              <dd className="text-sm text-fg-2">{e.audience}</dd>
            </div>
            {e.platforms && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <dt className={`${META} w-20 shrink-0 text-muted`}>Platforms</dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {e.platforms.map((p) => (
                      <li key={p} className={chip}>
                        {p}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>

          <p className="mt-5 max-w-[62ch] border-t border-line pt-4 text-sm leading-relaxed text-fg-2">
            {e.description}
          </p>
        </div>

        {e.image && (
          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-lg border border-line bg-surface shadow-[inset_0_1px_0_0_var(--highlight)]">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={e.image.src}
                  alt={e.image.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              {e.image.caption && (
                <figcaption className="border-t border-line bg-tint/50 px-3.5 py-2 font-mono text-[11px] text-muted">
                  {e.image.caption}
                </figcaption>
              )}
            </figure>
          </div>
        )}
      </div>
    </li>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h3 className={`${META} text-fg-2`}>{children}</h3>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}

export function TrainingContent({
  events,
  areas,
}: {
  events: TrainingEvent[];
  areas: TrainingArea[];
}) {
  return (
    <div className="mt-12 space-y-14">
      <div>
        <SectionLabel>Recurring support areas</SectionLabel>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
          {areas.map((a) => (
            <AreaCard key={a.title} area={a} />
          ))}
        </ul>
      </div>

      <div>
        <SectionLabel>Confirmed deliverable</SectionLabel>
        <ul className="mt-6 space-y-4">
          {events.map((e) => (
            <Highlight key={e.title} e={e} />
          ))}
        </ul>
      </div>
    </div>
  );
}
