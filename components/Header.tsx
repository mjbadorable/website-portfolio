"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { PressLink, SPRING } from "./Pressable";
import { ThemeAndMotionControls } from "./ThemeAndMotionControls";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Training", href: "/training" },
  { label: "Contact", href: "/contact" },
] as const;

const linkText =
  "whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] transition-colors";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Slide-out menu: Escape closes, Tab stays inside, page scroll is locked.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <>
      {/* Floating capsule. The outer bar is click-through so only the pill takes
          pointer events; the nav is a real grid column, never absolutely positioned. */}
      <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="pointer-events-auto mx-auto grid h-14 w-full max-w-[1080px] grid-cols-[1fr_auto] items-center gap-3 rounded-full border border-line bg-canvas/80 px-4 text-fg shadow-[inset_0_1px_0_0_var(--highlight)] backdrop-blur-md sm:px-5 lg:grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] lg:gap-5 lg:px-6">
          <Link
            href="/"
            aria-label={profile.name}
            className="shrink-0 justify-self-start whitespace-nowrap text-[15px] font-medium tracking-tight"
          >
            <span className="sm:hidden font-mono text-sm tracking-[0.14em]">MJA</span>
            <span className="hidden sm:inline">{profile.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {NAV.filter((n) => n.href !== "/contact").map((n) => {
                const active = isActive(n.href);
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={`${linkText} relative block rounded-full px-3 py-2 ${
                        active ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="pill-active-indicator"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-tint-2"
                          transition={SPRING}
                        />
                      )}
                      <span className="relative">{n.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2 whitespace-nowrap">
            <div className="hidden lg:block">
              <ThemeAndMotionControls variant="header" />
            </div>
            <div className="lg:hidden">
              <ThemeAndMotionControls variant="compact" />
            </div>
            <PressLink
              href="/contact"
              className="hidden h-9 shrink-0 items-center rounded-full bg-accent px-4 text-[13px] font-medium text-accent-fg transition-colors hover:bg-accent/90 lg:inline-flex"
            >
              Get in touch
            </PressLink>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-tint text-fg transition-colors hover:border-line-strong lg:hidden"
            >
              <Menu aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out menu (below lg). Rendered outside <header> because the header's
          backdrop blur would otherwise become the containing block for `fixed`. */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              aria-hidden="true"
              className="fixed inset-0 z-[60] bg-canvas/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
            <motion.aside
              key="panel"
              id="mobile-nav"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed right-0 top-0 z-[70] flex h-dvh w-[min(86vw,340px)] flex-col border-l border-line bg-canvas p-5 text-fg lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={SPRING}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Menu
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="inline-flex size-8 items-center justify-center rounded-md border border-line bg-tint text-fg transition-colors hover:border-line-strong"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>

              <nav aria-label="Primary (menu)" className="mt-4">
                <ul className="divide-y divide-line border-y border-line">
                  {NAV.map((n) => {
                    const active = isActive(n.href);
                    return (
                      <li key={n.href}>
                        <Link
                          href={n.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`${linkText} flex min-h-14 items-center justify-between ${
                            active ? "text-fg" : "text-fg-2 hover:text-fg"
                          }`}
                        >
                          {n.label}
                          {active && (
                            <span
                              aria-hidden="true"
                              className="size-1.5 rounded-full bg-fg"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-auto space-y-4 pt-6">
                <ThemeAndMotionControls variant="menu" />
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg transition-colors hover:bg-accent/90"
                >
                  Get in touch
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
