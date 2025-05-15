import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  name: string;
  title: string;
  avatar?: string;
}

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => `radial-gradient(circle, ${theme.primary}10 0%, transparent 70%)`};
    z-index: -1;
  }
`;

const AvatarContainer = styled(motion.div)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 3px solid ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.shadow};
  
  @media (min-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.5rem;
`;

const ScrollIcon = styled(motion.div)`
  width: 1.5rem;
  height: 2.5rem;
  border: 2px solid ${({ theme }) => theme.textSecondary};
  border-radius: 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: 50%;
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${({ theme }) => theme.textSecondary};
    border-radius: 50%;
    transform: translateX(-50%);
  }
`;

const HeroSection: React.FC<HeroSectionProps> = ({ name, title, avatar }) => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <HeroContainer>
      {avatar && (
        <AvatarContainer
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Avatar src={avatar} alt={name} />
        </AvatarContainer>
      )}
      
      <Name
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {name || 'Your Name'}
      </Name>
      
      <Title
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {title || 'Your Title'}
      </Title>
      
      <ScrollIndicator
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ScrollText>Scroll Down</ScrollText>
        <ScrollIcon
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
