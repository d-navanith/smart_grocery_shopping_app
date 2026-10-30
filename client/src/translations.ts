export type Language = 'en' | 'si' | 'ro';

export interface TranslationDictionary {
  // Top bar
  hotlineLabel: string;
  announcement: string;
  tourBtn: string;
  themeLight: string;
  themeDark: string;

  // Header Nav
  storeSubtitle: string;
  deliverToLabel: string;
  deliverToValue: string;
  searchPlaceholder: string;
  wishlistTooltip: string;
  myCart: string;
  freeDeliveryBadge: string;
  allCategories: string;
  browseCategories: string;

  // Main Tabs
  tabHome: string;
  tabShop: string;
  tabRice: string;
  tabVegetables: string;
  tabSpices: string;
  tabCart: string;
  tabRecipes: string;

  // Categories
  catAll: string;
  catRice: string;
  catVeg: string;
  catSpices: string;
  catDairy: string;
  catBakery: string;
  catTea: string;
  catSnacks: string;

  // Shop View
  breadcrumbHome: string;
  breadcrumbShop: string;
  depotNotice: string;
  filtersTitle: string;
  filterCategories: string;
  filterPriceRange: string;
  filterRating: string;
  filterBrands: string;
  filterStockOnly: string;
  clearFilters: string;
  showingCount: string;
  sortByLabel: string;
  sortFeatured: string;
  sortPriceLow: string;
  sortPriceHigh: string;
  sortRating: string;
  noProductsMatch: string;
  resetFiltersBtn: string;
  addToCart: string;
  codBadge: string;
  ceylonExport: string;
  weightGramaj: string;

  // Cart View
  cartTitle: string;
  cartSubtitle: string;
  cartBreadcrumb: string;
  tableProduct: string;
  tablePrice: string;
  tableQuantity: string;
  tableSubtotal: string;
  organicBadge: string;
  clearCart: string;
  continueShopping: string;
  applyCoupon: string;
  couponPlaceholder: string;
  couponApplied: string;
  removeCoupon: string;
  emptyCartTitle: string;
  emptyCartDesc: string;
  startShoppingBtn: string;

  // Delivery & Checkout
  checkoutTitle: string;
  shippingAddressTitle: string;
  streetLabel: string;
  streetPlaceholder: string;
  buildingDetailsLabel: string;
  buildingPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  selectZoneTitle: string;
  courierRates: string;
  paymentMethodTitle: string;
  codOptionTitle: string;
  codOptionDesc: string;
  recommendedTag: string;
  orderSummaryTitle: string;
  subtotalLabel: string;
  deliveryFeeLabel: string;
  freeLabel: string;
  discountLabel: string;
  totalToPayLabel: string;
  placeOrderBtn: string;
  processingOrderBtn: string;
  howDeliveryWorksTitle: string;
  howDeliveryWorksStep1: string;
  howDeliveryWorksStep2: string;
  howDeliveryWorksStep3: string;

  // Modals & Tracking
  trackingTitle: string;
  trackingSubtitle: string;
  orderStatusPlaced: string;
  orderStatusProcessing: string;
  orderStatusDispatched: string;
  orderStatusDelivered: string;
  courierAssigned: string;
  pickupEta: string;
  deliveryEta: string;
  cashAmountToPrepare: string;
  closeBtn: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  heroShopBtn: string;
  heroCodNotice: string;
  featureRiceTitle: string;
  featureRiceDesc: string;
  featureVegTitle: string;
  featureVegDesc: string;
  featureSpicesTitle: string;
  featureSpicesDesc: string;
  featureDeliveryTitle: string;
  featureDeliveryDesc: string;

  // Footer
  footerAboutTitle: string;
  footerAboutDesc: string;
  footerContactTitle: string;
  footerAddress: string;
  footerHours: string;
  footerPaymentTitle: string;
  footerRights: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    // Top bar
    hotlineLabel: 'Bucharest Hub Hotline:',
    announcement: '🇱🇰 🇷🇴 Authentic Sri Lankan Groceries in Romania — Cash on Delivery across Bucharest & Nationwide!',
    tourBtn: 'Ayubowan (Tour)',
    themeLight: 'Light',
    themeDark: 'Dark',

