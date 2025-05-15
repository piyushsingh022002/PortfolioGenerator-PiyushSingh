import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { usePortfolio } from '../../context/PortfolioContext';
import { Contact } from '../../types';
import { motion } from 'framer-motion';

const FormContainer = styled(motion.div)`
  width: 100%;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SocialPreview = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
`;

const SocialTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.375rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactForm: React.FC = () => {
  const { portfolioData, updateContact, setCurrentStep } = usePortfolio();
  const [formData, setFormData] = useState<Contact>(portfolioData.contact);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(formData);
  };
  
  const handleBack = () => {
    setCurrentStep('projects');
  };
  
  const handleFinish = () => {
    updateContact(formData);
    // You could add additional logic here for when the user completes all steps
    // For example, showing a success message or redirecting to the preview
  };
  
  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        title="Contact Information"
        subtitle="How can people reach you?"
        elevation="medium"
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              fullWidth
            />
            
            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="+1 (123) 456-7890"
              fullWidth
            />
          </FormGrid>
          
          <FormGrid>
            <Input
              label="LinkedIn Profile"
              name="linkedin"
              value={formData.linkedin || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourname"
              fullWidth
            />
            
            <Input
              label="GitHub Profile"
              name="github"
              value={formData.github || ''}
              onChange={handleChange}
              placeholder="https://github.com/username"
              fullWidth
            />
          </FormGrid>
          
          <FormGrid>
            <Input
              label="Twitter Profile"
              name="twitter"
              value={formData.twitter || ''}
              onChange={handleChange}
              placeholder="https://twitter.com/username"
              fullWidth
            />
            
            <Input
              label="Personal Website"
              name="website"
              value={formData.website || ''}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              fullWidth
            />
          </FormGrid>
          
          {Object.values(formData).some(value => value) && (
            <SocialPreview>
              <SocialTitle>Your Contact Links</SocialTitle>
              <SocialLinks>
                {formData.email && (
                  <SocialLink href={`mailto:${formData.email}`}>
                    ✉️ Email
                  </SocialLink>
                )}
                {formData.phone && (
                  <SocialLink href={`tel:${formData.phone}`}>
                    📱 Phone
                  </SocialLink>
                )}
                {formData.linkedin && (
                  <SocialLink href={formData.linkedin} target="_blank" rel="noopener noreferrer">
                    🔗 LinkedIn
                  </SocialLink>
                )}
                {formData.github && (
                  <SocialLink href={formData.github} target="_blank" rel="noopener noreferrer">
                    💻 GitHub
                  </SocialLink>
                )}
                {formData.twitter && (
                  <SocialLink href={formData.twitter} target="_blank" rel="noopener noreferrer">
                    🐦 Twitter
                  </SocialLink>
                )}
                {formData.website && (
                  <SocialLink href={formData.website} target="_blank" rel="noopener noreferrer">
                    🌐 Website
                  </SocialLink>
                )}
              </SocialLinks>
            </SocialPreview>
          )}
          
          <ButtonsContainer>
            <Button 
              variant="secondary" 
              onClick={handleBack}
            >
              Back
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              onClick={handleFinish}
              disabled={!formData.email}
            >
              Finish
            </Button>
          </ButtonsContainer>
        </form>
      </Card>
    </FormContainer>
  );
};

export default ContactForm;
