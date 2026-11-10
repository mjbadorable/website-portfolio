import { education, experienceRoles } from "@/data/portfolioData";

const META = "font-mono text-[11px] uppercase tracking-[0.18em]";

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

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {education.map((e) => (
            <li
              key={e.degree}
              className="lift flex flex-col rounded-xl border border-line bg-surface p-6 shadow-[inset_0_1px_0_0_var(--highlight)] hover:border-line-strong sm:p-7"
            >
              <p className={`${META} text-muted`}>
                {e.status}
                {e.mode ? ` · ${e.mode}` : ""}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-[1.15] tracking-[-0.03em] text-fg">
                {e.degree}
              </h3>
              <p className="mt-2 text-sm text-fg-2">{e.institution}</p>

              {e.specialization && (
                <p className="mt-4 text-sm font-medium text-fg">
                  {e.specialization}
                </p>
              )}
              {e.thesis && (
                <p className="mt-3 text-sm leading-relaxed text-fg-2">
                  <span className={`${META} block text-muted`}>Thesis</span>
                  <span className="mt-1 block">{e.thesis}</span>
                </p>
              )}
              {e.awards && (
                <ul aria-label="Awards" className="mt-4 flex flex-wrap gap-1.5">
                  {e.awards.map((a) => (
                    <li
                      key={a}
                      className="rounded border border-line-strong bg-tint-2 px-2 py-0.5 font-mono text-xs text-fg"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              )}

              {e.focusAreas ? (
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  <span className="text-fg-2">Focus: </span>
                  {e.focusAreas.join(", ")}.
                </p>
              ) : (
                <div className="mt-auto">
                  <Tags items={e.tags} label="Tags" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
