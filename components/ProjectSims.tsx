// "Code-as-media": miniature simulated system UIs, one per case study.
// All values are illustrative and labelled as such in the window chrome.
// Emerald is reserved for live status, passed guardrails, and ROI figures.

const META = "font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500";

function Window({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-black/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.02] px-3.5 py-2">
          <span className={META}>{title}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Simulated UI
          </span>
        </div>
        <div className="p-3.5 font-mono text-xs">{children}</div>
      </div>
      <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
        Illustrative data, not production records
      </figcaption>
    </figure>
  );
}

function Dot({ live = false }: { live?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-1.5 rounded-full ${
        live
          ? "bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]"
          : "bg-zinc-500"
      }`}
    />
  );
}

const money = new Intl.NumberFormat("en-US");

/* 01: Convex ledger ribbon */
const LEDGER = [
  { line: "Operations", allocated: 1_250_000, spent: 842_300 },
  { line: "Training", allocated: 640_000, spent: 211_450 },
  { line: "Supplies", allocated: 380_000, spent: 366_900 },
];

function BudgetSim() {
  return (
    <Window title="ledger · live">
      <div className="mb-3 flex items-center justify-between rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 text-zinc-300">
        <span className="flex items-center gap-2">
          <Dot live /> Convex Sync: 18ms
        </span>
        <span className="text-zinc-500">3 lines</span>
      </div>
      <ul className="space-y-2.5">
        {LEDGER.map((row) => {
          const pct = Math.round((row.spent / row.allocated) * 100);
          return (
            <li key={row.line}>
              <div className="flex items-center justify-between gap-2 text-zinc-300">
                <span>{row.line}</span>
                <span className="flex gap-1.5">
                  <span className="rounded border border-white/[0.1] bg-white/[0.03] px-1.5 py-0.5 text-zinc-400">
                    PHP {money.format(row.allocated)}
                  </span>
                  <span className="rounded border border-white/[0.1] bg-white/[0.03] px-1.5 py-0.5 text-zinc-100">
                    −{money.format(row.spent)}
                  </span>
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div
                  className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]"
                  role="img"
                  aria-label={`${pct}% spent`}
                >
                  <div
                    className="h-full rounded-full bg-zinc-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-9 text-right text-zinc-500">{pct}%</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Window>
  );
}

/* 02: Mastersoft grade row preview */
const GRADES = [
  { id: "ID-0412", cs: 88, we: 79 },
  { id: "ID-0413", cs: 92, we: 85 },
  { id: "ID-0414", cs: 81, we: 74 },
];

function GradeSim() {
  return (
    <Window title="grade-sheet · section A">
      <div className="mb-2.5 flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 text-zinc-300">
        <span className="text-zinc-500">ƒx</span>
        <span>=ROUND(0.6*CS + 0.4*WE)</span>
      </div>
      <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto] divide-y divide-white/[0.06] text-zinc-300">
        <div className={`${META} contents`}>
          <span className="pb-1.5">Student</span>
          <span className="pb-1.5 text-right">CS</span>
          <span className="pb-1.5 text-right">WE</span>
          <span className="pb-1.5 text-right">Final</span>
          <span className="pb-1.5" />
        </div>
        {GRADES.map((g) => {
          const final = Math.round(0.6 * g.cs + 0.4 * g.we);
          return (
            <div key={g.id} className="contents">
              <span className="py-1.5 text-zinc-400">{g.id}</span>
              <span className="py-1.5 text-right tabular-nums">{g.cs}</span>
              <span className="py-1.5 text-right tabular-nums">{g.we}</span>
              <span className="py-1.5 text-right tabular-nums text-zinc-100">
                <span className="rounded border border-white/[0.14] bg-white/[0.05] px-1.5 py-0.5">
                  {final}
                </span>
              </span>
              <span className="py-1.5 pl-2 text-right">
                <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-400">
                  PASS
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </Window>
  );
}

/* 04: cosine similarity bar + verified citation */
function RagSim() {
  const score = 0.91;
  const threshold = 0.75;
  return (
    <Window title="retrieval · top match">
      <p className="text-zinc-300">
        <span className="text-zinc-500">query </span>
        &quot;How do I file a leave request?&quot;
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-zinc-400">
          <span>cosine similarity</span>
          <span className="tabular-nums text-zinc-100">{score.toFixed(2)}</span>
        </div>
        <div
          className="relative mt-2 h-1.5 rounded-full bg-white/[0.08]"
          role="img"
          aria-label={`Similarity ${score}, threshold ${threshold}`}
        >
          <div
            className="h-full rounded-full bg-zinc-200"
            style={{ width: `${score * 100}%` }}
          />
          <div
            className="absolute -top-1 h-3.5 w-px bg-zinc-500"
            style={{ left: `${threshold * 100}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-zinc-600">
          <span>0</span>
          <span style={{ marginLeft: `${threshold * 100 - 12}%` }}>
            threshold {threshold.toFixed(2)}
          </span>
          <span>1</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-400">
          ✓ Above threshold
        </span>
        <span className="inline-flex items-center gap-1.5 rounded border border-white/[0.14] bg-white/[0.04] px-2 py-1 text-zinc-300">
          [1] hr-handbook.pdf · p.12
        </span>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
        Below threshold → &quot;I don&apos;t know&quot;, no generated answer.
      </p>
    </Window>
  );
}

// Keyed by project slug in data/projects.ts.
export const PROJECT_SIMS: Record<string, React.ComponentType> = {
  "budget-expense-monitoring": BudgetSim,
  "mastersoft-grade-assistant": GradeSim,
  "rag-knowledge-assistant": RagSim,
};
