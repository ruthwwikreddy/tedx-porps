import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { EVENT_CONFIG } from "@/data/event";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#eb0028",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${EVENT_CONFIG.name} | ${EVENT_CONFIG.dateText}`,
  description: `${EVENT_CONFIG.name} — ${EVENT_CONFIG.tagline} Taking place on ${EVENT_CONFIG.dateText} at ${EVENT_CONFIG.venue.name}.`,
  keywords: [
    "TEDx",
    "TEDxPORPS",
    "PORPS YOUTH",
    "TEDx Hyderabad",
    "Ideas Worth Spreading",
    "Youth Conference",
    "Student Innovation",
    "21 November"
  ],
  authors: [{ name: "TEDx PORPS YOUTH Organizing Committee" }],
  creator: "TEDx PORPS YOUTH",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tedxporps.com",
    title: `${EVENT_CONFIG.name} | ${EVENT_CONFIG.dateText}`,
    description: `${EVENT_CONFIG.name} — ${EVENT_CONFIG.tagline}`,
    siteName: EVENT_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${EVENT_CONFIG.name} Banner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT_CONFIG.name} | ${EVENT_CONFIG.dateText}`,
    description: `${EVENT_CONFIG.name} — ${EVENT_CONFIG.tagline}`,
    images: ["/og-image.jpg"],
    creator: "@tedxporps",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": EVENT_CONFIG.name,
    "startDate": EVENT_CONFIG.eventDateISO,
    "endDate": EVENT_CONFIG.eventDateISO,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": EVENT_CONFIG.venue.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Road No. 25, Jubilee Hills",
        "addressLocality": "Hyderabad",
        "postalCode": "500033",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    "description": EVENT_CONFIG.tagline,
    "organizer": {
      "@type": "Organization",
      "name": EVENT_CONFIG.name,
      "url": "https://tedxporps.com"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0d0d0f] text-neutral-100 font-sans selection:bg-[#eb0028] selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
