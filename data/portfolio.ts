import portfolioData from './portfolio.json';

export type ProjectGroup = 'rugs' | 'clothing' | 'shoes' | 'other';

export interface Project {
  id: string;
  name: string;
  url: string;
  group: ProjectGroup;
  platform: string;
  description: string;
  role: string;
  published: boolean;
  desktop: string;
  mobile: string;
}

export const GROUP_LABELS: Record<ProjectGroup, string> = {
  rugs: 'Rugs & home',
  clothing: 'Clothing',
  shoes: 'Shoes',
  other: 'Other projects',
};

export const PROJECTS: Project[] = (portfolioData as Project[]).filter(
  (p) => p.published
);
