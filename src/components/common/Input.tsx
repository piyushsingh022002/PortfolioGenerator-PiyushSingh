import React from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasError?: boolean; hasIcon?: boolean; iconPosition?: string }>`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme, hasError }) => hasError ? theme.error : theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;
  width: 100%;
  
  ${({ hasIcon, iconPosition }) => hasIcon && iconPosition === 'left' && css`
    padding-left: 2.5rem;
  `}
  
  ${({ hasIcon, iconPosition }) => hasIcon && iconPosition === 'right' && css`
    padding-right: 2.5rem;
  `}
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => hasError ? theme.error : theme.primary};
    box-shadow: 0 0 0 3px ${({ theme, hasError }) => 
      hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)'};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.6;
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

const IconContainer = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => position === 'left' ? css`left: 0.75rem;` : css`right: 0.75rem;`}
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.error};
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const Hint = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        {icon && (
          <IconContainer position={iconPosition}>
            {icon}
          </IconContainer>
        )}
        <StyledInput
          hasError={!!error}
          hasIcon={!!icon}
          iconPosition={iconPosition}
          {...props}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {hint && !error && <Hint>{hint}</Hint>}
    </InputContainer>
  );
};

export default Input;
