import { AutomationSpine } from "@/components/AutomationSpine";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkflowSimulator } from "@/components/WorkflowSimulator";
import { Work } from "@/components/Work";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1080px] px-4 py-6 sm:px-6 sm:py-10">
        <Hero />
        <AutomationSpine />
        <Work />
        <WorkflowSimulator />
        <Contact />
        <p className="mt-10 text-center font-mono text-xs text-muted">
          © {profile.name}
        </p>
      </main>
    </>
  );
}
