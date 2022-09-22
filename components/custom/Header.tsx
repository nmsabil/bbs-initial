import React from 'react';
import * as cheerio from 'cheerio';
import sanitizer from '@core/utils/sanitizer';
interface Props {
	title: string;
	content: any;
}

const Header = ({ title, content }: Props): JSX.Element => {
	const $ = cheerio.load(content);
	const section = {
		description: sanitizer($('p').text()),
		image: $('img').attr('data-src'),
	};

	return (
		<section className="w-full">
			<div className="container my-14">
				<div className="text-center">
					<h1 className="uppercase font-black font-secondary text-7xl">{title}</h1>
					<p className="text-lg py-5">{section.description}</p>
				</div>
				<img src={section.image} alt="Custom cake" className="mt-6 mx-auto bg-cover bg-center"/>
			</div>
		</section>
	);
};

export default Header;