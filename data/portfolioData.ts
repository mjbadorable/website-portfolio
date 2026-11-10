import { profile as base } from "./profile";

export type PortfolioProfile = {
  name: string;
  location: string; // shown in the status bar
  photo: string; // file lives in /public
  cv: string; // file lives in /public
  availability: string;
  email: string;
  badges: { credential: string; ops: string; ai: string }; // inline tilt badges in the hero intro
};

export const profile: PortfolioProfile = {
  name: "Marvin Jhay Adorable",
  location: "Iloilo, PH // GMT+8",
  photo: "/marvin.jpg",
  cv: "/marvin-adorable-cv.pdf",
  availability:
    "Computer Engineer · MS CpE Candidate @ Mapúa · EdTech & Systems Developer",
  email: base.email,
  badges: {
    credential: "BS CpE '23 / MS Candidate",
    ops: "EdTech Ops",
    ai: "AI Workflows",
  },
};

export type WorkspaceProjectId =
  | "convex-budget-os"
  | "verified-rag";

export type WorkspaceProject = {
  id: WorkspaceProjectId; // also keys the interactive simulation
  index: string; // "01"
  tab: string; // tab label
  /** Decorative address-bar text only. These are not real, deployed URLs. */
  url: string;
  room: string; // "What happens in this room": the user / business experience
  hood: string[]; // "Under the hood": architecture and guardrails, one item each
  links: { live?: string; repo?: string }; // omit when there is no public link
};

export const workspaceProjects: WorkspaceProject[] = [
  {
    id: "convex-budget-os",
    index: "01",
    tab: "Convex Budget OS",
    url: "workspace.marvin.dev/convex-budget-os",
    room: "Budget categories and expense lines update reactively using Convex state synchronization, allowing real-time balance tracking and structured expense logging without manual spreadsheet formulas.",
    hood: [
      "Convex real-time sync",
      "TypeScript schema validation",
      "Reactive state updates",
      "Structured ledger workflow",
    ],
    links: {},
  },
  {
    id: "verified-rag",
    index: "04",
    tab: "Verified RAG Assistant",
    url: "workspace.marvin.dev/verified-rag",
    room: "Internal policy lookup that answers from retrieved sources and cites them, and says it doesn't know when nothing matches well enough.",
    hood: [
      "Vector embeddings",
      "Cosine similarity threshold 0.85",
      "Deterministic “I don't know” fallback",
    ],
    links: {},
  },
];

/* ---------------------------------------------------------------------------
 * Verified facts only. Do not add headcounts, adoption numbers, savings, GPAs
 * or thesis titles. Education is deliberately NOT part of `experienceRoles`.
 * ------------------------------------------------------------------------- */

export type ExperienceRole = {
  role: string;
  organization: string;
  period: string;
  description: string;
  contributions?: { title: string; detail: string }[]; // selected work, one line each
  tags: string[]; // short labels only, 5 at most
};

export const experienceRoles: ExperienceRole[] = [
  {
    role: "Educational Technology Assistant",
    organization: "University of San Agustin",
    period: "May 2024 – Present",
    description:
      "Provides institutional educational technology administration, system quality assurance, and faculty enablement across academic platforms at the University of San Agustin.",
    contributions: [
      {
        title: "Enterprise Academic Systems",
        detail:
          "Administers user accounts, handles Zoho Help Desk issue triage, and supports faculty MasterSoft ERP grade encoding.",
      },
      {
        title: "System QA & Rollouts",
        detail:
          "Performs User Acceptance Testing (UAT) and manual workflow validation for university system rollouts (OBE (Outcomes-Based Education) and WFDMS (Web-Based Faculty Deliverables Monitoring System) pilots).",
      },
      {
        title: "Enablement & Technical Documentation",
        detail:
          "Authors step-by-step SOP guides, knowledge base documentation, and conducts hands-on onboarding for faculty and students.",
      },
    ],
    tags: [
      "NEO LMS",
      "User Acceptance Testing (UAT)",
      "System Deployments",
      "Faculty Enablement",
      "Technical Documentation",
    ],
  },
  {
    role: "AI Systems & Workflow Automation Developer",
    organization: "Independent / Freelance",
    period: "July 2023 – Present",
    description:
      "Builds resilient full-stack applications, deterministic workflow automations, and practical tools.",
    contributions: [
      {
        title: "Real-Time Budget Monitoring System",
        detail:
          "Reactive Convex financial tool with multi-tab Excel import.",
      },
      {
        title: "AI Workflow Guardrails",
        detail:
          "Validation logic and structured guardrails in Activepieces for controlled execution.",
      },
    ],
    tags: ["Next.js", "TypeScript", "Convex", "Claude API", "Activepieces"],
  },
];

