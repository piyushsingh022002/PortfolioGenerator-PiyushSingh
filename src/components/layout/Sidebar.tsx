import React from 'react';
import styled from 'styled-components';
import { FormStep } from '../../types';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';

interface SidebarStepItem {
  id: FormStep;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  background-color: ${({ theme }) => theme.sidebarBackground};
  border-right: 1px solid ${({ theme }) => theme.border};
  padding-top: 4rem;
  z-index: 90;
  transition: transform 0.3s ease;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  
  @media (min-width: 1024px) {
    position: sticky;
    top: 0;
    height: 100vh;
    transform: translateX(0);
  }
`;

const StepsList = styled.ul`
  list-style: none;
  padding: 1rem 0;
  margin: 0;
`;

const StepListItem = styled.li<{ isActive: boolean }>`
  padding: 0;
  margin: 0.5rem 0;
`;

const StepButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.primary : 'transparent'};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.text};
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme, isActive }) => 
      isActive ? theme.primary : theme.border};
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.25rem;
`;

const ProgressContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: auto;
`;

const ProgressLabel = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: ${({ theme }) => theme.border};
  border-radius: 1rem;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: ${({ theme }) => theme.primary};
  border-radius: 1rem;
`;

const ToggleButton = styled.button`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 100;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow};
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

// Placeholder for icons (replace with actual Phosphor icons when implementing)
const BasicInfoIcon = () => <span>👤</span>;
const SkillsIcon = () => <span>🛠️</span>;
const ProjectsIcon = () => <span>📂</span>;
const ContactIcon = () => <span>📞</span>;

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, onToggle }) => {
  const { currentStep, setCurrentStep, portfolioData } = usePortfolio();
  
  const steps: SidebarStepItem[] = [
    { id: 'basicInfo', label: 'Basic Info', icon: <BasicInfoIcon /> },
    { id: 'skills', label: 'Skills', icon: <SkillsIcon /> },
    { id: 'projects', label: 'Projects', icon: <ProjectsIcon /> },
    { id: 'contact', label: 'Contact', icon: <ContactIcon /> },
  ];
  
  const handleStepClick = (step: FormStep) => {
    setCurrentStep(step);
    if (isMobile) {
      onToggle();
    }
  };
  
  // Calculate progress
  const calculateProgress = () => {
    let completed = 0;
    
    if (portfolioData.basicInfo.name && portfolioData.basicInfo.title) {
      completed += 1;
    }
    
    if (portfolioData.skills.length > 0) {
      completed += 1;
    }
    
    if (portfolioData.projects.length > 0) {
      completed += 1;
    }
    
    if (portfolioData.contact.email) {
      completed += 1;
    }
    
    return (completed / steps.length) * 100;
  };
  
  const progress = calculateProgress();
  
  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <StepsList>
          {steps.map((step) => (
            <StepListItem key={step.id} isActive={currentStep === step.id}>
              <StepButton
                isActive={currentStep === step.id}
                onClick={() => handleStepClick(step.id)}
              >
                <IconWrapper>{step.icon}</IconWrapper>
                {step.label}
              </StepButton>
            </StepListItem>
          ))}
        </StepsList>
        
        <ProgressContainer>
          <ProgressLabel>Portfolio Completion: {Math.round(progress)}%</ProgressLabel>
          <ProgressBar>
            <ProgressFill 
              progress={progress}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </ProgressBar>
        </ProgressContainer>
      </SidebarContainer>
      
      {isMobile && (
        <ToggleButton onClick={onToggle}>
          {isOpen ? '✕' : '☰'}
        </ToggleButton>
      )}
    </>
  );
};

export default Sidebar;
