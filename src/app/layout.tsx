import type { Metadata } from "next";
import { Montserrat, Nunito_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TradeBanner from "@/components/layout/TradeBanner";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gopackagingproducts.vercel.app/"), 
  
  title: "GoPackagingProducts | UK Packaging Supplies",
  description:
    "Buy cardboard boxes, bubble wrap, mailing bags, pallet wrap and trade packaging supplies online.",
  
  keywords: [
    "packaging supplies UK",
    "cardboard boxes",
    "bubble wrap",
    "mailing bags",
    "pallet wrap",
    "trade packaging",
    "GoPackaging",
  ],

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "GoPackagingProducts | Premium UK Packaging Supplies",
    description: "Buy cardboard boxes, bubble wrap, mailing bags, pallet wrap and trade packaging supplies online.",
    url: "/",
    siteName: "GoPackagingProducts",
    images: [
      {
        url: "/fullname.png", 
        width: 1200,
        height: 630,
        alt: "GoPackagingProducts Official Banner",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GoPackagingProducts | UK Packaging Supplies",
    description: "Buy cardboard boxes, bubble wrap, mailing bags, pallet wrap and trade packaging supplies online.",
    images: ["/fullname.png"], 
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
        className={`${montserrat.variable} ${nunitoSans.variable} bg-[var(--background)] text-[var(--text-main)] antialiased`}
      >
        <Toaster position="top-right" />
        <TopBar />
        <Header />
        <TradeBanner />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}