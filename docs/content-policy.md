# Content policy

The approved scope is **player-visible MoG V2 Arcade on Abstract**, in English, French, Spanish, Japanese, Korean and Simplified Chinese. The user explicitly requested the complete bestiary, special cells, authentic game recordings and special-room screenshots. Other modes and variants must be checked separately.

## Include

Names and descriptions displayed in the intended game variant, ordinary controls, observable mechanics, floor membership, hazards and grounded counterplay. Runtime code can establish observable behavior even when no tooltip exists. A numeric value can be included when it describes a visible decision, such as movement cost or an attack footprint; never publish hidden probability parameters.

Where the game has no displayed enemy name, use a clear descriptive label and disclose this naming convention on the bestiary page. Retain the English label alongside translations to help readers identify and search for the same creature.

Being present in source code, a translation file, a test fixture or an asset registry is insufficient evidence of current availability. Check the relevant UI, mode and reachable runtime behavior. Record source-only verification honestly; do not label it live verification.

## Exclude

Drop rates, spawn weights, hidden probabilities, reward formulas and budgets, anti-abuse rules, internal service details, personal data, unreleased or disabled features, and unsupported strategy claims. Do not copy whole configuration files, asset directories or localization bundles.

Do not place private source paths, revisions, issue IDs or analysis in article frontmatter, HTML comments, hidden elements, downloadable files, or images. Search indices and direct URLs are public surfaces too. Removing a sidebar entry or setting `pagefind: false` does not make a page private.

## Add or update an article

1. Draft in `.local/`, which is excluded from Git, routes and formatting.
2. Verify the intended mode, availability and displayed wording. Record precise references in the private research notes; retain uncertainty where the game contradicts itself.
3. Rewrite as short player instructions. Include only facts within the approved scope.
4. Move the reviewed prose into `src/content/docs/` with all required metadata. Use a descriptive title, a short description, `visibility: public`, `knowledgeScope: player-visible`, `gameMode: arcade`, an evidence category (`in-game-guide`, `in-game-interface`, `observable-gameplay`, or `editorial`), and an explicit `lastUpdated` date.
5. Add navigation if needed, check links and run `pm run validate`. Inspect the rendered page and its search result.

The schema rejects missing classifications and `draft: true` within the publishable collection. It does **not** review prose. Never mark a page public merely to get a build to pass.

The current request authorizes complete reachable spawn rosters, observable boss behavior, selected game assets and instructional animations. Further confirmation is not required for these local additions. New categories involving hidden economics or unreleased content remain outside scope.

## Media and translations

Copy only individually reviewed game assets used by an article. Keep original-source paths and the extraction inventory in `.local/research/`; the public media catalogue contains only wiki paths and display dimensions. Never export a whole game asset bundle. Local capture tooling may import the original game engine, renderer and room generators inside ignored `.local/`; only reviewed recordings and screenshots enter the site. Describe controlled local scenes as local game examples, without implying a live production session. Provide playback controls and text alternatives. Videos must not autoplay; GIFs are downloadable rather than embedded animated images.

English is the editorial source. Translations must cover all published pages and catalogue IDs; schema/coverage checks should reject missing entries. Use existing in-game terminology where available. A technical completeness check does not replace fluent-speaker review.

## Release boundary

Only `dist/` is a deployable artifact. `docs/` is not a site route, but would still be visible in a public source repository; keep it free of private research. `.local/` must remain ignored and must never be uploaded separately. Review source and build artifacts before publication. Crawler directives and pattern scanners do not provide confidentiality guarantees.
