import type { Metadata } from "next";
import { Inter,Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keerthi Teja M | GIS Portfolio",
  description: "Portfolio of Keerthi Teja M featuring GIS, remote sensing, spatial analysis, and geospatial data science projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}${manrope.variable}`}>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
