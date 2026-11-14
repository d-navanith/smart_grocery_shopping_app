const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'client', 'public', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const productMap = {
  // Chilli powder (4)
  'prod-annam-chilli-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Babas-Chilli-Powder-250g-1-Chilli-Powder-Ceylon-Supermart.jpg?v=1641249313',
  'prod-wijaya-chilli-powder': 'KEEP_LOCAL', // Generated high-res studio packaging
  'prod-hiruni-chilli-powder': 'https://romaniapunchikade.com/wp-content/uploads/2025/06/HIRUNI-CHILLI-POWDER-100G-300x300.webp',
  'prod-wijaya-roasted-chilli-powder': 'https://cdn.shopify.com/s/files/1/2671/1426/products/Wijaya-Roasted-Chilli-Powder-500gNew-Pack.jpg?v=1579118746',

  // Curry powder (6)
  'prod-wijaya-curry-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Wijaya-Curry-Powder-500g-1-Curry-Powder-Ceylon-Supermart.jpg?v=1641248003',
  'prod-wijaya-meat-curry-powder': 'https://cdn.shopify.com/s/files/1/2671/1426/products/Wijaya-Meat-Curry-Powder-500g.jpg?v=1539743433',
  'prod-wijaya-roasted-curry-powder': 'https://cdn.shopify.com/s/files/1/2671/1426/products/Wijaya-Roasted-Curry-Powder-500g.jpg?v=1539743378',
  'prod-hiruni-curry-powder': 'https://romaniapunchikade.com/wp-content/uploads/2025/06/HIRUNI-CURRY-POWDER-250G-300x300.webp',
  'prod-hiruni-roasted-curry-powder': 'https://romaniapunchikade.com/wp-content/uploads/2025/06/HIRUNI-BLACK-CURRY-POWDER-100g-300x300.webp',
  'prod-hiruni-meat-curry-powder': 'https://romaniapunchikade.com/wp-content/uploads/2025/06/HIRUNI-MEAT-CURRY-POWDER-250G-300x300.webp',

  // Chilli pieces (3)
  'prod-wijaya-chilli-pieces': 'https://cdn.shopify.com/s/files/1/2671/1426/products/WIjaya-Chilli-Pieces-500g.jpg?v=1562649007',
  'prod-hiruni-chilli-pieces': 'https://romaniapunchikade.com/wp-content/uploads/2025/07/Hiruni-3-300x300.webp',
  'prod-annam-chilli-pieces': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Niru-Brand-Crushed-Red-Chilli-Flakes-200g-1-Ceylon-Supermart.jpg?v=1660947951',

  // Spices & Seeds (11)
  'prod-haldi-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Wijaya-Turmeric-Powder-100g-1-Turmeric-Ceylon-Supermart.jpg?v=1641249767',
  'prod-black-pepper-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Wijaya-Black-Pepper-Powder-100g-1-Pepper-Ceylon-Supermart.jpg?v=1641248405',
  'prod-cumin-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Fudco-Jeera-Cumin-Powder-100g-1-Ceylon-Supermart.jpg?v=1660949013',
  'prod-cumin-seeds': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Fudco-Jeera-Cumin-Seeds-100g-1-Ceylon-Supermart.jpg?v=1660947683',
  'prod-coriander-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Fudco-Dhana-Coriander-Powder-100g-1-Ceylon-Supermart.jpg?v=1660948924',
  'prod-coriander-seeds': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Fudco-Dhana-Coriander-Seeds-100g-1-Ceylon-Supermart.jpg?v=1660948925',
  'prod-methi-seeds': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Fudco-Methi-Fenugreek-Seeds-100g-1-Ceylon-Supermart.jpg?v=1660947900',
  'prod-fennel-seeds': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Fudco-Variyali-Fennel-Seeds-100g-1-Ceylon-Supermart.jpg?v=1660948995',
  'prod-tamarind': 'https://cdn.shopify.com/s/files/1/2671/1426/products/Mr.Tamarind-Seedless-Tamarind-Paste-16oz.jpg?v=1650622884',
  'prod-goraka': 'https://cdn.shopify.com/s/files/1/2671/1426/files/rn-image_picker_lib_temp_c992a14d-48f4-4f58-b8e8-13c8363b452a.png?v=1781722579',
  'prod-green-cardamom': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Fudco-Green-Cardamom-50g-1-Ceylon-Supermart.jpg?v=1660947477',

  // Rice (5)
  'prod-basmati-rice': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Akash-Basmati-Rice-5kg-1-Basmati-Rice-Ceylon-Supermart.jpg?v=1641381335',
  'prod-supiri-keeri-rice': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/1000017066.jpg?v=1729007621',
  'prod-white-raw-rice': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Indu-Sri-White-Raw-Rice-1kg-1-White-Raw-Rice-Ceylon-Supermart.jpg?v=1641249788',
  'prod-red-raw-rice': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/1000017487.jpg?v=1729007620',
  'prod-broken-basmati': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_272d6823-d4f3-4b42-9697-0896809f0792.jpg?v=1660947264',

  // Flour (5)
  'prod-white-rice-flour': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/TRS-White-Rice-Flour-Fine-500g-1-Rice-Flour-Ceylon-Supermart.jpg?v=1641249783',
  'prod-ragi-kurakkan-flour': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Niru-Kurakkan-Finger-Millet-Ragi-Flour-1kg-1-Kurakkan-Flour-Ceylon-Supermart.jpg?v=1641249419',
  'prod-hopper-flour': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Nikado-Hopper-Mix-Flour-400g-1-Flour-Ceylon-Supermart.jpg?v=1641248740',
  'prod-string-hopper-flour': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/MDK-String-Hopper-White-Flour-700g-1-String-Hopper-Flour-Ceylon-Supermart.jpg?v=1641249673',
  'prod-dosa-flour': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Nikado-Thosai-Dosa-Mix-Flour-400g-1-Flour-Ceylon-Supermart.jpg?v=1641249755',

  // Daal & Pulses (5)
  'prod-masoor-daal': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/TRS-Red-Split-Lentils-Masoor-Dal-500g-1-Ceylon-Supermart.jpg?v=1660948574',
  'prod-channa-daal': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Fudco-Chana-Dal-Split-Desi-Chickpeas-500g-1-Ceylon-Supermart.jpg?v=1660948834',
  'prod-kala-channa': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/TRS-Kala-Chana-Brown-Chickpeas-500g-1-Ceylon-Supermart.jpg?v=1660947708',
  'prod-green-mung-beans': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/TRS-Mung-Beans-Moong-Whole-500g-1-Ceylon-Supermart.jpg?v=1660947936',
  'prod-pottukadalai': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_8d7b30fe-606e-4ea0-9537-ef901eb9c091.jpg?v=1660948293',

  // Coconut (3)
  'prod-maggi-coconut-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Nestle-Maggi-Sri-Lankan-Coconut-Milk-Powder-1kg-1-Ceylon-Supermart.jpg?v=1660947948',
  'prod-annam-coconut-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maggi-Coconut-Milk-Powder-300g-1-Coconut-Milk-Powder-Ceylon-Supermart.jpg?v=1641249495',
  'prod-annam-dried-coconut': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Natco-Desiccated-Coconut-Medium-500g-1-Ceylon-Supermart.jpg?v=1660948011',

  // Dried fish & Seafood (6)
  'prod-dried-katta-fish': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Niru-Dried-Katta-Fish-Queen-Fish-150g-1-Ceylon-Supermart.jpg?v=1660949392',
  'prod-dried-bombily-fish': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/20241028-181852.jpg?v=1730139744',
  'prod-dried-sprats': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_344c1904-4643-43d6-bf57-0727c8953ce9.jpg?v=1646247348',
  'prod-dried-shrimp': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/20240825-105602.jpg?v=1724584731',
  'prod-dried-baby-shrimp': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/IMG-20261007-WA0003.jpg?v=1728310034',
  'prod-maldive-fish-chips': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_1629fc9d-85da-4931-9c90-bb8e3acb6e6f.jpg?v=1660947849',

  // Cooked / Sambals / Pickles / Canned (8)
  'prod-md-mango-pickle': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/MD-Sinhala-Achcharu-Pickle-400g-1-Ceylon-Supermart.jpg?v=1660947864',
  'prod-lime-pickle': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/MD-Lime-Pickle-400g-1-Ceylon-Supermart.jpg?v=1660947814',
  'prod-chilli-paste': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/1_12_561a085e-0d63-4349-96f2-e804e1e40df2.jpg?v=1710508688',
  'prod-maldive-fish-sambal': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Indu-Sri-Maldive-Fish-Sambola-180g-1-Ceylon-Supermart.jpg?v=1641249497',
  'prod-katta-sambal': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_a62825d1-6407-4299-ab1c-f8b5f8219c5c.jpg?v=1660949439',
  'prod-kochchi-sambal': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_b071725b-ae29-4fc6-b7ff-153b98c399b1.jpg?v=1660947754',
  'prod-coconut-sambal': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_49cdea75-2923-423a-99c0-e3e6ac41ec78.jpg?v=1660948906',
  'prod-jack-mackerel': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Diamond-Jack-Mackerel-in-Brine-425g-1-Canned-Fish-Ceylon-Supermart.jpg?v=1641248881',

  // Jam (6)
  'prod-md-mixed-fruit-jam': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_d3dfba00-8e92-44bf-b2d7-03e303f65090.jpg?v=1660947875',
  'prod-md-woodapple-jam': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/MD_woodapple_jam_1.jpg?v=1719597793',
  'prod-md-mango-jam': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_f601b3a5-bc4e-4f10-9b09-ea53e3fa2996.jpg?v=1660947863',
  'prod-md-pineapple-jam': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_c8d195a0-9aa8-4e80-bfd1-417166166542.jpg?v=1660947883',
  'prod-hiruni-woodapple-jam': 'https://cdn.shopify.com/s/files/1/2671/1426/products/MD-Woodapple-Jam.jpg?v=1569293237',
  'prod-md-passion-fruit-jam': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_cb20023a-3316-43f1-b4f5-50fa67f13b56.jpg?v=1660947880',

  // Coffee (3)
  'prod-annam-masala-coffee': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/rn-image_picker_lib_temp_bc6c219f-4855-422f-b153-d25194dd198f.jpg?v=1772553792',
  'prod-annam-regular-coffee': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_a74166a3-719f-473e-9954-ac98242c143a.jpg?v=1645713242',
  'prod-harischandra-coffee': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_a74166a3-719f-473e-9954-ac98242c143a.jpg?v=1645713242',

  // Tea (3)
  'prod-watawala-tea-powder': 'https://cdn.shopify.com/s/files/1/2671/1426/products/Watawala-pure-ceylon-tea-1KG.jpg?v=1543328811',
  'prod-hiruni-tea-powder': 'https://romaniapunchikade.com/wp-content/uploads/2025/07/Hiruni-Tea-200G-300x300.png',
  'prod-green-tea': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Dilmah-Pure-Ceylon-Green-Tea-20-Tea-Bags-1-Ceylon-Supermart.jpg?v=1641248908',

  // Biscuits (10)
  'prod-maliban-ginger-cookies': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Ginger-Nut-Biscuits-80g-1-Ceylon-Supermart.jpg?v=1660947829',
  'prod-maliban-marie': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Gold-Marie-330g-1-Ceylon-Supermart.jpg?v=1660947833',
  'prod-maliban-nice': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Nice-Biscuits-170g-1-Ceylon-Supermart.jpg?v=1660947837',
  'prod-maliban-chocolate-puff': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Chocolate-Puff-Biscuits-200g-1-Ceylon-Supermart.jpg?v=1660947822',
  'prod-maliban-chocolate-biscuit': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Chocolate-Cream-Biscuits-100g-1-Ceylon-Supermart.jpg?v=1660947821',
  'prod-maliban-lemon-puff': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/1_4.jpg?v=1697274092',
  'prod-maliban-hawaiian-cookies': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Hawaiian-Cookies-Biscuits-200g-1-Ceylon-Supermart.jpg?v=1660947834',
  'prod-maliban-chickbits': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Chick-Bits-Cheese-and-Onion-Biscuits-100g-1-Ceylon-Supermart.jpg?v=1660947820',
  'prod-maliban-jam-biscuit': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Krim-Cracker-Jem-Fruit-Biscuits-170g-1-Ceylon-Supermart.jpg?v=1660947835',
  'prod-maliban-cream-cracker': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Smart-Cream-Cracker-Biscuits-490g-1-Ceylon-Supermart.jpg?v=1660947841',

  // Milk & Malt (5)
  'prod-nestomalt': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Nestle-Nestomalt-Malted-Drink-400g-1-Ceylon-Supermart_bf4df32a-99ff-4113-bd60-705e2328c745.jpg?v=1660947986',
  'prod-nido-milk-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Nestle-Nido-Milk-Powder-18kg-1-Ceylon-Supermart.jpg?v=1660947990',
  'prod-milo': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Nestle-Milo-Chocolate-Flavoured-Malt-Drinking-Powder-400g-1-Ceylon-Supermart.jpg?v=1660947963',
  'prod-horlicks': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_3e3e4a4c-dc3a-4586-839b-662f51aac983.jpg?v=1660947545',
  'prod-maliban-milk-powder': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Maliban-Full-Cream-Milk-Powder-400g-1-Ceylon-Supermart.jpg?v=1660947828',

  // Kitchenware (6)
  'prod-rice-cooker': 'https://singerwebcdn.azureedge.net/resources/products/normal/SIN_SRC-1018HS-01_zoom.webp',
  'prod-hiramana-coconut-scraper': 'https://cdn.shopify.com/s/files/1/2671/1426/files/rn-image_picker_lib_temp_61791be7-79ca-4696-8555-6d46dea4f8a3.png?v=1759257608',
  'prod-hopper-pan': 'https://cdn.shopify.com/s/files/1/2671/1426/files/rn-image_picker_lib_temp_0c4196ed-e42b-44f2-90e9-33957b9dc45e.png?v=1758907866',
  'prod-string-hopper-press': 'https://cdn.shopify.com/s/files/1/2671/1426/products/String-Hopper-Mould---Alu.jpg?v=1534823467',
  'prod-string-hopper-plates': 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Eco-Friendly-Large-String-Hopper-Laveria-Pancake-Trays-Racks-Rattan-Cane-Each-1-Kitchen-Tools-Utensils-Ceylon-Supermart.jpg?v=1641247290',
  'prod-clay-pot': 'https://cdn.shopify.com/s/files/1/2671/1426/files/rn-image_picker_lib_temp_8df58524-f9f4-4781-96ea-f140636b0a08.png?v=1768088459',

  // Noodles (4)
  'prod-wijaya-noodles': 'https://cdn.shopify.com/s/files/1/2671/1426/products/Wijaya-Chinese-Noodles-400g.jpg?v=1556801947',
  'prod-wiwi-noodles': 'https://cdn.lakpura.com/w/2000/p/d/b/c/f/wijaya-hot-spicy-instant-noodles-85g-dbcf3270582e27cd4b16239d2c6a2849.jpg',
  'prod-current-noodles': 'https://sugarworld.lk/wp-content/uploads/yashoda-food-current-hot-n-spicy-chilli-pepper-noodles-100g.webp',
  'prod-harischandra-noodles': 'https://cdn.shopify.com/s/files/1/2671/1426/products/Harischandra-Plain-Noodles.jpg?v=1539832180'
};

