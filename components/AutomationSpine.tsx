"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import { SpotlightCard } from "./SpotlightCard";

const MONO = "font-mono text-[11px] uppercase tracking-[0.2em]";

const STEPS = [
  {
    num: "01",
    name: "Capture",
    role: "Trigger",
    tagline: "Ingestion & Schema Parsing",
    description:
      "Consumes webhooks, multi-tab Excel workbooks, email triggers, and form payloads with strict type validation.",
    pills: ["Webhooks", "Excel / CSV", "Auth Webhooks"],
  },
  {
    num: "02",
    name: "Guardrail",
    role: "AI & Validation",
    tagline: "Hallucination Fences & HITL Review",
    description:
      "Claude API parses intent, enforces structured JSON output, checks confidence thresholds, and holds drafts for human sign-off.",
    pills: ["JSON Schema Guard", "Human-in-the-Loop", "Confidence Fences"],
  },
  {
    num: "03",
    name: "Execute",
    role: "Deterministic Action",
    tagline: "Real-Time State & CRM Commit",
    description:
      "Commits to Convex / Cloud Sync, triggers transactional CRM updates, updates live UI reactive grids, and fires audit logs.",
    pills: ["Convex Cloud Sync", "CRM Routing", "Audit Trail"],
  },
] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const card: Variants = {
  hidden: { opacity: 0.25, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Connector() {
  return (
    <div
      aria-hidden="true"
      className="group/c flex items-center justify-center text-zinc-500 lg:px-2"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6 rotate-90 transition-[color,filter] duration-300 group-hover/c:text-zinc-100 group-hover/c:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] lg:rotate-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </div>
  );
}

export function AutomationSpine() {
  return (
    <section
      id="spine"
      aria-labelledby="spine-heading"
      className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-void p-6 text-zinc-100 sm:mt-10 sm:p-10 lg:p-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"
      />

      <div className="relative">
        <p className={`${MONO} text-zinc-500`}>
          [03 / The automation spine · How systems run]
        </p>
        <h2
          id="spine-heading"
          className="mt-4 text-4xl font-medium leading-[1.06] tracking-[-0.04em] md:text-5xl"
        >
          Capture.{" "}
          <span className="text-zinc-500">Guardrail.</span> Execute.
        </h2>

        <MotionConfig>
          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            className="mt-10 grid list-none gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-0"
          >
            {STEPS.flatMap((step, i) => [
              ...(i > 0 ? [<Connector key={`c${i}`} />] : []),
              <motion.li key={step.num} variants={card} className="flex">
                <SpotlightCard
                  className="w-full overflow-hidden"
                  innerClassName="flex flex-col"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.02] px-5 py-2.5">
                    <span
                      className={`${MONO} flex items-center gap-2 text-zinc-400`}
                    >
                      <span className="font-semibold text-zinc-100">
                        {step.num}
                      </span>
                      <span aria-hidden="true">▸</span>
                      {step.name}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500">
                      {step.role}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                    <h3 className="text-xl font-medium leading-snug tracking-[-0.02em] text-zinc-100">
                      {step.tagline}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-1">
                      {step.pills.map((p) => (
                        <li
                          key={p}
                          className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </motion.li>,
            ])}
          </motion.ol>
        </MotionConfig>
      </div>
    </section>
  );
}
