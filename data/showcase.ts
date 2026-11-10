// Content for the flagship shell and the Tech Stack / Recent Projects section.
// Kept out of portfolioData.ts, which holds the locked profile, experience,
// education and training facts.

export const collabWorkspace = {
  label: "FLAGSHIP BUILD · COLLAB.WORKSPACE",
  name: "Collab Workspace",
  url: "https://www.collabworkspace.dev",
  // Reachability probe target: the root sits behind the AuthGate, /login is public.
  probeUrl: "https://www.collabworkspace.dev/login",
  subtitle:
    "The developer control plane and command center I built to plan, architect, monitor, and manage decoupled software projects from a single unified portal.",
  hood: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Cloudflare DNS / SSL",
    "Production AuthGate",
  ],
  // Everything below drives the SIMULATED control-plane UI. Percentages and
  // health samples are illustrative, not live data.
  registered: [
    {
      id: "mastersoft",
      name: "Mastersoft Grade Assistant",
      description:
        "Faculty grade computation and validation assistant with Mastersoft ERP transmutation formula verification.",
      lanes: [
        { label: "Plan", pct: 100 },
        { label: "Architect", pct: 100 },
        { label: "Monitor", pct: 85 },
        { label: "Manage", pct: 70 },
      ],
      samples: [62, 70, 66, 74, 80, 72, 68, 76, 84, 78, 72, 80, 86, 82, 76, 84],
    },
    {
      id: "budget",
      name: "EDTECH Budget System",
      description:
        "Fiscal allocation and purchase request engine with real-time Convex cloud sync and Excel ingestion.",
      lanes: [
        { label: "Plan", pct: 100 },
        { label: "Architect", pct: 90 },
        { label: "Monitor", pct: 75 },
        { label: "Manage", pct: 60 },
      ],
      samples: [50, 58, 64, 60, 68, 74, 70, 66, 72, 78, 74, 80, 76, 70, 74, 82],
    },
  ],
};

export const stack = {
  file: "stack.json",
  categories: [
    {
      key: "FRONTEND",
      items: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Lucide Icons",
      ],
    },
    {
      key: "BACKEND & CLOUD",
      items: [
        "Convex Real-Time",
        "Supabase (PostgreSQL)",
        "Node.js",
        "Python",
        "Cloudflare",
      ],
    },
    {
      key: "AI & AUTOMATION",
      items: [
        "Claude API",
        "Activepieces",
        "n8n",
        "Custom Claude Skills",
        "Vector RAG",
      ],
    },
    {
      key: "EDTECH & QA",
      items: [
        "NEO LMS / CYPHER",
        "MasterSoft ERP",
        "Vitest (1,000+ Tests)",
        "Turnitin",
      ],
    },
  ],
};

export type RecentProject = {
  host: string; // address-bar text; only `href` projects are real, live sites
  href?: string; // live demo
  repo?: string; // public source repository
  title: string;
  description: string;
  points: string[];
};

export const recentProjects: RecentProject[] = [
  {
    host: "mastersoft-grade-assistant.web.app",
    href: "https://mastersoft-grade-assistant.web.app",
    repo: "https://github.com/mjbadorable/Mastersoft-Grade-Encoding-Assistant",
    title: "Mastersoft Grade Assistant v2.0",
    description:
      "An offline-first grading assistant for university faculty to compute, validate, and batch-encode student grades into the Mastersoft ERP system with automated formula transmutation.",
    points: ["Formula validation", "Spreadsheet grid", "328 tests"],
  },
  {
    host: "convex-budget.app",
    title: "Reactive Budget & Expense Monitoring",
    description:
      "An institutional budget and purchase request tracker with real-time Convex cloud synchronization, multi-tab Excel workbook ingestion, and live fiscal allocation telemetry.",
    points: ["Convex cloud sync", "Multi-tab Excel importer", "707 tests"],
  },
  {
    host: "exam-reviewer.app",
    title: "Exam Reviewer Platform",
    description:
      "An offline-ready exam reviewer PWA featuring split-screen PDF question browsing, automated bubble-sheet scoring, and client-side Dexie IndexedDB state persistence.",
    points: [
      "Split-screen PDF.js viewer",
      "Bubble-sheet scoring engine",
      "Client-side Dexie v4 offline database",
    ],
  },
];
