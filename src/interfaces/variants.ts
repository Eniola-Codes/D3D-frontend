import type { Money, Product } from '@/interfaces/product';

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
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

export interface VariantOption {
  title: string;
  value: string;
  hex?: string;
  _id?: string;
}

export type ProductOptionCombo = VariantOption[];

export interface Variant {
  _id: string;
  handle: string;
  sku: string;
  url: string;
  price: number;
  inStock: boolean;
  images: string[];
  options: VariantOption[];
  product: string;
  createdAt: string;
  updatedAt: string;
}

export interface VariantResponse {
  variant: Variant;
  message: string;
}

export interface IOptionValue {
  value: string;
  hex?: string;
}

export interface IOption {
  title: string;
  values: IOptionValue[];
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

export interface ProductVariantOptionsProps {
  options: ProductOptionCombo[];
  selection: Record<string, string>;
}

export interface ProductVariantSectionProps {
  product: Product;
  selection: Record<string, string>;
  variant: Variant;
}

export interface ProductImageSliderProps {
  images: string[];
  title: string;
  featuredImage: string;
}
