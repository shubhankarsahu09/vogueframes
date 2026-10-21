/* =========================================
   VOGUE FRAMES — Products Data
   Single source of truth for all products
   ========================================= */

const PRODUCTS_DATA = {
  '45-posters-pack': {
    id: '45-posters-pack',
    name: '45 Posters Pack',
    category: 'Posters',
    categoryFilter: 'posters',
    customizable: true,
    price: 399,
    originalPrice: null,
    badge: '45 Pcs',
    badgeType: 'new',
    image: 'product_45posters.jpg',
    images: ['product_45posters.jpg'],
    rating: 4.9,
    reviewCount: 38,
    description: 'Transform your space with our iconic 45 Car Posters Pack — a curated collection of premium automotive art prints featuring the world\'s most legendary cars. Every single pack is 100% customizable: swap cars, request specific models, or send your own photos. Printed on high-quality paper with vivid, long-lasting colors.',
    highlights: [
      '🎨 100% Fully Customizable — Swap cars, choose models, or send personal photos',
      '45 unique automotive art prints in one pack',
      'High-quality print on premium high-GSM art paper',
      'Sizes perfect for gallery walls & room setups',
      'Features Porsche, Ferrari, BMW, Dodge, Bugatti & more',
      'Ready to stick — no frame needed',
      'Ships rolled in a sturdy protective tube'
    ],
    specs: {
      'Customization': '100% Customizable (Cars, Photos, Sizes)',
      'Pack Contains': '45 Posters',
      'Print Quality': 'Premium Matte Finish',
      'Paper Type': 'High GSM Premium Art Paper',
      'Style': 'Automotive / Car Art',
      'Suitable For': 'Bedroom, Study Room, Gaming Setup',
      'Order Type': 'Custom Made to Order'
    },
    reviews: [
      { name: 'Aryan K.', handle: '@aryan.kxrma', initials: 'AK', rating: 5, text: 'Customized 10 of the posters with my own favourite BMWs — they came out looking insane! 100% worth it.' },
      { name: 'Rohan M.', handle: '@rohan.m', initials: 'RM', rating: 5, text: 'The quality is unreal for the price. 45 posters and every one of them looks stunning. Porsche and Ferrari ones are my favourites!' },
      { name: 'Dev S.', handle: '@dev.setup', initials: 'DS', rating: 5, text: 'Best room decor purchase I\'ve made. Vogue Frames really delivers on quality. My room looks like a car museum now 🔥' }
    ]
  },

  '24-posters-pack': {
    id: '24-posters-pack',
    name: '24 Posters Pack',
    category: 'Posters',
    categoryFilter: 'posters',
    customizable: true,
    price: 299,
    originalPrice: null,
    badge: '24 Pcs',
    badgeType: 'new',
    image: 'product_24posters.jpg',
    images: ['product_24posters.jpg'],
    rating: 4.8,
    reviewCount: 21,
    description: 'The perfect starter pack for car enthusiasts. Our 24 Posters Pack features a hand-picked selection of the most iconic automotive art prints. 100% customizable — pick your dream garage lineup, car brands, or include your own custom photos.',
    highlights: [
      '🎨 100% Fully Customizable — Pick your dream car lineup or custom prints',
      '24 premium automotive art prints',
      'Curated mix of iconic car brands',
      'High-quality matte print finish on thick art paper',
      'Perfect for desk setups and smaller rooms',
      'Includes Mercedes, McLaren, Shelby, BMW, Porsche & more',
      'Ships rolled in a protective tube'
    ],
    specs: {
      'Customization': '100% Customizable (Brands, Prints, Photos)',
      'Pack Contains': '24 Posters',
      'Print Quality': 'Premium Matte',
      'Paper Type': 'High GSM Art Paper',
      'Style': 'Automotive / Car Art',
      'Suitable For': 'Bedroom, Study, Gaming Setup',
      'Order Type': 'Custom Made to Order'
    },
    reviews: [
      { name: 'Sia R.', handle: '@siar.edits', initials: 'SR', rating: 5, text: 'Asked them to add a custom GT3 RS poster to the pack and they did it without any hassle. Top tier customer service!' },
      { name: 'Karan P.', handle: '@karan.p', initials: 'KP', rating: 5, text: 'Perfect starter pack. Looks amazing on my wall. Very happy with the quality and quick delivery.' },
      { name: 'Nisha M.', handle: '@nisha.mode', initials: 'NM', rating: 4, text: 'Really nice pack. All posters look premium. Would love even more variety but overall very satisfied!' }
    ]
  },

  'porsche-frame': {
    id: 'porsche-frame',
    name: 'Porsche Frame',
    category: 'Frames',
    categoryFilter: 'frames',
    customizable: true,
    price: 649,
    originalPrice: null,
    badge: 'Frames',
    badgeType: '',
    image: 'product_frame1.jpg',
    images: ['product_frame1.jpg'],
    rating: 5.0,
    reviewCount: 17,
    description: 'A statement piece for any room. The Porsche Frame features a stunning Porsche 911 RSR art print in a sleek solid frame — ready to hang and instantly elevate your space. 100% customizable: choose your frame color (black, white, or wood), swap for any car print, or frame your personal car/photo.',
    highlights: [
      '🎨 100% Fully Customizable — Choose frame color, swap car artwork, or frame your own photo',
      'Comes with premium Porsche 911 RSR art print',
      'Sleek solid frame with glass finish',
      'Ready to hang — hanging hardware included',
      'Vivid, ultra-high resolution print',
      'Perfect centerpiece for bedroom, office or setup',
      'Custom dimensions available upon request'
    ],
    specs: {
      'Customization': '100% Customizable (Frame Color, Photo, Dimensions)',
      'Frame Material': 'Solid Wood / Glass Finish',
      'Frame Colour': 'White (Black & Wood available on request)',
      'Print Style': 'Porsche 911 RSR — Red Edition (Customizable)',
      'Includes': 'Frame + Printed Art + Hanging Hardware',
      'Suitable For': 'Bedroom, Office, Living Room',
      'Order Type': 'Custom Made to Order'
    },
    reviews: [
      { name: 'Virat S.', handle: '@virat.setup', initials: 'VS', rating: 5, text: 'I asked for a black frame instead of white and it was done effortlessly. The Porsche print is vivid and sharp!' },
      { name: 'Aditya R.', handle: '@aditya.r', initials: 'AR', rating: 5, text: 'Premium quality. The frame is solid and the print is sharp. Worth every rupee. Vogue Frames never disappoints.' },
      { name: 'Priya L.', handle: '@priya.l', initials: 'PL', rating: 5, text: 'Bought it as a birthday gift and customized it. Looks way more expensive than what I paid. 10/10 recommend.' }
    ]
  },

  'combo-frame': {
    id: 'combo-frame',
    name: 'Combo Frame',
    category: 'Frames',
    categoryFilter: 'frames',
    customizable: true,
    price: 2199,
    originalPrice: null,
    badge: 'Bundle',
    badgeType: '',
    image: 'product_combo_frame.jpg',
    images: ['product_combo_frame.jpg'],
    rating: 4.9,
    reviewCount: 12,
    description: 'The ultimate gallery wall setup in one bundle. Includes 4 premium framed prints — Porsche 911 RSR, Porsche 911, BMW M Series, and BMW M5. 100% customizable: mix & match any 4 car artworks, select your frame color combination, or add your personal photos!',
    highlights: [
      '🎨 100% Fully Customizable — Pick any 4 car artworks, frame colors & layouts',
      '4 premium framed prints in one complete bundle',
      'Includes: Porsche RSR, Porsche 911, BMW M, BMW M5',
      'Mix of white and black frames for striking contrast',
      'All 4 frames ready to hang with hardware',
      'Vivid, high-resolution prints in each frame',
      'Best value for a complete gallery wall transformation'
    ],
    specs: {
      'Customization': '100% Customizable (Select all 4 prints & frame colors)',
      'Bundle Contains': '4 Framed Prints',
      'Frame Materials': 'Solid Wood / Glass Finish',
      'Frame Colours': 'White + Black Mix (Fully Customizable)',
      'Print Styles': 'Porsche RSR, 911, BMW M, BMW M5 (or your choice)',
      'Suitable For': 'Bedroom, Office, Living Room, Gaming Room',
      'Order Type': 'Custom Made to Order'
    },
    reviews: [
      { name: 'Arjun T.', handle: '@arjun.t', initials: 'AT', rating: 5, text: 'I swapped two posters for Ferrari and Mercedes — they customized the entire set for me. Room looks like a showroom!' },
      { name: 'Mihir D.', handle: '@mihir.d', initials: 'MD', rating: 5, text: 'The quality on all 4 frames is consistent and premium. Looks exactly like the pictures. Very well packaged too.' },
      { name: 'Zara K.', handle: '@zara.k', initials: 'ZK', rating: 5, text: 'Got this for my brother\'s room makeover. He was absolutely blown away. The white + black frame mix looks so aesthetic together!' }
    ]
  },

  'posters-pack-big-poster': {
    id: 'posters-pack-big-poster',
    name: 'Posters Pack + Big Poster',
    category: 'Posters',
    categoryFilter: 'posters',
    customizable: true,
    price: 799,
    originalPrice: null,
    badge: 'Best Value',
    badgeType: 'new',
    image: 'product_bigposter_pack.jpg',
    images: ['product_bigposter_pack.jpg'],
    rating: 5.0,
    reviewCount: 29,
    description: 'The ultimate room transformation kit. Includes a curated collection of small car art posters PLUS one large centerpiece hero poster. 100% customizable: choose your centerpiece car (Porsche, Ferrari, G-Wagon, etc.) and customize the surrounding poster gallery to match your vibe.',
    highlights: [
      '🎨 100% Fully Customizable — Pick your XL center hero car & surrounding poster mix',
      'Includes small poster pack + 1 XL centerpiece hero poster',
      'XL Hero Poster: Porsche 911 RSR — premium high-res print',
      'Small posters: curated automotive art prints',
      'Create a stunning gallery wall with an iconic centerpiece',
      'As seen in the preview — bedroom-ready aesthetic setup',
      'Ships rolled in a protective tube'
    ],
    specs: {
      'Customization': '100% Customizable (Hero Poster Car, Small Posters Mix)',
      'Pack Contains': 'Poster Pack + 1 Large Hero Poster',
      'Hero Poster': 'Porsche 911 RSR (XL Size — Customizable)',
      'Print Quality': 'Premium Matte Finish',
      'Paper Type': 'High GSM Premium Art Paper',
      'Suitable For': 'Bedroom, Gaming Room, Living Room',
      'Order Type': 'Custom Made to Order'
    },
    reviews: [
      { name: 'Rahul V.', handle: '@rahul.v', initials: 'RV', rating: 5, text: 'I requested an AMG G63 for the big center poster and it turned out magnificent! 100% customizable as promised.' },
      { name: 'Sneha B.', handle: '@sneha.b', initials: 'SB', rating: 5, text: 'Worth every rupee. The big poster with the smaller ones around it looks exactly like the preview. Absolutely love it!' },
      { name: 'Harsh P.', handle: '@harsh.p', initials: 'HP', rating: 5, text: 'My gaming setup is now complete. The Porsche big poster is the centrepiece and the smaller ones around it look perfect. 10/10!' }
    ]
  },

  'kashmiri-bangles': {
    id: 'kashmiri-bangles',
    name: 'Kashmiri Bangles',
    category: 'Jewelry',
    categoryFilter: 'jewelry',
    customizable: false,
    price: 399,
    originalPrice: null,
    badge: 'Handcrafted',
    badgeType: 'luxury',
    image: 'product_kashmiri_bangles.jpg',
    images: ['product_kashmiri_bangles.jpg'],
    rating: 4.9,
    reviewCount: 34,
    description: 'Adorn your wrists with the timeless elegance of authentic Kashmiri handcrafted bangles. Crafted with lavender crystal faceted beads, rich gold-tone brass frameworks, and delicate dangling ghungroo bells that chime with every movement. A stunning ready-to-wear statement piece for weddings, festivals, and traditional celebrations.',
    highlights: [
      'Authentic Kashmiri artisan craftsmanship with delicate ghungroo bells',
      'Faceted lavender crystal beads with rich gold-plated brass detailing',
      'Sweet, subtle chime with every movement — festive & graceful',
      'Standard festive fit with comfortable smooth interior finish',
      'Lightweight & comfortable for all-day weddings & festive wear',
      'Comes packaged in a signature luxury velvet keepsake pouch'
    ],
    specs: {
      'Set Contains': 'Matching Bangle Pair / Set',
      'Craft Style': 'Traditional Kashmiri Handcrafted',
      'Material': 'Faceted Crystal Beads, Gold-Tone Brass',
      'Available Sizes': 'Standard Fit (Fits 2.4 - 2.6)',
      'Occasion': 'Festive, Wedding, Traditional Celebrations',
      'Order Type': 'Handcrafted Artisan Piece'
    },
    reviews: [
      { name: 'Ananya S.', handle: '@ananya.sharma', initials: 'AS', rating: 5, text: 'These bangles are pure art! The ghungroos have the sweetest subtle sound, and the lavender crystal color is so unique and royal. Wore them to a wedding and got so many compliments!' },
      { name: 'Meera D.', handle: '@meera_delhi', initials: 'MD', rating: 5, text: 'Size 2.4 fits me perfectly. The quality is exceptional for ₹399 — looks like real heritage jewelry.' },
      { name: 'Simran K.', handle: '@simran.k', initials: 'SK', rating: 5, text: 'The details on these bangles are breathtaking. Beautifully handcrafted and packaged so elegantly. 10/10 recommend!' }
    ]
  },

  'jhumka': {
    id: 'jhumka',
    name: 'Jhumka',
    category: 'Jewelry',
    categoryFilter: 'jewelry',
    customizable: false,
    price: 349,
    originalPrice: null,
    badge: 'Artisan',
    badgeType: 'luxury',
    image: 'product_jhumka.jpg',
    images: ['product_jhumka.jpg'],
    rating: 4.9,
    reviewCount: 28,
    description: 'Elevate your festive elegance with our handcrafted antique gold Jhumka earrings. Designed with floral stud tops, radiant Kundan stone inlays, intricate filigree domes, and dangling pearl seed beads. An iconic traditional silhouette crafted for weddings, festivals, and celebratory moments.',
    highlights: [
      'Handcrafted antique gold finish with intricate dome filigree work',
      'Radiant Kundan & stone inlays with hanging pearl seed drops',
      'Classic lightweight design for comfortable all-day festive wear',
      'Secure push-back post closure for effortless wearing',
      'Perfect match for ethnic, fusion, and bridal wear',
      'Arrives in protective luxury velvet pouch packaging'
    ],
    specs: {
      'Pair Contains': '1 Pair of Jhumka Earrings',
      'Craft Style': 'Traditional Indian Antique Jhumka',
      'Finish': 'Antique Gold-Tone Brass',
      'Stones / Beads': 'Kundan Inlays, Pearl Seed Beads',
      'Closure Type': 'Push-Back Post',
      'Occasion': 'Festivals, Weddings, Cultural Celebrations',
      'Order Type': 'Handcrafted Artisan Piece'
    },
    reviews: [
      { name: 'Pooja R.', handle: '@pooja.designs', initials: 'PR', rating: 5, text: 'These jhumkas are absolutely stunning! The antique gold tone and tiny pearl drops look so regal. Perfect weight too — not heavy at all.' },
      { name: 'Kritika N.', handle: '@kritika_n', initials: 'KN', rating: 5, text: 'Wore these for Diwali with my saree and received endless compliments! Outstanding quality for ₹349.' },
      { name: 'Tanvi M.', handle: '@tanvi.m', initials: 'TM', rating: 5, text: 'The detailing is so intricate and the finishing is top-notch. Fast delivery and secure packaging too. 10/10!' }
    ]
  }
};
