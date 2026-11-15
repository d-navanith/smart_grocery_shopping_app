const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const targetDir = path.join(__dirname, '..', 'client', 'public', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const items = [
  {
    key: 'prod-pears-baby-cologne',
    ext: '.jpg',
    url: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/600-600/112060--01--1755069628.jpeg'
  },
  {
    key: 'prod-baby-cheramy-soap',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Baby-Cheramy-Baby-Soap-Classic-100g-1-Bar-Soap-Ceylon-Supermart.jpg?v=1641249034'
  },
  {
    key: 'prod-kithul-treacle',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_da73c045-2ded-4ff9-a7e3-ab54d9512cab.jpg?v=1676207420'
  },
  {
    key: 'prod-kithul-jaggery',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/1_4_f46ed9bf-aa51-432b-b17e-0dac6c58d66e.jpg?v=1712611460'
  },
  {
    key: 'prod-asamodagam-spirit',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/1_82f7d75c-1f94-4bc4-90c0-d4e8a74014f9.jpg?v=1701522682'
  },
  {
    key: 'prod-samahan',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Link-Samahan-10-Pack-Box-1-Herbal-Drinks-Ceylon-Supermart_b39ba264-54d6-460a-8a91-0b079e58dced.jpg?v=1662589848'
  },
  {
    key: 'prod-link-paspanguwa',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/Link-Natural-Enriched-Paspanguwa-Natural-Herbals-25g-1-Herbal-Drinks-Ceylon-Supermart.jpg?v=1660947557'
  },
  {
    key: 'prod-himalayan-pink-salt',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/files/1_d224e1dd-a4ff-468d-a82f-8c0c6e587614.jpg?v=1702237018'
  },
  {
    key: 'prod-dried-chilli-whole',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/TRS-Whole-Dried-Red-Chillies-150g-1-Whole-Spices-Ceylon-Supermart.jpg?v=1641246574'
  },
  {
    key: 'prod-samaposha',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_e85ca65b-d5cc-4d5a-b79e-46c3cbdd5de1.jpg?v=1660948123'
  },
  {
    key: 'prod-yahaposha',
    ext: '.jpg',
    url: 'https://static2.kapruka.com/product-image/width=700,quality=93,f=auto/shops/specialGifts/additionalImages/large/1606635526868_1.jpg'
  },
  {
    key: 'prod-chicken-biriyani-masala',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_6a1bc8da-56a9-4464-b4fd-af6781d14c5c.jpg?v=1655385851'
  },
  {
    key: 'prod-elephant-house-creamsoda',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_c3a37ac3-edf9-44cd-92d9-0920af9e4495.jpg?v=1676207052'
  },
  {
    key: 'prod-elephant-house-necto',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_3c83ccd8-f450-44c9-9f91-08b0e78c897a.jpg?v=1676207076'
  },
  {
    key: 'prod-elephant-house-ginger-beer',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_dc0c4989-a612-40d7-bd14-220bba053579.jpg?v=1676207064'
  },
  {
    key: 'prod-elephant-house-nelli-crush',
    ext: '.png',
    url: 'https://www.lakfood.com/cdn/shop/files/NelliCrush_2048x.png?v=1754511613'
  },
  {
    key: 'prod-alibaba-mango',
    ext: '.jpg',
    url: 'https://asianminimixromania.eu/wp-content/uploads/2026/08/209.jpg'
  },
  {
    key: 'prod-coconut-water',
    ext: '.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0043/9064/9974/products/1_826ed968-82e7-4b3a-8d2d-580de1d3119c.jpg?v=1661121178'
  },
  {
    key: 'prod-redbull',
    ext: '.png',
    url: 'https://www.nicepng.com/png/full/90-901410_product-image-red-bull-energy-drink-250ml-can.png'
  },
  {
    key: 'prod-hell-energy',
    ext: '.png',
    url: 'https://www.coffeeisland.gr/assets/img/product/HellEnergyClassic250ml.png'
  },
  {
    key: 'prod-pepsi',
    ext: '.png',
    url: 'https://pngimg.com/uploads/pepsi/pepsi_PNG8950.png'
  },
  {
    key: 'prod-falooda-mango',
    ext: '.jpg',
    url: 'https://malkah.eu/cdn/shop/files/malkah-mango-falooda-drink-290-ml-7812199.jpg'
  },
  {
    key: 'prod-falooda-almond',
    ext: '.jpg',
    url: 'https://malkah.eu/cdn/shop/files/malkah-almond-falooda-drink-290-ml-8043380.jpg'
  },
  {
    key: 'prod-falooda-vanilla',
    ext: '.jpg',
    url: 'https://malkah.eu/cdn/shop/files/malkah-vanilla-falooda-drink-290-ml-4188425.jpg'
  }
];

function downloadFile(fileUrl, outputPath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const isHttps = fileUrl.startsWith('https://');
    const client = isHttps ? https : http;

    const req = client.get(fileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': fileUrl
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(fileUrl);
          redirectUrl = new URL(redirectUrl, u.origin).href;
        }
        return resolve(downloadFile(redirectUrl, outputPath, redirectCount + 1));
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status: ${res.statusCode} for ${fileUrl}`));
      }

      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });
      fileStream.on('error', reject);
    });

    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function run() {
  console.log(`Starting download of ${items.length} new product images...`);
  const results = [];
  for (const item of items) {
    const destName = `${item.key}${item.ext}`;
    const destPath = path.join(targetDir, destName);
    try {
      await downloadFile(item.url, destPath);
      const stats = fs.statSync(destPath);
      console.log(`[SUCCESS] ${destName} (${stats.size} bytes)`);
      results.push({ key: item.key, file: destName, size: stats.size, ok: true });
    } catch(err) {
      console.error(`[FAIL] ${destName}: ${err.message}`);
      results.push({ key: item.key, file: destName, ok: false, error: err.message });
    }
  }

  const failed = results.filter(r => !r.ok || r.size < 500);
  console.log(`\nFinished: ${results.length - failed.length}/${results.length} succeeded.`);
  if (failed.length > 0) {
    console.log('Failed items:', failed);
  }
}

run();
