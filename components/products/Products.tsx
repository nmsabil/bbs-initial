import { useSearch } from '@core/redux/reducers/search';
import React from 'react';

interface Props {
	data?: any[]
	handleShallowPopUp(arg0: string): void
}

interface StockStatusProps {
	status: string
}

const StockStatus = ({ status }: StockStatusProps): JSX.Element => {
	if (status === 'outofstock') {
		return <span className="ml-4 text-pink">[OUT OF STOCK]</span>;
	} else if (status === 'onbackorder') {
		return <span className="ml-4 text-pink">[BACK SOON]</span>;
	} else {
		return <></>;
	}
};

const Products = ({ data, handleShallowPopUp }: Props): JSX.Element => {
	const { filters } = useSearch();

	const getUnique = (arr, comp) => {
		const unique = arr.map(e => e[comp])
			.map((e, i, final) => final.indexOf(e) === i && i)
			.filter((e) => arr[e]).map(e => arr[e]);
		return unique;
	};

	const handleFilter = (products, filterList) => {
		if (filterList.length === 0) {
			return products;
		} else {
			const filtered = [];
			products.filter(product => {
				const categories = product.categories;

				return categories.filter(el => {
					return filterList.filter(cat => {
						if (el.slug === cat.slug) {
							filtered.push(product);
						}
						return el.slug === cat.slug;
					});
				});
			});

			return getUnique(filtered, 'id');
		}
	};

	const filteredData = handleFilter(data, filters);

	return (
		<>
			<section className="w-full pb-28 pt-8 -lg:py-12">
				<div className="container -lg:px-5 flex-cc flex-col w-full">
					<ul className="grid grid-cols-4 -lg:grid-cols-2 w-full gap-4 mt-8 text-center">
						{filteredData?.map((item, i) => {
							return (
								<div key={i} onClick={() => handleShallowPopUp(item.slug)} className="cursor-pointer">
									<li className="mb-6">
										<div className="h-100 -lg:h-44 bg-gray-100">
											{item.images[0] && <img src={item.images[0].src} alt="happy bday" className="w-full h-full object-cover" />}
										</div>
										<div className="mt-6 -lg:mt-2 lg:text-xl">
											<h3 className="font-bold">{item.name}</h3>
											<h4 className="-lg:hidden">
												<span className={item.sale_price ? 'line-through' : ''}>
													{item.type == 'variable' && item.variations.filter(x => x.price != item.price).length > 0 && <span>From </span>}
													£{item?.price}
												</span>
												{item.sale_price && <span className="ml-4 text-pink">£{item.sale_price}</span>}
												<StockStatus status={item.stock_status} />
											</h4>
										</div>
									</li>
								</div>
							);
						})}
					</ul>
				</div>
			</section>
		</>
	);
};

export default Products;
