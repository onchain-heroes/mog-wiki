import type { Locale } from './ui';
import type captures from '../data/captures.json';
export type DemoKind = keyof typeof captures.clips;
type Demo = { title: string; steps: [string, string, string] };
type Copy = { note: string; gif: string; demos: Record<DemoKind, Demo> };
export const demoText: Record<Locale, Copy> = {
  en: {
    note: 'Recorded locally in the game.',
    gif: 'Download GIF',
    demos: {
      heatwave: {
        title: 'Heatwave: burn outlasts the hit',
        steps: [
          'Heatwave is active as the enemy shows its attack cue.',
          'This controlled example deliberately takes the hit to show burn being applied.',
          'After moving away, the burn icon remains visible and burn continues to drain Energy.',
        ],
      },
      gale: {
        title: 'Gale: watch what the gust moves',
        steps: [
          'The hero, an enemy and a loose drop are in the wind’s path.',
          'A gust pushes them one tile downwind.',
          'The rooted plant stays in place. Check the new positions before your next move.',
        ],
      },
      miasma: {
        title: 'Miasma: poison outlasts the hit',
        steps: [
          'Miasma is active as the enemy prepares to attack.',
          'This controlled example deliberately takes the hit to show poison being applied.',
          'After moving away, the poison icon remains visible and poison continues to drain Energy.',
        ],
      },
      lightning: {
        title: 'Storm: leave the marked tile',
        steps: [
          'A lightning warning appears on your tile.',
          'Move onto a clear neighboring tile before the next strike.',
          'Lightning strikes the marked tile. The move took you out of its path.',
        ],
      },
      explosion: {
        title: 'Exploding mushroom: diagonals are dangerous too',
        steps: [
          'The mushroom holds still for its final warning.',
          'Move beyond the tiles surrounding the mushroom. Diagonally adjacent tiles are dangerous too.',
          'The mushroom explodes around itself, including the diagonals. Keep your distance until the blast resolves.',
        ],
      },
      ice: {
        title: 'Frozen drops: crack, then collect',
        steps: [
          'Ice covers a drop. Walking into it does not collect the reward.',
          'Bump the frozen drop once to break the ice.',
          'The drop is revealed. Move onto it to collect it before it expires.',
        ],
      },
      spikes: {
        title: 'Spikes: every turn changes the danger',
        steps: [
          'Spikes alternate between raised and lowered phases.',
          'Waiting advances the phase even when you stay in place.',
          'Watch the rhythm and avoid remaining on a spike tile.',
        ],
      },
      fountain: {
        title: 'Fountains: one visit restores Energy',
        steps: [
          'Walk onto the fountain basin.',
          'It restores Energy, then becomes depleted.',
          'Stepping away and returning does not provide a second heal.',
        ],
      },
      mimic: {
        title: 'Mimics: the reveal is already an attack',
        steps: [
          'Approach the closed chest.',
          'The mimic reveals itself and strikes immediately, without the usual wind-up.',
          'Move away and read the cue for its next attack.',
        ],
      },
    },
  },
  ja: {
    note: 'ゲーム内のローカルシーンで撮影。',
    gif: 'GIFをダウンロード',
    demos: {
      heatwave: {
        title: '熱波：攻撃後も火傷が続く',
        steps: [
          '熱波が発生している中、敵が攻撃の予兆を示します。',
          'この実演では、火傷が付く様子を見せるために、意図的に攻撃を受けています。',
          '離れても火傷アイコンが残り、火傷によってエネルギーが減り続けます。',
        ],
      },
      gale: {
        title: '強風：突風で動くものを確認',
        steps: [
          'ヒーロー、敵、落ちているドロップが風の通り道にあります。',
          '突風で風下へ1マス押されます。',
          '根を張った植物はその場に留まります。次の移動前に、それぞれの位置を確認しましょう。',
        ],
      },
      miasma: {
        title: '瘴気：攻撃後も毒が続く',
        steps: [
          '瘴気が発生している中、敵が攻撃を準備します。',
          'この実演では、毒が付く様子を見せるために、意図的に攻撃を受けています。',
          '離れても毒アイコンが残り、毒によってエネルギーが減り続けます。',
        ],
      },
      lightning: {
        title: '雷雨：印のあるマスから離れる',
        steps: [
          '自分のマスに落雷の予告が現れます。',
          '次の落雷までに、隣の空いているマスへ移動します。',
          '予告されたマスに雷が落ちます。移動したことで直撃を避けられました。',
        ],
      },
      explosion: {
        title: '爆発キノコ：斜めのマスも危険',
        steps: [
          'キノコが最後の予告に入り、その場で止まります。',
          '範囲の外まで離れましょう。キノコの斜め隣も爆発範囲内です。',
          'キノコが斜めを含む周囲で爆発します。爆発が終わるまで距離を保ちましょう。',
        ],
      },
      ice: {
        title: '凍ったドロップ：氷を割ってから回収',
        steps: [
          'ドロップが氷に覆われています。そのままでは回収できません。',
          '凍ったドロップに1回ぶつかると、氷が割れます。',
          'ドロップが現れます。消える前にそのマスへ移動して回収しましょう。',
        ],
      },
      spikes: {
        title: 'トゲ：毎ターン危険が変わる',
        steps: [
          'トゲは出た状態と引っ込んだ状態を交互に繰り返します。',
          'その場で待つだけでもターンが進み、状態が変わります。',
          '周期を確認し、トゲのマスに留まらないようにしましょう。',
        ],
      },
      fountain: {
        title: '泉：回復できるのは一度だけ',
        steps: [
          '泉の水盤があるマスへ移動します。',
          'エネルギーが回復し、泉は使用済みになります。',
          '離れて戻っても、もう一度回復することはできません。',
        ],
      },
      mimic: {
        title: 'ミミック：正体を現すと同時に攻撃',
        steps: [
          '閉じた宝箱に近づきます。',
          'ミミックが正体を現し、通常の予告なしですぐに攻撃します。',
          '距離を取り、次の攻撃予告を確認しましょう。',
        ],
      },
    },
  },
  ko: {
    note: '로컬 게임 장면에서 녹화했습니다.',
    gif: 'GIF 다운로드',
    demos: {
      heatwave: {
        title: '폭염: 공격 후에도 화상이 지속됩니다',
        steps: [
          '폭염이 발생한 상태에서 적이 공격 예고를 표시합니다.',
          '이 시연에서는 화상이 걸리는 모습을 보여 주기 위해 일부러 공격을 맞습니다.',
          '거리를 벌려도 화상 아이콘이 남고, 화상으로 에너지가 계속 줄어듭니다.',
        ],
      },
      gale: {
        title: '강풍: 돌풍이 무엇을 움직이는지 살펴보세요',
        steps: [
          '영웅, 적, 바닥 획득물이 바람이 부는 곳에 있습니다.',
          '돌풍이 이들을 바람 방향으로 한 칸 밀어냅니다.',
          '뿌리내린 식물은 제자리에 남습니다. 다음 이동 전에 바뀐 위치를 확인하세요.',
        ],
      },
      miasma: {
        title: '독기: 공격 후에도 중독이 지속됩니다',
        steps: [
          '독기가 발생한 상태에서 적이 공격을 준비합니다.',
          '이 시연에서는 중독이 걸리는 모습을 보여 주기 위해 일부러 공격을 맞습니다.',
          '거리를 벌려도 중독 아이콘이 남고, 중독으로 에너지가 계속 줄어듭니다.',
        ],
      },
      lightning: {
        title: '뇌우: 표시된 타일을 벗어나세요',
        steps: [
          '현재 타일에 낙뢰 경고가 나타납니다.',
          '다음 낙뢰 전에 비어 있는 옆 타일로 이동하세요.',
          '표시된 타일에 번개가 떨어집니다. 이동한 덕분에 피했습니다.',
        ],
      },
      explosion: {
        title: '폭발 버섯: 대각선도 위험합니다',
        steps: [
          '버섯이 마지막 경고와 함께 멈춥니다.',
          '범위 밖으로 완전히 벗어나세요. 버섯의 대각선 옆 칸도 범위 안입니다.',
          '버섯이 대각선을 포함한 주변으로 폭발합니다. 폭발이 끝날 때까지 거리를 유지하세요.',
        ],
      },
      ice: {
        title: '얼어붙은 드롭: 얼음을 깨고 수집하세요',
        steps: [
          '드롭이 얼음으로 덮여 있습니다. 그대로는 보상을 수집할 수 없습니다.',
          '얼어붙은 드롭에 한 번 부딪혀 얼음을 깨세요.',
          '드롭이 드러납니다. 사라지기 전에 해당 타일로 이동해 수집하세요.',
        ],
      },
      spikes: {
        title: '가시: 매 턴 위험이 바뀝니다',
        steps: [
          '가시는 올라온 상태와 내려간 상태를 번갈아 반복합니다.',
          '제자리에서 기다려도 턴이 지나며 상태가 바뀝니다.',
          '주기를 살피고 가시 타일에 계속 머물지 마세요.',
        ],
      },
      fountain: {
        title: '분수: 회복은 한 번만 가능합니다',
        steps: [
          '분수의 물받이가 있는 타일로 이동하세요.',
          '에너지가 회복되고 분수는 사용한 상태가 됩니다.',
          '다른 곳으로 갔다가 돌아와도 다시 회복되지 않습니다.',
        ],
      },
      mimic: {
        title: '미믹: 정체를 드러내는 순간 공격합니다',
        steps: [
          '닫힌 상자에 다가가세요.',
          '미믹이 모습을 드러내며 평소의 준비 동작 없이 즉시 공격합니다.',
          '거리를 벌리고 다음 공격의 예고를 확인하세요.',
        ],
      },
    },
  },
  'zh-cn': {
    note: '在本地游戏场景中录制。',
    gif: '下载 GIF',
    demos: {
      heatwave: {
        title: '热浪：受击后灼烧仍会持续',
        steps: [
          '热浪生效时，敌人发出攻击预警。',
          '这个受控示例故意让角色受到攻击，以展示灼烧的施加过程。',
          '拉开距离后，仍显示灼烧图标，灼烧继续消耗能量。',
        ],
      },
      gale: {
        title: '狂风：观察阵风移动了什么',
        steps: [
          '英雄、敌人和散落物都处在风的路径上。',
          '一阵风将它们向下风方向推移一格。',
          '扎根的植物保持原位。下次移动前，先确认各自的新位置。',
        ],
      },
      miasma: {
        title: '瘴气：受击后中毒仍会持续',
        steps: [
          '瘴气生效时，敌人准备攻击。',
          '这个受控示例故意让角色受到攻击，以展示中毒的施加过程。',
          '拉开距离后，仍显示中毒图标，中毒继续消耗能量。',
        ],
      },
      lightning: {
        title: '雷暴：离开标记地块',
        steps: [
          '你所在的地块出现落雷预警。',
          '在下一次落雷前，移到旁边的空地块。',
          '闪电击中标记地块。移动让你避开了落雷。',
        ],
      },
      explosion: {
        title: '爆炸蘑菇：对角位置也危险',
        steps: [
          '蘑菇停下并发出最后预警。',
          '彻底离开这个区域。蘑菇的对角相邻地块仍在范围内。',
          '蘑菇向周围爆炸，包括对角方向。爆炸结束前保持距离。',
        ],
      },
      ice: {
        title: '冰冻掉落物：先破冰，再拾取',
        steps: [
          '掉落物被冰覆盖，无法直接拾取。',
          '碰撞冰冻掉落物一次即可破冰。',
          '掉落物显露出来。在它消失前移到所在的地块拾取。',
        ],
      },
      spikes: {
        title: '尖刺：每回合都会改变危险状态',
        steps: [
          '尖刺会在升起和缩回两种状态间交替。',
          '即使原地等待，回合推进也会改变尖刺状态。',
          '留意节奏，避免停留在尖刺地块上。',
        ],
      },
      fountain: {
        title: '喷泉：只能恢复一次',
        steps: [
          '走到喷泉水池所在的地块。',
          '喷泉恢复能量后便会耗尽。',
          '离开再回来，也无法获得第二次治疗。',
        ],
      },
      mimic: {
        title: '宝箱怪：现身时就会攻击',
        steps: [
          '靠近关闭的宝箱。',
          '宝箱怪现身并立即攻击，没有通常的蓄力预警。',
          '拉开距离，观察它下一次攻击的预警。',
        ],
      },
    },
  },
  fr: {
    note: 'Exemple enregistré localement dans le jeu.',
    gif: 'Télécharger le GIF',
    demos: {
      heatwave: {
        title: 'Canicule : la brûlure persiste après le coup',
        steps: [
          'La canicule est active et l’ennemi affiche son signal d’attaque.',
          'Dans cet exemple contrôlé, le personnage reçoit volontairement le coup pour montrer l’application de la brûlure.',
          'Après le recul, l’icône de brûlure reste visible et la brûlure continue de lui faire perdre de l’Énergie.',
        ],
      },
      gale: {
        title: 'Vent violent : observez ce que la rafale déplace',
        steps: [
          'Le héros, un ennemi et du butin au sol se trouvent sur le passage du vent.',
          'Une rafale les pousse d’une case dans le sens du vent.',
          'La plante enracinée reste en place. Vérifiez les nouvelles positions avant votre prochain déplacement.',
        ],
      },
      miasma: {
        title: 'Miasmes : le poison persiste après le coup',
        steps: [
          'Les miasmes sont actifs et l’ennemi prépare son attaque.',
          'Dans cet exemple contrôlé, le personnage reçoit volontairement le coup pour montrer l’application du poison.',
          'Après le recul, l’icône de poison reste visible et le poison continue de lui faire perdre de l’Énergie.',
        ],
      },
      lightning: {
        title: 'Orage : quittez la case marquée',
        steps: [
          'Un avertissement de foudre apparaît sur votre case.',
          'Déplacez-vous sur une case voisine dégagée avant le prochain impact.',
          'La foudre frappe la case marquée. Votre déplacement vous a mis hors de sa trajectoire.',
        ],
      },
      explosion: {
        title: 'Champignon explosif : les diagonales sont aussi dangereuses',
        steps: [
          'Le champignon s’immobilise et donne son dernier avertissement avant l’explosion.',
          'Sortez entièrement de la zone d’explosion. Une case juste en diagonale du champignon reste à l’intérieur.',
          'Le champignon explose autour de lui, diagonales comprises. Restez à distance jusqu’à la fin de l’explosion.',
        ],
      },
      ice: {
        title: 'Butin gelé : briser la glace, puis ramasser',
        steps: [
          'La glace recouvre du butin. Avancer contre ne permet pas encore de le ramasser.',
          'Avancez une fois contre le butin gelé pour briser la glace.',
          'Le butin est révélé. Marchez dessus pour le ramasser avant qu’il disparaisse.',
        ],
      },
      spikes: {
        title: 'Pointes : surveillez leur cycle',
        steps: [
          'Les pointes alternent entre une position levée et une position rétractée.',
          'Attendre fait avancer leur cycle, même si vous restez immobile.',
          'Évitez de rester sur la plaque : les pointes peuvent se lever sous vos pieds.',
        ],
      },
      fountain: {
        title: 'Fontaine : un soin à usage unique',
        steps: [
          'Marchez sur la case du bassin de la fontaine.',
          'La fontaine restaure de l’Énergie, puis s’épuise.',
          'Revenir sur sa case ne vous soigne plus.',
        ],
      },
      mimic: {
        title: 'Coffre mimique : attention à l’embuscade',
        steps: [
          'Approchez-vous du coffre.',
          'Le mimique se révèle et porte un coup immédiat.',
          'Éloignez-vous, puis observez le signal de sa prochaine attaque.',
        ],
      },
    },
  },
  es: {
    note: 'Grabado localmente en el juego.',
    gif: 'Descargar GIF',
    demos: {
      heatwave: {
        title: 'Ola de calor: la quemadura persiste tras el golpe',
        steps: [
          'La ola de calor está activa y el enemigo muestra su aviso de ataque.',
          'En este ejemplo controlado, el personaje recibe el golpe a propósito para mostrar cómo se aplica la quemadura.',
          'Tras alejarse, el icono de quemadura sigue visible y la quemadura sigue consumiendo Energía.',
        ],
      },
      gale: {
        title: 'Vendaval: observa qué mueve la ráfaga',
        steps: [
          'El héroe, un enemigo y un objeto del suelo están en la trayectoria del viento.',
          'Una ráfaga los empuja una casilla a favor del viento.',
          'La planta enraizada permanece en su sitio. Revisa las nuevas posiciones antes de moverte otra vez.',
        ],
      },
      miasma: {
        title: 'Miasma: el veneno persiste tras el golpe',
        steps: [
          'El miasma está activo y el enemigo prepara su ataque.',
          'En este ejemplo controlado, el personaje recibe el golpe a propósito para mostrar cómo se aplica el veneno.',
          'Tras alejarse, el icono de veneno sigue visible y el veneno sigue consumiendo Energía.',
        ],
      },
      lightning: {
        title: 'Tormenta: sal de la casilla marcada',
        steps: [
          'Aparece un aviso de rayo en tu casilla.',
          'Muévete a una casilla vecina despejada antes del siguiente rayo.',
          'El rayo cae en la casilla marcada. Al moverte, has salido de su trayectoria.',
        ],
      },
      explosion: {
        title: 'Seta explosiva: las diagonales también son peligrosas',
        steps: [
          'La seta deja de moverse para dar su último aviso.',
          'Sal por completo de la zona de explosión. Una casilla diagonal junto a la seta sigue dentro.',
          'La seta explota a su alrededor, incluidas las diagonales. Mantén la distancia hasta que termine la explosión.',
        ],
      },
      ice: {
        title: 'Objetos congelados: rompe el hielo y recoge',
        steps: [
          'El hielo cubre un objeto. No puedes recoger la recompensa mientras siga congelado.',
          'Golpea una vez el objeto congelado para romper el hielo.',
          'El objeto queda al descubierto. Pisa su casilla para recogerlo antes de que desaparezca.',
        ],
      },
      spikes: {
        title: 'Pinchos: observa su ciclo',
        steps: [
          'Los pinchos alternan entre estar elevados y retraídos.',
          'Esperar también hace avanzar su fase, aunque no te muevas.',
          'Evita quedarte sobre los pinchos: pueden elevarse después de tu siguiente acción.',
        ],
      },
      fountain: {
        title: 'Fuente: una sola curación',
        steps: [
          'Camina hasta la casilla de la pila, al pie de la fuente.',
          'Recuperas Energía y la fuente queda agotada.',
          'Volver a la fuente no te cura una segunda vez.',
        ],
      },
      mimic: {
        title: 'Cofre mímico: cuidado con la emboscada',
        steps: [
          'Acércate al cofre.',
          'El mímico se revela y golpea de inmediato.',
          'Aléjate y observa el aviso de su siguiente ataque.',
        ],
      },
    },
  },
};
