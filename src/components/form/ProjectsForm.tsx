import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';
import { motion } from 'framer-motion';

const FormContainer = styled(motion.div)`
  width: 100%;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectsList = styled.div`
  margin: 2rem 0;
`;

const ProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1rem;
`;

const ProjectTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
  margin-top: 0.5rem;
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

const ProjectImagePreview = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 0.375rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TechInput = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
`;

const Checkbox = styled.input`
  cursor: pointer;
  width: 1.25rem;
  height: 1.25rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NoProjectsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.375rem;
  border: 1px dashed ${({ theme }) => theme.border};
`;

const ProjectsForm: React.FC = () => {
  const { portfolioData, addProject, updateProject, removeProject, setCurrentStep } = usePortfolio();
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    featured: false,
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [techInput, setTechInput] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };
  
  const handleRemoveTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };
  
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      updateProject({
        ...formData,
        id: editingProject.id,
      });
      setEditingProject(null);
    } else {
      addProject(formData);
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      technologies: [],
      imageUrl: '',
      projectUrl: '',
      githubUrl: '',
      featured: false,
    });
  };
  
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      imageUrl: project.imageUrl || '',
      projectUrl: project.projectUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
    });
  };
  
  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: [],
      imageUrl: '',
      projectUrl: '',
      githubUrl: '',
      featured: false,
    });
  };
  
  const handleNext = () => {
    setCurrentStep('contact');
  };
  
  const handleBack = () => {
    setCurrentStep('skills');
  };
  
  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        title="Projects"
        subtitle="Showcase your best work"
        elevation="medium"
        fullWidth
      >
        <form onSubmit={handleAddProject}>
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E-commerce Platform, Portfolio Website, etc."
            required
            fullWidth
          />
          
          <TextArea
            label="Project Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project, its features, and your role..."
            required
            fullWidth
          />
          
          <TechInput>
            <Input
              label="Technologies Used"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, Node.js, etc."
              fullWidth
            />
            <Button 
              type="button" 
              variant="secondary"
              onClick={handleAddTech}
              style={{ marginTop: '1.75rem' }}
            >
              Add
            </Button>
          </TechInput>
          
          {formData.technologies.length > 0 && (
            <ProjectTechnologies>
              {formData.technologies.map((tech) => (
                <TechTag key={tech} onClick={() => handleRemoveTech(tech)}>
                  {tech} ✕
                </TechTag>
              ))}
            </ProjectTechnologies>
          )}
          
          <ProjectImagePreview>
            {formData.imageUrl ? (
              <ProjectImage src={formData.imageUrl} alt="Project preview" />
            ) : null}
          </ProjectImagePreview>
          
          <Button
            type="button"
            variant="secondary"
            onClick={() => document.getElementById('project-image-upload')?.click()}
          >
            Upload Project Image
          </Button>
          <input
            id="project-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          
          <FormGrid style={{ marginTop: '1.5rem' }}>
            <Input
              label="Project URL"
              name="projectUrl"
              value={formData.projectUrl || ''}
              onChange={handleChange}
              placeholder="https://myproject.com"
              fullWidth
            />
            
            <Input
              label="GitHub URL"
              name="githubUrl"
              value={formData.githubUrl || ''}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
              fullWidth
            />
          </FormGrid>
          
          <CheckboxContainer>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
              />
              Feature this project (highlight as important)
            </CheckboxLabel>
          </CheckboxContainer>
          
          <Button 
            type="submit" 
            variant="primary"
          >
            {editingProject ? 'Update Project' : 'Add Project'}
          </Button>
          
          {editingProject && (
            <Button 
              type="button" 
              variant="outline"
              onClick={handleCancelEdit}
              style={{ marginLeft: '0.5rem' }}
            >
              Cancel
            </Button>
          )}
        </form>
        
        <ProjectsList>
          <h4>Your Projects ({portfolioData.projects.length})</h4>
          
          {portfolioData.projects.length === 0 ? (
            <NoProjectsMessage>
              No projects added yet. Add your first project above.
            </NoProjectsMessage>
          ) : (
            portfolioData.projects.map((project) => (
              <ProjectItem key={project.id}>
                <ProjectHeader>
                  <div>
                    <ProjectTitle>
                      {project.title}
                      {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
                    </ProjectTitle>
                  </div>
                  <ProjectActions>
                    <Button 
                      variant="text" 
                      size="small"
                      onClick={() => handleEditProject(project)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="text" 
                      size="small"
                      onClick={() => removeProject(project.id)}
                    >
                      Remove
                    </Button>
                  </ProjectActions>
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
              </ProjectItem>
            ))
          )}
        </ProjectsList>
        
        <ButtonsContainer>
          <Button 
            variant="secondary" 
            onClick={handleBack}
          >
            Back
          </Button>
          <Button 
            variant="primary" 
            onClick={handleNext}
            disabled={portfolioData.projects.length === 0}
          >
            Continue to Contact
          </Button>
        </ButtonsContainer>
      </Card>
    </FormContainer>
  );
};

export default ProjectsForm;
