import { ExternalLink } from "lucide-react";
import { ProjectData } from "@/types/Project";
import { Badge } from "@/components/ui/badge";

interface CardFooterProps {
  card: ProjectData;
}

const CardFooter = ({ card }: CardFooterProps) => {
  // Extract extra case studies from metadata
  const caseStudies = card.metadata?.caseStudies || [];

  // Technologies as frameworks
  const frameworks = card.metadata?.technologies || [];

  // Check for awards
  const hasAwards = Array.isArray(card.metadata?.awards) && card.metadata.awards.length > 0;

  // Determine the number of visible sections to adjust grid behavior
  const visibleSections = [
    caseStudies.length > 0,
    card.metadata?.link,
    frameworks.length > 0,
    hasAwards,
  ].filter(Boolean).length;

  // Dynamically set grid columns based on the number of visible sections
  const gridColsClass =
    visibleSections === 1
      ? "grid-cols-1"
      : visibleSections === 2
      ? "grid-cols-2"
      : "grid-cols-1 md:grid-cols-3";

  return (
    <div className="bg-[#333] rounded-lg p-6 mb-8">
      <div className={`grid ${gridColsClass} gap-10 justify-center`}> {/* Dynamic grid and justify-center */}
      
      
{/* Case studies section */}
    {caseStudies.length > 0 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4 inline-block">
                  Case Studies {/* Added a colon for visual flow */}
                </h3>
                <div className="inline-block ml-2">
                  {caseStudies.map((study, idx) =>
                    study.url ? (
                      <a
                        key={study.url || idx}
                        href={study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:underline inline-block mr-2 align-middle"
                      >
                        {study.title || `Case Study ${idx + 1}`} <ExternalLink className="h-4 w-4 inline-block align-middle" />
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            )}

        {/* Links section */}
        {card.metadata?.link && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4 inline-block"> 
              Links:
            </h3>
            <a
              href={card.metadata.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline flex items-center gap-2 inline-block ml-2" 
            >
              View Project <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* Frameworks section */}
        {frameworks.length > 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white/70 mb-4">Frameworks</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {frameworks.map((framework, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/10"
                >
                  {framework.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Awards section - only shown if awards exist */}
        {hasAwards && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Awards</h3>
            <div className="space-y-2">
              {card.metadata?.awards?.map((award, index) => (
                <div key={index} className="flex items-center justify-center gap-2">
                  <span className="text-amber-400">🏆</span>
                  <span className="text-white">{award}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardFooter;