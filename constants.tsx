import { Project } from './types/database';

export const USER_KNOWLEDGE = {
  name: "Emir Ata Yalcin",
  role: "Game Developer & Product Manager",
  email: "eaylcn.business@gmail.com",
  linkedin: "https://linkedin.com/in/emir-ata-yalcin",
  github: "https://github.com/Eaylcn",
  location: "Istanbul, Turkey",
  identity: "Software engineering graduate with a passion for building games and managing digital products. I bridge technical rigor with creative game design and product strategy.",
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

  philosophy: "Great products emerge from technical discipline combined with creative vision. I aim to build engaging games and intuitive digital architectures that leave a lasting impact.",

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

  likes: ["Game mechanics", "Deep lore", "Clean UI/UX", "Strategy game design", "Product optimization"],
  dislikes: ["Unstable gameplay", "Superficial systems", "Lack of clear product vision"],

  skills: {
    core: ["Game Development", "Product Management", "Software Architecture", "UI/UX Design"],
    testing_and_qa: ["Automation Testing", "Manual Testing", "API Testing"],
    languages: ["C#", "Java", "TypeScript", "Python"],
    tools: ["Unity", "Unreal Engine", "JIRA", "Figma", "Docker", "Jenkins"]
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

