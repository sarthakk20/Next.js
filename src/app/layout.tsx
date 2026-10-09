import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentication Using Next.js",
  description: "This is a authentication website using Next.js, MongoDB.",

  authors: [
    {
      name: "Sarthak Sonawane",
    },
  ],

  creator: "Sarthak Sonawane",

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Authentication Using Next.js",
    description:
      "Showcasing modern full-stack web applications, full-stack projects, and responsive user experiences built with the MERN Stack and Next.js.",
    siteName: "Authentication Using Next.js",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Auth using next.js",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sarthak Sonawane | Full Stack Developer",
    description:
      "Explore my portfolio showcasing modern full-stack web applications and projects.",
    images: ["/myimg1.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <h1>Header</h1> */}
        {children}
        <Toaster position="top-center" 
        toastOptions={{
        duration: 2000,
        style: {
          background: '#333',
          color: '#fff',
        },
        }} />
      </body>
    </html>
  );
}
