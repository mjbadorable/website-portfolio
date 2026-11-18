import { recentProjects, stack } from "@/data/showcase";
import { FeaturedProjects } from "./FeaturedProjects";
import { TechIcon } from "./TechIcon";

const META = "font-mono text-xs uppercase tracking-[0.14em]";

export function TechStackAndProjects() {
  return (
    <>
      <section
        id="tech-stack"
        aria-labelledby="stack-heading"
        className="py-12 lg:py-16"
      >
        <p className={`${META} text-muted`}>Tech stack</p>
        <h2
          id="stack-heading"
          className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl"
        >
          The stack, <span className="text-muted">front end to deployment.</span>
        </h2>

        <div className="mt-10 border-b border-line">
          {stack.categories.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-4 border-t border-line py-6 md:flex-row md:gap-10"
            >
              <div className="shrink-0 md:w-64">
                <h3 className="text-base font-medium text-fg">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {c.items.length} tools
                </p>
              </div>
              <ul aria-label={`${c.title} tools`} className="flex flex-wrap gap-2">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <TechIcon label={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProjects projects={recentProjects} />
    </>
  );
}
