import SEO from '../../../components/SEO';
import { defaultLocale } from '../../../i18n';

const labels = {
  en: {
    title: 'Contact Us | HK Health Innovations Ltd.',
    description:
      'Get in touch with HK Health Innovations Ltd. Submit an enquiry and we’ll respond as soon as possible.',
    heading: 'Contact us',
    subheading: 'Send us a message using the form below.',
    fallback: 'Open the form in a new tab'
  },
  'zh-HK': {
    title: '聯絡我們 | 香港健康創新有限公司',
    description: '歡迎聯絡香港健康創新有限公司。請透過表格提交查詢，我們會盡快回覆。',
    heading: '聯絡我們',
    subheading: '請使用以下表格向我們留言。',
    fallback: '於新分頁開啟表格'
  },
  'zh-CN': {
    title: '联系我们 | 香港健康创新有限公司',
    description: '欢迎联系香港健康创新有限公司。请通过表格提交咨询，我们将尽快回复。',
    heading: '联系我们',
    subheading: '请使用以下表格给我们留言。',
    fallback: '在新标签页打开表格'
  }
} as const;

type PageLocale = keyof typeof labels;

const DEFAULT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdyX-fDVmPr2LSXu-TjI7Q42C7yhTVxrpC1Oo_dfGzl6sNzqA/viewform';
const resolvedFormUrl = process.env.CONTACT_FORM_URL?.trim() || DEFAULT_FORM_URL;
const formUrl = (() => {
  try {
    return new URL(resolvedFormUrl).toString();
  } catch {
    return DEFAULT_FORM_URL;
  }
})();
const embeddedFormUrl = `${formUrl}?embedded=true`;

export default async function ContactPage({
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
        canonicalPath="/contact"
      />
      <section className="mx-auto w-full max-w-5xl space-y-4">
        <div className="overflow-hidden ">
          <iframe
            title={content.heading}
            src={embeddedFormUrl}
            className="w-full min-h-[900px] h-[1200px] md:h-[1400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