    // Header Nav
    storeSubtitle: 'Romania Supermarket • Authentic Sri Lankan Staples',
    deliverToLabel: 'Delivery Across Romania',
    deliverToValue: 'Bucharest & Nationwide ▾',
    searchPlaceholder: 'Search white rice, red rice, brinjal, Ceylon spices, Dilmah tea...',
    wishlistTooltip: 'Wishlist',
    myCart: 'My Cart',
    freeDeliveryBadge: 'Free Delivery Over 250 lei',
    allCategories: 'All Categories',
    browseCategories: 'All Categories (Browse)',

    // Main Tabs
    tabHome: 'Home',
    tabShop: 'Grocery Shop',
    tabRice: 'Rice & Grains',
    tabVegetables: 'Veggies & Brinjal',
    tabSpices: 'Ceylon Spices',
    tabCart: 'Shopping Cart',
    tabRecipes: 'AI Chef Recipes',

    // Categories
    catAll: 'All Products',
    catRice: 'White Rice, Red Rice & Dhal',
    catVeg: 'Brinjal & Fresh Vegetables',
    catSpices: 'Ceylon Spices & Coconut',
    catDairy: 'Dairy & Fresh Eggs',
    catBakery: 'Bakery & Roast Paan',
    catTea: 'Dilmah Ceylon Tea & Drinks',
    catSnacks: 'Munchee & Maliban Biscuits',

    // Shop View
    breadcrumbHome: 'Home',
    breadcrumbShop: 'Sri Lankan Grocery Shop Romania',
    depotNotice: 'Bucharest Central Hub • Cash on Delivery Guaranteed',
    filtersTitle: 'Filter Products',
    filterCategories: 'Food Categories',
    filterPriceRange: 'Price Range (lei)',
    filterRating: 'Rating & Reviews',
    filterBrands: 'Authentic Ceylon Brands',
    filterStockOnly: 'In Stock Only',
    clearFilters: 'Clear All Filters',
    showingCount: 'Showing: {count} products',
    sortByLabel: 'Sort by:',
    sortFeatured: 'Recommended (Featured)',
    sortPriceLow: 'Price: Low to High',
    sortPriceHigh: 'Price: High to Low',
    sortRating: 'Customer Rating',
    noProductsMatch: 'No products match your selected filters',
    resetFiltersBtn: 'Reset Filters',
    addToCart: 'Add to Cart',
    codBadge: 'Cash on Delivery',
    ceylonExport: 'CEYLON EXPORT',
    weightGramaj: 'Weight:',

    // Cart View
    cartTitle: 'Shopping Cart & Cash on Delivery',
    cartSubtitle: 'Fast Courier Delivery in Bucharest & Ilfov • Pay Cash at Doorstep',
    cartBreadcrumb: 'Shopping Cart & Checkout',
    tableProduct: 'FOOD ITEM',
    tablePrice: 'PRICE',
    tableQuantity: 'QTY',
    tableSubtotal: 'SUBTOTAL',
    organicBadge: '100% AUTHENTIC CEYLON EXPORT',
    clearCart: 'Clear Cart',
    continueShopping: 'Continue Shopping →',
    applyCoupon: 'Apply Coupon',
    couponPlaceholder: 'Coupon code (e.g. CEYLON10)',
    couponApplied: 'Coupon applied successfully',
    removeCoupon: 'Remove',
    emptyCartTitle: 'Your Cart is Currently Empty',
    emptyCartDesc: 'Add authentic white rice, red rice, brinjal, or Ceylon spices to start your order.',
    startShoppingBtn: 'Start Shopping Now',

