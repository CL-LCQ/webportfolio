
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectData } from "@/types/Project";
import ExpandedCard from "./ExpandedCard";

interface ProjectCardProps {
  card: ProjectData;
  index: number;
  activeCardIndex: number | null;
  hoverCardIndex: number | null;
  isMobile: boolean;
  setHoverCardIndex: (index: number | null) => void;
  handleCardClick: (index: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleClose: () => void;
}

const ProjectCard = ({
  card,
  index,
  activeCardIndex,
  hoverCardIndex,
  isMobile,
  setHoverCardIndex,
  handleCardClick,
  handlePrev,
  handleNext,
  handleClose,
}: ProjectCardProps) => {
  // Calculate visibility and positioning
  const isActive = activeCardIndex === index;
  const isPrev = activeCardIndex === index + 1;
  const isNext = activeCardIndex === index - 1;
  const isVisible = activeCardIndex === null || isActive || isPrev || isNext;
  
  // Calculate position classes for desktop
  let positionClass = "";
  if (!isMobile && activeCardIndex !== null) {
    if (isActive) positionClass = "flex-[0.9]";
    else if (isPrev || isNext) positionClass = "flex-[0.05] cursor-pointer card-adjacent-hover";
    else positionClass = "flex-[0]";
  }
  
  return (
    <div
      key={card.id}
      className={cn(
        "card-container group relative rounded-lg overflow-hidden",
        isMobile ? (
          activeCardIndex === null ? "h-[20vh] mb-4" : 
          isActive ? "h-[90vh] mb-4" : 
          isPrev || isNext ? "h-[15vh] mb-4 cursor-pointer" : "h-0 mb-0"
        ) : "h-full",
        activeCardIndex === null ? (isMobile ? "" : "flex-1 mx-1") : positionClass,
        !isMobile && activeCardIndex === null && "card-hover-effect",
        !isVisible && "opacity-0 h-0",
        hoverCardIndex === index && !isMobile && activeCardIndex === null && "flex-[2]",
        isActive && "expanding-card"
      )}
      onMouseEnter={() => !isMobile && activeCardIndex === null && setHoverCardIndex(index)}
      onMouseLeave={() => !isMobile && activeCardIndex === null && setHoverCardIndex(null)}
      onClick={() => {
        if (activeCardIndex === null) {
          handleCardClick(index);
        } else if (isPrev) {
          handlePrev();
        } else if (isNext) {
          handleNext();
        }
      }}
    >
      {isVisible && (
        <>
          <div 
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-all duration-300",
              isActive ? "card-background-image" : ""
            )}
            style={{ backgroundImage: `url(${card.imageUrl})` }}
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-b",
            card.color,
            {
              // when expanded, always show at 10% opacity
              "opacity-10": isActive,
              // otherwise, start hidden and fade in on hover
              "opacity-0 group-hover:opacity-40": !isActive,
            }
          )}/>
          <div className="card-gradient-overlay absolute inset-0"></div>
          
          {isActive ? (
            <ExpandedCard 
              card={card} 
              onClose={handleClose}
            />
          ) : (
            <>
              {/* Title in top-left */}
              <div
                className={cn(
                  "absolute top-0 left-0 w-full p-4 transition-opacity duration-300 card-text",
                  activeCardIndex !== null && !isActive
                    ? "opacity-0"
                    : isMobile
                    ? "opacity-100"
                    : "opacity-0"
                )}
              >
                <h3
                  className={cn(
                    "text-xl font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300",
                    activeCardIndex !== null && !isActive && !isMobile
                      ? "opacity-0"
                      : "opacity-100"
                  )}
                >
                  {card.title}
                </h3>
              </div>

              {/* Bottom bar: left=tag, right=date */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 w-full p-4 flex justify-between items-center text-sm text-white transition-opacity duration-300 card-text",
                  activeCardIndex !== null && !isActive
                    ? "opacity-0"
                    : isMobile
                    ? "opacity-100"
                    : "opacity-0"
                )}
              >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {card.metadata?.type}
                </span>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {card.metadata?.year}
                </span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectCard;
