
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import Page from '../Page/Page';
import './Homepage.css';

const HomePage = ({ projects, loading }) => {
  const [selectedCard, setSelectedCard] = useState(null); 
  const [isBackgroundActive, setIsBackgroundActive] = useState(false); 
  const navigate = useNavigate();
  const { projectId } = useParams(); // Extract the projectId from the URL

  // Preselect the card when visiting /project/:id directly
  useEffect(() => {
    if (projectId && projects.length > 0) {
      const project = projects.find((p) => p.id === parseInt(projectId));
      if (project) {
        setSelectedCard(project);
        setIsBackgroundActive(true);
      }
    }
  }, [projectId, projects]);

  const toggleClass = () => {
    setIsBackgroundActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (isBackgroundActive) {
      document.body.classList.add('background');
      document.documentElement.classList.add('background');
    } else {
      document.body.classList.remove('background');
      document.documentElement.classList.remove('background');
    }
  }, [isBackgroundActive]); 

  if (loading) {
    return <div className="loading-indicator">Loading projects...</div>;
  }

  if (!projects.length) {
    return <div className="no-projects">No projects available.</div>;
  }

  return (
    <div>
      <div className={`overlay ${isBackgroundActive ? 'background' : ''}`}></div>

      <div className="header-title">Selected Works</div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <Card
            key={project.id || index}
            project={project}
            delay={300 * (1 - Math.exp(-index / 5))}
            onClick={() => {
              setSelectedCard(project); 
              toggleClass(); 
              navigate(`/project/${project.id}`); // Update URL when the card is clicked
            }}
          />
        ))}
      </div>

      {selectedCard && (
        <div className="page-container">
          <Page 
            project={selectedCard} 
            onClose={() => {
              setSelectedCard(null);
              toggleClass(); 
              navigate('/'); // Return to the home page
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
