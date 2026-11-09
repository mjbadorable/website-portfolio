"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";

export type Theme = "obsidian" | "paper";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  motionEnabled: boolean;
  setMotionEnabled: (on: boolean) => void;
};

const ThemeMotionContext = createContext<Ctx | null>(null);

export function useThemeMotion() {
  const ctx = useContext(ThemeMotionContext);
  if (!ctx) throw new Error("useThemeMotion must be used inside the provider");
  return ctx;
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked; the choice then lasts for this visit only.
  }
}

// <html data-motion> is set before first paint (obsidian by default, or the saved paper choice) by an inline script
// in app/layout.tsx. This provider mirrors it into React state and keeps both in sync.
export function ThemeAndMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("obsidian");
  const [motionEnabled, setMotionState] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      const { motion, theme: th } = document.documentElement.dataset;
      if (th === "paper" || th === "obsidian") setThemeState(th);
      setMotionState(motion !== "off");
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    save("theme", t);
  }, []);

  const setMotionEnabled = useCallback((on: boolean) => {
    setMotionState(on);
    document.documentElement.dataset.motion = on ? "on" : "off";
    save("motion", on ? "on" : "off");
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, motionEnabled, setMotionEnabled }),
    [theme, setTheme, motionEnabled, setMotionEnabled],
  );

  return (
    <ThemeMotionContext.Provider value={value}>
      <MotionConfig reducedMotion={motionEnabled ? "user" : "always"}>
        {children}
      </MotionConfig>
    </ThemeMotionContext.Provider>
  );
}
