import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { PageTitle } from "@/components/PageTitle";
import { ProfessionalJournal } from "@/components/ProfessionalJournal";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <>
      <PageTitle label="[ Experience ]">Experience.</PageTitle>
      <ExperienceTimeline />
      <ProfessionalJournal />
    </>
  );
}
