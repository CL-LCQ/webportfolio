import React from 'react';
import './Page.css';
import DisplayMedia from '../MediaDisplay/MediaDisplay';
import DisplayLinks from '../LinkList/LinkList';

const Page = ({ project, onClose }) => {
  
  if (!project) {
    return <div>Loading project...</div>;
  }

  return (
    <div className="page-content">

          <div className="title-overlay-sticky" id="title-overlay">
            <div className="first-row">
              <button className="close-button" onClick={onClose}>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div className="title-role-container">
                  <h2 id="overlay-title">{project.title}</h2>
                  <p id="category-role">{"Role: "+ project.role}</p>
                </div>
              </div>

              <div className="chip-container">
                <span className="chip" id="overlay-date">{project.date}</span>
                <span className="chip" id="overlay-companyname">{project.company}</span>
                <span className="chip" id="overlay-industry">{project.industry}</span>
              </div>
          </div>

          <div id="hero-container" className="hero-container">
            <img src={project.hero_image} alt={project.title} className="hero-image" />
          </div>
          <div className= "container">
            <div className="fulldescription-subcontainer">
                <div className="overlay-content">
                  <p className="category-paragraph">
                    <span className="category-title gradient-text">THE WHY<br /></span>
                    <span id="category-why" className="category-content">{project.why}</span>
                  </p>

                  <div className="media" id="media-01">
                   {<DisplayMedia url= {project.url1}/>}
                  </div>
            

                  <p className="category-paragraph">
                    <span className="category-title">What<br /></span> 
                    <span id="category-what" className="category-content">{project.what}</span>
                  </p>

                  <div className="media" id="media-02">
                   {<DisplayMedia url= {project.url2}/>} 
                  </div>

                  <p className="category-paragraph">
                    <span className="category-title">Impact<br /></span> 
                    <span id="category-impact" className="category-content">{project.impact}</span>
                  </p>

                  <div className="media" id="media-03">
                  {<DisplayMedia url= {project.url3}/>}
                  </div>
                </div>  
            </div>

            <div className="annex-subcontainer" id="annex-subcontainer">
              <p className="category-link-section">
                <span className="category-title">Case Studies<br /></span> 
                {<DisplayLinks props={project.link} />}
              </p>

              <p className="category-link-section">
                <span className="category-title">Other Links<br /></span> 
                {<DisplayLinks props={project.press} />}
                 
               
              </p>

              <p className="category-link-section">
                <span className="category-title">Frameworks<br /></span> 
                {<DisplayLinks props={project.tech} />}
              </p>
            </div>
          </div>

        </div>

  );
};

export default Page;