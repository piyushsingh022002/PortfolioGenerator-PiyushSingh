import React from 'react';
import styled from 'styled-components';
import { GithubLogo, InstagramLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';

const FooterContainer = styled.footer`
  padding: 2rem;
  background-color: ${({ theme }) => theme.surface + '80'};
  backdrop-filter: blur(8px);
  border-top: 1px solid ${({ theme }) => theme.border + '50'};
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 250px;
  
  @media (min-width: 768px) {
    padding-right: 1.5rem;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 2rem;
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    background-color: ${({ theme }) => theme.primary};
    color: white;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.75rem;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border + '30'};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  width: 100%;
`;

const GlassCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground + '60'};
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.border + '30'};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About Me</FooterTitle>
          <GlassCard>
            <FooterText>
              I'm Piyush Singh, a passionate developer with expertise in React, TypeScript, and modern web technologies. 
              I love creating beautiful, functional, and user-friendly applications that solve real-world problems.
            </FooterText>
            <FooterText>
              This Portfolio Generator is one of my projects designed to help others showcase their work professionally.
              Feel free to reach out if you have any questions or suggestions!
            </FooterText>
            <SocialLinks>
              <SocialLink href="https://github.com/piyushsingh022002" target="_blank" rel="noopener noreferrer">
                <GithubLogo size={24} weight="bold" />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/piyushsingh022002/" target="_blank" rel="noopener noreferrer">
                <InstagramLogo size={24} weight="bold" />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/piyushsingh022002/" target="_blank" rel="noopener noreferrer">
                <LinkedinLogo size={24} weight="bold" />
              </SocialLink>
            </SocialLinks>
          </GlassCard>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <GlassCard>
            <ContactItem href="mailto:piyushsingh022002@gmail.com">
              <EnvelopeSimple size={20} />
              piyushsingh022002@gmail.com
            </ContactItem>
            <ContactItem href="https://github.com/piyushsingh022002" target="_blank" rel="noopener noreferrer">
              <GithubLogo size={20} />
              github.com/piyushsingh022002
            </ContactItem>
            <ContactItem href="https://www.linkedin.com/in/piyushsingh022002/" target="_blank" rel="noopener noreferrer">
              <LinkedinLogo size={20} />
              linkedin.com/in/piyushsingh022002
            </ContactItem>
          </GlassCard>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Portfolio</FooterTitle>
          <GlassCard>
            <FooterText>
              Check out my portfolio to see more of my work and projects. I'm always working on something new and exciting!
            </FooterText>
            <ContactItem href="https://piyushsingh.vercel.app" target="_blank" rel="noopener noreferrer">
              Visit My Portfolio
            </ContactItem>
          </GlassCard>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} Piyush Singh. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
