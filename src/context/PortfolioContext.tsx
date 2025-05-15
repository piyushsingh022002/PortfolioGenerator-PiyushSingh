import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PortfolioData, BasicInfo, Skill, Project, Contact, FormStep } from '../types';

// Sample data for preview
const sampleData: PortfolioData = {
  basicInfo: {
    name: 'Alex Johnson',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with 5+ years of experience building web applications with modern technologies.',
    location: 'San Francisco, CA',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  skills: [
    { id: uuidv4(), name: 'React', level: 5, category: 'frontend' },
    { id: uuidv4(), name: 'TypeScript', level: 4, category: 'frontend' },
    { id: uuidv4(), name: 'Node.js', level: 4, category: 'backend' },
    { id: uuidv4(), name: 'CSS/SCSS', level: 4, category: 'frontend' },
    { id: uuidv4(), name: 'UI/UX Design', level: 3, category: 'design' },
  ],
  projects: [
    {
      id: uuidv4(),
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with product management, cart, and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      imageUrl: 'https://via.placeholder.com/600x400?text=E-commerce+Project',
      projectUrl: 'https://example.com/project1',
      githubUrl: 'https://github.com/example/project1',
      featured: true,
    },
    {
      id: uuidv4(),
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team features.',
      technologies: ['React', 'Firebase', 'Styled Components'],
      imageUrl: 'https://via.placeholder.com/600x400?text=Task+Management+App',
      projectUrl: 'https://example.com/project2',
      githubUrl: 'https://github.com/example/project2',
      featured: true,
    },
  ],
  contact: {
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    twitter: 'https://twitter.com/alexjohnson',
    website: 'https://alexjohnson.dev',
  },
};

// Context type
interface PortfolioContextType {
  portfolioData: PortfolioData;
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;
  updateBasicInfo: (info: BasicInfo) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  removeProject: (id: string) => void;
  updateContact: (contact: Contact) => void;
  resetToSampleData: () => void;
}

// Create context
const PortfolioContext = createContext<PortfolioContextType>({
  portfolioData: sampleData,
  currentStep: 'basicInfo',
  setCurrentStep: () => {},
  updateBasicInfo: () => {},
  addSkill: () => {},
  updateSkill: () => {},
  removeSkill: () => {},
  addProject: () => {},
  updateProject: () => {},
  removeProject: () => {},
  updateContact: () => {},
  resetToSampleData: () => {},
});

// Portfolio provider component
export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(sampleData);
  const [currentStep, setCurrentStep] = useState<FormStep>('basicInfo');

  // Basic info update
  const updateBasicInfo = (info: BasicInfo) => {
    setPortfolioData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        ...info,
      },
    }));
  };

  // Skills management
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: uuidv4() };
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (skill: Skill) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === skill.id ? skill : s)),
    }));
  };

  const removeSkill = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  };

  // Projects management
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: uuidv4() };
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (project: Project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === project.id ? project : p)),
    }));
  };

  const removeProject = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  // Contact update
  const updateContact = (contact: Contact) => {
    setPortfolioData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        ...contact,
      },
    }));
  };

  // Reset to sample data
  const resetToSampleData = () => {
    setPortfolioData(sampleData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        currentStep,
        setCurrentStep,
        updateBasicInfo,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        updateContact,
        resetToSampleData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook for using portfolio data
export const usePortfolio = () => useContext(PortfolioContext);
