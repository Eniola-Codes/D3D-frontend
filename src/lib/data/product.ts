import { Product } from '../../interfaces/product';

export const dummyProducts: Product[] = [
  {
    id: '1',
    title: 'Nike Air Force 1',
    handle: 'nike-air-force-1',
    url: 'https://nike.com/air-force-1',
    description: 'Classic Nike sneakers with timeless design.',
    options: [
      {
        title: 'Color',
        values: ['Black', 'White'],
      },
      {
        title: 'Size',
        values: ['40', '41', '42', '43'],
      },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    shipping: {
      cost: 10,
      deliveryTime: '3-5 days',
    },
    priceRange: {
      minVariantPrice: 100,
      maxVariantPrice: 200,
    },
    rating: 4.8,
    reviews: [
      {
        review: 'Very comfortable and stylish.',
        rating: 5,
        name: 'Eniola',
      },
    ],
    seo: {
      title: 'Nike Air Force 1',
      description: 'Buy Nike Air Force 1 online',
    },
    brand: {
      handle: 'nike',
      title: 'Nike',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      website: 'https://nike.com',
      currency: 'USD',
      shipping: {
        cost: 5,
        deliveryTime: '2-4 days',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    categories: ['Fashion', 'Shoes'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: '2',
    title: 'iPhone 15 Pro',
    handle: 'apple-iphone-15-pro',
    url: 'https://apple.com/iphone-15-pro',
    description: 'Latest Apple smartphone with A17 chip.',
    options: [
      {
        title: 'Storage',
        values: ['128GB', '256GB', '512GB'],
      },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    shipping: {
      cost: 0,
      deliveryTime: '1-3 days',
    },
    priceRange: {
      minVariantPrice: 100,
      maxVariantPrice: 200,
    },
    rating: 4.9,
    reviews: [
      {
        review: 'Best phone I have ever used.',
        rating: 5,
        name: 'David',
      },
    ],
    seo: {
      title: 'iPhone 15 Pro',
      description: 'Apple flagship smartphone',
    },
    brand: {
      handle: 'apple',
      title: 'Apple',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      website: 'https://apple.com',
      currency: 'USD',
      shipping: {
        cost: 0,
        deliveryTime: '1-3 days',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    categories: ['Electronics', 'Smartphones'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: '3',
    title: 'Sony WH-1000XM5',
    handle: 'sony-wh1000xm5',
    url: 'https://sony.com/headphones',
    description: 'Premium noise-cancelling headphones.',
    options: [
      {
        title: 'Color',
        values: ['Black', 'Silver'],
      },
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1755719401938-35c1b24f6d15?q=80&w=1721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shipping: {
      cost: 5,
      deliveryTime: '2-4 days',
    },
    priceRange: {
      minVariantPrice: 100,
      maxVariantPrice: 200,
    },
    rating: 4.7,
    reviews: [
      {
        review: 'Amazing sound quality.',
        rating: 5,
        name: 'Sarah',
      },
    ],
    seo: {
      title: 'Sony WH-1000XM5',
      description: 'Best noise cancelling headphones',
    },
    brand: {
      handle: 'sony',
      title: 'Sony',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      website: 'https://sony.com',
      currency: 'USD',
      shipping: {
        cost: 5,
        deliveryTime: '2-4 days',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    categories: ['Electronics', 'Audio'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: '4',
    title: 'Samsung Galaxy S24',
    handle: 'samsung-galaxy-s24',
    url: 'https://samsung.com/galaxy-s24',
    description: 'High-end Android smartphone.',
    options: [
      {
        title: 'Color',
        values: ['Black', 'Blue'],
      },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5',
    shipping: {
      cost: 0,
      deliveryTime: '2-4 days',
    },
    priceRange: {
      minVariantPrice: 100,
      maxVariantPrice: 200,
    },
    rating: 4.6,
    reviews: [
      {
        review: 'Great camera and battery.',
        rating: 4,
        name: 'Tunde',
      },
    ],
    seo: {
      title: 'Samsung Galaxy S24',
      description: 'Latest Samsung flagship',
    },
    brand: {
      handle: 'samsung',
      title: 'Samsung',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      website: 'https://samsung.com',
      currency: 'USD',
      shipping: {
        cost: 0,
        deliveryTime: '2-4 days',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    categories: ['Electronics', 'Smartphones'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: '5',
    title: 'Adidas Ultraboost',
    handle: 'adidas-ultraboost',
    url: 'https://adidas.com/ultraboost',
    description: 'Comfortable running shoes.',
    options: [
      {
        title: 'Size',
        values: ['40', '41', '42'],
      },
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1547974009-6fb0db54c905?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shipping: {
      cost: 8,
      deliveryTime: '3-5 days',
    },
    priceRange: {
      minVariantPrice: 100,
      maxVariantPrice: 200,
    },
    rating: 4.5,
    reviews: [
      {
        review: 'Perfect for running.',
        rating: 5,
        name: 'Michael',
      },
    ],
    seo: {
      title: 'Adidas Ultraboost',
      description: 'Top running shoes',
    },
    brand: {
      handle: 'adidas',
      title: 'Adidas',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      website: 'https://adidas.com',
      currency: 'USD',
      shipping: {
        cost: 8,
        deliveryTime: '3-5 days',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    categories: ['Fashion', 'Shoes'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const categoryOptions = [
  'Categories',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Automative',
  'Beauty & Personal Care',
  'Health & Wellness',
  'Toys & Games',
  'Other',
];

export const trendingCatgories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Automative',
  'Beauty & Personal Care',
  'Health & Wellness',
  'Toys & Games',
  'Other',
];

export const sortOptions = ['Default', 'Best Rating', 'Price: Low to High', 'Price: High to Low'];

export const brandOptions = ['Brands', 'NBC', 'BBC', 'CNN', 'Reuters', 'Forbes', 'Shopify'];

export const priceOptions = [
  'Prices',
  '$1 - $50',
  '$51 - $100',
  '$101 - $200',
  '$201 - $500',
  'Above $500',
];
