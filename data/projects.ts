export type Project = {
  slug: string;
  name: string;
  role: string;
  roi: {
    problem: string;
    bottleneck: string;
    outcome: string; // the focal line in the Business view; must be measurable
    timeSaved: string;
  };
  architecture: {
    trigger: string;
    aiPipeline: string;
    guardrail: string; // the focal line in the Technical view
    stack: string[]; // max 5, shown in the card footer in both views
  };
  trustBadges: string[]; // max 3
  metrics: string[]; // proof pills, max 3; leave [] until real
  access:
    | { type: "public"; url: string } // renders "Visit live site"
    | { type: "internal"; note: string }; // renders an inert tag, never a dead button
  repoUrl?: string;
};

// UNKNOWN = not yet provided. `npm run check:data` fails until none remain.
// Never replace UNKNOWN with a guess: only claims you can defend in an interview.
export const projects = [
  {
    slug: "budget-expense-monitoring",
    name: "Reactive Budget & Expense Monitoring System",
    role: "Full-Stack Developer",
    roi: {
      problem:
        "Departmental budgets lived in detached Excel spreadsheets, causing sync errors and leaving no audit trail.",
      bottleneck:
        "Manual multi-tab spreadsheet reconciliation with zero real-time audit visibility.",
      outcome:
        "Fully replaced legacy spreadsheets; 707 automated unit and integration tests passing.",
      timeSaved:
        "15+ hours/month saved in manual cross-department reconciliation",
    },
    architecture: {
      trigger:
        "Multi-tab .xlsx workbook import, then real-time reactive sync via Convex.",
      aiPipeline: "No LLM — deterministic relational cloud data flow.",
      guardrail:
        "Google SSO (@usa.edu.ph) access control, strict domain lock, and 707 automated tests.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Convex", "Vercel"],
    },
    trustBadges: ["Google SSO Locked", "707 Tests Passing", "Deterministic Sync"],
    metrics: ["707 tests", "Replaced Excel", "Real-time sync"],
    access: { type: "internal", note: "Internal · Google SSO" },
  },
  {
    slug: "mastersoft-grade-assistant",
    name: "Mastersoft Grade Assistant (v2.0)",
    role: "Solo Architect & Developer",
    roi: {
      problem:
        "Enterprise ERP grade encoding was rigid, slow, and prone to rounding/input errors for university instructors.",
      bottleneck:
        "Manual grade entry into legacy web portal with no live calculation or client-side autosave.",
      outcome:
        "Shipped virtualized spreadsheet grid with formula validation; 328 passing automated tests in production.",
      timeSaved: "Reduced instructor encoding time by ~60% per grading cycle",
    },
    architecture: {
      trigger: "Class roster import or direct spreadsheet-style grid input.",
      aiPipeline: "Deterministic formula engine with client-side rounding validation.",
      guardrail:
        "Live formula range checks, archive system guardrails, and 328 automated Vitest tests.",
      stack: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Vitest"],
    },
    trustBadges: ["Production Deployed", "328 Tests Passing", "Client-Side Autosave"],
    metrics: ["328 tests", "In production", "Solo build"],
    access: {
      type: "public",
      url: "https://mastersoft-grade-assistant.web.app",
    },
  },
  {
    slug: "ai-lead-triage-crm",
    name: "AI Lead Triage & Multi-Step CRM Automation",
    role: "AI Automation Architect",
    roi: {
      problem:
        "Inbound sales inquiries sat in general inboxes for hours, leading to delayed response times and lost conversion opportunities.",
      bottleneck:
        "Manual inquiry sorting, qualification, and data re-entry across CRM and messaging tools.",
      outcome:
        "Automated qualification and CRM routing with drafted review-ready responses delivered under 2 minutes.",
      timeSaved: "10+ hours/week saved in manual inbox triaging",
    },
    architecture: {
      trigger:
        "Inbound webhook from contact forms, email, or scheduling webhooks.",
      aiPipeline:
        "Claude API parses intent, extracts lead qualification metadata, and drafts personalized context-aware replies.",
      guardrail:
        "Structured JSON schema validation, Human-in-the-Loop review before dispatch, and holds drafts in queue to eliminate auto-send errors.",
      stack: ["Activepieces", "Webhooks", "Claude API", "TypeScript", "HubSpot / Notion API"],
    },
    trustBadges: ["Human-in-the-Loop", "Draft-Only Review Gate", "Schema-Validated"],
    metrics: ["< 2 min triage", "Strict Schema Fences", "Automated CRM sync"],
    access: { type: "internal", note: "Production Workflow" },
  },
  {
    slug: "rag-knowledge-assistant",
    name: "Hallucination-Proof RAG Knowledge Assistant",
    role: "AI Systems Engineer",
    roi: {
      problem:
        "Operations and support teams lost hours searching fragmented documentation, SOPs, and internal policies.",
      bottleneck:
        "Manual keyword searches across nested Google Drive folders and disparate PDF handbooks.",
      outcome:
        "Instant, citation-backed answers strictly grounded in verified internal documentation with deterministic fallback.",
      timeSaved: "8+ hours/week per team member on repetitive policy lookups",
    },
    architecture: {
      trigger: "User natural-language query via web interface or Slack bot.",
      aiPipeline:
        "Vector embedding retrieval fetches verified semantic chunks, Claude generates citation-backed synthesis.",
      guardrail:
        "Strict cosine similarity threshold, deterministic 'I don't know' fallback on low confidence, and source URL citations.",
      stack: ["Vector Search", "Claude API", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    trustBadges: [
      "Strict Source Citations",
      "Deterministic Fallback",
      "Grounded Citations Only",
    ],
    metrics: ["Citation-Backed Only", "Strict fallback guard", "Instant retrieval"],
    access: { type: "internal", note: "Internal System" },
  },
] satisfies Project[];
