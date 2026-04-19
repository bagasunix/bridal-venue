import "@/app/globals.css";

import type { Metadata, Viewport } from "next";

import { PwaRegistrar } from "@/components/pwa-registrar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Aurevia Wedding",
  description: "Pilihan vendor pernikahan yang elegan, ringkas, dan membantu Anda melangkah dengan lebih tenang.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aurevia Wedding",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#c89d56",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="id">
      <body>
        <ThemeProvider>
          <PwaRegistrar />
          <div className="min-h-screen">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
