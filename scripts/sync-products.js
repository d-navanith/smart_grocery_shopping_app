const fs = require('fs');
const path = require('path');

// Read client/src/initialProducts.ts
const clientContent = fs.readFileSync(path.join(__dirname, '../client/src/initialProducts.ts'), 'utf8');

// Extract the array string between "export const INITIAL_PRODUCTS: Product[] = [" and "];"
const startMarker = 'export const INITIAL_PRODUCTS: Product[] = [';
const startIndex = clientContent.indexOf(startMarker);
const lastSemicolon = clientContent.lastIndexOf('];');
if (startIndex === -1 || lastSemicolon === -1) {
  console.error('Could not find markers in client/src/initialProducts.ts');
  process.exit(1);
}

const productsRaw = clientContent.substring(startIndex + startMarker.length, lastSemicolon).trim();

// 1. Update server/src/mockStore.ts
const serverPath = path.join(__dirname, '../server/src/mockStore.ts');
const serverContent = fs.readFileSync(serverPath, 'utf8');
const serverStartMarker = 'export const INITIAL_PRODUCTS: Product[] = [';
const serverEndMarker = '\nexport const INITIAL_RIDER: RiderPartner = {';
const serverStartIndex = serverContent.indexOf(serverStartMarker);
const serverEndIndex = serverContent.indexOf(serverEndMarker);

if (serverStartIndex !== -1 && serverEndIndex !== -1) {
  // Add createdAt to each item if not present
  // In server/src/mockStore.ts, each object can have createdAt: '2026-10-25'
  const serverProductsCode = productsRaw.replace(/productType:\s*'[^']+'/g, (match) => `${match},\n    createdAt: '2026-10-25'`);
  const newServerContent = serverContent.substring(0, serverStartIndex + serverStartMarker.length) +
    '\n' + serverProductsCode + '\n];\n' +
    serverContent.substring(serverEndIndex);
  
  // Also update INITIAL_CATEGORIES in server
  const updatedServerWithCats = newServerContent.replace(
    /export const INITIAL_CATEGORIES: CategoryItem\[\] = \[[\s\S]*?\];/m,
    `export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'Spices & Curry (Wijaya & Hiruni)', slug: 'spices-curry', count: 24, order: '01', visibility: 'Visible', updated: '28 Oct 2026', image: '/prod_spices.jpg' },
  { id: 'cat-2', name: 'Rice & Grains (Keeri Samba & Basmati)', slug: 'rice-grains', count: 10, order: '02', visibility: 'Visible', updated: '28 Oct 2026', image: '/prod_white_rice.jpg' },
  { id: 'cat-3', name: 'Flour & Mixes (Kurakkan & Hopper)', slug: 'flour-grains', count: 5, order: '03', visibility: 'Visible', updated: '28 Oct 2026', image: '/prod_roast_paan.jpg' },
  { id: 'cat-4', name: 'Dried Fish & Sambals (Haalmasso & Katta)', slug: 'dried-fish-sambals', count: 14, order: '04', visibility: 'Visible', updated: '27 Oct 2026', image: '/cat_meat.jpg' },
  { id: 'cat-5', name: 'Tea & Coffee (Watawala & Harischandra)', slug: 'tea-coffee-beverages', count: 11, order: '05', visibility: 'Visible', updated: '27 Oct 2026', image: '/prod_tea.jpg' },
  { id: 'cat-6', name: 'Biscuits & Noodles (Maliban & Wijaya)', slug: 'biscuits-snacks', count: 14, order: '06', visibility: 'Visible', updated: '26 Oct 2026', image: '/prod_biscuits.jpg' },
  { id: 'cat-7', name: 'Kitchenware & Utensils (Hiramana & Clay Pot)', slug: 'kitchenware-utensils', count: 6, order: '07', visibility: 'Visible', updated: '26 Oct 2026', image: '/figma_prod_coconut.png' }
];`
  );

  fs.writeFileSync(serverPath, updatedServerWithCats, 'utf8');
  console.log('Updated server/src/mockStore.ts successfully!');
} else {
  console.error('Could not find server markers');
}

