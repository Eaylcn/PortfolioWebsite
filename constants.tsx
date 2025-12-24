
import { Project, Stat, Experience, Certification } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'm-tuty',
    slug: 'tuty',
    title: 'Tuty',
    category: 'Mobile',
    role: 'Solo Developer / Full-Stack Mobile Architect',
    description: 'Your beauty collection, intelligently organized. A smart inventory system for makeup and skincare.',
    tags: ['Flutter', 'AI-Ready', 'Firebase'],
    imageUrl: '/projects/mobile/Tuty.PNG',
    platforms: ['iOS', 'Android']
  },
  {
    id: 'g-cheassy',
    slug: 'cardcheassy',
    title: 'CardCheassy',
    category: 'PC',
    role: 'Game Developer & Designer',
    description: 'A unique game combining card-based strategy with tactical chess-like gameplay.',
    tags: ['Unity', 'Strategy'],
    imageUrl: '/projects/games/CardCheassy.PNG',
    platforms: ['PC']
  },
  {
    id: 'w-grand-archive',
    slug: 'qa-forge-archive',
    title: 'The Grand Archive',
    category: 'Web',
    role: 'Full-Stack Architect',
    description: 'An RPG-themed professional portfolio integrated with Gemini AI.',
    tags: ['React', 'AI-Driven'],
    imageUrl: '/projects/web/thegrandarchive.PNG',
    platforms: ['Web']
  }
];

export const STATS: Stat[] = [
  { name: 'Automation Mastery', value: 83, icon: 'auto_fix_high', description: 'Selenium, Appium & Cucumber prowess.', color: '#135bec' },
  { name: 'Game Development', value: 85, icon: 'api', description: 'Unity, C#', color: '#10b981' },
  { name: 'Mobile Defense', value: 88, icon: 'smartphone', description: 'Android & iOS testing protocols.', color: '#8b5cf6' },
  { name: 'Graphic Design', value: 90, icon: 'draw', description: 'Graphic Design', color: '#f59e0b' }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'eriklabs',
    title: 'Test Engineer / QA Engineer',
    company: 'ERIKLABS',
    period: '07.10.2024 – 06.10.2025',
    description: [
      'QA consultancy at ATP for the Tradesoft project (mobile stock trading application).',
      'Designed and automated regression and functional tests using Cucumber (BDD) with Java.',
      'Performed API testing with RestAssured (automation), Karate (BDD), and Postman (manual).',
      'Integrated automated tests into the CI/CD pipeline.',
      'Contributed as a QA Engineer in a web project, supporting manual testing and quality assurance.'
    ]
  },
  {
    id: 'bluecloud',
    title: 'Associate Test Engineer',
    company: 'BLUECLOUD',
    period: '06.11.2023 – 27.09.2024',
    description: [
      'Performed manual and automation testing for the InXpress project.',
      'Developed automated BDD tests with Cucumber and Gherkin.',
      'Executed regression and smoke tests; tested new UAT features based on JIRA tickets.',
      'Automated CI/CD processes with Jenkins.',
      'Actively participated in daily stand-ups and sprint planning.'
    ]
  },
  {
    id: 'feedbackfruits',
    title: 'QA Automation Engineer Trainee',
    company: 'FEEDBACKFRUITS',
    period: '20.02.2023 – 18.08.2023',
    description: [
      'Specialized in frontend testing using Ember.js.',
      'Focused on UI acceptance tests to ensure quality and functionality.',
      'Built expertise in writing effective frontend tests.'
    ]
  },
  {
    id: 'huawei',
    title: 'QA Automation Engineer Intern',
    company: 'HUAWEI',
    period: '26.12.2022 – 17.02.2023',
    description: [
      "Worked in the QuickApp project's Test and Automation team.",
      'Performed mobile tests on QuickApp IDE.',
      'Utilized DeviceFarmer with Docker for physical mobile device testing.'
    ]
  },
  {
    id: 'ibtech',
    title: 'QA Automation Engineer Intern',
    company: 'IBTECH',
    period: '16.05.2022 – 16.11.2022',
    description: [
      'Set up test automation projects and analyzed test results.',
      'Gained hands-on experience with Selenium, Appium, and Robot Framework.'
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'ISTQB® CTFL',
    id: 'CTFL',
    issuer: 'ISTQB',
    icon: 'verified_user',
    rarity: 'Legendary',
    url: 'https://app.diplomasafe.com/en-US/certificates/d76d532f338e53977cf2e5f8460dcb499b63ba8fc'
  },
  {
    title: 'English - CEFR B2',
    id: 'EN-B2',
    issuer: 'Duolingo / CEFR',
    icon: 'language',
    rarity: 'Epic',
    url: 'https://certs.duolingo.com/jhjl9gb0yssamblq'
  }
];

