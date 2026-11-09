"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";

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
      className="flex items-center justify-center text-primary/60 lg:px-1"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6 rotate-90 lg:rotate-0"
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
      className="mt-12 sm:mt-16"
    >
      <h2
        id="spine-heading"
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        <span aria-hidden="true" className="text-primary">
          02 /{" "}
        </span>
        The automation spine: how systems run
      </h2>

      <MotionConfig reducedMotion="user">
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          className="mt-5 grid list-none gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-0"
        >
          {STEPS.flatMap((step, i) => [
            ...(i > 0 ? [<Connector key={`c${i}`} />] : []),
            <motion.li
              key={step.num}
              variants={card}
              className="flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow-card"
            >
              <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas px-5 py-2.5">
                <span className="flex items-center gap-2 font-mono text-xs uppercase text-muted">
                  <span className="font-semibold text-primary">{step.num}</span>
                  <span aria-hidden="true">▸</span>
                  {step.name}
                </span>
                <span className="font-mono text-xs text-muted">{step.role}</span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                <h3 className="text-xl font-semibold leading-snug tracking-tight">
                  {step.tagline}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink/80">
                  {step.description}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-1">
                  {step.pills.map((p) => (
                    <li
                      key={p}
                      className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>,
          ])}
        </motion.ol>
      </MotionConfig>
    </section>
  );
}
