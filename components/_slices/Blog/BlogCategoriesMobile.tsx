import React, { useState } from 'react';

interface Props {
	category: string | null;
	setCategory: (arg0: string | null) => void;
	categories: any;
}

const BlogCategoriesMobile = ({ category, setCategory, categories }: Props): JSX.Element => {
	const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

	return (
		<section className="w-full md:hidden">
			<div className={`categories-filter container flex-cc flex-col w-full ${mobileFilterOpen ? 'filter-open' : 'filter-closed'}`}>
				<ul className="text-xl categories-filter-content w-full px-5">
					<div className="flex-bc text-2xl mb-2 font-secondary border-t border-black pt-4">VIEW</div>
					{categories?.map((item, index) => (
						<li key={index} className={`flex w-full items-center capitalize justify-start font-light hover:text-pink ${item === category ? 'text-pink' : ''}`} onClick={() => setCategory(item)}>
							{item}
						</li>
					))}
				</ul>
			</div>
			<div className="fixed bottom-0 w-full h-16 bg-pink text-white font-secondary flex-cc text-xl filter-button" onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>{mobileFilterOpen ? (category != categories[0] ? 'APPLY FILTERS' : 'CLOSE FILTERS') : 'SHOW FILTERS'}</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
					.categories-filter .filter-button{
						display:none;
					}
					.filter-button{
						z-index: 22;
					}
					@media (max-width: 1023px){
						.categories-filter{
							position: fixed;
							top: 0;
							z-index: 11;
						}

						.filter-open {
							min-height: 100%;
						}

						.filter-closed .categories-filter-content{
							display:none;
						}

						.categories-filter .filter-button{
							display:flex;
						}

						.categories-filter-content{
							padding-top: calc(80px + 3rem);
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
		</section>
	);
};

export default BlogCategoriesMobile;
