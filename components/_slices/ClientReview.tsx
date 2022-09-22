import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import { AiFillStar } from 'react-icons/ai';

interface Props {
	slice: SliceType
}

const ClientReview = ({ slice }: Props): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:py-12 bg-light-gray">
				<div className="container flex-cc flex-col w-full -lg:px-5">
					<ul className="w-full grid grid-cols-3 gap-x-14 -lg:grid-cols-1 -lg:max-w-2xl">
						{slice.items.map((item, index) => (
							<li className={`text-center ${ index === slice.items.length - 1 ? '' : '-lg:mb-7' }`} key={index}>
								<h4 className="text-lg lg:text-4xl font-medium">{ RichText.asText(item.title) }</h4>
								<h5 className="lg:text-lg font-light mt-7 -lg:mt-1">{ RichText.asText(item.review) }</h5>
								<div className={`text-lg font-light mt-3 -lg:mt-1 text-pink ${slice.primary.show_client_name_on_mobile ? '' : '-lg:hidden'}`}>{ RichText.asText(item.client_name) }</div>
								{item.rating && (
									<div className="flex-cc mt-5 -lg:mt-2">
										{[...Array(item.rating)].map((_, i) => (
											<AiFillStar key={i} className="text-semilight-pink text-3xl -lg:text-xl mx-2 -lg:mx-1"/>
										))}
									</div>
								)}
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	);
};

export default ClientReview;
