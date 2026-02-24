"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type ProductsCategoryRedirectProps = {
  locale: string;
  categories: string[];
};

export default function ProductsCategoryRedirect({
  locale,
  categories
}: ProductsCategoryRedirectProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (!categoryParam || !categories.includes(categoryParam)) {
      return;
    }

    router.replace(`/${locale}/products/${categoryParam}`);
  }, [categoryParam, categories, locale, router]);

  return null;
}
