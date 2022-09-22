import React from 'react';
import BlogCategoryLabel from './BlogCategoryLabel';

interface Props {
	category: number | null;
	setCategory: (arg0: number | null) => void;
	categories: any;
}

const BlogCategories = ({ category, setCategory, categories }: Props): JSX.Element => {
	return (
		<>
			<BlogCategoryLabel setCategory={setCategory} category={category} categories={categories} />
			<section className="w-full -md:hidden">
				<div className="container -xl:px-5 flex-cc flex-col w-full">
					<ul className="w-full gap-5 flex justify-between">
						{categories.map((item, i) => {
							return (
								<li key={i} onClick={() => setCategory(item.id)} className={`p-4 flex-1 ${item.id === category ? 'bg-pink text-white' : 'bg-gray'} cursor-pointer`}>{item.name}</li>
							);
						})}
					</ul>
				</div>
			</section>
		</>
	);
};

export default BlogCategories;