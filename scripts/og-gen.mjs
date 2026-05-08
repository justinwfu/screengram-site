// One-shot generator for placeholder OG card and favicon set.
// Re-run anytime branding changes: `node scripts/og-gen.mjs`
//
// Output: public/og.png (1200x630), public/favicon.svg, public/favicon-32.png,
// public/apple-touch-icon.png (180x180).

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

const CREAM_BG = '#f0e7d3';
const INK = '#1a140e';
const FADED = '#6e5f48';
const ACCENT = '#a3431a';

// Paper-grain dot overlay used everywhere on-site, scaled per output.
const grain = (w, h) => `
  <defs>
    <pattern id="grain-3" width="3" height="3" patternUnits="userSpaceOnUse">
      <circle cx="0" cy="0" r="0.5" fill="rgba(0,0,0,0.025)" />
    </pattern>
    <pattern id="grain-7" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="translate(1.5,2)">
      <circle cx="0" cy="0" r="0.5" fill="rgba(0,0,0,0.018)" />
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#grain-3)" />
  <rect width="${w}" height="${h}" fill="url(#grain-7)" />
`;

// ── OG card (1200x630) ────────────────────────────────────────────────
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${CREAM_BG}" />
  ${grain(1200, 630)}
  <text x="80" y="120" font-family="'JetBrains Mono', ui-monospace, Menlo, monospace" font-size="22" font-weight="600" letter-spacing="3" fill="${ACCENT}">VOL. 01 / MAY 2026</text>
  <text x="80" y="380" font-family="Newsreader, 'Source Serif 4', Georgia, serif" font-style="italic" font-weight="400" font-size="220" letter-spacing="-9" fill="${INK}">screengram</text>
  <text x="80" y="470" font-family="Newsreader, 'Source Serif 4', Georgia, serif" font-style="italic" font-weight="400" font-size="42" fill="${FADED}">A diary kept by your phone, with the world behind it.</text>
  <text x="80" y="560" font-family="'JetBrains Mono', ui-monospace, Menlo, monospace" font-size="18" font-weight="500" letter-spacing="3" fill="${FADED}">SCREENGRAM.APP</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png({ quality: 90 }).toFile(join(publicDir, 'og.png'));
console.log('✓ wrote public/og.png');

// ── favicon.svg ───────────────────────────────────────────────────────
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${CREAM_BG}" />
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="Newsreader, 'Source Serif 4', Georgia, serif" font-style="italic" font-weight="500" font-size="48" fill="${INK}">s</text>
</svg>`;

await writeFile(join(publicDir, 'favicon.svg'), faviconSvg);
console.log('✓ wrote public/favicon.svg');

// ── favicon-32.png ────────────────────────────────────────────────────
await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(join(publicDir, 'favicon-32.png'));
console.log('✓ wrote public/favicon-32.png');

// ── apple-touch-icon.png (180×180, padded) ────────────────────────────
const touchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${CREAM_BG}" />
  <text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle" font-family="Newsreader, 'Source Serif 4', Georgia, serif" font-style="italic" font-weight="500" font-size="120" fill="${INK}">s</text>
</svg>`;

await sharp(Buffer.from(touchSvg)).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'));
console.log('✓ wrote public/apple-touch-icon.png');

console.log('\nDone.');
