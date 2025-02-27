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
      {/* Overlay box that holds all page info */}
      <div className="overlay-box">
        
        <div className="overlay-header">

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

              

        <div className="overlay-body">
          {/* Block 1: Introduction */}
          <div className="section-intro">
            <h1 className="intro-title">{project.introduction}</h1>
          </div>

          {/* Block 2: My Role and Media */}
          <div className="section-role">
            <div className="role-column">
              <h2 className="subheading">My Role</h2>
              <p className="regular-text">{project.role}</p>
            </div>
            <div className="role-media-column">
              <DisplayMedia url={project.url3} />
            </div>
          </div>

    
          {/* Block 4: Problem & Before */}
          <div className="section-problem-before">
            <div className="problem-column">
              <h3 className="subheading">Problem</h3>
              <p className="statement-text">{project.problem}</p>
            </div>
            <div className="before-column">
              <h3 className="subheading">Before</h3>
              <p className="regular-text">{project.before}</p>
            </div>
          </div>
          <hr className="separator" />
                {/* Block 3: Main Media */}
                <div className="section-media">
            <DisplayMedia url={project.url1} />
          </div>


          {/* Block 5: Hypothesis */}
          <div className="section-hypothesis">
            <hr className="separator" />
            <h4 className="subheading">Process</h4>
            <p className="regular-text">{project.hypothesis}</p>

          {/* PROCESS 1*/}
          <div className="section-role">
            <div className="role-column">
              <p className="regular-text">{project.processone}</p>
            </div>
            <div className="role-media-column">
              <DisplayMedia url={project.urlprocess1} />
            </div>
          </div>


          <div className="media-banner">
              <DisplayMedia url={project.processimage} />
            </div>

          {/* Block 2: My Role and Media */}
          <div className="section-role">
          <div className="role-media-column">
              <DisplayMedia url={project.urlprocess2} />
            </div>
            <div className="role-column">
              <p className="regular-text">{project.processtwo}</p>
            </div>
          
          </div>



            <hr className="separator" />
          </div>


          {/* Block 8: After Thoughts */}
          <div className="section-after-thoughts">
            <h2 className="subheading">Results</h2>
            <p className="regular-text">{project.impact}</p>
            
            <div className="role-media-column">
              <DisplayMedia url={project.url4} />
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
        
      </div>
    </div>
  );
};

export default Page;
