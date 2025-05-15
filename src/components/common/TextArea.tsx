import React from 'react';
import styled, { css } from 'styled-components';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

const TextAreaContainer = styled.div<{ fullWidth?: boolean }>`
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

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme, hasError }) => hasError ? theme.error : theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  
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

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  hint,
  fullWidth = false,
  ...props
}) => {
  return (
    <TextAreaContainer fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledTextArea
        hasError={!!error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {hint && !error && <Hint>{hint}</Hint>}
    </TextAreaContainer>
  );
};

export default TextArea;
