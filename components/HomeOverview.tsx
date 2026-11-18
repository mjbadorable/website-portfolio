import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Handshake,
  Layers,
  Mail,
} from "lucide-react";
import { brandIcons } from "@/data/techIcons";
import { education, experienceRoles } from "@/data/portfolioData";
import { profile } from "@/data/profile";
import { recentProjects } from "@/data/showcase";
import { TechIcon } from "./TechIcon";

const META = "font-mono text-xs uppercase tracking-[0.14em]";

const SURFACE =
  "lift rounded-xl border border-line bg-surface shadow-[inset_0_1px_0_0_var(--highlight)] hover:border-line-strong";

const iconBtn =
  "inline-flex size-10 items-center justify-center rounded-full border border-line bg-tint text-fg transition-colors hover:border-line-strong hover:bg-surface-hover";

const TOP_PROJECTS = ["collab-workspace", "mastersoft-grade-assistant"];
const CORE_TOOLS = [
  "TypeScript",
  "Python",
  "Next.js 16",
  "React 19",
  "Tailwind CSS v4",
  "Convex Real-Time",
  "Claude API",
  "MasterSoft ERP",
];

function ViewAll({ href, label = "View All" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 font-mono text-xs text-fg-2 transition-colors hover:text-fg"
    >
      {label}
      <ArrowRight
        aria-hidden="true"
        className="size-3.5 transition-transform motion-safe:group-hover:translate-x-0.5"
      />
    </Link>
  );
}

function CardHeader({
  Icon,
  title,
  href,
}: {
  Icon: typeof Briefcase;
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="inline-flex items-center gap-2.5 text-base font-medium text-fg">
        <span className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-tint">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        {title}
      </h3>
      {href && <ViewAll href={href} />}
    </div>
  );
}

function SocialMark({ name }: { name: "github" | "linkedin" }) {
  if (name === "github") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-[18px]"
        fill="currentColor"
      >
        <path d={brandIcons.github.path} />
      </svg>
    );
  }
  // No official mark is bundled for LinkedIn, so use a plain "in" monogram.
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]">
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="currentColor"
        fontFamily="var(--font-geist-sans), sans-serif"
      >
        in
      </text>
    </svg>
  );
}

export function HomeOverview() {
  const projects = TOP_PROJECTS.map((id) =>
    recentProjects.find((p) => p.id === id),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const role = experienceRoles[0];
  const github = profile.links.find((l) => l.label === "GitHub");
  const linkedin = profile.links.find((l) => l.label === "LinkedIn");

  return (
    <div className="space-y-12 pt-10 lg:space-y-16 lg:pt-14">
      {/* 1. Featured projects strip */}
      <section
        aria-labelledby="home-projects-heading"
        className="grid grid-cols-12 gap-x-0 gap-y-8 lg:gap-x-10"
      >
        <div className="col-span-12 lg:col-span-4">
          <p className={`${META} text-muted`}>/ Featured projects</p>
          <h2
            id="home-projects-heading"
            className="mt-4 text-3xl font-medium leading-[1.12] tracking-[-0.035em] md:text-4xl"
          >
            Projects that turn ideas into practical solutions.
          </h2>
          <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-fg-2">
            Web apps and systems built around real operational problems, from
            academic workflows to developer tooling.
          </p>
          <div className="mt-6">
            <ViewAll href="/projects" label="View All Projects" />
          </div>
        </div>

        <ul className="col-span-12 grid gap-4 md:grid-cols-2 lg:col-span-8">
          {projects.map((p) => (
            <li
              key={p.id}
              className={`${SURFACE} flex flex-col overflow-hidden`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-sunken">
                <Image
                  src={p.image}
                  alt={`${p.title} dashboard`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="min-h-[2.75rem] text-lg font-semibold leading-[1.2] tracking-[-0.025em] text-fg">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 min-h-[2.85rem] text-sm leading-relaxed text-fg-2">
                  {p.description}
                </p>
                <ul
                  aria-label="Technologies"
                  className="mt-4 flex min-h-[4.1rem] flex-wrap content-start gap-1.5"
                >
                  {p.tech.slice(0, 3).map((t) => (
                    <li
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-tint px-2.5 py-1 text-[13px] text-fg-2"
                    >
                      <TechIcon label={t} />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-2 transition-colors hover:text-fg"
                    >
                      View Project
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only">
                        {p.title} (opens in a new tab)
                      </span>
                    </a>
                  ) : (
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-2 transition-colors hover:text-fg"
                    >
                      View Project
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Experience | Education | Tech stack */}
      <section
        aria-label="Summary"
        className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3"
      >
        <article className={`${SURFACE} flex flex-col p-5 sm:p-6`}>
          <CardHeader Icon={Briefcase} title="Experience" href="/experience" />
          <div className="mt-5 flex flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-lg font-semibold leading-[1.2] tracking-[-0.025em] text-fg">
                {role.role}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-tint-2 px-2 py-0.5 font-mono text-xs text-fg">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-ok" />
                Current
              </span>
            </div>
            <p className="mt-1.5 text-sm font-medium text-fg-2">
              {role.organization} · {role.period}
            </p>
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-fg-2">
              {role.description}
            </p>
          </div>
        </article>

        <article className={`${SURFACE} flex flex-col p-5 sm:p-6`}>
          <CardHeader Icon={GraduationCap} title="Education" />
          <ul className="mt-5 flex-1 space-y-5">
            {education.map((e) => (
              <li key={e.degree}>
                <p className="text-base font-semibold leading-[1.25] tracking-[-0.02em] text-fg">
                  {e.degree.replace(/\s*\([^)]*\)\s*$/, "")}
                </p>
                <p className="mt-1 text-sm text-fg-2">
                  {e.institution} ·{" "}
                  {e.completed ? "Graduated June 2023" : "Ongoing"}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className={`${SURFACE} flex flex-col p-5 sm:p-6`}>
          <CardHeader
            Icon={Layers}
            title="Tech Stack"
            href="/projects#tech-stack"
          />
          <ul className="mt-5 grid flex-1 grid-cols-2 content-start gap-2">
            {CORE_TOOLS.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-tint px-2.5 py-2 text-[13px] text-fg-2"
              >
                <TechIcon label={t} />
                <span className="min-w-0">{t}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* 3. Closing banner */}
      <section
        aria-labelledby="home-cta-heading"
        className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 lg:px-8 lg:py-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_120%_at_0%_50%,var(--glow),transparent_70%)]"
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          <h2
            id="home-cta-heading"
            className="inline-flex shrink-0 items-center gap-3 text-xl font-medium tracking-[-0.03em] text-fg"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-tint">
              <Handshake aria-hidden="true" className="size-5" />
            </span>
            Let&apos;s work together.
          </h2>
          <p className="max-w-[52ch] flex-1 text-sm leading-relaxed text-fg-2">
            Open to opportunities in Software Development, Educational
            Technology, and AI Automation.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              href="/contact"
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent/90"
            >
              Get in Touch
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
              />
            </Link>
            <a href={`mailto:${profile.email}`} className={iconBtn}>
              <Mail aria-hidden="true" className="size-[18px]" />
              <span className="sr-only">Email</span>
            </a>
            {linkedin && (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className={iconBtn}
              >
                <SocialMark name="linkedin" />
                <span className="sr-only">LinkedIn (opens in a new tab)</span>
              </a>
            )}
            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className={iconBtn}
              >
                <SocialMark name="github" />
                <span className="sr-only">GitHub (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
