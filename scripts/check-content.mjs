import { readFile, readdir } from 'node:fs/promises';

const languages = JSON.parse(
  await readFile(new URL('../src/i18n/locales.json', import.meta.url), 'utf8'),
);
const locales = Object.keys(languages).filter((locale) => locale !== 'en');
const kinds = ['enemies', 'cells', 'talents', 'equipment'];
const fields = ['appearance', 'behavior', 'name', 'response', 'warning'];
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const fail = (message) => {
  throw new Error(message);
};
const files = (await readdir('src/content/docs', { recursive: true })).filter(
  (file) => /\.mdx?$/.test(file),
);
const route = (file) => file.replace(/\.mdx?$/, '');
const english = files
  .filter((file) => !locales.includes(file.split('/')[0]))
  .map(route)
  .sort();
const sources = Object.fromEntries(
  await Promise.all(
    kinds.map(async (kind) => [kind, await readJson(`src/data/${kind}.json`)]),
  ),
);
for (const talent of sources.talents) {
  if (!['uncommon', 'rare', 'epic', 'legendary'].includes(talent.rarity))
    fail(`Missing or invalid talent rarity: ${talent.id}`);
}

for (const locale of locales) {
  const pages = files
    .filter((file) => file.startsWith(`${locale}/`))
    .map((file) => route(file.slice(locale.length + 1)))
    .sort();
  if (JSON.stringify(pages) !== JSON.stringify(english))
    fail(`${locale}: translated page routes differ from English`);
  const translated = await readJson(`src/data/translations/${locale}.json`);
  if (Object.keys(translated).sort().join() !== [...kinds].sort().join())
    fail(`${locale}: unexpected or missing catalogue`);
  for (const kind of kinds) {
    const source = sources[kind];
    const entries = translated[kind];
    if (
      Object.keys(entries).sort().join() !==
      source
        .map((entry) => entry.id)
        .sort()
        .join()
    )
      fail(`${locale}/${kind}: translated IDs differ from English`);
    for (const entry of source) {
      const text = entries[entry.id];
      if (Object.keys(text).sort().join() !== fields.join())
        fail(`${locale}/${kind}/${entry.id}: unexpected translated fields`);
      for (const field of fields) {
        if (
          typeof text[field] !== 'string' ||
          Boolean(text[field].trim()) !== Boolean(entry[field].trim())
        )
          fail(`${locale}/${kind}/${entry.id}: missing or extra ${field}`);
      }
    }
  }
}

const media = await readJson('src/data/media.json');
for (const entry of Object.values(sources).flat()) {
  if (!media[entry.id]) fail(`Missing illustration: ${entry.id}`);
}
for (const [id, asset] of Object.entries(media)) {
  if (!/^\/media\/[a-z0-9/-]+\.png$/.test(asset.src))
    fail(`Unexpected media path: ${id}`);
  const bytes = await readFile(`public${asset.src}`);
  if (
    bytes.length < 24 ||
    bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a'
  )
    fail(`Invalid PNG: ${id}`);
  if (
    bytes.readUInt32BE(16) !== asset.width ||
    bytes.readUInt32BE(20) !== asset.height
  )
    fail(`Incorrect image dimensions: ${id}`);
  if (
    ((asset.column ?? 0) + asset.frames) * asset.frameWidth > asset.width ||
    ((asset.row ?? 0) + 1) * asset.frameHeight > asset.height
  )
    fail(`Sprite exceeds image bounds: ${id}`);
}
const captures = await readJson('src/data/captures.json');
for (const [group, entries] of Object.entries(captures)) {
  if (!['clips', 'rooms'].includes(group))
    fail(`Unexpected capture group: ${group}`);
  for (const [id, { width, height, gifWidth, gifHeight }] of Object.entries(
    entries,
  )) {
    if (
      !/^[a-z0-9-]+$/.test(id) ||
      !Number.isInteger(width) ||
      width <= 0 ||
      !Number.isInteger(height) ||
      height <= 0
    )
      fail(`Invalid capture metadata: ${group}/${id}`);
    if (
      group === 'clips' &&
      (!Number.isInteger(gifWidth) ||
        gifWidth <= 0 ||
        !Number.isInteger(gifHeight) ||
        gifHeight <= 0)
    )
      fail(`Invalid GIF dimensions: ${id}`);
    for (const extension of group === 'clips'
      ? ['webp', 'mp4', 'gif']
      : ['webp']) {
      const path = `public/media/${group === 'clips' ? 'gameplay' : 'rooms'}/${id}.${extension}`;
      const bytes = await readFile(path);
      if (bytes.length < 32) fail(`Empty or truncated capture: ${path}`);
      if (
        extension === 'webp' &&
        (bytes.toString('ascii', 0, 4) !== 'RIFF' ||
          bytes.toString('ascii', 8, 12) !== 'WEBP' ||
          bytes.readUInt32LE(4) + 8 !== bytes.length)
      )
        fail(`Invalid WebP: ${path}`);
      if (
        extension === 'mp4' &&
        (bytes.toString('ascii', 4, 8) !== 'ftyp' ||
          !bytes.includes(Buffer.from('moov')) ||
          !bytes.includes(Buffer.from('mdat')))
      )
        fail(`Invalid MP4: ${path}`);
      if (
        extension === 'gif' &&
        (!['GIF87a', 'GIF89a'].includes(bytes.toString('ascii', 0, 6)) ||
          bytes.readUInt16LE(6) !== gifWidth ||
          bytes.readUInt16LE(8) !== gifHeight ||
          bytes.at(-1) !== 0x3b)
      )
        fail(`Invalid GIF or dimensions: ${path}`);
    }
  }
}
console.log(
  `Content checked: ${english.length} pages × ${Object.keys(languages).length} languages, ${Object.values(sources).flat().length} translated catalogue entries, ${Object.keys(media).length} reviewed images, ${Object.keys(captures.clips).length} clips and ${Object.keys(captures.rooms).length} room captures.`,
);
