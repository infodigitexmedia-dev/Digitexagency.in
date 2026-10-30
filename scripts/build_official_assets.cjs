const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const srcFile = 'uploads/digitex-1790686931580-409285.jpg';
if (!fs.existsSync(srcFile)) {
  console.error('Source file not found:', srcFile);
  process.exit(1);
}

// Ensure public/assets directory exists
const assetsDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 1. Copy original file
fs.copyFileSync(srcFile, path.join(assetsDir, 'digitex.jpg'));
fs.copyFileSync(srcFile, path.join(assetsDir, 'digitex-official.jpg'));
fs.copyFileSync(srcFile, path.join(assetsDir, 'digitex-logo.jpg'));
console.log('1. Copied official digitex.jpg');

// 2. Crop components from original 1254x1254 image
// Symbol: 682x552+288+224
// Wordmark + Tagline: 964x193+146+822
// Wordmark only: 964x130+146+822
// Full logo (vertical lockup): 964x796+146+224

function processAlpha(cropBox, outDarkPath, outLightPath) {
  const tmpRgba = 'tmp_crop.rgba';
  const [w, h, x, y] = cropBox.split(/[x+]/).map(Number);
  
  cp.execSync(`convert "${srcFile}" -crop ${w}x${h}+${x}+${y} -depth 8 ${tmpRgba}`);
  const buf = fs.readFileSync(tmpRgba);
  
  const outDark = Buffer.alloc(w * h * 4);
  const outLight = Buffer.alloc(w * h * 4);
  
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i], g = buf[i+1], b = buf[i+2];
    
    // Crimson red detection
    const isRed = r > 70 && r > (g + b) * 1.25;
    
    let alpha = 0;
    if (isRed) {
      alpha = Math.min(255, Math.round((r / 241) * 255));
    } else {
      const maxVal = Math.max(r, g, b);
      alpha = Math.min(255, maxVal);
    }
    
    // Threshold out dark compression artifacts
    if (alpha < 12) alpha = 0;
    
    if (alpha > 0) {
      if (isRed) {
        // Official Crimson Red #E11D2E
        outDark[i] = 225; outDark[i+1] = 29; outDark[i+2] = 46; outDark[i+3] = alpha;
        outLight[i] = 225; outLight[i+1] = 29; outLight[i+2] = 46; outLight[i+3] = alpha;
      } else {
        // Dark theme: White #FFFFFF
        outDark[i] = 255; outDark[i+1] = 255; outDark[i+2] = 255; outDark[i+3] = alpha;
        // Light theme: Charcoal #111111
        outLight[i] = 17; outLight[i+1] = 17; outLight[i+2] = 17; outLight[i+3] = alpha;
      }
    } else {
      outDark[i+3] = 0;
      outLight[i+3] = 0;
    }
  }
  
  fs.writeFileSync('out_dark.rgba', outDark);
  fs.writeFileSync('out_light.rgba', outLight);
  
  cp.execSync(`convert -size ${w}x${h} -depth 8 rgba:out_dark.rgba "${outDarkPath}"`);
  cp.execSync(`convert -size ${w}x${h} -depth 8 rgba:out_light.rgba "${outLightPath}"`);
  
  try {
    fs.unlinkSync(tmpRgba);
    fs.unlinkSync('out_dark.rgba');
    fs.unlinkSync('out_light.rgba');
  } catch (e) {}
}

console.log('2. Processing Symbol...');
processAlpha('682x552+288+224', path.join(assetsDir, 'digitex-symbol-dark.png'), path.join(assetsDir, 'digitex-symbol-light.png'));
// Also standard digitex-symbol.png
fs.copyFileSync(path.join(assetsDir, 'digitex-symbol-dark.png'), path.join(assetsDir, 'digitex-symbol.png'));

