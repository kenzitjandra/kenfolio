'use client';

export default function About() {
  return (
    <section className="bg-[#212844] text-[#E6D5B7] px-8 pt-15 pb-80">
      
      {/* Top Divider Line */}
      <div className="border-t border-[#EF8A76] w-full mb-12" />

      {/* Heading Block */}
      <div className="flex flex-col items-start gap-2 pt-[200px]">
        <p className="text-[20px] opacity-50 text-[#E6D5B7] font-body font-semibold">
          GET TO KNOW MORE
        </p>
        
        <div className="flex items-center gap-4">
          <h2 className="text-[100px] font-heading leading-none uppercase">
            About Me
          </h2>
          <img src="/arrowdown.svg" alt="Arrow Icon" className="pl-[15px] w-[85px] h-[85px]"/>
        </div>
      </div>
    </section>
  );
}
