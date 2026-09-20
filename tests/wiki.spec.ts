import { readdir } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { expect, test as base } from '@playwright/test';
import languages from '../src/i18n/locales.json' with { type: 'json' };

const test = base.extend<{ browserHealth: void }>({
  browserHealth: [
    async ({ page, context, baseURL }, use) => {
      const errors: string[] = [];
      const externalRequests: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await context.route('**/*', async (route) => {
        const url = new URL(route.request().url());
        if (url.origin !== new URL(baseURL!).origin) {
          externalRequests.push(url.href);
          await route.abort();
          return;
        }
        await route.continue();
      });
      await use();
      expect(errors, 'Uncaught browser errors').toEqual([]);
      expect(
        externalRequests,
        'The guide must work without external requests',
      ).toEqual([]);
    },
    { auto: true },
  ],
});

test('home links lead to readable articles', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'A little knowledge.',
  );
  await page.getByRole('link', { name: 'Explore the floors' }).click();
  await expect(page).toHaveURL(/\/reference\/floors\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Floors');
  await expect(page.getByRole('table')).toContainText('Gemglow Depths');
  await page
    .getByRole('main')
    .getByRole('link', { name: 'special rooms' })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Special rooms',
  );
});

test('decorative game banners load on the home and floors pages', async ({
  page,
}) => {
  for (const route of ['/', '/reference/floors/']) {
    await page.goto(route);
    const banner = page.locator('.guide-banner');
    await expect(banner).toHaveCount(1);
    await expect(banner).toHaveAttribute('aria-hidden', 'true');
    const image = banner.locator('img');
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute('alt', '');
    const dimensions = await image.evaluate(
      async (element: HTMLImageElement) => {
        await element.decode();
        return {
          actual: [element.naturalWidth, element.naturalHeight],
          declared: [
            Number(element.getAttribute('width')),
            Number(element.getAttribute('height')),
          ],
        };
      },
    );
    expect(dimensions.actual[0]).toBeGreaterThan(0);
    expect(dimensions.actual).toEqual(dimensions.declared);
  }
});

test('generated pages have valid internal links and fragment targets', async ({
  page,
  baseURL,
}) => {
  test.setTimeout(120_000);
  const files = await readdir('dist', { recursive: true });
  const routes = files
    .filter((file) => file === 'index.html' || file.endsWith('/index.html'))
    .map((file) => `/${file.slice(0, -'index.html'.length)}`);
  expect(routes.length).toBeGreaterThanOrEqual(9);

  const pages = new Map<string, { ids: string[]; links: string[] }>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    expect(
      await page.locator('main').innerText(),
      `${route}: unparsed Markdown`,
    ).not.toContain('**');
    const content = await page.evaluate(() => ({
      ids: Array.from(document.querySelectorAll('[id]'), (node) => node.id),
      links: Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href]:not([download])'),
        (node) => node.href,
      ),
    }));
    expect(new Set(content.ids).size, `${route}: duplicate element IDs`).toBe(
      content.ids.length,
    );
    pages.set(route, content);
  }

  for (const [source, content] of pages) {
    for (const href of content.links) {
      const target = new URL(href);
      if (target.origin !== new URL(baseURL!).origin) continue;
      const destination = pages.get(target.pathname);
      expect(
        destination,
        `${source} links to missing page ${href}`,
      ).toBeDefined();
      if (target.hash) {
        expect(
          destination?.ids,
          `${source} links to missing fragment ${href}`,
        ).toContain(decodeURIComponent(target.hash.slice(1)));
      }
    }
  }
});

test('keyboard search finds a relevant article and Escape dismisses it', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('textbox', { name: /search/i }).fill('frostbite');
  await expect(
    dialog.locator('a[href*="/reference/hazards/"]').first(),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('mobile navigation opens an article', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/getting-started/first-run/');
  await page.getByRole('button', { name: /menu/i }).click();
  await page
    .getByRole('link', { name: 'Weather and hazards', exact: true })
    .click();
  await expect(page).toHaveURL(/\/reference\/hazards\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Weather and hazards',
  );
});

for (const width of [360, 1280]) {
  test(`all languages and captures fit a ${width}px viewport`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    test.setTimeout(120_000);
    const routes = Object.keys(languages).flatMap((locale) => {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      return [
        '/',
        '/reference/hazards/',
        '/reference/enemies/',
        '/reference/cells/',
        '/reference/encounters/',
        '/reference/talents/',
        '/reference/equipment/',
      ].map((route) => `${prefix}${route}`);
    });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(
        dimensions.content,
        `${route} horizontal overflow`,
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  });
}

for (const theme of ['light', 'dark']) {
  test(`home and hazards meet automated WCAG A/AA checks in ${theme} mode`, async ({
    page,
  }) => {
    for (const route of [
      '/',
      '/reference/hazards/',
      '/reference/enemies/',
      '/reference/cells/',
      '/reference/encounters/',
      '/reference/talents/',
    ]) {
      await page.goto(route);
      await page.getByRole('combobox', { name: /theme/i }).selectOption(theme);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(result.violations, `${route}, ${theme} theme`).toEqual([]);
    }
  });
}

test.describe('static article access', () => {
  test.use({ javaScriptEnabled: false });

  test('articles and their links work without JavaScript', async ({ page }) => {
    await page.goto('/getting-started/first-run/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Your first run',
    );
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Energy and movement' })
      .click();
    await expect(page).toHaveURL(/\/getting-started\/energy\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Energy and movement',
    );
    await expect(page.getByRole('main')).toContainText('100 base Energy');
  });
});
