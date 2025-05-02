import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useProjects } from "@/hooks/useProjects";
import { useIsMobile } from "@/hooks/use-mobile";
import ProjectCard from "./ProjectCard";
import { LoadingState, ErrorState, NoProjectsState } from "./ProjectStates";
import SocialMediaIcons from "./SocialMedia"; // Import the new component
import SayHi from "./sayhi";




const CardCarousel = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [hoverCardIndex, setHoverCardIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  // Fetch projects from Supabase
  const { data: projects, isLoading, error } = useProjects();

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index);
  };

  const handleClose = () => {
    setActiveCardIndex(null);
  };

  const handleNext = () => {
    if (activeCardIndex !== null && projects) {
      if (activeCardIndex < projects.length - 1) {
        setActiveCardIndex(activeCardIndex + 1);
      } else if (!isMobile) {
        // If no more projects after and not on mobile, present a placeholder
        setActiveCardIndex(null); // Optionally close the active card
      }
    }
  };

  const handlePrev = () => {
    if (activeCardIndex !== null) {
      if (activeCardIndex > 0) {
        setActiveCardIndex(activeCardIndex - 1);
      } else {
        handleClose();
      }
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCardIndex === null) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCardIndex, projects?.length]);

  // Reset carousel when component unmounts or activeCardIndex changes
  useEffect(() => {
    return () => {
      setHoverCardIndex(null);
    };
  }, [activeCardIndex]);

  // Show loading state when fetching projects
  if (isLoading) {
    return <LoadingState isMobile={isMobile} />;
  }

  // Show error state
  if (error) {
    return <ErrorState />;
  }

  // No projects found
  if (!projects || projects.length === 0) {
    return <NoProjectsState />;
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {activeCardIndex === null ? (
        <div className="w-full py-12">
          {/* top row: name on the left, icons on the right */}
          <div className="w-full flex items-center justify-between mb-6 px-14">
          <h1 className="text-4xl font-extrabold text-white">

              Charles Leclercq
            </h1>
            {/* social media */}
            <SocialMediaIcons />
          </div>

          {/* blurb below */}
          <div className="mt-4 text-lg text-gray-300 font-bold max-w-5xl px-14">
          Charles is a product designer and product manager who has worked at companies such as the BBC and Ubisoft. He has also founded and led startups from 0 to 1, building apps and connected hardware.            
          <br></br>He combines creativity, hands-on execution (❤️ prototyping), and business strategy to create products that are both loved by consumers and backed by strong unique value propositions.
            <br></br><br></br>Most recently, he pioneered AI wearable UX by launching ARx in partnership with Microsoft Seeing AI.
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-between px-4 mb-8">
          <h3 className="text-xl font-bold">{"Charles Leclercq's selected work"}</h3>
          <SocialMediaIcons />
        </div>
      )}

      <div
        className={cn(
          "relative transition-all duration-500 px-4 md:px-8 lg:px-12 w-full",
          isMobile ? "flex flex-col gap-4" : "flex",
          activeCardIndex !== null ? "h-[100vh]" : isMobile ? "h-auto" : "h-[40vh]"
        )}
      >
        {/* Render placeholder before the first project if no previous project and not mobile */}
{activeCardIndex === 0 && !isMobile && (
  <div className="card-container flex-[0.05] cursor-pointer card-adjacent-hover mx-1 h-full relative z-50">
    <SayHi />
  </div>
)}


        {projects.map((card, index) => (
          <ProjectCard
            key={card.id}
            card={card}
            index={index}
            activeCardIndex={activeCardIndex}
            hoverCardIndex={hoverCardIndex}
            isMobile={isMobile}
            setHoverCardIndex={setHoverCardIndex}
            handleCardClick={handleCardClick}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleClose={handleClose}
          />
        ))}

        {/* Render placeholder after the last project if no next project and not mobile */}
        {activeCardIndex === projects.length - 1 && !isMobile && (
 <div className="card-container flex-[0.05] cursor-pointer card-adjacent-hover mx-1 h-full relative z-50">
 <SayHi />
</div>
)}

      </div>
    </div>
  );
};

export default CardCarousel;