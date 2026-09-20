import type { Locale } from './ui';

type CatalogueViewCopy = {
  talents: string;
  enemies: string;
  equipment: string;
  cells: string;
  layout: string;
  grid: string;
  list: string;
  choose: string;
  back: string;
  rarity: string;
  allRarities: string;
};

export const catalogueViewText: Record<Locale, CatalogueViewCopy> = {
  en: {
    talents: 'Browse talents',
    enemies: 'Browse enemies',
    equipment: 'Browse items',
    cells: 'Browse special tiles and objects',
    layout: 'Catalogue view',
    grid: 'Grid',
    list: 'List',
    choose: 'Select an icon to read its details.',
    back: 'Back to icons',
    rarity: 'Filter by rarity',
    allRarities: 'All rarities',
  },
  fr: {
    talents: 'Parcourir les talents',
    enemies: 'Parcourir le bestiaire',
    equipment: 'Parcourir les objets',
    cells: 'Parcourir les cases spéciales et les objets du décor',
    layout: 'Affichage du catalogue',
    grid: 'Grille',
    list: 'Liste',
    choose: 'Sélectionnez une icône pour lire sa fiche.',
    back: 'Retour aux icônes',
    rarity: 'Filtrer par rareté',
    allRarities: 'Toutes les raretés',
  },
  es: {
    talents: 'Explorar talentos',
    enemies: 'Explorar enemigos',
    equipment: 'Explorar objetos',
    cells: 'Explorar casillas y objetos especiales',
    layout: 'Vista del catálogo',
    grid: 'Cuadrícula',
    list: 'Lista',
    choose: 'Selecciona un icono para ver sus detalles.',
    back: 'Volver a los iconos',
    rarity: 'Filtrar por rareza',
    allRarities: 'Todas las rarezas',
  },
  ja: {
    talents: 'タレントを探す',
    enemies: '敵を探す',
    equipment: 'アイテムを探す',
    cells: '特殊タイルとオブジェクトを探す',
    layout: 'カタログの表示形式',
    grid: 'グリッド',
    list: 'リスト',
    choose: 'アイコンを選ぶと詳細を確認できます。',
    back: 'アイコン一覧に戻る',
    rarity: 'レアリティで絞り込み',
    allRarities: 'すべてのレアリティ',
  },
  ko: {
    talents: '특성 둘러보기',
    enemies: '적 둘러보기',
    equipment: '아이템 둘러보기',
    cells: '특수 지형과 사물 둘러보기',
    layout: '도감 보기 방식',
    grid: '격자',
    list: '목록',
    choose: '아이콘을 선택하면 자세한 설명을 볼 수 있습니다.',
    back: '아이콘 목록으로 돌아가기',
    rarity: '희귀도 필터',
    allRarities: '모든 희귀도',
  },
  'zh-cn': {
    talents: '浏览天赋',
    enemies: '浏览敌人',
    equipment: '浏览物品',
    cells: '浏览特殊地块与物体',
    layout: '图鉴显示方式',
    grid: '网格',
    list: '列表',
    choose: '选择图标，查看详细说明。',
    back: '返回图标列表',
    rarity: '按稀有度筛选',
    allRarities: '所有稀有度',
  },
};
