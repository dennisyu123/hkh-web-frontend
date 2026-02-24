import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  experimental: {},
  /* used for static site generation
  images: {
    unoptimized: true
  },
  output: 'export',
  trailingSlash: true*/
};

export default withNextIntl(nextConfig);
