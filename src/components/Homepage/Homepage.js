
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation} from 'react-router-dom';
import Card from '../Card/Card';
import Subcard from '../Subcard/Subcard';
import Page from '../Page/Page';
import CaseStudyPage from '../CaseStudyPage/CaseStudyPage';
import './Homepage.css';

export const handleNextItem = (selectedItem, case_studies = [], projects = [], handleCardClick) => {
  if (!selectedItem) return;

  const isCaseStudy = selectedItem.type === 'caseStudy';
  const items = isCaseStudy ? case_studies : projects;

  // Ensure items is a valid array
  if (!items || !Array.isArray(items) || items.length === 0) return;

  const currentIndex = items.findIndex(item => item.id === selectedItem.id);

  // Handle invalid or non-existing index
  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + 1) % items.length; // Loop to start
  const nextItem = items[nextIndex];
  handleCardClick(nextItem, isCaseStudy);
};

const HomePage = ({ projects, case_studies, loading }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isBackgroundActive, setIsBackgroundActive] = useState(false); // Manage background state

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
          setSelectedItem({ ...caseStudy, type: 'caseStudy' }); // Set the type here!
          
        }
      } else if (type === 'project') {
        const project = projects.find(p => p.id === id);
        if (project) {
          setSelectedItem({ ...project, type: 'project' }); // Set the type here!
    
        }
      }
    } else {
      setSelectedItem(null);
    }
 
  }, [location, projects, case_studies]);

  const handleCardClick = (item, isCaseStudy) => {
    setSelectedItem({ ...item, type: isCaseStudy ? 'caseStudy' : 'project' }); // Set the type here!
    setIsBackgroundActive(true); // Update state here
    navigate(isCaseStudy ? `/cases/${item.id}` : `/project/${item.id}`, { replace: true });
  };

  const handleClose = () => {
    setSelectedItem(null);
    setIsBackgroundActive(false); // Update state here
    navigate('/', { replace: true });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      handleNextItem(); // Reuse the logic for the right arrow key
    } else if (event.key === 'ArrowLeft') {
      // Logic for the left arrow key, if needed
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);


  return (
   
    <div>
      <div className={`overlay ${isBackgroundActive ? 'background' : ''}`}></div>

  
      {/* ... rest of the component (cards and Page) */}
      <div className="header-title">Case studies</div>
        <div className="project-grid">
          {case_studies.map((case_study, index) => (
            <Card
              key={case_study.id || index}
              project={case_study}
              delay={300 * (1 - Math.exp(-index / 5))}
              onClick={() => handleCardClick(case_study, true)}
            />
          ))}
        </div>

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