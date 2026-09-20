import type { Locale } from './ui';

export type Rarity = 'uncommon' | 'rare' | 'epic' | 'legendary';

export const rarityText: Record<Locale, Record<Rarity, string>> = {
  en: {
    uncommon: 'Uncommon',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
  },
  fr: {
    uncommon: 'Peu commun',
    rare: 'Rare',
    epic: 'Épique',
    legendary: 'Légendaire',
  },
  es: {
    uncommon: 'Poco común',
    rare: 'Raro',
    epic: 'Épico',
    legendary: 'Legendario',
  },
  ja: {
    uncommon: 'アンコモン',
    rare: 'レア',
    epic: 'エピック',
    legendary: 'レジェンダリー',
  },
  ko: { uncommon: '고급', rare: '희귀', epic: '영웅', legendary: '전설' },
  'zh-cn': { uncommon: '罕见', rare: '稀有', epic: '史诗', legendary: '传说' },
};