export type EducationEntry = {
  degree: string;
  institution: string;
  mode?: string;
  status: string;
  completed?: boolean; // true = finished degree, false/omitted = ongoing
  description: string;
  focusAreas?: string[];
  /** Only where confirmed by the owner. */
  specialization?: string;
  thesis?: string;
  awards?: string[];
  tags: string[]; // short labels, taken from the verified description
};

// Most recent first. Thesis, specialization and awards appear only where the
// owner confirmed them (BS CpE). The MS CpE has no confirmed thesis title.
export const education: EducationEntry[] = [
  {
    degree: "Master of Science in Computer Engineering (MS CpE)",
    institution: "Mapúa University",
    mode: "Online",
    status: "Ongoing – Second Year (Expected 2028)",
    description:
      "Graduate studies focused on advanced hardware and software integration, embedded systems, microelectronics, and computer networks.",
    tags: [
      "Advanced Computer Architecture",
      "Embedded Systems",
      "AI & Machine Learning",
      "Computer Networks",
    ],
    focusAreas: [
      "Advanced Computer Architecture",
      "Embedded Systems Design",
      "Artificial Intelligence & Machine Learning",
      "Cyber-Physical Systems",
      "Computer Networks",
    ],
  },
  {
    degree: "Bachelor of Science in Computer Engineering (BS CpE)",
    institution: "University of San Agustin",
    status: "Graduated June 2023",
    completed: true,
    description:
      "Undergraduate foundation in computer engineering, software development, digital systems, and computing workflows.",
    specialization: "Embedded Systems Specialization",
    thesis:
      "Development of Real-time Outdoor Air Quality Monitoring with Notification System for Transport Terminals",
    awards: [
      "Best Research Paper Awardee",
      "Leadership Award (ACES President)",
      "Augustinian PassionProjects Award",
    ],
    tags: ["BS Computer Engineering", "Systems Design", "Class of 2023"],
  },
];

/** A specific, identifiable deliverable or event. Add `year` only when confirmed. */
export type TrainingEvent = {
  title: string;
  year?: string;
  /** What kind of work this is, e.g. "On-Site Computer Lab Training". */
  format?: string;
  audience: string;
  platforms?: string[];
  description: string;
  /** Only `published: true` entries may be rendered publicly. */
  published: boolean;
};

/** A recurring support area. Never carries an event date or implies a workshop. */
export type TrainingArea = {
  title: string;
  /** "Platform", "Systems" or "Tools": how the chips are labelled. */
  platformLabel: string;
  platforms: string[];
  audience: string;
  description: string;
  /** Marvin's exact capacity in this area. */
  capacity: string;
  topics: string[];
};

