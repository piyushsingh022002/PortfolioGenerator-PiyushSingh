import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';
import Button from '../common/Button';
import PreviewContainer from '../preview/PreviewContainer';
import { ArrowLeft, Copy, Download, FileText, FilePdf } from 'phosphor-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ExportPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.navbarBackground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.surface};
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  flex: 1;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const PreviewSection = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: calc(100vh - 12rem);
  overflow-y: auto;
`;

const CodeSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: calc(100vh - 12rem);
`;

const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const CodeTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const CodeActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const CodeContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', 'Andale Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

const Footer = styled.footer`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.surface};
  border-top: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const CopyrightText = styled.p`
  margin: 0;
`;

const SuccessMessage = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: ${({ theme }) => theme.success};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: fadeInOut 3s forwards;
  
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(20px); }
  }
`;

interface LocationState {
  exportTheme: 'purple' | 'dark';
}

const ExportPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const exportTheme = state?.exportTheme || 'purple';
  const { theme } = useTheme();
  const { portfolioData } = usePortfolio();
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const navigate = useNavigate();
  
  const currentYear = new Date().getFullYear();
  const copyrightInfo = `© ${currentYear} Piyush Singh. All rights reserved. | Contact: piyushsingh022002@gmail.com`;
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  const generateHtmlCode = () => {
    const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolioData.basicInfo.name} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${exportTheme === 'purple' ? '#a855f7' : '#a855f7'};
      --secondary: ${exportTheme === 'purple' ? '#9333ea' : '#9333ea'};
      --background: ${exportTheme === 'purple' ? '#ffffff' : '#111827'};
      --surface: ${exportTheme === 'purple' ? '#f9fafb' : '#1f2937'};
      --text: ${exportTheme === 'purple' ? '#1f2937' : '#f9fafb'};
      --text-secondary: ${exportTheme === 'purple' ? '#4b5563' : '#d1d5db'};
      --border: ${exportTheme === 'purple' ? '#e5e7eb' : '#374151'};
      --card-background: ${exportTheme === 'purple' ? '#ffffff' : '#1f2937'};
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
    }
    
    header {
      background-color: var(--card-background);
      padding: 2rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    h1, h2, h3, h4 {
      color: var(--text);
      margin-bottom: 1rem;
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    h2 {
      font-size: 2rem;
      margin-top: 2rem;
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    .section {
      margin-bottom: 3rem;
    }
    
    .card {
      background-color: var(--card-background);
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
    }
    
    .profile {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--primary);
    }
    
    .profile-info {
      flex: 1;
    }
    
    .title {
      color: var(--text-secondary);
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    
    .skills {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .skill {
      display: flex;
      flex-direction: column;
    }
    
    .skill-name {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .skill-bar {
      height: 8px;
      background-color: var(--surface);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .skill-level {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
    }
    
    .projects {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .project {
      background-color: var(--card-background);
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    
    .project:hover {
      transform: translateY(-5px);
    }
    
    .project-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .project-content {
      padding: 1.5rem;
    }
    
    .project-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .project-description {
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .tech-tag {
      background-color: var(--surface);
      color: var(--text);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
    }
    
    .project-links {
      display: flex;
      gap: 1rem;
    }
    
    .project-link {
      color: var(--primary);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .contact {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .contact-link {
      color: var(--primary);
      text-decoration: none;
    }
    
    footer {
      background-color: var(--surface);
      padding: 1.5rem;
      text-align: center;
      margin-top: 3rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .profile {
        flex-direction: column;
        text-align: center;
      }
      
      .projects {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="profile">
        ${portfolioData.basicInfo.avatar ? 
          `<img src="${portfolioData.basicInfo.avatar}" alt="${portfolioData.basicInfo.name}" class="profile-image">` : 
          ''}
        <div class="profile-info">
          <h1>${portfolioData.basicInfo.name}</h1>
          <p class="title">${portfolioData.basicInfo.title}</p>
          <p>${portfolioData.basicInfo.bio}</p>
          ${portfolioData.basicInfo.location ? 
            `<p>📍 ${portfolioData.basicInfo.location}</p>` : 
            ''}
        </div>
      </div>
    </div>
  </header>
  
  <main class="container">
    <section class="section">
      <h2>Skills</h2>
      <div class="card">
        <div class="skills">
          ${portfolioData.skills.map(skill => `
            <div class="skill">
              <span class="skill-name">${skill.name}</span>
              <div class="skill-bar">
                <div class="skill-level" style="width: ${skill.level * 20}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    
    <section class="section">
      <h2>Projects</h2>
      <div class="projects">
        ${portfolioData.projects.map(project => `
          <div class="project">
            ${project.imageUrl ? 
              `<img src="${project.imageUrl}" alt="${project.title}" class="project-image">` : 
              ''}
            <div class="project-content">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-description">${project.description}</p>
              <div class="project-tech">
                ${project.technologies.map(tech => `
                  <span class="tech-tag">${tech}</span>
                `).join('')}
              </div>
              <div class="project-links">
                ${project.projectUrl ? 
                  `<a href="${project.projectUrl}" class="project-link" target="_blank">Live Demo</a>` : 
                  ''}
                ${project.githubUrl ? 
                  `<a href="${project.githubUrl}" class="project-link" target="_blank">GitHub</a>` : 
                  ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
    
    <section class="section">
      <h2>Contact</h2>
      <div class="card">
        <div class="contact">
          ${portfolioData.contact.email ? 
            `<div class="contact-item">
              <a href="mailto:${portfolioData.contact.email}" class="contact-link">${portfolioData.contact.email}</a>
            </div>` : 
            ''}
          ${portfolioData.contact.phone ? 
            `<div class="contact-item">
              <a href="tel:${portfolioData.contact.phone}" class="contact-link">${portfolioData.contact.phone}</a>
            </div>` : 
            ''}
          ${portfolioData.contact.linkedin ? 
            `<div class="contact-item">
              <a href="${portfolioData.contact.linkedin}" class="contact-link" target="_blank">LinkedIn</a>
            </div>` : 
            ''}
          ${portfolioData.contact.github ? 
            `<div class="contact-item">
              <a href="${portfolioData.contact.github}" class="contact-link" target="_blank">GitHub</a>
            </div>` : 
            ''}
          ${portfolioData.contact.twitter ? 
            `<div class="contact-item">
              <a href="${portfolioData.contact.twitter}" class="contact-link" target="_blank">Twitter</a>
            </div>` : 
            ''}
          ${portfolioData.contact.website ? 
            `<div class="contact-item">
              <a href="${portfolioData.contact.website}" class="contact-link" target="_blank">Website</a>
            </div>` : 
            ''}
        </div>
      </div>
    </section>
  </main>
  
  <footer>
    <div class="container">
      <p>${copyrightInfo}</p>
    </div>
  </footer>
</body>
</html>
    `;
    
    return htmlCode.trim();
  };
  
  const handleCopyCode = () => {
    if (codeRef.current) {
      const code = codeRef.current.textContent || '';
      navigator.clipboard.writeText(code);
      setShowCopySuccess(true);
      
      setTimeout(() => {
        setShowCopySuccess(false);
      }, 3000);
    }
  };
  
  const handleDownloadHTML = () => {
    const code = generateHtmlCode();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolioData.basicInfo.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleDownloadPDF = () => {
    // This would typically use a library like jsPDF or html2pdf
    // For simplicity, we'll just download the HTML for now
    handleDownloadHTML();
  };
  
  return (
    <ExportPageContainer>
      <Header>
        <BackButton onClick={handleGoBack}>
          <ArrowLeft size={20} />
          Back to Editor
        </BackButton>
        <HeaderTitle>
          <FileText size={24} />
          Export Portfolio
        </HeaderTitle>
      </Header>
      
      <ContentContainer>
        <PreviewSection>
          <PreviewContainer />
        </PreviewSection>
        
        <CodeSection>
          <CodeHeader>
            <CodeTitle>HTML Code</CodeTitle>
            <CodeActions>
              <ActionButton onClick={handleCopyCode} title="Copy code">
                <Copy size={20} />
              </ActionButton>
              <ActionButton onClick={handleDownloadHTML} title="Download HTML">
                <Download size={20} />
              </ActionButton>
              <ActionButton onClick={handleDownloadPDF} title="Download PDF">
                <FilePdf size={20} />
              </ActionButton>
            </CodeActions>
          </CodeHeader>
          
          <CodeContent>
            <CodeBlock ref={codeRef}>
              {generateHtmlCode()}
            </CodeBlock>
          </CodeContent>
        </CodeSection>
      </ContentContainer>
      
      <Footer>
        <CopyrightText>{copyrightInfo}</CopyrightText>
      </Footer>
      
      {showCopySuccess && (
        <SuccessMessage>
          <Copy size={16} weight="bold" />
          Code copied to clipboard!
        </SuccessMessage>
      )}
    </ExportPageContainer>
  );
};

export default ExportPage;
