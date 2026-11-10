import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
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

const title = `${profile.name} — Computer Engineer & AI Systems Builder`;
const description =
  "Computer Engineer building software, intelligent systems, and meaningful digital experiences across educational technology, full-stack web platforms, and automated workflows.";

export const metadata: Metadata = {
  // Falls back to the live Vercel URL; set NEXT_PUBLIC_SITE_URL once a custom domain is attached.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://website-portfolio-rho-amber.vercel.app",
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
        <Analytics />
      </body>
    </html>
  );
}
