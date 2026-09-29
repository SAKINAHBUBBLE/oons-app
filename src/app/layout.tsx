import type { Metadata, Viewport } from "next";
import { Nunito, Caveat, Fredoka, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { AppLaunchSplash } from "@/components/splash/AppLaunchSplash";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Oons App",
  description: "Oons App",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Oons App",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16264a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${nunito.variable} ${caveat.variable} ${fredoka.variable} ${fraunces.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/brand/oons-logo-primary.svg" type="image/svg+xml" />
      </head>
      <body>
        <AppLaunchSplash />
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
