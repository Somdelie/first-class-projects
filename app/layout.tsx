import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "First Class Projects & Unwabu Painting | SA",
  description:
    "Leading construction and industrial coatings specialists in South Africa since 1988. Expert painting contractors, protective coatings, and project management services. 35+ years of excellence.",
  keywords: [
    "construction South Africa",
    "industrial coatings",
    "painting contractors",
    "Unwabu Painting",
    "protective coatings",
    "project management",
    "commercial painting",
    "industrial painting",
    "First Class Projects",
    "South African contractors",
    "building maintenance",
    "surface preparation",
    "coating specialists",
  ],
  authors: [{ name: "First Class Projects with Unwabu Painting" }],
  creator: "First Class Projects with Unwabu Painting",
  publisher: "First Class Projects with Unwabu Painting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://firstclassprojects.co.za"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "First Class Projects & Unwabu Painting | SA",
    description:
      "Leading construction and industrial coatings specialists in South Africa since 1988. 35+ years of excellence in painting and protective coatings.",
    url: "https://firstclassprojects.co.za",
    siteName: "First Class Projects with Unwabu Painting",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "First Class Projects with Unwabu Painting - Premium Construction Services",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Class Projects & Unwabu Painting | SA",
    description:
      "Leading construction and industrial coatings specialists in South Africa since 1988. 35+ years of excellence.",
    images: ["/og-image.jpg"],
    creator: "@firstclassprojects",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "construction",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-950 dark:text-gray-100`}
      >
        <ClientLayout>
          <main className="">{children}</main>

          <Analytics />

          <Toaster />
        </ClientLayout>
      </body>
    </html>
  );
}
