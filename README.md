# MoG Field Guide

A static player wiki for **MoG V2 Arcade on Abstract**, in English, French, Spanish, Japanese, Korean and Simplified Chinese. It offers local search and runs without a connection to game services.

The guide covers all 10 floors, 22 enemies, 27 terrain/object types, 29 talents and 15 items, plus Energy, weather and special rooms. Selected game artwork illustrates every catalogue entry. Nine videos recorded locally with the original game renderer show lightning, mushroom explosions, frozen drops, spikes, fountains, mimics, Heatwave burns, Gale gusts and Miasma poison. Screenshots show the Shrine, Armory, Sanctum and an Unknown Trainer encounter on an ordinary floor. These controlled examples include translated explanations and downloadable GIFs.

## Develop

Use Node **24.20.0** and pnpm **11.24.0**, declared in `package.json`.

```sh
mise install
mise exec -- pm ci
mise exec -- pm run dev
```

Open <http://localhost:4321>. Without mise, activate the version in `.node-version` first, then run the same `pm` commands. If the local `pm` wrapper is unavailable, use `pnpm install --frozen-lockfile` and `pnpm dev`.

## Validate

```sh
mise exec -- pm exec playwright install chromium
mise exec -- pm run validate
```

Validation runs formatting, Astro/TypeScript checks, translation and media coverage, the static build, output checks and browser tests. Browser tests use the **built site**, where Pagefind search is available; search is not available in the Astro development server. Run `pm run build` then `pm run preview` to try it locally.

GitHub Actions runs the same checks. Vercel builds the static site separately from the connected GitHub repository.

## Structure

| Path                       | Purpose                                                                        |
| -------------------------- | ------------------------------------------------------------------------------ |
| `src/content/docs/`        | Public-ready Markdown articles; everything here can become a page              |
| `src/content.config.ts`    | Required publication metadata and validated content schema                     |
| `src/components/`          | Home, catalogues, videos and screenshots; Starlight supplies navigation/search |
| `src/styles/custom.css`    | Local typography, colors and responsive styles                                 |
| `docs/`                    | Maintainer decisions and editorial rules; excluded from site routes            |
| `.local/`                  | Ignored, private research and draft workspace; never publish                   |
| `scripts/check-output.mjs` | Build output tripwires                                                         |
| `tests/`                   | Navigation, search, accessibility and responsive checks                        |

See [the stack decision](docs/architecture.md) and [the publishing policy](docs/content-policy.md) before adding content. Private research and recording tools stay in ignored `.local/` and do not travel with a public checkout.

## Publish with GitHub and Vercel

The wiki is hosted at [mog-wiki.vercel.app](https://mog-wiki.vercel.app), with public source in [slkzgm/mog-wiki](https://github.com/slkzgm/mog-wiki).

The Git integration uses `main` for production and pull requests for preview deployments. Hosting serves **only `dist/`**. The public repository also exposes tracked maintainer files, so review both source and build artifacts before publication. Never upload `.local/` or private recording tools.

| Setting                      | Value                              |
| ---------------------------- | ---------------------------------- |
| Vercel Node version          | `24.x`                             |
| Local Node version           | `24.20.0`                          |
| Package manager              | `pnpm@11.24.0` from `package.json` |
| Project environment variable | `ENABLE_EXPERIMENTAL_COREPACK=1`   |
| Install command              | `pnpm install --frozen-lockfile`   |
| Build command                | `pnpm run build`                   |
| Output directory             | `dist`                             |

The install command, build command and output directory are declared in `vercel.json`. Astro's `site` URL is `https://mog-wiki.vercel.app`; Starlight supplies the sitemap integration. Production pages allow indexing. Builds with `VERCEL_ENV=preview` retain `noindex, nofollow` metadata. Crawler directives **are not access control**; confidential previews require hosting-provider protection.

For an authorized release, run validation, review the pull request and its preview, then merge to `main`. Confirm that Vercel built the intended commit and check the production pages, language links, search and media. GitHub CI passing does not establish that the Vercel deployment succeeded. Future publication and deployment actions require authorization; local edits alone do not grant it.

Review gameplay claims against the available evidence and translations with fluent speakers. Source review and controlled local recordings do not establish current live-game behavior.

Do not add secrets or game credentials. The wiki has no runtime API, wallet, authentication, analytics, external fonts or database. No automatic import or synchronization with the game repository is configured.

## Languages and media

English lives at the root; translated routes use `/fr/`, `/es/`, `/ja/`, `/ko/` and `/zh-cn/`. Starlight supplies its language selector and separate Pagefind indexes. `src/i18n/` contains component copy. Every article and catalogue entry must exist in all six languages; the build rejects partial coverage instead of silently publishing English fallback pages.

Edit the curated records in `src/data/`, then update the matching five prose fields in `src/data/translations/`. Stable IDs, floor membership, categories and fixed talent rarities are shared from English and cannot be changed by translations. Keep in-game labels where they exist. Ordinary creature names are descriptive editorial labels.

`public/media/` contains selected artwork, local game recordings and room screenshots. The public media catalogues record display dimensions and wiki asset paths. Do not add complete game asset directories. Enemies, talents, items and special cells offer Grid and List views. Grid opens one entry beside its icons; List shows every matching entry. The choice is remembered across catalogue pages and languages when browser storage is available. Search, filters and the selected entry survive a view change. Talent frames use the four in-game rarity styles, with a rarity filter and written labels. Direct entry links, browser Back and keyboard navigation work; without JavaScript, every entry remains readable in a complete list. The home and floors pages use two optimized stills from existing game artwork.

Static sprite frames render by default; sprite playback is opt-in and respects reduced motion. Videos use native playback controls, a still poster and no autoplay. Their text explanations remain readable without JavaScript, and GIFs are available as downloads.

Recordings use the original game renderer and animations in controlled local situations. Shop stock and prices in screenshots are examples. Local recordings support the documented behavior; they do not establish that the entire current live game has been checked.
