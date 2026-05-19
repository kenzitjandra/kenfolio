import Image from 'next/image';

const researchUrl = 'https://ieeexplore.ieee.org/document/11213607';

export default function Publication() {
  return (
    <section className="relative bg-transparent px-5 py-20 text-[#212844] md:min-h-[118vh] md:px-[2vw] md:py-[5.6vh]">
        {/* Desktop Publication Layout */}
        <div className="relative hidden min-h-[106vh] md:block">
            {/* Top title */}
            <div className="flex items-end">
                <h2 className="font-heading text-[clamp(4rem,6vw,8rem)] uppercase leading-none text-[#212844]">
                    Publication
                </h2>

                <p className="mb-[0.2vw] ml-[18vw] max-w-[26rem] font-body text-[clamp(1rem,1.35vw,1.6rem)] font-black uppercase leading-tight text-[#212844]">
                    One paper in,
                    <br />
                    more curiosity loading
                </p>
            </div>

            {/* Main publication content */}
            <div className="absolute left-0 top-[42vh] flex w-full items-center gap-[2vw]">
                {/* Clickable publication image */}
                <a
                    href={researchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open research website"
                    className="group relative block h-[28vh] w-[26vw] shrink-0 overflow-hidden bg-[#D9D9D9]"
                >
                    <Image
                    src="/publication/publication_img.webp"
                    alt="AiDAS publication preview"
                    fill
                    sizes="26vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={false}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[#212844]/0 transition-colors duration-300 group-hover:bg-[#212844]/10" />
                </a>

                {/* Text content */}
                <div className="max-w-[70vw]">
                    <p className="mb-1 font-body text-[clamp(1.05rem,1.4vw,1.75rem)] font-black leading-tight text-[#8B8B8B]">
                    2025 6th International Conference on Artificial Intelligence and Data Sciences (AiDAS)
                    </p>

                    <h3 className="max-w-[68vw] font-heading text-[clamp(1.5rem,1.85vw,2.35rem)] uppercase leading-none text-[#212844]">
                    Analyzing Key LinkedIn Profile Factors for Securing Employment with Leading Roles
                    </h3>

                    <p className="mt-5 max-w-[64vw] text-justify font-body text-[clamp(0.9rem,1vw,1.15rem)] font-semibold leading-snug text-[#212844]">
                    This research that we have conducted analyzes which LinkedIn profile factors are most
                    associated with securing high-level employment roles. Utilizing machine learning models
                    and SHAP explainability, we found that recommendations, interests, experiences, and
                    connections were more influential than popularity-based metrics such as follower count.
                    The findings provide practical insights for professionals seeking to optimize their
                    LinkedIn profiles and improve their career visibility.
                    </p>
                </div>
            </div>

            {/* Bottom note */}
            <p className="absolute bottom-[7vh] left-1/2 -translate-x-1/2 font-body text-[clamp(1rem,1.35vw,1.6rem)] font-black uppercase text-[#8B8B8B]">
                Hopefully more to come :D
            </p>
        </div>

        {/* Mobile Publication Layout */}
        <div className="flex flex-col md:hidden">
            <div className="border-t border-[#EF8A76]/70 pt-6">
                <p className="font-body text-[13px] font-black uppercase tracking-[0.18em] text-[#8B8B8B]">
                    Published Research
                </p>

                <h2 className="mt-3 font-heading text-[58px] uppercase leading-[0.9] text-[#212844]">
                    Publication
                </h2>

                <p className="mt-4 max-w-[18rem] font-body text-[18px] font-black uppercase leading-tight text-[#212844]">
                    One paper in,
                    <br />
                    more curiosity loading
                </p>
            </div>

            <a
            href={researchUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open research website"
            className="group relative mt-10 block w-full overflow-hidden rounded-md bg-[#D9D9D9]"
            >
                <Image
                    src="/publication/publication_img.webp"
                    alt="AiDAS publication preview"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={false}
                />

                <div className="pointer-events-none absolute inset-0 bg-[#212844]/0 transition-colors duration-300 group-hover:bg-[#212844]/10" />
            </a>

            <div className="mt-8">
                <p className="font-body text-[14px] font-black leading-snug text-[#8B8B8B]">
                    2025 6th International Conference on Artificial Intelligence and Data Sciences (AiDAS)
                </p>

                <h3 className="mt-3 font-heading text-[30px] uppercase leading-[0.95] text-[#212844]">
                    Analyzing Key LinkedIn Profile Factors for Securing Employment with Leading Roles
                </h3>

                <p className="mt-5 text-justify font-body text-[15px] font-semibold leading-[1.65] text-[#212844]">
                    This research that we have conducted analyzes which LinkedIn profile factors are most
                    associated with securing high-level employment roles. Utilizing machine learning models
                    and SHAP explainability, we found that recommendations, interests, experiences, and
                    connections were more influential than popularity-based metrics such as follower count.
                    The findings provide practical insights for professionals seeking to optimize their
                    LinkedIn profiles and improve their career visibility.
                </p>

                <a
                    href={researchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex border border-[#EF8A76] px-4 py-3 font-body text-[12px] font-black uppercase tracking-[0.12em] text-[#212844] transition-colors duration-300 hover:bg-[#EF8A76]"
                >
                    View Publication
                </a>
            </div>

            <p className="mt-16 text-center font-body text-[18px] font-black uppercase text-[#8B8B8B]">
                Hopefully more to come :D
            </p>
        </div>
    </section>
  );
}