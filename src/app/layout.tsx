import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import "@/app/globals.css";

const display = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Transbordo Cloud",
  description: "Industrial operations SaaS for governed event tracking and shift intelligence."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${display.variable} ${body.variable}`} lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
