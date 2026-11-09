"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { PressButton } from "./Pressable";

export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission).
      // The address stays selectable and clickable, so fail quietly.
    }
  }

  return (
    <PressButton
      type="button"
      onClick={copy}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-line bg-tint px-3 font-mono text-xs text-fg shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong hover:bg-surface-hover"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-3.5" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5" />
      )}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </PressButton>
  );
}
