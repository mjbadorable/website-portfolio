import { MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { profile as site } from "@/data/portfolioData";
import { PressA } from "./Pressable";
import { CopyButton } from "./CopyButton";
import { SpotlightCard } from "./SpotlightCard";
import { Reveal } from "./Reveal";

const outlined =
  "inline-flex h-10 items-center rounded-lg border border-line bg-tint px-4 text-sm font-medium text-fg shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong hover:bg-surface-hover";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-canvas p-6 text-fg sm:mt-10 sm:p-10 lg:p-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_15%_100%,var(--glow),transparent_70%)]"
      />
      <div className="relative grid grid-cols-12 gap-8 lg:gap-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Initiate workflow · Partnership &amp; contact
          </p>
          <h2
            id="contact-heading"
            className="mt-4 text-4xl font-medium leading-[1.06] tracking-[-0.04em] md:text-5xl"
          >
            Have a workflow to automate, a tool to build,{" "}
            <span className="text-muted">or just want to connect?</span>
          </h2>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal>
            <SpotlightCard className="p-6 sm:p-8" innerClassName="flex flex-col">
              <p className="mb-5 inline-flex w-fit max-w-full items-center gap-2.5 rounded-full border border-line bg-tint py-1.5 pl-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-2">
                <span className="relative flex size-2 shrink-0">
                  <span
                    aria-hidden="true"
                    className="absolute inline-flex size-full rounded-full bg-ok opacity-75 motion-safe:animate-ping"
                  />
                  <span
                    aria-hidden="true"
                    className="relative inline-flex size-2 rounded-full bg-ok"
                  />
                </span>
                {site.availability}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <div className="min-w-0 max-w-full overflow-x-auto whitespace-nowrap">
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-mono text-sm tracking-tight text-fg underline decoration-line-strong underline-offset-8 transition-colors hover:text-fg hover:decoration-line-strong min-[420px]:text-base sm:text-lg md:text-xl"
                  >
                    {profile.email}
                  </a>
                </div>
                <CopyButton text={profile.email} />
              </div>

              <ul className="mt-7 flex flex-wrap gap-3">
                {profile.links.map((link) => (
                  <li key={link.label}>
                    <PressA
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={outlined}
                    >
                      {link.label}
                      <span aria-hidden="true" className="ml-1.5">
                        ↗
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </PressA>
                  </li>
                ))}
              </ul>

              <p className="mt-7 flex w-fit max-w-full items-start gap-2 rounded-2xl border border-line bg-tint px-3.5 py-1.5 text-[13px] leading-snug text-fg-2">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-3.5 shrink-0 text-fg-2"
                />
                <span>
                  Iloilo City, Philippines (UTC+8) · Typical response time: &lt;
                  24 hours
                </span>
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
