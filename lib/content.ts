import { z } from 'zod';
import servicesData from '../content/services.json';
import locationsData from '../content/locations.json';
import questionsData from '../content/questions.json';
import caseStudiesData from '../content/case-studies.json';

// --- SCHEMAS ---

export const FaqSchema = z.object({
  q: z.string().min(5),
  a: z.string().min(20),
});
export type Faq = z.infer<typeof FaqSchema>;

export const ServiceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  h1: z.string(),
  category: z.string(),
  metaDescription: z.string().min(80).max(170),
  phase: z.number().default(1),
  status: z.enum(['draft', 'ready']).default('ready'),
  heroAnswer: z.string(),
  deliverables: z.array(z.string()),
  targetAudience: z.array(z.string()),
  processSteps: z.array(
    z.object({
      step: z.string(),
      title: z.string(),
      desc: z.string(),
    })
  ),
  pricingNote: z.string(),
  faqs: z.array(FaqSchema),
  relatedServices: z.array(z.string()),
  relatedQuestions: z.array(z.string()),
});
export type Service = z.infer<typeof ServiceSchema>;

export const MigrationChildSchema = z.object({
  platform: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  title: z.string(),
  h1: z.string(),
  metaDescription: z.string(),
  phase: z.number().default(1),
  status: z.enum(['draft', 'ready']).default('ready'),
  heroAnswer: z.string(),
  checklist: z.array(z.string()),
  downtimeGuarantee: z.string(),
  faqs: z.array(FaqSchema),
  pricingNote: z.string(),
});
export type MigrationChild = z.infer<typeof MigrationChildSchema>;

export const LocationSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  type: z.enum(['country', 'state', 'city']),
  parentCountry: z.string(),
  parentState: z.string().optional(),
  countryName: z.string(),
  phase: z.number().default(1),
  status: z.enum(['draft', 'ready']).default('ready'),
  metaDescription: z.string().min(80).max(170),
  heroAnswer: z.string(),
  timeZoneNote: z.string(),
  currency: z.string(),
  priceRangeLocal: z.string(),
  localNeeds: z.array(z.string()),
  paymentGateways: z.array(z.string()),
  industries: z.array(z.string()),
  faqs: z.array(FaqSchema),
  nearby: z.array(z.string()).optional(),
  spellingVariants: z.array(z.string()).optional(),
  updatedAt: z.string(),
});
export type Location = z.infer<typeof LocationSchema>;

export const QuestionSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  h1: z.string(),
  category: z.string(),
  answer: z.string(),
  metaDescription: z.string().min(80).max(170),
  author: z.string().default('Ritesh'),
  phase: z.number().default(1),
  status: z.enum(['draft', 'ready']).default('ready'),
  keyTakeaways: z.array(z.string()),
  relatedService: z.string(),
  relatedQuestions: z.array(z.string()),
  faqs: z.array(FaqSchema).optional(),
  updatedAt: z.string(),
});
export type Question = z.infer<typeof QuestionSchema>;

export const CaseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  clientName: z.string(),
  industry: z.string(),
  location: z.string(),
  services: z.array(z.string()),
  platform: z.string(),
  metrics: z.string(),
  challenge: z.string(),
  solution: z.string(),
  results: z.array(z.string()),
  clientQuote: z.string().optional(),
  liveUrl: z.string().optional(),
});
export type CaseStudy = z.infer<typeof CaseStudySchema>;

// --- LOADERS & ACCESSORS ---

export function getServices(): Service[] {
  return servicesData.services as Service[];
}

export function getService(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug);
}

export function getMigrationPages(): MigrationChild[] {
  return servicesData.migrationPlatforms as MigrationChild[];
}

export function getMigrationPage(platform: string): MigrationChild | undefined {
  return getMigrationPages().find((p) => p.platform === platform);
}

export function getLocations(): Location[] {
  return locationsData as Location[];
}

export function getCountries(): Location[] {
  return getLocations().filter((l) => l.type === 'country');
}

export function getCountry(countrySlug: string): Location | undefined {
  return getLocations().find(
    (l) => l.type === 'country' && l.slug === countrySlug
  );
}

export function getLocation(countrySlug: string, placeSlug: string): Location | undefined {
  return getLocations().find(
    (l) =>
      l.parentCountry === countrySlug &&
      l.slug === placeSlug &&
      (l.type === 'state' || l.type === 'city')
  );
}

export function getQuestions(): Question[] {
  return questionsData as Question[];
}

export function getQuestion(slug: string): Question | undefined {
  return getQuestions().find((q) => q.slug === slug);
}

export function getCaseStudies(): CaseStudy[] {
  return caseStudiesData as CaseStudy[];
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((c) => c.slug === slug);
}
