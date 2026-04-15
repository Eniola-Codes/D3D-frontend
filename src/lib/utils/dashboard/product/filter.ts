import { Product } from '@/interfaces/product';

export const filterProducts = (
  products: Product[],
  filters: {
    search?: string;
    category?: string;
    brand?: string;
    price?: string;
    sort?: string;
  }
) => {
  let result = [...products];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();

    result = result.filter(
      product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.some(category => category.toLowerCase().includes(searchLower))
    );
  }

  if (filters.category && filters.category !== 'All Categories') {
    result = result.filter(product =>
      product.category.some(category =>
        category.toLowerCase().includes(filters.category?.toLowerCase() || '')
      )
    );
  }

  if (filters.brand && filters.brand !== 'All Brands') {
    result = result.filter(product => product.brandName === filters.brand);
  }

  if (filters.price && filters.price !== 'All Prices') {
    result = result.filter(product => {
      const price = product.priceRange.minVariantPrice;

      switch (filters.price) {
        case '$1 - $50':
          return price >= 1 && price <= 50;

        case '$51 - $100':
          return price >= 51 && price <= 100;

        case '$101 - $200':
          return price >= 101 && price <= 200;

        case '$201 - $500':
          return price >= 201 && price <= 500;

        case 'Above $500':
          return price > 500;

        default:
          return true;
      }
    });
  }

  if (filters.sort) {
    switch (filters.sort) {
      case 'Price: Low to High':
        result.sort(
          (a, b) => Number(a.priceRange.minVariantPrice) - Number(b.priceRange.minVariantPrice)
        );
        break;

      case 'Price: High to Low':
        result.sort(
          (a, b) => Number(b.priceRange.minVariantPrice) - Number(a.priceRange.minVariantPrice)
        );
        break;

      case 'Best Rating':
        result.sort((a, b) => b.rating - a.rating);
        break;

      case 'Trending':
        break;
    }
  }

  return result;
};
