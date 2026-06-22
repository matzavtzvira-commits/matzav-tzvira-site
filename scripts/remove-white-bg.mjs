import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const svgPath = 'C:/Users/WIN 11/Desktop/projects/matzav-tzvira-site/public/kids-balloon.svg';
const content = readFileSync(svgPath, 'utf8');

const regex = /xlink:href="data:image\/png;base64,([^"]+)"/g;
let match;
const images = [];
while ((match = regex.exec(content)) !== null) {
  const before = content.slice(0, match.index);
  const inDefs = before.lastIndexOf('<defs>') > before.lastIndexOf('</defs>');
  images.push({ b64: match[1], index: match.index, full: match[0], inDefs });
  console.log(`Image ${images.length}: ${Buffer.from(match[1], 'base64').length} bytes, inDefs=${inDefs}`);
}

// Process all images OUTSIDE defs (the visible ones)
let result = content;
let offset = 0;

for (const img of images) {
  if (img.inDefs) {
    console.log('Skipping defs image');
    continue;
  }

  const pngBuffer = Buffer.from(img.b64, 'base64');
  const meta = await sharp(pngBuffer).metadata();
  console.log(`Processing ${pngBuffer.length} bytes, ${meta.width}x${meta.height}, ch=${meta.channels}`);

  const { data, info } = await sharp(pngBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const threshold = 240;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > threshold && g > threshold && b > threshold) {
      data[i + 3] = 0;
    }
  }

  const processed = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).png().toBuffer();

  const newB64 = processed.toString('base64');
  const newFull = `xlink:href="data:image/png;base64,${newB64}"`;
  result = result.slice(0, img.index + offset) + newFull + result.slice(img.index + offset + img.full.length);
  offset += newFull.length - img.full.length;

  console.log(`Replaced: ${pngBuffer.length} → ${processed.length} bytes`);
}

writeFileSync(svgPath, result, 'utf8');
console.log('Done!');