console.log('3. Processing Full Stacked Logo...');
processAlpha('964x796+146+224', path.join(assetsDir, 'digitex-brand-logo-dark.png'), path.join(assetsDir, 'digitex-brand-logo-light.png'));
fs.copyFileSync(path.join(assetsDir, 'digitex-brand-logo-dark.png'), path.join(assetsDir, 'digitex-brand-logo.png'));

console.log('4. Processing Wordmark + Tagline...');
processAlpha('964x193+146+822', path.join(assetsDir, 'digitex-text-dark.png'), path.join(assetsDir, 'digitex-text-light.png'));

console.log('4b. Processing Wordmark Only (without tagline)...');
processAlpha('964x128+146+822', path.join(assetsDir, 'digitex-wordmark-dark.png'), path.join(assetsDir, 'digitex-wordmark-light.png'));

console.log('5. Generating Horizontal Lockups...');
// Horizontal lockup:
// Height: 200px
// Symbol scaled to height 200px: w = round(200 * 682 / 552) = 247px
// Text scaled to height 170px (vertically centered in 200px): w = round(170 * 964 / 193) = 849px
// Canvas: width = 247 + 45 (gap) + 849 = 1141px, height = 200px
function makeHorizontalLockup(symbolPath, textPath, outPath) {
  cp.execSync(`
    convert -size 1141x200 xc:none \
      \\( "${symbolPath}" -resize 247x200 \\) -geometry +0+0 -composite \
      \\( "${textPath}" -resize 849x170 \\) -geometry +292+15 -composite \
      "${outPath}"
  `);
}

makeHorizontalLockup(
  path.join(assetsDir, 'digitex-symbol-dark.png'),
  path.join(assetsDir, 'digitex-text-dark.png'),
  path.join(assetsDir, 'digitex-logo-dark.png')
);
fs.copyFileSync(path.join(assetsDir, 'digitex-logo-dark.png'), path.join(assetsDir, 'digitex-logo-horizontal-dark.png'));

makeHorizontalLockup(
  path.join(assetsDir, 'digitex-symbol-light.png'),
  path.join(assetsDir, 'digitex-text-light.png'),
  path.join(assetsDir, 'digitex-logo-light.png')
);
fs.copyFileSync(path.join(assetsDir, 'digitex-logo-light.png'), path.join(assetsDir, 'digitex-logo-horizontal-light.png'));
// Default digitex-logo.png
fs.copyFileSync(path.join(assetsDir, 'digitex-logo-light.png'), path.join(assetsDir, 'digitex-logo.png'));

console.log('6. Generating SVG Favicon and Symbols...');
// Embed high-res base64 in SVG for crisp vector rendering anywhere
const symbolDarkB64 = fs.readFileSync(path.join(assetsDir, 'digitex-symbol-dark.png')).toString('base64');
const symbolLightB64 = fs.readFileSync(path.join(assetsDir, 'digitex-symbol-light.png')).toString('base64');

// digitex-icon.svg (badge with dark squircle background and official symbol)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <rect width="100" height="100" rx="22" fill="#111111" />
  <image href="data:image/png;base64,${symbolDarkB64}" x="12" y="14" width="76" height="72" preserveAspectRatio="xMidYMid meet" />
</svg>
`;
fs.writeFileSync(path.join(assetsDir, 'digitex-icon.svg'), iconSvg);

// digitex-symbol.svg (dark-on-light, transparent background)
const symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 682 552" width="100%" height="100%">
  <image href="data:image/png;base64,${symbolLightB64}" x="0" y="0" width="682" height="552" />
</svg>
`;
fs.writeFileSync(path.join(assetsDir, 'digitex-symbol.svg'), symbolSvg);

// digitex-symbol-white.svg (light-on-dark, transparent background)
const symbolWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 682 552" width="100%" height="100%">
  <image href="data:image/png;base64,${symbolDarkB64}" x="0" y="0" width="682" height="552" />
</svg>
`;
fs.writeFileSync(path.join(assetsDir, 'digitex-symbol-white.svg'), symbolWhiteSvg);

console.log('All official assets built successfully in public/assets!');
