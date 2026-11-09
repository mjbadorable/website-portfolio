import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { ProjectWorkspace } from "@/components/ProjectWorkspace";
import { TechStackAndProjects } from "@/components/TechStackAndProjects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageTitle label="[ Projects ]">Projects.</PageTitle>
      <ProjectWorkspace />
      <TechStackAndProjects />
    </>
  );
}
