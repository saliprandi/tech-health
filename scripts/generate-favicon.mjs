import fs from 'fs';
import sharp from 'sharp';
import toIco from 'to-ico';

const svgBuffer = fs.readFileSync('./public/logo.svg');

// Convert SVG to PNG at multiple sizes for the ICO
const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  sizes.map(async (size) => {
    return sharp(svgBuffer, { density: 300 })
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
  })
);

const icoBuffer = await toIco(pngBuffers);
fs.writeFileSync('./public/favicon.ico', icoBuffer);

console.log('favicon.ico generated successfully!');
