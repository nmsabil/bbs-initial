import React from 'react';

interface Props {
	category: string | null;
	setCategory: (arg0: string | null) => void;
	categories: any;
}

const BlogCategories = ({ category, setCategory, categories }: Props): JSX.Element => {
	return (
		<>
			<section className="w-full -md:hidden">
				<div className="container -xl:px-5 flex-cc flex-col w-full">
					<ul className="w-full gap-5 flex justify-between">
						{categories.map((item, i) => {
							return (
								<li key={i} onClick={() => setCategory(item)} className={`p-4 flex-1 text-xl font-secondary ${item === category ? 'bg-pink text-white' : 'bg-gray'} cursor-pointer capitalize`}>{item}</li>
							);
						})}
					</ul>
				</div>
			</section>
		</>
	);
};

export default BlogCategories;
