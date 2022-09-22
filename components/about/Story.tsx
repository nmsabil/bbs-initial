import React from 'react';
import * as cheerio from 'cheerio';
import parse from 'html-react-parser';
import Link from '@components/_shared/Link';
import sanitizer from '@core/utils/sanitizer';
import yelloHeart from '../../public/lottie/yum-yum.json';
import RenderLottie from '@components/RenderLottie';

interface Props {
	content: any;
}

const BrandStory = ({ content }: Props) => {
	const $ = cheerio.load(content);
	const section = {
		title: $('h1').text(),
		description: $('.wp-block-group').toArray().map(group => sanitizer($.html(group))),
		image: $('img').attr('data-src'),
		button: {
			cta_text: $('.wp-block-button__link').text(),
			color: $('.wp-block-button__link').attr().style.split('background-color:')[1],
		}
	};

	return (
		<section className="w-full py-28 -sm:py-10 -sm:px-6">
			<div className="container max-w-5xl flex-cc flex-col w-full relative">
				<div className="absolute scale-30 -top-1/4 -right-1/2 -sm:hidden">
					<RenderLottie data={yelloHeart} />
				</div>
				<h1 className="text-7xl -sm:text-6xl font-black font-secondary mb-2">{section.title}</h1>
				<img src={section.image} alt="" className="h-64 -sm:h-48 mb-8"/>
				{section.description.map((story, i) => (
					<div className="story" key={i}>
						{parse(story)}
					</div>
				))}
				<Link href="/shop">
					<button className="text-white py-3 -sm:py-2 px-20 -sm:px-5 rounded-full mt-12 text-xl" style={{ 'backgroundColor': section.button.color}}>{section.button.cta_text}</button>
				</Link>
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						.story .wp-block-group h2 {
							font-family: TJ Evolette A Basic, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
							color: rgba(255, 88, 151, 1);
							font-size: 1.875rem;
  						line-height: 2.25rem;
							text-align: center;
							text-transform: uppercase;
							font-weight: 500;
							margin: 1rem 0;
						}
						.story .wp-block-group p {
							font-size: 1.25rem;
  						line-height: 2rem;
							margin-bottom: 1.5rem;
						}
					}
					`,
				}}
			/>
		</section>
	);
};

export default BrandStory;
