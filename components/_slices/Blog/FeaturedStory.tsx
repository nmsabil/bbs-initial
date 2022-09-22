import React from 'react';
import Link from '@components/_shared/Link';
import { RichText } from 'prismic-reactjs';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { format } from 'date-fns';

interface BlogsProps {
	data: any
}

const FeaturedStory = ({ data }: BlogsProps): JSX.Element => {
	if (data) return (
		<>
			<section className="w-full p-16 lg:py-12 -xl:px-5 -lg:px-5 -md:pb-0 -md:pt-0">
				<div className="container -xl:px-5 -lg:px-0 flex-cc flex-col w-full">
					<a href={data?.route} className="w-full bg-light-pink -md:bg-white flex-bs h-130 -md:h-72 -md:flex-col">
						<div className="w-1/2 overflow-hidden h-full -md:w-full">
							{data?.thumbnail ? (
								<img src={data?.thumbnail.url} alt="preview" className="w-full h-full object-cover" />
							) : (
								<div className="bg-gray w-full h-full"></div>
							)}
						</div>
						<div className="p-7 flex-1 h-full flex-col flex justify-between -md:p-0">
							<div>
								<h2 className="text-3xl md:font-secondary -md:text-base mb-6 -md:mb-0 -md:font-bold -md:mt-2">{data?.html_title}</h2>
								<p className="text-xl font-light -md:hidden mb-6 -md:mb-0">{RichText.asText(data?.preview_text)}</p>
								<p className="text-xl font-light -md:hidden">{ format(new Date(data?.date_created), 'dd/MM/yy') }</p>
							</div>
							<Link href={data?.route} className="text-xl font-light flex items-center w-full -md:hidden">Read More <HiOutlineChevronRight className="text-xl text-pink ml-2" /></Link>
						</div>
					</a>
				</div>
			</section>
		</>
	); else return (<></>);
};

export default FeaturedStory;
