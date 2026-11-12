export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoLabel: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ritesh',
    name: 'Ritesh Kumar Singh',
    role: 'Founder · Strategy & creative direction',
    photoLabel: '[Photo]',
  },
  {
    id: 'dev',
    name: '[Name]',
    role: '[Role — Shopify development]',
    photoLabel: '[Photo]',
  },
  {
    id: 'ads',
    name: '[Name]',
    role: '[Role — Performance ads]',
    photoLabel: '[Photo]',
  },
  {
    id: 'design',
    name: '[Name]',
    role: '[Role — Design]',
    photoLabel: '[Photo]',
  },
];