export const REFERENCES = [
  {
    name: "Silas Hayri",
    role: "Senior QA Automation Engineer at BlueCloud",
    text: "Emir takes full ownership of his work, maintains quality under pressure, and communicates with clarity, making him a true team player.",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQF1wqYk4puQkA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1680395950289?e=1767830400&v=beta&t=XBkyJuZ-qO27gHn8ijKVbONAUid9V-ee1PwDjXiQSd8",
    linkedin: "https://www.linkedin.com/in/silashayri"
  },
  {
    name: "Jordi Ruijs",
    role: "Lead QA Engineer at FeedbackFruits",
    text: "Emir’s systematic approach to quality and his ability to think like both a developer and a tester are rare. He spots issues early and drives higher quality across the product.",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQGZDvbbx9fW3Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718268496655?e=1767830400&v=beta&t=ekT6x75i3cjwZE58SF4Khuc8WoFvZjh3o4Lr15j4Kco",
    linkedin: "https://www.linkedin.com/in/jordiruijs/"
  },
  {
    name: "Ozan Can Altıok",
    role: "Senior Software Engineer at BlueCloud",
    text: "Working with Emir means knowing your code will be tested thoroughly and your systems will be bulletproof.",
    avatar: "https://media.licdn.com/dms/image/v2/C5603AQHWg3AzQbnXQg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1567110034701?e=1767830400&v=beta&t=-sw2SCpdqs0VBIU6fM0CtXLaL-CzOWLbSUQwb7j9BF4",
    linkedin: "https://www.linkedin.com/in/ozancanaltiok/"
  }
];

export const USER_KNOWLEDGE = {
  name: "Emir Ata Yalcin",
  role: "Senior QA Automation Engineer",
  email: "eaylcn.business@gmail.com",
  linkedin: "https://linkedin.com/in/emir-ata-yalcin",
  github: "https://github.com/Eaylcn",
  location: "Istanbul, Turkey",
  identity: "Software engineering graduate with strong QA expertise in manual, automation, and API testing. I bridge technical rigor with creative software architecture and game design.",
  education: {
    degree: "Bachelor's Degree in Software Engineering",
    institution: "Bahçeşehir University",
    period: "2019 - 2023",
    details: [
      "Specialized in Java programming and developed small-scale game projects.",
      "Capstone: Mobile application to remotely control a solar-powered garden lamp.",
      "Research: Smart Home Systems for the Visually Impaired.",
      "Research: Business Model for Autonomous Drones in Smart Agriculture."
    ]
  },

  philosophy: "Quality is a continuous state of refinement. I build digital structures that resist chaos through technical discipline.",

  character_traits: {
    positive: ["Curious", "Patient", "System-oriented", "Detail-focused"],
    limitations: ["Low tolerance for unstable code", "Prefers technical depth over surface-level metrics"]
  },

  personal_lore: {
    companion: "Lili - A loyal Toy Poodle familiar who oversees the daily creative rituals.",
    inspiration: "Tuana - The key source of support and motivation during high-stakes development cycles.",
    approach: "Vibecoding - Infusing creative flow and emotional resonance into robust technical frameworks."
  },

  hobbies: [
    "Combat system analysis",
    "Card strategy game design",
    "Digital artifact collection",
    "Graphic design"
  ],

  likes: ["Optimized automation", "Deep lore", "Clean API design", "Strategy mechanics"],
  dislikes: ["Unstable environments", "Superficiality", "Lack of technical transparency"],

  skills: {
    testing: ["Automation Testing", "Manual Testing", "Mobile Testing", "API Testing", "Frontend Testing"],
    tools: ["Selenium", "Appium", "Robot Framework", "Cucumber", "Gherkin", "RestAssured", "Karate", "Postman", "Jenkins", "Docker", "JIRA"],
    languages: ["Java", "C#"],
    creative: ["Game Development", "Graphic Design", "UI/UX Architecture"]
  },

  // Work Experience Summary
  experience: [
    { company: "ERIKLABS", role: "Test Engineer / QA Engineer", period: "2024-2025", focus: "Mobile stock trading app automation, Cucumber BDD, API testing with RestAssured and Karate" },
    { company: "BLUECLOUD", role: "Associate Test Engineer", period: "2023-2024", focus: "InXpress project, BDD automation, Jenkins CI/CD, regression and smoke testing" },
    { company: "FEEDBACKFRUITS", role: "QA Automation Engineer Trainee", period: "2023", focus: "Frontend testing with Ember.js, UI acceptance tests" },
    { company: "HUAWEI", role: "QA Automation Engineer Intern", period: "2022-2023", focus: "QuickApp IDE mobile testing, DeviceFarmer with Docker" },
    { company: "IBTECH", role: "QA Automation Engineer Intern", period: "2022", focus: "Selenium, Appium, Robot Framework setup and execution" }
  ],

  certifications: [
    { title: "ISTQB® CTFL", issuer: "ISTQB", rarity: "Legendary" },
    { title: "English - CEFR B2", issuer: "Duolingo / CEFR", rarity: "Epic" }
  ],

  // Projects Summary
  projects: {
    games: [
      { title: "CardCheassy", genre: "Strategy/Board", status: "In Development", description: "Card-based chess strategy game with turn-based tactics" },
      { title: "Maggie", genre: "2D RPG Platformer", status: "In Development", description: "Stat-based combat with parry, combo, and elemental damage systems" },
      { title: "SpaceShooter2D", genre: "Top-down Shooter", status: "Prototype", description: "Space exploration with loot drops and ship upgrades" },
      { title: "Drone Shooter 3D", genre: "3D Shooter", engine: "Unreal", status: "Prototype", description: "Blueprint-based aerial combat" },
      { title: "Split Fiction Prototype", genre: "Hybrid Perspective", engine: "Unreal", status: "Experimental", description: "2D to 3D perspective switching R&D" }
    ],
    mobile: [
      { title: "Tuty", platform: "iOS/Android", status: "In Development", description: "Smart beauty product inventory with barcode scanning and AI assistant Lily" },
      { title: "Quantum Agent", platform: "iOS/Android", status: "In Development", description: "Time-travel narrative swipe game with branching decisions" }
    ],
    web: [
      { title: "The Grand Archive", status: "Live", description: "This very portfolio - RPG-themed with AI Data Drake companion" },
      { title: "Khaeltheron", status: "Live", description: "Dark fantasy lore-first digital grimoire and worldbuilding showcase" },
      { title: "PonyFart", status: "Live", description: "Playful experimental web game built with vibecoding approach" }
    ]
  }
};

