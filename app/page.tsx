"use client";

import { useEffect } from "react";
import { defaultLocale, locales } from "../i18n";

const localeList = [...locales];

const isSupportedLocale = (locale: string) =>
  localeList.some((supported) => supported.toLowerCase() === locale.toLowerCase());

const findLocaleMatch = (candidate: string) => {
  const normalized = candidate.trim().toLowerCase();
  const exact = localeList.find((supported) => supported.toLowerCase() === normalized);
  if (exact) {
    return exact;
  }
  const base = normalized.split("-")[0];
  if (!base) {
    return null;
  }
  return (
    localeList.find((supported) => supported.toLowerCase().startsWith(base)) || null
  );
};

const getCookieLocale = () => {
  if (typeof document === "undefined") {
    return null;
  }
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  if (!match) {
    return null;
  }
  const value = decodeURIComponent(match[1]);
  return isSupportedLocale(value) ? value : findLocaleMatch(value);
};

const getNavigatorLocale = () => {
  if (typeof navigator === "undefined") {
    return null;
  }
  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const language of languages) {
    const match = findLocaleMatch(language);
    if (match) {
      return match;
    }
  }
  return null;
};

export default function Home() {
  useEffect(() => {
    const cookieLocale = getCookieLocale();
    const resolvedLocale = cookieLocale || getNavigatorLocale() || defaultLocale;
    window.location.replace(`/${resolvedLocale}/`);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16 text-center text-slate-700">
      <h1 className="text-2xl font-semibold text-slate-900">Redirecting…</h1>
      <p className="mt-3 text-base text-slate-600">
        Taking you to the right locale.
      </p>
      <p className="mt-6 text-sm text-slate-500">
        If you are not redirected automatically, head to{" "}
        <a className="font-medium text-slate-900" href={`/${defaultLocale}/`}>
          /{defaultLocale}/
        </a>
        .
      </p>
      <noscript>
        <p className="mt-4 text-sm text-slate-500">
          JavaScript is disabled. Please use the link above.
        </p>
      </noscript>
    </main>
  );
}
