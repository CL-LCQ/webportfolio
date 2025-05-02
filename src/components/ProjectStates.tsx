
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StateProps {
  isMobile: boolean;
}

export const LoadingState = ({ isMobile }: StateProps) => {
  return (
    <div className="w-full h-[40vh] flex items-center justify-center">
      <div className="space-y-4 w-full max-w-4xl px-4">
        <Skeleton className="h-12 w-1/3 mx-auto" />
        <div className={cn("flex gap-2", isMobile ? "flex-col" : "")}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className={cn(
              "rounded-lg",
              isMobile ? "h-[20vh] w-full" : "h-[30vh] flex-1"
            )} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ErrorState = () => {
  return (
    <div className="w-full h-[40vh] flex items-center justify-center">
      <div className="text-center p-6 bg-destructive/20 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Error loading projects</h2>
        <p className="text-muted-foreground">
          There was a problem fetching project data. Please try again later.
        </p>
      </div>
    </div>
  );
};

export const NoProjectsState = () => {
  return (
    <div className="w-full h-[40vh] flex items-center justify-center">
      <div className="text-center p-6">
        <h2 className="text-xl font-bold mb-2">No Projects Available</h2>
        <p className="text-muted-foreground">
          There are no enabled projects to display at the moment.
        </p>
      </div>
    </div>
  );
};
