import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../Card/Card';
import Subcard from '../Subcard/Subcard';
import Page from '../Page/Page';
import CaseStudyPage from '../CaseStudyPage/CaseStudyPage';
import './Homepage.css';

// Function to navigate to the next item
export const handleNextItem = (selectedItem, case_studies = [], projects = [], handleCardClick) => {
  if (!selectedItem) return;
  const isCaseStudy = selectedItem.type === 'caseStudy';
  const items = isCaseStudy ? case_studies : projects;
  if (!items || !Array.isArray(items) || items.length === 0) return;
  const currentIndex = items.findIndex(item => item.id === selectedItem.id);
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + 1) % items.length; // Loop back to start
  const nextItem = items[nextIndex];
  handleCardClick(nextItem, isCaseStudy);
};

// Function to navigate to the previous item
export const handlePrevItem = (selectedItem, case_studies = [], projects = [], handleCardClick) => {
  if (!selectedItem) return;
  const isCaseStudy = selectedItem.type === 'caseStudy';
  const items = isCaseStudy ? case_studies : projects;
  if (!items || !Array.isArray(items) || items.length === 0) return;
  const currentIndex = items.findIndex(item => item.id === selectedItem.id);
  if (currentIndex === -1) return;
  const prevIndex = (currentIndex - 1 + items.length) % items.length; // Loop back to end if at start
  const prevItem = items[prevIndex];
  handleCardClick(prevItem, isCaseStudy);
};

const HomePage = ({ projects, case_studies, loading }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isBackgroundActive, setIsBackgroundActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts.length === 3) {
      const type = pathParts[1];
      const id = parseInt(pathParts[2], 10);
  
      if (type === 'cases') {
        const caseStudy = case_studies.find(c => c.id === id);
        if (caseStudy) {
          setSelectedItem({ ...caseStudy, type: 'caseStudy' });
        }
      } else if (type === 'project') {
        const project = projects.find(p => p.id === id);
        if (project) {
          setSelectedItem({ ...project, type: 'project' });
        }
      }
    } else {
      setSelectedItem(null);
    }
  }, [location, projects, case_studies]);

  const handleCardClick = (item, isCaseStudy) => {
    setSelectedItem({ ...item, type: isCaseStudy ? 'caseStudy' : 'project' });
    setIsBackgroundActive(true);
    navigate(isCaseStudy ? `/cases/${item.id}` : `/project/${item.id}`, { replace: true });
  };

  const handleClose = () => {
    setSelectedItem(null);
    setIsBackgroundActive(false);
    navigate('/', { replace: true });
  };

  // Keyboard navigation handler
  const handleKeyDown = (event) => {
    if (!selectedItem) return;
    if (event.key === 'ArrowRight') {
      handleNextItem(selectedItem, case_studies, projects, handleCardClick);
    } else if (event.key === 'ArrowLeft') {
      handlePrevItem(selectedItem, case_studies, projects, handleCardClick);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, case_studies, projects, handleCardClick]);

  return (
    <div>
      <div className={`overlay ${isBackgroundActive ? 'background' : ''}`}></div>

      <div className="header-title">Launched Products</div>
      <div className="project-grid-sub">
        {projects.map((project, index) => (
          <Subcard
            key={project.id || index}
            project={project}
            delay={300 * (1 - Math.exp(-index / 5))}
            onClick={() => handleCardClick(project, false)}
          />
        ))}
      </div>

      {selectedItem && (
        <div className="page-container">
          {selectedItem.type === 'caseStudy' ? (
            <CaseStudyPage project={selectedItem} onClose={handleClose} />
          ) : (
            <Page project={selectedItem} onClose={handleClose} />
          )}


        </div>
      )}
    </div>
  );
};

export default HomePage;
