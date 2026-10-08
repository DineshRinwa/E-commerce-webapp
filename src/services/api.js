// API service using DummyJSON (https://dummyjson.com) with 100+ items and full metadata
const BASE_URL = 'https://dummyjson.com';

// Normalizes DummyJSON product data so components can display all specs, reviews, and badges
export function normalizeProduct(item) {
  const images = Array.isArray(item.images) && item.images.length > 0
    ? item.images
    : [item.thumbnail].filter(Boolean);

  const discount = item.discountPercentage || 0;
  const originalPrice = discount > 0
    ? Number((item.price / (1 - discount / 100)).toFixed(2))
    : item.price;

  return {
    ...item,
    image: item.thumbnail || images[0] || '',
    images,
    originalPrice,
    rating: {
      rate: typeof item.rating === 'number' ? Number(item.rating.toFixed(1)) : item.rating?.rate ?? 4.5,
      count: item.reviews?.length ? item.reviews.length : item.rating?.count ?? 24,
    },
    reviews: Array.isArray(item.reviews) ? item.reviews : [],
    tags: Array.isArray(item.tags) ? item.tags : [],
    dimensions: item.dimensions || { width: 0, height: 0, depth: 0 },
    brand: item.brand || 'ShopFlow Choice',
    sku: item.sku || `SKU-${item.id}`,
    stock: typeof item.stock === 'number' ? item.stock : 50,
    availabilityStatus: item.availabilityStatus || (item.stock > 0 ? 'In Stock' : 'Out of Stock'),
    warrantyInformation: item.warrantyInformation || '1 year warranty included',
    shippingInformation: item.shippingInformation || 'Standard shipping 3-5 days',
    returnPolicy: item.returnPolicy || '30 days hassle-free return policy',
    minimumOrderQuantity: item.minimumOrderQuantity || 1,
    meta: item.meta || {
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://dummyjson.com/products/${item.id}`,
    },
  };
}

// Fallback products with rich DummyJSON format
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    category: 'beauty',
    price: 9.99,
    discountPercentage: 10.48,
    rating: 4.8,
    stock: 99,
    tags: ['beauty', 'mascara', 'eyes'],
    brand: 'Essence',
    sku: 'BEA-ESS-ESS-001',
    weight: 4,
    dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
    warrantyInformation: '1 week warranty',
    shippingInformation: 'Ships in 3-5 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 5,
        comment: 'Amazing mascara! Volumizes my lashes like nothing else.',
        date: '2025-05-12T09:41:02.053Z',
        reviewerName: 'Eleanor Collins',
        reviewerEmail: 'eleanor.collins@example.com'
      },
      {
        rating: 4,
        comment: 'Very satisfied! Great value for the price.',
        date: '2025-05-10T14:22:15.120Z',
        reviewerName: 'Lucas Gordon',
        reviewerEmail: 'lucas.gordon@example.com'
      }
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
    images: ['https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp']
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    category: 'beauty',
    price: 19.99,
    discountPercentage: 18.2,
    rating: 4.3,
    stock: 12,
    tags: ['beauty', 'eyeshadow', 'palette'],
    brand: 'Glamour Beauty',
    sku: 'BEA-GLA-EYE-002',
    weight: 9,
    dimensions: { width: 9.26, height: 22.47, depth: 27.67 },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 2-3 business days',
    availabilityStatus: 'Low Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 5,
        comment: 'The pigmentation is outstanding! Highly recommend.',
        date: '2025-06-01T11:00:00.000Z',
        reviewerName: 'Savannah Gomez',
        reviewerEmail: 'savannah.gomez@example.com'
      }
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp',
    images: ['https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp']
  },
  {
    id: 6,
    title: 'Calvin Klein CK One',
    description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent with citrus and green tea notes.",
    category: 'fragrances',
    price: 49.99,
    discountPercentage: 15.0,
    rating: 4.85,
    stock: 45,
    tags: ['fragrances', 'perfume', 'unisex'],
    brand: 'Calvin Klein',
    sku: 'FRA-CK-ONE-006',
    weight: 350,
    dimensions: { width: 7.5, height: 16.0, depth: 5.5 },
    warrantyInformation: 'No warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 5,
        comment: 'My go-to summer scent for years.',
        date: '2025-06-15T08:30:00.000Z',
        reviewerName: 'Marcus Vance',
        reviewerEmail: 'marcus.v@example.com'
      }
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp',
    images: ['https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp']
  }
];

// Fetch 100 products from DummyJSON
export async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=100`);
    if (!res.ok) throw new Error('API response was not ok');
    const data = await res.json();
    const list = Array.isArray(data.products) ? data.products : (Array.isArray(data) ? data : []);
    return list.map(normalizeProduct);
  } catch (err) {
    console.warn('Using fallback products:', err.message);
    return FALLBACK_PRODUCTS.map(normalizeProduct);
  }
}

// Fetch single product by ID
export async function fetchProductById(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`Product #${id} not found`);
    const data = await res.json();
    return normalizeProduct(data);
  } catch (err) {
    console.warn(`Using fallback for product #${id}:`, err.message);
    const found = FALLBACK_PRODUCTS.find((p) => p.id === Number(id));
    if (found) return normalizeProduct(found);
    throw err;
  }
}

// Fetch category list
export async function fetchCategories() {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) throw new Error('Failed to load categories');
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.map((cat) => (typeof cat === 'object' ? cat.slug : cat));
    }
    return [];
  } catch (err) {
    console.warn('Using fallback categories:', err.message);
    return ['beauty', 'fragrances', 'furniture', 'groceries', 'laptops', 'smartphones'];
  }
}
