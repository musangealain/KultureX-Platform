export type ShopCategory = {
  id: string;
  name: string;
  itemCount: number;
};

export type ShopProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
};

export type PromoSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type UiKitScreenMeta = {
  id: string;
  label: string;
  subtitle: string;
  image: string;
};

export const demoCategories: ShopCategory[] = [
  { id: "dresses", name: "Dresses", itemCount: 120 },
  { id: "jackets", name: "Jackets", itemCount: 76 },
  { id: "jeans", name: "Jeans", itemCount: 98 },
  { id: "shoes", name: "Shoes", itemCount: 142 },
  { id: "bags", name: "Bags", itemCount: 88 },
  { id: "accessories", name: "Accessories", itemCount: 53 }
];

export const demoProducts: ShopProduct[] = [
  {
    id: "p1",
    name: "Roller Rabbit Tee",
    brand: "KultureX Studio",
    price: 198,
    rating: 4.8,
    category: "dresses",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    description: "Lightweight everyday shirt with clean stitched logo and soft premium cotton."
  },
  {
    id: "p2",
    name: "Axel Arigato Sneaker",
    brand: "Streetline",
    price: 245,
    rating: 4.7,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Low profile sneaker tuned for all day comfort and minimalist style."
  },
  {
    id: "p3",
    name: "Herschel Utility Bag",
    brand: "Herschel Supply Co.",
    price: 40,
    rating: 4.5,
    category: "bags",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
    description: "Compact bag with matte finish and smart compartment layout."
  },
  {
    id: "p4",
    name: "Noise Cancel Headphone",
    brand: "SoundFrame",
    price: 165,
    rating: 4.6,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
    description: "Wireless comfort headset with deep sound profile and refined fit."
  },
  {
    id: "p5",
    name: "Endless Rose Top",
    brand: "Endless Rose",
    price: 50,
    rating: 4.4,
    category: "dresses",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    description: "Everyday top with breathable fabric and elevated silhouette."
  },
  {
    id: "p6",
    name: "Madewell Linen Shirt",
    brand: "Madewell",
    price: 69,
    rating: 4.3,
    category: "jackets",
    image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=900&q=80",
    description: "Relaxed fit linen shirt built for layered streetwear looks."
  }
];

export const promoSlides: PromoSlide[] = [
  {
    id: "s1",
    title: "20% Discount New Arrival Product",
    subtitle: "Publish your style and make your vibe visible with KultureX shopping.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "s2",
    title: "Weekly Streetwear Drop",
    subtitle: "Curated essentials inspired by youth culture, skate scenes, and city nights.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
  }
];

export const reviewSamples = [
  {
    id: "r1",
    author: "Kay Hicks",
    rating: 5,
    text: "Material and fit are premium. Delivery arrived before schedule."
  },
  {
    id: "r2",
    author: "Cindy Marsh",
    rating: 4,
    text: "Loved the style and packaging. I ordered two more colors."
  },
  {
    id: "r3",
    author: "Cheryl Bryant",
    rating: 5,
    text: "Smooth checkout and great quality. The sneaker feels excellent."
  }
] as const;

export const messageSamples = [
  { id: "m1", from: "Order Support", message: "Your order #5538 is in transit.", time: "10:24 AM" },
  { id: "m2", from: "KultureX Deals", message: "Flash discount ends tonight.", time: "8:12 AM" },
  { id: "m3", from: "Nia Volt", message: "New collection drop preview uploaded.", time: "Yesterday" }
] as const;

