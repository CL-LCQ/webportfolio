
import CardCarousel from "@/components/CardCarousel";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-[1600px] flex flex-col">
          <CardCarousel />
          
          <div className="mt-20 text-center opacity-40 hover:opacity-60 transition-opacity">
          <p className="text-sm">
              Designed in Figma, developed with Lovable and ChatGPT.
              <br />
              Copyright Charles Leclercq 2025.
            </p>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Index;
