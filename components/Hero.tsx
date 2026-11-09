"use client";

import { MotionConfig, motion } from "framer-motion";
import { profile } from "@/data/profile";

function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, 1)));
}

function Identity() {
  const { identity, identityEmphasis } = profile;
  const i = identity.indexOf(identityEmphasis);
  if (i === -1) return <>{identity}</>;
  return (
    <>
      {identity.slice(0, i)}
      <span className="text-primary">{identityEmphasis}</span>
      {identity.slice(i + identityEmphasis.length)}
    </>
  );
}

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col justify-center rounded-xl border border-line bg-card p-6 shadow-card sm:min-h-[calc(100svh-9rem)] sm:p-10 lg:p-14"
      >
        <div className="flex flex-col items-start gap-2">
          <p className="inline-flex items-start gap-2 rounded-2xl border border-accent/40 bg-accent-soft px-3 py-1.5 text-[13px] leading-snug text-ink">
            <span aria-hidden="true">⚡</span>
            <span>
              <span className="font-semibold">Currently:</span>{" "}
              {profile.focus.text}
            </span>
          </p>
          <span className="pl-1 font-mono text-xs text-muted">
            Updated {formatMonth(profile.focus.updatedAt)}
          </span>
        </div>

        <h1 className="mt-6 max-w-[22ch] text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight sm:mt-8">
          <Identity />
        </h1>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {profile.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm text-ink shadow-[0_1px_2px_rgb(15_23_42/0.05)]"
            >
              {chip}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a
            href={profile.cvPath}
            download
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-primary/30 bg-card px-6 text-base font-medium text-primary shadow-[0_1px_2px_rgb(15_23_42/0.06)] transition-colors hover:border-primary hover:bg-primary hover:text-white"
          >
            Download CV
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </motion.section>
    </MotionConfig>
  );
}
