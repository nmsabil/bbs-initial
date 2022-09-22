import React, { useState, useEffect } from 'react';
import { SliceType } from '@core/prismic/client';
import BlogCategories from './BlogCategories';
import BlogCategoriesMobile from './BlogCategoriesMobile';
import FeaturedStory from './FeaturedStory';
import Blogs from './Blogs';

interface Props {
	slice: SliceType;
}

const Blog = ({slice}: Props): JSX.Element => {
	let allBlogPost = slice.items;
	const [category, setCategory] = useState<string | null>('all');
	const categoryList = new Set();
	allBlogPost.map((post) => {
		categoryList.add(post?.category === 'news' ? 'news' : post?.category === 'recipes' ? 'recipes' : post?.category === 'interviews' ? 'interviews' : 'competitions');
	});
	allBlogPost = allBlogPost.sort((a,b) => (a?.date_created < b?.date_created) ? 1 : ((b?.date_created < a?.date_created) ? -1 : 0))
	const [filteredBlogPost, setFilteredBlogPost] = useState(allBlogPost);

	useEffect(() => {
		if (category === 'all'){
			setFilteredBlogPost(allBlogPost);
		} else {
			setFilteredBlogPost(
				allBlogPost.filter((post) => {
					return post.category === category;
				})
			);
		}

	}, [category]);

	return (
		<div>
			<BlogCategories category={category} setCategory={setCategory} categories={['all', 'news', 'recipes', 'interviews', 'competitions']} />
			<BlogCategoriesMobile category={category} setCategory={setCategory} categories={['all', 'news', 'recipes', 'interviews', 'competitions']} />
			{filteredBlogPost.length > 0 && (
				<FeaturedStory data={filteredBlogPost[0]} />
			)}
			<Blogs data={filteredBlogPost} featuredStory={filteredBlogPost[0]} />
		</div>
	);
};

export default Blog;
