import React, { useEffect, useState } from 'react';
import { supabaseClient } from './supabaseClient';
import Card from './components/Card/Card';
import HeaderContent from './components/Header/Header'; // Import the component
import './App.css';
import Page from './components/Page/Page';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading
  const [selectedCard, setSelectedCard] = useState(null);
  const [isBackgroundActive, setIsBackgroundActive] = useState(false);


  const toggleClass = () => {
    setIsBackgroundActive(prevState => !prevState);
  };

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabaseClient
        .from('work_v2')
        .select('*');
        // .select('id, tag, title, description, imageURL, order, date');

      if (error) {
        console.error('Error fetching projects:', error);
        setLoading(false); // Stop loading on error
        return;
      }

      // Filter and sort projects
      const filteredData = data.filter((project) => project.enabled !== false);
      const sortedData = filteredData.sort((a, b) => a.order - b.order);
      setProjects(sortedData);
      setLoading(false); // Stop loading once data is fetched
    };

    fetchProjects();




  }, []);

   // Apply the class to <body> or <html> whenever isBackgroundActive changes
   useEffect(() => {
    if (isBackgroundActive) {
      document.body.classList.add('background');
      document.documentElement.classList.add('background');
    } else {
      document.body.classList.remove('background');
      document.documentElement.classList.remove('background');
    }
  }, [isBackgroundActive]); // Run every time isBackgroundActive change

  return (
    <div className="app-container">
      <header className="app-header">
        <HeaderContent /> {/* Inject the component */}
    
      </header>
      <main className="app-main">
        {/* This overlay will appear over everything except page-container */}
        {/* {selectedCard && <div className="overlay"></div>}  */}
        <div className={`overlay ${isBackgroundActive ? 'background' : ''}`}></div>
        <div className="header-title">Selected Works</div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <Card
              project={project}
              delay={300 * (1 - Math.exp(-index / 5))}
              onClick={() => {
                console.log("clicked: "+project.title);
                setSelectedCard(project);
                toggleClass();
              }
              }
            />
          ))}
        </div>
        {/* Only render the page-container when a card is clicked */}
        {selectedCard && (
          <div className="page-container">
            <Page 
              project={selectedCard} 
              onClose={() => {
                setSelectedCard(null);
                toggleClass(); 
              }

            }
            />
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;
