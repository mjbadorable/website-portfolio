"use client";

import Image from "next/image";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { profile } from "@/data/profile";
import { SpotlightCard } from "./SpotlightCard";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute size-4 border-white/40 ${className}`}
    />
  );
}

export function Hero() {
  const { portrait } = profile;

  return (
    <MotionConfig>
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-void p-6 text-zinc-100 sm:p-10 lg:p-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_85%_0%,rgba(255,255,255,0.07),transparent_70%)]"
        />

        <div className="relative grid grid-cols-12 items-center gap-8 lg:gap-12">
          {/* Portrait (left on desktop, below the headline on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
            className="order-2 col-span-12 sm:col-span-8 lg:order-1 lg:col-span-5"
          >
            <SpotlightCard className="p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                {portrait ? (
                  <Image
                    src={portrait.src}
                    alt={portrait.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex size-full items-center justify-center font-mono text-7xl font-medium tracking-[-0.06em] text-zinc-700"
                  >
                    MJA
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_0_48px_rgba(0,0,0,0.55)]"
                />
                <Corner className="left-2.5 top-2.5 border-l border-t" />
                <Corner className="right-2.5 top-2.5 border-r border-t" />

                <p className="absolute bottom-3 left-3 right-3 flex w-fit max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-black/60 py-1.5 pl-3 pr-4 text-[12px] text-zinc-200 backdrop-blur">
                  <span className="relative flex size-2 shrink-0">
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping"
                    />
                    <span
                      aria-hidden="true"
                      className="relative inline-flex size-2 rounded-full bg-emerald-400"
                    />
                  </span>
                  <span className="truncate">
                    {profile.availability} · {profile.location}
                  </span>
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="order-1 col-span-12 lg:order-2 lg:col-span-7"
          >
            <motion.h1
              id="hero-heading"
              variants={rise}
              className="text-4xl font-medium leading-[1.06] tracking-[-0.04em] text-zinc-100 md:text-5xl lg:text-[3.5rem]"
            >
              {profile.identity}
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-[48ch] text-base leading-relaxed text-zinc-400 md:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex h-11 items-center gap-2 rounded-lg bg-zinc-100 px-5 text-sm font-medium text-zinc-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)] transition-colors hover:bg-white"
              >
                Let&apos;s Talk
                <span
                  aria-hidden="true"
                  className="transition-transform motion-safe:group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <a
                href={profile.cvPath}
                download
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/[0.14] bg-white/[0.03] px-5 text-sm font-medium text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-colors hover:border-white/30 hover:bg-white/[0.07]"
              >
                Download CV
                <span aria-hidden="true">↓</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
