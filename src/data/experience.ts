export type ExperienceImage = {
  src?: string;
  alt: string;
  position?: string;
};

export type ExperienceItem = {
  title: string;
  eyebrow: string;
  year: string;
  image: ExperienceImage;
  decorativeImages: ExperienceImage[];
  description: string[];
};

export type ExperienceCategory = {
  id: string;
  title: string;
  tag?: string;
  items: ExperienceItem[];
};

export const experienceCategories: ExperienceCategory[] = [
  {
    id: 'professional',
    title: 'Professional',
    items: [
      {
        title: 'Application Developer Intern',
        eyebrow: 'BCA · GSIT Application Development Lab',
        year: 'Aug 2026 - Present',
        image: {
          src: '/experience/bca_2_work.webp',
          alt: 'Team lunch with the BCA Application Development Lab',
          position: 'center 60%',
        },
        decorativeImages: [
          {
            src: '/experience/bca_1_work.webp',
            alt: 'Kenzi with his Application Development Lab lanyard',
            position: 'center 45%',
          },
          {
            src: '/experience/bca_3_work.webp',
            alt: 'Wisma 77 Tower, BCA office',
            position: 'center 45%',
          },
        ],
        description: [
          'Built frontend features for internal banking apps across 4 projects using Vue 3, TypeScript and Next.js, from new pages to API integration',
          'Worked in an Agile Scrum workflow with weekly sprint meetings across multiple teams, resolving SIT and UAT findings within each cycle',
          'Delivered Go backend features for an internal SIT/UAT test management platform, including structured logging with slog, transactional APIs, unit tests and Swagger docs',
        ],
      },
    ],
  },
  {
    id: 'organizational',
    title: 'Organizational',
    items: [
      {
        title: 'General Manager of Research and Development 2025/2026',
        eyebrow: 'HIMTI BINUS University',
        year: 'Mar 2025 - Feb 2026',
        image: {
          src: '/experience/gm_main_organizational.webp',
          alt: 'HIMTI BINUS University Research and Development',
        },
        decorativeImages: [
          { src: '/experience/gm_1_organizational.webp', alt: 'HIMTI BINUS University documentation 1' },
          { src: '/experience/gm_2_organizational.webp', alt: 'HIMTI BINUS University documentation 2' },
          { src: '/experience/gm_3_organizational.webp', alt: 'HIMTI BINUS University documentation 3' },
        ],
        description: [
          'Led the Creative & Design and Web Development divisions with 100+ members, ensuring projects aligned with the organization’s vision and goals',
          'Developed structured Agile workflows and maintained HIMTI BINUS University websites using Laravel, MySQL, and cPanel',
        ],
      },
      {
        title: 'Coordinator of Design and Documentation Team in HILET 2025',
        eyebrow: 'HIMTI BINUS University',
        year: 'Jan 2025 - Mar 2026',
        image: {
          src: '/experience/hilet_main_organizational_v2.webp',
          alt: 'HILET 2025 Design and Documentation Team',
        },
        decorativeImages: [
          { src: '/experience/hilet_1_organizational_v4.webp', alt: 'HILET 2025 documentation 1' },
          { src: '/experience/hilet_2_organizational.webp', alt: 'HILET 2025 documentation 2' },
          { src: '/experience/hilet_3_organizational.webp', alt: 'HILET 2025 documentation 3' },
        ],
        description: [
          'Led the Design and Documentation division, ensuring smooth collaboration, workflow, and timely completion of design tasks',
          'Managed a design team to create event branding materials, including the event logo and lanyard, for an event attended by 250+ students',
        ],
      },
      {
        title: 'Vice-Coordinator of the Design and Documentation Division in SESVENT 2024',
        eyebrow: 'HIMTI BINUS University',
        year: 'Sep 2024 - Nov 2024',
        image: {
          src: '/experience/sesvent_main_organizational.webp',
          alt: 'SESVENT 2024 Design and Documentation Division',
        },
        decorativeImages: [
          { src: '/experience/sesvent_1_organizational.webp', alt: 'SESVENT 2024 documentation 1' },
          { src: '/experience/sesvent_2_organizational.webp', alt: 'SESVENT 2024 documentation 2' },
          { src: '/experience/sesvent_3_organizational.webp', alt: 'SESVENT 2024 documentation 3' },
        ],
        description: [
          'Assisted in leading the Design and Documentation division by supervising task progress, providing feedback, and ensuring design quality',
          'Created key event materials, including the official guidebook and lanyard designs, while documenting the onsite event for archival and promotional use',
        ],
      },
    ],
  },
  {
    id: 'competitions',
    title: 'Competitions',
    tag: '+ AN AWARD!',
    items: [
      {
        title: 'Semi-Finalist',
        eyebrow: 'Samsung Innovation Campus Batch 6',
        year: '',
        image: { src: '/experience/sic_main_competition.webp', alt: 'Samsung Innovation Campus Batch 6' },
        decorativeImages: [
          { src: '/experience/sic_1_competition.webp', alt: 'Samsung Innovation Campus documentation 1' },
          { src: '/experience/sic_2_competition.webp', alt: 'Samsung Innovation Campus documentation 2' },
          { src: '/experience/sic_3_competition.webp', alt: 'Samsung Innovation Campus documentation 3' },
        ],
        description: [
          'Reached the semifinals (stage 4) of Samsung Innovation Campus Batch 6, an IoT & AI innovation competition with 10,000+ participants nationwide',
          'Developed a portable IoT-based air purifier integrated with an AI model to predict air quality and automatically activate the purifier when needed',
        ],
      },
      {
        title: '2nd Runner Up',
        eyebrow: 'COMPFEST 17 Game Jam',
        year: '',
        image: { src: '/experience/compfest_main_competition_v2.webp', alt: 'COMPFEST 17 Game Jam' },
        decorativeImages: [
          { src: '/experience/compfest_1_competition.webp', alt: 'COMPFEST 17 Game Jam documentation 1' },
          { src: '/experience/compfest_2_competition.webp', alt: 'COMPFEST 17 Game Jam documentation 2' },
          { src: '/experience/compfest_3_competition.webp', alt: 'COMPFEST 17 Game Jam documentation 3' },
        ],
        description: [
          'Won 3rd place at COMPFEST 17 Game Jam 2025 as part of team The Bumblebees',
          'Developed “Earthman,” an innovative game built with Godot, recognized for its strong concept and execution among competitors',
        ],
      },
    ],
  },
];