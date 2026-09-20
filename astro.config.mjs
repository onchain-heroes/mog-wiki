import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import locales from './src/i18n/locales.json' with { type: 'json' };

export default defineConfig({
  site: 'https://wiki.playmog.xyz',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: Object.fromEntries(
        Object.values(locales).map((locale) => [locale.lang, locale.title]),
      ),
      description:
        'A quick reference for your next run through the Maze of Gains.',
      favicon: '/favicon.png',
      customCss: ['./src/styles/custom.css'],
      defaultLocale: 'root',
      locales: Object.fromEntries(
        Object.entries(locales).map(([key, { label, lang }]) => [
          key === 'en' ? 'root' : key,
          { label, lang },
        ]),
      ),
      sidebar: [
        {
          label: 'Field guide',
          link: '/',
          translations: {
            fr: 'Guide de terrain',
            es: 'Guía de campo',
            ja: '冒険ガイド',
            ko: '모험 가이드',
            'zh-CN': '冒险指南',
          },
        },
        {
          label: 'Start here',
          translations: {
            fr: 'Bien débuter',
            es: 'Primeros pasos',
            ja: 'はじめに',
            ko: '시작하기',
            'zh-CN': '开始入门',
          },
          items: ['getting-started/first-run', 'getting-started/energy'],
        },
        {
          label: 'Inside the maze',
          translations: {
            fr: 'Dans le labyrinthe',
            es: 'Dentro del laberinto',
            ja: '迷宮の中へ',
            ko: '미궁 속으로',
            'zh-CN': '深入迷宫',
          },
          items: [
            'reference/floors',
            'reference/enemies',
            'reference/cells',
            'reference/hazards',
            'reference/encounters',
            'reference/talents',
            'reference/equipment',
          ],
        },
        {
          label: 'About this guide',
          slug: 'about',
          translations: {
            fr: 'À propos du guide',
            es: 'Acerca de esta guía',
            ja: 'このガイドについて',
            ko: '가이드 소개',
            'zh-CN': '关于本指南',
          },
        },
      ],
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        Hero: './src/components/GuideHome.astro',
      },
      head:
        process.env.VERCEL_ENV === 'preview'
          ? [
              {
                tag: 'meta',
                attrs: { name: 'robots', content: 'noindex, nofollow' },
              },
            ]
          : [],
      lastUpdated: true,
      pagination: false,
      credits: false,
      expressiveCode: false,
    }),
  ],
  vite: { build: { sourcemap: false } },
});
