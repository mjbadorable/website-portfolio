"use client";

import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { SpotlightCard } from "./SpotlightCard";

const MONO = "font-mono text-[11px] uppercase tracking-[0.2em]";

const PAYLOAD: [key: string, value: string][] = [
  ["source", "contact_form"],
  ["name", "Sample Lead"],
  ["email", "lead@example.com"],
  ["message", "Need a quote for workflow automation."],
];

const STAGES = [
  { num: "01", name: "Ingestion", result: "Payload validated", ms: 700 },
  {
    num: "02",
    name: "Guardrail",
    result: "Confidence 98.6% · Draft held for Human-in-the-Loop review",
    ms: 1000,
  },
  {
    num: "03",
    name: "Execution",
    result: "Synced to Convex / CRM · Done in 1.2s",
    ms: 800,
  },
] as const;

const button =
  "inline-flex h-11 items-center rounded-lg border px-5 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-colors";

// step: 0 = idle, 1..3 = that stage is running, 4 = finished
export function WorkflowSimulator() {
  const [step, setStep] = useState(0);
  const running = step >= 1 && step <= 3;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setStep((s) => s + 1), STAGES[step - 1].ms);
    return () => clearTimeout(t);
  }, [step, running]);

  return (
    <MotionConfig>
      <section
        id="sandbox"
        aria-labelledby="sandbox-heading"
        className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-void p-6 text-zinc-100 sm:mt-10 sm:p-10 lg:p-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_85%_0%,rgba(255,255,255,0.06),transparent_70%)]"
        />
        <div className="relative">
          <p className={`${MONO} text-zinc-500`}>
            [05 / Interactive sandbox · Simulated workflow]
          </p>
          <h2
            id="sandbox-heading"
            className="mt-4 max-w-[24ch] text-4xl font-medium leading-[1.06] tracking-[-0.04em] md:text-5xl"
          >
            Test the pipeline live.{" "}
            <span className="text-zinc-500">
              Deterministic execution in seconds.
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-12 gap-4 lg:gap-6">
            {/* Payload terminal */}
            <div className="col-span-12 lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-black/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.02] px-4 py-2.5">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-white/10" />
                    <span className="size-2.5 rounded-full bg-white/10" />
                    <span className="size-2.5 rounded-full bg-white/10" />
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">
                    payload.json · simulated, no real data
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
                  <code>
                    <span className="text-zinc-500">{"{"}</span>
                    {PAYLOAD.map(([key, value], i) => (
                      <span key={key} className="block pl-4">
                        <span className="text-zinc-400">{`"${key}"`}</span>
                        <span className="text-zinc-500">: </span>
                        <span className="text-emerald-300">{`"${value}"`}</span>
                        <span className="text-zinc-500">
                          {i < PAYLOAD.length - 1 ? "," : ""}
                        </span>
                      </span>
                    ))}
                    <span className="text-zinc-500">{"}"}</span>
                  </code>
                </pre>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={running}
                  onClick={() => setStep(1)}
                  className={`${button} ${
                    running
                      ? "cursor-not-allowed border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[inset_0_1px_0_0_rgba(110,231,183,0.2),0_0_16px_-4px_rgba(52,211,153,0.5)]"
                      : "border-white/[0.14] bg-white/[0.03] text-zinc-100 hover:border-emerald-400/40 hover:bg-white/[0.07]"
                  }`}
                >
                  {running
                    ? "Running…"
                    : step === 4
                      ? "Re-run"
                      : "Run Test Payload"}
                </button>
                {step !== 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className={`${button} border-white/[0.14] bg-white/[0.03] text-zinc-300 hover:border-white/30 hover:bg-white/[0.07]`}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Stage execution */}
            <ol
              aria-live="polite"
              className="col-span-12 flex flex-col gap-3 lg:col-span-7"
            >
              {STAGES.map((stage, i) => {
                const n = i + 1;
                const state =
                  step > n ? "done" : step === n ? "active" : "pending";
                return (
                  <li key={stage.num}>
                    <SpotlightCard
                      className="p-4"
                      innerClassName="flex items-start gap-4"
                    >
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold ${
                          state === "done"
                            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                            : state === "active"
                              ? "border-white/30 bg-white/10 text-zinc-100"
                              : "border-white/[0.08] text-zinc-600"
                        }`}
                      >
                        {state === "done" ? "✓" : stage.num}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`${MONO} ${
                            state === "pending"
                              ? "text-zinc-600"
                              : "text-zinc-400"
                          }`}
                        >
                          {stage.name}
                        </p>
                        <p className="mt-1.5 min-h-6 text-base leading-snug">
                          {state === "done" ? (
                            <motion.span
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="block font-medium text-zinc-100"
                            >
                              {stage.result}
                            </motion.span>
                          ) : state === "active" ? (
                            <span className="inline-flex items-center gap-2 text-zinc-300">
                              <span
                                aria-hidden="true"
                                className="size-1.5 rounded-full bg-zinc-100 motion-safe:animate-pulse"
                              />
                              Processing…
                            </span>
                          ) : (
                            <span className="text-zinc-600">Waiting</span>
                          )}
                        </p>
                      </div>
                    </SpotlightCard>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
