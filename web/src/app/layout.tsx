import "@/app/globals.css";

import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Atelier Resepsi",
  description: "Katalog vendor pernikahan yang elegan, hangat, dan mudah membantu client memilih.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="id">
      <body>
        <ThemeProvider>
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
