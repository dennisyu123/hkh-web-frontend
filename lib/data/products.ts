import type { Locale } from '../../i18n';

export type ProductCategory = 'remote-care' | 'analytics' | 'patient-engagement';

export const productCategories: ProductCategory[] = [
  'remote-care',
  'analytics',
  'patient-engagement'
];

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  highlights: string[];
};

export const productsByLocale: Record<Locale, Product[]> = {
  en: [
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
  ],
  'zh-HK': [
    {
      id: 'carelink-rpm',
      name: 'CareLink RPM',
      category: 'remote-care',
      description: '為香港慢性病護理計劃提供持續的遠程監測。',
      highlights: ['設備無關的生命體徵輸入', '自動臨床警示', '家屬照護視圖']
    },
    {
      id: 'triage-ai',
      name: 'Harbour Triage AI',
      category: 'patient-engagement',
      description: '多語言症狀收集，提供智能分流與照護指引。',
      highlights: ['粵語／英語／普通話', '風險評分引擎', '自我照護路徑']
    },
    {
      id: 'insight-pop',
      name: 'Insight Population Health',
      category: 'analytics',
      description: '為醫療提供者、支付方與社區健康網絡提供可行的分析洞察。',
      highlights: ['趨勢儀表板', '人群分層', '項目 ROI 建模']
    }
  ],
  'zh-CN': [
    {
      id: 'carelink-rpm',
      name: 'CareLink RPM',
      category: 'remote-care',
      description: '为香港慢性病护理计划提供持续的远程监测。',
      highlights: ['设备无关的生命体征采集', '自动临床预警', '家属照护视图']
    },
    {
      id: 'triage-ai',
      name: 'Harbour Triage AI',
      category: 'patient-engagement',
      description: '多语言症状采集，提供智能分流与护理指引。',
      highlights: ['粤语／英语／普通话', '风险评分引擎', '自我护理路径']
    },
    {
      id: 'insight-pop',
      name: 'Insight Population Health',
      category: 'analytics',
      description: '为医疗提供者、支付方与社区健康网络提供可执行的分析洞察。',
      highlights: ['趋势仪表板', '人群分层', '项目 ROI 建模']
    }
  ]
};

export const getProducts = (locale: Locale): Product[] => productsByLocale[locale] ?? productsByLocale.en;
