"use client";

import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";

const PAYLOAD = `{
  "source": "contact_form",
  "name": "Sample Lead",
  "email": "lead@example.com",
  "message": "Need a quote for workflow automation."
}`;

const STAGES = [
  {
    num: "01",
    name: "Ingestion",
    result: "Payload validated",
    ms: 700,
  },
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
    <section
      id="sandbox"
      aria-labelledby="sandbox-heading"
      className="mt-12 sm:mt-16"
    >
      <h2
        id="sandbox-heading"
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        <span aria-hidden="true" className="text-primary">
          04 /{" "}
        </span>
        Interactive sandbox: simulated workflow
      </h2>

      <MotionConfig reducedMotion="user">
        <div className="mt-5 overflow-hidden rounded-xl border border-line bg-card shadow-card">
          <div className="flex items-center justify-between gap-4 border-b border-line bg-canvas px-5 py-2.5 sm:px-8">
            <span className="font-mono text-xs text-muted">
              ▸ sandbox / test-payload
            </span>
            <span className="font-mono text-xs text-muted">
              Simulated · no real data
            </span>
          </div>

          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-12 lg:gap-8">
            {/* Payload */}
            <div className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                Inbound payload
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-line bg-canvas p-4 font-mono text-[13px] leading-relaxed text-ink/80">
                {PAYLOAD}
              </pre>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={running}
                  onClick={() => setStep(1)}
                  className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-base font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {running ? "Running…" : step === 4 ? "Re-run" : "Run Test Payload"}
                </button>
                {step !== 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="inline-flex h-11 items-center rounded-lg border border-line bg-card px-5 text-base font-medium text-ink transition-colors hover:border-primary/40"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Pipeline */}
            <ol
              aria-live="polite"
              className="flex flex-col gap-3 lg:col-span-7"
            >
              {STAGES.map((stage, i) => {
                const n = i + 1;
                const state =
                  step > n ? "done" : step === n ? "active" : "pending";
                return (
                  <li
                    key={stage.num}
                    className={`flex gap-4 rounded-lg border p-4 transition-colors ${
                      state === "pending"
                        ? "border-line bg-card"
                        : "border-primary/30 bg-canvas"
                    }`}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                        state === "done"
                          ? "bg-primary text-white"
                          : state === "active"
                            ? "bg-primary/10 text-primary motion-safe:animate-pulse"
                            : "bg-canvas text-muted ring-1 ring-line"
                      }`}
                    >
                      {state === "done" ? "✓" : stage.num}
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-xs uppercase tracking-wider text-muted">
                        {stage.name}
                      </p>
                      <p className="mt-1 min-h-6 text-base font-medium leading-snug">
                        {state === "done" ? (
                          <motion.span
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="block"
                          >
                            {stage.result}
                          </motion.span>
                        ) : state === "active" ? (
                          <span className="text-muted">Processing…</span>
                        ) : (
                          <span className="text-muted/70">Waiting</span>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
