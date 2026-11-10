"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { collabWorkspace as cw } from "@/data/showcase";
import { HealthBadge, useHealth } from "./Health";
import { PressA, SPRING } from "./Pressable";
import { useThemeMotion } from "./ThemeAndMotionProvider";

const META = "font-mono text-[11px] uppercase tracking-[0.18em]";

// Decorative address-bar text. The reachability ping targets the real site root.
const ADDRESS = "collabworkspace.dev/control-plane";

export function ProjectWorkspace() {
  const health = useHealth(cw.probeUrl);
  const { motionEnabled } = useThemeMotion();
  const [sel, setSel] = useState(0);
  const project = cw.registered[sel];
  const [samples, setSamples] = useState(project.samples);

  // Reset the monitor when switching systems (derived-state reset, no effect).
  const [seen, setSeen] = useState(sel);
  if (seen !== sel) {
    setSeen(sel);
    setSamples(project.samples);
  }

  useEffect(() => {
    if (!motionEnabled) return;
    const id = setInterval(() => {
      setSamples((s) => [...s.slice(1), 55 + Math.floor(Math.random() * 40)]);
    }, 1400);
    return () => clearInterval(id);
  }, [motionEnabled]);

  function onTabKeyDown(e: React.KeyboardEvent, i: number) {
    const last = cw.registered.length - 1;
    let next = i;
    if (e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setSel(next);
    document.getElementById(`cw-tab-${cw.registered[next].id}`)?.focus();
  }

  return (
    <section
      id="workspace"
      aria-labelledby="workspace-heading"
      className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-canvas p-6 text-fg sm:mt-10 sm:p-10 lg:p-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_15%_0%,var(--glow),transparent_70%)]"
      />
      <div className="relative">
        <p className={`${META} text-muted`}>Flagship build</p>
        <h2
          id="workspace-heading"
          className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl"
        >
          Collab Workspace.{" "}
          <span className="text-muted">One portal for every project.</span>
        </h2>

        {/* Browser mockup */}
        <div className="mt-10 overflow-hidden rounded-lg border border-line bg-surface shadow-[inset_0_1px_0_0_var(--highlight)]">
          {/* Top bar */}
          <div className="border-b border-line bg-tint px-3.5 py-2.5">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pb-2">
              <span className={`${META} text-fg-2`}>{cw.label}</span>
              <HealthBadge health={health} />
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                aria-hidden="true"
                className="group/lights hidden gap-1.5 sm:flex"
              >
                <span className="size-2.5 rounded-full bg-line-strong transition-colors group-hover/lights:bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-line-strong transition-colors group-hover/lights:bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-line-strong transition-colors group-hover/lights:bg-[#28c840]" />
              </span>
              <div className="flex min-w-[10rem] flex-1 items-center gap-2 rounded border border-line bg-sunken px-3 py-1.5 font-mono text-xs text-fg-2">
                <Lock aria-hidden="true" className="size-3 shrink-0 text-ok" />
                <span className="sr-only">Secure connection</span>
                <span className="truncate">{ADDRESS}</span>
              </div>
              <PressA
                href={cw.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md bg-accent px-3 text-[13px] font-medium text-accent-fg transition-colors hover:bg-accent/90"
              >
                Open Collab Workspace
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </PressA>
            </div>
          </div>

          {/* Sidebar tabs + control plane canvas */}
          <div className="grid lg:grid-cols-[14rem_1fr]">
            <div className="border-b border-line p-3 lg:border-b-0 lg:border-r">
              <p className={`${META} px-2 pb-2 text-muted`}>
                Registered systems
              </p>
              <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="Registered systems"
                className="flex flex-col gap-1"
              >
                {cw.registered.map((p, i) => {
                  const selected = i === sel;
                  return (
                    <button
                      key={p.id}
                      id={`cw-tab-${p.id}`}
                      role="tab"
                      type="button"
                      aria-selected={selected}
                      aria-controls="cw-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setSel(i)}
                      onKeyDown={(e) => onTabKeyDown(e, i)}
                      className={`relative rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                        selected
                          ? "text-fg"
                          : "text-fg-2 hover:bg-tint hover:text-fg"
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="cw-active-system"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-md border border-line-strong bg-tint-2"
                          transition={SPRING}
                        />
                      )}
                      <span className="relative">{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              role="tabpanel"
              id="cw-panel"
              aria-labelledby={`cw-tab-${project.id}`}
              className="p-4 sm:p-6"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="max-w-[42ch]">
                      <h3 className="text-lg font-medium tracking-[-0.02em] text-fg">
                        {project.name}
                      </h3>
                      {"description" in project && project.description && (
                        <p className="mt-1 text-xs leading-relaxed text-fg-2">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <span
                      className={`${META} inline-flex items-center gap-1.5 rounded border border-line px-2 py-1 text-fg-2`}
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-fg-2"
                      />
                      Registered
                    </span>
                  </div>

                  <p className={`${META} mt-6 text-muted`}>
                    Active task progress
                  </p>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {project.lanes.map((l) => (
                      <li key={l.label}>
                        <div className="flex items-center justify-between font-mono text-xs text-fg-2">
                          <span>{l.label}</span>
                          <span className="tabular-nums text-muted">
                            {l.pct}%
                          </span>
                        </div>
                        <div
                          role="img"
                          aria-label={`${l.label} ${l.pct}% complete`}
                          className="mt-1.5 h-1 overflow-hidden rounded-full bg-line"
                        >
                          <div
                            className="h-full origin-left rounded-full bg-fg transition-transform duration-500"
                            style={{ transform: `scaleX(${l.pct / 100})` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p className={`${META} mt-6 text-muted`}>Health monitor</p>
                  <div
                    role="img"
                    aria-label="Health monitor sparkline, illustrative"
                    className="mt-3 flex h-16 items-end gap-1"
                  >
                    {samples.map((v, i) => (
                      <span
                        key={i}
                        className="h-full flex-1 origin-bottom rounded-sm bg-ok/70 transition-transform duration-700"
                        style={{ transform: `scaleY(${v / 100})` }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="border-t border-line px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Simulated UI · illustrative data, not production records
          </p>
        </div>

        <div className="mt-8">
          <h3 className={`${META} text-muted`}>{"// Under the hood"}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {cw.hood.map((item) => (
              <li
                key={item}
                className="rounded border border-line bg-tint px-2.5 py-1 font-mono text-xs text-fg-2 shadow-[inset_0_1px_0_0_var(--highlight)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
