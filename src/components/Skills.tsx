'use client';

import SkillPopover from '@/components/SkillPopover';
import { designSkills, devSkills, getSkill } from '@/data/skills';

function SkillCube({ name }: { name: string }) {
  const skill = getSkill(name);

  return (
    <SkillPopover name={name} buttonClassName="cube-wrapper-skills block">
      <div className="cube-inner">
        <div className="cube-face-skills cube-front uppercase">{skill?.name ?? name}</div>
        <div className="cube-face-skills cube-back">{skill?.category ?? ''}</div>
      </div>
    </SkillPopover>
  );
}

export default function Skills() {
  return (
    <section className="bg-[#212844] text-[#E6D5B7] px-8 pt-32 md:pt-64 pb-24">
      {/* Section Title */}
      <div className="flex items-start flex-row justify-between mb-54">
        <img src="/arrowdown.svg" alt="arrow" className="w-6 h-6 mt-1.5 md:mb-0" />
        <p className="text-right font-body text-xl font-medium md:text-2xl text-[#F0E8D5]">
          Here are some skills that I have
          <br />
          acquired throughout the years
          <span className="mt-2 block text-sm font-semibold text-[#F0E8D5]/50 md:text-base">
            <span className="hidden md:inline">hint: hover over them!</span>
            <span className="md:hidden">hint: tap them!</span>
          </span>
        </p>
      </div>

      {/* Skill Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Development */}
        <div>
          <h3 className="text-[46px] md:text-[50px] font-heading mb-4 text-[#F0E8D5]">DEVELOPMENT</h3>
          <div className="md:flex md:flex-wrap gap-3 grid grid-cols-2 w-full">
            {devSkills.map((name) => (
              <SkillCube key={name} name={name} />
            ))}
          </div>
        </div>

        {/* Right - Design */}
        <div>
          <h3 className="text-[50px] font-heading mb-4 text-[#F0E8D5]">DESIGN</h3>
          <div className="md:flex md:flex-wrap gap-3 grid grid-cols-2 w-full">
            {designSkills.map((name) => (
              <SkillCube key={name} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}