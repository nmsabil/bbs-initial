import React from 'react';
import Link from '@components/_shared/Link';
import sanitizer from '@core/utils/sanitizer';

interface ProductsShowcaseProps {
	title: string;
	text: string;
	cta_text?: {
		text: string;
		href: string;
	}
	products: any;
}

const ProductsShowcase = ({ title, text, cta_text, products }: ProductsShowcaseProps): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:py-12">
				<div className="container -xl:px-5 flex-cc flex-col w-full">
					<h2 className="text-7xl -lg:text-4xl text-center font-bold font-secondary max-w-2xl">{sanitizer(title)}</h2>
					<p className="text-2xl -lg:text-base  mt-4 text-center">{text}</p>
					<ul className="grid grid-cols-4 -lg:grid-cols-2 w-full gap-4 mt-8 text-center">
						{products.map((item, index) => (
							<Link href={`/shop/${item.slug}`} key={index}>
								<li>
									<div className="h-100 -lg:h-44 bg-gray-100">
										{item.thumbnail && <img src={item.thumbnail} alt="happy bday" className="w-full h-full object-cover" />}
									</div>
									<div className="mt-6 -lg:mt-2 lg:text-xl">
										<h3 className="font-bold">{item.name}</h3>
										<h4 className="-lg:hidden">
											<span className={item.sale_price ? 'line-through' : ''}>
												{item.type == 'variable' && item.variations.filter(x => x.price != item.price).length > 0 && <span>From </span>}
												£{item?.price}
											</span>
											{item.sale_price && <span className="ml-4 text-pink">£{item.sale_price}</span>}
										</h4>
									</div>
								</li>
							</Link>
						))}
					</ul>
					{cta_text && <Link className="mt-12" href={cta_text.href || '/shop'}><button className="bg-pink text-white py-3 rounded-full lg:text-xl -lg:w-auto -lg:px-10 w-60 -lg:hidden">{cta_text.text}</button></Link>}
				</div>
			</section>
		</>
	);
};

export default ProductsShowcase;
