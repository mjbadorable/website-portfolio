export type Profile = {
  name: string;
  identity: string; // H1 text
  identityEmphasis: string; // substring of `identity` rendered in the primary colour
  chips: string[]; // hero activity chips, emoji first, max 4
  email: string; // mailto is built from this
  cvPath: string; // file lives in /public
  links: { label: "GitHub" | "LinkedIn"; href: string }[]; // max 2; email is the 3rd link
  focus: { text: string; updatedAt: string }; // status pill; updatedAt is "YYYY-MM"
};

export const profile = {
  name: "Marvin Jhay Adorable",
  identity: "Computer engineer building resilient software and automations.",
  identityEmphasis: "resilient software and automations",
  chips: [
    "💻 shipping web tools",
    "🤖 workflow automation",
    "📍 Iloilo, PH",
    "🟢 open to collabs",
  ],
  email: "adorablemarvinjhay@gmail.com",
  cvPath: "/marvin-adorable-cv.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/mjbadorable" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/marvin-jhayadorable-686412145",
    },
  ],
  focus: {
    text: "Shipping Mastersoft Grade Assistant v2.0 & building workflow automations",
    updatedAt: "2026-11",
  },
} satisfies Profile;
