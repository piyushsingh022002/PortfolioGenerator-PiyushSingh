import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import { FileText, Moon, Sun } from 'phosphor-react';

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.background + '80'};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.border + '30'};
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const NavbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(145deg, ${({ theme }) => theme.surface + '90'}, ${({ theme }) => theme.surface + '60'});
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.border + '20'};
  transition: all 0.3s ease;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background-color: ${({ theme }) => theme.isDarkMode ? theme.primary : theme.surface};
  border-radius: 10px;
  padding: 2px;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  
  &:after {
    content: '';
    position: absolute;
    left: ${({ theme }) => theme.isDarkMode ? '22px' : '2px'};
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.isDarkMode ? '#fff' : theme.primary};
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`;

interface NavbarProps {
  onExport: () => void;
}

const PreviewButton = styled(Button)`
  margin-right: 1rem;
  backdrop-filter: blur(8px);
  background: linear-gradient(145deg, ${({ theme }) => theme.surface + '90'}, ${({ theme }) => theme.surface + '70'});
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border + '30'};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background: linear-gradient(145deg, ${({ theme }) => theme.surface}, ${({ theme }) => theme.surface + '90'});
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    flex: 1;
  }
`;

const ThemeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;

interface NavbarProps {
  onExport: () => void;
  onPreview: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onExport, onPreview }) => {
  const { toggleDarkMode, isDarkMode } = useTheme();
  
  return (
    <NavbarContainer>
      <Logo>
        <LogoIcon>
          <FileText size={24} weight="bold" />
        </LogoIcon>
        Piyush's Portfolio Generator
      </Logo>
      
      <NavbarActions>
        <ThemeToggle onClick={toggleDarkMode}>
          <ThemeIcon>
            {isDarkMode ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
          </ThemeIcon>
          <ToggleSwitch />
        </ThemeToggle>
        
        <PreviewButton 
          variant="secondary"
          onClick={onPreview}
        >
          Preview
        </PreviewButton>
        
        <Button 
          variant="primary"
          onClick={onExport}
        >
          Export
        </Button>
      </NavbarActions>
    </NavbarContainer>
  );
};

export default Navbar;
