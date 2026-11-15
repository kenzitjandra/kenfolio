export type Project = {
  title: string;
  tags: string[];
  description: string;
  image: string;
  link: string;
  /** Optional: project-specific text for a tag's popup, keyed by tag name */
  tagNotes?: Record<string, string>;
};

export const projects: Project[] = [
    {
        title: 'Cafforia',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description:
            'Cafforia is a coffee tutorial website built with HTML, CSS, and JavaScript, featuring a clean visual layout and curated video-based content. The project focused on creating an aesthetic landing experience while practicing responsive structure, interactive elements, and frontend fundamentals.',
        image: '/projects/cafforia.png',
        link: 'https://kenzitjandra.github.io/Cafforia_MulMed/index.html',
    },
    {
        title: 'Hand2Doc',
        tags: ['Python', 'TensorFlow', 'OpenCV', 'YOLO', 'Streamlit'],
        description:
            'Hand2Doc is a computer vision project that transforms handwritten notes into structured digital text. The system combines CNN-based character recognition, OpenCV contour segmentation, and DocLayout-YOLO for layout detection, with a Streamlit interface for easier testing and presentation. In this group project, I contributed to defining the OCR workflow, system approach, and final technical documentation.',
        image: '/projects/hand2doc.png',
        link: 'https://github.com/kenzitjandra/Layout-Parser-ComputerVision',
    },
    {
        title: 'LeadershipLens',
        tags: ['Python', 'NLP', 'Scikit-learn', 'Streamlit'],
        description:
            'LeadershipLens is an NLP-based machine learning project that predicts high-level career potential from qualitative LinkedIn profile data. It uses DistilBERT embeddings with multiple classifiers, including Logistic Regression, Random Forest, Naive Bayes, SVC, and ensemble methods. In this group project, I helped design the overall ML pipeline, from feature representation and model selection to the integration of NLP techniques into the prediction workflow.',
        image: '/projects/leadershiplens.png',
        link: 'https://github.com/kenzitjandra/High-Profile-LinkedIn-Predictor',
    },
    {
        title: 'Trakr',
        tags: ['Flutter', 'Express.js', 'MongoDB'],
        description:
            'Trakr is a mobile budgeting app designed to help users track daily expenses through a simple and approachable interface. Built with Flutter, Express.js, and MongoDB, the project focused on connecting a mobile frontend with a backend API and database structure to support practical expense management features.',
        image: '/projects/trakr.png',
        link: 'https://github.com/kenzitjandra/BudgetTrackerApp',
    },
    {
        title: 'Kenfolio',
        tags: ['Next.js', 'Tailwind', 'Framer Motion'],
        description:
            'Kenfolio is my personal portfolio website, built to reflect my identity as both a developer and designer. The site uses Next.js, Tailwind CSS, Framer Motion, GSAP, and smooth scrolling interactions to create a minimal, modern, and cinematic browsing experience while showcasing my projects, design direction, and frontend development skills.',
        image: '/projects/kenfolio_v2.png',
        link: '#',
    },
    {
        title: 'Portable Air Purifier',
        tags: ['Micropython', 'IoT'],
        description:
            'Portable Automatic Air Purifier is an IoT-based prototype built with MicroPython to monitor air quality and respond automatically to environmental conditions. The project combines sensor-based data reading, embedded logic, and automated purifier control to explore how smart devices can support cleaner air in portable use cases.',
        image: '/projects/paap.png',
        link: 'https://github.com/kenzitjandra/assignment2_UNI174_RPP',
    },
    {
        title: 'Landscape Classify',
        tags: ['HTML', 'CSS', 'Python'],
        description:
            'Landscape Classify is a web application that analyzes uploaded photos and predicts the type of landscape shown. It uses Convolutional Neural Network built with Keras and TensorFlow to extract visual features from images, then returns the top three landscape predictions with confidence scores through a simple user-facing interface.',
        image: '/projects/classify.png',
        link: 'https://github.com/kenzitjandra/LandscapeClassifier',
    },
    {
        title: 'JeniusAcademy',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description:
            'JeniusAcademy is a lightweight online course platform prototype built with HTML, CSS, and JavaScript. The project focuses on frontend fundamentals, including course card layouts, navigation, basic interactivity, and responsive page structure, while simulating the feel of a simple e-learning website.',
        image: '/projects/academy.png',
        link: 'https://github.com/kenzitjandra/JeniusAcademy',
    },
];