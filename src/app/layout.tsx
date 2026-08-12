import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";

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

// ===== SEO METADATA =====
export const metadata: Metadata = {
  metadataBase: new URL("https://www.rahuleventsnight.online"),
  title: {
    default: "RahulEventsNight — Jagran, Hanuman Aradhna, Track Singing, Wedding Events",
    template: "%s | RahulEventsNight",
  },
  description:
    "Book Jagran, Hanuman Aradhna, Mata Ki Chowki, Track Singing, Live Singing, Sangeet Night & Wedding Song Events. Professional live performances for every celebration. Call +91 97099 54777.",
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
    "Jagran singer Delhi",
    "event management Bihar",
    "Muzaffarpur events",
    "devotional singing India",
    "wedding singer Bihar",
    "book singer for jagran",
    "hanuman aradhna booking",
    "sangeet night singer",
    "bhajan singer near me",
    "religious event organizer",
  ],
  authors: [{ name: "RahulEventsNight", url: "https://www.rahuleventsnight.online" }],
  creator: "RahulEventsNight",
  publisher: "RahulEventsNight",
  category: "Event Management",
  alternates: {
    canonical: "https://www.rahuleventsnight.online",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.rahuleventsnight.online",
    siteName: "RahulEventsNight",
    title: "RahulEventsNight — Jagran, Hanuman Aradhna, Track Singing, Wedding Events",
    description:
      "Book Jagran, Hanuman Aradhna, Track Singing, Wedding Song Events. Professional live performances. Call +91 97099 54777.",
    images: [
      {
        url: "/images/hero/banner.jpg",
        width: 1200,
        height: 630,
        alt: "RahulEventsNight — Jagran, Hanuman Aradhna, Track Singing, Wedding Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RahulEventsNight — Jagran, Hanuman Aradhna, Track Singing",
    description:
      "Every Event, Every Emotion, One Stage. Book Jagran, Hanuman Aradhna, Track Singing, Wedding Events. Call +91 97099 54777.",
    images: ["/images/hero/banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ===== Structured Data (JSON-LD) =====
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.rahuleventsnight.online",
  name: "RahulEventsNight",
  alternateName: "राहुल इवेंट्स नाईट",
  description:
    "Professional event management specializing in Jagran, Hanuman Aradhna, Track Singing, Live Singing, Sangeet Night, and Wedding Song Events. Serving Delhi NCR and Bihar.",
  url: "https://www.rahuleventsnight.online",
  telephone: "+919709954777",
  whatsapp: "+917979962408",
  email: "officialrohit0201@gmail.com",
  image: "https://www.rahuleventsnight.online/images/hero/banner.jpg",
  logo: "https://www.rahuleventsnight.online/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Attardah Pokhariyapith near Ujjwal Vidyapith School",
    addressLocality: "Muzaffarpur",
    addressRegion: "Bihar",
    postalCode: "842002",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "26.1209",
    longitude: "85.3647",
  },
  areaServed: ["Delhi NCR", "Bihar", "Muzaffarpur", "Patna", "India"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1000",
  },
  sameAs: [
    "https://www.instagram.com/rahuleventsnight",
    "https://www.facebook.com/rahuleventsnight",
    "https://www.youtube.com/@rahuleventsnight",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Event Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Jagran" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hanuman Aradhna" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mata Ki Chowki" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Track Singing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Live Singing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sangeet Night" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Singing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bhajan Sandhya" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sundarkand Path" } },
    ],
  },
};

const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "RahulEventsNight Live Performances",
  description: "Live devotional and musical performances including Jagran, Hanuman Aradhna, Track Singing, and Wedding events.",
  organizer: {
    "@type": "Organization",
    name: "RahulEventsNight",
    url: "https://www.rahuleventsnight.online",
  },
  location: {
    "@type": "Place",
    name: "Delhi NCR & Bihar",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  },
};

// FAQ Schema for Google Rich Snippets
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does RahulEventsNight offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer Jagran, Hanuman Aradhna, Mata Ki Chowki, Sundarkand Path, Track Singing, Live Singing, Bollywood Night, Sufi Night, Sangeet Night, Wedding Singing, Bhajan Sandhya, and Live Band performances.",
      },
    },
    {
      "@type": "Question",
      name: "How can I book an event with RahulEventsNight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book by calling +91 97099 54777, WhatsApp +91 79799 62408, or filling the booking form on our website rahuleventsnight.online.",
      },
    },
    {
      "@type": "Question",
      name: "Which areas does RahulEventsNight serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We serve Delhi NCR, Bihar (Muzaffarpur, Patna), and nearby areas. We also travel for events across India.",
      },
    },
    {
      "@type": "Question",
      name: "What is the booking advance and cancellation policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Advance payment is required to confirm booking. Cancellation 15+ days before: 50% refund. 7-14 days: 25% refund. Within 7 days: No refund. Rescheduling allowed subject to availability.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide sound system and stage setup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide complete sound system, stage lighting, and decoration as part of our event package. Contact us for customized quotes.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="VT-5EtLYr65ZTB4rmhhoztN0pBzyVwwbw0IsNQGHN24" />
        {/* Bing verification */}
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        {/* Google Analytics - replace G-XXXXXXX with your tracking ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${tiroHindi.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
