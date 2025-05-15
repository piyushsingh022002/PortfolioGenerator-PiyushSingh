import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';

const FormContainer = styled(motion.div)`
  width: 100%;
`;

const AvatarUploadContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const AvatarPreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.border};
  overflow: hidden;
  margin-bottom: 1rem;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarUploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BasicInfoForm: React.FC = () => {
  const { portfolioData, updateBasicInfo, setCurrentStep } = usePortfolio();
  const [formData, setFormData] = useState(portfolioData.basicInfo);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBasicInfo(formData);
    setCurrentStep('skills');
  };
  
  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        title="Basic Information"
        subtitle="Tell us about yourself"
        elevation="medium"
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <AvatarUploadContainer>
            <AvatarPreview>
              {formData.avatar ? (
                <AvatarImage src={formData.avatar} alt="Avatar preview" />
              ) : null}
            </AvatarPreview>
            <AvatarUploadLabel>
              <span>Upload Photo</span>
              <HiddenInput 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange} 
              />
            </AvatarUploadLabel>
          </AvatarUploadContainer>
          
          <FormGrid>
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              fullWidth
            />
            
            <Input
              label="Professional Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Frontend Developer"
              required
              fullWidth
            />
          </FormGrid>
          
          <TextArea
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short bio about yourself..."
            required
            fullWidth
          />
          
          <Input
            label="Location"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            placeholder="City, Country"
            fullWidth
          />
          
          <Button 
            type="submit" 
            variant="primary"
            size="large"
            fullWidth
          >
            Continue to Skills
          </Button>
        </form>
      </Card>
    </FormContainer>
  );
};

export default BasicInfoForm;
