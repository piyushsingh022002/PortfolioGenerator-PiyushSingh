import styled from 'styled-components';

export const StyledHeroSection = styled.div`
  padding: 2rem;
  text-align: center;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const StyledHeroTitle = styled.h1`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const StyledHeroSubtitle = styled.h2`
  color: ${({ theme }) => theme.primary};
`;

export const StyledAboutSection = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.surface};
  min-height: 30vh;
  color: ${({ theme }) => theme.text};
`;

export const StyledSectionHeading = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

export const StyledAboutText = styled.p`
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
`;

export const StyledLocationText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const StyledSkillsSection = styled.div`
  padding: 2rem;
  min-height: 30vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const StyledSkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

export const StyledSkillItem = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  min-width: 200px;
  color: ${({ theme }) => theme.text};
`;

export const StyledSkillName = styled.h3`
  color: ${({ theme }) => theme.text};
`;

export const StyledProjectsSection = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.surface};
  min-height: 30vh;
  color: ${({ theme }) => theme.text};
`;

export const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledProjectCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.text};
`;

export const StyledProjectContent = styled.div`
  padding: 1.5rem;
`;

export const StyledProjectTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

export const StyledProjectDescription = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export const StyledTechContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledTechTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => `rgba(${parseInt(theme.primary.slice(1, 3), 16)}, ${parseInt(theme.primary.slice(3, 5), 16)}, ${parseInt(theme.primary.slice(5, 7), 16)}, 0.1)`};
  color: ${({ theme }) => theme.primary};
  border-radius: 1rem;
  font-size: 0.75rem;
`;

export const StyledContactSection = styled.div`
  padding: 2rem;
  min-height: 30vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const StyledContactGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
`;

export const StyledContactItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  min-width: 200px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

export const StyledContactIcon = styled.span`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const StyledContactLabel = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const StyledContactValue = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export const StyledFooter = styled.div`
  text-align: center;
  margin-top: 3rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
`;
