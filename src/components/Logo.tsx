'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="relative block w-20 h-10 sm:w-20 sm:h-10 md:w-24 md:h-12 group z-20">
      {/* Outline Logo */}
      <Image
        src="/logo-outline.svg"
        alt="Logo Outline"
        fill
        className="object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
      />
      {/* Filled Logo */}
      <Image
        src="/logo-filled.svg"
        alt="Logo Filled"
        fill
        className="object-contain transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
      />
    </Link>
  );
}