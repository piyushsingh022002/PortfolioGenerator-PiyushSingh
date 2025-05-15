import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Project } from '../../../types';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsContainer = styled.section`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.surface};
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: ${({ theme }) => theme.primary};
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const FeaturedProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeaturedProjectCard = styled(ProjectCard)`
  @media (min-width: 768px) {
    grid-column: span 1;
  }
`;

const ProjectImage = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 200px;
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-color: ${({ theme, imageUrl }) => imageUrl ? 'transparent' : theme.border};
  position: relative;
  
  &::before {
    content: '${({ imageUrl }) => imageUrl ? '' : 'No Image'}';
    display: ${({ imageUrl }) => imageUrl ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const FeaturedBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.success + '20'};
  color: ${({ theme }) => theme.success};
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.5rem;
  flex: 1;
`;

const ProjectTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.primary + '20'};
  color: ${({ theme }) => theme.primary};
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.primary};
  
  &:hover {
    text-decoration: underline;
  }
`;

const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1.5rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const NoProjectsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 0.5rem;
  border: 1px dashed ${({ theme }) => theme.border};
`;

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };
  
  return (
    <ProjectsContainer id="projects">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </SectionTitle>
      
      <ContentContainer>
        {projects.length === 0 ? (
          <NoProjectsMessage>
            Add your projects in the form to see them here.
          </NoProjectsMessage>
        ) : (
          <>
            {featuredProjects.length > 0 && (
              <>
                <SectionSubtitle>Featured Projects</SectionSubtitle>
                <FeaturedProjectsGrid>
                  {featuredProjects.map((project, index) => (
                    <FeaturedProjectCard
                      key={project.id}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={cardVariants}
                    >
                      <ProjectImage imageUrl={project.imageUrl} />
                      <ProjectContent>
                        <ProjectHeader>
                          <ProjectTitle>
                            {project.title}
                            <FeaturedBadge>Featured</FeaturedBadge>
                          </ProjectTitle>
                        </ProjectHeader>
                        <ProjectDescription>{project.description}</ProjectDescription>
                        <ProjectTechnologies>
                          {project.technologies.map((tech) => (
                            <TechTag key={tech}>{tech}</TechTag>
                          ))}
                        </ProjectTechnologies>
                        <ProjectLinks>
                          {project.projectUrl && (
                            <ProjectLink href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                              Live Demo
                            </ProjectLink>
                          )}
                          {project.githubUrl && (
                            <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              GitHub Repo
                            </ProjectLink>
                          )}
                        </ProjectLinks>
                      </ProjectContent>
                    </FeaturedProjectCard>
                  ))}
                </FeaturedProjectsGrid>
              </>
            )}
            
            {otherProjects.length > 0 && (
              <>
                <SectionSubtitle>Other Projects</SectionSubtitle>
                <ProjectsGrid>
                  {otherProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={cardVariants}
                    >
                      <ProjectImage imageUrl={project.imageUrl} />
                      <ProjectContent>
                        <ProjectHeader>
                          <ProjectTitle>{project.title}</ProjectTitle>
                        </ProjectHeader>
                        <ProjectDescription>{project.description}</ProjectDescription>
                        <ProjectTechnologies>
                          {project.technologies.map((tech) => (
                            <TechTag key={tech}>{tech}</TechTag>
                          ))}
                        </ProjectTechnologies>
                        <ProjectLinks>
                          {project.projectUrl && (
                            <ProjectLink href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                              Live Demo
                            </ProjectLink>
                          )}
                          {project.githubUrl && (
                            <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              GitHub Repo
                            </ProjectLink>
                          )}
                        </ProjectLinks>
                      </ProjectContent>
                    </ProjectCard>
                  ))}
                </ProjectsGrid>
              </>
            )}
          </>
        )}
      </ContentContainer>
    </ProjectsContainer>
  );
};

export default ProjectsSection;
