import { test, expect } from '@playwright/test';
import captures from '../src/data/captures.json' with { type: 'json' };
import languages from '../src/i18n/locales.json' with { type: 'json' };
import { demoText } from '../src/i18n/demos';
import { roomText } from '../src/i18n/rooms';
import type { Locale } from '../src/i18n/ui';
import talents from '../src/data/talents.json' with { type: 'json' };
import { rarityText } from '../src/i18n/rarities';

const catalogues = [
  ['enemies', 22, 'small-slime', 'chest-mimic'],
  ['cells', 27, 'spikes', 'fountains'],
  ['talents', 29, 'apex-hunter', 'glass-cannon'],
  ['equipment', 15, 'single-shot', 'pogo-stick'],
] as const;

test('bestiary filters by floor, searches and restores a linked enemy', async ({
  page,
}) => {
  await page.goto('/reference/enemies/?floor=10');
  const visible = page.locator('[data-card]:visible');
  const detail = page.locator('[data-entry]:visible');
  await expect(page.locator('wiki-catalogue')).toHaveAttribute(
    'data-enhanced',
    'true',
  );
  await expect(visible).toHaveCount(1);
  await expect(visible).toHaveAttribute('aria-label', 'Sir Jackalot');
  await expect(detail).toHaveCount(1);
  await expect(detail).toContainText('Sir Jackalot');
  const view = page.getByRole('group', { name: 'Catalogue view' });
  await view.getByRole('button', { name: 'List', exact: true }).click();
  await expect(detail).toHaveCount(1);
  await expect(detail).toContainText('Sir Jackalot');
  await expect(
    page.getByRole('combobox', { name: 'Filter by floor' }),
  ).toHaveValue('10');
  await view.getByRole('button', { name: 'Grid', exact: true }).click();
  await page
    .getByRole('combobox', { name: 'Filter by floor' })
    .selectOption('');
  await expect(visible).toHaveCount(22);
  await page.getByRole('searchbox', { name: 'Search enemies' }).fill('MIMIC');
  await expect(visible).toHaveCount(2);
  await page.evaluate(() => {
    location.hash = 'small-slime';
  });
  await expect(page.locator('#small-slime')).toBeVisible();
  await expect(detail).toHaveCount(1);
  await expect(
    page.locator('[data-card][aria-current="true"]'),
  ).toHaveAttribute('href', '#small-slime');
  await expect(visible).toHaveCount(22);
  await page
    .getByRole('searchbox', { name: 'Search enemies' })
    .fill('no-such-enemy');
  await expect(page.getByText('No matches found')).toBeVisible();
  await expect(visible).toHaveCount(0);
  await expect(detail).toHaveCount(0);
});

test('cell filters identify hazards and every catalogue image loads', async ({
  page,
}) => {
  for (const [kind, count] of catalogues) {
    await page.goto(`/reference/${kind}/`);
    await expect(page.locator('wiki-catalogue')).toHaveAttribute(
      'data-layout',
      'grid',
    );
    await expect(page.locator('[data-card]:visible')).toHaveCount(count);
    await expect(page.locator('[data-entry]:visible')).toHaveCount(1);
    await expect(page.locator('[data-entry]')).toHaveCount(count);
    await page.locator('[data-entry]:visible').first().scrollIntoViewIfNeeded();
    const broken = await page
      .locator('wiki-catalogue img')
      .evaluateAll(async (images) => {
        for (const image of images)
          (image as HTMLImageElement).loading = 'eager';
        await Promise.all(
          images.map((image) => (image as HTMLImageElement).decode()),
        );
        return images.filter(
          (image) => !(image as HTMLImageElement).naturalWidth,
        ).length;
      });
    expect(broken).toBe(0);
  }
  await page.goto('/reference/cells/');
  await page
    .getByRole('group', { name: 'Catalogue view' })
    .getByRole('button', { name: 'List', exact: true })
    .click();
  await page
    .getByRole('combobox', { name: 'Filter by category' })
    .selectOption('hazard');
  await expect(page.locator('#spikes')).toBeVisible();
  await expect(page.locator('#fountains')).not.toBeVisible();
});

