import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';
import axios from 'axios';
interface Props {
	slice: SliceType
}

const ProductShowcase = ({ slice }: Props) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			if(slice.items.length > 0){
				const arrayOfIds = slice.items.map(item => {
					return item.product_id;
				});
				const ids = arrayOfIds.join(',');

				const response = await axios.get('api/products?ids=' + ids);
				setProducts(response.data.data);
			}
		})();
	}, []);

	return (
		<section className="w-full py-28 -lg:py-12">
			<div className="container -xl:px-5 flex-cc flex-col w-full">
				<h2 className="text-7xl -lg:text-4xl text-center font-bold font-secondary max-w-2xl">{slice.primary.title && RichText.asText(slice.primary.title)}</h2>
				<p className="text-2xl -lg:text-base  mt-4 text-center font-light">{slice.primary.subtitle && RichText.asText(slice.primary.subtitle)}</p>
				<ul className="grid grid-cols-4 -lg:grid-cols-2 w-full gap-4 mt-8 text-center">
					{products.length === 0 && (
						<>
							{[...Array(4)].map((item, index) => (
								<li key={index}>
									<div className="h-100 -lg:h-44" style={{ background: '#eeeeee' }}></div>
								</li>
							))}
						</>
					)}
					{products.map((item, index) => (
						<Link href={`/shop/${item.slug}`} key={index}>
							<li>
								<div className="h-100 -lg:h-44 bg-gray-100">
									{item?.images[0] && <img src={item.images[0].src} alt="happy bday" className="w-full h-full object-cover" />}
								</div>
								<div className="mt-6 -lg:mt-2 lg:text-xl">
									<h3 className="font-bold">{item?.name}</h3>
									<h4 className="-lg:hidden">£{item?.price}</h4>
								</div>
							</li>
						</Link>
					))}
				</ul>
				{/* {cta_text && <Link className="mt-12" href={cta_text.href || '/shop'}><button className="bg-pink text-white py-3 rounded-full lg:text-xl -lg:w-auto -lg:px-10 w-60 -lg:hidden">{cta_text.text}</button></Link>} */}
			</div>
		</section>
	);
};

export default ProductShowcase;
