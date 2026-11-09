import { profile } from "@/data/profile";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-[1080px] items-center justify-between px-4 sm:px-6">
        <span className="text-[15px] font-semibold tracking-tight">
          {profile.name}
        </span>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
