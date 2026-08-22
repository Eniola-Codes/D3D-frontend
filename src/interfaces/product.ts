import type { IVariant, ProductOptionCombo } from '@/interfaces/variants';

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

export interface Product {
  id: string;
  title: string;
  handle: string;
  url: string;
  description: string;
  shortDescription: string;
  attributes: {
    title: string;
    value: string;
  }[];
  features: {
    title: string;
    value: string;
  }[];
  options: ProductOptionCombo[];
  featuredImage: string;
  shipping: IShipping;
  priceRange: IPriceRange;
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

export interface ISEO {
  title: string;
  description: string;
}

export interface IShipping {
  cost?: number;
  deliveryTime?: string;
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
  shortDescription: string;
  brand: IBrand;
  priceRange: IPriceRange;
  options: ProductOptionCombo[];
}

export interface ProductListPagination {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalCount: number;
  totalPages: number;
}

export interface ProductListFilterBrand {
  _id: string;
  handle: string;
  title: string;
  logo: string;
}

export interface ProductListFilterCategory {
  _id: string;
  handle: string;
  title: string;
}

export interface ProductListFilter {
  brands: ProductListFilterBrand[];
  categories: ProductListFilterCategory[];
}

export interface ProductResponse {
  product: Product;
  relatedProducts: Product[];
  message: string;
}

export interface ProductListResponse {
  products: ProductListItem[];
  pagination: ProductListPagination;
  filter: ProductListFilter;
  message: string;
}

export interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface BookMarkButtonProps {
  productId: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export interface ImportProductButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export interface ProductTabsProps {
  product: Product;
}
