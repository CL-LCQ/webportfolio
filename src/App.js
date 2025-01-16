import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { supabaseClient } from './supabaseClient';
import HeaderContent from './components/Header/Header'; 
import './App.css';
import HomePage from './components/Homepage/Homepage';

function App() {
  const [projects, setProjects] = useState([]);
  const [case_studies, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabaseClient.from('work_v2_duplicate').select('*');
        if (error) {
          throw error; // Throw the error to be caught by try...catch
        }
        const filteredData = data.filter((project) => project.enabled !== false);
        const sortedData = filteredData.sort((a, b) => a.order - b.order);
        setProjects(sortedData);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError("Error fetching projects. Please try again later.")
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const { data: cases, error } = await supabaseClient.from('case_studies').select('*'); // Use data: cases to rename
        if (error) {
          throw error;
        }
        console.log("case studies: " + cases)
        setCases(cases);
      } catch (error) {
        console.error('Error fetching case studies:', error); // Corrected message
        setError("Error fetching case studies. Please try again later.")
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <HeaderContent />
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage projects={projects} case_studies={case_studies} />} /> {/* Removed loading prop */}
            <Route path="/cases/:id" element={<HomePage projects={projects} case_studies={case_studies} />} />{/* Removed loading prop */}
            <Route path="/project/:id" element={<HomePage projects={projects} case_studies={case_studies} />} />{/* Removed loading prop */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;