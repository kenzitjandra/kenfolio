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
      'The base of every web project I build, from landing pages like Cafforia to the course layouts in JeniusAcademy.',
  },
  {
    name: 'CSS',
    category: 'Language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    description: 'Responsive layouts and interactive styling across my vanilla web projects.',
  },
  {
    name: 'JavaScript',
    category: 'Language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    description:
      'Interactivity for my vanilla web projects, and the foundation for everything I build with React and Node.',
  },
  {
    name: 'C',
    category: 'Language',
    url: 'https://gcc.gnu.org/',
    description: 'TODO: what did you use C for?',
  },
  {
    name: 'C++',
    category: 'Language',
    url: 'https://isocpp.org/',
    description: 'TODO: what did you use C++ for?',
  },
  {
    name: 'Java',
    category: 'Language',
    url: 'https://www.oracle.com/java/',
    description: 'TODO: what did you use Java for?',
  },
  {
    name: 'Python',
    category: 'Language',
    url: 'https://www.python.org/',
    description:
      'My main language for machine learning and computer vision, from data preprocessing and model training to Streamlit demos.',
  },
  {
    name: 'PHP',
    category: 'Language',
    url: 'https://www.php.net/',
    description:
      "Maintained HIMTI BINUS University's Laravel websites as General Manager of Research and Development.",
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
    description: 'Component-based UIs with hooks and animation libraries. This portfolio is built on it.',
  },
  {
    name: 'Tailwind',
    category: 'Framework',
    url: 'https://tailwindcss.com/',
    description: 'My go-to for styling. Every section of this portfolio is built with it.',
  },
  {
    name: 'Node.js',
    category: 'Runtime',
    url: 'https://nodejs.org/',
    description: "Runs Trakr's backend API.",
  },
  {
    name: 'Next.js',
    category: 'Framework',
    url: 'https://nextjs.org/',
    description: 'The framework behind this portfolio, deployed on Vercel.',
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
    description: "Stores and structures Trakr's expense data.",
  },
  {
    name: 'GitHub',
    category: 'Tool',
    url: 'https://github.com/kenzitjandra',
    description: 'Version control and hosting for all my projects, and collaboration on group projects.',
  },

  /* ---------- Design ---------- */
  {
    name: 'Figma',
    category: 'UI Tool',
    url: 'https://figma.com/',
    description: 'TODO: e.g. which UI/UX designs or prototypes you made in Figma.',
  },
  {
    name: 'Photoshop',
    category: 'Raster',
    url: 'https://adobe.com/products/photoshop',
    description: 'TODO (check): photo editing and event visuals for HIMTI events.',
  },
  {
    name: 'Illustrator',
    category: 'Vector',
    url: 'https://adobe.com/products/illustrator',
    description:
      'TODO (check): vector work such as the event logo and lanyards for HILET 2025 and SESVENT 2024.',
  },
  {
    name: 'Canva',
    category: 'Quick Design',
    url: 'https://canva.com/',
    description: 'TODO: what do you use Canva for?',
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
  'HTML', 'CSS', 'JavaScript', 'C', 'C++', 'Java', 'Python', 'PHP',
  'SQL', 'React', 'Tailwind', 'Node.js', 'Next.js', 'Express.js', 'MongoDB', 'GitHub',
];

export const designSkills = ['Figma', 'Photoshop', 'Illustrator', 'Canva'];