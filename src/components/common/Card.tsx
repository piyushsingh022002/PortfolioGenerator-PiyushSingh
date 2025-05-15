import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  elevation?: 'low' | 'medium' | 'high';
  padding?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const getElevation = (elevation: 'low' | 'medium' | 'high', theme: any) => {
  switch (elevation) {
    case 'low':
      return css`box-shadow: ${theme.shadow};`;
    case 'medium':
      return css`box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05);`;
    case 'high':
      return css`box-shadow: 0 20px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.08);`;
    default:
      return '';
  }
};

const getPadding = (padding: 'small' | 'medium' | 'large') => {
  switch (padding) {
    case 'small':
      return css`padding: 1rem;`;
    case 'medium':
      return css`padding: 1.5rem;`;
    case 'large':
      return css`padding: 2rem;`;
    default:
      return '';
  }
};

const CardContainer = styled.div<{
  elevation: 'low' | 'medium' | 'high';
  padding: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}>`
  background-color: ${({ theme }) => theme.cardBackground + 'E6'}; /* Adding transparency for glass effect */
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border + '50'};
  ${({ elevation, theme }) => getElevation(elevation, theme)}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  ${({ theme }) => getPadding('medium')}
  border-bottom: 1px solid ${({ theme }) => theme.border + '50'};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: ${({ theme }) => theme.primary + '80'};
    border-radius: 3px;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardSubtitle = styled.p`
  margin: 0.5rem 0 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
`;

const CardBody = styled.div<{ padding: 'small' | 'medium' | 'large' }>`
  ${({ padding }) => getPadding(padding)}
`;

const CardFooter = styled.div`
  ${({ theme }) => getPadding('medium')}
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  elevation = 'low',
  padding = 'medium',
  fullWidth = false,
}) => {
  return (
    <CardContainer elevation={elevation} padding={padding} fullWidth={fullWidth}>
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardBody padding={padding}>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default Card;
