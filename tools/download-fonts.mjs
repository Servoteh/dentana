import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const fontsDir = path.join(root, 'fonts');

const cssUrl =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap';

fs.mkdirSync(fontsDir, { recursive: true });

const css = await fetch(cssUrl, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
}).then((r) => r.text());

const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]);
let localCss = css;

for (const url of urls) {
  const fileName = url.split('/').pop().split('?')[0];
  const dest = path.join(fontsDir, fileName);
  if (!fs.existsSync(dest)) {
    const buf = await fetch(url).then((r) => r.arrayBuffer());
    fs.writeFileSync(dest, Buffer.from(buf));
    console.log('Downloaded', fileName);
  }
  localCss = localCss.replaceAll(url, `/fonts/${fileName}`);
}

fs.writeFileSync(path.join(root, 'fonts.css'), localCss);
console.log('Created fonts.css with', urls.length, 'font files');
