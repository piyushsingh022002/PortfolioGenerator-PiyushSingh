import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { usePortfolio } from '../../context/PortfolioContext';
import { Skill } from '../../types';
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

const SkillLevelContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillLevelLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const SkillLevelSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.border};
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
  
  &::-moz-range-thumb {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const SkillLevelValue = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const SkillsList = styled.div`
  margin: 2rem 0;
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(5px);
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;

const SkillInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkillName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const SkillCategory = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const SkillLevel = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const LevelDot = styled.span<{ filled: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ theme, filled }) => 
    filled ? theme.primary : theme.border};
`;

const SkillActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NoSkillsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.375rem;
  border: 1px dashed ${({ theme }) => theme.border};
`;

const SkillsForm: React.FC = () => {
  const { portfolioData, addSkill, updateSkill, removeSkill, setCurrentStep } = usePortfolio();
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 3,
    category: 'frontend',
  });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  
  const categoryOptions = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'design', label: 'Design' },
    { value: 'other', label: 'Other' },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      level: parseInt(e.target.value),
    }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value as 'frontend' | 'backend' | 'design' | 'other',
    }));
  };
  
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSkill) {
      updateSkill({
        ...formData,
        id: editingSkill.id,
      });
      setEditingSkill(null);
    } else {
      addSkill(formData);
    }
    
    // Reset form
    setFormData({
      name: '',
      level: 3,
      category: 'frontend',
    });
  };
  
  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
  };
  
  const handleCancelEdit = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      level: 3,
      category: 'frontend',
    });
  };
  
  const handleNext = () => {
    setCurrentStep('projects');
  };
  
  const handleBack = () => {
    setCurrentStep('basicInfo');
  };
  
  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        title="Skills"
        subtitle="Add your technical skills and expertise"
        elevation="medium"
        fullWidth
      >
        <form onSubmit={handleAddSkill}>
          <FormGrid>
            <Input
              label="Skill Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="React, JavaScript, UI Design, etc."
              required
              fullWidth
            />
            
            <Select
              label="Category"
              name="category"
              value={formData.category}
              options={categoryOptions}
              onChange={handleCategoryChange}
              fullWidth
            />
          </FormGrid>
          
          <SkillLevelContainer>
            <SkillLevelLabel>Skill Level: {formData.level}</SkillLevelLabel>
            <SkillLevelSlider
              type="range"
              min="1"
              max="5"
              value={formData.level}
              onChange={handleLevelChange}
            />
            <SkillLevelValue>
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </SkillLevelValue>
          </SkillLevelContainer>
          
          <Button 
            type="submit" 
            variant="primary"
          >
            {editingSkill ? 'Update Skill' : 'Add Skill'}
          </Button>
          
          {editingSkill && (
            <Button 
              type="button" 
              variant="outline"
              onClick={handleCancelEdit}
              style={{ marginLeft: '0.5rem' }}
            >
              Cancel
            </Button>
          )}
        </form>
        
        <SkillsList>
          <h4>Your Skills ({portfolioData.skills.length})</h4>
          
          {portfolioData.skills.length === 0 ? (
            <NoSkillsMessage>
              No skills added yet. Add your first skill above.
            </NoSkillsMessage>
          ) : (
            portfolioData.skills.map((skill) => (
              <SkillItem key={skill.id}>
                <SkillInfo>
                  <SkillName>{skill.name}</SkillName>
                  <SkillCategory>
                    {categoryOptions.find(opt => opt.value === skill.category)?.label}
                  </SkillCategory>
                </SkillInfo>
                
                <SkillLevel>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <LevelDot key={level} filled={skill.level >= level} />
                  ))}
                </SkillLevel>
                
                <SkillActions>
                  <Button 
                    variant="text" 
                    size="small"
                    onClick={() => handleEditSkill(skill)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="text" 
                    size="small"
                    onClick={() => removeSkill(skill.id)}
                  >
                    Remove
                  </Button>
                </SkillActions>
              </SkillItem>
            ))
          )}
        </SkillsList>
        
        <ButtonsContainer>
          <Button 
            variant="secondary" 
            onClick={handleBack}
          >
            Back
          </Button>
          <Button 
            variant="primary" 
            onClick={handleNext}
            disabled={portfolioData.skills.length === 0}
          >
            Continue to Projects
          </Button>
        </ButtonsContainer>
      </Card>
    </FormContainer>
  );
};

export default SkillsForm;
