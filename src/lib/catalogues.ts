import { z } from 'astro/zod';
import enemies from '../data/enemies.json';
import cells from '../data/cells.json';
import talents from '../data/talents.json';
import equipment from '../data/equipment.json';
import mediaData from '../data/media.json';
import type { Locale } from '../i18n/ui';

const entrySchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    appearance: z.string(),
    behavior: z.string().min(1),
    response: z.string().min(1),
    warning: z.string(),
    family: z.string().optional(),
    role: z.enum(['enemy', 'summon', 'boss']).optional(),
    category: z.string().optional(),
    rarity: z.enum(['uncommon', 'rare', 'epic', 'legendary']).optional(),
    floors: z.array(z.number().int().min(1).max(10)).optional(),
  })
  .strict();

export const catalogues = {
  enemies: z.array(entrySchema).parse(enemies),
  cells: z.array(entrySchema).parse(cells),
  talents: z.array(entrySchema).parse(talents),
  equipment: z.array(entrySchema).parse(equipment),
};
export type CatalogueKind = keyof typeof catalogues;

const translationSchema = entrySchema.pick({
  name: true,
  appearance: true,
  behavior: true,
  response: true,
  warning: true,
});
const translations = import.meta.glob('../data/translations/*.json', {
  eager: true,
  import: 'default',
});

export function getEntries(kind: CatalogueKind, locale: Locale) {
  const entries = catalogues[kind];
  if (locale === 'en')
    return entries.map((entry) => ({ ...entry, englishName: entry.name }));
  const all = z
    .record(z.string(), z.record(z.string(), translationSchema))
    .parse(translations[`../data/translations/${locale}.json`]);
  const localized = all[kind];
  if (!localized || entries.length !== Object.keys(localized).length) {
    throw new Error(`Incomplete ${locale} ${kind} translation`);
  }
  return entries.map((entry) => {
    const text = localized[entry.id];
    if (!text) throw new Error(`Missing ${locale} ${kind}/${entry.id}`);
    return { ...entry, ...text, englishName: entry.name };
  });
}

export const media = z
  .record(
    z.string(),
    z.object({
      src: z.string().regex(/^\/media\/[a-z0-9/-]+\.png$/),
      width: z.number().positive(),
      height: z.number().positive(),
      frameWidth: z.number().positive(),
      frameHeight: z.number().positive(),
      frames: z.number().int().positive(),
      column: z.number().int().nonnegative().default(0),
      row: z.number().int().nonnegative().default(0),
    }),
  )
  .parse(mediaData);

for (const [kind, entries] of Object.entries(catalogues)) {
  if (new Set(entries.map((entry) => entry.id)).size !== entries.length) {
    throw new Error(`Duplicate ID in ${kind}`);
  }
}
