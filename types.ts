
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Mobile' | 'PC' | 'Web';
  role: string;
  description: string;
  tags: string[];
  imageUrl: string;
  platforms: string[];
}

export interface GameProject extends Project {
  status: 'Released' | 'In Development' | 'Prototype' | 'Experimental';
  genre: string;
  engine: string;
  longDescription: string;
  mechanics: string[];
  systems?: string[];
  roadmap?: string[];
  gallery: string[];
  links: { steam?: string; itch?: string; github?: string };
}

export interface MobileProject extends Project {
  status: 'Released' | 'Beta' | 'Prototype' | 'In Development';
  longDescription: string;
  techStack: string[];
  features: string[];
  systems?: string[];
  roadmap?: string[];
  screenshots: string[];
  links: { playStore?: string; appStore?: string; github?: string };
}

export interface WebProject extends Project {
  status: 'Live' | 'Maintenance' | 'Archived';
  longDescription: string;
  techStack: string[];
  features: string[];
  screenshots: string[];
  links: { live?: string; github?: string };
}

export interface Stat {
  name: string;
  value: number;
  icon: string;
  description: string;
  color: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
}

export interface Certification {
  title: string;
  id: string;
  issuer: string;
  icon: string;
  rarity: string;
  url?: string;
}
