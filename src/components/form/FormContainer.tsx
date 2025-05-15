import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import BasicInfoForm from './BasicInfoForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import ContactForm from './ContactForm';
import Card from '../common/Card';
import Button from '../common/Button';

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
  font-family: 'Playfair Display', serif;
  text-align: center;
  position: relative;
  padding-bottom: 0.75rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    border-radius: 3px;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  height: 100%;
  overflow-y: auto;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding-right: 0;
    margin-bottom: 1.5rem;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  background: ${({ theme }) => theme.background};
  border-radius: 1rem;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 0.5rem;
`;

const StepDot = styled.div<{ active: boolean }>`
  width: ${({ active }) => active ? '12px' : '10px'};
  height: ${({ active }) => active ? '12px' : '10px'};
  border-radius: 50%;
  background: ${({ active, theme }) => 
    active ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` : theme.border + '50'};
  transition: all 0.3s ease;
  box-shadow: ${({ active }) => active ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'};
  transform: ${({ active }) => active ? 'scale(1.1)' : 'scale(1)'};
`;

const FormContainer: React.FC = () => {
  const { currentStep, setCurrentStep } = usePortfolio();
  
  const handleNext = () => {
    switch (currentStep) {
      case 'basicInfo':
        setCurrentStep('skills');
        break;
      case 'skills':
        setCurrentStep('projects');
        break;
      case 'projects':
        setCurrentStep('contact');
        break;
      default:
        break;
    }
  };
  
  const handlePrevious = () => {
    switch (currentStep) {
      case 'skills':
        setCurrentStep('basicInfo');
        break;
      case 'projects':
        setCurrentStep('skills');
        break;
      case 'contact':
        setCurrentStep('projects');
        break;
      default:
        break;
    }
  };
  
  return (
    <FormWrapper>
      <Card>
        <FormContent>
          <FormTitle>
            {currentStep === 'basicInfo' && 'Basic Information'}
            {currentStep === 'skills' && 'Skills & Expertise'}
            {currentStep === 'projects' && 'Projects'}
            {currentStep === 'contact' && 'Contact Information'}
          </FormTitle>
          
          <StepIndicator>
            <StepDot active={currentStep === 'basicInfo'} title="Basic Information" />
            <StepDot active={currentStep === 'skills'} title="Skills & Expertise" />
            <StepDot active={currentStep === 'projects'} title="Projects" />
            <StepDot active={currentStep === 'contact'} title="Contact Information" />
          </StepIndicator>
          
          {currentStep === 'basicInfo' && <BasicInfoForm />}
          {currentStep === 'skills' && <SkillsForm />}
          {currentStep === 'projects' && <ProjectsForm />}
          {currentStep === 'contact' && <ContactForm />}
          
          <FormActions>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentStep === 'basicInfo'}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentStep === 'contact'}
            >
              {currentStep === 'contact' ? 'Finish' : 'Next'}
            </Button>
          </FormActions>
        </FormContent>
      </Card>
    </FormWrapper>
  );
};

export default FormContainer;
