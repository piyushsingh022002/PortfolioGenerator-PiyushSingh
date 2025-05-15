import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { List } from 'phosphor-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import FormContainer from '../form/FormContainer';
import PreviewContainer from '../preview/PreviewContainer';

// Custom hook for media query
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    
    // Add event listener
    mediaQuery.addEventListener('change', handler);
    
    // Clean up
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

interface LayoutProps {
  onExport: () => void;
  onPreview: () => void;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  overflow-x: hidden;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 0.5rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem 0.5rem;
  overflow-y: auto;
  gap: 1.5rem;
  
  @media (max-width: 1200px) {
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
    margin-bottom: 1rem;
  }
`;

const ContentArea = styled.div<{ sidebarOpen: boolean }>`
  flex: 1;
  padding: 2rem;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '280px' : '0')};
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 80;
  display: none;
  
  @media (max-width: 1023px) {
    display: block;
  }
`;

const MobileMenuButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(145deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Layout: React.FC<LayoutProps> = ({ onExport, onPreview }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <LayoutContainer>
      <Navbar onExport={onExport} onPreview={onPreview} />
      <MainContainer>
        <Sidebar 
          isMobile={isMobile} 
          isOpen={sidebarOpen} 
          onToggle={toggleSidebar} 
        />
        <ContentContainer>
          <FormContainer />
          <PreviewContainer />
        </ContentContainer>
      </MainContainer>
      <Footer />
      {isMobile && (
        <MobileMenuButton onClick={toggleSidebar} aria-label="Toggle sidebar">
          <List size={24} weight="bold" />
        </MobileMenuButton>
      )}
      {isMobile && sidebarOpen && (
        <Overlay 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        />
      )}
    </LayoutContainer>
  );
};

export default Layout;
