import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LogoIntro from "../components/LogoIntro";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    template: "%s | ConfideLeap",
    default: "Top Investor Relations Advisor | ConfideLeap",
  },
  description:
    "ConfideLeap specializes in Investor Relations, Digital Marketing & Public Relations, helping businesses enhance their market presence and build strong investor confidence.",
  keywords: ["investor relations", "IR advisory", "digital marketing", "public relations", "annual report", "podcast solutions", "India"],
  openGraph: {
    siteName: "ConfideLeap",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Manrope:wght@500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LogoIntro />
        <Navbar />
        <main style={{ paddingTop: "72px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
