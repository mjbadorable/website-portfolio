import { talksAndTraining } from "@/data/portfolioData";
import { TrainingContent } from "./TrainingContent";

const META = "font-mono text-[11px] uppercase tracking-[0.18em]";

// Server component on purpose: unpublished entries are filtered out here, so they
// are never serialized into the client bundle that powers the tabs.
export function TalksAndTraining() {
  const { trainingEnablementAreas, intro } = talksAndTraining;
  const events = talksAndTraining.confirmedTrainingEvents.filter(
    (e) => e.published,
  );

  return (
    <section
      id="talks"
      aria-labelledby="talks-heading"
      className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-canvas p-6 text-fg sm:mt-10 sm:p-10 lg:p-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_15%_0%,var(--glow),transparent_70%)]"
      />

      <div className="relative">
        <p className={`${META} text-muted`}>{intro.label}</p>
        <h2
          id="talks-heading"
          className="mt-4 max-w-[20ch] text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl"
        >
          {intro.headline}
        </h2>
        <p className="mt-5 max-w-[60ch] leading-relaxed text-fg-2">
          {intro.description}
        </p>

        <TrainingContent events={events} areas={trainingEnablementAreas} />
      </div>
    </section>
  );
}
