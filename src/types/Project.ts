
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  color: string;
  enabled: boolean;
  metadata?: {
    tags: any;
    type: string;
    client?: string;
    technologies?: string[];
    year?: string;
    role?: string;
    description_long?: string;
    link?: string;
    url1?: string;
    url2?: string;
    url3?: string;
    videoUrl?: string;
    // Additional fields for case studies
    caseStudies?: Array<{
      title: string;
      url: string;
    }>;
    frameworks?: string[];
    // Added awards field
    awards?: string[];
  };
}
