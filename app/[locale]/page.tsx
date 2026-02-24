import SEO from '../../components/SEO';
import Hero from '../../components/Hero';

import { defaultLocale, locales } from '../../i18n';

const pageCopy = {
  en: {
    title: 'HK Health Innovations Ltd. | Healthcare innovation for Hong Kong',
    description:
      'Transform care delivery with connected health platforms, AI-driven triage, and population insights built for Hong Kong.',
    heroTitle: 'Healthcare innovation built for Hong Kong',
    heroSubtitle:
      'Connect patients, clinics, and care teams with real-time monitoring, multilingual triage, and data-led insights.',
    primaryCta: 'Explore products',
    secondaryCta: 'View roadmap',
    featureTitle: 'Why teams choose us',
    features: [
      {
        title: 'Localized patient experience',
        description: 'Cantonese, Mandarin, and English support across every touchpoint.'
      },
      {
        title: 'Clinically validated workflows',
        description: 'Designed alongside Hong Kong providers and compliant with local standards.'
      },
      {
        title: 'Always-on care visibility',
        description: 'Real-time dashboards, alerts, and outcome tracking for care teams.'
      }
    ]
  },
  'zh-HK': {
    title: '香港健康創新有限公司 | 為香港打造的醫療創新',
    description: '以連接式健康平台、AI 分流與人口健康洞察，提升香港的醫療服務效率。',
    heroTitle: '為香港打造的醫療創新平台',
    heroSubtitle: '透過即時監測、多語言分流與數據洞察，連結患者、診所與照護團隊。',
    primaryCta: '查看產品',
    secondaryCta: '了解路線圖',
    featureTitle: '為何團隊選擇我們',
    features: [
      {
        title: '本地化病人體驗',
        description: '全程支援廣東話、普通話與英語。'
      },
      {
        title: '臨床驗證流程',
        description: '與香港醫護合作設計，符合本地規範。'
      },
      {
        title: '全天候照護可視化',
        description: '即時儀表板、警示與成效追蹤。'
      }
    ]
  },
  'zh-CN': {
    title: '香港健康创新有限公司 | 为香港打造的医疗创新',
    description: '以互联医疗平台、AI 分诊与人口健康洞察，提升香港医疗服务效率。',
    heroTitle: '为香港打造的医疗创新平台',
    heroSubtitle: '通过实时监测、多语言分诊与数据洞察，连接患者、诊所与护理团队。',
    primaryCta: '查看产品',
    secondaryCta: '了解路线图',
    featureTitle: '为什么团队选择我们',
    features: [
      {
        title: '本地化患者体验',
        description: '全程支持粤语、普通话与英语。'
      },
      {
        title: '临床验证流程',
        description: '与香港医疗机构共创，符合本地规范。'
      },
      {
        title: '全天候护理可视化',
        description: '实时仪表盘、预警与成效追踪。'
      }
    ]
  }
} as const;

type HomeLocale = keyof typeof pageCopy;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (pageCopy[locale as HomeLocale] ? locale : defaultLocale) as HomeLocale;
  const content = pageCopy[resolvedLocale];

  return (
    <main className="flex flex-1 flex-col gap-16 px-6 py-12 sm:px-10">
      <SEO
        title={content.title}
        description={content.description}
        locale={resolvedLocale}
        type="MedicalBusiness"
        canonicalPath=""
      />

      <Hero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        primaryCtaLabel={content.primaryCta}
        primaryCtaHref={`/${resolvedLocale}/products`}
        secondaryCtaLabel={content.secondaryCta}
        secondaryCtaHref={`/${resolvedLocale}/roadmap`}
      />

      <section className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-3">
        {content.features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
