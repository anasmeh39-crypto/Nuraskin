/**
 * Compress all PNG/JPG images in /public/images to WebP.
 * Originals are kept as .png/.jpg — Next.js <Image> serves WebP automatically,
 * but having smaller originals also helps when served through raw <img> tags.
 *
 * Run: node scripts/compress-images.mjs
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, "../public/images");

const QUALITY = { webp: 80, avif: 65, jpeg: 82, png: 8 };
const SUPPORTED = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (SUPPORTED.has(extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

async function compress(file) {
  const ext = extname(file).toLowerCase();
  const webpPath = file.replace(/\.(png|jpe?g)$/i, ".webp");

  const before = (await stat(file)).size;

  // 1. Overwrite original with compressed version (reduces size for raw <img> tags)
  if (ext === ".png") {
    await sharp(file)
      .png({ compressionLevel: QUALITY.png, adaptiveFiltering: true })
      .toFile(file + ".tmp");
  } else {
    await sharp(file)
      .jpeg({ quality: QUALITY.jpeg, mozjpeg: true })
      .toFile(file + ".tmp");
  }

  // Rename tmp → original only if smaller
  const tmpStat = await stat(file + ".tmp");
  if (tmpStat.size < before) {
    const { rename } = await import("fs/promises");
    await rename(file + ".tmp", file);
  } else {
    const { unlink } = await import("fs/promises");
    await unlink(file + ".tmp");
  }

  // 2. Create .webp companion (Next.js Image will serve this automatically)
  await sharp(file)
    .webp({ quality: QUALITY.webp, effort: 4 })
    .toFile(webpPath);

  const after = (await stat(file)).size;
  const webpSize = (await stat(webpPath)).size;
  const saved = Math.round((1 - after / before) * 100);
  const webpSaved = Math.round((1 - webpSize / before) * 100);

  console.log(
    `✓ ${basename(file).padEnd(55)} ${kb(before)} → ${kb(after)} (${saved}% smaller) | webp: ${kb(webpSize)} (${webpSaved}% smaller)`
  );
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)}KB`;
}

const files = await walk(INPUT_DIR);
console.log(`\nCompressing ${files.length} images in ${INPUT_DIR}...\n`);

let done = 0;
for (const file of files) {
  try {
    await compress(file);
    done++;
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`);
  }
}

console.log(`\nDone. Compressed ${done}/${files.length} images.`);