export const talksAndTraining: {
  intro: { label: string; headline: string; description: string };
  confirmedTrainingEvents: TrainingEvent[];
  trainingEnablementAreas: TrainingArea[];
} = {
  intro: {
    label: "Training & Enablement",
    headline: "Making academic technology easier to use.",
    description:
      "Supporting faculty, students, and university teams through system onboarding, LMS guidance, academic workflows, and practical instructional resources.",
  },
  confirmedTrainingEvents: [
    {
      title: "Hands-On LMS & Academic System Laboratory Onboarding",
      format: "On-Site Computer Lab Training",
      audience: "Faculty and Staff",
      platforms: ["NEO LMS", "CYPHER", "MasterSoft"],
      description:
        "Guided educators and staff through live, step-by-step system navigation, portal workflows, and digital classroom setup inside university computer laboratories.",
      published: true,
    },
    {
      title: "CRS Training LMS Workshop",
      year: "2026",
      audience: "University Educators and Staff (Iloilo City)",
      description: "Pending confirmation.",
      published: false,
    },
  ],
  trainingEnablementAreas: [
    {
      title: "LMS Training & Onboarding",
      capacity: "Technical Support & Faculty Onboarding",
      platformLabel: "Platforms",
      platforms: ["NEO LMS", "CYPHER"],
      audience: "Faculty and Students",
      description:
        "Learn how to create classes, manage course materials, enroll students, and use online learning tools.",
      topics: [
        "Faculty course creation",
        "Student enrollment",
        "Course content management",
        "Student portal access",
        "Joining classes",
        "Assignment submissions",
        "Online quizzes",
      ],
    },
    {
      title: "Academic System Orientation",
      capacity: "System QA & Workflow Validation",
      platformLabel: "Systems",
      platforms: ["OBE", "WFDMS"],
      audience: "Faculty, Deans, and Academic Supervisors",
      description:
        "Understand new university platforms such as OBE (Outcomes-Based Education) and WFDMS (Web-Based Faculty Deliverables Monitoring System), explore their workflows, participate in pilot testing, and learn how academic processes are handled.",
      topics: [
        "New platform orientation",
        "Pilot testing and feedback gathering",
        "Academic workflow guidance",
        "Attainment workflows",
      ],
    },
    {
      title: "Grade Encoding & Academic Workflows",
      capacity: "Technical Support & Faculty Onboarding",
      platformLabel: "Platform",
      platforms: ["MasterSoft"],
      audience: "Faculty and Academic Heads",
      description:
        "Learn grade configuration, encoding, submission, and academic approval procedures.",
      topics: [
        "Grade weightage configuration",
        "Grade encoding",
        "Grade submission",
        "Academic supervisor review and approvals",
      ],
    },
    {
      title: "Educational & Assessment Tools",
      capacity: "System QA & Workflow Validation",
      platformLabel: "Tools",
      platforms: ["Turnitin", "Digital Quiz Tools", "SCUOLA"],
      audience: "Faculty and Staff",
      description:
        "Explore digital assessment, plagiarism checking, online quizzes, and supplementary software for teaching.",
      topics: [
        "Turnitin originality checking",
        "Digital assessment workflows",
        "Online quizzes",
        "SCUOLA LMS platform orientation",
        "Technology-assisted teaching",
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
 * Journal: verified milestones only. A year with no entry is simply not shown
 * (2025 has none). Do not expand the ACES acronym. No headcounts, savings,
 * thesis titles or invented dates.
 * ------------------------------------------------------------------------- */

export type JournalEntry = {
  id: string;
  year: string; // "2023", "2024", "2026"
  title: string;
  category: "Leadership" | "Education" | "Career Milestone" | "AI & Systems";
  period?: string;
  organization?: string;
  description: string;
  details?: string[];
  image?: { src: string; alt: string; caption?: string };
  tags?: string[];
};

export const journalEntries: JournalEntry[] = [
  {
    id: "bachelors-graduation",
    year: "2023",
    title: "Graduated with Bachelor of Science in Computer Engineering",
    category: "Education",
    organization: "University of San Agustin",
    description:
      "Completed undergraduate degree in Computer Engineering with an Embedded Systems specialization, establishing the core technical foundation in computer systems, digital logic, and software development.",
    details: [
      "Embedded Systems Specialization",
      "Thesis: Development of Real-time Outdoor Air Quality Monitoring with Notification System for Transport Terminals",
      "Best Research Paper Awardee",
      "Augustinian PassionProjects Award",
    ],
    tags: ["BS Computer Engineering", "University of San Agustin", "Class of 2023"],
  },
  {
    id: "aces-president",
    year: "2023",
    title: "Elected ACES President",
    category: "Leadership",
    description:
      "Served as ACES President, marking a foundational milestone in student leadership, peer engineering collaboration, and academic representation.",
    details: ["Received the Leadership Award (ACES President)"],
  },
  {
    id: "edtech-assistant-start",
    year: "2024",
    title: "Appointed Educational Technology Assistant",
    category: "Career Milestone",
    organization: "University of San Agustin",
    description:
      "Started my professional career supporting university educational technology systems, enterprise LMS operations, academic workflows, and faculty and staff onboarding.",
    details: [
      "LMS administration & navigation support (NEO LMS / CYPHER)",
      "Faculty course creation, gradebook configuration & student onboarding",
      "Institutional system pilot testing & feedback gathering (OBE / WFDMS)",
      "Student Information System grade encoding guidance (MasterSoft SIS)",
      "Educational assessment tool orientation (Turnitin / SCUOLA)",
    ],
    tags: [
      "EdTech Operations",
      "LMS Administration",
      "Faculty Enablement",
      "Academic Systems",
    ],
  },
  {
    id: "ai-systems-and-grad",
    year: "2026",
    title: "Full-Stack AI Automation & Graduate Studies",
    category: "AI & Systems",
    organization: "Independent / Mapúa University",
    description:
      "Engineering full-stack web platforms and deterministic AI automations while advancing graduate studies in Computer Engineering at Mapúa University.",
    details: [
      "Architected Collab Workspace, Real-Time Budget Monitoring System, and client-side web platforms",
      "Ongoing Master of Science in Computer Engineering coursework at Mapúa University",
    ],
    tags: ["Next.js", "Convex", "Activepieces", "Claude API", "MS CpE"],
  },
];
