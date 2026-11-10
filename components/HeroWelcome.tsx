"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { track } from "@vercel/analytics";
import { MotionConfig, motion, useReducedMotion, type Variants } from "framer-motion";
import { profile } from "@/data/portfolioData";
import { profile as contact } from "@/data/profile";
import { PressA, PressLink } from "./Pressable";
import { useThemeMotion } from "./ThemeAndMotionProvider";

const META = "font-mono text-xs uppercase tracking-[0.14em]";

const EASE = [0.16, 1, 0.3, 1] as const;

// Left copy slides in from the left, children follow on an 80ms stagger.
const stagger: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.08 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const heading: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Word-by-word reveal. Words stay separated by real spaces so lines still wrap.
function Words({ text }: { text: string }) {
  const parts = text.split(" ");
  return (
    <>
      {parts.map((w, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
          {i < parts.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

const FOCUS = ["Software Development", "Educational Technology", "AI & Automation"];

// Fine stipple (halftone dots in the canvas colour) plus film grain, drawn over
// the portrait for a tactile, bitmap feel. Colours come from theme tokens.
const STIPPLE =
  "radial-gradient(circle at center, var(--bg-canvas) 0.7px, transparent 0.95px)";
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1.1 -0.1'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
// Fades the perimeter into the page canvas so the photo has no hard frame.
const EDGE_MASK =
  "radial-gradient(ellipse 64% 66% at 50% 42%, #000 30%, transparent 98%)";

function SocialLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const Tag = external ? "a" : Link;
  return (
    <Tag
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-1 text-sm text-fg-2 underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
      />
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </Tag>
  );
}

export function HeroWelcome() {
  const { motionEnabled } = useThemeMotion();
  // Cinematic reveal only when motion is on; otherwise everything renders instantly.
  const reduced = useReducedMotion();
  const reveal = motionEnabled && !reduced;

  return (
    <MotionConfig>
      <section
        id="top"
        aria-labelledby="hero-heading"
        className="relative overflow-hidden rounded-2xl border border-line bg-canvas text-fg"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,var(--glow),transparent_70%)]"
        />

        {/* Status bar */}
        <div className="relative flex flex-wrap items-center justify-end gap-x-6 gap-y-2 border-b border-line px-6 py-3 sm:px-10 lg:px-14">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-ok"
            />
            {profile.availability}
          </span>
        </div>

        <div className="relative grid grid-cols-12 items-center gap-x-0 gap-y-8 p-6 sm:p-10 lg:gap-12 lg:p-14">
          {/* Intro */}
          <motion.div
            variants={stagger}
            initial={reveal ? "hidden" : false}
            animate="show"
            className="hero-reveal col-span-12 lg:col-span-7"
          >
            <motion.p variants={rise} className={`${META} text-muted`}>
              {profile.name}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={heading}
              aria-label="Computer Engineer building software, educational technology, and intelligent workflows."
              className="mt-4 max-w-[26ch] text-balance text-3xl font-medium leading-[1.12] tracking-[-0.035em] text-fg sm:text-4xl lg:text-[2.65rem]"
            >
              <span aria-hidden="true">
                <Words text="Computer Engineer building software," />{" "}
                <span className="text-muted">
                  <Words text="educational technology, and intelligent workflows." />
                </span>
              </span>
            </motion.h1>

            <motion.div
              variants={rise}
              className="mt-7 max-w-[54ch] space-y-4 text-base leading-[1.9] text-fg-2 md:text-lg"
            >
              <p>
                Computer Engineer based in Iloilo, Philippines. I build
                production web applications, streamline institutional
                workflows, and develop practical AI tools.
              </p>
            </motion.div>

            <motion.ul
              variants={rise}
              aria-label="Focus areas"
              className="mt-6 flex flex-wrap gap-2"
            >
              {FOCUS.map((f) => (
                <li
                  key={f}
                  className="rounded border border-line bg-tint px-2.5 py-1 font-mono text-xs text-fg-2"
                >
                  [ {f} ]
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <PressLink
                href="/projects"
                onClick={() => track("explore_projects", { location: "hero" })}
                className="group inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent/90"
              >
                Explore Projects
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
                />
              </PressLink>
              <PressA
                href={profile.cv}
                download
                onClick={() => track("download_cv", { location: "hero" })}
                className="inline-flex h-11 items-center gap-2 rounded-md border border-line bg-tint px-5 text-sm font-medium text-fg shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong hover:bg-surface-hover"
              >
                Download CV
                <Download aria-hidden="true" className="size-4" />
              </PressA>
            </motion.div>

            <motion.ul
              variants={rise}
              aria-label="More links"
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {contact.links.map((l) => (
                <li key={l.label}>
                  <SocialLink href={l.href} external>
                    {l.label}
                  </SocialLink>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Portrait: no card or crosshairs; edges fade into the canvas */}
          <motion.div
            initial={reveal ? { clipPath: "inset(0 0 0 100%)" } : false}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="hero-reveal col-span-12 sm:col-span-8 lg:col-span-5"
          >
            <motion.div
              animate={motionEnabled ? { y: [0, -4, 0] } : { y: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/5] w-full"
              style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
            >
              <motion.div
                className="hero-reveal absolute inset-0"
                initial={reveal ? { scale: 1.3 } : false}
                animate={{ scale: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover object-top"
                />
              </motion.div>
              {/* Stipple + grain */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.3]"
                style={{ backgroundImage: STIPPLE, backgroundSize: "3px 3px" }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
                style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
