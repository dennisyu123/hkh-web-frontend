import Script from 'next/script';

type SeoType = 'MedicalBusiness' | 'ItemList';

type SEOProps = {
  title: string;
  description: string;
  locale: string;
  type: SeoType;
  canonicalPath: string;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourhealthbrand.hk';

const localizedHrefLang = [
  { locale: 'en', hrefLang: 'en-HK' },
  { locale: 'zh-HK', hrefLang: 'zh-HK' },
  { locale: 'zh-CN', hrefLang: 'zh-CN' }
];

export default function SEO({ title, description, locale, type, canonicalPath }: SEOProps) {
  const canonicalUrl = `${baseUrl}/${locale}${canonicalPath}`;

  const jsonLd =
    type === 'MedicalBusiness'
      ? {
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          name: 'HK Health Innovations Ltd.',
          url: baseUrl,
          telephone: '+852 2345 6789',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'HK'
          },
          areaServed: 'HK'
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: title,
          itemListElement: [] as Array<{
            '@type': 'ListItem';
            position: number;
            name: string;
          }>
        };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {localizedHrefLang.map((link) => (
        <link
          key={link.locale}
          rel="alternate"
          hrefLang={link.hrefLang}
          href={`${baseUrl}/${link.locale}${canonicalPath}`}
        />
      ))}

      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en${canonicalPath}`} />

      <Script id={`seo-jsonld-${type}`} type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
