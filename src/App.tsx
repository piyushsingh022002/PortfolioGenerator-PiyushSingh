import React, { useState, useCallback, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/layout/Layout';
import FormContainer from './components/form/FormContainer';
import PreviewContainer from './components/preview/PreviewContainer';
import Button from './components/common/Button';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.background}, ${theme.surface})`};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${({ theme }) => `radial-gradient(circle, ${theme.primary}10 0%, transparent 50%)`};
    z-index: 0;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  align-items: start;
  
  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PreviewWrapper = styled.div`
  display: none;
  position: sticky;
  top: 6rem;
  height: calc(100vh - 8rem);
  width: 100%;
  
  @media (min-width: 1280px) {
    display: block;
  }
`;

const FullScreenPreview = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.background};
  z-index: 1000;
  overflow: auto;
  padding: 1rem;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ExportModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

const ModalContent = styled.div`
  margin-bottom: 1.5rem;
`;

const ThemeOption = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, isSelected }) => isSelected ? theme.primary + '20' : theme.surface};
  border: 2px solid ${({ theme, isSelected }) => isSelected ? theme.primary : theme.border};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme, isSelected }) => isSelected ? theme.primary + '30' : theme.border + '50'};
  }
`;

const ThemeColor = styled.div<{ color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const App: React.FC = () => {
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [exportTheme, setExportTheme] = useState<'light' | 'dark'>('light');
  const htmlRef = useRef<HTMLDivElement>(null);
  
  const handleExport = useCallback(() => {
    setExportModalOpen(true);
  }, []);
  
  const handlePreview = useCallback(() => {
    setPreviewOpen(true);
  }, []);
  
  const handleClosePreview = useCallback(() => {
    setPreviewOpen(false);
  }, []);
  
  const handleCloseExportModal = useCallback(() => {
    setExportModalOpen(false);
  }, []);
  
  const handleExportConfirm = useCallback(() => {
    // Implementation for exporting the portfolio
    // This would generate HTML/CSS files based on the portfolio data and selected theme
    
    // Create a downloadable HTML file
    if (htmlRef.current) {
      const portfolioHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>My Portfolio</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            :root {
              --primary: ${exportTheme === 'light' ? '#6366f1' : '#818cf8'};
              --background: ${exportTheme === 'light' ? '#ffffff' : '#111827'};
              --text: ${exportTheme === 'light' ? '#1f2937' : '#f9fafb'};
              /* Add more CSS variables based on the theme */
            }
            /* Add the rest of your CSS here */
            body {
              font-family: 'Inter', sans-serif;
              background-color: var(--background);
              color: var(--text);
              margin: 0;
              padding: 0;
            }
            /* You would include all the necessary CSS for the portfolio here */
          </style>
        </head>
        <body>
          ${htmlRef.current.innerHTML}
        </body>
        </html>
      `;
      
      // Create a download link
      const element = document.createElement('a');
      const file = new Blob([portfolioHTML], {type: 'text/html'});
      element.href = URL.createObjectURL(file);
      element.download = 'my-portfolio.html';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setExportModalOpen(false);
    }
  }, [exportTheme]);
  
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <GlobalStyles />
        <AppContainer>
          <Layout onExport={handleExport} onPreview={handlePreview} />
          
          {/* Full screen preview */}
          <AnimatePresence>
            {previewOpen && (
              <>
                <Overlay 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleClosePreview}
                />
                <FullScreenPreview
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CloseButton onClick={handleClosePreview}>✕</CloseButton>
                  <div ref={htmlRef}>
                    <PreviewContainer />
                  </div>
                </FullScreenPreview>
              </>
            )}
          </AnimatePresence>
          
          {/* Export modal */}
          <AnimatePresence>
            {exportModalOpen && (
              <>
                <Overlay 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleCloseExportModal}
                />
                <ExportModal
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ModalTitle>Export Portfolio</ModalTitle>
                  <ModalContent>
                    <p>Choose the theme for your exported portfolio:</p>
                    
                    <ThemeOption 
                      isSelected={exportTheme === 'light'}
                      onClick={() => setExportTheme('light')}
                    >
                      <ThemeColor color="#ffffff" />
                      <span>Light Theme</span>
                    </ThemeOption>
                    
                    <ThemeOption 
                      isSelected={exportTheme === 'dark'}
                      onClick={() => setExportTheme('dark')}
                    >
                      <ThemeColor color="#111827" />
                      <span>Dark Theme</span>
                    </ThemeOption>
                  </ModalContent>
                  <ModalActions>
                    <Button 
                      variant="secondary" 
                      onClick={handleCloseExportModal}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={handleExportConfirm}
                    >
                      Export
                    </Button>
                  </ModalActions>
                </ExportModal>
              </>
            )}
          </AnimatePresence>
        </AppContainer>
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default App;
