# Stack decision

Decision date: 2026-09-20.

We need a compact, readable player reference that is easy to maintain and cheap to serve. Content changes through reviewed Markdown edits. There is no user account, live game data, or collaborative editing requirement.

| Option                  | Fit for this wiki                                                                             | Decision                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Astro + Starlight       | Static HTML with documentation navigation, accessible UI, themes and Pagefind search included | Selected                                                                   |
| Custom Astro + Pagefind | Same static foundation, with full control over page structure                                 | More navigation and accessibility code to maintain for this first edition  |
| VitePress               | Mature Markdown documentation with Vue-powered navigation                                     | Good alternative; its client SPA is unnecessary for this content-only site |
| Next.js or a hosted CMS | Useful if authenticated editing or dynamic game data becomes necessary                        | Neither is a current requirement                                           |

Starlight supplies the documentation shell. Two small overrides provide the brand and home page. Plain CSS and system fonts keep the build free of a CSS framework, custom React/Vue runtime and external font requests. Content and navigation work without JavaScript; search and the responsive menu use Starlight's client code.

The content schema requires a public classification, a player-visible scope, an evidence category and an explicit review date. Drafts and source research stay outside the content tree. This is editorial curation, not extraction from the game source.

## Validation and limits

- Astro validates schema and component types.
- Build output checks catch local paths, selected secret markers, unexpected external scripts and source maps.
- Browser tests exercise generated pages, internal links, local search, mobile layout and automated accessibility checks.
- CI repeats local validation with a locked installation.

Automated checks do not decide whether a game mechanic is appropriate to disclose. Human editorial review remains necessary. An accessibility scan also does not replace keyboard testing or assistive-technology testing.

## Sources considered

- [Astro rendering](https://docs.astro.build/en/guides/on-demand-rendering/): static rendering is the default.
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/): build-time content loading and schema validation.
- [Starlight](https://starlight.astro.build/): documentation UI built on Astro.
- [Starlight search](https://starlight.astro.build/guides/site-search/): built-in static Pagefind index.
- [VitePress architecture](https://vitepress.dev/guide/what-is-vitepress): static first load followed by Vue SPA navigation.

Dependencies are pinned in `package.json` and `pnpm-lock.yaml`. Node is pinned in `.node-version` and `mise.toml`. Only esbuild's required dependency installation script is allowed in `pnpm-workspace.yaml`.

## Publication configuration

The public repository is [onchain-heroes/mog-wiki](https://github.com/onchain-heroes/mog-wiki), with [wiki.playmog.xyz](https://wiki.playmog.xyz) as the production address on the Onchain Heroes Vercel team. The GitHub-to-Vercel workflow assigns `main` to production and pull requests to preview deployments.

Vercel serves the static `dist/` output. `vercel.json` sets a locked `pnpm install --frozen-lockfile` installation and `pnpm run build`; no server adapter or runtime backend is required. The host uses Node `24.x`, while local development pins `24.20.0`. The project's `ENABLE_EXPERIMENTAL_COREPACK=1` setting selects pnpm `11.24.0` through the `packageManager` declaration.

Astro's `site` is fixed to `https://wiki.playmog.xyz`. Starlight's integrated sitemap uses this canonical origin. Production is indexable; `VERCEL_ENV=preview` builds retain `noindex, nofollow` metadata. These directives do not protect confidential content. Tracked source and maintainer documents are public independently of whether they become site routes; private evidence and capture tooling remain ignored.

For future releases, obtain publication authorization, run the full validation suite, review the pull request preview, and merge to `main`. Check the deployed commit and the hosted pages, search, language navigation and media after Vercel reports success. Local validation, GitHub CI and deployment verification are separate checks. Neither deployment nor local recordings prove current live-game behavior.

## Content expansion and localization

Starlight's native i18n handles six languages: English at the root, and French, Spanish, Japanese, Korean and Simplified Chinese on prefixed routes. Translation is editorial, with no translation service or additional runtime locale dependency. Every locale has all pages and all catalogue prose; coverage is checked before building. Structural fields stay in a single curated catalogue, so translations cannot drift in floor membership or item identity.

Astro components render catalogues, sprite frames, floor rosters, recorded video examples and room screenshots as complete HTML. Client scripts add catalogue filters and opt-in sprite playback without a frontend framework. All four catalogues—enemies, talents, items and special cells—offer Grid and List views over the same records. Grid shows an icon navigator and one selected detail panel; List shows all matching entries. The underlying article text is rendered once and remains available as a complete list without JavaScript. The layout preference is shared across pages and languages through browser storage; blocked storage does not prevent switching views. Switching preserves search, filters and selection. Hash links select entries and work with browser history. Talent rarity is shared structural metadata, with labels in every language and frames matching the game UI. Videos use native browser controls. Search remains Pagefind. Site builds consume curated content and approved media without connecting to game services.

Every catalogue entry has selected artwork, with reviewed frames displayed from its asset. Sprite playback is opt-in, with reduced-motion handling. Nine demonstrations are recorded locally using the original game renderer and animations, alongside screenshots of three special rooms and the Unknown Trainer on an ordinary floor. Controlled situations make the behavior easier to follow; displayed shop stock and prices are examples.

Videos have native controls, still posters, no autoplay and no preload. Readers can also download GIFs. Explanations and screenshot captions are translated into all six languages and remain available without JavaScript. The public capture catalogue contains dimensions, while private recording tools and source provenance remain in ignored `.local/`. Text remains the primary explanation.

The maintainer must review semantic accuracy and language quality. Coverage checks prove matching routes/IDs/fields and valid media metadata. Local recordings demonstrate the selected scenarios; neither they nor automated checks prove a complete live-game playthrough or fluent translation.

The shell uses neutral graphite and white surfaces in dark and light themes. Color comes from game art and rarity frames. Two small decorative WebP banners on the home and floor overview add game atmosphere without placing text over imagery or loading animated backgrounds.
