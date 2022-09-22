import React from 'react';
import Link from '@components/_shared/Link';
import parse from 'html-react-parser';
import { ProductType } from './ProductType';

const Product = ({ data }: { data: ProductType }) => {
	const { thumbnail, name, price, link } = data;
	return (
		<div className="w-64 mr-4" >
			<div className="w-64 h-64 overflow-hidden" >
				<img className="object-cover object-center h-full w-full" src={thumbnail} alt={name} />
			</div>
			<div className="flex-cc col mt-3" >
				<Link href={link}>
					<h3 className="font-medium text-center" >{name}</h3>
				</Link>
				<h4 className="text-center" >{parse(price || '')}</h4>
			</div>
		</div>

	);
};

export default Product;