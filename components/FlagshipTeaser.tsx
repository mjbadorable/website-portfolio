import { ArrowRight, ArrowUpRight } from "lucide-react";
import { collabWorkspace as cw } from "@/data/showcase";
import { HealthPing } from "./Health";
import { PressA, PressLink } from "./Pressable";

const META = "font-mono text-xs uppercase tracking-[0.14em]";

// Home-page teaser for the flagship build; the full shell lives on /projects.
export function FlagshipTeaser() {
  return (
    <section
      aria-labelledby="teaser-heading"
      className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-canvas p-6 text-fg sm:mt-10 sm:p-10 lg:p-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_15%_0%,var(--glow),transparent_70%)]"
      />
      <div className="relative grid grid-cols-12 items-end gap-x-0 gap-y-8 lg:gap-12">
        <div className="col-span-12 lg:col-span-7">
          <p className={`${META} text-muted`}>{cw.label}</p>
          <h2
            id="teaser-heading"
            className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl"
          >
            Collab Workspace.{" "}
            <span className="text-muted">One portal for every project.</span>
          </h2>
          <p className="mt-5 max-w-[56ch] leading-relaxed text-fg-2">
            {cw.subtitle}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="lift rounded-lg border border-line bg-surface p-5 shadow-[inset_0_1px_0_0_var(--highlight)] hover:border-line-strong">
            <div className="flex items-center justify-between gap-3">
              <span className={`${META} text-muted`}>collabworkspace.dev</span>
              <HealthPing url={cw.probeUrl} />
            </div>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {cw.hood.map((t) => (
                <li
                  key={t}
                  className="rounded border border-line px-2 py-0.5 font-mono text-xs text-fg-2"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <PressLink
                href="/projects"
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg transition-colors hover:bg-accent/90"
              >
                See the build
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </PressLink>
              <PressA
                href={cw.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-tint px-3.5 text-[13px] font-medium text-fg shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong"
              >
                Open Collab Workspace
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </PressA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
