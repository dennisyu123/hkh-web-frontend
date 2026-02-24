import SEO from '../../../components/SEO';
import RoadmapTimeline from '../../../components/RoadmapTimeline';
import { roadmapMilestones } from '../../../lib/data/roadmap';
import { defaultLocale } from '../../../i18n';

const labels = {
  en: {
    title: 'Product Roadmap | HK Health Innovations Ltd.',
    description: 'Follow our roadmap as we expand healthcare innovation across Hong Kong.',
    heading: 'Product roadmap',
    subheading: 'See how we are delivering measurable healthcare outcomes across Hong Kong.'
  },
  'zh-HK': {
    title: '產品路線圖 | 香港健康創新有限公司',
    description: '了解我們如何推動香港醫療創新與服務升級。',
    heading: '產品路線圖',
    subheading: '了解我們如何為香港帶來可衡量的醫療成效。'
  },
  'zh-CN': {
    title: '产品路线图 | 香港健康创新有限公司',
    description: '了解我们如何推动香港医疗创新与服务升级。',
    heading: '产品路线图',
    subheading: '了解我们如何为香港带来可衡量的医疗成效。'
  }
} as const;

type PageLocale = keyof typeof labels;

export default async function RoadmapPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (labels[locale as PageLocale] ? locale : defaultLocale) as PageLocale;
  const content = labels[resolvedLocale];

  return (
    <main className="flex flex-1 flex-col gap-10 px-6 py-12 sm:px-10">
      <SEO
        title={content.title}
        description={content.description}
        locale={resolvedLocale}
        type="MedicalBusiness"
        canonicalPath="/roadmap"
      />

      <header className="mx-auto w-full max-w-4xl space-y-3 text-center">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{content.heading}</h1>
        <p className="text-base text-slate-600 sm:text-lg">{content.subheading}</p>
      </header>

      <RoadmapTimeline milestones={roadmapMilestones} />
    </main>
  );
}
