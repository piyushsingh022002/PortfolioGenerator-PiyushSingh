import React, { useState } from 'react';
import styled from 'styled-components';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Eye, 
  User, 
  Lightning, 
  FolderOpen, 
  EnvelopeSimple, 
  ArrowsIn, 
  ArrowsOut 
} from 'phosphor-react';
import {
  StyledHeroSection,
  StyledHeroTitle,
  StyledHeroSubtitle,
  StyledAboutSection,
  StyledSectionHeading,
  StyledAboutText,
  StyledLocationText,
  StyledSkillsSection,
  StyledSkillsContainer,
  StyledSkillItem,
  StyledSkillName,
  StyledProjectsSection,
  StyledProjectsGrid,
  StyledProjectCard,
  StyledProjectContent,
  StyledProjectTitle,
  StyledProjectDescription,
  StyledTechContainer,
  StyledTechTag,
  StyledContactSection,
  StyledContactGrid,
  StyledContactItem,
  StyledContactIcon,
  StyledContactLabel,
  StyledContactValue,
  StyledFooter
} from './sections/StyledSections';

// Create simplified placeholder sections for preview
const HeroSection: React.FC<{ name: string; title: string; avatar?: string }> = ({ name, title, avatar }) => (
  <StyledHeroSection>
    {avatar && <img src={avatar} alt={name} style={{ width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto 1rem' }} />}
    <StyledHeroTitle>{name || 'Your Name'}</StyledHeroTitle>
    <StyledHeroSubtitle>{title || 'Your Title'}</StyledHeroSubtitle>
  </StyledHeroSection>
);

const AboutSection: React.FC<{ bio: string; location?: string }> = ({ bio, location }) => (
  <StyledAboutSection>
    <StyledSectionHeading>About Me</StyledSectionHeading>
    <StyledAboutText>{bio || 'Add your bio in the form to see it here.'}</StyledAboutText>
    {location && <StyledLocationText>📍 {location}</StyledLocationText>}
  </StyledAboutSection>
);

const SkillsSection: React.FC<{ skills: any[] }> = ({ skills }) => (
  <StyledSkillsSection>
    <StyledSectionHeading>Skills & Expertise</StyledSectionHeading>
    <StyledSkillsContainer>
      {skills.length > 0 ? skills.map((skill) => (
        <StyledSkillItem key={skill.id}>
          <StyledSkillName>{skill.name}</StyledSkillName>
          <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map((level) => (
              <span key={level} style={{ 
                width: '1rem', 
                height: '0.5rem', 
                borderRadius: '0.25rem', 
                backgroundColor: skill.level >= level ? '#a855f7' : '#e5e7eb' 
              }} />
            ))}
          </div>
        </StyledSkillItem>
      )) : <p>Add your skills in the form to see them here.</p>}
    </StyledSkillsContainer>
  </StyledSkillsSection>
);

const ProjectsSection: React.FC<{ projects: any[] }> = ({ projects }) => (
  <StyledProjectsSection>
    <StyledSectionHeading>My Projects</StyledSectionHeading>
    <StyledProjectsGrid>
      {projects.length > 0 ? projects.map((project) => (
        <StyledProjectCard key={project.id}>
          {project.imageUrl && <div style={{ height: '200px', backgroundImage: `url(${project.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
          <StyledProjectContent>
            <StyledProjectTitle>{project.title}</StyledProjectTitle>
            <StyledProjectDescription>{project.description}</StyledProjectDescription>
            <StyledTechContainer>
              {project.technologies.map((tech: string) => (
                <StyledTechTag key={tech}>{tech}</StyledTechTag>
              ))}
            </StyledTechContainer>
          </StyledProjectContent>
        </StyledProjectCard>
      )) : <p style={{ textAlign: 'center' }}>Add your projects in the form to see them here.</p>}
    </StyledProjectsGrid>
  </StyledProjectsSection>
);

const ContactSection: React.FC<{ contact: any }> = ({ contact }) => (
  <StyledContactSection>
    <StyledSectionHeading>Get In Touch</StyledSectionHeading>
    <StyledContactGrid>
      {Object.keys(contact).some(key => contact[key]) ? (
        Object.entries(contact).map(([key, value]) => {
          if (!value) return null;
          return (
            <StyledContactItem key={key} href={key === 'email' ? `mailto:${value}` : String(value)}>
              <StyledContactIcon>
                {key === 'email' ? '✉️' : key === 'phone' ? '📱' : key === 'linkedin' ? '🔗' : key === 'github' ? '💻' : key === 'twitter' ? '🐦' : '🌐'}
              </StyledContactIcon>
              <StyledContactLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</StyledContactLabel>
              <StyledContactValue>{key === 'email' || key === 'phone' ? String(value) : 'View'}</StyledContactValue>
            </StyledContactItem>
          );
        }).filter(Boolean)
      ) : <p>Add your contact information in the form to see it here.</p>}
    </StyledContactGrid>
    <StyledFooter>
      © {new Date().getFullYear()} • Created with Portfolio Generator
    </StyledFooter>
  </StyledContactSection>
);

const PreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border + '30'};
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border + '10'};
`;

const PreviewTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Playfair Display', serif;
`;

const PreviewBrowserControls = styled.div`
  display: flex;
  gap: 6px;
  margin-right: 10px;
`;

const BrowserDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const BrowserAddressBar = styled.div`
  flex: 1;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 0.75rem;
  color: #666;
  margin: 0 10px;
`;

const PreviewContent = styled(motion.div)`
  min-height: 100vh;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  overflow: auto;
`;

const ViewFullButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SectionLabel = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${({ theme }) => theme.surface + 'CC'};
  backdrop-filter: blur(4px);
  color: ${({ theme }) => theme.text};
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PreviewContainer: React.FC = () => {
  const { portfolioData, currentStep } = usePortfolio();
  const { theme } = useTheme();
  const [showFullPreview, setShowFullPreview] = useState(false);
  
  const toggleFullPreview = () => {
    setShowFullPreview(!showFullPreview);
  };
  
  const getSectionIcon = () => {
    switch(currentStep) {
      case 'basicInfo': return <User size={16} />;
      case 'skills': return <Lightning size={16} />;
      case 'projects': return <FolderOpen size={16} />;
      case 'contact': return <EnvelopeSimple size={16} />;
      default: return <User size={16} />;
    }
  };
  
  const getSectionLabel = () => {
    switch(currentStep) {
      case 'basicInfo': return 'Basic Information';
      case 'skills': return 'Skills & Expertise';
      case 'projects': return 'Projects';
      case 'contact': return 'Contact Information';
      default: return 'Preview';
    }
  };
  
  return (
    <PreviewWrapper>
      <PreviewHeader>
        <PreviewBrowserControls>
          <BrowserDot color="#FF5F57" />
          <BrowserDot color="#FFBD2E" />
          <BrowserDot color="#28CA41" />
        </PreviewBrowserControls>
        
        <BrowserAddressBar>
          <Globe size={12} weight="bold" style={{ marginRight: '6px' }} />
          myportfolio.com/{portfolioData.basicInfo.name?.toLowerCase().replace(/\s+/g, '') || 'yourname'}
        </BrowserAddressBar>
        
        <PreviewTitle>
          <Eye size={18} />
          Live Preview
        </PreviewTitle>
      </PreviewHeader>
      <PreviewContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!showFullPreview && <SectionLabel>{getSectionIcon()} {getSectionLabel()}</SectionLabel>}
        
        {(showFullPreview || currentStep === 'basicInfo') && (
          <HeroSection 
            name={portfolioData.basicInfo.name} 
            title={portfolioData.basicInfo.title}
            avatar={portfolioData.basicInfo.avatar}
          />
        )}
        
        {(showFullPreview || currentStep === 'basicInfo') && (
          <AboutSection 
            bio={portfolioData.basicInfo.bio}
            location={portfolioData.basicInfo.location}
          />
        )}
        
        {(showFullPreview || currentStep === 'skills') && (
          <SkillsSection skills={portfolioData.skills} />
        )}
        
        {(showFullPreview || currentStep === 'projects') && (
          <ProjectsSection projects={portfolioData.projects} />
        )}
        
        {(showFullPreview || currentStep === 'contact') && (
          <ContactSection contact={portfolioData.contact} />
        )}
        
        <ViewFullButton onClick={toggleFullPreview}>
          {showFullPreview ? (
            <>
              <ArrowsIn size={16} />
              View Current Section
            </>
          ) : (
            <>
              <ArrowsOut size={16} />
              View Full Preview
            </>
          )}
        </ViewFullButton>
      </PreviewContent>
    </PreviewWrapper>
  );
};

export default PreviewContainer;