    // Delivery & Checkout
    checkoutTitle: 'COMPLETE ORDER & DELIVERY',
    shippingAddressTitle: 'DELIVERY ADDRESS IN ROMANIA',
    streetLabel: 'Street Name & House Number:',
    streetPlaceholder: 'e.g. Strada Mihai Eminescu nr. 42',
    buildingDetailsLabel: 'Building / Block / Entrance / Apt / Intercom:',
    buildingPlaceholder: 'e.g. Bloc 12, Scara A, Ap. 14, Interfon 14',
    phoneLabel: 'Contact Phone Number (For Delivery Rider):',
    phonePlaceholder: '+40 722 456 789',
    selectZoneTitle: 'DELIVERY ZONE (COURIER DISPATCH)',
    courierRates: 'Courier Rates',
    paymentMethodTitle: 'PAYMENT METHOD',
    codOptionTitle: '💵 Cash on Delivery (Plata la Livrare / Ramburs)',
    codOptionDesc: 'Pay in cash directly to the courier rider when the parcel arrives at your door.',
    recommendedTag: 'RECOMMENDED',
    orderSummaryTitle: 'ORDER SUMMARY',
    subtotalLabel: 'Cart Subtotal',
    deliveryFeeLabel: 'Delivery Fee',
    freeLabel: 'FREE',
    discountLabel: 'Discount Promo',
    totalToPayLabel: 'Total to Pay on Delivery:',
    placeOrderBtn: 'Place Order with Cash on Delivery',
    processingOrderBtn: 'Registering Order...',
    howDeliveryWorksTitle: 'How Delivery Works in Romania:',
    howDeliveryWorksStep1: '1. Place your order with Cash on Delivery (no advance payment needed).',
    howDeliveryWorksStep2: '2. Our Bucharest supermarket packs the items and calls the courier (Glovo / Bolt / Sameday).',
    howDeliveryWorksStep3: '3. The rider picks up the parcel within minutes and brings it to your door.',

    // Modals & Tracking
    trackingTitle: 'LIVE ORDER & COURIER TRACKING',
    trackingSubtitle: 'Ceylon Foods Supermarket Bucharest Dispatch Portal',
    orderStatusPlaced: '1. Order Received',
    orderStatusProcessing: '2. Packing in Bucharest Store',
    orderStatusDispatched: '3. Courier Dispatched to Doorstep',
    orderStatusDelivered: '4. Successfully Delivered',
    courierAssigned: 'Assigned Courier Service:',
    pickupEta: 'Store Pickup ETA:',
    deliveryEta: 'Doorstep Delivery ETA:',
    cashAmountToPrepare: 'Cash Amount to Prepare for Courier:',
    closeBtn: 'Close',

    // Hero Section
    heroBadge: '🇱🇰 DIRECTLY IMPORTED FROM SRI LANKA TO ROMANIA 🇷🇴',
    heroTitle1: 'Taste of Home:',
    heroTitle2: 'Daily Ceylon Groceries in Bucharest',
    heroDescription: 'Authentic Araliya Keeri Samba white rice, Rathu Kekulu red rice, fresh wambatu (purple brinjal), roasted curry powder, Mysore dhal, and Dilmah Ceylon tea delivered to your doorstep with Cash on Delivery.',
    heroShopBtn: 'Shop Ceylon Groceries Now',
    heroCodNotice: '💵 Cash on Delivery Available Across Bucharest & Romania',
    featureRiceTitle: 'Araliya Samba & Red Rice',
    featureRiceDesc: 'Burlap sacks of fragrant daily rice.',
    featureVegTitle: 'Fresh Wambatu & Okra',
    featureVegDesc: 'Air-shipped authentic green veggies.',
    featureSpicesTitle: 'Roasted Ceylon Curry Spices',
    featureSpicesDesc: 'True cinnamon, black pepper, and curry leaves.',
    featureDeliveryTitle: 'Express Courier Dispatch',
    featureDeliveryDesc: 'Glovo, Bolt & Sameday door delivery.',

