const fs = require('fs');
const path = require('path');

const clientProductsPath = path.join(__dirname, '..', 'client', 'src', 'initialProducts.ts');
const publicDir = path.join(__dirname, '..', 'client', 'public');

const content = fs.readFileSync(clientProductsPath, 'utf8');

// Match all imageUrl lines
const regex = /id:\s*'([^']+)'[\s\S]*?imageUrl:\s*'([^']+)'/g;
let m;
let total = 0;
let missing = 0;

console.log('Verifying all product image paths...');
while ((m = regex.exec(content)) !== null) {
  total++;
  const id = m[1];
  const imgUrl = m[2];
  const localPath = path.join(publicDir, imgUrl.startsWith('/') ? imgUrl.substring(1) : imgUrl);

  if (!fs.existsSync(localPath)) {
    console.error(`[MISSING] Product ${id} -> ${imgUrl} does not exist at ${localPath}`);
    missing++;
  } else {
    const stat = fs.statSync(localPath);
    if (stat.size === 0) {
      console.error(`[EMPTY] Product ${id} -> ${imgUrl} has 0 bytes`);
      missing++;
    }
  }
}

console.log(`\nVerification Result: ${total - missing}/${total} images exist and are valid on disk.`);
if (missing === 0) {
  console.log('ALL PRODUCT IMAGES ARE 100% VALID AND INTACT!');
}
