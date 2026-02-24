export type RoadmapMilestone = {
  id: string;
  quarter: string;
  title: string;
  summary: string;
  status: 'planned' | 'in-progress' | 'completed';
  highlights: string[];
};

export const roadmapMilestones: RoadmapMilestone[] = [
  {
    id: '2026-q1',
    quarter: '2026 Q1',
    title: 'Remote Patient Monitoring Pilot',
    summary: 'Launch a pilot with partner clinics to monitor chronic patients at home.',
    status: 'in-progress',
    highlights: [
      'Integrate IoT vitals devices',
      'Clinical alerts dashboard',
      'Baseline outcomes tracking'
    ]
  },
  {
    id: '2026-q2',
    quarter: '2026 Q2',
    title: 'AI Triage Assistant',
    summary: 'Deploy an AI triage assistant in Cantonese, Mandarin, and English.',
    status: 'planned',
    highlights: [
      'Symptom intake flows',
      'Clinic routing logic',
      'HK compliance review'
    ]
  },
  {
    id: '2026-q3',
    quarter: '2026 Q3',
    title: 'Population Health Insights',
    summary: 'Aggregate anonymized trends for preventative care insights.',
    status: 'planned',
    highlights: [
      'Data quality scoring',
      'Care pathway analytics',
      'Provider benchmarking'
    ]
  },
  {
    id: '2026-q4',
    quarter: '2026 Q4',
    title: 'Integrated Care Marketplace',
    summary: 'Connect labs, pharmacies, and specialist services in one platform.',
    status: 'planned',
    highlights: [
      'Digital referrals',
      'Secure record exchange',
      'Patient engagement toolkit'
    ]
  }
];
