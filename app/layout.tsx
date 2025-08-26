import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Another Level Cleaning Services | Jonesboro, AR",
  description: "Exterior cleaning pros in Northeast Arkansas: house washing, windows, roof, driveways, gutters. Fast quotes with AI estimator.",
  keywords: ["Jonesboro exterior cleaning","window cleaning NEA","pressure washing Jonesboro AR","roof wash","driveway cleaning","gutter cleaning"],
  openGraph: {
    title: "Another Level Cleaning Services",
    description: "Sparkling results across Northeast Arkansas. Try our AI estimator for instant pricing!",
    type: "website",
    locale: "en_US"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
