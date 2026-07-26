import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Space Uganda",
  description:
    "Uganda's umbrella home for space enthusiasts, educators, engineers, innovators, astronomers, and partner organisations."
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
