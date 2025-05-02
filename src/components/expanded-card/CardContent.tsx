import { ProjectData } from "@/types/Project";
 import { AspectRatio } from "@/components/ui/aspect-ratio";

 interface CardContentProps {
   card: ProjectData;
   layout?: "image-right" | "image-left" | "text-above"; // New layout prop
 }

 const CardContent = ({ card, layout = "image-right" }: CardContentProps) => {
   // always use the main hero image consistently
   const imageUrl = card.imageUrl;

   let textClasses = "p-6 flex items-center";
   let imageClasses = "w-full h-full animate-image-reveal";
   let gridClasses = "grid grid-cols-1 md:grid-cols-2 gap-0";
   let imageWrapperClasses = "w-full h-full min-h-[300px]";

   if (layout === "image-left") {
     gridClasses = "grid grid-cols-1 md:grid-cols-2 gap-0 md:flex-row-reverse";
   } else if (layout === "text-above") {
     gridClasses = "grid grid-cols-1 gap-0";
     textClasses = "p-6"; // Remove flex centering
     imageWrapperClasses = "w-full h-full min-h-[300px]"; // Ensure image container has height
   }

   return (
     <div className="space-y-8 pb-12">
       {/* Media content with text on left, media on right */}
       <div className="bg-[#333] rounded-lg overflow-hidden">
         <div className={gridClasses}>
           <div className={textClasses}>
             <div>
               <h3
                 className="text-[1.8rem] font-semidbold mb-4 text-white/80 leading-relaxed"
                 style={{ fontWeight: 600 }}
               >
                 {card.metadata?.description_long || card.description}
               </h3>
             </div>
           </div>
           <div className={imageClasses}>
             <div className={imageWrapperClasses}>
               <img
                 src={imageUrl}
                 alt={card.title}
                 className="w-full h-full object-cover"
               />
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default CardContent;