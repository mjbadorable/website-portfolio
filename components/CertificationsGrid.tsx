import { ArrowUpRight } from "lucide-react";
import { CertificationLogo } from "@/components/CertificationLogo";
import {
  certificationCategories,
  certifications,
} from "@/data/certifications";

const META = "font-mono text-xs uppercase tracking-[0.14em]";

export function CertificationsGrid() {
  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="py-10 text-fg lg:py-14"
    >
      <p className="max-w-[62ch] leading-relaxed text-fg-2">
        Industry and academic certifications in AI, cloud infrastructure,
        software testing, and educational technology — each verifiable at its
        issuing source.
      </p>

      <div className="mt-12 space-y-14">
        {certificationCategories.map((category, i) => {
          const items = certifications.filter((c) => c.category === category);
          if (items.length === 0) return null;
          const id = `certs-${i + 1}`;
          return (
            <section key={category} aria-labelledby={id}>
              <div className="flex items-center gap-4">
                <h2 id={id} className={`${META} text-fg-2`}>
                  {String(i + 1).padStart(2, "0")} {"//"} {category}
                </h2>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>

              <ul className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((cert) => (
                  <li
                    key={cert.id}
                    className="lift flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-line-strong"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-tint text-fg shadow-[inset_0_1px_0_0_var(--highlight)]">
                        <CertificationLogo id={cert.id} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                          {cert.issuer}
                        </p>
                        <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight text-fg">
                          {cert.title}
                        </h3>
                      </div>
                    </div>

                    <ul aria-label="Skills" className="mt-4 flex flex-wrap gap-1.5">
                      {cert.skills.map((s) => (
                        <li
                          key={s}
                          className="rounded border border-line bg-tint px-2 py-0.5 font-mono text-xs text-fg-2"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-xs text-muted transition-colors hover:text-fg"
                    >
                      Verify credential
                      <ArrowUpRight aria-hidden="true" className="size-3" />
                      <span className="sr-only">
                        for {cert.title} (opens in a new tab)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
