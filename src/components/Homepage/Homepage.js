import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import Page from '../Page/Page';
import './Homepage.css';

const HomePage = ({ projects, loading }) => {
  const [selectedCard, setSelectedCard] = useState(null); 
  const [isBackgroundActive, setIsBackgroundActive] = useState(false); 
  const navigate = useNavigate();
  const { projectId } = useParams();

  // When the user visits /project/:id directly, pre-select the card
  useEffect(() => {
    if (projectId && projects.length > 0) {
      const project = projects.find((p) => p.id === parseInt(projectId));
      if (project) {
        setSelectedCard(project);
        setIsBackgroundActive(true);
      }
    }
  }, [projectId, projects]);

  // Toggles the background class when a card is clicked
  const toggleClass = () => {
    setIsBackgroundActive((prevState) => !prevState);
  };

  // Adds or removes a class from the <body> and <html> tags for the background effect
  useEffect(() => {
    if (isBackgroundActive) {
      document.body.classList.add('background');
      document.documentElement.classList.add('background');
    } else {
      document.body.classList.remove('background');
      document.documentElement.classList.remove('background');
    }
  }, [isBackgroundActive]); 

  // If still loading, show a loading indicator
  if (loading) {
    return <div className="loading-indicator">Loading projects...</div>;
  }

  // If no projects are available, display a message
  if (!projects.length) {
    return <div className="no-projects">No projects available.</div>;
  }

  return (
    <div>
      {/* Background overlay that appears when Page is open */}
      <div className={`overlay ${isBackgroundActive ? 'background' : ''}`}></div>

      <div className="header-title">Selected Works</div>

      {/* Project grid with interactive cards */}
      <div className="project-grid">
        {projects.map((project, index) => (
          <Card
            key={project.id || index}
            project={project}
            delay={300 * (1 - Math.exp(-index / 5))}
            onClick={() => {
              console.log('Clicked project:', project);
              setSelectedCard(project); // Set the selected project for the Page component
              toggleClass(); // Activate the background change
              navigate(`/project/${project.id}`); // Update the URL to /project/:id
            }}
          />
        ))}
      </div>

      {/* Only render Page when a card has been selected */}
      {selectedCard && (
        <div className="page-container">
          <Page 
            project={selectedCard} 
            onClose={() => {
              setSelectedCard(null); // Clear the selected card
              toggleClass(); // Reset the background
              navigate('/'); // Return to the home page
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
