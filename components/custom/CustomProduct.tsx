import React from 'react';
import * as cheerio from 'cheerio';
import parse from 'html-react-parser';
import Link from '@components/_shared/Link';
import sanitizer from '@core/utils/sanitizer';
interface Props {
	content: any;
}

const CustomProduct = ({ content }: Props): JSX.Element => {
	const $ = cheerio.load(content);
	const section = {
		title: sanitizer($('h2').text()),
		description: sanitizer($.html($('p'))),
		cta_text: sanitizer($('.wp-block-button__link').text()),
		images: $('img').map((_, image) => $(image).attr('data-src')).toArray(),
	};

	return (
		<section className="w-full -sm:px-6">
			<div className="container flex-cc flex-col">
				<div className="max-w-4xl">
					<h1 className="text-3xl text-center -sm:text-left uppercase text-pink font-medium font-secondary my-2 mb-8">{section.title}</h1>
					<div className="text-lg leading-8 product-description">
						{parse(section.description)}
					</div>
				</div>
				<Link href="/shop">
					<button className="bg-pink text-white py-3 -sm:py-2 px-20 -sm:px-5 rounded-full mt-8 text-xl">{section.cta_text}</button>
				</Link>
				<div className="grid gap-3 -sm:grid-cols-2 grid-cols-4 -sm:my-10 mt-16">
					{section.images.map((image, i) => (
						<img src={image.toString()} alt="" key={i}/>
					))}
				</div>
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						.product-description p {
							margin-bottom: 1.5rem;
						}
					`,
				}}
			/>
		</section>
	);
};

export default CustomProduct;
