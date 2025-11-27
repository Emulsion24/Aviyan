// app/layout.js
import "./globals.css";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Gau Samman Ahvaan Abhiyan",
  description:
    "Gau Samman Ahvaan Abhiyan is dedicated to cow protection, awareness, and promoting traditional Indian values. Join our mission to support Gau Seva, sustainability, and cultural heritage.",

  keywords: [
    "Gau Samman Ahvaan Abhiyan",
    "Cow protection",
    "Gau Seva",
    "Indian culture",
    "Gau Mata",
    "Cow welfare",
    "Goshalas",
    "Cow donation",
    "Sanatan Dharma",
    "Indian traditions",
    "Ahvaan Abhiyan",
    "Gau Samman"
  ],

  metadataBase: new URL("https://www.gausamman.cloud"),

  alternates: {
    canonical: "https://www.gausamman.cloud",
  },

  openGraph: {
    title: "Gau Samman Ahvaan Abhiyan – Cow Protection & Cultural Awareness",
    description:
      "Join Gau Aviyan to support cow protection, Gau Seva initiatives, and spread awareness for Indian cultural heritage.",
    url: "https://www.gausamman.cloud",
    siteName: "Gau Samman Ahvaan Abhiyan",
    images: [
      {
        url: "/logo.jpg", // replace with your image
        width: 1200,
        height: 630,
        alt: "Gau Samman Ahvaan Abhiyan",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gau Samman Ahvaan Abhiyan – Empowering Cow Protection",
    description:
      "A mission to promote cow protection, Gau Seva, & Indian values.",
    images: ["/og-image.jpg"], // same image as OG
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        {/* Favicon & Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google Structured Data for Logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Gau Samman Ahvaan Abhiyan",
              url: "https://www.gausamman.cloud/",
              logo: "https://gauaviyan.com/logo.jpg", // ← replace with your real logo
            }),
          }}
        />

      </head>

      <body className="bg-white text-gray-900 antialiased">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
