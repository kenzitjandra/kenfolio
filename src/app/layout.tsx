import type { Metadata } from "next";
import { Anton, Manrope } from 'next/font/google';
import "./globals.css";
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
  title: 'Kenzi Tjandra | Developer and Designer',
  description:
    'Personal portfolio of Kenzi Erico Tjandra — showcasing projects, experience, publications, and web development work.',
  metadataBase: new URL('https://itskenz.vercel.app'),
  openGraph: {
    title: 'Kenzi Tjandra | Portfolio',
    description:
      'Explore my projects, experience, publications, and web development journey.',
    url: 'https://itskenz.vercel.app',
    siteName: 'Kenzi Tjandra Portfolio',
    images: [
      {
        url: '/main_page_ss.png',
        width: 1200,
        height: 630,
        alt: 'Kenfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