export const uiKitFlow: UiKitScreenMeta[] = [
  { id: "Splash01", label: "01. Splash Screen 01", subtitle: "Brand cinematic entry", image: promoSlides[0].image },
  { id: "Splash02", label: "02. Splash Screen 02", subtitle: "Secondary intro transition", image: promoSlides[1].image },
  { id: "Onboarding01", label: "03. Onboarding Page 01", subtitle: "Discover products", image: demoProducts[0].image },
  { id: "Onboarding02", label: "04. Onboarding Page 02", subtitle: "Track orders live", image: demoProducts[1].image },
  { id: "Onboarding03", label: "05. Onboarding Page 03", subtitle: "Save wishlist and pay faster", image: demoProducts[2].image },
  { id: "Login", label: "06. Login Page", subtitle: "Sign in or continue as guest", image: demoProducts[3].image },
  { id: "Signup", label: "07. Sign Up Page", subtitle: "Create account", image: demoProducts[4].image },
  { id: "Successful", label: "08. Successful", subtitle: "Auth completed", image: demoProducts[5].image },
  { id: "Categorie01", label: "09. Categorie 01", subtitle: "Home shopping feed", image: demoProducts[0].image },
  { id: "Categorie02", label: "10. Categorie 02", subtitle: "Category chips + search", image: demoProducts[1].image },
  { id: "Categorie03", label: "11. Categorie 03", subtitle: "Category showcase", image: demoProducts[2].image },
  { id: "Mine01", label: "12. Mine Page 01", subtitle: "Profile overview", image: demoProducts[3].image },
  { id: "Mine02", label: "13. Mine Page 02", subtitle: "Order center", image: demoProducts[4].image },
  { id: "Mine03", label: "14. Mine Page 03", subtitle: "Address center", image: demoProducts[5].image },
  { id: "Mine04", label: "15. Mine Page 04", subtitle: "Preferences", image: demoProducts[0].image },
  { id: "ProductCategory01", label: "16. Product Category 01", subtitle: "Category grid", image: demoProducts[1].image },
  { id: "ProductCategory02", label: "17. Product Category 02", subtitle: "List + quick add", image: demoProducts[2].image },
  { id: "ProductCategory03", label: "18. Product Category 03", subtitle: "Editorial product layout", image: demoProducts[3].image },
  { id: "ProductCategory04", label: "19. Product Category 04", subtitle: "Compact card list", image: demoProducts[4].image },
  { id: "ProductDetails01", label: "20. Product Details 01", subtitle: "Primary detail screen", image: demoProducts[0].image },
  { id: "ProductDetails02", label: "21. Product Details 02", subtitle: "Detail alt style", image: demoProducts[1].image },
  { id: "ProductDetails03", label: "22. Product Details 03", subtitle: "Detail with reviews", image: demoProducts[2].image },
  { id: "ProductDetails04", label: "23. Product Details 04", subtitle: "Detail minimal", image: demoProducts[3].image },
  { id: "MyCart01", label: "24. My Cart 01", subtitle: "Cart basic", image: demoProducts[4].image },
  { id: "MyCart02", label: "25. My Cart 02", subtitle: "Cart with swipe actions", image: demoProducts[5].image },
  { id: "MyCart03", label: "26. My Cart 03", subtitle: "Cart summary", image: demoProducts[0].image },
  { id: "MyCart04", label: "27. My Cart 04", subtitle: "Cart compact", image: demoProducts[1].image },
  { id: "Filters", label: "28. Filters", subtitle: "Filter options", image: demoProducts[2].image },
  { id: "FiltersSuccess", label: "29. Filters Success", subtitle: "Filter applied", image: demoProducts[3].image },
  { id: "Wishlist", label: "30. Wishlist", subtitle: "Saved items", image: demoProducts[4].image },
  { id: "Screener", label: "31. Screener", subtitle: "Search and recommendation", image: demoProducts[5].image },
  { id: "ClientReviews", label: "32. Client Reviews", subtitle: "Ratings list", image: demoProducts[0].image },
  { id: "OrderDetails", label: "33. Order Details", subtitle: "Order breakdown", image: demoProducts[1].image },
  { id: "OrderTracking", label: "34. Order Tracking", subtitle: "Shipment timeline", image: demoProducts[2].image },
  { id: "TrackingAddress", label: "35. Tracking Address", subtitle: "Delivery location", image: demoProducts[3].image },
  { id: "FindingCollectionPoint", label: "36. Finding Collection Point", subtitle: "Pickup point map", image: demoProducts[4].image },
  { id: "RoadMap", label: "37. Road Map", subtitle: "Route and checkpoints", image: demoProducts[5].image },
  { id: "DiscountsOffer", label: "38. Discounts Offer", subtitle: "Coupons and offers", image: demoProducts[0].image },
  { id: "Notification", label: "39. Notification", subtitle: "Inbox alerts", image: demoProducts[1].image },
  { id: "Profile", label: "40. Profile", subtitle: "User profile", image: demoProducts[2].image },
  { id: "Settings", label: "41. Settings", subtitle: "App settings", image: demoProducts[3].image },
  { id: "Ongoing", label: "42. Ongoing", subtitle: "Current orders", image: demoProducts[4].image },
  { id: "Complated", label: "43. Complated", subtitle: "Delivered orders", image: demoProducts[5].image },
  { id: "CountryOrRegion", label: "44. Country or Region", subtitle: "Regional selection", image: demoProducts[0].image },
  { id: "Language", label: "45. Language", subtitle: "Language setting", image: demoProducts[1].image },
  { id: "PaymentMathod", label: "46. Payment Mathod", subtitle: "Payment options", image: demoProducts[2].image },
  { id: "PaymentConfirm", label: "47. Payment Confirm", subtitle: "Confirm payment", image: demoProducts[3].image },
  { id: "ContinueShopping", label: "48. Continue Shopping", subtitle: "Post-purchase actions", image: demoProducts[4].image },
  { id: "MessagesList", label: "49. Messages List", subtitle: "Conversations", image: demoProducts[5].image },
  { id: "Message", label: "50. Message", subtitle: "Chat thread", image: demoProducts[0].image },
  { id: "AudioCall", label: "51. Audio Call", subtitle: "Support call UI", image: demoProducts[1].image },
  { id: "VideoCall", label: "52. Video Call", subtitle: "Video support UI", image: demoProducts[2].image }
];
