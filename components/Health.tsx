"use client";

import { useEffect, useState } from "react";

const META = "font-mono text-xs uppercase tracking-[0.14em]";

export type Health =
  | { status: "checking" }
  | { status: "up"; ms: number }
  | { status: "slow" } // no answer within the timeout; says nothing about the site
  | { status: "down" };

const PROBE_TIMEOUT_MS = 2500;

// Real reachability probe. A no-cors request can't expose the HTTP status code,
// so this reports "reachable" plus the measured round-trip time, never "200 OK".
export function useHealth(url: string, everyMs = 30_000) {
  const [health, setHealth] = useState<Health>({ status: "checking" });

  useEffect(() => {
    let cancelled = false;
    let controller: AbortController | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function probe() {
      controller = new AbortController();
      const c = controller;
      let timedOut = false;
      timer = setTimeout(() => {
        timedOut = true;
        c.abort();
      }, PROBE_TIMEOUT_MS);
      const t0 = performance.now();
      try {
        await fetch(url, { mode: "no-cors", cache: "no-store", signal: c.signal });
        if (!cancelled) {
          setHealth({ status: "up", ms: Math.round(performance.now() - t0) });
        }
      } catch {
        if (!cancelled) setHealth({ status: timedOut ? "slow" : "down" });
      } finally {
        if (timer) clearTimeout(timer);
      }
    }
    probe();
    const id = setInterval(probe, everyMs);
    return () => {
      cancelled = true;
      clearInterval(id);
      if (timer) clearTimeout(timer);
      controller?.abort();
    };
  }, [url, everyMs]);

  return health;
}

export function HealthBadge({ health }: { health: Health }) {
  const dot =
    health.status === "up"
      ? "bg-ok shadow-[0_0_8px_2px_var(--ok)]"
      : health.status === "down" || health.status === "slow"
        ? "bg-muted"
        : "bg-muted motion-safe:animate-pulse";
  return (
    <span
      aria-live="polite"
      className={`${META} inline-flex items-center gap-2 text-fg-2`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dot}`} />
      {health.status === "up"
        ? `reachable · ${health.ms}ms`
        : health.status === "down"
          ? "unreachable"
          : health.status === "slow"
            ? "status unavailable"
            : "checking…"}
    </span>
  );
}

// Drop-in for server components.
export function HealthPing({ url }: { url: string }) {
  return <HealthBadge health={useHealth(url)} />;
}
