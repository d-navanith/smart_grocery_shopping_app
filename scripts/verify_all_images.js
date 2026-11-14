const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('client/src/initialProducts.ts', 'utf8');
const ids = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const targetDir = path.join(__dirname, '..', 'client', 'public', 'products');

console.log(`Checking ${ids.length} products...`);
let missing = 0;
let valid = 0;

for (const id of ids) {
  const filePath = path.join(targetDir, `${id}.jpg`);
  if (!fs.existsSync(filePath)) {
    console.log(`[MISSING] ${id}`);
    missing++;
  } else {
    const size = fs.statSync(filePath).size;
    if (size < 1000) {
      console.log(`[CORRUPT / TOO SMALL] ${id} (${size} bytes)`);
      missing++;
    } else {
      valid++;
    }
  }
}

console.log(`\nVerification Summary: Valid=${valid}/${ids.length}, Missing=${missing}`);
