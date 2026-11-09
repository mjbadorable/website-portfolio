import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-void p-6 text-zinc-100 sm:mt-10 sm:p-10 lg:p-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_15%_0%,rgba(255,255,255,0.06),transparent_70%)]"
      />
      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          [04 / Production systems · Case studies]
        </p>
        <h2
          id="work-heading"
          className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl"
        >
          Business impact.{" "}
          <span className="text-zinc-500">Technical proof.</span>
        </h2>

        <div className="relative mt-10">
          {/* Exposed 12-column structural grid (desktop only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden grid-cols-12 border-r border-white/[0.07] lg:grid"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="border-l border-white/[0.07]" />
            ))}
          </div>
          <div className="relative flex flex-col gap-4 lg:gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
