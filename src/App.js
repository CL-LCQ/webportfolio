import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { supabaseClient } from './supabaseClient';
import HeaderContent from './components/Header/Header'; 
import './App.css';
import HomePage from './components/Homepage/Homepage';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabaseClient.from('work_v2').select('*');
      if (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
        return;
      }

      const filteredData = data.filter((project) => project.enabled !== false);
      const sortedData = filteredData.sort((a, b) => a.order - b.order);
      setProjects(sortedData);
      setLoading(false); 
    };
    fetchProjects();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <HeaderContent />
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage projects={projects} loading={loading} />} />
            <Route path="/project/:projectId" element={<HomePage projects={projects} loading={loading} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
