import Link from 'next/link';
import { notFound } from 'next/navigation';

import ProductCard from '../../../../components/ProductCard';
import SEO from '../../../../components/SEO';
import { productCategories, products } from '../../../../lib/data/products';
import { defaultLocale, locales } from '../../../../i18n';

const labels = {
  en: {
    title: 'Healthcare Products | HK Health Innovations Ltd.',
    description: 'Explore connected healthcare products designed for Hong Kong providers and patients.',
    heading: 'Healthcare products built for Hong Kong',
    subheading: 'Filter by category to find the right solution for your care team.',
    filterLabel: 'Filter by category',
    categories: {
      all: 'All',
      'remote-care': 'Remote care',
      analytics: 'Analytics',
      'patient-engagement': 'Patient engagement'
    },
    empty: 'No products match this category.'
  },
  'zh-HK': {
    title: '醫療產品 | 香港健康創新有限公司',
    description: '探索為香港醫護機構與患者打造的互聯醫療產品。',
    heading: '為香港打造的醫療產品',
    subheading: '按類別篩選，找到最合適的方案。',
    filterLabel: '按類別篩選',
    categories: {
      all: '全部',
      'remote-care': '遠程照護',
      analytics: '數據分析',
      'patient-engagement': '患者互動'
    },
    empty: '暫無符合此類別的產品。'
  },
  'zh-CN': {
    title: '医疗产品 | 香港健康创新有限公司',
    description: '探索为香港医疗机构与患者打造的互联医疗产品。',
    heading: '为香港打造的医疗产品',
    subheading: '按类别筛选，找到最合适的方案。',
    filterLabel: '按类别筛选',
    categories: {
      all: '全部',
      'remote-care': '远程护理',
      analytics: '数据分析',
      'patient-engagement': '患者互动'
    },
    empty: '暂无符合此类别的产品。'
  }
} as const;

type PageLocale = keyof typeof labels;
type CategoryKey = keyof typeof labels.en.categories;

const categoryOptions: CategoryKey[] = ['all', ...productCategories];

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    productCategories.map((category) => ({ locale, category }))
  );
}

export default async function ProductsCategoryPage({
  params
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;

  if (!productCategories.includes(category as (typeof productCategories)[number])) {
    notFound();
  }

  const resolvedLocale = (labels[locale as PageLocale] ? locale : defaultLocale) as PageLocale;
  const content = labels[resolvedLocale];
  const activeCategory = category as CategoryKey;

  const filteredProducts = products.filter((product) => product.category === activeCategory);

  return (
    <main className="flex flex-1 flex-col gap-10 px-6 py-12 sm:px-10">
      <SEO
        title={content.title}
        description={content.description}
        locale={resolvedLocale}
        type="ItemList"
        canonicalPath={`/products/${activeCategory}`}
      />

      <header className="mx-auto w-full max-w-5xl space-y-3 text-center">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{content.heading}</h1>
        <p className="text-base text-slate-600 sm:text-lg">{content.subheading}</p>
      </header>

      <section className="mx-auto w-full max-w-5xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-600">{content.filterLabel}</p>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => {
              const label = content.categories[option];
              const href =
                option === 'all'
                  ? `/${resolvedLocale}/products`
                  : `/${resolvedLocale}/products/${option}`;
              const isActive = activeCategory === option;

              return (
                <Link
                  key={option}
                  href={href}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    isActive
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
            {content.empty}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