for (const [kind, count, first, second] of catalogues) {
  test(`${kind} icon navigation supports links, keyboard, focus and browser Back`, async ({
    page,
  }) => {
    await page.goto(`/reference/${kind}/#${first}`);
    const catalogue = page.locator(`wiki-catalogue[data-kind="${kind}"]`);
    const firstCard = catalogue.locator(`[data-card][href="#${first}"]`);
    const secondCard = catalogue.locator(`[data-card][href="#${second}"]`);
    await expect(catalogue.locator('[data-entry]:visible')).toHaveCount(1);
    await expect(firstCard).toHaveAttribute('aria-current', 'true');
    await expect(page.locator(`#${first}`)).toBeVisible();
    await secondCard.click();
    await expect(page).toHaveURL(new RegExp(`#${second}$`));
    await expect(secondCard).toHaveAttribute('aria-current', 'true');
    await expect(page.locator(`#${second}`)).toBeFocused();
    await expect(page.locator(`#${first}`)).not.toBeVisible();
    await catalogue.locator('[data-back-to-grid]:visible').click();
    await expect(secondCard).toBeFocused();
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`#${first}$`));
    await expect(firstCard).toHaveAttribute('aria-current', 'true');
    await expect(page.locator(`#${first}`)).toBeVisible();
    await secondCard.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator(`#${second}`)).toBeFocused();
    await expect(catalogue.locator('[data-entry]:visible')).toHaveCount(1);
    await expect(
      catalogue.locator('[data-card][aria-current="true"]'),
    ).toHaveCount(1);
    const view = page.getByRole('group', { name: 'Catalogue view' });
    const grid = view.getByRole('button', { name: 'Grid', exact: true });
    const list = view.getByRole('button', { name: 'List', exact: true });
    await list.click();
    await expect(catalogue).toHaveAttribute('data-layout', 'list');
    await expect(list).toHaveAttribute('aria-pressed', 'true');
    await expect(grid).toHaveAttribute('aria-pressed', 'false');
    await expect(catalogue.locator('[data-entry]:visible')).toHaveCount(count);
    await expect(catalogue.locator('[data-card]:visible')).toHaveCount(0);
    await expect(catalogue.locator('[data-back-to-grid]:visible')).toHaveCount(
      0,
    );
    await expect(page).toHaveURL(new RegExp(`#${second}$`));
    await grid.click();
    await expect(catalogue).toHaveAttribute('data-layout', 'grid');
    await expect(grid).toHaveAttribute('aria-pressed', 'true');
    await expect(list).toHaveAttribute('aria-pressed', 'false');
    await expect(catalogue.locator('[data-entry]:visible')).toHaveCount(1);
    await expect(page.locator(`#${second}`)).toBeVisible();
    await expect(secondCard).toHaveAttribute('aria-current', 'true');
    await expect(page).toHaveURL(new RegExp(`#${second}$`));
  });
}

