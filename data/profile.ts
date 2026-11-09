export type Profile = {
  name: string;
  identity: string; // H1 text
  tagline: string; // sub-headline under the H1
  availability: string; // shown in the portrait badge, before the location
  location: string;
  email: string; // mailto is built from this
  cvPath: string; // file lives in /public
  links: { label: "GitHub" | "LinkedIn"; href: string }[]; // max 2; email is the 3rd link
  portrait?: { src: string; alt: string }; // omit to show the monogram frame
  about: {
    journey: string;
    credentials: string[];
    ethos: { lines: string[]; note: string }; // last line is emphasised
    arsenal: string[]; // "Daily Drivers", tools used in shipped work
    offDuty: string[]; // emoji first
  };
};

export const profile: Profile = {
  name: "Marvin Jhay Adorable",
  identity:
    "I build resilient web tools and automated systems that eliminate operational friction.",
  tagline:
    "Computer Engineer (MS CpE Candidate) & AI Systems Builder based in the Philippines.",
  availability: "Available for Projects",
  location: "Iloilo, PH",
  portrait: {
    src: "/marvin.jpg",
    alt: "Marvin Jhay Adorable",
  },
  email: "adorablemarvinjhay@gmail.com",
  cvPath: "/marvin-adorable-cv.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/mjbadorable" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/marvin-jhayadorable-686412145",
    },
  ],
  about: {
    journey:
      "Computer Engineer (BS CpE '23, MS CpE Candidate) with 2+ years resolving operational friction across enterprise academic systems (LMS, ERP, grading) for 100+ university faculty at University of San Agustin. I don't build theoretical toy apps—I build production tools that solve real operational headaches.",
    credentials: [
      "BS Computer Engineering",
      "MS CpE Candidate",
      "EdTech Specialist",
    ],
    ethos: {
      lines: [
        "Build it once.",
        "Run it reliably.",
        "Automate the repetitive, protect the human.",
      ],
      note: "Deterministic guardrails on every AI workflow I ship.",
    },
    arsenal: [
      "Next.js 16",
      "TypeScript",
      "Convex",
      "Tailwind CSS",
      "Claude API",
      "Activepieces",
      "n8n",
      "Firebase",
      "Python",
      "Vitest",
      "Cloudflare",
    ],
    offDuty: [
      "🏋️ Gym & Fitness regular",
      "🐱 Cat lover",
      "☕ Iced Americano",
      "🎧 Lo-fi beats",
      "📍 Iloilo City, PH",
    ],
  },
};
