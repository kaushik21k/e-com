// Premium mock product database for the Flipkart-style E-Commerce Platform
export const sampleProducts = [
  {
    id: "mob-001",
    name: "Apple iPhone 15 Pro (Natural Titanium, 256 GB)",
    category: "Mobiles",
    subcategory: "iOS",
    brand: "Apple",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1695048132924-f7b76a0840b2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1695048133177-3e284c478a54?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 139900,
    price: 127999,
    discount: 8,
    rating: 4.7,
    ratingCount: 8492,
    reviewCount: 924,
    stock: 24,
    deliveryDays: 1,
    emiOption: "Starting from ₹6,200/month",
    warranty: "1 Year Domestic Warranty on Phone and Accessory Box",
    seller: "SuperCom Net",
    highlights: [
      "256 GB ROM | 6.1 inch Super Retina XDR Display",
      "48MP + 12MP + 12MP Camera | 12MP Front Camera",
      "A17 Pro Chip with 6-core GPU for console-level gaming",
      "Aerospace-grade titanium design with textured matte glass back",
      "Action Button for customizable shortcuts"
    ],
    specs: {
      "Model Name": "iPhone 15 Pro",
      "Color": "Natural Titanium",
      "Display Size": "6.1 inch",
      "Resolution": "2556 x 1179 Pixels",
      "Processor": "A17 Pro Chip",
      "Primary Camera": "48MP + 12MP + 12MP",
      "Secondary Camera": "12MP Front",
      "Weight": "187 g"
    },
    reviews: [
      { id: 1, name: "Aarav M.", rating: 5, comment: "Absolutely breathtaking! The titanium finish feels premium. Camera is outstanding under low light, and the Action Button is super convenient.", date: "2026-05-10", verified: true, likes: 142, dislikes: 4 },
      { id: 2, name: "Sneha P.", rating: 4, comment: "Super fast delivery. Phone is extremely premium. Only downside is the battery life is just okay for heavy gaming.", date: "2026-05-12", verified: true, likes: 64, dislikes: 2 },
      { id: 3, name: "Rohit K.", rating: 5, comment: "Upgraded from iPhone 11 and the difference is massive. 120Hz display is butter smooth! Zero regrets.", date: "2026-05-18", verified: true, likes: 21, dislikes: 1 }
    ]
  },
  {
    id: "mob-002",
    name: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 512 GB)",
    category: "Mobiles",
    subcategory: "Android",
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601784551146-ce0a457f5190?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 139999,
    price: 129999,
    discount: 7,
    rating: 4.8,
    ratingCount: 12340,
    reviewCount: 1432,
    stock: 18,
    deliveryDays: 2,
    emiOption: "Starting from ₹5,999/month",
    warranty: "1 Year Manufacturer Warranty for Device & 6 Months for In-Box Accessories",
    seller: "RetailNet",
    highlights: [
      "512 GB ROM | 12 GB RAM | S-Pen Included",
      "6.8 inch Quad HD+ Dynamic AMOLED 2X Display",
      "200MP + 50MP + 12MP + 10MP Camera | 12MP Front Camera",
      "Snapdragon 8 Gen 3 for Galaxy Processor",
      "Galaxy AI integration: Circle to Search, Live Translate, Note Assist"
    ],
    specs: {
      "Model Name": "Galaxy S24 Ultra",
      "Color": "Titanium Gray",
      "RAM": "12 GB",
      "Storage": "512 GB",
      "Display Size": "6.8 inch",
      "Processor": "Snapdragon 8 Gen 3",
      "Battery": "5000 mAh",
      "Primary Camera": "200MP + 50MP + 12MP + 10MP"
    },
    reviews: [
      { id: 1, name: "Kabir S.", rating: 5, comment: "Galaxy AI features are futuristic! The screen is extremely bright and anti-reflective. Camera zoom is insane.", date: "2026-05-14", verified: true, likes: 215, dislikes: 8 },
      { id: 2, name: "Ananya R.", rating: 5, comment: "The 200MP camera is out of this world. Battery backup lasts easily for 1.5 days. Expensive but absolutely worth it.", date: "2026-05-19", verified: true, likes: 89, dislikes: 3 }
    ]
  },
  {
    id: "mob-003",
    name: "OnePlus 12 5G (Silky Black, 256 GB)",
    category: "Mobiles",
    subcategory: "Android",
    brand: "OnePlus",
    images: [
      "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 69999,
    price: 64999,
    discount: 7,
    rating: 4.5,
    ratingCount: 3951,
    reviewCount: 421,
    stock: 45,
    deliveryDays: 1,
    emiOption: "Starting from ₹3,100/month",
    warranty: "1 Year Brand Warranty",
    seller: "OnePlus Retailer",
    highlights: [
      "256 GB ROM | 12 GB RAM | Snapdragon 8 Gen 3",
      "6.82 inch 2K Oriental AMOLED Display | 120Hz",
      "50MP + 64MP + 48MP Hasselblad Cameras",
      "5400 mAh Battery with 100W SuperVOOC Fast Charging"
    ],
    specs: {
      "Model Name": "OnePlus 12",
      "Color": "Silky Black",
      "RAM": "12 GB",
      "Display Size": "6.82 inch",
      "Processor": "Snapdragon 8 Gen 3",
      "Battery": "5400 mAh",
      "Primary Camera": "50MP + 64MP + 48MP"
    },
    reviews: [
      { id: 1, name: "Devansh G.", rating: 5, comment: "Charges from 0 to 100% in 26 minutes! Absolutely crazy speeds. Hasselblad camera colors are beautiful.", date: "2026-05-15", verified: true, likes: 58, dislikes: 1 }
    ]
  },
  {
    id: "elec-001",
    name: "Apple MacBook Pro 14 (M3 Max chip, 36GB Unified Memory, 1TB SSD)",
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 319900,
    price: 299900,
    discount: 6,
    rating: 4.9,
    ratingCount: 512,
    reviewCount: 88,
    stock: 8,
    deliveryDays: 2,
    emiOption: "Starting from ₹14,500/month",
    warranty: "1 Year Apple Care Protection Warranty",
    seller: "AppleStore Premium",
    highlights: [
      "14.2 inch Liquid Retina XDR Display",
      "Apple M3 Max Chip with 14-core CPU and 30-core GPU",
      "36 GB Unified Memory | 1 TB SSD Storage",
      "Up to 18 hours of premium battery backup",
      "Beautiful Space Black finish"
    ],
    specs: {
      "Processor": "Apple M3 Max",
      "RAM": "36 GB",
      "SSD Capacity": "1 TB",
      "OS": "macOS Sonoma",
      "Display Size": "14.2 inch",
      "Weight": "1.62 kg"
    },
    reviews: [
      { id: 1, name: "Vikram N.", rating: 5, comment: "Absolute power monster. Compiled my large React Native app in seconds. Keyboard is a joy to type on. Screen is mesmerizing.", date: "2026-04-29", verified: true, likes: 45, dislikes: 0 }
    ]
  },
  {
    id: "elec-002",
    name: "Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones",
    category: "Electronics",
    subcategory: "Audio",
    brand: "Sony",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 34990,
    price: 26999,
    discount: 22,
    rating: 4.6,
    ratingCount: 15902,
    reviewCount: 1824,
    stock: 50,
    deliveryDays: 1,
    emiOption: "Starting from ₹1,290/month",
    warranty: "1 Year Brand Warranty",
    seller: "SonyStore",
    highlights: [
      "Industry-leading Active Noise Cancellation (ANC)",
      "Up to 30 Hours of continuous battery life | Quick Charge: 3 min for 3 hrs",
      "Ultra-comfortable lightweight design with soft-fit leather",
      "Multipoint connection: Connect to two devices simultaneously",
      "High-Res Audio and Crystal Clear Calls with 4 beamforming mics"
    ],
    specs: {
      "Model": "WH-1000XM5",
      "Type": "Over-Ear",
      "Connectivity": "Bluetooth 5.2",
      "ANC": "Yes",
      "Battery Life": "30 hrs",
      "Microphone": "Yes (8 Mics total)"
    },
    reviews: [
      { id: 1, name: "Pranav J.", rating: 5, comment: "The noise cancellation is pure magic. It blocks office conversations entirely. Sound signature is balanced, bass is deep but clean.", date: "2026-05-02", verified: true, likes: 98, dislikes: 2 },
      { id: 2, name: "Riya M.", rating: 4, comment: "Great sound, but the hinge design is slightly delicate. Love the carry case though.", date: "2026-05-08", verified: true, likes: 31, dislikes: 1 }
    ]
  },
  {
    id: "elec-003",
    name: "LG 55 inch OLED 4K Ultra HD Smart TV",
    category: "Electronics",
    subcategory: "TVs",
    brand: "LG",
    images: [
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 159990,
    price: 99990,
    discount: 37,
    rating: 4.8,
    ratingCount: 3120,
    reviewCount: 412,
    stock: 12,
    deliveryDays: 3,
    emiOption: "Starting from ₹4,750/month",
    warranty: "3 Years Comprehensive OLED Warranty",
    seller: "LGOfficial",
    highlights: [
      "55 inch OLED 4K Ultra HD | Self-Lit Pixels",
      "120Hz Refresh Rate | G-Sync & FreeSync Compatible",
      "α9 AI Processor Gen6 | WebOS Smart TV Platform",
      "Dolby Vision IQ & Dolby Atmos Sound"
    ],
    specs: {
      "Display Type": "OLED",
      "Resolution": "3840 x 2160 Pixels",
      "Refresh Rate": "120 Hz",
      "Smart TV": "Yes, WebOS",
      "Speaker Output": "40 W"
    },
    reviews: [
      { id: 1, name: "Tushar D.", rating: 5, comment: "Perfect pitch blacks. Playing PS5 games at 4K 120Hz is stunning. Highly recommended for movie enthusiasts.", date: "2026-05-01", verified: true, likes: 45, dislikes: 0 }
    ]
  },
  {
    id: "fash-001",
    name: "Nike Air Max 90 Premium Men Sneakers (White/Blue, Size 9)",
    category: "Fashion",
    subcategory: "Footwear",
    brand: "Nike",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 11995,
    price: 8995,
    discount: 25,
    rating: 4.4,
    ratingCount: 2980,
    reviewCount: 341,
    stock: 60,
    deliveryDays: 2,
    emiOption: "No Cost EMI available",
    warranty: "3 Months Product Warranty",
    seller: "NikeRetail",
    highlights: [
      "Premium Leather and Mesh Upper",
      "Visible Max Air cushioning unit in the heel",
      "Padded collar and rubber waffle outsole for durable traction",
      "Sleek heritage retro running aesthetics"
    ],
    specs: {
      "Type": "Sneakers",
      "Outer Material": "Leather, Mesh",
      "Sole Material": "Rubber",
      "Color": "White/Blue",
      "Ideal For": "Men"
    },
    reviews: [
      { id: 1, name: "Akash V.", rating: 5, comment: "Classic look! Extremely comfortable for long walks. The colorway is absolutely fresh.", date: "2026-05-05", verified: true, likes: 41, dislikes: 1 }
    ]
  },
  {
    id: "fash-002",
    name: "Levi's Men's 511 Slim Fit Premium Stretchable Jeans",
    category: "Fashion",
    subcategory: "Clothing",
    brand: "Levi's",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 3999,
    price: 2399,
    discount: 40,
    rating: 4.2,
    ratingCount: 15402,
    reviewCount: 1204,
    stock: 120,
    deliveryDays: 1,
    emiOption: "N/A",
    warranty: "N/A",
    seller: "LevisStore",
    highlights: [
      "98% Cotton, 2% Elastane for superior stretch comfort",
      "Slim from hip to ankle | Sits below the waist",
      "Five-pocket classic styling",
      "Durable double stitching"
    ],
    specs: {
      "Fit": "Slim Fit",
      "Fabric": "Cotton Blend",
      "Style": "511",
      "Color": "Dark Indigo"
    },
    reviews: [
      { id: 1, name: "Aman P.", rating: 4, comment: "Fitting is perfect! Fabric stretch is really helpful when sitting for long hours. Premium feel.", date: "2026-05-11", verified: true, likes: 23, dislikes: 2 }
    ]
  },
  {
    id: "groc-001",
    name: "Daawat Rozana Gold Basmati Rice (5kg Premium Pack)",
    category: "Grocery",
    subcategory: "Staples",
    brand: "Daawat",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 550,
    price: 399,
    discount: 27,
    rating: 4.3,
    ratingCount: 42091,
    reviewCount: 3201,
    stock: 500,
    deliveryDays: 1,
    emiOption: "N/A",
    warranty: "Best Before 24 Months from Packaging Date",
    seller: "RetailNet Staples",
    highlights: [
      "Aromatic long grains that double in size when cooked",
      "Aged to perfection for non-sticky fluffy texture",
      "Cleaned and hygienically processed",
      "Perfect for daily cooking like Pulao, Biryani, or plain rice"
    ],
    specs: {
      "Form Factor": "Polished Rice Grains",
      "Quantity": "5 kg",
      "Container Type": "Pouch",
      "Organic": "No"
    },
    reviews: [
      { id: 1, name: "Nisha R.", rating: 5, comment: "Daawat Rozana has excellent aroma. Rice doesn't break and expands perfectly. Very quick delivery via grocery flash.", date: "2026-05-13", verified: true, likes: 62, dislikes: 0 }
    ]
  },
  {
    id: "groc-002",
    name: "Happilo Premium California Roasted & Salted Almonds (500g)",
    category: "Grocery",
    subcategory: "Dry Fruits",
    brand: "Happilo",
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 799,
    price: 499,
    discount: 37,
    rating: 4.5,
    ratingCount: 18451,
    reviewCount: 1205,
    stock: 250,
    deliveryDays: 1,
    emiOption: "N/A",
    warranty: "Best Before 9 Months from Packing",
    seller: "HappiloDirect",
    highlights: [
      "100% Premium California Almonds",
      "Roasted oil-free and salted perfectly",
      "Rich source of protein, fiber, and Omega-3",
      "Resealable packaging to maintain crunchiness"
    ],
    specs: {
      "Type": "Almonds",
      "Quantity": "500 g",
      "Flavor": "Salted",
      "Container Type": "Ziplock Bag"
    },
    reviews: [
      { id: 1, name: "Sunita G.", rating: 5, comment: "Crunchy and fresh! Salt is perfect, not too high. Packaging is very good with a reusable zip seal.", date: "2026-05-09", verified: true, likes: 31, dislikes: 1 }
    ]
  },
  {
    id: "home-001",
    name: "Dyson V15 Detect Cordless Vacuum Cleaner",
    category: "Home Appliances",
    subcategory: "Vacuum Cleaners",
    brand: "Dyson",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 65900,
    price: 59900,
    discount: 9,
    rating: 4.8,
    ratingCount: 1242,
    reviewCount: 154,
    stock: 15,
    deliveryDays: 1,
    emiOption: "Starting from ₹3,200/month",
    warranty: "2 Years Dyson India Warranty",
    seller: "DysonIndia",
    highlights: [
      "Laser reveals invisible dust on hard floors",
      "Piezo sensor continuously sizes and counts dust particles",
      "Powerful Dyson Hyperdymium Motor rotates up to 125,000rpm",
      "Up to 60 minutes of fade-free run time"
    ],
    specs: {
      "Type": "Cordless Handstick",
      "Run Time": "60 min",
      "Charge Time": "4.5 hrs",
      "Dust Capacity": "0.77 L",
      "Weight": "3 kg"
    },
    reviews: [
      { id: 1, name: "Deepak S.", rating: 5, comment: "Outstanding vacuum cleaner. The green laser is actually extremely helpful to find cat fur on tiles. Expensive but makes cleaning fun.", date: "2026-05-03", verified: true, likes: 22, dislikes: 0 }
    ]
  },
  {
    id: "furn-001",
    name: "Sleepyhead Premium Solid Wood Study & Work Table",
    category: "Furniture",
    subcategory: "Tables",
    brand: "Sleepyhead",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 8999,
    price: 5499,
    discount: 38,
    rating: 4.3,
    ratingCount: 1450,
    reviewCount: 198,
    stock: 30,
    deliveryDays: 3,
    emiOption: "No Cost EMI available",
    warranty: "1 Year Brand Warranty",
    seller: "SleepyheadDirect",
    highlights: [
      "Solid Sheesham Wood for exceptional durability",
      "Gorgeous natural wood grain finish",
      "Ample desk space: 110 x 55 cm | Comfortable working height",
      "Includes document shelf and dedicated wire organizer slot"
    ],
    specs: {
      "Material": "Sheesham Wood",
      "Dimensions": "110 cm x 55 cm x 75 cm",
      "Weight": "16 kg",
      "Assembly Required": "Yes (Free technician demo provided)"
    },
    reviews: [
      { id: 1, name: "Sameer T.", rating: 5, comment: "Amazing study table! Real solid wood, very sturdy. Flipkart technician arrived next day of delivery for assembly. Top service.", date: "2026-05-11", verified: true, likes: 14, dislikes: 0 }
    ]
  },
  {
    id: "beau-001",
    name: "CeraVe Hydrating Facial Cleanser for Normal to Dry Skin (236ml)",
    category: "Beauty",
    subcategory: "Skincare",
    brand: "CeraVe",
    images: [
      "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 1250,
    price: 999,
    discount: 20,
    rating: 4.6,
    ratingCount: 9481,
    reviewCount: 780,
    stock: 80,
    deliveryDays: 1,
    emiOption: "N/A",
    warranty: "Best Before 36 Months from MFG",
    seller: "CeraVeStore",
    highlights: [
      "Formulated with 3 essential ceramides and hyaluronic acid",
      "Gently cleanses and hydrates without stripping skin barrier",
      "MVE Technology: Controlled release for all-day hydration",
      "Fragrance-free, non-comedogenic, and paraben-free"
    ],
    specs: {
      "Type": "Liquid Cleanser",
      "Skin Type": "Normal to Dry",
      "Volume": "236 ml",
      "Applied For": "Face Cleansing & Hydration"
    },
    reviews: [
      { id: 1, name: "Juhi K.", rating: 5, comment: "Dermatologist recommended and truly works. Saved my dry winter skin. My skin feels plump and not tight at all after washing.", date: "2026-05-16", verified: true, likes: 78, dislikes: 1 }
    ]
  },
  {
    id: "spt-001",
    name: "Yonex Astrox 99 Play Graphite Head-Heavy Badminton Racket",
    category: "Sports",
    subcategory: "Badminton",
    brand: "Yonex",
    images: [
      "https://images.unsplash.com/photo-1613918431201-49fa794328a6?w=600&auto=format&fit=crop&q=80"
    ],
    originalPrice: 4899,
    price: 3699,
    discount: 24,
    rating: 4.4,
    ratingCount: 3912,
    reviewCount: 290,
    stock: 40,
    deliveryDays: 2,
    emiOption: "N/A",
    warranty: "6 Months Yonex India Warranty on Shaft",
    seller: "YonexDistributors",
    highlights: [
      "Full Graphite Racket | Rotational Generator System",
      "Head-Heavy Balance for explosive power smashes",
      "Flex: Medium | Weight: 4U (Avg. 83g)",
      "Pre-strung with high quality Yonex string"
    ],
    specs: {
      "Material": "Graphite",
      "Balance": "Head-Heavy",
      "Weight": "83 g",
      "String Tension": "20-28 lbs"
    },
    reviews: [
      { id: 1, name: "Mayur B.", rating: 5, comment: "Brilliant racket for offensive players. Smashes have high power. Genuine Yonex product with scratch validation code.", date: "2026-05-04", verified: true, likes: 33, dislikes: 2 }
    ]
  }
];

// Helper to deterministically generate exactly 20+ verified reviews for any product on demand
const reviewerNames = [
  "Aarav M.", "Sneha P.", "Rohit K.", "Kabir S.", "Ananya R.", "Devansh G.", "Vikram N.", "Pranav J.", "Riya M.", "Tushar D.", 
  "Akash V.", "Aman P.", "Nisha R.", "Sunita G.", "Deepak S.", "Sameer T.", "Juhi K.", "Mayur B.", "Vijay R.", "Rohan S.", 
  "Pooja C.", "Karan T.", "Divya K.", "Amit B.", "Neha A.", "Sanjay P.", "Kriti S.", "Arjun V.", "Ritu D.", "Harsh N.", 
  "Meera J.", "Rahul Y.", "Shreya P.", "Manish G.", "Swati R.", "Abhishek K.", "Aditi V.", "Yash D.", "Kavita S.", "Vivek P."
];

const positiveComments = [
  "Absolutely breathtaking! The quality feels extremely premium and top-tier.",
  "Super fast delivery, received it within 24 hours. Exceeded all my expectations.",
  "Butter smooth performance! Highly recommended for daily intensive use.",
  "Real premium luxury feel, worth every single rupee! Excellent product.",
  "Very satisfying experience. The build quality is absolutely solid and elegant.",
  "Outstanding materials and gorgeous design. Zero regrets about this purchase.",
  "Works flawlessly! Truly a masterpiece of engineering. Best buy of the year.",
  "Extremely happy with the purchase. Standard fits perfectly and looks majestic.",
  "Genuine product, came with official scratch validation code and premium box.",
  "Excellent packaging, quick shipping, and top-tier performance. Solid 10/10!"
];

const goodComments = [
  "This is extremely premium. Only minor downside is battery/power drains slightly fast.",
  "Really solid value for money! Performs exactly as advertised, very reliable.",
  "Awesome design. Delivery took 2 days but the product is absolute top class.",
  "Fitting and general performance is perfect! Very happy with it.",
  "High-quality finish, feels like a luxury item in the hand. Highly recommended.",
  "Highly functional and stylish. A fine balance of aesthetics and usability.",
  "Great specs, although it took a little time to set up. Very satisfied."
];

const averageComments = [
  "Decent product, build quality is average but works fine for basic usage.",
  "Good for daily light tasks, but not suitable for heavy industrial performance.",
  "Average features for this price range. Satisfied but not overly wowed.",
  "Packaging was slightly torn but the item inside was undamaged and works.",
  "Okay purchase, does the job. Standard construction and standard features."
];

const generateDeterministicReviews = (productId, rating) => {
  const reviews = [];
  let hash = 0;
  for (let charIndex = 0; charIndex < productId.length; charIndex++) {
    hash = (hash << 5) - hash + productId.charCodeAt(charIndex);
    hash |= 0;
  }
  hash = Math.abs(hash);

  for (let rIndex = 1; rIndex <= 20; rIndex++) {
    const seed = hash + rIndex * 37;
    const name = reviewerNames[seed % reviewerNames.length];
    const rRating = Math.max(3, Math.min(5, Math.floor(rating) + (seed % 2 === 0 ? 0 : (seed % 3 === 0 ? -1 : 1))));
    
    let comment = "";
    if (rRating === 5) {
      comment = positiveComments[seed % positiveComments.length];
    } else if (rRating === 4) {
      comment = goodComments[seed % goodComments.length];
    } else {
      comment = averageComments[seed % averageComments.length];
    }

    const day = 1 + (seed % 20);
    const dateStr = `2026-05-${day < 10 ? '0' + day : day}`;
    
    reviews.push({
      id: rIndex,
      name,
      rating: rRating,
      comment,
      date: dateStr,
      verified: true,
      likes: seed % 80,
      dislikes: seed % 5
    });
  }
  return reviews;
};

// Realistic mock detail arrays per category
const categoryDetails = {
  "Mobiles": {
    subs: ["Android", "iOS", "Budget", "Foldable"],
    brands: ["Apple", "Samsung", "OnePlus", "Google", "Xiaomi", "Realme"],
    models: ["Pro Max Extreme", "Galaxy Ultra", "Fold Pro", "Nord Lite", "15 Pro", "A55 Super"],
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601784551146-ce0a457f5190?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "Stunning high-refresh screen with OLED technology",
      "Pro-grade multi-lens camera for high-detail captures",
      "Extreme battery lifecycle with smart-charge diagnostics",
      "Aerospace-grade body shell construction for drop safety",
      "Next-generation neural AI chips built-in for automation"
    ]
  },
  "Electronics": {
    subs: ["Laptops", "Audio", "TVs", "Wearables", "Cameras"],
    brands: ["Apple", "Sony", "LG", "HP", "Canon", "Bose", "Asus"],
    models: ["MacBook Extreme", "Cinema TV Pro", "Studio Beats", "Mirrorless Pro", "Vanguard Book"],
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "Ultimate cinema audio profile with surround support",
      "Extreme clarity screen panel optimized for bright light",
      "High performance graphics controller built-in",
      "Multiple fast-data port slots for peripherals",
      "Ultra-comfort ergonomics for extended sessions"
    ]
  },
  "Fashion": {
    subs: ["Footwear", "Clothing", "Accessories", "Watches"],
    brands: ["Nike", "Adidas", "Puma", "Levis", "Zara", "Fossil", "Tommy Hilfiger"],
    models: ["Air Max Custom", "Stretchable Activewear", "Premium Denim Fit", "Classic Chrono", "Sling Bag Series"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "Premium breathable material for high comfort",
      "Handcrafted double seams for exceptional durability",
      "Anti-humidity weave technology keeps you clean and dry",
      "Classic modern design matches all casual fits",
      "Stretches naturally with body mechanics"
    ]
  },
  "Grocery": {
    subs: ["Staples", "Dry Fruits", "Beverages", "Snacks"],
    brands: ["Daawat", "Tata", "Happilo", "Nescafe", "Catch"],
    models: ["Aromatic Basmati Gold", "Premium Ziplock Pack", "Assam Leaf Classic", "Organic Roasted Gold"],
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "100% natural organic sorting and verification",
      "Packed hygienically inside secure zipper packs",
      "Extremely fresh scent profile, high quality standards",
      "Rich source of standard daily nutrients",
      "Great shelf lifecycle with secure sealing locks"
    ]
  },
  "Home Appliances": {
    subs: ["Vacuum Cleaners", "Kitchen", "Climate Control", "Washers"],
    brands: ["Dyson", "Philips", "LG", "Samsung", "Panasonic"],
    models: ["Cyclone Pro Detect", "Air Purifier HEPA", "Smart Induction Cooker", "Twin-Tub Deluxe"],
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "Powerful modern hyper-suction/airflow motor",
      "Smart diagnostics screen reveals particulate data",
      "Ultra-low noise profile matches library quietness",
      "HEPA allergen filters capture micro-particles",
      "Extremely robust exterior construction build"
    ]
  },
  "Furniture": {
    subs: ["Tables", "Chairs", "Sofas", "Beds"],
    brands: ["Sleepyhead", "Green Soul", "Godrej Interio", "Wakefit"],
    models: ["Solid Sheesham Study Desk", "Ergonomic Ortho Chair", "Premium Velvet Sofa Bed", "Modular Bedstead"],
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "Handpicked real solid wood for outstanding longevity",
      "Highly responsive ergonomics aligns spine perfectly",
      "Scratch-proof polished finish resists moisture and stains",
      "Extremely robust frame structure handles heavy loads",
      "Comes with quick-setup instructional layout details"
    ]
  },
  "Beauty": {
    subs: ["Skincare", "Fragrance", "Makeup", "Haircare"],
    brands: ["CeraVe", "Chanel", "Nivea", "Loreal", "Maybelline"],
    models: ["Hydrating Daily Cleanser", "Coco Mademoiselle Luxury", "Ceramide Intense Lotion", "Pure Mineral Blush"],
    images: [
      "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "Dermatologically verified and hypoallergenic",
      "Durable all-day moisture locks keep skin soft",
      "Completely organic scent extracts, premium formula",
      "Paraben-free and cruelty-free clean certification",
      "Rich in essential skin minerals and vitamins"
    ]
  },
  "Books": {
    subs: ["Fiction", "Non-Fiction", "Self-Help", "Educational"],
    brands: ["Penguin", "HarperCollins", "Scholastic", "Oxford"],
    models: ["Bestseller Collection", "Daily Self-Mastery Guide", "Global History Chronicles", "Elite Calculus Series"],
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "Top globally rated bestseller by leading critics",
      "Housed in premium heavy-weight paperback layout",
      "Excellent print clarity with thick acid-free pages",
      "Includes bonus interview articles and author notes",
      "Compelling layout details make it a fantastic gift"
    ]
  },
  "Sports": {
    subs: ["Badminton", "Fitness", "Cricket", "Tennis"],
    brands: ["Yonex", "Kore", "MRF", "Nike", "Cosco"],
    models: ["Astrox Carbon Pro Racket", "Full Body Home Gym Kit", "English Willow Elite Bat", "Hi-Tension Pro"],
    images: [
      "https://images.unsplash.com/photo-1613918431201-49fa794328a6?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "Elite carbon composites offer extreme dynamic control",
      "Ergonomic handle grips prevent slips and sweat damage",
      "Perfect balanced weight distribution for high smash power",
      "Shock absorption technology protects players from injury",
      "Approved officially for league games and certifications"
    ]
  },
  "Toys": {
    subs: ["Puzzles", "Action Figures", "Board Games", "Building Blocks"],
    brands: ["Lego", "Hasbro", "Mattel", "Funko"],
    models: ["Technic Advanced Set", "Superheroes Action Pack", "Classic Strategy Game", "Vinyl Collectible"],
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "High quality ABS materials, non-toxic and secure",
      "Develops complex cognitive analytical skills",
      "Sleek collectible figures with beautiful details",
      "Great for family bonding time and parties",
      "Officially licensed authentic branded collection"
    ]
  },
  "Accessories": {
    subs: ["Bags", "Travel", "Tech Cases", "Straps"],
    brands: ["Wildcraft", "Safari", "Spigen", "Skybags"],
    models: ["Ergonomic Laptop Shield Back", "Polycarbonate Travel Trolley", "Armor Cases Ultimate", "Silicon Comfort Band"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80"
    ],
    highlights: [
      "Waterproof durable exterior guard protects contents",
      "Ergonomic weight distribution buffers shoulder stress",
      "Includes lock systems and multiple organizer partitions",
      "Sleek luxury design matches professional lifestyles",
      "Double reinforced zipper sliders for easy slider action"
    ]
  }
};

