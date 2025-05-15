import React from 'react';
import styled, { css } from 'styled-components';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: Option[];
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
}

const SelectContainer = styled.div<{ fullWidth?: boolean }>`
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

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledSelect = styled.select<{ hasError?: boolean; hasIcon?: boolean }>`
  appearance: none;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme, hasError }) => hasError ? theme.error : theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;
  width: 100%;
  cursor: pointer;
  
  ${({ hasIcon }) => hasIcon && css`
    padding-left: 2.5rem;
  `}
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => hasError ? theme.error : theme.primary};
    box-shadow: 0 0 0 3px ${({ theme, hasError }) => 
      hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)'};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  pointer-events: none;
  
  &::before {
    content: '';
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-right: 2px solid ${({ theme }) => theme.textSecondary};
    border-bottom: 2px solid ${({ theme }) => theme.textSecondary};
    transform: rotate(45deg);
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

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  hint,
  fullWidth = false,
  icon,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <SelectContainer fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <SelectWrapper>
        {icon && (
          <IconContainer>
            {icon}
          </IconContainer>
        )}
        <StyledSelect
          hasError={!!error}
          hasIcon={!!icon}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        <ArrowIcon />
      </SelectWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {hint && !error && <Hint>{hint}</Hint>}
    </SelectContainer>
  );
};

export default Select;
