import React from 'react';
import Link from '@components/_shared/Link';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { getPostUrl } from '@core/utils/posts';
import { RichText } from 'prismic-reactjs';

interface BlogsProps {
	data: any
}

const FeaturedStory = ({ data }: BlogsProps): JSX.Element => {
	return (
		<>
			<section className="w-full p-16 -lg:py-12 -md:px-5 -md:pb-0">
				<div className="container -xl:px-5 -md:px-0 flex-cc flex-col w-full">
					<div className="w-full bg-light-pink -md:bg-white flex-bs h-130 -md:h-72 -md:flex-col">
						<div className="w-1/2 overflow-hidden h-full -md:w-full">
							{data._embedded['wp:featuredmedia'] ? (
								<img src={data._embedded['wp:featuredmedia'][0].source_url} alt="preview" className="w-full h-full object-cover" />
							) : (
								<div className="bg-gray w-full h-full"></div>
							)}
						</div>
						<div className="p-7 flex-1 h-full flex-col flex justify-between -md:p-0">
							<div>
								<h2 className="text-3xl md:font-secondary -md:text-base mb-6 -md:mb-0 -md:font-bold -md:mt-2">{data.title.rendered}</h2>
								<p className="text-xl font-light -md:hidden">{RichText.asText(data.preview_text)}</p>
							</div>
							<Link href={getPostUrl(data)} className="text-xl font-light flex items-center w-full -md:hidden">Read More <HiOutlineChevronRight className="text-xl text-pink ml-2" /></Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default FeaturedStory;
