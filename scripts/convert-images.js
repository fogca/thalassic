/**
 * Convert jpg/png images to webp.
 * Originals are copied to static/images/original/ for backup.
 * Excludes: favicon.png, OGP.png (browser/OGP compatibility).
 */

import sharp from 'sharp';
import { readdirSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const IMAGES_DIR = new URL('../static/images', import.meta.url).pathname;
const ORIGINAL_DIR = join(IMAGES_DIR, 'original');
const EXCLUDE = ['favicon.png', 'OGP.png'];
const QUALITY = 85;

mkdirSync(ORIGINAL_DIR, { recursive: true });

const files = readdirSync(IMAGES_DIR).filter((f) => {
  const ext = extname(f).toLowerCase();
  return (ext === '.jpg' || ext === '.jpeg' || ext === '.png') && !EXCLUDE.includes(f);
});

console.log(`Converting ${files.length} files to webp (quality: ${QUALITY})...\n`);

for (const file of files) {
  const src = join(IMAGES_DIR, file);
  const name = basename(file, extname(file));
  const dest = join(IMAGES_DIR, `${name}.webp`);
  const backup = join(ORIGINAL_DIR, file);

  // Backup original
  copyFileSync(src, backup);

  // Convert to webp
  await sharp(src).webp({ quality: QUALITY }).toFile(dest);

  const srcSize = (await sharp(src).metadata()).size ?? 0;
  console.log(`  ✓ ${file} → ${name}.webp`);
}

console.log(`\nDone. Originals saved to static/images/original/`);
