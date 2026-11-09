import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { TalksAndTraining } from "@/components/TalksAndTraining";

export const metadata: Metadata = { title: "Training" };

export default function TrainingPage() {
  return (
    <>
      <PageTitle label="[ Training ]">Training.</PageTitle>
      <TalksAndTraining />
    </>
  );
}
