import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const tiroHindi = Tiro_Devanagari_Hindi({
  variable: "--font-tiro-devanagari",
  subsets: ["devanagari"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "RahulEventsNight — Jagran, Hanuman Aradhna, Track Singing, Wedding Events",
  description:
    "RahulEventsNight — Every Event, Every Emotion, One Stage. Book Jagran, Hanuman Aradhna, Mata Ki Chowki, Track Singing, Live Singing, Sangeet Night, Wedding Singing. Call 9709954777.",
  keywords: [
    "Jagran",
    "Hanuman Aradhna",
    "Mata Ki Chowki",
    "Track Singing",
    "Live Singing",
    "Sangeet Night",
    "Wedding Singing",
    "Bhajan Sandhya",
    "Sundarkand Path",
    "RahulEventsNight",
    "event management Delhi",
  ],
  authors: [{ name: "RahulEventsNight" }],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "RahulEventsNight — Jagran, Hanuman Aradhna, Track Singing",
    description: "Every Event, Every Emotion, One Stage. Book your event: 9709954777",
    siteName: "RahulEventsNight",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RahulEventsNight",
    description: "Jagran, Hanuman Aradhna, Track Singing, Wedding Events",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${tiroHindi.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
