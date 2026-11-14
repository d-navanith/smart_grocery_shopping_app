const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'client', 'src', 'initialProducts.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace imageUrl for each product block
// Regex matching: id:\s*'([^']+)'[\s\S]*?imageUrl:\s*'([^']+)'
let count = 0;
content = content.replace(/(id:\s*'([^']+)'[\s\S]*?imageUrl:\s*)'([^']+)'/g, (match, prefix, id) => {
  count++;
  return `${prefix}'/products/${id}.jpg'`;
});

console.log(`Updated ${count} product imageUrls in initialProducts.ts`);
fs.writeFileSync(filePath, content, 'utf8');
