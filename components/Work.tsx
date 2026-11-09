import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="mt-12 sm:mt-16">
      <h2
        id="work-heading"
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        <span aria-hidden="true" className="text-primary">
          03 /{" "}
        </span>
        Production systems &amp; case studies
      </h2>
      <div className="mt-5 flex flex-col gap-6">
        {projects.map((project, i) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
