import React from 'react';
import Link from '@components/_shared/Link';
import { format } from 'date-fns';
import { getPostUrl } from '@core/utils/posts';

interface BlogsProps {
    data: any
}

const Blogs = ({ data }: BlogsProps): JSX.Element => {
	return (
		<>
			<section className="w-full py-12">
				<div className="container -xl:px-5 flex-cc flex-col w-full">
					<ul className="grid grid-cols-4 -lg:grid-cols-2 w-full gap-4 text-center">
						{ data.map((item, index) => (
							<Link href={ getPostUrl(item) } key={index}>
								<li key={index} className="mb-6">
									<div className="h-100 -lg:h-44">
										{  item._embedded['wp:featuredmedia'] ? (
											<img src={ item._embedded['wp:featuredmedia'][0].source_url } alt="preview" className="w-full h-full object-cover"/>
										) : (
											<div className="bg-gray w-full h-full"></div>
										) }
									</div>
									<div className="mt-6 -lg:mt-2 lg:text-xl">
										<h3 className="font-bold">{ item.title.rendered }</h3>
										<h4 className="-lg:hidden">{ format(new Date(item.date), 'd MMMM yyyy') }</h4>
									</div>
								</li>
							</Link>
						)) }
					</ul>
				</div>
			</section>
		</>
	);
};

export default Blogs;