// Credentials supplied and confirmed by the owner. Each `verifyUrl` is the
// issuer's own verification or certificate page. Do not add a credential
// without a verification link, and do not invent dates, IDs or scores.

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  category:
    | "AI & Machine Learning"
    | "Cloud & DevOps"
    | "Software Engineering & QA"
    | "EdTech & IT Infrastructure";
  verifyUrl: string;
  skills: string[];
};

export const certificationCategories = [
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Software Engineering & QA",
  "EdTech & IT Infrastructure",
] as const;

export const certifications: Certification[] = [
  // 01 AI & Machine Learning
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    issuer: "IBM / Coursera",
    category: "AI & Machine Learning",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/QMQAYJFL2T9U",
    skills: ["Generative AI", "Prompt Engineering", "Machine Learning Concepts"],
  },
  // 02 Cloud & DevOps
  {
    id: "devops-on-aws",
    title: "DevOps on AWS",
    issuer: "Amazon Web Services / Coursera",
    category: "Cloud & DevOps",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/FCS7UKY9DCBZ",
    skills: ["AWS", "CI/CD Pipelines", "Cloud Infrastructure"],
  },
  {
    id: "linux-for-developers",
    title: "Linux for Developers",
    issuer: "The Linux Foundation / Coursera",
    category: "Cloud & DevOps",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/certificate/NQRH9MXC4MUB",
    skills: ["Linux CLI", "Bash Scripting", "System Administration"],
  },
  // 03 Software Engineering & QA
  {
    id: "software-testing-automation",
    title: "Software Testing and Automation",
    issuer: "University of Minnesota / Coursera",
    category: "Software Engineering & QA",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/RMYGUWZSUF6C",
    skills: ["Automated QA", "Unit Testing", "Test-Driven Development"],
  },
  {
    id: "html-css-js-web-developers",
    title: "HTML, CSS, and Javascript for Web Developers",
    issuer: "Johns Hopkins University / Coursera",
    category: "Software Engineering & QA",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/certificate/KNVHU4KB73SV",
    skills: ["Modern Web Development", "JavaScript", "Responsive Design"],
  },
  // 04 EdTech & IT Infrastructure
  {
    id: "google-certified-educator-l2",
    title: "Google Certified Educator Level 2",
    issuer: "Google for Education / Accredible",
    category: "EdTech & IT Infrastructure",
    verifyUrl:
      "https://edu.google.accredible.com/0e13555f-29b6-4400-97b3-fb468b1c0bce#acc.f4Cmt68l",
    skills: ["EdTech Tools", "Digital Pedagogy", "Google Workspace for Education"],
  },
  {
    id: "google-it-support",
    title: "Google IT Support Professional Certificate",
    issuer: "Google / Coursera",
    category: "EdTech & IT Infrastructure",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/3H7H5D7K1IRZ",
    skills: ["Technical Support", "Networking", "System Administration", "Security"],
  },
  {
    id: "google-workspace-admin",
    title: "Google Workspace Admin Training Workshop",
    issuer: "Google Workspace / University of San Agustin",
    category: "EdTech & IT Infrastructure",
    verifyUrl:
      "https://drive.google.com/file/d/1UOfgCAf5rW1WC9ZCIayYXuIfDyW5Z9UH/view",
    skills: ["Domain Administration", "User Provisioning", "Access Management"],
  },
];
