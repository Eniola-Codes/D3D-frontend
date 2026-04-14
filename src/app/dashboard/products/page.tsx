import { ProductFilter } from '@/components/dashboard/find-products/components/product-listing/product-filters';
import ProductList from '@/components/dashboard/find-products/components/product-listing/product-list';
import DashboardLayout from '@/components/dashboard/layout/components';
import { dummyProducts } from '@/lib/data/product';
// import { useState } from 'react';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
};

export default async function SearchPage() {
  // const [selectedCategory, setSelectedCategory] = useState(null);

  // const [query, setQuery] = useState("");

  // const handleInputChange = (event) => {
  //   setQuery(event.target.value);
  // }

  // const filteredItems = products.filter((product) => product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase() !== -1));

  // const handleChange = (event) => {
  //   setSelectedCategory(event.target.value);
  // }

  // const handleClick = (event) => {
  //   setSelectedCategory(event.target.value);
  // }

  // const filteredData(products, selected, query)
  // {
  //   let filteredProducts = products;

  //   if(query)
  //   {
  //     filteredProducts = filteredItems;
  //   }

  //   if(selected)
  //   {
  //     filteredProducts = filteredProducts.filter(({category, color, company, newPrice, title}) => category === selected || color === selected || company === selected || newPrice === selected ||title === selected)
  //   }

  //   return filteredProducts.map(({img, title, star, reviews, newPrice, prevPrice}) => (
  //     <Card key={Math.random()} img={img} title={title} star={star} reviews={reviews} newPrice={newPrice} prevPrice={prevPrice} />
  //   ))
  // }

  // filteredData(products, selectedCategory, query)

  return (
    <DashboardLayout>
      <ProductFilter />
      {dummyProducts.length > 0 ? (
        <div className="grid grid-flow-row grid-cols-2 gap-3 px-4 py-5 lg:grid-cols-3 lg:gap-5 lg:px-10 xl:grid-cols-4">
          <ProductList products={dummyProducts} />
        </div>
      ) : null}
    </DashboardLayout>
  );
}
