import { projects } from './projects';

export type Skill = {
  name: string;
  category: string;
  url?: string;
  description?: string;
};

export const normalizeSkillName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9+#]/g, '');

export const skills: Skill[] = [
  /* ---------- Development ---------- */
  {
    name: 'HTML',
    category: 'Language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    description:
      'The first web language I ever learned (like most of us webdevs hehe), and still the base of every web project I build.',
  },
  {
    name: 'CSS',
    category: 'Language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    description:
      'Responsive layouts and styling. This is where my obsession with front-end design started.',
  },
  {
    name: 'JavaScript',
    category: 'Language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    description:
      'Brings my vanilla web projects to life, and the foundation of everything I build with React and Node.',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    url: 'https://www.typescriptlang.org/',
    description:
      'Typed API responses and stores in production Vue and Next.js codebases during my BCA internship.',
  },
  {
    name: 'C',
    category: 'Language',
    url: 'https://gcc.gnu.org/',
    description:
      'Where I learned the fundamentals at university, solving coding exercises and getting comfortable with memory management.',
  },
  {
    name: 'C++',
    category: 'Language',
    url: 'https://isocpp.org/',
    description:
      'Picked it up at university to dig deeper into memory management and lower-level programming.',
  },
  {
    name: 'Java',
    category: 'Language',
    url: 'https://www.oracle.com/java/',
    description:
      'My introduction to object-oriented programming at university.',
  },
  {
    name: 'Python',
    category: 'Language',
    url: 'https://www.python.org/',
    description:
      'My main language for machine learning and computer vision, and my current favorite to write.',
  },
  {
    name: 'Go',
    category: 'Language',
    url: 'https://go.dev/',
    description:
      'The backend language I use daily at my BCA internship, building services, controllers and APIs.',
  },
  {
    name: 'PHP',
    category: 'Language',
    url: 'https://www.php.net/',
    description: "Maintained and updated HIMTI BINUS University's Laravel websites.",
  },
  {
    name: 'SQL',
    category: 'Language',
    url: 'https://www.mysql.com/',
    description: 'Managed the MySQL databases behind the HIMTI BINUS University websites.',
  },
  {
    name: 'React',
    category: 'Library',
    url: 'https://react.dev/',
    description:
      'Component-based UIs with hooks and animation libraries. This portfolio is built on it.',
  },
  {
    name: 'Vue.js',
    category: 'Framework',
    url: 'https://vuejs.org/',
    description:
      'The framework behind one of my projects at my BCA internship, from building pages to wiring up APIs.',
  },
  {
    name: 'Tailwind',
    category: 'Framework',
    url: 'https://tailwindcss.com/',
    description:
      'My go-to for styling. Every section of this portfolio uses it, and so do my ongoing web projects.',
  },
  {
    name: 'Node.js',
    category: 'Runtime',
    url: 'https://nodejs.org/',
    description: "Powers Trakr's backend API.",
  },
  {
    name: 'Next.js',
    category: 'Framework',
    url: 'https://nextjs.org/',
    description:
      'The framework behind this portfolio (deployed on Vercel), and one I also use on a project at my BCA internship. A personal favorite.',
  },
  {
    name: 'Express.js',
    category: 'Framework',
    url: 'https://expressjs.com/',
    description: "Built Trakr's REST API, connecting the Flutter app to MongoDB.",
  },
  {
    name: 'MongoDB',
    category: 'Database',
    url: 'https://www.mongodb.com/',
    description:
      "Stores and structures Trakr's expense data. I've also worked with it on an internal project at my BCA internship.",
  },
  {
    name: 'GitHub',
    category: 'Tool',
    url: 'https://github.com/kenzitjandra',
    description:
      'Version control, hosting and collaboration for all my personal and university projects.',
  },
  {
    name: 'GitLab',
    category: 'Tool',
    url: 'https://gitlab.com/',
    description: 'Version control for my team projects at my BCA internship.',
  },

  /* ---------- Design ---------- */
  {
    name: 'Figma',
    category: 'UI Tool',
    url: 'https://figma.com/',
    description:
      'Where my UI/UX ideas take shape: this portfolio, web projects in progress, and plenty of design work for student organizations.',
  },
  {
    name: 'Photoshop',
    category: 'Raster',
    url: 'https://www.instagram.com/kendesignsforfun/',
    description:
      'Photo editing and poster design for my personal projects. Check out @kendesignsforfun on Instagram, with more coming soon!',
  },
  {
    name: 'Illustrator',
    category: 'Vector',
    url: 'https://www.instagram.com/kendesignsforfun/',
    description:
      'Vector work and illustrations for my personal designs, also on @kendesignsforfun, with more on the way!',
  },
  
  /* ---------- Project-only tags ---------- */
  {
    name: 'TensorFlow',
    category: 'ML Framework',
    url: 'https://www.tensorflow.org/',
    description:
      'Built and trained CNNs for handwritten character recognition (Hand2Doc) and landscape classification.',
  },
  {
    name: 'OpenCV',
    category: 'Computer Vision',
    url: 'https://opencv.org/',
    description: 'Contour-based character segmentation in Hand2Doc.',
  },
  {
    name: 'YOLO',
    category: 'Computer Vision',
    url: 'https://github.com/opendatalab/DocLayout-YOLO',
    description: 'Used DocLayout-YOLO to detect document layout regions in Hand2Doc.',
  },
  {
    name: 'Streamlit',
    category: 'Tool',
    url: 'https://streamlit.io/',
    description: 'Quick interactive demos for my ML projects, used for testing and presentations.',
  },
  {
    name: 'NLP',
    category: 'Field',
    description: 'Used DistilBERT embeddings to turn LinkedIn profile text into features for prediction.',
  },
  {
    name: 'Scikit-learn',
    category: 'ML Library',
    url: 'https://scikit-learn.org/',
    description:
      'Trained and compared Logistic Regression, Random Forest, Naive Bayes, SVC and ensemble models in LeadershipLens.',
  },
  {
    name: 'Flutter',
    category: 'Framework',
    url: 'https://flutter.dev/',
    description: "Built Trakr's mobile frontend.",
  },
  {
    name: 'Framer Motion',
    category: 'Library',
    url: 'https://motion.dev/',
    description: 'Page transitions and micro-interactions throughout this portfolio.',
  },
  {
    name: 'MicroPython',
    category: 'Language',
    url: 'https://micropython.org/',
    description: 'Programmed sensor reading and automatic purifier control for the portable air purifier.',
  },
  {
    name: 'IoT',
    category: 'Field',
    description:
      'Built an AI-assisted portable air purifier, which reached the Samsung Innovation Campus semifinals.',
  },
];

const skillMap = new Map(skills.map((s) => [normalizeSkillName(s.name), s]));

export function getSkill(name: string) {
  return skillMap.get(normalizeSkillName(name));
}

export function getProjectsUsing(name: string) {
  const key = normalizeSkillName(name);
  return projects
    .filter((p) => p.tags.some((t) => normalizeSkillName(t) === key))
    .map((p) => p.title);
}

/** What shows in the Skills section, in order */
export const devSkills = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'C', 'C++', 'Java', 'Python', 'Go', 'PHP',
  'SQL', 'React', 'Vue.js', 'Tailwind', 'Node.js', 'Next.js', 'Express.js', 'MongoDB',
  'GitHub', 'GitLab',
];

export const designSkills = ['Figma', 'Photoshop', 'Illustrator'];