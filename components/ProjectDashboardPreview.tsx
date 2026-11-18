import Image from "next/image";
import type { RecentProject } from "@/data/showcase";

export function ProjectDashboardPreview({ project }: { project: RecentProject }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-sunken">
      <Image
        src={project.image}
        alt={`${project.title} dashboard`}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover object-top transition-transform duration-300 group-hover/card:scale-[1.02]"
      />
    </div>
  );
}