// Dynamically generate 60,000 highly unique products with varied images, premium prices, and custom specs
const addDummyProducts = () => {
  const list = [...sampleProducts];
  const categoriesList = Object.keys(categoryDetails);
  
  // Total target products: 60,000 items (exceeding 50k as requested)
  const totalGenerate = 60000;
  
  for (let i = 1; i <= totalGenerate; i++) {
    const catName = categoriesList[i % categoriesList.length];
    const catData = categoryDetails[catName];
    
    const sub = catData.subs[i % catData.subs.length];
    const brand = catData.brands[i % catData.brands.length];
    const model = catData.models[i % catData.models.length];
    
    // 1. Rotate and construct a unique image gallery subset for each product
    const imageCount = catData.images.length;
    const productImages = [];
    for (let j = 0; j < Math.min(3, imageCount); j++) {
      productImages.push(catData.images[(i + j) % imageCount]);
    }
    
    // 2. Generate premium, highly realistic category-specific pricing
    let origPrice = 400;
    if (catName === "Mobiles") {
      origPrice = 12000 + ((i * 79) % 120000); // ₹12,000 to ₹1,32,000 range
    } else if (catName === "Electronics") {
      origPrice = 8000 + ((i * 131) % 95000);  // ₹8,000 to ₹1,03,000 range
    } else if (catName === "Home Appliances") {
      origPrice = 6000 + ((i * 97) % 65000);   // ₹6,000 to ₹71,000 range
    } else if (catName === "Furniture") {
      origPrice = 3000 + ((i * 59) % 45000);   // ₹3,000 to ₹48,000 range
    } else if (catName === "Fashion") {
      origPrice = 599 + ((i * 37) % 4500);     // ₹599 to ₹5,099 range
    } else if (catName === "Grocery") {
      origPrice = 49 + ((i * 17) % 450);       // ₹49 to ₹499 range
    } else {
      origPrice = 299 + ((i * 29) % 8000);     // ₹299 to ₹8,299 range
    }
    
    const discount = 5 + (i % 65);
    const price = Math.round(origPrice * (1 - discount / 100));
    
    const rating = parseFloat((4.0 + ((i * 7) % 10) * 0.1).toFixed(1));
    const ratingCount = 10 + ((i * 17) % 50000);
    const reviewCount = 20 + ((i * 3) % 500);
    
    // 3. Dynamic custom highlights per product
    const productHighlights = [
      `Premium high-performance ${brand} craftsmanship`,
      `Engineered with state-of-the-art ${model} optimization`,
      `Sleek user ergonomics designed for standard ${sub} workflows`,
      `Dynamic battery lifecycle diagnostics built-in`,
      `Supported by VibeCart Certified Assured brand warranty`
    ];

    // 4. Dynamic category-specific specifications grid
    let productSpecs = {
      "Model Name": `${brand} ${model} (Ver. ${100 + i})`,
      "Series": `${sub} Series`,
      "Brand": brand,
      "Seller": "VibeCart Certified Retailer",
      "Release Year": "2026",
      "Material": "Premium Composite Finish"
    };

    if (catName === "Mobiles") {
      productSpecs = {
        ...productSpecs,
        "Storage Capacity": `${128 + ((i * 128) % 384)} GB`,
        "RAM Size": `${6 + ((i * 2) % 10)} GB`,
        "Display Screen Size": `${6.1 + ((i * 3) % 8) * 0.1} inches`,
        "Primary Rear Camera": `${48 + ((i * 16) % 60)} MP`
      };
    } else if (catName === "Electronics") {
      productSpecs = {
        ...productSpecs,
        "Display Size": `${13.3 + ((i * 2) % 30) * 0.5} inches`,
        "Processor Family": i % 2 === 0 ? "Intel Core i7 Gen-14" : "AMD Ryzen 7 Series",
        "Hardware Interface": "USB-C, HDMI 2.1, Audio Jack",
        "Speakers": "Dolby Atmos Cinema Audio"
      };
    } else if (catName === "Fashion") {
      productSpecs = {
        ...productSpecs,
        "Ideal Gender": i % 2 === 0 ? "Men" : "Women",
        "Fabric Blend": i % 3 === 0 ? "100% Organic Combed Cotton" : (i % 3 === 1 ? "Full-grain Leather Finish" : "Spandex Comfort Blend"),
        "Fit Type": i % 2 === 0 ? "Modern Slim Fit" : "Regular Comfort Fit"
      };
    }
    
    const product = {
      id: `p-${i}`,
      name: `${brand} ${model} Series ${sub} (Ver. ${100 + i})`,
      category: catName,
      subcategory: sub,
      brand: brand,
      images: productImages,
      originalPrice: origPrice,
      price: price,
      discount: discount,
      rating: rating > 5.0 ? 4.9 : rating,
      ratingCount: ratingCount,
      reviewCount: reviewCount,
      stock: 10 + (i % 200),
      deliveryDays: 1 + (i % 4),
      emiOption: i % 2 === 0 ? "EMI options available starting from ₹1,200" : "N/A",
      warranty: "1 Year Official Brand Warranty",
      seller: "VibeCart Certified Retailer",
      highlights: productHighlights,
      specs: productSpecs
    };
    
    // Dynamically query reviews on the fly via property getter
    Object.defineProperty(product, 'reviews', {
      get: function() {
        return generateDeterministicReviews(this.id, this.rating);
      },
      enumerable: true,
      configurable: true
    });
    
    list.push(product);
  }
  
  return list;
};

export const allProducts = addDummyProducts();