async function downloadImage(id, url) {
  const destPath = path.join(targetDir, `${id}.jpg`);
  if (url === 'KEEP_LOCAL') {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`[PASS] ${id} already has local image (${fs.statSync(destPath).size} bytes)`);
      return true;
    }
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });

    if (!res.ok) {
      console.error(`[FAIL] ${id} HTTP ${res.status} from ${url}`);
      return false;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 500) {
      console.error(`[FAIL] ${id} downloaded file too small (${buffer.length} bytes)`);
      return false;
    }

    fs.writeFileSync(destPath, buffer);
    console.log(`[DONE] ${id} saved (${buffer.length} bytes)`);
    return true;
  } catch (err) {
    console.error(`[ERROR] ${id}: ${err.message}`);
    return false;
  }
}

async function run() {
  const keys = Object.keys(productMap);
  console.log(`Starting download of ${keys.length} matched product images...`);
  let success = 0;
  let fail = 0;

  for (let i = 0; i < keys.length; i++) {
    const id = keys[i];
    const url = productMap[id];
    const ok = await downloadImage(id, url);
    if (ok) success++;
    else fail++;
  }

  console.log(`\n========================================`);
  console.log(`Download finished! Success: ${success}, Failed: ${fail}, Total: ${keys.length}`);
  console.log(`========================================`);
}

run();
