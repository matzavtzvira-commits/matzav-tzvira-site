import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const svgPath = 'C:/Users/WIN 11/Desktop/projects/matzav-tzvira-site/public/kids-balloon.svg';
const outPath = 'C:/Users/WIN 11/Desktop/projects/matzav-tzvira-site/public/kids-balloon.png';

const content = readFileSync(svgPath, 'utf8');

const regex = /xlink:href="data:image\/png;base64,([^"]+)"/g;
const matches = [];
let match;
while ((match = regex.exec(content)) !== null) {
  const before = content.slice(0, match.index);
  const inDefs = before.lastIndexOf('<defs>') > before.lastIndexOf('</defs>');
  matches.push({ b64: match[1], inDefs });
}

// Image 0 (inDefs, grayscale) = the mask silhouette
// Image 2 (not inDefs, RGBA) = the colored illustration
const maskImg = matches.find((m, i) => m.inDefs && i === 0);
const illustrationImg = matches.find((m, i) => !m.inDefs && i === 2);

const maskBuf = Buffer.from(maskImg.b64, 'base64');
const illBuf = Buffer.from(illustrationImg.b64, 'base64');

const maskMeta = await sharp(maskBuf).metadata();
const illMeta = await sharp(illBuf).metadata();
console.log('Mask:', maskMeta.width, 'x', maskMeta.height, 'ch:', maskMeta.channels);
console.log('Illustration:', illMeta.width, 'x', illMeta.height, 'ch:', illMeta.channels);

// Get mask raw data (grayscale = 1 channel, white=255 means show, black=0 means hide)
const { data: maskData } = await sharp(maskBuf).raw().toBuffer({ resolveWithObject: true });

// Get illustration raw RGBA data
const { data: illData, info: illInfo } = await sharp(illBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

// Apply mask to illustration: set alpha = mask value
for (let i = 0; i < illInfo.width * illInfo.height; i++) {
  const maskVal = maskData[i]; // 0-255 grayscale value
  illData[i * 4 + 3] = maskVal; // set alpha from mask
}

// Resize down to reasonable size (the image is 2650x2753, let's scale to 800px wide)
const targetWidth = 800;
const scale = targetWidth / illInfo.width;
const targetHeight = Math.round(illInfo.height * scale);

const result = await sharp(illData, {
  raw: { width: illInfo.width, height: illInfo.height, channels: 4 }
})
  .resize(targetWidth, targetHeight)
  .png()
  .toBuffer();

writeFileSync(outPath, result);
console.log(`Saved: ${outPath} (${result.length} bytes, ${targetWidth}x${targetHeight})`);
