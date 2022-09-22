import React, { useState, useEffect } from 'react';
import { SliceType } from '@core/prismic/client';
import { useRouter } from 'next/router';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { RichText } from 'prismic-reactjs';
import { slugify } from '@core/utils/shop';
import { resetAll, useSearch } from '@core/redux/reducers/search';
import { updateFiltering, updateSorting, bulkFiltering, updateCategories } from '@core/redux/actions/search';
import { useDispatch } from 'react-redux';

interface Props {
	slice: SliceType
}

const FilterAndSort = ({ slice }: Props): JSX.Element => {
	const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
	const [openedFilter, setOpenedFilter] = useState(null);
	const [filterAndSort, setFilterAndSort] = useState([]);
	const { filters, sort, categories } = useSearch();
	const [ActiveFilters, setActiveFilters] = useState([]);
	const dispatch = useDispatch();
	const router = useRouter();
	const query = router.query;


	// Categories from old site
	const replaceCategories = {
		'New Home Cookies': 'new-home-gifts',
		'Baby Cookies': 'new-baby',
		'Birthday Cookies': 'birthday',
		'Cookie Messages': 'cookie-messages',
		'Engagement Cookies': 'wedding',
		'FaceCookies': 'face-cookies',
		'Get+Well+Cookies': 'get-well-soon',
		'Love+Cookies': 'wedding',
		"Mother's Day": 'mothers-day',
		'THANK YOU COOKIES': 'thank-you',
		'Wedding Cookies': 'wedding'
	}

	const ArrActiveFilters = [];

	const handleFilterAndSort = (item, filter) => {
		if (item.type === 'Filter by') {
			if (item.label[0].text === 'By Occasion') {
				handleFiltering(filter);
			} else if (item.label[0].text === 'By Product') {
				handleCategories(filter);
			} else {
				handleFiltering(filter);
			}
		} else {
			handleSorting(filter);
		}
		setOpenedFilter(null);
	};

	const handleFiltering = (filter) => {
		dispatch(updateFiltering(filter, filters));
	};

	const handleCategories = (category) => {
		dispatch(updateCategories(category, categories));
	};

	const handleSorting = (sortBy) => {
		dispatch(updateSorting(sortBy, sort));
	};

	const checkIfFilterAdded = (slug) => {
		if (filters) {
			return filters.find(obj => obj.slug === slug);
		}
	};

	const checkIfCategoriesAdded = (slug) => {
		if (categories) {
			return categories.find(obj => obj.slug === slug);
		}
	};

	const checkIfSortAdded = (slug) => {
		if (sort) {
			return sort.slug === slug;
		}
	};

	const allFilters = [];

	useEffect(() => {

		if (slice.items.length > 0) {
			const items = slice.items;

			items?.map(filter => {
				const categories = filter.categories;
				const categoriesArray = categories.split('\n');

				const categoryFilters = categoriesArray.map(cat => {
					return {
						slug: slugify(cat),
						label: cat
					};
				});

				const formatFilter = {
					type: filter.type,
					label: filter.label,
					items: categoryFilters
				};

				allFilters.push(formatFilter);

			});


			setFilterAndSort(allFilters);
		}

		ArrActiveFilters.push(...filters);
		ArrActiveFilters.push(...categories);
		if (sort.slug)
			ArrActiveFilters.push(sort);
		setActiveFilters(ArrActiveFilters);

		return ()=>{
			dispatch(resetAll());
		};

	}, []);

	useEffect(() => {
		const elPosition = document.getElementById('product-filter').offsetTop;

		let queries = query?.categories;
		if (!queries) queries = query?.category;

		if(!queries) return;
		queries = queries.toString().split(',');

		const categories = [];
		const existingFilters = allFilters.length > 0 ? allFilters : filterAndSort;
		for (const i in queries) {
			let slug = queries[i];
			if (replaceCategories[slug]) slug = replaceCategories[slug];
			existingFilters.map(filter => {
				const result = filter.items.find(item => item.slug === slug);
				if(result) categories.push(result);
			});
		}
		if (categories.length) dispatch(bulkFiltering(categories));
		window.scrollTo(0, elPosition);

	}, [query]);

	useEffect(() => {
		ArrActiveFilters.push(...filters);
		ArrActiveFilters.push(...categories);
		if (sort.slug)
			ArrActiveFilters.push(sort);
		setActiveFilters(ArrActiveFilters);

	}, [filters, sort, categories]);

	return (
		<>
			<section id='product-filter' className={`product-filter w-full md:pt-28 px-8 -lg:px-0 ${mobileFilterOpen ? 'filter-open' : 'filter-closed'}`}>
				<div className="product-filter-content container -lg:px-5 flex-cc flex-col w-full">
					<div className="grid grid-cols-3 w-full max-w-6xl select-none -md:flex -md:flex-col gap-x-4 items-start">
						{filterAndSort?.map((item, index) => (
							<div key={index} className="cursor-pointer relative py-4 border-t border-b border-black flex-1 -md:w-full -md:border-b-0">
								<div className="flex-bc text-2xl font-secondary" onClick={() => openedFilter === index ? setOpenedFilter(null) : setOpenedFilter(index)}>
									<span className="shake uppercase">{RichText.asText(item.label)}</span>
									<HiOutlineChevronDown className="text-pink " />
								</div>
								{openedFilter === index && (
									<ul className="mt-4 md:absolute z-10 bg-white p-6 w-full text-xl overflow-y-auto" style={{ maxHeight: 300 }}>
										{item.items?.map((filter, index) => (
											<li key={index} className={`flex w-full items-center justify-start font-light ${index !== item.items.length - 1 ? 'mb-3' : ''}`} onClick={() => handleFilterAndSort(item, filter)}>
												<div className={`w-4 h-4 border rounded-full mr-3 ${checkIfFilterAdded(filter.slug) ? 'bg-pink border-pink' : ''} ${checkIfCategoriesAdded(filter.slug) ? 'bg-pink border-pink' : ''} ${checkIfSortAdded(filter.slug) ? 'bg-pink border-pink' : ''}`}></div>
												{filter.label}
											</li>
										))}
									</ul>
								)}
							</div>
						))}

					</div>
					<div className='w-full max-w-6xl'>
						<ul className="mt-7 flex-wrap gap-x-10 gap-y-5 flex flex-col md:flex-row text-xl overflow-y-auto">
							{ActiveFilters.map((filter, index) =>
								(<li key={index} className='flex items-center justify-start font-light'>
									<div className='w-4 h-4 border rounded-full mr-3 bg-pink border-pink'></div>
									{filter.label}
								</li>)
							)}
						</ul>
					</div>
				</div>
				<div className="fixed bottom-0 w-full h-16 bg-pink text-white font-secondary flex-cc text-xl filter-button shake" onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>{mobileFilterOpen ? (filters.length ? 'APPLY FILTERS' : 'CLOSE FILTERS') : 'SHOW FILTERS'}</div>
			</section>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						.scrollable::-webkit-scrollbar {
							display:none;
						}
						.product-filter .filter-button{
							display:none;
						}

						.shake {
							animation: shake-animation 6s ease;
							transform-origin: 50% 50%;
						}
						@keyframes shake-animation {
							 0% { transform:translate(0,0) }
							1.78571% { transform:translate(5px,0) }
							3.57143% { transform:translate(0,0) }
							5.35714% { transform:translate(5px,0) }
							7.14286% { transform:translate(0,0) }
							8.92857% { transform:translate(5px,0) }
							10.71429% { transform:translate(0,0) }
							100% { transform:translate(0,0) }
						}
						@media (min-width: 1024px) {
							.product-filter ul {
								boxShadow: 0px 5px 20px #00000029;
							}
						}

						@media (max-width: 1023px) {
							.product-filter{
								position: fixed;
								top: 0;
								// min-height: 100%;
								z-index: 21;
							}

							.filter-open {
								min-height: 100%;
							}

							.filter-closed .product-filter-content{
								display:none;
							}

							.product-filter .filter-button{
								display:flex;
							}

							.product-filter-content{
								padding-top: calc(80px + 1rem);
								background:#fff;
								height:100%;
								position: absolute;
								justify-content:flex-start;
								overflow-y: auto;
								padding-bottom: 64px;
							}
						}

						@media (max-width: 767px) {
							.product-filter-content{
								padding-top: calc(80px + 6rem);
							}
						}
						`,
				}}
			/>
		</>
	);
};

export default FilterAndSort;
