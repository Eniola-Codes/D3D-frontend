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
  title: string;
  handle: string;
  url: string;
  description: string;
  options: IOption[];
  featuredImage: string;
  shipping: IShipping;
  priceRange: IPriceRange;
  rating: number;
  reviews: IReview[];
  seo: ISEO;
  brand: IBrand;
  variants?: IVariant[];
  categories?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IPriceRange {
  minVariantPrice: number;
  maxVariantPrice: number;
}
export interface IBrand {
  handle: string;
  title: string;
  logo: string;
  website: string;
  currency: string;
  shipping: IShipping;
  createdAt: Date;
  updatedAt: Date;
}
export interface IVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number;
  available: boolean;
  sku: string;
  barcode: string;
  images: string[];
}

export interface IReview {
  review: string;
  rating: number;
  name: string;
}

export interface ISEO {
  title: string;
  description: string;
}

export interface IShipping {
  cost?: number;
  deliveryTime?: string;
}

export interface IOption {
  title: string;
  values: string[];
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
export interface ProductListItem {
  _id: string;
  handle: string;
  title: string;
  featuredImage: string;
  rating: number;
  description: string;
  brand: IBrand;
}
export interface ProductListPagination {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalCount: number;
  totalPages: number;
}

export interface ProductListResponse {
  products: ProductListItem[];
  pagination: ProductListPagination;
  message: string;
}
