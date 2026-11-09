import { profile } from "@/data/portfolioData";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1080px] px-4 pb-10 pt-2 sm:px-6">
      <p className="border-t border-line pt-6 text-center font-mono text-xs text-muted">
        © {profile.name}
      </p>
    </footer>
  );
}
