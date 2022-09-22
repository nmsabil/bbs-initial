import React from 'react';
import * as cheerio from 'cheerio';
import sanitizer from '@core/utils/sanitizer';
interface Props {
	content: any;
}

const HappyCustomer = ({ content }: Props): JSX.Element => {
	const $ = cheerio.load(content);
	const section = {
		title: sanitizer($('h2').text()),
		description: sanitizer($('p').text()),
		images: $('img').map((_, image) => $(image).attr('data-src')).toArray(),
	};

	return (
		<section className="w-full -sm:px-6">
			<div className="container my-20 -sm:mt-0">
				<div className="text-center -sm:text-left mb-20">
					<h1 className="text-3xl uppercase text-pink font-medium font-secondary mb-8">{section.title}</h1>
					<p className="text-lg leading-8">{section.description}</p>
				</div>
				<div className="grid grid-cols-5 -sm:grid-cols-3 gap-y-20 gap-x-16 -sm:gap-x-8">
					{section.images.map((image, i) => (
						<img src={image.toString()} alt="" key={i} />
					))}
				</div>
			</div>
		</section>
	);
};

export default HappyCustomer;