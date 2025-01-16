import React, { useState, useEffect } from "react";
import './Subcard.css';


// const Card = ({ delay,year,tag,title, imageURL, project, onClick }) => {
const Subcard = ({project, delay, onClick }) => {
 const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
        console.log(`Card "${project.title}" is in the loading state.`); // Log when loading starts


    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log(`Card "${project.title}" has transitioned to the loaded state.`); // Log when loaded
    }, delay);
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [delay]);
  return (
    <div className={`subcard-container ${isLoaded ? "loaded" : "loading"}`}
       onClick={onClick}>
       <div className="subcard-overlay">
          <div className="subcard-year">{project.date}</div>
          <div className="subcard-tag">{project.tag}</div>
        </div>
        <div className="subcard-image-container">
          <img className="subcard-image" src={project.hero_image} alt={project.title} />
          <h3 className="subcard-title">{project.title}</h3>
        </div>
    </div>
  );
};

export default Subcard;
