'use client';

import { useEffect, useState } from 'react';

export default function VideoIntro({ onFinish }: { onFinish: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [visible, setVisible] = useState(true); // for triggering opacity change

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // start fade out
      setTimeout(() => {
        setIsPlaying(false); // remove from DOM
        onFinish();
      }, 700); // match the transition duration
    }, 8000); // adjust based on video length

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    isPlaying && (
      <div
        className={`fixed inset-0 z-[999] bg-black transition-opacity duration-700 flex items-center justify-center ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => {
            setVisible(false);
            setTimeout(() => {
              setIsPlaying(false);
              onFinish();
            }, 700);
          }}
        >
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  );
}
