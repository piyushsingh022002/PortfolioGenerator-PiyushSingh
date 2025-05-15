import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Contact } from '../../../types';

interface ContactSectionProps {
  contact: Contact;
}

const ContactContainer = styled.section`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
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
  max-width: 800px;
  width: 100%;
  text-align: center;
`;

const ContactText = styled(motion.p)`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
`;

const ContactLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ContactCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.primary};
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
`;

const ContactLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const ContactValue = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const Footer = styled.footer`
  margin-top: 4rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
`;

const NoContactMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  border: 1px dashed ${({ theme }) => theme.border};
`;

const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const hasContactInfo = Object.values(contact).some(value => value);
  
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
    <ContactContainer id="contact">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Get In Touch
      </SectionTitle>
      
      <ContentContainer>
        <ContactText
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Interested in working together? Feel free to reach out through any of the channels below.
        </ContactText>
        
        {!hasContactInfo ? (
          <NoContactMessage>
            Add your contact information in the form to see it here.
          </NoContactMessage>
        ) : (
          <ContactLinksGrid>
            {contact.email && (
              <ContactCard 
                href={`mailto:${contact.email}`}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <ContactIcon>✉️</ContactIcon>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>{contact.email}</ContactValue>
              </ContactCard>
            )}
            
            {contact.phone && (
              <ContactCard 
                href={`tel:${contact.phone}`}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <ContactIcon>📱</ContactIcon>
                <ContactLabel>Phone</ContactLabel>
                <ContactValue>{contact.phone}</ContactValue>
              </ContactCard>
            )}
            
            {contact.linkedin && (
              <ContactCard 
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <ContactIcon>🔗</ContactIcon>
                <ContactLabel>LinkedIn</ContactLabel>
                <ContactValue>Connect with me</ContactValue>
              </ContactCard>
            )}
            
            {contact.github && (
              <ContactCard 
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <ContactIcon>💻</ContactIcon>
                <ContactLabel>GitHub</ContactLabel>
                <ContactValue>See my code</ContactValue>
              </ContactCard>
            )}
            
            {contact.twitter && (
              <ContactCard 
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <ContactIcon>🐦</ContactIcon>
                <ContactLabel>Twitter</ContactLabel>
                <ContactValue>Follow me</ContactValue>
              </ContactCard>
            )}
            
            {contact.website && (
              <ContactCard 
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                custom={5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <ContactIcon>🌐</ContactIcon>
                <ContactLabel>Website</ContactLabel>
                <ContactValue>Visit my site</ContactValue>
              </ContactCard>
            )}
          </ContactLinksGrid>
        )}
        
        <Footer>
          <p>© {new Date().getFullYear()} • Created with Portfolio Generator</p>
        </Footer>
      </ContentContainer>
    </ContactContainer>
  );
};

export default ContactSection;
