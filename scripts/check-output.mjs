import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const files = await readdir(root, { recursive: true, withFileTypes: true });
const failures = [];
const isPreview = process.env.VERCEL_ENV === 'preview';
let htmlCount = 0;

// These tripwires catch accidental source copies, not semantic disclosure.
const privateMarkers = [
  /(?:\/home\/|\/Users\/)[\w.-]+\//,
  /apps\/(?:och|mog|colyseus)\/(?:src|messages)\//,
  /(?:DATABASE_URL|PRIVATE_KEY|AUTH_SECRET)\s*[:=]/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /MOG_WIKI_PRIVATE_CANARY/,
];

for (const entry of files) {
  if (!entry.isFile()) continue;
  const path = join(entry.parentPath, entry.name);
  const name = relative(root.pathname, path);
  if (/\.map$|(?:^|\/)\.env|(?:^|\/)(?:\.local|research|drafts)\//.test(name)) {
    failures.push(`${name}: private file or source map in build`);
  }
  if (!/\.(?:html|css|js|json|svg|txt|xml)$/.test(name)) continue;
  const content = await readFile(path, 'utf8');
  if (privateMarkers.some((pattern) => pattern.test(content))) {
    failures.push(`${name}: private marker in build`);
  }
  if (!name.endsWith('.html')) continue;
  htmlCount++;
  const noindex = /<meta\s+name="robots"\s+content="noindex, nofollow"/.test(
    content,
  );
  if (isPreview && !noindex) {
    failures.push(`${name}: preview indexing protection missing`);
  }
  if (!isPreview && noindex && !name.endsWith('404.html')) {
    failures.push(`${name}: public page unexpectedly blocks indexing`);
  }
  const remoteResources = [
    ...content.matchAll(/<(?:script|link)\b[^>]*>/g),
  ].some(
    ([tag]) =>
      /(?:src|href)="https?:\/\//.test(tag) &&
      (tag.startsWith('<script') ||
        /\brel="(?:stylesheet|preload|modulepreload)"/.test(tag)),
  );
  if (remoteResources) {
    failures.push(`${name}: unexpected third-party script or stylesheet`);
  }
}

if (htmlCount === 0) failures.push('No HTML pages generated');
if (failures.length) throw new Error(failures.join('\n'));
console.log(
  `Checked ${htmlCount} HTML pages: no private markers, source maps or remote scripts.`,
);
