import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeMode } from '../types';

// Theme definitions
const purpleTheme = {
  primary: '#a855f7',
  secondary: '#9333ea',
  background: '#ffffff',
  surface: '#f9fafb',
  text: '#1f2937',
  textSecondary: '#4b5563',
  border: '#e5e7eb',
  error: '#ef4444',
  success: '#10b981',
  shadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  cardBackground: '#ffffff',
  sidebarBackground: '#f5f3ff',
  navbarBackground: '#ffffff',
};

const darkTheme = {
  primary: '#a855f7',
  secondary: '#9333ea',
  background: '#111827',
  surface: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#d1d5db',
  border: '#374151',
  error: '#f87171',
  success: '#34d399',
  shadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  cardBackground: '#1f2937',
  sidebarBackground: '#111827',
  navbarBackground: '#111827',
};

const themes = {
  purple: purpleTheme,
  dark: darkTheme,
};

// Context type
interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  theme: typeof purpleTheme;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

// Create context
const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'purple',
  setThemeMode: () => {},
  theme: purpleTheme,
  toggleDarkMode: () => {},
  isDarkMode: false,
});

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('purple');
  const isDarkMode = themeMode === 'dark';
  
  // Get theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme && (savedTheme === 'purple' || savedTheme === 'dark')) {
      setThemeMode(savedTheme);
    }
  }, []);
  
  // Save theme to localStorage on change
  useEffect(() => {
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);
  
  const toggleDarkMode = () => {
    setThemeMode(prevMode => prevMode === 'purple' ? 'dark' : 'purple');
  };
  
  const theme = {
    ...themes[themeMode],
    isDarkMode: themeMode === 'dark'
  };
  
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, theme, toggleDarkMode, isDarkMode }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);
