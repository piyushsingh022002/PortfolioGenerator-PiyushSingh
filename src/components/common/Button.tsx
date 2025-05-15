import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const getButtonStyles = (variant: ButtonVariant, theme: any) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.primary};
        background-image: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});
        color: white;
        border: none;
        box-shadow: 0 4px 15px ${theme.primary}40;
        
        &:hover {
          background-image: linear-gradient(135deg, ${theme.secondary}, ${theme.primary});
          box-shadow: 0 6px 20px ${theme.primary}60;
          transform: translateY(-2px);
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.surface}90;
        color: ${theme.text};
        border: 1px solid ${theme.border}50;
        backdrop-filter: blur(5px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        
        &:hover {
          background-color: ${theme.surface};
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.primary};
        border: 1px solid ${theme.primary};
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        
        &:hover {
          background-color: ${theme.primary}10;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.primary};
        border: none;
        padding: 0.5rem;
        
        &:hover {
          background-color: ${theme.primary}10;
          transform: translateY(-2px);
        }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      `;
    case 'large':
      return css`
        padding: 1rem 2rem;
        font-size: 1.125rem;
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  ${({ variant = 'primary', theme }) => getButtonStyles(variant, theme)}
  ${({ size = 'medium' }) => getButtonSize(size)}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon, 
  iconPosition = 'left',
  ...props 
}) => {
  return (
    <StyledButton {...props}>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </StyledButton>
  );
};

export default Button;
