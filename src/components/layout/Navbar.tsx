import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import Select from '../common/Select';
import { ThemeMode } from '../../types';
import { FileText } from 'phosphor-react';

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

const ThemeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(145deg, ${({ theme }) => theme.surface + '90'}, ${({ theme }) => theme.surface + '60'});
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.border + '20'};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const ThemeLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 768px) {
    display: none;
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

const StyledSelect = styled(Select)`
  min-width: 120px;
  select {
    background-color: ${({ theme }) => theme.background + '90'};
    backdrop-filter: blur(8px);
    border-color: ${({ theme }) => theme.border + '40'};
    font-weight: 500;
    padding: 0.6rem 1rem;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  }
`;

interface NavbarProps {
  onExport: () => void;
  onPreview: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onExport, onPreview }) => {
  const { themeMode, setThemeMode } = useTheme();
  
  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'purple', label: 'Purple' },
    { value: 'blue', label: 'Blue' },
  ];
  
  const handleThemeChange = (value: string) => {
    setThemeMode(value as ThemeMode);
  };
  
  return (
    <NavbarContainer>
      <Logo>
        <LogoIcon>
          <FileText size={24} weight="bold" />
        </LogoIcon>
        Piyush's Portfolio Generator
      </Logo>
      
      <NavbarActions>
        <ThemeSelector>
          <ThemeLabel>Theme:</ThemeLabel>
          <StyledSelect
            options={themeOptions}
            value={themeMode}
            onChange={handleThemeChange}
          />
        </ThemeSelector>
        
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
