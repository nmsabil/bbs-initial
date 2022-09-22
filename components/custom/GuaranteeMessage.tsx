import React from 'react';
import * as cheerio from 'cheerio';
import parse from 'html-react-parser';
import heartAnimation from '../../public/lottie/yellow-heart.json';
import RenderLottie from '@components/RenderLottie';
import sanitizer from '@core/utils/sanitizer';

interface Props {
	content: any;
}

const GuaranteeMessage = ({ content }: Props): JSX.Element => {
	const $ = cheerio.load(content);
	const section = {
		title: sanitizer($('h2').text()),
		cards: $('.wp-block-group').toArray().map(group => sanitizer($.html(group))),
	};

	return (
		<section className="w-full">
			<div className="text-center py-20 bg-sky-blue -sm:px-6 relative flex-cc">
				<div className="absolute w-80 h-80 -lg:w-48 -lg:h-48 -top-36  -lg:pt-12 ">
					<RenderLottie data={heartAnimation} />
				</div>
				<h1 className="text-white uppercase font-secondary text-2xl font-black">{section.title}</h1>
			</div>
			<div className="bg-light-gray -sm:px-6">
				<div className="container">
					<div className="grid grid-cols-3 -sm:grid-cols-1 gap-16 py-20">
						{section.cards.map((card, i) => (
							<div className="text-center" key={i}>
								{parse(card || '')}
							</div>
						))}
					</div>
				</div>
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
							.wp-block-group h3 {
								font-size: 2rem;
								font-weight: 600;
								margin-bottom: 1rem;
							}
							.wp-block-group p {
								font-size: 1.25rem;
								line-height: 1.75rem;
							}
							.wp-block-group p:last-child {
								color: rgba(255, 88, 151, 1);
							}
						`,
				}}
			/>
		</section>
	);
};

export default GuaranteeMessage;