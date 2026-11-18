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
    "Unified developer control plane with real-time Kanban tracking, live GitHub telemetry, and architecture mapping.",
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
        "Faculty grade computation and validation for MasterSoft ERP.",
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
        "Budget and purchase-request tracking with Convex cloud sync.",
      lanes: [
        { label: "Plan", pct: 100 },
        { label: "Architect", pct: 90 },
        { label: "Monitor", pct: 75 },
        { label: "Manage", pct: 60 },
      ],
      samples: [50, 58, 64, 60, 68, 74, 70, 66, 72, 78, 74, 80, 76, 70, 74, 82],
    },
    {
      id: "veritas",
      name: "Veritas",
      description:
        "Optical-mark answer-sheet designer, OpenCV camera scanner, and item-analysis grader.",
      lanes: [
        { label: "Plan", pct: 100 },
        { label: "Architect", pct: 95 },
        { label: "Monitor", pct: 80 },
        { label: "Manage", pct: 75 },
      ],
      samples: [58, 66, 72, 68, 76, 82, 78, 84, 80, 86, 82, 88, 84, 86, 90, 88],
    },
  ],
};

export const stack = {
  categories: [
    {
      title: "Core Languages",
      items: ["TypeScript", "Python", "C", "C++", "SQL", "Bash"],
    },
    {
      title: "Frontend & Cloud",
      items: [
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "Convex Real-Time",
        "Supabase (PostgreSQL)",
        "Cloudflare",
      ],
    },
    {
      title: "AI & Automation",
      items: [
        "Claude API",
        "Activepieces",
        "n8n",
        "Custom Claude Skills",
        "Vector RAG",
      ],
    },
    {
      title: "EdTech & Manual QA",
      items: [
        "MasterSoft ERP",
        "Zoho Help Desk",
        "Google Workspace for Education",
        "User Acceptance Testing (UAT)",
        "Manual QA & Workflow Validation",
        "Defect Reporting & Triage",
        "Technical Documentation",
      ],
    },
  ],
};

// Facts below come from the owner's project notes and repositories. Notes
// describe what each build does; they carry no usage numbers or test counts.
export const projectCategories = ["Web apps", "Systems"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type RecentProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  domain: string;
  description: string;
  tech: string[]; // four at most
  image: string; // dashboard screenshot under /public/projects
  liveUrl?: string; // only real, reachable URLs
  repoUrl?: string; // only public repositories under github.com/mjbadorable
  notes: { problem?: string; approach?: string; outcome?: string };
  /** High-level data flow. Steps split on "➔". */
  architectureSummary?: string;
};

export const recentProjects: RecentProject[] = [
  {
    id: "collab-workspace",
    title: "Collab Workspace",
    category: "Web apps",
    domain: "Developer Control Plane",
    description:
      "A developer control plane to plan, architect, monitor, and manage decoupled software projects from one portal.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare"],
    image: "/projects/collab-workspace.jpg",
    liveUrl: "https://www.collabworkspace.dev",
    repoUrl: "https://github.com/mjbadorable/collab-workspace",
    notes: {
      problem:
        "Planning, architecture, monitoring, and management of separate software projects needed one place instead of several tools.",
      approach:
        "A project hub with Kanban work items, a system architecture view, and a live health monitor. Pasting a GitHub URL breaks a repository down into a starting project.",
      outcome: "Deployed at collabworkspace.dev behind a production AuthGate.",
    },
  },
  {
    id: "mastersoft-grade-assistant",
    title: "Mastersoft Grade Encoding Assistant",
    category: "Web apps",
    domain: "Academic Operations",
    description:
      "A companion calculator that shows faculty what to enter in Mastersoft and the grade Mastersoft will produce.",
    tech: ["TypeScript", "React", "Firebase Hosting", "Offline PWA"],
    image: "/projects/mastersoft-grade-assistant.jpg",
    liveUrl: "https://mastersoft-grade-assistant.web.app",
    repoUrl: "https://github.com/mjbadorable/Mastersoft-Grade-Encoding-Assistant",
    notes: {
      problem:
        "Mastersoft rounds twice and uses a step transmutation table, so grades computed in Excel did not match its output. Teachers found out only after encoding.",
      approach:
        "Reproduces those rules to predict term grades and the marks to encode, with a step-by-step breakdown, Excel import, and upload-ready export.",
      outcome:
        "Live as a personal project, not an official university system. It does not connect to Mastersoft.",
    },
    architectureSummary:
      "Excel / CSV class record ingestion ➔ Formula transmutation engine ➔ Spreadsheet grid editor ➔ Verified MasterSoft ERP upload batch.",
  },
  {
    id: "edtech-budget",
    title: "EDTECH Budget Monitoring System",
    category: "Systems",
    domain: "Operations & Finance",
    description:
      "Budget and purchase-request tracking for the EdTech unit, with real-time Convex sync and multi-tab Excel import.",
    tech: ["React 19", "TypeScript", "Convex", "Google Drive API"],
    image: "/projects/edtech-budget.jpg",
    liveUrl: "https://edtech-budget-monitoring-system.vercel.app",
    notes: {
      problem:
        "Budgets and purchase requests were tracked in raw Google Spreadsheets.",
      approach:
        "Semester and academic-year views with a KPI ribbon, a purchase-request status workflow, and Google Drive attachments per request.",
      outcome: "In production use for the EdTech unit.",
    },
    architectureSummary:
      "Local state ➔ Convex reactive mutations ➔ Multi-tab XLSX schema mapping ➔ Real-time fiscal telemetry.",
  },
  {
    id: "omr-grade-engine",
    title: "Veritas",
    category: "Web apps",
    domain: "Assessment Automation",
    description:
      "An optical-mark answer-sheet platform: design a sheet, scan photos, and grade with item analysis.",
    tech: ["Next.js", "Convex", "Clerk", "OpenCV"],
    image: "/projects/veritas.jpg",
    liveUrl: "https://omr-grade-engine.vercel.app",
    repoUrl: "https://github.com/mjbadorable/omr-grade-engine",
    notes: {
      problem:
        "Paper answer sheets needed to be designed, scanned, and graded in a single workflow for faculty.",
      approach:
        "A sheet designer, camera-first scanning with an OpenCV worker, grading with item analysis and outcomes, and an admin area for faculty, syllabi, policy, and audit. It also runs local-first without a backend.",
      outcome: "Live on Vercel. Faculty rollout is still pending.",
    },
  },
];
