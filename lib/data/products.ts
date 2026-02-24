export type ProductCategory = 'remote-care' | 'analytics' | 'patient-engagement';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  highlights: string[];
};

export const products: Product[] = [
  {
    id: 'carelink-rpm',
    name: 'CareLink RPM',
    category: 'remote-care',
    description: 'Continuous remote monitoring for chronic care programs across Hong Kong.',
    highlights: ['Device-agnostic vitals intake', 'Automated clinician alerts', 'Family caregiver views']
  },
  {
    id: 'triage-ai',
    name: 'Harbour Triage AI',
    category: 'patient-engagement',
    description: 'Multilingual symptom intake with intelligent routing and care guidance.',
    highlights: ['Cantonese/English/Mandarin', 'Risk scoring engine', 'Self-care pathways']
  },
  {
    id: 'insight-pop',
    name: 'Insight Population Health',
    category: 'analytics',
    description: 'Actionable analytics for providers, payers, and community health networks.',
    highlights: ['Trend dashboards', 'Cohort segmentation', 'Program ROI modeling']
  }
];
