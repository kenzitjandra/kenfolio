import type { Metadata } from "next";
import { Anton, Manrope } from 'next/font/google';
import "./globals.css";
import Navbar from '@/components/Navbar';
import LenisProvider from './providers/LenisProvider'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kenzi Erico Tjandra - Developer and Designer",
  description: "Showcasing the skills and projects of Kenzi Erico Tjandra",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${manrope.variable}`}>
        <Navbar />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
