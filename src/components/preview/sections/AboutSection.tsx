import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  bio: string;
  location?: string;
}

const AboutContainer = styled.section`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.surface};
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

const ContentContainer = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  text-align: center;
`;

const BioText = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const LocationText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const LocationIcon = styled.span`
  font-size: 1.25rem;
`;

const AboutSection: React.FC<AboutSectionProps> = ({ bio, location }) => {
  return (
    <AboutContainer id="about">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </SectionTitle>
      
      <ContentContainer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BioText>{bio || 'Add your bio in the form to see it here.'}</BioText>
        
        {location && (
          <LocationText>
            <LocationIcon>📍</LocationIcon>
            {location}
          </LocationText>
        )}
      </ContentContainer>
    </AboutContainer>
  );
};

export default AboutSection;