test('catalogue layout persists across pages, languages and reloads', async ({
  page,
}) => {
  await page.goto('/reference/cells/');
  await page
    .getByRole('group', { name: 'Catalogue view' })
    .getByRole('button', { name: 'List', exact: true })
    .click();
  await page.goto('/fr/reference/equipment/');
  const view = page.getByRole('group', { name: 'Affichage du catalogue' });
  await expect(
    view.getByRole('button', { name: 'Liste', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-entry]:visible')).toHaveCount(15);
  await view.getByRole('button', { name: 'Grille', exact: true }).click();
  await page.goto('/reference/talents/');
  await page.reload();
  await expect(page.locator('wiki-catalogue')).toHaveAttribute(
    'data-layout',
    'grid',
  );
  await expect(page.locator('[data-card]:visible')).toHaveCount(29);
  await expect(page.locator('[data-entry]:visible')).toHaveCount(1);
});

test('switching layout preserves combined talent filters and the selected link', async ({
  page,
}) => {
  await page.goto('/reference/talents/');
  const search = page.getByRole('searchbox', { name: 'Search this catalogue' });
  const category = page.getByRole('combobox', { name: 'Filter by category' });
  const rarity = page.locator('select[name="catalogue-rarity"]');
  await search.fill('a');
  await category.selectOption('damage');
  await rarity.selectOption('legendary');
  await expect(page.locator('[data-card]:visible')).toHaveCount(2);
  await page.locator('[data-card][href="#glass-cannon"]').click();
  const view = page.getByRole('group', { name: 'Catalogue view' });
  await view.getByRole('button', { name: 'List', exact: true }).click();
  await expect(page.locator('[data-entry]:visible')).toHaveCount(2);
  await expect(page.locator('#apex-hunter')).toBeVisible();
  await expect(page.locator('#glass-cannon')).toBeVisible();
  await expect(page).toHaveURL(/#glass-cannon$/);
  await view.getByRole('button', { name: 'Grid', exact: true }).click();
  await expect(search).toHaveValue('a');
  await expect(category).toHaveValue('damage');
  await expect(rarity).toHaveValue('legendary');
  await expect(page.locator('[data-card]:visible')).toHaveCount(2);
  await expect(page.locator('[data-entry]:visible')).toHaveCount(1);
  await expect(page.locator('#glass-cannon')).toBeVisible();
  await expect(page).toHaveURL(/#glass-cannon$/);
});

test('layout controls remain usable when preference storage is blocked', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getItem = Storage.prototype.getItem;
    const setItem = Storage.prototype.setItem;
    Storage.prototype.getItem = function (key) {
      if (key === 'mog-wiki:catalogue-layout')
        throw new DOMException(
          'Storage blocked for this test',
          'SecurityError',
        );
      return getItem.call(this, key);
    };
    Storage.prototype.setItem = function (key, value) {
      if (key === 'mog-wiki:catalogue-layout')
        throw new DOMException(
          'Storage blocked for this test',
          'SecurityError',
        );
      setItem.call(this, key, value);
    };
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/reference/equipment/');
  const catalogue = page.locator('wiki-catalogue');
  const view = page.getByRole('group', { name: 'Catalogue view' });
  await expect(catalogue).toHaveAttribute('data-layout', 'grid');
  await view.getByRole('button', { name: 'List', exact: true }).click();
  await expect(page.locator('[data-entry]:visible')).toHaveCount(15);
  await view.getByRole('button', { name: 'Grid', exact: true }).click();
  await page.locator('[data-card][href="#pogo-stick"]').click();
  await expect(page.locator('#pogo-stick')).toBeFocused();
  await expect(page.locator('[data-entry]:visible')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('a fresh bestiary hash opens the requested enemy despite a conflicting floor filter', async ({
  page,
}) => {
  await page.goto('/reference/enemies/?floor=10#small-slime');
  await expect(page.locator('#small-slime')).toBeVisible();
  await expect(
    page.getByRole('combobox', { name: 'Filter by floor' }),
  ).toHaveValue('');
  await expect(page.locator('[data-card]:visible')).toHaveCount(22);
  await expect(page.locator('[data-entry]:visible')).toHaveCount(1);
});

test('French talent rarity filters keep distinct, uniformly sized icon frames', async ({
  page,
}) => {
  await page.goto('/fr/reference/talents/');
  const rarity = page.locator('select[name="catalogue-rarity"]');
  await expect(rarity).toHaveAccessibleName(/rareté/i);
  const frames = await page
    .locator('[data-card] [data-rarity]')
    .evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          rarity: (element as HTMLElement).dataset.rarity,
          background: getComputedStyle(element).backgroundImage,
        };
      }),
    );
  expect(frames).toHaveLength(talents.length);
  expect(
    new Set(frames.map(({ width, height }) => `${width}x${height}`)).size,
  ).toBe(1);
  expect(frames[0].width).toBeGreaterThan(0);
  expect(frames[0].width).toBe(frames[0].height);
  expect(new Set(frames.map(({ background }) => background)).size).toBe(4);
  for (const [value, label] of Object.entries(rarityText.fr)) {
    await expect(rarity.locator(`option[value="${value}"]`)).toHaveText(label);
    await rarity.selectOption(value);
    const cards = page.locator('[data-card]:visible');
    await expect(cards).toHaveCount(
      talents.filter((talent) => talent.rarity === value).length,
    );
    expect(
      await cards.evaluateAll(
        (elements, selected) =>
          elements.every(
            (element) => element.getAttribute('data-rarity') === selected,
          ),
        value,
      ),
    ).toBe(true);
    await expect(page.locator('[data-entry]:visible')).toHaveCount(1);
  }
  await rarity.selectOption('');
  await expect(page.locator('[data-card]:visible')).toHaveCount(talents.length);
});

test('icon details stay beside the grid on desktop and below it on mobile', async ({
  page,
}) => {
  for (const width of [1280, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/fr/reference/talents/#glass-cannon');
    const detail = page.locator('[data-entry]:visible');
    await expect(detail).toHaveCount(1);
    const grid = await page
      .locator('[data-card]:visible')
      .evaluateAll((elements) => ({
        right: Math.max(
          ...elements.map((element) => element.getBoundingClientRect().right),
        ),
        bottom: Math.max(
          ...elements.map((element) => element.getBoundingClientRect().bottom),
        ),
      }));
    const bounds = await detail.boundingBox();
    expect(bounds).not.toBeNull();
    if (width === 360) expect(bounds!.y).toBeGreaterThanOrEqual(grid.bottom);
    else expect(bounds!.x).toBeGreaterThanOrEqual(grid.right);
    await page.locator('[data-back-to-grid]:visible').click();
    await expect(
      page.locator('[data-card][href="#glass-cannon"]'),
    ).toBeFocused();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
    await page
      .getByRole('group', { name: 'Affichage du catalogue' })
      .getByRole('button', { name: 'Liste', exact: true })
      .click();
    await expect(page.locator('[data-entry]:visible')).toHaveCount(29);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
    await page
      .getByRole('group', { name: 'Affichage du catalogue' })
      .getByRole('button', { name: 'Grille', exact: true })
      .click();
  }
});

test('sprite playback is opt-in and reduced motion prevents animation', async ({
  page,
}) => {
  await page.goto('/reference/enemies/#small-slime');
  const sprite = page
    .locator('#small-slime')
    .locator('xpath=ancestor::article')
    .locator('img');
  await expect(sprite).toHaveCSS('animation-name', 'none');
  await page
    .getByRole('button', { name: 'Play animation', exact: true })
    .click();
  await expect(sprite).not.toHaveCSS('animation-name', 'none');
  await page
    .getByRole('button', { name: 'Pause animation', exact: true })
    .click();
  await expect(sprite).toHaveCSS('animation-name', 'none');
  await page
    .getByRole('button', { name: 'Play animation', exact: true })
    .click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.animation-toggle')).not.toBeVisible();
  await expect(sprite).toHaveCSS('animation-name', 'none');
});

const clipRoutes = {
  hazards: ['lightning', 'ice', 'heatwave', 'gale', 'miasma'],
  enemies: ['explosion', 'mimic'],
  cells: ['spikes', 'fountain'],
} as const;

for (const locale of Object.keys(languages) as Locale[]) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  test(`${locale} has native game clips with translated text and downloadable GIFs`, async ({
    page,
    request,
  }) => {
    const seen: string[] = [];
    for (const [route, kinds] of Object.entries(clipRoutes)) {
      await page.goto(`${prefix}/reference/${route}/`);
      for (const kind of kinds) {
        seen.push(kind);
        const clip = page.locator(`figure[data-clip="${kind}"]`);
        await expect(clip).toBeVisible();
        await expect(clip.getByRole('heading')).toHaveText(
          demoText[locale].demos[kind].title,
        );
        if (locale !== 'en')
          expect(demoText[locale].demos[kind].title).not.toBe(
            demoText.en.demos[kind].title,
          );
        await expect(clip.locator('figcaption ol li')).toHaveText(
          demoText[locale].demos[kind].steps,
        );
        await expect(clip.locator('figcaption')).toContainText(
          demoText[locale].note,
        );
        const video = clip.locator('video');
        await expect(video).toHaveAttribute('controls', '');
        await expect(video).toHaveAttribute('preload', 'none');
        await expect(video).not.toHaveAttribute('autoplay');
        await expect(clip.locator('img[src$=".gif"]')).toHaveCount(0);
        await expect(video).toHaveAttribute(
          'poster',
          `/media/gameplay/${kind}.webp`,
        );
        await expect(video.locator('source')).toHaveAttribute(
          'src',
          `/media/gameplay/${kind}.mp4`,
        );
        await expect(clip.locator('figcaption a[download]')).toHaveText(
          demoText[locale].gif,
        );
        await expect(clip.locator('figcaption a[download]')).toHaveAttribute(
          'href',
          `/media/gameplay/${kind}.gif`,
        );
        expect(
          await video.evaluate((element: HTMLVideoElement) => element.paused),
        ).toBe(true);
        if (locale === 'en') {
          await video.scrollIntoViewIfNeeded();
          await video.evaluate((element: HTMLVideoElement) => element.play());
          await expect
            .poll(() =>
              video.evaluate(
                (element: HTMLVideoElement) => element.currentTime,
              ),
            )
            .toBeGreaterThan(0.1);
          const dimensions = await video.evaluate(
            (element: HTMLVideoElement) => {
              element.pause();
              return { width: element.videoWidth, height: element.videoHeight };
            },
          );
          expect(dimensions).toEqual({
            width: captures.clips[kind].width,
            height: captures.clips[kind].height,
          });
          const poster = await page.evaluate(async (src) => {
            const image = new Image();
            image.src = src;
            await image.decode();
            return { width: image.naturalWidth, height: image.naturalHeight };
          }, `/media/gameplay/${kind}.webp`);
          expect(poster).toEqual({
            width: captures.clips[kind].width,
            height: captures.clips[kind].height,
          });
          const response = await request.get(`/media/gameplay/${kind}.gif`);
          expect(response.status()).toBe(200);
          expect(response.headers()['content-type']).toContain('image/gif');
          expect((await response.body()).subarray(0, 6).toString()).toMatch(
            /^GIF8[79]a$/,
          );
        }
      }
    }
    expect(seen.sort()).toEqual(Object.keys(captures.clips).sort());
  });

  test(`${locale} special rooms have decoded images and translated alternatives`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/reference/encounters/`);
    await expect(page.locator('figure[data-room]')).toHaveCount(
      Object.keys(captures.rooms).length,
    );
    for (const room of Object.keys(
      captures.rooms,
    ) as (keyof typeof captures.rooms)[]) {
      const figure = page.locator(`figure[data-room="${room}"]`);
      const image = figure.locator('img');
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('loading', 'lazy');
      await expect(image).toHaveAttribute('src', `/media/rooms/${room}.webp`);
      await expect(image).toHaveAttribute('alt', roomText[locale].alt[room]);
      await expect(figure.locator('figcaption')).toContainText(
        roomText[locale][room],
      );
      await expect(figure.locator('figcaption')).toContainText(
        room === 'unknown-trainer'
          ? roomText[locale].trainerNote
          : roomText[locale].note,
      );
      if (locale !== 'en') {
        expect(roomText[locale][room]).not.toBe(roomText.en[room]);
        expect(roomText[locale].alt[room]).not.toBe(roomText.en.alt[room]);
      }
      const dimensions = await image.evaluate(
        async (element: HTMLImageElement) => {
          await element.decode();
          return { width: element.naturalWidth, height: element.naturalHeight };
        },
      );
      expect(dimensions).toEqual(captures.rooms[room]);
    }
  });
}

for (const [locale, query] of [
  ['fr', 'fontaine'],
  ['es', 'fuente'],
  ['ja', '泉'],
  ['ko', '분수'],
  ['zh-cn', '喷泉'],
] as const) {
  test(`${locale} retains article when switching language and searches local content`, async ({
    page,
  }) => {
    await page.goto('/reference/cells/');
    await page
      .locator('starlight-lang-select select:visible')
      .selectOption(`/${locale}/reference/cells/`);
    await expect(page).toHaveURL(new RegExp(`/${locale}/reference/cells/$`));
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      locale === 'zh-cn' ? 'zh-CN' : locale,
    );
    await expect(page.locator('[data-entry]')).toHaveCount(27);
    await expect(page.locator('#fountains')).not.toHaveText('Fountains');
    await page.keyboard.press('Control+k');
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('textbox').fill(query);
    await expect(
      dialog.locator(`a[href*="/${locale}/reference/cells/"]`).first(),
    ).toBeVisible();
    await expect(dialog.locator('a[href^="/reference/"]')).toHaveCount(0);
  });
}

test.describe('progressive enhancement', () => {
  test.use({ javaScriptEnabled: false });
  test('all catalogues, clips and room captions remain readable without JavaScript', async ({
    page,
  }) => {
    await page.goto('/reference/enemies/');
    await expect(page.locator('[data-entry]:visible')).toHaveCount(22);
    await expect(page.locator('figure[data-clip]:visible')).toHaveCount(2);
    await expect(
      page.locator('figure[data-clip] figcaption li:visible'),
    ).toHaveCount(6);
    await expect(page.locator('figure[data-clip] video[controls]')).toHaveCount(
      2,
    );
    await expect(page.locator('.catalogue-controls')).not.toBeVisible();
    for (const [kind, count] of catalogues) {
      await page.goto(`/reference/${kind}/`);
      await expect(page.locator('[data-entry]:visible')).toHaveCount(count);
      await expect(page.locator('.catalogue-controls')).not.toBeVisible();
      await expect(page.locator('[data-card]:visible')).toHaveCount(0);
      await expect(page.locator('[data-back-to-grid]:visible')).toHaveCount(0);
      await expect(
        page.getByRole('group', { name: 'Catalogue view' }),
      ).not.toBeVisible();
    }
    await page.goto('/reference/encounters/');
    await expect(
      page.locator('figure[data-room] figcaption:visible'),
    ).toHaveCount(Object.keys(captures.rooms).length);
  });
});
