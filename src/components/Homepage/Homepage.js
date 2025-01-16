
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation} from 'react-router-dom';
import Card from '../Card/Card';
import Subcard from '../Subcard/Subcard';
import Page from '../Page/Page';
import './Homepage.css';

const HomePage = ({ projects, case_studies, loading }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    let isBackgroundNeeded = false; // Flag to track if background should be active

    if (pathParts.length === 3) {
      const type = pathParts[1];
      const id = parseInt(pathParts[2], 10);

      if (type === 'cases') {
        const caseStudy = case_studies.find(c => c.id === id);
        if (caseStudy) {
          setSelectedItem(caseStudy);
          isBackgroundNeeded = true; // Set flag to true
        }
      } else if (type === 'project') {
        const project = projects.find(p => p.id === id);
        if (project) {
          setSelectedItem(project);
          isBackgroundNeeded = true; // Set flag to true
        }
      }
    } else {
      setSelectedItem(null);
    }
    // Set background based on the flag.
    document.body.classList.toggle('background', isBackgroundNeeded);
    document.documentElement.classList.toggle('background', isBackgroundNeeded);
  }, [location, projects, case_studies]);

  const handleCardClick = (item, isCaseStudy) => {
    setSelectedItem(item);
    document.body.classList.add('background');
    document.documentElement.classList.add('background');
    navigate(isCaseStudy ? `/cases/${item.id}` : `/project/${item.id}`, { replace: true });
  };

  const handleClose = () => {
    setSelectedItem(null);
    document.body.classList.remove('background');
    document.documentElement.classList.remove('background');
    navigate('/', { replace: true });
  };

  return (
    <div>
      <div className="overlay" style={{display: document.body.classList.contains('background') ? 'block' : 'none'}}></div>

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
          <Page project={selectedItem} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default HomePage;