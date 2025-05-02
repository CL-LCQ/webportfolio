
import { ProjectData } from "@/types/Project";
import { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import CardHeader from "./expanded-card/CardHeader";
import CardContent from "./expanded-card/CardContent";
import CardFooter from "./expanded-card/CardFooter";

type ExpandedCardProps = {
  card: ProjectData;
  onClose: () => void;
};

function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia('(orientation: portrait)').matches
  );
  useEffect(() => {
    const mql = window.matchMedia('(orientation: portrait)');
    const onChange = () => setIsPortrait(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isPortrait;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

const ExpandedCard = ({ card, onClose }: ExpandedCardProps) => {
  const isPortrait = useIsPortrait();
  const isMobile = useIsMobile();
  const mobilePortrait = isMobile && isPortrait;

  return (
    <div
      className="absolute inset-0 flex flex-col h-full bg-[#222] animate-fade-in"
    >
      {/* Header - always visible at top */}
      <div className="sticky top-0 z-10">
        <CardHeader card={card} onClose={onClose} />
      </div>

      {/* Content area - scrollable - takes up remaining space */}
      <ScrollArea className="flex-1 px-4 md:px-6 expanded-content-scroll">
        <div className="max-w-[1200px] w-full mx-auto py-6 "> {/* Added pb-16 to account for footer height */}
        <CardContent card={card} layout="image-left" />
        </div>
        <div className="max-w-[1200px] w-full mx-auto"> {/* Added pb-16 to account for footer height */}
        <CardContent card={card} layout="text-above" />
        </div>
        <div className=" max-w-[1200px] w-full mx-auto bottom-20 left-0 w-full z-20  pb-16">
          <CardFooter card={card} />
        </div>
      </ScrollArea>
      <br></br>
      <br></br>


    </div>
  );
};
export default ExpandedCard;
