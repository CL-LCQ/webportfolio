
import { X } from "lucide-react";
import { ProjectData } from "@/types/Project";
import { Badge } from "@/components/ui/badge";
import React from 'react'; // Add this at the top of your file

interface CardHeaderProps {
  card: ProjectData;
  onClose: () => void;
}

const CardHeader = ({ card, onClose }: CardHeaderProps) => {
  return (
    <div className="bg-[#222] border-b border-white/10 p-6 md:p-8">
      <div className="max-w-[1200px] mx-auto flex justify-between items-start"> {/* items-start for top alignment */}
        <div>
          <p className="text-sm text-white/70 mb-1">{card.metadata?.client || "Project"}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{card.title}</h1>

          <div className="flex items-center flex-wrap gap-2 mt-2">
            {card.metadata?.tags?.slice(0, 4).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/10"
              >
                {tag}
              </Badge>
            ))}
            {card.metadata?.role && (
              <p className="text-sm text-white/70 mt-1 mb-1"> 
                <span className="font-semibold">Role:</span> {card.metadata.role}
              </p>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CardHeader;