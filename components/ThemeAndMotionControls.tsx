"use client";

import { Activity, Moon, Sun } from "lucide-react";
import { useThemeMotion } from "./ThemeAndMotionProvider";

const btn =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-tint px-2.5 font-mono text-xs uppercase tracking-[0.14em] text-fg-2 transition-colors hover:border-line-strong hover:text-fg";

// Theme: one button, obsidian (dark) <-> paper (light). The icon shows the
// theme you will switch TO. Motion: ON / OFF.
export function ThemeAndMotionControls({
  variant = "header",
}: {
  variant?: "header" | "menu" | "compact";
}) {
  const { theme, setTheme, motionEnabled, setMotionEnabled } = useThemeMotion();
  const dark = theme === "obsidian";
  const state = motionEnabled ? "ON" : "OFF";
  const Icon = dark ? Sun : Moon;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        onClick={() => setTheme(dark ? "paper" : "obsidian")}
        className={`${btn} ${variant === "menu" ? "" : "w-8 justify-center px-0"}`}
      >
        <Icon aria-hidden="true" className="size-3.5" />
        {variant === "menu" && <span>{dark ? "Light mode" : "Dark mode"}</span>}
      </button>

      {variant !== "compact" && (
        <button
          type="button"
          aria-pressed={motionEnabled}
          aria-label={`Motion: ${state}`}
          onClick={() => setMotionEnabled(!motionEnabled)}
          className={btn}
        >
          <Activity
            aria-hidden="true"
            className={`size-3.5 ${motionEnabled ? "text-ok" : "text-muted"}`}
          />
          <span className={variant === "header" ? "hidden xl:inline" : undefined}>
            Motion: {state}
          </span>
        </button>
      )}
    </div>
  );
}
