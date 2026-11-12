export interface WorkProject {
  id: string;
  category: string;
  platform: string;
  name: string;
  result: string;
  packageSummary?: string;
  imageLabel: string;
  href: string;
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'p1',
    category: 'Handmade rugs',
    platform: 'New store',
    name: '[Project name]',
    result: '[One line: what was built and one result]',
    packageSummary: '[N] products · [N] pages · [integrations] · [automations]',
    imageLabel: '[Store screenshot]',
    href: '#p1',
  },
  {
    id: 'p2',
    category: 'Recovery hardware',
    platform: 'New store',
    name: '[Project name]',
    result: '[One line: what was built and one result]',
    packageSummary: '[N] products · [N] pages · [integrations] · [automations]',
    imageLabel: '[Store screenshot]',
    href: '#p2',
  },
  {
    id: 'p3',
    category: 'Sneakers',
    platform: 'Headless',
    name: '[Project name]',
    result: '[One line: what was built and one result]',
    packageSummary: '[N] products · [N] pages · [integrations] · [automations]',
    imageLabel: '[Store screenshot]',
    href: '#p3',
  },
];
