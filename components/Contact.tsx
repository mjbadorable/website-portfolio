import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mt-12 sm:mt-16"
    >
      <h2
        id="contact-heading"
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        <span aria-hidden="true" className="text-primary">
          05 /{" "}
        </span>
        Initiate workflow: partnership &amp; contact
      </h2>
      <Reveal>
        <div className="mt-5 rounded-xl bg-primary p-6 text-white shadow-card sm:p-10 lg:p-14">
          <a
            href={`mailto:${profile.email}`}
            className="block text-[clamp(1.125rem,4.6vw,3rem)] font-semibold leading-tight tracking-tight [overflow-wrap:anywhere] underline decoration-white/40 underline-offset-8 transition-colors hover:decoration-white focus-visible:outline-white"
          >
            {profile.email}
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
            {profile.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 underline-offset-4 hover:text-white hover:underline focus-visible:outline-white"
                >
                  {link.label} ↗
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
