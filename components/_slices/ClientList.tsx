import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType
}

const ClientList = ({ slice }: Props): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:pt-10 -lg:pb-1">
				<div className="container flex-cc flex-col w-full -lg:px-5">
					<h2 className="text-4xl font-medium font-secondary -lg:text-2xl" style={{ color: slice.primary.title_color }}>{RichText.asText(slice.primary.title)}</h2>
					<p className="text-xl font-light leading-8 mt-5 -sm:mx-5 -lg:text-base" style={{ color: slice.primary.description_color }}>{RichText.asText(slice.primary.description)}</p>
					<div className="-xl:flex -xl:flex-wrap xl:grid grid-cols-5 gap-20 -xl:gap-4 -md:gap-10 -xl:grid-cols-3 -xl:my-8 lg:mt-12 -md:max-w-s xl:px-0 md:px-4" >
						{slice.items.map((image, i) => (
							<div className={`flex-cc -xl:w-3/12 -xl:px-8 -md:px-0 -xl:mx-auto ${i} ${i > 8 ? '-lg:hidden' : ''}`} key={i} >
								<img src={image.client_logo.url} alt={image.client_logo.alt || 'customers'} />
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default ClientList;
