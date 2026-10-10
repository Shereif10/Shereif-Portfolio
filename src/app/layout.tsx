import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import { contact, siteUrl } from "@/data";
import "./globals.css";

// Only the weights used on the site (400–900).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const title = "Shereif Ahmed Elswaf | Frontend Developer Portfolio";
const description =
  "Portfolio of Shereif Ahmed Elswaf, a Frontend Developer in Cairo, Egypt with 2+ years building production websites and web apps with React, Next.js, TypeScript and Shopify.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Shereif Elswaf Portfolio",
  authors: [{ name: contact.fullName, url: siteUrl }],
  creator: contact.fullName,
  keywords: [
    "Shereif Elswaf",
    "Shereif Ahmed Elswaf",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Shopify Developer",
    "Web Team Lead",
    "Cairo",
    "Egypt",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Shereif Elswaf Portfolio",
    title,
    description,
    locale: "en_US",
    firstName: "Shereif",
    lastName: "Elswaf",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-tertiary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
