"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import { profile } from "@/data/profile";
import { SpotlightCard } from "./SpotlightCard";

const MONO = "font-mono text-[11px] uppercase tracking-[0.2em]";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Box({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={item} className={className}>
      <SpotlightCard className="h-full p-6 sm:p-8">
        <h3 className={`${MONO} text-zinc-500`}>{label}</h3>
        <div className="mt-5">{children}</div>
      </SpotlightCard>
    </motion.div>
  );
}

const pill =
  "rounded-full border border-white/[0.1] bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-zinc-100";

export function About() {
  const { journey, credentials, ethos, arsenal, offDuty } = profile.about;

  return (
    <MotionConfig>
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-void p-6 text-zinc-100 sm:mt-10 sm:p-10 lg:p-14"
      >
        <p className={`${MONO} text-zinc-500`}>
          [02 / The builder · Story &amp; arsenal]
        </p>
        <h2
          id="about-heading"
          className="mt-4 max-w-[24ch] text-4xl font-medium leading-[1.06] tracking-[-0.04em] md:text-5xl"
        >
          Systems engineered to eliminate friction.{" "}
          <span className="text-zinc-500">Grounded in real operations.</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          className="mt-10 grid grid-cols-12 gap-4 lg:gap-6"
        >
          {/* 1: Journey */}
          <Box
            label="// 01 · Background & context"
            className="col-span-12 lg:col-span-7"
          >
            <p className="max-w-[60ch] text-lg leading-relaxed text-zinc-300">
              {journey}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {credentials.map((c) => (
                <li
                  key={c}
                  className={`${pill} px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400`}
                >
                  {c}
                </li>
              ))}
            </ul>
          </Box>

          {/* 2: Ethos */}
          <Box
            label="// 02 · Core philosophy"
            className="col-span-12 lg:col-span-5"
          >
            <blockquote>
              <p className="text-3xl font-medium leading-[1.15] tracking-[-0.035em] sm:text-4xl">
                {ethos.lines.map((line, i) => (
                  <span
                    key={line}
                    className={`block ${
                      i === ethos.lines.length - 1
                        ? "text-zinc-100"
                        : "text-zinc-500"
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </p>
            </blockquote>
            <p className="mt-6 text-sm leading-relaxed text-zinc-400">
              {ethos.note}
            </p>
          </Box>

          {/* 3: Daily drivers */}
          <Box
            label="// 03 · Core tech stack"
            className="col-span-12 lg:col-span-7"
          >
            <ul className="flex flex-wrap gap-2.5">
              {arsenal.map((tool) => (
                <li
                  key={tool}
                  className={`${pill} px-3.5 py-1.5 font-mono text-[13px] text-zinc-300`}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Box>

          {/* 4: Off-duty */}
          <Box
            label="// 04 · Behind the builder"
            className="col-span-12 lg:col-span-5"
          >
            <ul className="flex flex-wrap gap-2.5">
              {offDuty.map((tag) => (
                <li
                  key={tag}
                  className={`${pill} px-3.5 py-1.5 text-sm text-zinc-300`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Box>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
