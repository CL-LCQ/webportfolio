import React, { useState, useEffect } from "react";
import './Card.css';


// const Card = ({ delay,year,tag,title, imageURL, project, onClick }) => {
const Card = ({project, delay, onClick }) => {
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
    <div className={`card-container ${isLoaded ? "loaded" : "loading"}`}
       onClick={onClick}>
       <div className="card-overlay">
          <div className="card-year">{project.date}</div>
          <div className="card-tag">{project.tag}</div>
        </div>
        <div className="card-image-container">
          <img className="card-image" src={project.hero_image} alt={project.title} />
          <h3 className="card-title">{project.title}</h3>
        </div>
    </div>
  );
};

export default Card;
