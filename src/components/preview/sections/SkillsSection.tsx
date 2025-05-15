import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Skill } from '../../../types';

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsContainer = styled.section`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: ${({ theme }) => theme.primary};
  }
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  width: 100%;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SkillCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SkillName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const SkillCategory = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.primary + '20'};
  color: ${({ theme }) => theme.primary};
  border-radius: 1rem;
  text-transform: capitalize;
`;

const SkillLevel = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const LevelDot = styled.span<{ filled: boolean }>`
  width: 1rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ theme, filled }) => 
    filled ? theme.primary : theme.border};
  transition: background-color 0.3s ease;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 0.5rem;
`;

const NoSkillsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  border: 1px dashed ${({ theme }) => theme.border};
`;

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
  
  // Get category display names
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'Frontend Development';
      case 'backend':
        return 'Backend Development';
      case 'design':
        return 'Design';
      case 'other':
        return 'Other Skills';
      default:
        return category;
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };
  
  return (
    <SkillsContainer id="skills">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Skills & Expertise
      </SectionTitle>
      
      <ContentContainer>
        {skills.length === 0 ? (
          <NoSkillsMessage>
            Add your skills in the form to see them here.
          </NoSkillsMessage>
        ) : (
          Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <CategoryTitle>{getCategoryName(category)}</CategoryTitle>
              <SkillsGrid>
                {categorySkills.map((skill, index) => (
                  <SkillCard
                    key={skill.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                  >
                    <SkillHeader>
                      <SkillName>{skill.name}</SkillName>
                      <SkillCategory>{category}</SkillCategory>
                    </SkillHeader>
                    <SkillLevel>
                      {[1, 2, 3, 4, 5].map((level) => (
                        <LevelDot key={level} filled={skill.level >= level} />
                      ))}
                    </SkillLevel>
                  </SkillCard>
                ))}
              </SkillsGrid>
            </div>
          ))
        )}
      </ContentContainer>
    </SkillsContainer>
  );
};

export default SkillsSection;