    // Footer
    footerAboutTitle: 'Ceylon Foods Supermarket',
    footerAboutDesc: 'Romania’s dedicated grocery platform connecting the Sri Lankan community and Romanian food lovers with 100% authentic imported Ceylon essentials.',
    footerContactTitle: 'Bucharest Store & Warehouse',
    footerAddress: 'Strada Academiei 14, Sector 1, Bucharest, Romania',
    footerHours: 'Monday – Sunday: 08:00 – 21:00 EET',
    footerPaymentTitle: 'Safe & Convenient Payment',
    footerRights: '© 2026 Ceylon Foods Supermarket Romania. All rights reserved.'
  },

  si: {
    // Top bar
    hotlineLabel: 'බුකාරෙස්ට් ක්ෂණික ඇමතුම්:',
    announcement: '🇱🇰 🇷🇴 රුමේනියාවේ ජීවත්වන ශ්‍රී ලාංකිකයින් සඳහා අව්‍යාජ ලංකා ආහාර ද්‍රව්‍ය — නිවසටම ගෙන්වා මුදල් ගෙවන්න (Cash on Delivery)!',
    tourBtn: 'ආයුබෝවන් (තොරතුරු)',
    themeLight: 'ආලෝක',
    themeDark: 'අඳුරු',

    // Header Nav
    storeSubtitle: 'රුමේනියාවේ ලංකා සුපිරි වෙළඳසැල • දෛනික ආහාර ද්‍රව්‍ය',
    deliverToLabel: 'රුමේනියාව පුරා බෙදාහැරීම',
    deliverToValue: 'බුකාරෙස්ට් සහ දිවයින පුරා ▾',
    searchPlaceholder: 'සුදු කැකුළු, රතු කැකුළු සහල්, වම්බටු, පරිප්පු, තුනපහ, තේ සොයන්න...',
    wishlistTooltip: 'කැමති දෑ ලැයිස්තුව',
    myCart: 'මගේ කරත්තය',
    freeDeliveryBadge: 'lei 250 ට වැඩි ඇණවුම් සඳහා නොමිලේ බෙදාහැරීම',
    allCategories: 'සියලුම කාණ්ඩ',
    browseCategories: 'සියලුම කාණ්ඩ (තෝරන්න)',

    // Main Tabs
    tabHome: 'මුල් පිටුව',
    tabShop: 'වෙළඳසැල',
    tabRice: 'සහල් සහ ධාන්‍ය',
    tabVegetables: 'එළවළු සහ වම්බටු',
    tabSpices: 'ලංකා තුනපහ',
    tabCart: 'සාප්පු සවාරි කරත්තය',
    tabRecipes: 'AI කෝකි වට්ටෝරු',

    // Categories
    catAll: 'සියලුම නිෂ්පාදන',
    catRice: 'සුදු කැකුළු, රතු සහල් සහ පරිප්පු',
    catVeg: 'නැවුම් වම්බටු සහ එළවළු',
    catSpices: 'ලංකා කුළුබඩු සහ පොල් කිරි',
    catDairy: 'කිරි සහ බිත්තර',
    catBakery: 'බේකරි සහ රෝස් පාන්',
    catTea: 'දිල්මා ලංකා තේ සහ බීම වර්ග',
    catSnacks: 'මැන්චී සහ මැලිබන් බිස්කට්',

    // Shop View
    breadcrumbHome: 'මුල් පිටුව',
    breadcrumbShop: 'රුමේනියාවේ ලංකා ආහාර වෙළඳසැල',
    depotNotice: 'බුකාරෙස්ට් මධ්‍යම ගබඩාව • භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීම (COD)',
    filtersTitle: 'නිෂ්පාදන පෙරහන්',
    filterCategories: 'ආහාර වර්ග',
    filterPriceRange: 'මිල පරාසය (lei)',
    filterRating: 'පාරිභෝගික ශ්‍රේණිගත කිරීම්',
    filterBrands: 'විශ්වාසනීය ලංකා සන්නාම',
    filterStockOnly: 'තොග ඇති දෑ පමණි',
    clearFilters: 'සියලු පෙරහන් ඉවත් කරන්න',
    showingCount: 'පෙන්වන්නේ: භාණ්ඩ {count} කි',
    sortByLabel: 'පිළිවෙල සකසන්න:',
    sortFeatured: 'විශේෂ නිර්දේශිත',
    sortPriceLow: 'මිල: අඩු සිට වැඩි',
    sortPriceHigh: 'මිල: වැඩි සිට අඩු',
    sortRating: 'ඉහළම ශ්‍රේණිගත කිරීම්',
    noProductsMatch: 'ඔබ තෝරාගත් පෙරහන් වලට අදාළ භාණ්ඩ හමු නොවීය',
    resetFiltersBtn: 'නැවත සකසන්න',
    addToCart: 'කරත්තයට එක් කරන්න',
    codBadge: 'භාණ්ඩ ලැබුණු පසු ගෙවීම',
    ceylonExport: 'ලංකාවෙන් ආනයනය කළ',
    weightGramaj: 'බර ප්‍රමාණය:',

    // Cart View
    cartTitle: 'සාප්පු සවාරි කරත්තය සහ ගෙවීම්',
    cartSubtitle: 'බුකාරෙස්ට් සහ ඉල්ෆොව් වෙත වේගවත් ධාවක සේවාව • ගෙදරටම ලැබුණු පසු මුදල් ගෙවන්න',
    cartBreadcrumb: 'කරත්තය සහ ඇණවුම් කිරීම',
    tableProduct: 'ආහාර ද්‍රව්‍යය',
    tablePrice: 'මිල',
    tableQuantity: 'ප්‍රමාණය',
    tableSubtotal: 'එකතුව',
    organicBadge: '100% අව්‍යාජ ශ්‍රී ලාංකික අපනයන',
    clearCart: 'කරත්තය හිස් කරන්න',
    continueShopping: 'තවදුරටත් සාප්පු යන්න →',
    applyCoupon: 'කූපනය යොදන්න',
    couponPlaceholder: 'කූපන් කේතය (උදා: CEYLON10)',
    couponApplied: 'කූපන් වට්ටම සාර්ථකව ලැබිණි',
    removeCoupon: 'ඉවත් කරන්න',
    emptyCartTitle: 'ඔබගේ කරත්තය හිස්ව පවතී',
    emptyCartDesc: 'ඇණවුම ආරම්භ කිරීමට රසවත් සුදු සහල්, රතු කැකුළු, වම්බටු හෝ ලංකා තුනපහ එක්කරන්න.',
    startShoppingBtn: 'සාප්පු සවාරි ආරම්භ කරන්න',

    // Delivery & Checkout
    checkoutTitle: 'ඇණවුම තහවුරු කිරීම සහ බෙදාහැරීම',
    shippingAddressTitle: 'රුමේනියාවේ ඔබගේ ලිපිනය',
    streetLabel: 'වීදියේ නම සහ අංකය:',
    streetPlaceholder: 'උදා: Strada Mihai Eminescu nr. 42',
    buildingDetailsLabel: 'ගොඩනැගිල්ල / බ්ලොක් / ඇතුල්වීම / නිවාස අංකය:',
    buildingPlaceholder: 'උදා: Bloc 12, Scara A, Ap. 14, Interfon 14',
    phoneLabel: 'දුරකථන අංකය (ධාවකයා සඳහා):',
    phonePlaceholder: '+40 722 456 789',
    selectZoneTitle: 'බෙදාහැරීමේ කලාපය තෝරන්න',
    courierRates: 'ධාවක ගාස්තු',
    paymentMethodTitle: 'ගෙවීම් ක්‍රමය',
    codOptionTitle: '💵 භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීම (Cash on Delivery)',
    codOptionDesc: 'භාණ්ඩ පාර්සලය ඔබගේ දොරකඩටම ගෙනා පසු ධාවකයාට මුදලින් ගෙවන්න.',
    recommendedTag: 'වඩාත් සුදුසුයි',
    orderSummaryTitle: 'ඇණවුම් සාරාංශය',
    subtotalLabel: 'භාණ්ඩ වල එකතුව',
    deliveryFeeLabel: 'බෙදාහැරීමේ ගාස්තුව',
    freeLabel: 'නොමිලේ',
    discountLabel: 'කූපන් වට්ටම',
    totalToPayLabel: 'ගෙවිය යුතු සම්පූර්ණ මුදල:',
    placeOrderBtn: 'භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීමට ඇණවුම් කරන්න',
    processingOrderBtn: 'ඇණවුම සකසමින් පවතී...',
    howDeliveryWorksTitle: 'රුමේනියාවේ බෙදාහැරීම සිදුවන ආකාරය:',
    howDeliveryWorksStep1: '1. මුලින් මුදල් නොගෙවා භාණ්ඩ ලැබුණු පසු ගෙවීමේ (COD) ක්‍රමයට ඇණවුම් කරන්න.',
    howDeliveryWorksStep2: '2. අපගේ බුකාරෙස්ට් වෙළඳසැල භාණ්ඩ අසුරා Glovo / Bolt / Sameday ධාවකයින් කැඳවයි.',
    howDeliveryWorksStep3: '3. ධාවකයා විනාඩි කිහිපයකින් පාර්සලය රැගෙන ඔබගේ නිවසටම භාරදෙයි.',

    // Modals & Tracking
    trackingTitle: 'සජීවී ඇණවුම් සහ ධාවක ලුහුබැඳීම',
    trackingSubtitle: 'Ceylon Foods Supermarket බුකාරෙස්ට් මෙහෙයුම් පද්ධතිය',
    orderStatusPlaced: '1. ඇණවුම භාරගන්නා ලදී',
    orderStatusProcessing: '2. වෙළඳසැලේ අසුරමින් පවතී',
    orderStatusDispatched: '3. ධාවකයා නිවස බලා පිටත්ව ඇත',
    orderStatusDelivered: '4. සාර්ථකව භාරදෙන ලදී',
    courierAssigned: 'පැවරුණු ධාවක සේවාව:',
    pickupEta: 'වෙළඳසැලෙන් ලබාගැනීමේ කාලය:',
    deliveryEta: 'නිවසටම ගෙන ඒමේ කාලය:',
    cashAmountToPrepare: 'ධාවකයාට ගෙවීමට සූදානම් කරගත යුතු මුදල:',
    closeBtn: 'වසන්න',

    // Hero Section
    heroBadge: '🇱🇰 ශ්‍රී ලංකාවෙන් සෘජුවම රුමේනියාවට ආනයනය කළ 🇷🇴',
    heroTitle1: 'මව්බිමේ රසය:',
    heroTitle2: 'දෛනික ලංකා ආහාර දැන් රුමේනියාවේ',
    heroDescription: 'අරලිය කීරි සම්බා, රතු කැකුළු සහල්, නැවුම් වම්බටු, ලංකා බැදපු තුනපහ, මයිසූර් පරිප්පු සහ දිල්මා තේ දැන් ඔබගේ නිවසටම ගෙන්වා මුදල් ගෙවිය හැක.',
    heroShopBtn: 'දැන්ම ආහාර ඇණවුම් කරන්න',
    heroCodNotice: '💵 බුකාරෙස්ට් සහ රුමේනියාව පුරා භාණ්ඩ ලැබුණු පසු ගෙවීම් ලබාගත හැක',
    featureRiceTitle: 'කීරි සම්බා සහ රතු කැකුළු',
    featureRiceDesc: 'සුවඳැති ගෝණි බෑග් වල ඇසුරූ නැවුම් සහල්.',
    featureVegTitle: 'නැවුම් වම්බටු සහ බණ්ඩක්කා',
    featureVegDesc: 'ගුවන් මගින් ගෙන්වන දේශීය එළවළු.',
    featureSpicesTitle: 'ලංකා බැදපු තුනපහ කුඩු',
    featureSpicesDesc: 'සැබෑ කුරුඳු, ගම්මිරිස් සහ කරපිංචා.',
    featureDeliveryTitle: 'ක්ෂණික ධාවක සේවාව',
    featureDeliveryDesc: 'Glovo, Bolt සහ Sameday මගින් නිවසටම.',

    // Footer
    footerAboutTitle: 'Ceylon Foods Supermarket',
    footerAboutDesc: 'රුමේනියාවේ වෙසෙන ශ්‍රී ලාංකික ප්‍රජාවට සහ රුමේනියානු පාරිභෝගිකයින්ට 100% අව්‍යාජ ලංකා ආහාර සපයන නිල වෙළඳ ජාලය.',
    footerContactTitle: 'බුකාරෙස්ට් ප්‍රධාන ගබඩාව',
    footerAddress: 'Strada Academiei 14, Sector 1, Bucharest, Romania',
    footerHours: 'සඳුදා – ඉරිදා: පෙ.ව 08:00 – ප.ව 21:00 EET',
    footerPaymentTitle: 'ආරක්ෂිත සහ පහසු ගෙවීම්',
    footerRights: '© 2026 Ceylon Foods Supermarket Romania. සියලුම හිමිකම් ඇවිරිණි.'
  },

  ro: {
    // Top bar
    hotlineLabel: 'Hotline Hub București:',
    announcement: '🇷🇴 🇱🇰 Autentice Alimente din Sri Lanka în România — Plata la Livrare (Cash on Delivery) în București & Toată Țara!',
    tourBtn: 'ආයුබෝවන් (Tur Ghidat)',
    themeLight: 'Luminos',
    themeDark: 'Întunecat',

    // Header Nav
    storeSubtitle: 'Supermarket România • Alimente Autentice din Sri Lanka',
    deliverToLabel: 'Livrare În România',
    deliverToValue: 'București & Național ▾',
    searchPlaceholder: 'Caută orez alb, orez roșu, wambatu, condimente de Ceylon, ceai...',
    wishlistTooltip: 'Favorite',
    myCart: 'Coșul Meu',
    freeDeliveryBadge: 'Livrare Gratuită peste 250 lei',
    allCategories: 'Toate Categoriile',
    browseCategories: 'Toate Categoriile (Browse)',

    // Main Tabs
    tabHome: 'Acasă',
    tabShop: 'Magazin Alimentar',
    tabRice: 'Orez & Cereale',
    tabVegetables: 'Legume & Wambatu',
    tabSpices: 'Condimente Ceylon',
    tabCart: 'Coș de Cumpărături',
    tabRecipes: 'Rețete AI Chef',

    // Categories
    catAll: 'Toate Produsele',
    catRice: 'Orez Alb, Orez Roșu & Dhal',
    catVeg: 'Wambatu & Legume Proaspete',
    catSpices: 'Condimente de Ceylon & Pol',
    catDairy: 'Lactate & Ouă Proaspete',
    catBakery: 'Brutărie & Roast Paan',
    catTea: 'Ceai Dilmah Ceylon & Băuturi',
    catSnacks: 'Biscuiți Munchee & Maliban',

    // Shop View
    breadcrumbHome: 'Acasă',
    breadcrumbShop: 'Magazin Alimentar România',
    depotNotice: 'Depozit Central București • Plata la Livrare (Cash on Delivery)',
    filtersTitle: 'Filtre Produse',
    filterCategories: 'Categorii Alimente',
    filterPriceRange: 'Interval Preț (lei)',
    filterRating: 'Rating & Recenzii',
    filterBrands: 'Mărci Tradiționale Sri Lanka',
    filterStockOnly: 'Doar în Stoc',
    clearFilters: 'Resetează Toate Filtrele',
    showingCount: 'Afișate: {count} produse',
    sortByLabel: 'Sortare:',
    sortFeatured: 'Recomandate (Featured)',
    sortPriceLow: 'Preț: Mic la Mare',
    sortPriceHigh: 'Preț: Mare la Mic',
    sortRating: 'Rating Clienți',
    noProductsMatch: 'Niciun produs nu corespunde filtrelor selectate',
    resetFiltersBtn: 'Resetează Filtrele',
    addToCart: '+ Adaugă',
    codBadge: 'Plata la Livrare (Cash)',
    ceylonExport: 'CEYLON EXPORT',
    weightGramaj: 'Gramaj:',

    // Cart View
    cartTitle: 'Coș de Cumpărături & Plata la Livrare',
    cartSubtitle: 'Livrare Rapidă prin Curieri în București & Județul Ilfov • Plata Cash la Ușă',
    cartBreadcrumb: 'Coș de Cumpărături & Plata la Livrare',
    tableProduct: 'PRODUS ALIMENTAR',
    tablePrice: 'PREȚ',
    tableQuantity: 'CANTITATE',
    tableSubtotal: 'SUBTOTAL',
    organicBadge: '100% EXPORT AUTENTIC DIN SRI LANKA',
    clearCart: 'Golește Coșul',
    continueShopping: 'Continuă Cumpărăturile →',
    applyCoupon: 'Aplică Cupon',
    couponPlaceholder: 'Cod cupon (ex: CEYLON10)',
    couponApplied: 'Cupon CEYLON10 aplicat cu succes',
    removeCoupon: 'Elimină',
    emptyCartTitle: 'Coșul Tău este Momentan Gol',
    emptyCartDesc: 'Adaugă orez alb la sac, orez roșu, wambatu sau condimente de Ceylon pentru a plasa comanda.',
    startShoppingBtn: 'Explorează Magazinul',

    // Delivery & Checkout
    checkoutTitle: 'FINALIZARE COMANDĂ & LIVRARE',
    shippingAddressTitle: 'ADRESĂ DE LIVRARE ÎN ROMÂNIA',
    streetLabel: 'Strada și Numărul:',
    streetPlaceholder: 'ex: Strada Mihai Eminescu nr. 42',
    buildingDetailsLabel: 'Detalii Bloc / Scară / Ap / Interfon:',
    buildingPlaceholder: 'ex: Bloc 12, Scara A, Ap. 14, Interfon 14',
    phoneLabel: 'Telefon Contact (pentru Curier):',
    phonePlaceholder: '+40 722 456 789',
    selectZoneTitle: 'ZONĂ / ORAȘ LIVRARE',
    courierRates: 'Tarife Curier',
    paymentMethodTitle: 'METODĂ DE PLATĂ (PAYMENT METHOD)',
    codOptionTitle: '💵 Plata la Livrare (Cash on Delivery / Ramburs)',
    codOptionDesc: 'Plătiți în numerar (cash) direct curierului la primirea coletului la ușa dumneavoastră.',
    recommendedTag: 'RECOMANDAT',
    orderSummaryTitle: 'SUMAR COMANDĂ',
    subtotalLabel: 'Subtotal Coș',
    deliveryFeeLabel: 'Taxă de Livrare',
    freeLabel: 'GRATUIT',
    discountLabel: 'Reducere Cupon',
    totalToPayLabel: 'Total de Plată la Livrare:',
    placeOrderBtn: 'Plasează Comanda cu Plata la Livrare',
    processingOrderBtn: 'Se Înregistrează Comanda...',
    howDeliveryWorksTitle: 'Cum funcționează livrarea în România (Delivery Workflow):',
    howDeliveryWorksStep1: '1. Plasați comanda cu Plata la Livrare (fără plată în avans).',
    howDeliveryWorksStep2: '2. Supermarketul din București împachetează produsele și apelează compania de livrare (Glovo / Bolt / Sameday).',
    howDeliveryWorksStep3: '3. Curierul preia pachetul și îl livrează rapid la adresa dumneavoastră.',

    // Modals & Tracking
    trackingTitle: 'URMĂRIRE LIVE COMANDĂ ȘI CURIER',
    trackingSubtitle: 'Dispecerat Ceylon Foods Supermarket București',
    orderStatusPlaced: '1. Comandă Primită',
    orderStatusProcessing: '2. Se Împachetează în Magazin',
    orderStatusDispatched: '3. Curier în Traseu spre Ușă',
    orderStatusDelivered: '4. Livrat cu Succes',
    courierAssigned: 'Companie de Curierat Alocată:',
    pickupEta: 'Timp Ridicare de la Depozit:',
    deliveryEta: 'Timp Livrare la Adresă:',
    cashAmountToPrepare: 'Sumă Cash de Pregătit pentru Curier:',
    closeBtn: 'Închide',

    // Hero Section
    heroBadge: '🇱🇰 IMPORT DIRECT DIN SRI LANKA ÎN ROMÂNIA 🇷🇴',
    heroTitle1: 'Gustul Autentic de Acasă:',
    heroTitle2: 'Alimente din Sri Lanka în București',
    heroDescription: 'Orez alb Araliya Keeri Samba la sac, orez roșu tradițional, vinete wambatu proaspete, condimente Ceylon prăjite, linte roșie dhal și ceai Dilmah cu livrare rapidă și Plata la Livrare.',
    heroShopBtn: 'Cumpără Alimente din Sri Lanka',
    heroCodNotice: '💵 Plata la Livrare (Cash) Disponibilă în București și Național',
    featureRiceTitle: 'Orez Samba & Orez Roșu',
    featureRiceDesc: 'Saci de iută tradiționali cu orez aromat.',
    featureVegTitle: 'Wambatu & Okra Proaspete',
    featureVegDesc: 'Legume exotice aduse pe calea aerului.',
    featureSpicesTitle: 'Condimente Ceylon Prăjite',
    featureSpicesDesc: 'Scorțișoară adevărată, piper și curry leaves.',
    featureDeliveryTitle: 'Curieri Rapizi București',
    featureDeliveryDesc: 'Glovo, Bolt și Sameday direct la ușă.',

    // Footer
    footerAboutTitle: 'Ceylon Foods Supermarket',
    footerAboutDesc: 'Platforma oficială din România dedicată comunității din Sri Lanka și pasionaților de bucătărie asiatică, oferind ingrediente 100% autentice importate direct.',
    footerContactTitle: 'Magazin & Depozit Central București',
    footerAddress: 'Strada Academiei 14, Sector 1, București, România',
    footerHours: 'Luni – Duminică: 08:00 – 21:00 EET',
    footerPaymentTitle: 'Plată Sigură & Flexibilă',
    footerRights: '© 2026 Ceylon Foods Supermarket România. Toate drepturile rezervate.'
  }
};

export const LANGUAGE_OPTIONS: { code: Language; label: string; nativeName: string; flag: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English (EN)', flag: '🇬🇧' },
  { code: 'si', label: 'Sinhala', nativeName: 'සිංහල (Sinhala)', flag: '🇱🇰' },
  { code: 'ro', label: 'Romanian', nativeName: 'Română (Romanian)', flag: '🇷🇴' }
];
