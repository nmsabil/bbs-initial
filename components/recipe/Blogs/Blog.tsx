import React from 'react';
import Link from '@components/_shared/Link';
import { format } from 'date-fns';
import { BlogType } from './BlogType';
import { useRouter } from 'next/router';

interface Props {
	data: BlogType
	className?: string
}

const Blog = ({ data, className }: Props) => {
	const router = useRouter();
	const { title, date, categories, slug, _embedded } = data;
	const slugCategory = {
		4: 'recipe',
		5: 'news'
	};

	return (
		<Link className={`${className}`} href={`/${slugCategory[categories]}/${slug}`}>
			<div className={`cursor-pointer ${router.asPath === `/${slugCategory[categories]}/${slug}` ? 'hidden' : ''} w-64 mr-4`} >
				<div className="w-64 h-64 overflow-hidden" >
					{ _embedded['wp:featuredmedia'] && <img className="object-cover object-center h-full w-full" src={_embedded['wp:featuredmedia'][0].source_url} alt={title.rendered} />}
				</div>
				<div className="flex-cc col mt-3" >
					<h3 className="font-medium text-center" >{title.rendered}</h3>
					<h4 className="text-center" >{format(new Date(date), 'd MMMM yyyy')}</h4>
				</div>
			</div>
		</Link>
	);
};

export default Blog;
