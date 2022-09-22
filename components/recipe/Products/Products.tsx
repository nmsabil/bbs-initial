import React from 'react';
import Flickity from 'react-flickity-component';
import Product from './Product';
import { ProductType } from './ProductType';

const Products = ({ products }: { products: ProductType[] }) => {
	return (
		<Flickity
			className="custom-scrollbar w-full overflow-x-auto my-5 py-4 focus:outline-none"
			options={{
				freeScroll: false,
				contain: true,
				prevNextButtons: false,
				pageDots: false,
				cellAlign: 'left'
			}}>
			{products?.map((product: ProductType, index: number) => <Product key={index} data={product} />)}
		</Flickity>
	);

};

export default Products;
