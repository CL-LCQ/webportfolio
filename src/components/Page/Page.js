import React from 'react';
import './Page.css';
import DisplayMedia from '../MediaDisplay/MediaDisplay';
import DisplayLinks from '../LinkList/LinkList';
import { handleNextItem } from '../Homepage/Homepage'; // Adjust the path if needed

const Page = ({ project, onClose }) => {
  if (!project) {
    return <div>Loading project...</div>;
  }

  return (
    // Use the hero image as the background of the full page.
    <div 
      className="page-content" 
      style={{ backgroundImage: `url(${project.hero_image})` }}
    >
      {/* Overlay box that holds all page info */}
      <div className="overlay-box">
        
        <div className="overlay-header">
          <button className="close-button" onClick={onClose}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="overlay-header-top">
            <div className="title-role-container">
              <h2 id="overlay-title">{project.title}</h2>
            </div>
            <div className="chip-container">
              <span className="chip" id="overlay-date">{project.date}</span>
              <span className="chip" id="overlay-companyname">{project.company}</span>
              <span className="chip" id="overlay-industry">{project.industry}</span>
            </div>
          </div>

          </div>
          <div className="overlay-footer">
          <div className="link-section">
            <span className="category-title-side">
              Case Studies<br />
            </span>
            <DisplayLinks props={project.link} />
          </div>

          <div className="link-section">
            <span className="category-title-side">
              Other Links<br />
            </span>
            <DisplayLinks props={project.press} />
          </div>

          <div className="link-section">
            <span className="category-title-side">
              Frameworks<br />
            </span>
            <DisplayLinks props={project.tech} />
          </div>
        </div>
      

        <div className="overlay-body">
          <div className="three-column-layout">
            <div className="column">
              <span className="category-title">WHY</span>
              <p className="category-paragraph">
                <span className="category-content">{project.why}</span>
              </p>
            </div>
            <div className="column">
              <span className="category-title">WHAT</span>
              <p className="category-paragraph">
                <span className="category-content">{project.what}</span>
              </p>
            </div>
            <div className="column">
              <span className="category-title">IMPACT</span>
              <p className="category-paragraph">
                <span className="category-content">{project.impact}</span>
              </p>
            </div>
          </div>

          <div className="media-wrapper">
            <div className="media" id="media-03">
              <DisplayMedia url={project.url3} />
            </div>
          </div>
        </div>


        
      </div>
    </div>
  );
};

export default Page;
