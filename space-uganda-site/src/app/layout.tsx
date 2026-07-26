import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://space.org.ug"),
  title: {
    default: "Space Uganda",
    template: "%s | Space Uganda"
  },
  description:
    "Uganda's umbrella home for space enthusiasts, educators, engineers, innovators, astronomers, and partner organisations.",
  openGraph: {
    title: "Space Uganda",
    description:
      "Uganda's umbrella home for space enthusiasts, educators, engineers, innovators, astronomers, and partner organisations.",
    url: "https://space.org.ug",
    siteName: "Space Uganda",
    images: [{ url: "/assets/uganda-space-week-2025-main.png", width: 1200, height: 630 }],
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
