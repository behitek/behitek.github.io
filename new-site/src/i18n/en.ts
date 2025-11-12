export default {
  // Navigation
  nav: {
    blog: 'Blog',
    projects: 'Projects',
    contact: 'Contact',
  },

  // Homepage
  home: {
    welcome: '👋 Welcome to my portfolio',
    greeting: "Hi, I'm",
    name: 'Hieu Nguyen',
    role: 'AI Engineer',
    tagline: 'Building production-ready AI systems with NLP, RAG, and LLMs. Passionate about bringing AI into real-world applications.',
    cta: {
      viewWork: 'View My Work',
      getInTouch: 'Get in Touch',
    },
    status: 'Available for hire',
    stats: {
      followers: 'Followers',
      repositories: 'Repositories',
      yearsExp: 'Years Exp',
    },
    about: {
      title: 'About Me',
      subtitle: 'AI Engineer with Master\'s degree from JAIST, specializing in production ML systems',
      greeting: 'Hello there!',
      bio1: 'I\'m Hieu Nguyen, an AI Engineer from Vietnam 🇻🇳 with a passion for transforming research into production-ready systems.',
      bio2: 'My expertise lies in Natural Language Processing, RAG systems, and Large Language Models. I specialize in building scalable AI solutions that solve real-world problems.',
      bio3: 'I hold a {degree} from {school} in Japan, where I deepened my knowledge in information retrieval and machine learning.',
      bio4: 'When I\'m not coding, you\'ll find me exploring self-hosted solutions, contributing to open source, or writing about AI/ML on my blog.',
    },
    education: {
      title: 'Education',
    },
    techStack: {
      title: 'Tech Stack & Skills',
    },
    featuredProjects: {
      title: '🚀 Featured Projects',
      subtitle: 'Check out some of my recent work and contributions',
      viewAll: 'View All Projects',
    },
    latestArticles: {
      title: '✍️ Latest Articles',
      subtitle: 'Thoughts on AI, ML, and software engineering',
      viewAll: 'View All Articles',
    },
    cta2: {
      title: 'Let\'s Build Something Amazing Together',
      subtitle: 'Looking for an AI engineer to bring your ideas to life? I\'m available for consulting, collaboration, and full-time opportunities.',
      getInTouch: '📧 Get in Touch',
      viewWork: '🚀 View My Work',
    },
  },

  // Projects Page
  projects: {
    title: 'Projects',
    subtitle: 'Personal and open source projects I\'ve built',
    filter: {
      all: 'All',
      product: 'Product',
      research: 'Research',
      tutorial: 'Tutorial',
      tool: 'Tool',
      fun: 'Fun',
    },
    links: {
      website: 'Website',
      github: 'GitHub',
      blog: 'Read',
    },
  },

  // Contact Page
  contact: {
    title: '💬 Let\'s Connect',
    subtitle: 'Always happy to discuss AI, production ML, RAG systems, or self-hosted solutions',
    getInTouch: 'Get in Touch',
    quickInfo: {
      title: 'Quick Info',
      location: 'Location',
      locationValue: 'Hanoi, Vietnam 🇻🇳',
      role: 'Role',
      roleValue: 'AI Engineer',
      education: 'Education',
      educationValue: 'Master\'s in Information Science (JAIST)',
    },
    interests: {
      title: 'Interests',
      aiml: 'AI/ML',
      nlp: 'NLP',
      rag: 'RAG',
      llms: 'LLMs',
      python: 'Python',
      ir: 'IR',
      teaching: 'Teaching',
      selfHosting: 'Self-hosting',
    },
    availability: {
      title: '📬 Response Time',
      text: 'I typically respond to emails and LinkedIn messages within 24-48 hours. For quick questions, Twitter/X DMs work best!',
    },
    cta: {
      title: 'Open to Collaboration',
      subtitle: 'Interested in collaborating on AI/ML projects, writing guest posts, or speaking opportunities?',
      button: '📧 Send me an email',
    },
  },

  // Blog Page
  blog: {
    title: 'Blog',
    subtitle: 'Articles about AI, ML, and software engineering',
    filter: {
      all: 'All',
      aiml: 'AI/ML',
      python: 'Python',
      tutorial: 'Tutorial',
      data: 'Data',
    },
    readMore: 'Read More',
    minRead: 'min read',
  },

  // Footer
  footer: {
    builtWith: 'Built with',
    and: 'and',
    sourceCode: 'Source Code',
    rights: 'All rights reserved.',
  },

  // Common
  common: {
    readMore: 'Read More',
    viewAll: 'View All',
    loading: 'Loading...',
  },
} as const;
