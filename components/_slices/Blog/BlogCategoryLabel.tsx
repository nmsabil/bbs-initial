import React from 'react';
import { VscChromeClose } from 'react-icons/vsc';

interface Props {
	setCategory(any): void;
	category: any;
	categories: any;
}

const BlogCategoryLabel = ({ category, categories }: Props): JSX.Element => {
	const getCategoryById = (id, categories) => {
		if (id) {
			const find = categories.find(item => item.id === id);
			if (find) return find.name;
		}
	};

	return (
		<section className="w-full md:hidden">
			<div className="container -xl:px-5 flex-cc flex-col w-full">
				<div className="flex w-full mt-6 max-w-6xl">
					{category && <div className="text-lg py-3 pl-3 pr-32 bg-gray font-light mr-4 flex-bc relative hover:bg-semidark-gray cursor-pointer">{getCategoryById(category, categories)} <VscChromeClose className="absolute right-3" /></div>}
				</div>
			</div>
		</section>
	);
};

export default BlogCategoryLabel;