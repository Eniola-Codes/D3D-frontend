export interface Edge<T> {
  node: T;
}

export interface SEO {
  title: string;
  description: string;
}

export interface Connection<T> {
  edges: Array<Edge<T>>;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  currencyCode: string;
  priceRange: {
    maxVariantPrice: number;
    minVariantPrice: number;
  };
  featuredImage: {
    url: string;
    altText: string;
  };
  images: Image[];
  variants: ProductVariant[];
  seo: SEO;
  tags: string[];
  updatedAt: string;
  brandLogo: string;
  brandName: string;
  discount: string;
  shippingCost: string;
  rating: number;
  category: string[];
  color: string;
  reviews: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
}

export interface Image {
  url: string;
  altText: string;
  width: number;
  height: number;
}
