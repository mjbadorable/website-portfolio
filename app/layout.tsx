import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeAndMotionProvider } from "@/components/ThemeAndMotionProvider";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} — AI Systems Builder & Full-Stack Automation Engineer`;
const description =
  "Computer engineer and AI systems builder developing resilient full-stack web platforms, deterministic workflow automations, and educational technology enablement.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL in Vercel to the final domain.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  icons: {
    icon: "/marvin.jpg",
    shortcut: "/marvin.jpg",
    apple: "/marvin.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

// Runs before first paint so a saved theme / motion choice never flashes.
const initScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme"),m=localStorage.getItem("motion");if(t==="paper")d.dataset.theme="paper";if(m==="off"||(m===null&&window.matchMedia("(prefers-reduced-motion: reduce)").matches))d.dataset.motion="off"}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="obsidian"
      data-motion="on"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-fg transition-colors duration-300">
        <ThemeAndMotionProvider>
          <a
            href="#main"
            className="sr-only z-[80] rounded-md bg-accent px-3 py-2 text-sm text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Header />
          <main
            id="main"
            className="mx-auto w-full max-w-[1080px] flex-1 px-4 py-6 sm:px-6 sm:py-10"
          >
            {children}
          </main>
          <Footer />
        </ThemeAndMotionProvider>
      </body>
    </html>
  );
}
