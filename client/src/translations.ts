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
  tabDeliveries: string;
  ongoingDeliveriesTitle: string;
  deliveryHistoryTitle: string;
  riderDirectCallLocked: string;
  riderDirectCallUnlocked: string;
  verifiedRiderBadge: string;
  adminVerificationNotice: string;
  callRiderButton: string;
  callRiderLockedButton: string;

  // Deliveries View Detailed Keys
  noOngoingDeliveriesTitle: string;
  noOngoingDeliveriesDesc: string;
  shopCeylonGroceriesBtn: string;
  orderNumberPrefix: string;
  orderPlacedAtPrefix: string;
  todayLabel: string;
  expressDeliveryTo: string;
  paymentCodBadge: string;
  paymentOnlineBadge: string;
  statusOutForDeliveryBadge: string;
  statusPackingBadge: string;
  realtimeStageTrackerTitle: string;
  step1OrderPlaced: string;
  step1OrderPlacedSub: string;
  step2Packing: string;
  step2PackingSub: string;
  step3DispatchCall: string;
  step3DispatchCallSub: string;
  step4RiderVerification: string;
  step4RiderWaitingSub: string;
  step4RiderConfirmedSub: string;
  step5OnTheWay: string;
  step5EtaPrefix: string;
  stepNumberPrefix: string;
  courierPartnerDirectContact: string;
  courierDefaultCompany: string;
  riderAllocatingBadge: string;
  riderCallLockedWarningTitle: string;
  riderCallLockedWarningDesc: string;
  riderCallLockedBtnTooltip: string;
  riderArrivingInMinutes: string;
  riderVerifiedBadge: string;
  riderDirectMobileLabel: string;
  riderDirectMobileVerifiedHint: string;
  riderCallDirectInstructions: string;
  riderEstimatedDoorEta: string;
  cashOnDeliveryExactAmountNotice: string;
  cashOnDeliveryPaymentTag: string;
  orderedFoodItemsHeader: string;
  deliveryDestinationAddress: string;
  deliveryNoteLabel: string;
  noHistoryDeliveriesTitle: string;
  noHistoryDeliveriesDesc: string;
  deliveredAndCollectedBadge: string;
  totalPaidCodLabel: string;
  purchasedItemsSummary: string;
  viewOfficialInvoiceBtn: string;
  reorderAgainBtn: string;
  invoiceModalStoreName: string;
  invoiceModalStoreAddress: string;
  invoiceModalDeliveryInvoice: string;
  invoiceModalDate: string;
  invoiceModalCustomer: string;
  invoiceModalPhone: string;
  invoiceModalPayment: string;
  invoiceModalTotalPaid: string;
  invoiceModalPrintBtn: string;
  invoiceModalCloseBtn: string;

  // Auth & Modals
  authModalTitle: string;
  authModalSubtitle: string;
  tabSignIn: string;
  tabRegister: string;
  emailLabel: string;
  passwordLabel: string;
  signInBtn: string;
  signingInBtn: string;
  fullNameLabel: string;
  deliveryAddressRoLabel: string;
  createAccountBtn: string;
  creatingAccountBtn: string;
  checkoutCartDrawerBtn: string;

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

  // Cultural Ribbon
  ribbonAuthentic: string;
  ribbonCentralDepot: string;
  ribbonDailyGroceries: string;
  ribbonCodCourier: string;

  // Popular section
  popularTitle: string;
  popularDesc: string;
  viewAllProducts: string;

  // Recipe kits
  recipeKitsTitle: string;
  recipeKitsDesc: string;
  recipeKit1Title: string;
  recipeKit1Desc: string;
  recipeKit2Title: string;
  recipeKit2Desc: string;
  addIngredientsBtn: string;

  // Footer Features Strip
  footerFeatureDelivery: string;
  footerFeatureDeliveryDesc: string;
  footerFeatureCod: string;
  footerFeatureCodDesc: string;
  footerFeaturePhone: string;
  footerFeaturePhoneDesc: string;
  footerFeatureExport: string;
  footerFeatureExportDesc: string;

  // Newsletter Strip
  newsletterTitle: string;
  newsletterDesc: string;
  newsletterPlaceholder: string;
  newsletterBtn: string;
  newsletterSubscribed: string;

  // Footer
  footerAboutTitle: string;
  footerAboutDesc: string;
  footerContactTitle: string;
  footerAddress: string;
  footerHours: string;
  footerPaymentTitle: string;
  footerRights: string;
  footerCourierInfoTitle: string;
  footerCourierItem1: string;
  footerCourierItem2: string;
  footerCourierItem3: string;
  footerCourierItem4: string;
  footerCourierItem5: string;
  footerOrderDispatch: string;

  // Wishlist
  wishlistTitle: string;
  wishlistSubtitle: string;
  wishlistEmptyTitle: string;
  wishlistEmptyDesc: string;
  wishlistStartShopping: string;
  wishlistMoveAllToCart: string;
  wishlistClearAll: string;
  wishlistInStock: string;
  wishlistOutOfStock: string;
  wishlistRemoveItem: string;
  wishlistAddToCart: string;
  wishlistRelatedTitle: string;
  wishlistRelatedSubtitle: string;

  // Checkout Page
  checkoutPageTitle: string;
  checkoutPageSubtitle: string;
  checkoutBreadcrumb: string;
  checkoutStepCart: string;
  checkoutStepDetails: string;
  checkoutStepPayment: string;
  checkoutStepCompleted: string;
  checkoutBillingTitle: string;
  checkoutFullName: string;
  checkoutPhone: string;
  checkoutPhoneHint: string;
  checkoutAddress: string;
  checkoutAddressPlaceholder: string;
  checkoutDeliveryZone: string;
  checkoutBuildingDetails: string;
  checkoutBuildingDetailsPlaceholder: string;
  checkoutDeliveryTimeTitle: string;
  checkoutSlotExpress: string;
  checkoutSlotEvening: string;
  checkoutSlotTomorrow: string;
  checkoutNotesTitle: string;
  checkoutNotesPlaceholder: string;
  checkoutPaymentTitle: string;
  checkoutCodTitle: string;
  checkoutCodDesc: string;
  checkoutCodCashChangeTitle: string;
  checkoutCodCashChangeHint: string;
  checkoutCodChangeLabel: string;
  checkoutCardOnDeliveryTitle: string;
  checkoutCardOnDeliveryDesc: string;
  checkoutOrderSummaryTitle: string;
  checkoutReviewItemsTitle: string;
  checkoutPlaceOrderBtn: string;
  checkoutPlacingOrderBtn: string;
  checkoutGuaranteeTitle: string;
  checkoutGuaranteeDesc: string;

  // Order Completed
  orderCompletedTitle: string;
  orderCompletedSubtitle: string;
  orderCompletedThankYou: string;
  orderCompletedRefNumber: string;
  orderCompletedCopyOrderNumber: string;
  orderCompletedCopied: string;
  orderCompletedNextStepsTitle: string;
  orderCompletedStep1: string;
  orderCompletedStep2: string;
  orderCompletedStep3: string;
  orderCompletedCodReminderTitle: string;
  orderCompletedCodReminderDesc: string;
  orderCompletedTrackOrderBtn: string;
  orderCompletedDeliveriesBtn: string;
  orderCompletedContinueShopBtn: string;
  orderCompletedInvoiceBtn: string;

  // Track Order Page
  trackOrderTitle: string;
  trackOrderSubtitle: string;
  trackOrderBreadcrumb: string;
  trackOrderSearchPlaceholder: string;
  trackOrderBtn: string;
  trackOrderEnterValidNumber: string;
  trackOrderNotFound: string;
  trackOrderNotFoundDesc: string;
  trackOrderRecentOrders: string;
  trackOrderQuickTrack: string;
  trackOrderLiveEtaTitle: string;
  trackOrderRouteBucharest: string;

  // Account Page
  accountTitle: string;
  accountBreadcrumb: string;
  accountTabPersonalInfo: string;
  accountTabMyOrders: string;
  accountTabAddresses: string;
  accountTabPaymentMethod: string;
  accountTabPassword: string;
  accountTabLogout: string;
  accountFirstName: string;
  accountLastName: string;
  accountEmail: string;
  accountPhone: string;
  accountGender: string;
  accountGenderMale: string;
  accountGenderFemale: string;
  accountGenderOther: string;
  accountAddressBookTitle: string;
  accountPrimaryAddress: string;
  accountUpdateChangesBtn: string;
  accountChangesSaved: string;
  accountCodPreferenceTitle: string;
  accountCodPreferenceDesc: string;
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
    searchPlaceholder: 'Search rice, brinjal, dhal, Ceylon spices...',
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
    tabDeliveries: 'My Deliveries',
    ongoingDeliveriesTitle: 'Ongoing Deliveries',
    deliveryHistoryTitle: 'Delivery History',
    riderDirectCallLocked: 'Direct call locked — waiting for store admin to verify delivery rider mobile upon store arrival.',
    riderDirectCallUnlocked: 'Store admin has verified rider mobile number. You may now call the rider directly.',
    verifiedRiderBadge: 'Admin Verified Rider',
    adminVerificationNotice: 'Supermarket admin is contacting courier fleet (Glovo/Bolt/Sameday). Direct rider call activates when rider arrives at supermarket & shares phone number.',
    callRiderButton: 'Call Delivery Rider',
    callRiderLockedButton: 'Call Rider (Awaiting Admin Verification)',

    // Deliveries View Detailed Keys
    noOngoingDeliveriesTitle: 'No ongoing deliveries right now',
    noOngoingDeliveriesDesc: 'All your Ceylon Foods packages have been delivered! Place a new order with red rice, fresh brinjal, dhal & Sri Lankan spices.',
    shopCeylonGroceriesBtn: 'Shop Ceylon Groceries Now →',
    orderNumberPrefix: 'Order',
    orderPlacedAtPrefix: 'Placed',
    todayLabel: 'Today',
    expressDeliveryTo: 'Express Delivery to',
    paymentCodBadge: '💵 Cash on Delivery (Pay at Door)',
    paymentOnlineBadge: '💳 Paid Online',
    statusOutForDeliveryBadge: '🚀 Out for Delivery to You',
    statusPackingBadge: '📦 Packing in Store',
    realtimeStageTrackerTitle: 'Real-Time Delivery Stages (Supermarket ➔ Courier ➔ Your Door):',
    step1OrderPlaced: 'Order Confirmed',
    step1OrderPlacedSub: 'Registered in store',
    step2Packing: 'Packing Parcel',
    step2PackingSub: 'Ceylon items packed',
    step3DispatchCall: 'Dispatch Call',
    step3DispatchCallSub: 'Admin calling courier',
    step4RiderVerification: 'Rider Verification',
    step4RiderWaitingSub: 'Awaiting arrival at store',
    step4RiderConfirmedSub: 'Mobile verified at store',
    step5OnTheWay: 'On the Way to You',
    step5EtaPrefix: 'ETA ~',
    stepNumberPrefix: 'Step',
    courierPartnerDirectContact: 'Romania Courier Fleet • Direct Contact',
    courierDefaultCompany: 'Courier Partner (Glovo / Bolt / Sameday / Direct)',
    riderAllocatingBadge: 'Allocating Rider at Store',
    riderCallLockedWarningTitle: '🔒 Direct call to rider is temporarily locked',
    riderCallLockedWarningDesc: 'The supermarket admin has contacted courier dispatch to collect your package. When the rider physically arrives at Strada Academiei 14, Bucharest and shares their direct mobile number with the admin, it will be validated in the system and this call button will unlock immediately!',
    riderCallLockedBtnTooltip: 'Rider has not arrived at the store yet to provide direct mobile number.',
    riderArrivingInMinutes: '⏱ Courier arriving at store in ~10 min',
    riderVerifiedBadge: '✓ VERIFIED',
    riderDirectMobileLabel: 'Direct Mobile Number:',
    riderDirectMobileVerifiedHint: 'Phone provided to admin upon parcel pickup at supermarket',
    riderCallDirectInstructions: 'You can call the rider directly for gate code, intercom, or delivery directions.',
    riderEstimatedDoorEta: 'Estimated time to your door:',
    cashOnDeliveryExactAmountNotice: 'Please prepare the exact cash amount in Romanian lei (Cash on Delivery) for the courier.',
    cashOnDeliveryPaymentTag: 'Cash on Delivery',
    orderedFoodItemsHeader: 'Ordered Food Items',
    deliveryDestinationAddress: 'Delivery Address:',
    deliveryNoteLabel: 'Note:',
    noHistoryDeliveriesTitle: 'No past completed deliveries yet',
    noHistoryDeliveriesDesc: 'Once the courier rider delivers items to your door, your past receipts and order history will appear here.',
    deliveredAndCollectedBadge: '✓ DELIVERED & PAID',
    totalPaidCodLabel: 'Total Paid (Cash on Delivery)',
    purchasedItemsSummary: 'Purchased items:',
    viewOfficialInvoiceBtn: 'View Official Receipt / Invoice',
    reorderAgainBtn: 'Reorder Again',
    invoiceModalStoreName: 'Ceylon Foods Supermarket Bucharest',
    invoiceModalStoreAddress: 'Strada Academiei 14, Bucharest, Romania',
    invoiceModalDeliveryInvoice: 'Delivery Invoice',
    invoiceModalDate: 'Date:',
    invoiceModalCustomer: 'Customer:',
    invoiceModalPhone: 'Phone:',
    invoiceModalPayment: 'Payment: Cash on Delivery (Collected at door)',
    invoiceModalTotalPaid: 'Total Collected:',
    invoiceModalPrintBtn: 'Print Invoice',
    invoiceModalCloseBtn: 'Close',

    // Auth & Modals
    authModalTitle: 'Account & Orders',
    authModalSubtitle: 'Sign in to track orders, save addresses & direct courier call',
    tabSignIn: 'Sign In',
    tabRegister: 'Create Account',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    signInBtn: 'Sign In & Continue',
    signingInBtn: 'Authenticating...',
    fullNameLabel: 'Full Name',
    deliveryAddressRoLabel: 'Delivery Address in Romania',
    createAccountBtn: 'Create Account & Order',
    creatingAccountBtn: 'Creating Account...',
    checkoutCartDrawerBtn: 'Proceed to Checkout (Cash on Delivery) →',

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

    // Cultural Ribbon
    ribbonAuthentic: '100% Authentic Sri Lanka in Romania',
    ribbonCentralDepot: '• Central Warehouse in Bucharest Sector 1',
    ribbonDailyGroceries: 'Daily Essentials: White Rice, Red Rice, Fresh Wambatu & Spices',
    ribbonCodCourier: 'Cash on Delivery with Rapid Courier Dispatch (Glovo / Bolt / Sameday)',

    // Popular section
    popularTitle: 'Top Selling Ceylon Groceries (Popular in Romania)',
    popularDesc: 'Keeri Samba white rice, Rathu Kekulu red rice, fresh brinjal, dhal, and Ceylon spices in stock in Bucharest',
    viewAllProducts: 'View All Products',

    // Recipe kits
    recipeKitsTitle: 'Cook Authentic Sri Lankan Recipes in Romania',
    recipeKitsDesc: 'Add all fresh ingredients into your cart with a single click',
    recipeKit1Title: 'Sri Lankan Wambatu Moju & Keeri Samba Combo',
    recipeKit1Desc: 'Includes Fresh Purple Eggplants (1kg), Keeri Samba Rice (5kg), Small Red Onions (500g) & Spices.',
    recipeKit2Title: 'Creamy Parippu Dhal Curry & Roast Paan Combo',
    recipeKit2Desc: 'Includes Mysore Red Dhal (1kg), Maggi Coconut Milk Powder (400g), Fresh Ceylon Roast Paan & Curry Leaves.',
    addIngredientsBtn: '+ Add Recipe Ingredients',

    // Footer Features Strip
    footerFeatureDelivery: 'Rapid Couriers in Bucharest',
    footerFeatureDeliveryDesc: 'Glovo, Bolt & Sameday in 30-45 mins',
    footerFeatureCod: 'Cash on Delivery (Cash / Card)',
    footerFeatureCodDesc: 'Pay cash or card to courier at your door',
    footerFeaturePhone: 'Phone & Hotline Support',
    footerFeaturePhoneDesc: '+40 721 345 678 (Bucharest Hub)',
    footerFeatureExport: '100% Authentic Ceylon Export',
    footerFeatureExportDesc: 'Finest rice, spices & Ceylon tea',

    // Newsletter Strip
    newsletterTitle: 'Subscribe for Fresh Arrivals & Ceylon Stock Updates',
    newsletterDesc: 'Be first to know when new shipments of Rathu Kekulu rice, fresh wambatu, curry leaves, and Dilmah tea land in Romania.',
    newsletterPlaceholder: 'Enter your email address',
    newsletterBtn: 'Subscribe',
    newsletterSubscribed: 'Subscribed!',

    // Footer
    footerAboutTitle: 'Ceylon Foods Supermarket',
    footerAboutDesc: 'Romania’s dedicated grocery platform connecting the Sri Lankan community and Romanian food lovers with 100% authentic imported Ceylon essentials.',
    footerContactTitle: 'Bucharest Store & Warehouse',
    footerAddress: 'Strada Academiei 14, Sector 1, Bucharest, Romania',
    footerHours: 'Monday – Sunday: 08:00 – 21:00 EET',
    footerPaymentTitle: 'Safe & Convenient Payment',
    footerRights: '© 2026 Ceylon Foods Supermarket Romania. All rights reserved.',
    footerCourierInfoTitle: 'Couriers & Delivery Information',
    footerCourierItem1: 'Bucharest Sectors 1–6 (25–35 mins)',
    footerCourierItem2: 'Ilfov County Express Delivery',
    footerCourierItem3: 'Romania Nationwide Sameday / Fan Courier',
    footerCourierItem4: 'Cash on Delivery (No Advance Payment)',
    footerCourierItem5: '100% Freshness & Quality Guaranteed',
    footerOrderDispatch: 'Order Dispatch & Hotline: +40 721 345 678 (Daily 08:00 - 21:00)',

    // Wishlist
    wishlistTitle: 'My Wishlist',
    wishlistSubtitle: 'Saved authentic Ceylon staples, fresh veggies, and aromatic spices.',
    wishlistEmptyTitle: 'Your Wishlist is Currently Empty',
    wishlistEmptyDesc: 'Explore our authentic Sri Lankan grocery catalog in Bucharest and save your favorite items here.',
    wishlistStartShopping: 'Start Shopping Ceylon Groceries',
    wishlistMoveAllToCart: 'Move All to Cart',
    wishlistClearAll: 'Clear Wishlist',
    wishlistInStock: 'In Stock at Bucharest Hub',
    wishlistOutOfStock: 'Currently Out of Stock',
    wishlistRemoveItem: 'Remove from Wishlist',
    wishlistAddToCart: 'Add to Cart',
    wishlistRelatedTitle: 'Explore Related Ceylon Groceries',
    wishlistRelatedSubtitle: 'Recommended for You',

    // Checkout Page
    checkoutPageTitle: 'Secure Checkout',
    checkoutPageSubtitle: 'Cash on Delivery (Plata la Livrare) across Bucharest & Nationwide Romania',
    checkoutBreadcrumb: 'Checkout',
    checkoutStepCart: 'Cart',
    checkoutStepDetails: 'Delivery Details',
    checkoutStepPayment: 'Cash on Delivery',
    checkoutStepCompleted: 'Order Completed',
    checkoutBillingTitle: 'Delivery & Contact Information',
    checkoutFullName: 'Full Name',
    checkoutPhone: 'Phone Number (Romanian Mobile)',
    checkoutPhoneHint: 'Courier will call this number upon arrival at your building.',
    checkoutAddress: 'Street Name & Number in Romania',
    checkoutAddressPlaceholder: 'e.g. Strada Mihai Eminescu nr. 42',
    checkoutDeliveryZone: 'Delivery Zone / Sector',
    checkoutBuildingDetails: 'Building, Staircase, Floor, Apartment, Intercom',
    checkoutBuildingDetailsPlaceholder: 'e.g. Bl. 12, Sc. A, Et. 3, Ap. 14, Interfon 14',
    checkoutDeliveryTimeTitle: 'Preferred Delivery Time Slot',
    checkoutSlotExpress: 'Express Delivery (Glovo/Bolt)',
    checkoutSlotEvening: 'Evening Delivery (18:00 - 20:00)',
    checkoutSlotTomorrow: 'Next Morning (09:00 - 12:00)',
    checkoutNotesTitle: 'Courier Delivery Notes (Optional)',
    checkoutNotesPlaceholder: 'e.g. Leave with security / Ring intercom 14 / Prepare change',
    checkoutPaymentTitle: 'Select Payment Method',
    checkoutCodTitle: 'Cash on Delivery (Plata la Livrare)',
    checkoutCodDesc: 'Pay in cash (Romanian Lei) directly to the delivery rider at your doorstep. No prepayment needed.',
    checkoutCodCashChangeTitle: 'Cash Change Requirement (Optional)',
    checkoutCodCashChangeHint: 'Specify the cash banknote you plan to hand the courier so the driver brings exact change.',
    checkoutCodChangeLabel: 'Change to receive',
    checkoutCardOnDeliveryTitle: 'Card on Delivery (POS Mobil Curier)',
    checkoutCardOnDeliveryDesc: 'Pay with your contactless card on the courier\'s mobile POS terminal.',
    checkoutOrderSummaryTitle: 'Order Summary',
    checkoutReviewItemsTitle: 'Items in Your Order',
    checkoutPlaceOrderBtn: 'Place Order with Cash on Delivery',
    checkoutPlacingOrderBtn: 'Placing Your Order...',
    checkoutGuaranteeTitle: '100% Authentic Ceylon Guarantee',
    checkoutGuaranteeDesc: 'All products imported from Sri Lanka, packed fresh at our Bucharest hub and dispatched via Glovo/Bolt Express.',

    // Order Completed
    orderCompletedTitle: 'Order Placed Successfully!',
    orderCompletedSubtitle: 'Your order has been registered and is being prepared for dispatch at our Bucharest supermarket.',
    orderCompletedThankYou: 'Ayubowan & Multumim!',
    orderCompletedRefNumber: 'Order Number',
    orderCompletedCopyOrderNumber: 'Copy Order Number',
    orderCompletedCopied: 'Copied!',
    orderCompletedNextStepsTitle: 'Immediate Next Fulfillment Steps',
    orderCompletedStep1: 'Our store team is picking your Ceylon rice, veggies, and spices from our Bucharest shelves.',
    orderCompletedStep2: 'Supermarket admin calls courier dispatch (Glovo / Bolt Express) to pick up your parcel.',
    orderCompletedStep3: 'When the courier arrives at our hub, admin records rider mobile to unlock your direct calling capability.',
    orderCompletedCodReminderTitle: 'Cash on Delivery Reminder',
    orderCompletedCodReminderDesc: 'Please prepare the exact cash amount in Romanian Lei (lei) to hand to the delivery courier upon arrival at your door.',
    orderCompletedTrackOrderBtn: 'Track Your Order Live',
    orderCompletedDeliveriesBtn: 'View in My Deliveries',
    orderCompletedContinueShopBtn: 'Continue Shopping',
    orderCompletedInvoiceBtn: 'View Official Invoice',

    // Track Order Page
    trackOrderTitle: 'Track Your Order',
    trackOrderSubtitle: 'Enter your Order Number or phone number to see real-time fulfillment and rider dispatch status.',
    trackOrderBreadcrumb: 'Track Your Order',
    trackOrderSearchPlaceholder: 'Enter Order Number (e.g. CF-8921) or phone (+40...)',
    trackOrderBtn: 'Track Order',
    trackOrderEnterValidNumber: 'Please enter a valid order number or phone number.',
    trackOrderNotFound: 'Order Not Found',
    trackOrderNotFoundDesc: 'No active delivery was found with this reference. Please check your order number or contact our Bucharest hotline.',
    trackOrderRecentOrders: 'Recent Orders',
    trackOrderQuickTrack: 'Quick Track',
    trackOrderLiveEtaTitle: 'Estimated Delivery Window',
    trackOrderRouteBucharest: 'Bucharest Store Hub → Customer Doorstep',

    // Account Page
    accountTitle: 'My Account',
    accountBreadcrumb: 'My Account',
    accountTabPersonalInfo: 'Personal Information',
    accountTabMyOrders: 'My Orders',
    accountTabAddresses: 'Manage Address',
    accountTabPaymentMethod: 'Payment Method',
    accountTabPassword: 'Password Manager',
    accountTabLogout: 'Log Out',
    accountFirstName: 'First Name',
    accountLastName: 'Last Name',
    accountEmail: 'Email Address',
    accountPhone: 'Phone Number',
    accountGender: 'Gender',
    accountGenderMale: 'Male',
    accountGenderFemale: 'Female',
    accountGenderOther: 'Other / Prefer not to say',
    accountAddressBookTitle: 'Saved Delivery Addresses in Romania',
    accountPrimaryAddress: 'Primary Delivery Address',
    accountUpdateChangesBtn: 'Update Changes',
    accountChangesSaved: 'Changes updated successfully!',
    accountCodPreferenceTitle: 'Payment Preferences',
    accountCodPreferenceDesc: 'Cash on Delivery (Plata la Livrare) is set as your default payment option for all orders in Romania.'
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
    searchPlaceholder: 'සුදු/රතු සහල්, වම්බටු, පරිප්පු, තුනපහ සොයන්න...',
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
    tabDeliveries: 'මගේ ඇණවුම්',
    ongoingDeliveriesTitle: 'ක්‍රියාකාරී බෙදාහැරීම්',
    deliveryHistoryTitle: 'අතීත බෙදාහැරීම් වාර්තාව',
    riderDirectCallLocked: 'ධාවකයාට ඇමතුම් ලබාගැනීම අගුළු දමා ඇත — වෙළඳසැල් පරිපාලක විසින් ධාවකයාගේ දුරකථන අංකය තහවුරු කරන තුරු රැඳී සිටින්න.',
    riderDirectCallUnlocked: 'වෙළඳසැල් පරිපාලක විසින් ධාවකයාගේ දුරකථන අංකය තහවුරු කර ඇත. ඔබට දැන් සෘජුවම ඇමතිය හැක.',
    verifiedRiderBadge: 'තහවුරු කළ ධාවකයා',
    adminVerificationNotice: 'සුපිරි වෙළඳසැල් පරිපාලක විසින් ධාවක සමාගම අමතමින් සිටී. ධාවකයා පැමිණ අංකය ලබාදුන් පසු ඇමතුම් සක්‍රිය වේ.',
    callRiderButton: 'ධාවකයා අමතන්න',
    callRiderLockedButton: 'ඇමතුම් අගුළු දමා ඇත (පරිපාලක තහවුරු කිරීම අපේක්ෂාවෙන්)',

    // Deliveries View Detailed Keys
    noOngoingDeliveriesTitle: 'ක්‍රියාකාරී බෙදාහැරීම් නොමැත',
    noOngoingDeliveriesDesc: 'ඔබගේ සියලුම Ceylon Foods ඇණවුම් සාර්ථකව බෙදාහැර ඇත! නැවුම් රතු කැකුළු සහල්, වම්බටු, පරිප්පු සහ කුළුබඩු සඳහා නව ඇණවුමක් කරන්න.',
    shopCeylonGroceriesBtn: 'දැන්ම සිංහල ආහාර මිලදී ගන්න →',
    orderNumberPrefix: 'ඇණවුම',
    orderPlacedAtPrefix: 'ඇණවුම් කළ දිනය',
    todayLabel: 'අද',
    expressDeliveryTo: 'නියමිත ලිපිනයට බෙදාහැරීම:',
    paymentCodBadge: '💵 භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීම (COD)',
    paymentOnlineBadge: '💳 මාර්ගගතව ගෙවන ලදී',
    statusOutForDeliveryBadge: '🚀 ඔබගේ නිවසට ගෙන එමින් පවතී',
    statusPackingBadge: '📦 වෙළඳසැලේ අසුරමින් පවතී',
    realtimeStageTrackerTitle: 'සජීවී බෙදාහැරීමේ පියවර (සුපිරි වෙළඳසැල ➔ කුරියර් ➔ ඔබේ නිවසට):',
    step1OrderPlaced: 'ඇණවුම තහවුරු විය',
    step1OrderPlacedSub: 'වෙළඳසැලේ ලියාපදිංචි විය',
    step2Packing: 'ඇසුරුම සූදානම් කිරීම',
    step2PackingSub: 'භාණ්ඩ අසුරමින් පවතී',
    step3DispatchCall: 'කුරියර් ඇමතුම',
    step3DispatchCallSub: 'පරිපාලක කුරියර් අමතයි',
    step4RiderVerification: 'රියදුරු තහවුරු කිරීම',
    step4RiderWaitingSub: 'වෙළඳසැලට පැමිණෙන තෙක් රැඳී සිටී',
    step4RiderConfirmedSub: 'දුරකථන අංකය තහවුරු කෙරිණි',
    step5OnTheWay: 'ඔබ වෙත ගමන් කරමින්',
    step5EtaPrefix: 'ලඟාවීමේ වේලාව ~',
    stepNumberPrefix: 'පියවර',
    courierPartnerDirectContact: 'රුමේනියානු කුරියර් සහකරු • සෘජු ඇමතුම',
    courierDefaultCompany: 'කුරියර් සහකරු (Glovo / Bolt / Sameday)',
    riderAllocatingBadge: 'වෙළඳසැලේ රියදුරු වෙන් කරමින්',
    riderCallLockedWarningTitle: '🔒 රියදුරු සෘජු ඇමතුම තාවකාලිකව අගුළු දමා ඇත',
    riderCallLockedWarningDesc: 'සුපිරි වෙළඳසැලේ පරිපාලක පැකේජය රැගෙන යාමට කුරියර් සේවාව අමතා ඇත. රියදුරු බුකාරෙස්ට් වෙළඳසැලට පැමිණ තම සෘජු ජංගම දුරකථන අංකය ලබා දුන් පසු, පරිපාලක එය තහවුරු කරනු ඇත. ඉන්පසු මෙම ඇමතුම් බොත්තම සක්‍රිය වේ!',
    riderCallLockedBtnTooltip: 'රියදුරු තවමත් දුරකථන අංකය ලබා දීමට වෙළඳසැලට පැමිණ නැත.',
    riderArrivingInMinutes: '⏱ රියදුරු විනාඩි 10 කින් වෙළඳසැලට පැමිණේ',
    riderVerifiedBadge: '✓ තහවුරු කරන ලදී',
    riderDirectMobileLabel: 'සෘජු ජංගම දුරකථන අංකය:',
    riderDirectMobileVerifiedHint: 'භාණ්ඩ රැගෙන යාමේදී පරිපාලක විසින් තහවුරු කරන ලදී',
    riderCallDirectInstructions: 'ගේට්ටු/ඉන්ටර්කොම් හෝ ලිපිනය පිළිබඳ උපදෙස් සඳහා රියදුරු අමතන්න.',
    riderEstimatedDoorEta: 'ඔබගේ නිවසට ඇස්තමේන්තුගත කාලය:',
    cashOnDeliveryExactAmountNotice: 'කරුණාකර කුරියර් රියදුරු සඳහා නියමිත මුදල (Cash on Delivery) ලෙයි වලින් සූදානම් කර තබන්න.',
    cashOnDeliveryPaymentTag: 'භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීම',
    orderedFoodItemsHeader: 'ඇණවුම් කළ ආහාර ද්‍රව්‍ය',
    deliveryDestinationAddress: 'බෙදාහැරීමේ ලිපිනය:',
    deliveryNoteLabel: 'සටහන:',
    noHistoryDeliveriesTitle: 'පෙර සම්පූර්ණ කළ ඇණවුම් නොමැත',
    noHistoryDeliveriesDesc: 'කුරියර් රියදුරු භාණ්ඩ ඔබගේ නිවසට ගෙනවිත් දුන් පසු, සම්පූර්ණ ඉතිහාසය සහ බිල්පත් මෙහි දිස්වනු ඇත.',
    deliveredAndCollectedBadge: '✓ භාණ්ඩ ලැබී මුදල් ගෙවන ලදී',
    totalPaidCodLabel: 'මුළු ගෙවීම (Cash on Delivery)',
    purchasedItemsSummary: 'මිලදී ගත් භාණ්ඩ:',
    viewOfficialInvoiceBtn: 'නිල බිල්පත බලන්න',
    reorderAgainBtn: 'නැවත ඇණවුම් කරන්න',
    invoiceModalStoreName: 'Ceylon Foods Supermarket Bucharest',
    invoiceModalStoreAddress: 'Strada Academiei 14, Bucharest, Romania',
    invoiceModalDeliveryInvoice: 'නිල බෙදාහැරීමේ බිල්පත',
    invoiceModalDate: 'දිනය:',
    invoiceModalCustomer: 'පාරිභෝගිකයා:',
    invoiceModalPhone: 'දුරකථනය:',
    invoiceModalPayment: 'ගෙවීම: Cash on Delivery (නිවසට ලැබුණු පසු ගෙවන ලදී)',
    invoiceModalTotalPaid: 'මුළු මුදල:',
    invoiceModalPrintBtn: 'මුද්‍රණය කරන්න',
    invoiceModalCloseBtn: 'වසන්න',

    // Auth & Modals
    authModalTitle: 'ගිණුම සහ ඇණවුම්',
    authModalSubtitle: 'ඇණවුම් නිරීක්ෂණය සහ ලිපින සුරැකීම සඳහා ලොග් වන්න',
    tabSignIn: 'ඇතුල් වන්න',
    tabRegister: 'නව ගිණුමක්',
    emailLabel: 'විද්‍යුත් තැපෑල',
    passwordLabel: 'මුරපදය',
    signInBtn: 'ඇතුල් වී ඉදිරියට යන්න',
    signingInBtn: 'තහවුරු කරමින් පවතී...',
    fullNameLabel: 'සම්පූර්ණ නම',
    deliveryAddressRoLabel: 'රුමේනියාවේ බෙදාහැරීමේ ලිපිනය',
    createAccountBtn: 'ගිණුම සාදා ඇණවුම් කරන්න',
    creatingAccountBtn: 'ගිණුම නිර්මාණය කරමින්...',
    checkoutCartDrawerBtn: 'මුදල් ගෙවීම සඳහා ඉදිරියට (COD) →',

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

    // Cultural Ribbon
    ribbonAuthentic: '100% අව්‍යාජ ශ්‍රී ලාංකික ආහාර ද්‍රව්‍ය රුමේනියාවේදී',
    ribbonCentralDepot: '• බුකාරෙස්ට් මධ්‍යම ගබඩාව (Sector 1)',
    ribbonDailyGroceries: 'දෛනික අත්‍යවශ්‍ය දෑ: සුදු කැකුළු, රතු කැකුළු, නැවුම් වම්බටු සහ තුනපහ',
    ribbonCodCourier: 'භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීම (Cash on Delivery) සමඟ ක්ෂණික ධාවක සේවාව',

    // Popular section
    popularTitle: 'රුමේනියාවේ වැඩිම ඉල්ලුමක් ඇති ලංකා ආහාර',
    popularDesc: 'කීරි සම්බා, රතු කැකුළු සහල්, නැවුම් වම්බටු, පරිප්පු සහ තුනපහ බුකාරෙස්ට් ගබඩාවේ තොග ඇත',
    viewAllProducts: 'සියලුම නිෂ්පාදන බලන්න',

    // Recipe kits
    recipeKitsTitle: 'රුමේනියාවේදී දේශීය ලංකා ක්‍රමයට ආහාර පිසින්න',
    recipeKitsDesc: 'අවශ්‍ය සියලුම අමුද්‍රව්‍ය එකවර කරත්තයට එක්කරන්න',
    recipeKit1Title: 'ලංකා වම්බටු මෝජු සහ කීරි සම්බා එකතුව',
    recipeKit1Desc: 'නැවුම් වම්බටු (1kg), කීරි සම්බා (5kg), රතු ලූනු (500g) සහ බැදපු තුනපහ ඇතුළත් වේ.',
    recipeKit2Title: 'ක්‍රීමි පරිප්පු කරිය සහ රෝස් පාන් එකතුව',
    recipeKit2Desc: 'මයිසූර් පරිප්පු (1kg), මැගී පොල්කිරි පිටි (400g), නැවුම් රෝස් පාන් සහ කරපිංචා ඇතුළත් වේ.',
    addIngredientsBtn: '+ අමුද්‍රව්‍ය එක් කරන්න',

    // Footer Features Strip
    footerFeatureDelivery: 'බුකාරෙස්ට් ක්ෂණික කුරියර්',
    footerFeatureDeliveryDesc: 'Glovo, Bolt සහ Sameday මගින් මිනිත්තු 30-45 න්',
    footerFeatureCod: 'භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීම',
    footerFeatureCodDesc: 'නිවසටම පැමිණි පසු මුදල් හෝ කාඩ්පතෙන් ගෙවන්න',
    footerFeaturePhone: 'දුරකථන සහ සහය සේවාව',
    footerFeaturePhoneDesc: '+40 721 345 678 (බුකාරෙස්ට්)',
    footerFeatureExport: '100% අපනයන තත්ත්වයේ ලංකා ආහාර',
    footerFeatureExportDesc: 'සුවඳැති සහල්, තුනපහ සහ දිල්මා තේ',

    // Newsletter Strip
    newsletterTitle: 'නැවුම් ආහාර තොග පැමිණීම් පිළිබඳ තොරතුරු ලබාගන්න',
    newsletterDesc: 'ලංකාවෙන් රතු සහල්, නැවුම් වම්බටු, කරපිංචා සහ තේ රුමේනියාවට පැමිණි විගස දැනුවත් වන්න.',
    newsletterPlaceholder: 'ඔබගේ ඊමේල් ලිපිනය ඇතුළත් කරන්න',
    newsletterBtn: 'ලියාපදිංචි වන්න',
    newsletterSubscribed: 'ලියාපදිංචි විය!',

    // Footer
    footerAboutTitle: 'Ceylon Foods Supermarket',
    footerAboutDesc: 'රුමේනියාවේ වෙසෙන ශ්‍රී ලාංකික ප්‍රජාවට සහ රුමේනියානු පාරිභෝගිකයින්ට 100% අව්‍යාජ ලංකා ආහාර සපයන නිල වෙළඳ ජාලය.',
    footerContactTitle: 'බුකාරෙස්ට් ප්‍රධාන ගබඩාව',
    footerAddress: 'Strada Academiei 14, Sector 1, Bucharest, Romania',
    footerHours: 'සඳුදා – ඉරිදා: පෙ.ව 08:00 – ප.ව 21:00 EET',
    footerPaymentTitle: 'ආරක්ෂිත සහ පහසු ගෙවීම්',
    footerRights: '© 2026 Ceylon Foods Supermarket Romania. සියලුම හිමිකම් ඇවිරිණි.',
    footerCourierInfoTitle: 'කුරියර් සහ බෙදාහැරීම් විස්තර',
    footerCourierItem1: 'බුකාරෙස්ට් Sector 1-6 (විනාඩි 25-35)',
    footerCourierItem2: 'ඉල්ෆොව් අධිවේගී බෙදාහැරීම',
    footerCourierItem3: 'රුමේනියාව පුරා Sameday / Fan Courier',
    footerCourierItem4: 'භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීම (COD)',
    footerCourierItem5: '100% නැවුම්බව සහ සුරක්ෂිතතාවය',
    footerOrderDispatch: 'ඇණවුම් මධ්‍යස්ථානය: +40 721 345 678 (දිනපතා පෙ.ව 08:00 - ප.ව 21:00)',

    // Wishlist
    wishlistTitle: 'මගේ කැමැත්ත ලැයිස්තුව',
    wishlistSubtitle: 'ඔබ තෝරාගත් අව්‍යාජ ලංකා සහල්, එළවළු සහ තුනපහ වර්ග.',
    wishlistEmptyTitle: 'ඔබගේ කැමැත්ත ලැයිස්තුව හිස්ව පවතී',
    wishlistEmptyDesc: 'බුකාරෙස්ට් සුපිරි වෙළඳසැලේ ඇති ලංකා ආහාර ද්‍රව්‍ය පිරික්සා මෙහි සුරකින්න.',
    wishlistStartShopping: 'සාප්පු සවාරි ආරම්භ කරන්න',
    wishlistMoveAllToCart: 'සියල්ල කරත්තයට එක්කරන්න',
    wishlistClearAll: 'ලැයිස්තුව හිස් කරන්න',
    wishlistInStock: 'බුකාරෙස්ට් ගබඩාවේ තොග ඇත',
    wishlistOutOfStock: 'දැනට තොග අවසන්',
    wishlistRemoveItem: 'ඉවත් කරන්න',
    wishlistAddToCart: 'කරත්තයට එක්කරන්න',
    wishlistRelatedTitle: 'වෙනත් ජනප්‍රිය ලංකා ආහාර ද්‍රව්‍ය',
    wishlistRelatedSubtitle: 'ඔබට නිර්දේශිතයි',

    // Checkout Page
    checkoutPageTitle: 'සුරක්ෂිත ඇණවුම් කිරීම',
    checkoutPageSubtitle: 'රුමේනියාව පුරා ගෙදරටම ලැබුණු පසු මුදල් ගෙවීම (Cash on Delivery)',
    checkoutBreadcrumb: 'ඇණවුම් පිටුව',
    checkoutStepCart: 'කරත්තය',
    checkoutStepDetails: 'ලිපිනය සහ විස්තර',
    checkoutStepPayment: 'මුදල් ගෙවීම (COD)',
    checkoutStepCompleted: 'ඇණවුම සම්පූර්ණයි',
    checkoutBillingTitle: 'බෙදාහැරීම් සහ සම්බන්ධතා තොරතුරු',
    checkoutFullName: 'සම්පූර්ණ නම',
    checkoutPhone: 'දුරකථන අංකය (රුමේනියානු ජංගම)',
    checkoutPhoneHint: 'ධාවකයා ඔබගේ නිවසට පැමිණි විට මෙම අංකයට අමතනු ඇත.',
    checkoutAddress: 'වීදියේ නම සහ අංකය',
    checkoutAddressPlaceholder: 'උදා: Strada Mihai Eminescu nr. 42',
    checkoutDeliveryZone: 'බෙදාහැරීමේ කලාපය / Sector',
    checkoutBuildingDetails: 'ගොඩනැගිල්ල, පඩිපෙළ, මහල, නිවාස අංකය, ඉන්ටර්ෆෝන්',
    checkoutBuildingDetailsPlaceholder: 'උදා: Bl. 12, Sc. A, Et. 3, Ap. 14, Interfon 14',
    checkoutDeliveryTimeTitle: 'කැමති බෙදාහැරීමේ වේලාව',
    checkoutSlotExpress: 'අධිවේගී බෙදාහැරීම (Glovo/Bolt)',
    checkoutSlotEvening: 'සවස බෙදාහැරීම (18:00 - 20:00)',
    checkoutSlotTomorrow: 'හෙට උදෑසන (09:00 - 12:00)',
    checkoutNotesTitle: 'ධාවකයා සඳහා උපදෙස් (විකල්ප)',
    checkoutNotesPlaceholder: 'උදා: ඉන්ටර්ෆෝන් 14 අමතන්න / මාරු කාසි රැගෙන එන්න',
    checkoutPaymentTitle: 'ගෙවීම් ක්‍රමය තෝරන්න',
    checkoutCodTitle: 'ගෙදරට ලැබුණු පසු මුදල් ගෙවීම (Cash on Delivery)',
    checkoutCodDesc: 'නිවසටම පැමිණි පසු ධාවකයාට ලෙයි (Lei) වලින් මුදල් ගෙවන්න. කිසිදු පෙර ගෙවීමක් අවශ්‍ය නොවේ.',
    checkoutCodCashChangeTitle: 'ඉතිරි මුදල් අවශ්‍යතාවය (විකල්ප)',
    checkoutCodCashChangeHint: 'ඔබ ධාවකයාට දෙන මුදල් නෝට්ටුවේ වටිනාකම ඇතුළත් කළ විට ඔහු නිවැරදි ඉතිරි මුදල රැගෙන එයි.',
    checkoutCodChangeLabel: 'ලැබිය යුතු ඉතිරි මුදල',
    checkoutCardOnDeliveryTitle: 'කාඩ්පතෙන් ගෙවීම (POS Mobil)',
    checkoutCardOnDeliveryDesc: 'ධාවකයා සතු ජංගම POS යන්ත්‍රය හරහා කාඩ්පතෙන් ගෙවන්න.',
    checkoutOrderSummaryTitle: 'ඇණවුම් සාරාංශය',
    checkoutReviewItemsTitle: 'ඇණවුමේ ඇති භාණ්ඩ',
    checkoutPlaceOrderBtn: 'ඇණවුම තහවුරු කරන්න (COD)',
    checkoutPlacingOrderBtn: 'ඇණවුම සකසමින් පවතී...',
    checkoutGuaranteeTitle: '100% අව්‍යාජ ශ්‍රී ලාංකික නිෂ්පාදන සහතිකය',
    checkoutGuaranteeDesc: 'ශ්‍රී ලංකාවෙන් ආනයනය කර බුකාරෙස්ට් ගබඩාවෙන් Glovo/Bolt හරහා ආරක්ෂිතව එවනු ලැබේ.',

    // Order Completed
    orderCompletedTitle: 'ඇණවුම සාර්ථකව සම්පූර්ණ විය!',
    orderCompletedSubtitle: 'ඔබගේ ඇණවුම ලියාපදිංචි වී ඇති අතර බුකාරෙස්ට් සුපිරි වෙළඳසැලේදී පැකට් කරමින් පවතී.',
    orderCompletedThankYou: 'ආයුබෝවන් සහ ස්තූතියි!',
    orderCompletedRefNumber: 'ඇණවුම් අංකය',
    orderCompletedCopyOrderNumber: 'අංකය පිටපත් කරන්න',
    orderCompletedCopied: 'පිටපත් විය!',
    orderCompletedNextStepsTitle: 'මීළඟ පියවර',
    orderCompletedStep1: 'අපගේ වෙළඳසැල් සේවකයින් ඔබේ සහල්, එළවළු සහ තුනපහ එකතු කරමින් සිටී.',
    orderCompletedStep2: 'සුපිරි වෙළඳසැල් පරිපාලක කුරියර් ධාවකයින් (Glovo/Bolt) අමතයි.',
    orderCompletedStep3: 'ධාවකයා පැමිණි පසු ඔහුගේ දුරකථන අංකය සටහන් කර ඔබට ඇමතුම් ලබා ගැනීමේ හැකියාව විවෘත වේ.',
    orderCompletedCodReminderTitle: 'මුදල් ගෙවීමේ මතක් කිරීම',
    orderCompletedCodReminderDesc: 'ධාවකයා පැමිණි විට ගෙවීමට නියමිත නිවැරදි මුදල (Lei) ලෑස්ති කර තබා ගන්න.',
    orderCompletedTrackOrderBtn: 'ඇණවුමේ සජීවී තත්ත්වය බලන්න',
    orderCompletedDeliveriesBtn: 'මගේ ඇණවුම් පිටුවට යන්න',
    orderCompletedContinueShopBtn: 'තවදුරටත් සාප්පු යන්න',
    orderCompletedInvoiceBtn: 'නිල බිල්පත බලන්න',

    // Track Order Page
    trackOrderTitle: 'ඇණවුම සජීවීව පරීක්ෂා කරන්න',
    trackOrderSubtitle: 'ඔබේ ඇණවුම් අංකය හෝ දුරකථන අංකය ඇතුළත් කර භාණ්ඩ ලැබීමේ තත්ත්වය පරීක්ෂා කරන්න.',
    trackOrderBreadcrumb: 'ඇණවුම සොයන්න',
    trackOrderSearchPlaceholder: 'ඇණවුම් අංකය (උදා: CF-8921) හෝ දුරකථනය (+40...)',
    trackOrderBtn: 'සොයන්න',
    trackOrderEnterValidNumber: 'වලංගු ඇණවුම් අංකයක් ඇතුළත් කරන්න.',
    trackOrderNotFound: 'ඇණවුම සොයාගත නොහැකි විය',
    trackOrderNotFoundDesc: 'මෙම අංකයට අදාළ ඇණවුමක් හමු නොවීය. කරුණාකර අංකය නැවත පරීක්ෂා කරන්න.',
    trackOrderRecentOrders: 'මෑත ඇණවුම්',
    trackOrderQuickTrack: 'ක්ෂණිකව බලන්න',
    trackOrderLiveEtaTitle: 'බලාපොරොත්තු වන වේලාව',
    trackOrderRouteBucharest: 'බුකාරෙස්ට් වෙළඳසැල → ඔබගේ නිවස',

    // Account Page
    accountTitle: 'මගේ ගිණුම',
    accountBreadcrumb: 'මගේ ගිණුම',
    accountTabPersonalInfo: 'පුද්ගලික තොරතුරු',
    accountTabMyOrders: 'මගේ ඇණවුම්',
    accountTabAddresses: 'ලිපිනයන් කළමනාකරණය',
    accountTabPaymentMethod: 'ගෙවීම් ක්‍රම',
    accountTabPassword: 'මුරපද කළමනාකරණය',
    accountTabLogout: 'ඉවත් වන්න',
    accountFirstName: 'මුල් නම',
    accountLastName: 'වාසගම',
    accountEmail: 'විද්‍යුත් තැපෑල',
    accountPhone: 'දුරකථන අංකය',
    accountGender: 'ස්ත්‍රී/පුරුෂ භාවය',
    accountGenderMale: 'පුරුෂ',
    accountGenderFemale: 'ස්ත්‍රී',
    accountGenderOther: 'වෙනත්',
    accountAddressBookTitle: 'රුමේනියාවේ ඔබගේ සුරකින ලද ලිපිනයන්',
    accountPrimaryAddress: 'ප්‍රධාන බෙදාහැරීම් ලිපිනය',
    accountUpdateChangesBtn: 'වෙනස්කම් සුරකින්න',
    accountChangesSaved: 'වෙනස්කම් සාර්ථකව සුරකින ලදී!',
    accountCodPreferenceTitle: 'ගෙවීම් මනාපයන්',
    accountCodPreferenceDesc: 'රුමේනියාවේ සියලුම ඇණවුම් සඳහා Cash on Delivery ප්‍රධාන ගෙවීම් ක්‍රමය ලෙස සකසා ඇත.'
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
    searchPlaceholder: 'Caută orez alb, orez roșu, wambatu, condimente Ceylon...',
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
    tabDeliveries: 'Comenzile Mele',
    ongoingDeliveriesTitle: 'Livrări în Curs',
    deliveryHistoryTitle: 'Istoric Livrări',
    riderDirectCallLocked: 'Apel direct blocat — se așteaptă sosirea curierului la magazin și confirmarea numărului de mobil de către administrator.',
    riderDirectCallUnlocked: 'Administratorul a verificat numărul de mobil al curierului. Puteți apela curierul direct.',
    verifiedRiderBadge: 'Curier Verificat de Magazin',
    adminVerificationNotice: 'Administratorul magazinului apelează compania de curierat (Glovo/Bolt/Sameday). Apelul direct se activează după sosirea curierului la depozit.',
    callRiderButton: 'Apelează Curierul',
    callRiderLockedButton: 'Apel Blocat (Așteptare Verificare Admin)',

    // Deliveries View Detailed Keys
    noOngoingDeliveriesTitle: 'Nu aveți comenzi în curs de livrare',
    noOngoingDeliveriesDesc: 'Toate pachetele Ceylon Foods au fost livrate cu succes! Puteți plasa o nouă comandă cu orez roșu, wambatu proaspăt și condimente din Sri Lanka.',
    shopCeylonGroceriesBtn: 'Cumpără Alimente Ceylon Acum →',
    orderNumberPrefix: 'Comandă',
    orderPlacedAtPrefix: 'Plasată',
    todayLabel: 'Astăzi',
    expressDeliveryTo: 'Livrare Rapidă în',
    paymentCodBadge: '💵 Plata la Livrare (Cash on Delivery)',
    paymentOnlineBadge: '💳 Plătit Online',
    statusOutForDeliveryBadge: '🚀 În Livrare spre Tine',
    statusPackingBadge: '📦 Se Împachetează',
    realtimeStageTrackerTitle: 'Stadiu Livrare în Timp Real (Supermarket ➔ Curier ➔ Adresă):',
    step1OrderPlaced: 'Comandă Plasată',
    step1OrderPlacedSub: 'Înregistrată în magazin',
    step2Packing: 'Pregătire Colet',
    step2PackingSub: 'Produse Ceylon ambalate',
    step3DispatchCall: 'Apel Dispecerat',
    step3DispatchCallSub: 'Admin cheamă curierul',
    step4RiderVerification: 'Verificare Curier',
    step4RiderWaitingSub: 'Așteaptă sosirea la magazin',
    step4RiderConfirmedSub: 'Mobil confirmat la magazin',
    step5OnTheWay: 'Pe Drum spre Tine',
    step5EtaPrefix: 'ETA ~',
    stepNumberPrefix: 'Pasul',
    courierPartnerDirectContact: 'Partener Curierat România • Contact Direct',
    courierDefaultCompany: 'Companie de Livrare (Glovo / Bolt / Sameday)',
    riderAllocatingBadge: 'În Curs de Alocare la Magazin',
    riderCallLockedWarningTitle: '🔒 Apelul direct către curier este temporar blocat',
    riderCallLockedWarningDesc: 'Administratorul magazinului a contactat dispeceratul curierilor pentru preluarea coletului. În momentul în care curierul ajunge fizic la depozitul din Strada Academiei 14, București, acesta își va prezenta numărul direct de mobil administratorului, care îl va valida în sistem. Imediat după verificare, butonul de apel direct se va activa automat aici!',
    riderCallLockedBtnTooltip: 'Curierul nu a sosit încă la magazin pentru transmiterea numărului de mobil.',
    riderArrivingInMinutes: '⏱ Curierul sosește la magazin în ~10 min',
    riderVerifiedBadge: '✓ VERIFICAT',
    riderDirectMobileLabel: 'Număr Direct Mobil:',
    riderDirectMobileVerifiedHint: 'Număr furnizat administratorului la ridicarea pachetului din magazin',
    riderCallDirectInstructions: 'Puteți suna curierul direct pentru instrucțiuni interfon / adresă.',
    riderEstimatedDoorEta: 'Timp estimat până la ușă:',
    cashOnDeliveryExactAmountNotice: 'Vă rugăm să pregătiți suma exactă în numerar (Cash on Delivery) pentru curier.',
    cashOnDeliveryPaymentTag: 'Plată Ramburs',
    orderedFoodItemsHeader: 'Articole Alimentare Comandate',
    deliveryDestinationAddress: 'Adresă de Livrare:',
    deliveryNoteLabel: 'Notă:',
    noHistoryDeliveriesTitle: 'Nu aveți comenzi anterioare finalizate',
    noHistoryDeliveriesDesc: 'După ce curierul livrează produsele la ușa dumneavoastră, istoricul detaliat va fi salvat aici.',
    deliveredAndCollectedBadge: '✓ LIVRAT & ÎNCASAT',
    totalPaidCodLabel: 'Total Plătit (Cash on Delivery)',
    purchasedItemsSummary: 'Articole cumpărate:',
    viewOfficialInvoiceBtn: 'Vezi Chitanță / Factură Oficială',
    reorderAgainBtn: 'Comandă Din Nou',
    invoiceModalStoreName: 'Ceylon Foods Supermarket Bucharest',
    invoiceModalStoreAddress: 'Strada Academiei 14, București, România',
    invoiceModalDeliveryInvoice: 'Factură Livrare',
    invoiceModalDate: 'Data:',
    invoiceModalCustomer: 'Client:',
    invoiceModalPhone: 'Telefon:',
    invoiceModalPayment: 'Plată: Cash on Delivery (Încasat la Ușă)',
    invoiceModalTotalPaid: 'Total Încasat:',
    invoiceModalPrintBtn: 'Printează Factura',
    invoiceModalCloseBtn: 'Închide',

    // Auth & Modals
    authModalTitle: 'Contul Meu & Comenzi',
    authModalSubtitle: 'Autentificați-vă pentru a urmări livrările și apela curierul direct',
    tabSignIn: 'Autentificare',
    tabRegister: 'Înregistrare Cont',
    emailLabel: 'Adresă de Email',
    passwordLabel: 'Parolă',
    signInBtn: 'Intră în Cont & Continuă',
    signingInBtn: 'Se autentifică...',
    fullNameLabel: 'Nume și Prenume',
    deliveryAddressRoLabel: 'Adresă de Livrare în România',
    createAccountBtn: 'Creează Cont & Comandă',
    creatingAccountBtn: 'Se creează contul...',
    checkoutCartDrawerBtn: 'Finalizează Comanda cu Plata la Livrare →',

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

    // Cultural Ribbon
    ribbonAuthentic: '100% Autentic Sri Lanka în România',
    ribbonCentralDepot: '• Magazin cu Depozit Central în București',
    ribbonDailyGroceries: 'Alimente Zilnice: Orez Alb, Orez Roșu, Wambatu & Condimente',
    ribbonCodCourier: 'Plata la Livrare (Cash on Delivery) cu Livrare Rapidă prin Curieri',

    // Popular section
    popularTitle: 'Cele mai vândute alimente (Popular în România)',
    popularDesc: 'Orez alb Keeri Samba, orez roșu, wambatu, dhal, și condimente de Ceylon în stoc în București',
    viewAllProducts: 'Vezi toate produsele',

    // Recipe kits
    recipeKitsTitle: 'Gătește Rețete Tradiționale din Sri Lanka în România',
    recipeKitsDesc: 'Adaugă toate ingredientele necesare în coș cu un singur click',
    recipeKit1Title: 'Sri Lankan Wambatu Moju & Keeri Samba Combo',
    recipeKit1Desc: 'Include Vinete violet proaspete (1kg), Orez alb Keeri Samba (5kg), Ceapă roșie mică (500g) și Condimente.',
    recipeKit2Title: 'Cremoasă Parippu Dhal Curry & Roast Paan Combo',
    recipeKit2Desc: 'Include Linte roșie Mysore Dhal (1kg), Lapte de cocos Maggi (400ml), Roast Paan proaspăt și Frunze de curry.',
    addIngredientsBtn: '+ Adaugă Ingredientele',

    // Footer Features Strip
    footerFeatureDelivery: 'Curieri Rapizi București',
    footerFeatureDeliveryDesc: 'Glovo, Bolt & Sameday în 30-45 min',
    footerFeatureCod: 'Plata la Livrare (Cash)',
    footerFeatureCodDesc: 'Ramburs numerar sau card la curier',
    footerFeaturePhone: 'Asistență Telefonică',
    footerFeaturePhoneDesc: '+40 721 345 678 (București)',
    footerFeatureExport: '100% Export Autentic',
    footerFeatureExportDesc: 'Orez, condimente & ceai de Ceylon',

    // Newsletter Strip
    newsletterTitle: 'Abonează-te la Noutăți & Sosiri de Produse Proaspete',
    newsletterDesc: 'Află primul când sosesc transporturi noi de orez roșu, wambatu, frunze de curry și ceai de Ceylon în România.',
    newsletterPlaceholder: 'Introduceți adresa de email',
    newsletterBtn: 'Abonează-mă',
    newsletterSubscribed: 'Abonat!',

    // Footer
    footerAboutTitle: 'Ceylon Foods Supermarket',
    footerAboutDesc: 'Platforma oficială din România dedicată comunității din Sri Lanka și pasionaților de bucătărie asiatică, oferind ingrediente 100% autentice importate direct.',
    footerContactTitle: 'Magazin & Depozit Central București',
    footerAddress: 'Strada Academiei 14, Sector 1, București, România',
    footerHours: 'Luni – Duminică: 08:00 – 21:00 EET',
    footerPaymentTitle: 'Plată Sigură & Flexibilă',
    footerRights: '© 2026 Ceylon Foods Supermarket România. Toate drepturile rezervate.',
    footerCourierInfoTitle: 'Informații Curieri & Livrare',
    footerCourierItem1: 'București Sectoare 1–6 (25–35 min)',
    footerCourierItem2: 'Județul Ilfov Express',
    footerCourierItem3: 'Livrare Națională Sameday / Fan Courier',
    footerCourierItem4: 'Plata Cash la Livrare (Ramburs)',
    footerCourierItem5: 'Garanție Prospețime 100%',
    footerOrderDispatch: 'Dispecerat Comenzi: +40 721 345 678 (Zilnic 08:00 - 21:00)',

    // Wishlist
    wishlistTitle: 'Produse Favorite',
    wishlistSubtitle: 'Alimente autentice din Sri Lanka salvate: orez tradițional, legume proaspete și condimente aromate.',
    wishlistEmptyTitle: 'Lista de Favorite este Goală',
    wishlistEmptyDesc: 'Descoperă catalogul nostru cu produse din Sri Lanka din București și salvează articolele favorite aici.',
    wishlistStartShopping: 'Începe Cumpărăturile',
    wishlistMoveAllToCart: 'Adaugă Tot în Coș',
    wishlistClearAll: 'Golește Favorite',
    wishlistInStock: 'În Stoc la Depozitul din București',
    wishlistOutOfStock: 'Stoc Momentan Epuizat',
    wishlistRemoveItem: 'Șterge din Favorite',
    wishlistAddToCart: 'Adaugă în Coș',
    wishlistRelatedTitle: 'Explorează Produse Asemănătoare din Ceylon',
    wishlistRelatedSubtitle: 'Recomandat pentru Tine',

    // Checkout Page
    checkoutPageTitle: 'Finalizare Comandă Securizată',
    checkoutPageSubtitle: 'Plata la Livrare (Cash on Delivery) în București și în toată România',
    checkoutBreadcrumb: 'Finalizare Comandă',
    checkoutStepCart: 'Coș Cumpărături',
    checkoutStepDetails: 'Detalii Livrare',
    checkoutStepPayment: 'Plata la Livrare',
    checkoutStepCompleted: 'Comandă Finalizată',
    checkoutBillingTitle: 'Informații de Contact & Adresă Livrare',
    checkoutFullName: 'Nume & Prenume',
    checkoutPhone: 'Număr de Telefon (Mobil România)',
    checkoutPhoneHint: 'Curierul va apela acest număr la sosirea la adresa indicată.',
    checkoutAddress: 'Numele Străzii și Numărul',
    checkoutAddressPlaceholder: 'ex: Strada Mihai Eminescu nr. 42',
    checkoutDeliveryZone: 'Zonă Livrare / Sector București',
    checkoutBuildingDetails: 'Bloc, Scară, Etaj, Apartament, Interfon',
    checkoutBuildingDetailsPlaceholder: 'ex: Bl. 12, Sc. A, Et. 3, Ap. 14, Interfon 14',
    checkoutDeliveryTimeTitle: 'Interval Preferat de Livrare',
    checkoutSlotExpress: 'Livrare Express (Glovo/Bolt)',
    checkoutSlotEvening: 'Livrare de Seară (18:00 - 20:00)',
    checkoutSlotTomorrow: 'Mâine Dimineață (09:00 - 12:00)',
    checkoutNotesTitle: 'Instrucțiuni pentru Curier (Opțional)',
    checkoutNotesPlaceholder: 'ex: Lăsați la portar / Sunați la interfon 14 / Pregătiți rest',
    checkoutPaymentTitle: 'Alege Modalitatea de Plată',
    checkoutCodTitle: 'Plata Cash la Livrare (Ramburs)',
    checkoutCodDesc: 'Plătești în numerar (lei) direct curierului când îți aduce coletul la ușă. Fără plată în avans.',
    checkoutCodCashChangeTitle: 'Calcul Rest Bancnotă (Opțional)',
    checkoutCodCashChangeHint: 'Indică suma cu care vei plăti pentru ca șoferul să aducă restul exact pregătit.',
    checkoutCodChangeLabel: 'Rest de primit',
    checkoutCardOnDeliveryTitle: 'Plata cu Cardul la Livrare (POS Mobil Curier)',
    checkoutCardOnDeliveryDesc: 'Plătești contactless cu cardul la POS-ul mobil adus de curier.',
    checkoutOrderSummaryTitle: 'Sumar Comandă',
    checkoutReviewItemsTitle: 'Produse Comandate',
    checkoutPlaceOrderBtn: 'Plasează Comanda cu Plata la Livrare',
    checkoutPlacingOrderBtn: 'Se plasează comanda...',
    checkoutGuaranteeTitle: 'Garanție 100% Produse Autentice din Ceylon',
    checkoutGuaranteeDesc: 'Toate produsele sunt importate direct din Sri Lanka, ambalate la hub-ul din București și expediate prin Glovo/Bolt.',

    // Order Completed
    orderCompletedTitle: 'Comandă Plasată cu Succes!',
    orderCompletedSubtitle: 'Comanda ta a fost înregistrată și se pregătește pentru expediere la supermarketul nostru din București.',
    orderCompletedThankYou: 'Ayubowan & Mulțumim!',
    orderCompletedRefNumber: 'Număr Comandă',
    orderCompletedCopyOrderNumber: 'Copiază Numărul Comenzii',
    orderCompletedCopied: 'Copiat!',
    orderCompletedNextStepsTitle: 'Pașii Imediați de Livrare',
    orderCompletedStep1: 'Echipa noastră împachetează orezul Keeri Samba, legumele proaspete și condimentele din depozit.',
    orderCompletedStep2: 'Dispeceratul magazinului apelează curierul partener (Glovo / Bolt Express) pentru ridicare.',
    orderCompletedStep3: 'Când curierul ajunge la magazin, adminul introduce numărul său de telefon pentru a debloca apelul direct.',
    orderCompletedCodReminderTitle: 'Reamintire Plată la Livrare (Cash)',
    orderCompletedCodReminderDesc: 'Vă rugăm să pregătiți suma exactă în lei pentru curier la sosirea acestuia la ușa dumneavoastră.',
    orderCompletedTrackOrderBtn: 'Urmărește Comanda în Timp Real',
    orderCompletedDeliveriesBtn: 'Vezi în Comenzile Mele',
    orderCompletedContinueShopBtn: 'Continuă Cumpărăturile',
    orderCompletedInvoiceBtn: 'Vezi Factura Fiscală',

    // Track Order Page
    trackOrderTitle: 'Urmărește Comanda',
    trackOrderSubtitle: 'Introdu numărul comenzii sau numărul de telefon pentru a vedea stadiul livrării și curierul alocat.',
    trackOrderBreadcrumb: 'Urmărește Comanda',
    trackOrderSearchPlaceholder: 'Introdu Număr Comandă (ex: CF-8921) sau telefon (+40...)',
    trackOrderBtn: 'Caută Comandă',
    trackOrderEnterValidNumber: 'Vă rugăm să introduceți un număr valid de comandă sau telefon.',
    trackOrderNotFound: 'Comanda Nu a Fost Găsită',
    trackOrderNotFoundDesc: 'Nu am găsit nicio livrare activă cu aceste date. Verificați numărul sau sunați la hotline-ul nostru din București.',
    trackOrderRecentOrders: 'Comenzi Recente',
    trackOrderQuickTrack: 'Urmărire Rapidă',
    trackOrderLiveEtaTitle: 'Interval Estimat de Sosire',
    trackOrderRouteBucharest: 'Hub Magazin București → Adresa Ta',

    // Account Page
    accountTitle: 'Contul Meu',
    accountBreadcrumb: 'Contul Meu',
    accountTabPersonalInfo: 'Informații Personale',
    accountTabMyOrders: 'Comenzile Mele',
    accountTabAddresses: 'Adrese de Livrare',
    accountTabPaymentMethod: 'Metode de Plată',
    accountTabPassword: 'Securitate & Parolă',
    accountTabLogout: 'Deconectare',
    accountFirstName: 'Prenume',
    accountLastName: 'Nume',
    accountEmail: 'Adresă Email',
    accountPhone: 'Număr Telefon',
    accountGender: 'Gen',
    accountGenderMale: 'Masculin',
    accountGenderFemale: 'Feminin',
    accountGenderOther: 'Altul / Nu doresc să menționez',
    accountAddressBookTitle: 'Adrese Salvate în România',
    accountPrimaryAddress: 'Adresă Principală de Livrare',
    accountUpdateChangesBtn: 'Salvează Modificările',
    accountChangesSaved: 'Modificările au fost salvate cu succes!',
    accountCodPreferenceTitle: 'Preferințe de Plată',
    accountCodPreferenceDesc: 'Plata la Livrare (Cash on Delivery) este setată ca metodă implicită pentru toate comenzile din România.'
  }
};

export const LANGUAGE_OPTIONS: { code: Language; label: string; nativeName: string; flag: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English (EN)', flag: '🇬🇧' },
  { code: 'si', label: 'Sinhala', nativeName: 'සිංහල (Sinhala)', flag: '🇱🇰' },
  { code: 'ro', label: 'Romanian', nativeName: 'Română (Romanian)', flag: '🇷🇴' }
];
