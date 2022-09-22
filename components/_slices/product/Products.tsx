import React, { useState, useEffect } from 'react';
import { SliceType } from '@core/prismic/client';
import { useSearch } from '@core/redux/reducers/search';
import { sortPriceFromHigh, sortPriceFromLow } from '@core/utils/sort';

interface Props {
	slice: SliceType
    products?: any
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

const Products = ({ slice, products = [], handleShallowPopUp }: Props): JSX.Element => {
	const { filters, sort, categories } = useSearch();

	const getUnique = (arr, comp) => {
		const unique = arr.map(e => e[comp])
			.map((e, i, final) => final.indexOf(e) === i && i)
			.filter((e) => arr[e]).map(e => arr[e]);
		return unique;
	};

	const handleFilter = (products, filterList, categoryList) => {
		let filtered = [];
		if (filterList.length === 0 && categoryList.length === 0) {
			return products;
		} else if (categoryList.length !== 0 && filterList.length !== 0) {
			const filteredOccasion = [];
			const filteredProduct = [];

			products.filter(product => {
				const categories = product.categories;

				return categories.filter(el => {
					return filterList.filter(cat => {
						if (el.slug === cat.slug) {
							filteredOccasion.push(product);
						}
						return el.slug === cat.slug;
					});
				});
			});

			products.filter(product => {
				const categories = product.categories;

				return categories.filter(el => {
					return categoryList.filter(cat => {
						if (el.slug === cat.slug) {
							filteredProduct.push(product);
						}
						return el.slug === cat.slug;
					});
				});
			});

			filtered = filteredOccasion.filter(el => filteredProduct.includes(el));
		}else if(categoryList.length === 0){
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
		} else if(filterList.length === 0){
			products.filter(product => {
				const categories = product.categories;

				return categories.filter(el => {
					return categoryList.filter(cat => {
						if (el.slug === cat.slug) {
							filtered.push(product);
						}
						return el.slug === cat.slug;
					});
				});
			});
		}
		return getUnique(filtered, 'id');
	};

	const handleSort = (products, sort) => {
		if(sort.slug === 'price-high-to-low'){
			return sortPriceFromHigh(products);
		} else if(sort.slug === 'price-low-to-high') {
			return sortPriceFromLow(products);
		} else if(sort.slug) {
			return products.filter(item => item.categories.some(cat => cat.slug === sort.slug));
		} else {
			return products;
		}
	};

	const handleSortAndFilter = () => {
		const filtered = handleFilter(products, filters, categories);

		if(sort){
			return handleSort(filtered, sort);
		}

		return filtered;
	};

	const scrollToProducts = () => {
		const element = document.getElementById("products");
		if (element) {
			const y = element.getBoundingClientRect().top + window.pageYOffset - 150;
			window.scrollTo({top: y, behavior: 'smooth'});
		}
	}

	useEffect(() => {
		(async () => {
			if (slice.primary.category_slug) {
				const element = document.getElementById("products");
				if (element) {
					const y = element.getBoundingClientRect().top + window.pageYOffset - 150;
					window.scrollTo({top: y, behavior: 'smooth'});
				}
			}
		})();
	}, []);

	const filteredData = handleSortAndFilter();

	return (
		<>
			<section className="w-full pb-28 pt-8 -lg:py-4 px-8 -md:px-4" id="products">
				<div className="container -lg:px-5 -md:px-0 flex-cc flex-col w-full lg:max-w-screen-xl">
					<ul className="grid grid-cols-4 -xl:grid-cols-3 -lg:grid-cols-2 w-full gap-4 mt-8 text-center">
						{filteredData?.map((item, i) => {
							if(!slice.primary.category_slug || item.categories.some(e => e.slug === slice.primary.category_slug)){
								return (
									<div key={i} onClick={() => handleShallowPopUp(item.slug)} className="cursor-pointer">
										<li className="mb-6">
											<div className="bg-gray relative" style={{paddingBottom:'100%'}}>
												{item.images[0]?.src && <img src={item.images[0]?.src} alt={item.name} className="w-full h-full object-cover absolute" />}
												{item.acf.tag_title != '' && <>
													<span className="triangle"><span style={{borderColor: item.acf.tag_color != '' ? `transparent ${item.acf.tag_color} transparent transparent` : ''}}></span></span>
													<span className="vegan-text">{item.acf.tag_title}</span>
												</>}
											</div>
											<div className="mt-6 -lg:mt-2 lg:text-xl">
												<h3 className="font-bold">{item.name}</h3>
													<h4>
														<span className={item.sale_price ? 'line-through' : ''}>
															{item.type == 'variable' && item.variations.filter(x => x.price != item.price).length > 0 && <span>From </span>}
															£{item?.regular_price || item?.price}
														</span>
														{item.sale_price && <span className="ml-4 text-pink">£{item.sale_price}</span>}
														<StockStatus status={item.stock_status} />
													</h4>
											</div>
										</li>
									</div>
								);
							}
						})}
					</ul>
				</div>
				<style
					dangerouslySetInnerHTML={{
						__html: `
						.triangle span {
							content: '';
							width: 0;
							height: 0;
							border-style: solid;
							border-width: 0 90px 90px 0;
							border-color: transparent #BDF2CA transparent transparent;
							right: 0;
							top: 0;
							position: absolute;
						}
						.vegan-text {
							position: absolute;
							top: -15px;
    					right: -7px;
							max-width: 50px;
							transform: rotate(45deg);
							font-size: 0.75rem;
							margin-top: 1.6rem;
							margin-right: 0.3rem;
							font-weight: 600;
						}
						@media (max-width: 640px) {
							.triangle span {
								content: '';
								width: 0;
								height: 0;
								border-style: solid;
								border-width: 0 70px 70px 0;
								border-color: transparent #BDF2CA transparent transparent;
								right: 0;
								top: 0;
								position: absolute;
							}
							.vegan-text {
								font-size: 0.6rem;
								margin-top: 1.3rem;
							}
						}
						`,
					}}
				/>
			</section>
		</>
	);
};

export default Products;
