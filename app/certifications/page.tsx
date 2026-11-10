import type { Metadata } from "next";
import { CertificationsGrid } from "@/components/CertificationsGrid";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Verifiable credentials across AI, cloud systems, software engineering, and educational technology.",
};

export default function CertificationsPage() {
  return (
    <>
      <PageTitle label="[ Credentials ]">Certifications.</PageTitle>
      <CertificationsGrid />
    </>
  );
}