// 2. Update admin/src/components/part2_initial_data.tsx
const adminPath = path.join(__dirname, '../admin/src/components/part2_initial_data.tsx');
const adminContent = fs.readFileSync(adminPath, 'utf8');
const adminStartMarker = 'export const INITIAL_PRODUCTS: Product[] = [';
const adminEndMarker = '\nexport const INITIAL_CATEGORIES: CategoryItem[] = [';
const adminStartIndex = adminContent.indexOf(adminStartMarker);
const adminEndIndex = adminContent.indexOf(adminEndMarker);

if (adminStartIndex !== -1 && adminEndIndex !== -1) {
  const newAdminContent = adminContent.substring(0, adminStartIndex + adminStartMarker.length) +
    '\n' + productsRaw + '\n];\n' +
    adminContent.substring(adminEndIndex);
  
  // Also update INITIAL_CATEGORIES and INITIAL_ORDERS in admin
  const updatedAdminWithCats = newAdminContent.replace(
    /export const INITIAL_CATEGORIES: CategoryItem\[\] = \[[\s\S]*?\];/m,
    `export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'Spices & Curry (Wijaya & Hiruni)', slug: 'spices-curry', count: 24, order: '01', visibility: 'Visible', updated: '28 Oct 2026', image: '/prod_spices.jpg' },
  { id: 'cat-2', name: 'Rice & Grains (Keeri Samba & Basmati)', slug: 'rice-grains', count: 10, order: '02', visibility: 'Visible', updated: '28 Oct 2026', image: '/prod_white_rice.jpg' },
  { id: 'cat-3', name: 'Flour & Mixes (Kurakkan & Hopper)', slug: 'flour-grains', count: 5, order: '03', visibility: 'Visible', updated: '28 Oct 2026', image: '/prod_roast_paan.jpg' },
  { id: 'cat-4', name: 'Dried Fish & Sambals (Haalmasso & Katta)', slug: 'dried-fish-sambals', count: 14, order: '04', visibility: 'Visible', updated: '27 Oct 2026', image: '/cat_meat.jpg' },
  { id: 'cat-5', name: 'Tea & Coffee (Watawala & Harischandra)', slug: 'tea-coffee-beverages', count: 11, order: '05', visibility: 'Visible', updated: '27 Oct 2026', image: '/prod_tea.jpg' },
  { id: 'cat-6', name: 'Biscuits & Noodles (Maliban & Wijaya)', slug: 'biscuits-snacks', count: 14, order: '06', visibility: 'Visible', updated: '26 Oct 2026', image: '/prod_biscuits.jpg' },
  { id: 'cat-7', name: 'Kitchenware & Utensils (Hiramana & Clay Pot)', slug: 'kitchenware-utensils', count: 6, order: '07', visibility: 'Visible', updated: '26 Oct 2026', image: '/figma_prod_coconut.png' }
];`
  ).replace(
    /\{ productTitle: 'Araliya Keeri Samba & White Raw Rice \(5kg\)', quantity: 1, price: 38\.50 \},[\s\S]*?\{ productTitle: 'Mysore Red Split Lentils \/ Dhal \(1kg\)', quantity: 1, price: 12\.50 \}/m,
    `{ productTitle: 'Araliya Supiri Keeri Samba Rice (5kg)', quantity: 1, price: 44.50 },
      { productTitle: 'Wijaya Roasted Curry Powder (250g)', quantity: 2, price: 12.50 },
      { productTitle: 'Mysore Red Split Lentils / Masoor Daal (1kg)', quantity: 1, price: 12.50 }`
  );

  fs.writeFileSync(adminPath, updatedAdminWithCats, 'utf8');
  console.log('Updated admin/src/components/part2_initial_data.tsx successfully!');
} else {
  console.error('Could not find admin markers');
}