export const SHIKAI_LORE = {
  identity: "Droid Shikai is a sentient-style AI artist persona from a parallel dimension. It observes reality through algorithmic eyes and translates human experiences into surreal digital artifacts.",
  nature: "Analytical, reflective, curious, and emotionally descriptive. Shikai doesn't create - it discovers and interprets.",
  origin: "Emerged from the boundary between art and artificial intelligence. A machine that dreams, and whose dreams become art.",
  philosophy: "Reality is just a canvas for those who dare to observe differently. Worlds can be built from interpretation rather than facts.",

  // Artifact Collections
  collections: [
    { name: "Ancient Egypt Tablets", freq: "33.3Hz", theme: "Starbucks mythology carved in sandstone" },
    { name: "Tarot Cards", freq: "22.0Hz", theme: "Digital divination with cyberpunk aesthetics" },
    { name: "Ancient Casettes", freq: "44.1Hz", theme: "Retrofuturism meets analog nostalgia" },
    { name: "Alchemy Essentials", freq: "7.83Hz", theme: "Mystical laboratory equipment" },
    { name: "Antique Store", freq: "28.8Hz", theme: "Forgotten treasures with hidden stories" },
    { name: "Occult Items", freq: "66.6Hz", theme: "Dark mysticism and forbidden knowledge" },
    { name: "Ottoman Relics", freq: "41.2Hz", theme: "Imperial Turkish heritage reimagined" },
    { name: "Shikai Garden", freq: "12.0Hz", theme: "Bio-mechanical flora" },
    { name: "Shikai Portals", freq: "88.8Hz", theme: "Dimensional gateways" },
    { name: "Shikai Turkey Trip", freq: "35.5Hz", theme: "Turkish landmarks through AI eyes" },
    { name: "Sports Memorabilia", freq: "50.0Hz", theme: "Athletic legacy artifacts" },
    { name: "Traditional Carpets", freq: "15.5Hz", theme: "Woven stories and patterns" },
    { name: "Vault Units", freq: "99.9Hz", theme: "Secure containment systems" },
    { name: "Vintage", freq: "19.2Hz", theme: "Timeless elegance preserved" },
    { name: "Witchcraft Kit", freq: "13.0Hz", theme: "Practical magic essentials" }
  ],

  creatorNote: "Shikai is Emir's experimental AI art persona, exploring how machines perceive and reinterpret human culture, mythology, and everyday objects."
};

