// Portfolio data types
export interface BasicInfo {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  location?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'design' | 'other';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Contact {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface PortfolioData {
  basicInfo: BasicInfo;
  skills: Skill[];
  projects: Project[];
  contact: Contact;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'purple' | 'blue';

// Form step types
export type FormStep = 'basicInfo' | 'skills' | 'projects' | 'contact';
