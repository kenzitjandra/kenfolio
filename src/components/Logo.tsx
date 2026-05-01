'use client';

import Image from 'next/image';

type LogoProps = {
  className?: string;
  outlineSrc?: string;
  filledSrc?: string;
  alt?: string;
  priority?: boolean;
};

export default function Logo({
  className = 'h-full w-full',
  outlineSrc = '/logo-outline.svg',
  filledSrc = '/logo-filled.svg',
  alt = 'Logo',
  priority = false,
}: LogoProps) {
  return (
    <div className={`relative block ${className} group`}>
      <Image
        src={outlineSrc}
        alt={`${alt} Outline`}
        fill
        priority={priority}
        className="object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
      />

      <Image
        src={filledSrc}
        alt={`${alt} Filled`}
        fill
        priority={priority}
        className="object-contain opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
      />
    </div>
  );
}