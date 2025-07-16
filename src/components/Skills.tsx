'use client';

import React from 'react';


const devSkills = [
  { front: 'HTML', back: 'Language', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { front: 'CSS', back: 'Language', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { front: 'JAVASCRIPT', back: 'Language', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { front: 'C', back: 'Language', url: 'https://gcc.gnu.org/' },
  { front: 'C++', back: 'Language', url: 'https://isocpp.org/' },
  { front: 'JAVA', back: 'Language', url: 'https://www.oracle.com/java/' },
  { front: 'PYTHON', back: 'Language', url: 'https://www.python.org/' },
  { front: 'PHP', back: 'Language', url: 'https://www.php.net/' },
  { front: 'SQL', back: 'Language', url: 'https://www.mysql.com/' },
  { front: 'REACT', back: 'Library', url: 'https://reactjs.org/' },
  { front: 'TAILWIND', back: 'Framework', url: 'https://tailwindcss.com/' },
  { front: 'NODE JS', back: 'Runtime', url: 'https://nodejs.org/' },
  { front: 'NEXT JS', back: 'Framework', url: 'https://nextjs.org/' },
  { front: 'EXPRESS JS', back: 'Framework', url: 'https://expressjs.com/' },
  { front: 'MONGO DB', back: 'Database', url: 'https://www.mongodb.com/' },
  { front: 'GITHUB', back: 'Tool', url: 'https://github.com/' },
];

const designSkills = [
  { front: 'FIGMA', back: 'UI Tool', url: 'https://figma.com/' },
  { front: 'PHOTOSHOP', back: 'Raster', url: 'https://adobe.com/products/photoshop' },
  { front: 'ILLUSTRATOR', back: 'Vector', url: 'https://adobe.com/products/illustrator' },
  { front: 'CANVA', back: 'Quick Design', url: 'https://canva.com/' },
];

export default function Skills() {
  return (
    <section className="bg-[#212844] text-[#E6D5B7] px-8 pt-32 md:pt-64 pb-24">
      {/* Section Title */}
      <div className="flex items-start flex-row justify-between mb-54">
        <img src="/arrowdown.svg" alt="arrow" className="w-6 h-6 mt-1.5 md:mb-0" />
        <p className="text-right font-body text-xl font-medium max-w-md md:text-2xl text-[#E6D5B7]">
          Here are my skills that I have acquired<br />throughout the years
        </p>
      </div>

      {/* Skill Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Development */}
        <div>
          <h3 className="text-[46px] md:text-[50px] font-heading mb-4 text-[#E6D5B7]">DEVELOPMENT</h3>
          <div className="md:flex md:flex-wrap gap-3 grid grid-cols-2 w-full">
            {devSkills.map((skill, i) => (
                <a
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cube-wrapper-skills"
                key={i}
                >
                    <div className="cube-inner">
                        <div className="cube-face-skills cube-front">{skill.front}</div>
                        <div className="cube-face-skills cube-back">{skill.back}</div>
                    </div>
                </a>
            ))}
          </div>
        </div>
        

        {/* Right - Design */}
        <div>
          <h3 className="text-[50px] font-heading mb-4 text-[#E6D5B7]">DESIGN</h3>
          <div className="md:flex md:flex-wrap gap-3 grid grid-cols-2 w-full">
            {designSkills.map((skill, i) => (
                <a
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cube-wrapper-skills"
                key={i}
                >
                    <div className="cube-inner">
                        <div className="cube-face-skills cube-front">{skill.front}</div>
                        <div className="cube-face-skills cube-back">{skill.back}</div>
                    </div>
                </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
