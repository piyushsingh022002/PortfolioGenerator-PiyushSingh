import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    shadow: string;
    cardBackground: string;
    sidebarBackground: string;
    navbarBackground: string;
    isDarkMode?: boolean;
  }
}
