import type { Locale } from './ui';
type RoomCopy = {
  shrine: string;
  armory: string;
  sanctum: string;
  note: string;
  trainerNote: string;
  'unknown-trainer': string;
  alt: {
    shrine: string;
    armory: string;
    sanctum: string;
    'unknown-trainer': string;
  };
};
export const roomText: Record<Locale, RoomCopy> = {
  en: {
    'unknown-trainer':
      'Unknown Trainer: an encounter on an ordinary dungeon floor. Bump the trainer to inspect the talent exchange.',
    trainerNote: 'Captured in a local game scene.',
    alt: {
      'unknown-trainer':
        'The Unknown Trainer beside a dungeon wall, with the player standing nearby.',
      shrine: 'Shrine room with a central altar, torches and exit stairs.',
      armory: 'Armory room with four item pedestals and the shopkeeper.',
      sanctum:
        'Sanctum room with two fountains, four item pedestals and stairs to the boss.',
    },
    shrine:
      'Shrine: strike the altar once to inspect its Energy recovery and offering price. The exit stairs are at the lower left.',
    armory:
      'Armory: compare the item pedestals and their displayed prices before buying. Keep an inventory slot free.',
    sanctum:
      'The Sanctum: use the fountains and make your final purchases before taking the stairs to the boss.',
    note: 'Captured in a local game scene. Shop stock and prices shown are examples.',
  },
  fr: {
    'unknown-trainer':
      'Entraîneur inconnu : une rencontre sur un étage ordinaire du donjon. Avancez contre lui pour consulter l’échange de talent.',
    trainerNote: 'Capture réalisée localement dans le jeu.',
    alt: {
      'unknown-trainer':
        'L’entraîneur inconnu près d’un mur du donjon, avec le personnage à proximité.',
      shrine:
        'Salle de l’Autel avec son monument central, ses torches et son escalier de sortie.',
      armory: 'Armurerie avec quatre présentoirs et le marchand.',
      sanctum:
        'Sanctuaire avec deux fontaines, quatre présentoirs et l’escalier vers le boss.',
    },
    shrine:
      'Autel : frappez une première fois pour consulter le gain d’Énergie et le prix de l’offrande. L’escalier de sortie se trouve en bas à gauche.',
    armory:
      'Armurerie : comparez les objets sur les présentoirs et leurs prix avant d’acheter. Gardez une place libre dans votre inventaire.',
    sanctum:
      'Sanctuaire : utilisez les fontaines et faites vos derniers achats avant de prendre l’escalier vers le boss.',
    note: 'Capture réalisée localement dans le jeu. Les objets en vente et les prix affichés sont des exemples.',
  },
  es: {
    'unknown-trainer':
      'Entrenador desconocido: un encuentro en una planta normal de la mazmorra. Acércate a él para consultar el intercambio de talentos.',
    trainerNote: 'Captura de una escena local del juego.',
    alt: {
      'unknown-trainer':
        'El entrenador desconocido junto a una pared de la mazmorra, con el personaje cerca.',
      shrine:
        'Sala del Altar con el monumento central, antorchas y la escalera de salida.',
      armory: 'Armería con cuatro pedestales de objetos y el comerciante.',
      sanctum:
        'Santuario con dos fuentes, cuatro pedestales y la escalera hacia el jefe.',
    },
    shrine:
      'Altar: golpéalo una vez para consultar la recuperación de Energía y el precio de la ofrenda. La escalera de salida está abajo a la izquierda.',
    armory:
      'Armería: compara los objetos de los pedestales y sus precios antes de comprar. Deja un espacio libre en el inventario.',
    sanctum:
      'Santuario: usa las fuentes y haz tus últimas compras antes de bajar por la escalera hacia el jefe.',
    note: 'Captura de una escena local del juego. Los objetos en venta y los precios son ejemplos.',
  },
  ja: {
    'unknown-trainer':
      '謎のトレーナー：通常のダンジョン階層で出会うNPCです。トレーナーにぶつかると、タレント交換の内容を確認できます。',
    trainerNote: 'ローカルのゲームシーンで撮影。',
    alt: {
      'unknown-trainer':
        'ダンジョンの壁際に立つ謎のトレーナーと、その近くにいるプレイヤー。',
      shrine: '中央の祭壇、松明、出口の階段がある部屋。',
      armory: '4つのアイテム台座と店主がいる武器庫。',
      sanctum: '2つの泉、4つの台座、ボスへ続く階段がある聖域。',
    },
    shrine:
      '祭壇：一度叩いてエネルギー回復量と供物の価格を確認しましょう。出口の階段は左下にあります。',
    armory:
      '武器庫：台座のアイテムと価格を比べてから購入しましょう。インベントリには空き枠が必要です。',
    sanctum:
      '聖域：泉を使い、最後の買い物を済ませてからボスへ続く階段を下りましょう。',
    note: 'ローカルのゲームシーンで撮影。品ぞろえと価格は一例です。',
  },
  ko: {
    'unknown-trainer':
      '정체불명 트레이너: 일반 던전 층에서 만나는 NPC입니다. 트레이너 쪽으로 부딪히면 특성 교환 내용을 확인할 수 있습니다.',
    trainerNote: '로컬 게임 장면에서 촬영했습니다.',
    alt: {
      'unknown-trainer':
        '던전 벽 옆에 서 있는 정체불명 트레이너와 근처의 플레이어.',
      shrine: '중앙 신단과 횃불, 출구 계단이 있는 신전.',
      armory: '아이템 진열대 네 개와 상인이 있는 무기고.',
      sanctum: '분수 두 개와 진열대 네 개, 보스로 향하는 계단이 있는 성소.',
    },
    shrine:
      '신전: 신단을 한 번 쳐서 에너지 회복량과 공물 가격을 확인하세요. 출구 계단은 왼쪽 아래에 있습니다.',
    armory:
      '무기고: 진열된 아이템과 가격을 비교한 뒤 구매하세요. 인벤토리에 빈칸이 필요합니다.',
    sanctum:
      '성소: 분수를 이용하고 마지막 구매를 마친 뒤 보스로 향하는 계단을 내려가세요.',
    note: '로컬 게임 장면에서 촬영했습니다. 상품과 가격은 예시입니다.',
  },
  'zh-cn': {
    'unknown-trainer':
      '神秘训练师：普通地牢楼层中的偶遇。走向训练师可查看天赋交换信息。',
    trainerNote: '在本地游戏场景中录制。',
    alt: {
      'unknown-trainer': '站在地牢墙边的神秘训练师，以及附近的玩家角色。',
      shrine: '设有中央神龛、火把和出口楼梯的神殿。',
      armory: '设有四个道具台座及商人的军械库。',
      sanctum: '设有两座喷泉、四个台座及通往首领的楼梯的圣所。',
    },
    shrine:
      '神殿：击打神龛一次，查看能量恢复量和供奉价格。出口楼梯位于左下方。',
    armory: '军械库：购买前比较台座上的道具及价格，并确保背包留有空位。',
    sanctum: '圣所：使用喷泉并完成最后的购买，然后沿楼梯前往首领所在处。',
    note: '在本地游戏场景中录制。商品和价格仅为示例。',
  },
};
