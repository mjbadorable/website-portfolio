import Image from "next/image";
import { education, experienceRoles } from "@/data/portfolioData";

const META = "font-mono text-xs uppercase tracking-[0.14em]";

const tag =
  "rounded border border-line bg-tint px-2 py-0.5 font-mono text-xs text-fg-2";

function Tags({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="mt-5 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className={tag}>
          {t}
        </li>
      ))}
    </ul>
  );
}

function SectionLabel({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2 id={id} className={`${META} whitespace-nowrap text-fg-2`}>
        {children}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-label="Experience and education"
      className="py-12 text-fg lg:py-16"
    >
      {/* Work experience: full-width vertical timeline */}
      <SectionLabel id="exp-work">[ Work experience // Career ]</SectionLabel>

      <ol className="relative mt-10 ml-1.5 space-y-14 border-l border-line pl-8 sm:pl-10">
        {experienceRoles.map((r) => (
          <li
            key={r.role}
            className="relative grid gap-x-10 gap-y-3 lg:grid-cols-[13rem_1fr]"
          >
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className="absolute -left-[37px] top-1.5 size-2.5 rounded-full bg-fg ring-4 ring-canvas sm:-left-[45px]"
            />

            <div>
              <p className={`${META} text-muted`}>{r.period}</p>
              <p className="mt-2 text-sm text-fg-2">{r.organization}</p>
            </div>

            <div>
              <h3 className="max-w-[28ch] text-2xl font-semibold leading-[1.12] tracking-[-0.03em] text-fg">
                {r.role}
              </h3>
              <p className="mt-3 max-w-[58ch] leading-relaxed text-fg-2">
                {r.description}
              </p>

              {r.contributions && (
                <ul
                  aria-label="Highlights"
                  className={`mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line ${
                    r.contributions.length >= 3
                      ? "md:grid-cols-3"
                      : "sm:grid-cols-2"
                  }`}
                >
                  {r.contributions.map((c) => (
                    <li key={c.title} className="bg-canvas p-4">
                      <p className="text-sm font-medium text-fg">{c.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {c.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <Tags items={r.tags} label="Skills" />
            </div>
          </li>
        ))}
      </ol>

      {/* Education: stacked beneath, same typographic system */}
      <div className="mt-20">
        <SectionLabel id="exp-education">
          [ Academic credentials // Education ]
        </SectionLabel>

        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {education.map((e) => (
            <li
              key={e.degree}
              className="lift flex flex-col justify-between rounded-xl border border-line bg-surface p-6 shadow-[inset_0_1px_0_0_var(--highlight)] hover:border-line-strong sm:p-7"
            >
              <div>
                {/* 1. Status */}
                <div className="flex min-h-7 flex-wrap items-center gap-2">
                  <p className={`${META} text-muted`}>{e.status}</p>
                  {e.mode && (
                    <span className="rounded border border-line bg-tint px-2 py-0.5 font-mono text-xs text-fg-2">
                      {e.mode}
                    </span>
                  )}
                </div>

                {/* 2. Degree + institution with crest */}
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.03em] text-fg">
                      {e.degree}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-fg-2">
                      {e.institution}
                    </p>
                  </div>
                  {e.logo && (
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-md border border-line bg-tint/60 p-1 shadow-[inset_0_1px_0_0_var(--highlight)]">
                      <Image
                        src={e.logo}
                        alt={`${e.institution} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                </div>

                {/* 3. Focus areas / specialization */}
                <div className="mt-5">
                  <p className={`${META} text-muted`}>
                    {e.focusAreas ? "Focus areas" : "Specialization"}
                  </p>
                  {e.focusAreas ? (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {e.focusAreas.map((f) => (
                        <li key={f} className={tag}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  ) : e.specialization ? (
                    <p className="mt-2 inline-flex rounded border border-line-strong bg-tint-2 px-2.5 py-1 font-mono text-xs text-fg shadow-[inset_0_1px_0_0_var(--highlight)]">
                      {e.specialization}
                    </p>
                  ) : null}
                </div>

                {/* 4. Thesis, or graduate coursework direction */}
                <div className="mt-4 rounded-md border border-line bg-tint/40 p-3.5">
                  <span className={`${META} block text-muted`}>
                    {e.thesis ? "Undergraduate Thesis" : "Graduate Studies"}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-fg-2">
                    {e.thesis ?? e.description}
                  </p>
                </div>
              </div>

              {/* 5. Honors (only where confirmed) */}
              {e.awards && (
                <div className="mt-5">
                  <p className={`${META} text-muted`}>
                    [ Honors &amp; Recognition ]
                  </p>
                  <ul aria-label="Awards" className="mt-2 flex flex-wrap gap-1.5">
                    {e.awards.map((a) => (
                      <li
                        key={a}
                        className="rounded border border-line-strong bg-tint-2 px-2.5 py-1 font-mono text-xs text-fg shadow-[inset_0_1px_0_0_var(--highlight)]"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
