import { bulkFiltering, updateFiltering } from '@core/redux/actions/search';
import { useSearch } from '@core/redux/reducers/search';
import React, { useEffect, useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { VscChromeClose } from 'react-icons/vsc';
import { useRouter } from 'next/router';

interface ProductFilterProps {
	byCategoryOptions: any
	byProductsOptions: any
	byTypeOptions: any
}

const ProductFilter = ({ byCategoryOptions, byProductsOptions, byTypeOptions }: ProductFilterProps): JSX.Element => {
	const [byProductOpen, setByProductOpen] = useState(false);
	const [byCategoryOpen, setByCategoryOpen] = useState(false);
	const [byTypeOpen, setByTypeOpen] = useState(false);
	const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
	const dispatch = useDispatch();
	const { filters } = useSearch();
	const router = useRouter();
	const query = router.query;

	const handleFiltering = (filter) => {
		dispatch(updateFiltering(filter, filters));
	};

	const checkIfFilterAdded = (slug) => {
		return filters.find(obj => obj.slug === slug);
	};

	useEffect(() => {
		if (query) {
			if (query.categories) {
				if (query.categories.includes(',')) {
					const queries = query.categories.toString().split(',');
					const filteredCategories = [];
					queries.map(str => {
						byCategoryOptions.map(cat => {
							if (cat.slug === str) {
								filteredCategories.push(cat);
							}
						});
					});

					if (filteredCategories.length > 0) {
						dispatch(bulkFiltering(filteredCategories));
					}
				} else {
					const find = byCategoryOptions.find(item => item.slug === query.categories);
					if (find) {
						dispatch(bulkFiltering([find]));
					}
				}
			}
		}
	}, [query]);

	return (
		<>
			<section className={`product-filter w-full md:pt-28 ${mobileFilterOpen ? 'filter-open' : 'filter-closed'}`}>
				<div className="product-filter-content container -lg:px-5 flex-cc flex-col w-full">
					<div className="flex-bs w-full max-w-6xl select-none -md:flex-col">
						<div className="cursor-pointer py-4 border-t border-b border-black flex-1 -md:w-full -md:border-b-0">
							<div className="flex-bc text-2xl font-secondary" onClick={() => setByProductOpen(!byProductOpen)}>BY PRODUCT <HiOutlineChevronDown className="text-pink" /></div>
							{byProductOpen && (
								<ul className="mt-7 text-xl">
									{byProductsOptions?.map((item, index) => (
										<li key={index} className={`flex w-full items-center justify-start font-light ${index !== byProductsOptions.length - 1 ? 'mb-3' : ''}`} onClick={() => handleFiltering(item)}>
											<div className={`w-4 h-4 border rounded-full mr-3 ${checkIfFilterAdded(item.slug) ? 'bg-pink border-pink' : ''}`}></div>
											{item.label}
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="cursor-pointer py-4 border-t border-b border-black flex-1 mx-4 -md:w-full -md:mx-0 -md:border-b-0">
							<div className="flex-bc text-2xl font-secondary" onClick={() => setByCategoryOpen(!byCategoryOpen)}>BY CATEGORY <HiOutlineChevronDown className="text-pink" /></div>
							{byCategoryOpen && (
								<ul className="mt-7 text-xl">
									{byCategoryOptions?.map((item, index) => (
										<li key={index} className={`flex w-full items-center justify-start font-light ${index !== byCategoryOptions.length - 1 ? 'mb-3' : ''}`} onClick={() => handleFiltering(item)}>
											<div className={`w-4 h-4 border rounded-full mr-3 ${checkIfFilterAdded(item.slug) ? 'bg-pink border-pink' : ''}`}></div>
											{item.label}
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="cursor-pointer py-4 border-t border-b border-black flex-1 -md:w-full -md:border-b-0">
							<div className="flex-bc text-2xl font-secondary" onClick={() => setByTypeOpen(!byTypeOpen)}>BY TYPE <HiOutlineChevronDown className="text-pink" /></div>
							{byTypeOpen && (
								<ul className="mt-7 text-xl">
									{byTypeOptions?.map((item, index) => (
										<li key={index} className={`flex w-full items-center justify-start font-light ${index !== byTypeOptions.length - 1 ? 'mb-3' : ''}`} onClick={() => handleFiltering(item)}>
											<div className={`w-4 h-4 border rounded-full mr-3 ${checkIfFilterAdded(item.slug) ? 'bg-pink border-pink' : ''}`}></div>
											{item.label}
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>
				<div className="fixed bottom-0 w-full h-16 bg-pink text-white font-secondary flex-cc text-xl filter-button" onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>{mobileFilterOpen ? 'CLOSE FILTERS' : 'SHOW FILTERS'}</div>
			</section>
			<div className="container -lg:px-5 flex-cc">
				<div className="scrollable flex w-full mt-6 max-w-6xl flex-wrap -md:flex-nowrap -md:overflow-x-scroll">
					{filters?.map((item) => (
						<div key={item.slug} className="text-lg mb-4 py-3 pl-3 pr-32 bg-gray font-light mr-4 flex-bc relative hover:bg-semidark-gray cursor-pointer" onClick={() => handleFiltering(item)}>{item.label} <VscChromeClose className="absolute right-3" /></div>
					))}
				</div>
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						.scrollable::-webkit-scrollbar {
							display:none;
						}
						.product-filter .filter-button{
							display:none;
						}
						@media (max-width: 1023px){
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
								padding-top: calc(80px + 6rem);
								background:#fff;
								height:100%;
								position: absolute;
								justify-content:flex-start;
								overflow-y: auto;
								padding-bottom: 64px;
							}
						}
						`,
				}}
			/>
		</>
	);
};

export default ProductFilter;
