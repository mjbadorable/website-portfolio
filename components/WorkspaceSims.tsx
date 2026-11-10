"use client";

// Interactive mini UIs rendered inside the project workspace viewport.
// Every value is illustrative; the workspace labels them as simulated.
// Palette: monochrome zinc, with emerald only for live status and passed checks.

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import type { WorkspaceProjectId } from "@/data/portfolioData";
import { useThemeMotion } from "./ThemeAndMotionProvider";

const META = "font-mono text-xs uppercase tracking-[0.14em] text-muted";

const primary =
  "inline-flex h-9 items-center gap-1.5 rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50";
const ghost =
  "inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-tint px-4 text-[13px] font-medium text-fg shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong hover:bg-surface-hover";
const chip =
  "rounded border border-line bg-tint px-2 py-0.5 font-mono text-xs text-fg-2";
const pass =
  "inline-flex items-center gap-1.5 rounded border border-ok/30 bg-ok/10 px-2 py-1 font-mono text-xs text-ok";
const neutral =
  "inline-flex items-center gap-1.5 rounded border border-line bg-tint-2 px-2 py-1 font-mono text-xs text-fg-2";

const money = new Intl.NumberFormat("en-US");

function LiveDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-1.5 rounded-full bg-ok shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]"
    />
  );
}

/* 01: Convex budget ledger */
const NAMES = ["Operations", "Training", "Supplies"];
const ALLOCATED = [1_250_000, 640_000, 380_000];
const START = [842_300, 211_450, 366_900];

function BudgetSim() {
  const [spent, setSpent] = useState(START);
  const [synced, setSynced] = useState(false);
  const { motionEnabled } = useThemeMotion();
  // Simulated latency drifting between 16 and 19 ms so the room feels alive.
  const [latency, setLatency] = useState(18);

  useEffect(() => {
    if (!motionEnabled) return;
    const id = setInterval(() => setLatency(16 + Math.floor(Math.random() * 4)), 1300);
    return () => clearInterval(id);
  }, [motionEnabled]);

  useEffect(() => {
    if (!synced) return;
    const t = setTimeout(() => setSynced(false), 1600);
    return () => clearTimeout(t);
  }, [synced]);

  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between rounded-md border border-line bg-tint px-3 py-2 text-fg-2">
        <span className="flex items-center gap-2">
          <LiveDot /> Convex Sync:{" "}
          <span className="tabular-nums">{motionEnabled ? latency : 18}ms</span>
        </span>
        <span aria-live="polite" className="text-ok">
          {synced ? "ledger.update ✓ synced" : ""}
        </span>
      </div>

      <ul className="mt-4 space-y-3.5">
        {NAMES.map((name, i) => {
          const remaining = ALLOCATED[i] - spent[i];
          const pct = Math.min(100, Math.round((spent[i] / ALLOCATED[i]) * 100));
          return (
            <li key={name}>
              <div className="flex flex-wrap items-center justify-between gap-2 text-fg-2">
                <span className="text-sm">{name}</span>
                <span className="flex gap-1.5">
                  <span className={chip}>PHP {money.format(ALLOCATED[i])}</span>
                  <span className={`${chip} text-fg`}>
                    left {money.format(remaining)}
                  </span>
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div
                  role="img"
                  aria-label={`${pct}% spent`}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-line"
                >
                  <div
                    className="h-full rounded-full bg-fg transition-[width] duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-9 text-right text-muted">{pct}%</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className={primary}
          onClick={() => {
            setSpent((s) => [s[0] + 5_000, s[1], s[2]]);
            setSynced(true);
          }}
        >
          Log PHP 5,000 expense
        </button>
        <button type="button" className={ghost} onClick={() => setSpent(START)}>
          Reset
        </button>
      </div>
    </div>
  );
}

const THRESHOLD = 0.85;
const QUERIES = [
  { q: "How do I file a leave request?", score: 0.91, source: "hr-handbook.pdf · p.12" },
  { q: "What is on the cafeteria menu today?", score: 0.41, source: null },
];

function RagSim() {
  const [sel, setSel] = useState(0);
  const { score, source } = QUERIES[sel];
  const ok = score >= THRESHOLD;

  return (
    <div className="font-mono text-xs">
      <p className={META}>try a query</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {QUERIES.map((item, i) => (
          <button
            key={item.q}
            type="button"
            aria-pressed={sel === i}
            onClick={() => setSel(i)}
            className={`rounded-md border px-3 py-1.5 text-left transition-colors ${
              sel === i
                ? "border-line-strong bg-accent text-accent-fg"
                : "border-line bg-tint text-fg-2 hover:border-line-strong"
            }`}
          >
            {item.q}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-fg-2">
          <span>cosine similarity</span>
          <span className="tabular-nums text-fg">{score.toFixed(2)}</span>
        </div>
        <div
          role="img"
          aria-label={`Similarity ${score}, threshold ${THRESHOLD}`}
          className="relative mt-2 h-1.5 rounded-full bg-line"
        >
          <div
            className="h-full rounded-full bg-fg transition-[width] duration-500"
            style={{ width: `${score * 100}%` }}
          />
          <div
            className="absolute -top-1 h-3.5 w-px bg-fg-2"
            style={{ left: `${THRESHOLD * 100}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-muted">
          threshold {THRESHOLD.toFixed(2)}
        </p>
      </div>

      <div aria-live="polite" className="mt-4 rounded-md border border-line bg-sunken p-3.5">
        {ok ? (
          <>
            <div className="flex flex-wrap gap-2">
              <span className={pass}>
                <Check aria-hidden="true" className="size-3.5" /> Above threshold
              </span>
              <span className={neutral}>[1] {source}</span>
            </div>
            <p className="mt-2.5 leading-relaxed text-fg-2">
              Answer generated only from the retrieved passage, with its source cited.
            </p>
          </>
        ) : (
          <>
            <span className={neutral}>Below threshold</span>
            <p className="mt-2.5 text-sm text-fg">&ldquo;I don&apos;t know.&rdquo;</p>
            <p className="mt-1 leading-relaxed text-muted">
              Deterministic fallback. No answer is generated.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export const WORKSPACE_SIMS: Record<WorkspaceProjectId, React.ComponentType> = {
  "convex-budget-os": BudgetSim,
  "verified-rag": RagSim,
};
