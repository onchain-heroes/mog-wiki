import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        description: z.string().min(8).max(200),
        // Require explicit public classification, including pages absent from navigation.
        visibility: z.literal('public'),
        knowledgeScope: z.literal('player-visible'),
        gameMode: z.literal('arcade'),
        evidence: z.enum([
          'in-game-guide',
          'in-game-interface',
          'observable-gameplay',
          'editorial',
        ]),
        lastUpdated: z.coerce.date(),
        draft: z.literal(false).default(false),
      }),
    }),
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
