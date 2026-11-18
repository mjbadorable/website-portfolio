import {
  Bug,
  ClipboardCheck,
  Database,
  FileText,
  GraduationCap,
  ListChecks,
  Network,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { brandIcons } from "@/data/techIcons";

// Tool label -> brand mark (data/techIcons.ts) or a neutral lucide glyph.
const BRAND: Record<string, keyof typeof brandIcons> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  C: "c",
  "C++": "cpp",
  Bash: "bash",
  "Next.js 16": "nextjs",
  "React 19": "react",
  "Tailwind CSS v4": "tailwind",
  "Convex Real-Time": "convex",
  "Supabase (PostgreSQL)": "supabase",
  Cloudflare: "cloudflare",
  "Claude API": "claude",
  "Custom Claude Skills": "claude",
  n8n: "n8n",
  "Zoho Help Desk": "zoho",
  "Google Workspace for Education": "google",
  // Project-level names
  "Next.js": "nextjs",
  React: "react",
  "Tailwind CSS": "tailwind",
  Convex: "convex",
  "Firebase Hosting": "firebase",
  "Offline PWA": "pwa",
  "Google Drive API": "googledrive",
  Clerk: "clerk",
  OpenCV: "opencv",
};

const GLYPH: Record<string, LucideIcon> = {
  SQL: Database,
  Activepieces: Workflow,
  "Vector RAG": Network,
  "MasterSoft ERP": GraduationCap,
  "User Acceptance Testing (UAT)": ClipboardCheck,
  "Manual QA & Workflow Validation": ListChecks,
  "Defect Reporting & Triage": Bug,
  "Technical Documentation": FileText,
};

export function TechIcon({ label }: { label: string }) {
  const key = BRAND[label];
  if (key) {
    const { path, hex } = brandIcons[key];
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={16}
        height={16}
        className={hex ? undefined : "text-fg"}
        fill={hex ?? "currentColor"}
      >
        <path d={path} />
      </svg>
    );
  }
  const Glyph = GLYPH[label];
  return Glyph ? (
    <Glyph aria-hidden="true" className="size-4 text-fg-2" />
  ) : null;
}
