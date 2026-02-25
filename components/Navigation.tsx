'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { locales, type Locale } from '../i18n';

const localeLabels: Record<Locale, { key: string }> = {
  en: { key: 'langEnglish' },
  'zh-HK': { key: 'langZhHK' },
  'zh-CN': { key: 'langZhCN' }
};

function stripLocale(pathname: string) {
  const sortedLocales = [...locales].sort((a, b) => b.length - a.length);

  for (const candidate of sortedLocales) {
    const prefix = `/${candidate}`;

    if (pathname === prefix) {
      return '';
    }

    if (pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length);
    }
  }

  return pathname;
}

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const queryString = searchParams.toString();
  const pathWithoutLocale = stripLocale(pathname);

  const navLinks = useMemo(
    () => [
      { key: 'home', href: `/${locale}` },
      { key: 'products', href: `/${locale}/products` },
      { key: 'roadmap', href: `/${locale}/roadmap` },
      { key: 'contact', href: `/${locale}/contact` }
    ],
    [locale]
  );

  const languageLinks = locales.map((targetLocale) => {
    const targetPath = `/${targetLocale}${pathWithoutLocale}`;
    const href = queryString ? `${targetPath}?${queryString}` : targetPath;
    return {
      locale: targetLocale,
      href,
      label: t(localeLabels[targetLocale].key)
    };
  });

  const handleLocaleChange = (targetLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${targetLocale};path=/;max-age=31536000`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href={`/${locale}`} className="text-sm font-semibold text-slate-900">
          HK Health Innovations
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.key}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}

          <details className="relative">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-600 hover:text-slate-900">
              {t('language')}
            </summary>
            <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
              {languageLinks.map((link) => (
              <Link
                key={link.locale}
                href={link.href}
                onClick={() => handleLocaleChange(link.locale)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                  link.locale === locale
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                >
                  <span>{link.label}</span>
                  {link.locale === locale ? (
                    <span className="text-xs font-semibold text-emerald-600">●</span>
                  ) : null}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 md:hidden"
          aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? t('closeMenu') : t('openMenu')}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-slate-200 bg-white px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-base font-semibold text-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {t('language')}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {languageLinks.map((link) => (
                <Link
                  key={link.locale}
                  href={link.href}
                  onClick={() => {
                    handleLocaleChange(link.locale);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
                >
                  <span>{link.label}</span>
                  <span
                    className={`h-3 w-3 rounded-full border ${
                      link.locale === locale ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                    }`}
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
