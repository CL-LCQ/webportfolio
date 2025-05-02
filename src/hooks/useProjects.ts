
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ProjectData } from '@/types/Project';

export const fetchProjects = async (): Promise<ProjectData[]> => {
  // Using the work_v2 table from your Supabase project
  const { data, error } = await supabase
    .from('work_v2')
    .select('*')
    .eq('enabled', true)
    .order('order', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }

  return data.map((project: any) => {
      // 1️⃣ Grab it; it might be an array or (in a weird edge) a string
      const csRaw = project.link;
        
      // 2️⃣ Normalize to an array:
      const csArr: { link: string; title: string }[] =
        typeof csRaw === 'string'
          ? JSON.parse(csRaw)
          : Array.isArray(csRaw)
          ? csRaw
          : [];
      
      // 3️⃣ Map straight to your shape:
      const caseStudies = csArr.map(({ title, link }) => ({
        title,
        url: link,
      }));

    // console.log(`Project ${project.id} caseStudies:`, caseStudies);


    return {
      id: project.id,
      title: project.title || 'Untitled Project',
      description: project.what || 'No description available',
      imageUrl:
        project.hero_image ||
        'https://images.unsplash.com/photo-1518051870910-a46e30d9db16',
      color: project.color || 'from-gray-900 to-black',
      enabled: Boolean(project.enabled),
      order: project.order,
      metadata: {
        client: project.company,
        tags: [
          project.industry,
          project.date,
          project.company,
          project.tag,
        ].filter(Boolean),
        technologies:
          project.tech?.split(',').map((t: string) => t.trim()) || [],
        year: project.date,
        role: project.role,
        description_long: project.description_long || project.what,
        url1: project.url1,
        url2: project.url2,
        url3: project.url3,
        type: project.tag,
        videoUrl: project.mainmedia_url,
        caseStudies,
      },
    };
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};
