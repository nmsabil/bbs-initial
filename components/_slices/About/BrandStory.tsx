import React from 'react';
import Link from '@components/_shared/Link';
import yumYUm from '../../../public/lottie/yum-yum.json';
import RenderLottie from '@components/RenderLottie';
import { RichText } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';

interface Props {
	slice: SliceType;
}

const BrandStory = ({ slice }: Props) => {

	const {title,cta_text,image,cta_url,button_color,enable_button} = slice.primary;

	return (
		<section className="w-full pt-28 pb-14 -sm:pb-10 -sm:pt-20 -xl:px-6">
			<div className="container max-w-5xl flex-cc flex-col w-full relative">
				<div className="absolute scale-30 -top-1/4 -right-1/2 -sm:hidden">
					<RenderLottie data={yumYUm} />
				</div>
				<h1 className="text-7xl -sm:text-6xl font-black font-secondary mb-6 -lg:mx-auto -lg:text-center">{RichText.asText(title)}</h1>
				<img src={image.url} alt={image.url} className="h-64 -sm:h-48 mb-8"/>
				<div className="story font-light rich-text">
					{slice.items.map((item,index)=>(
						<div key={index}>{RichText.render(item.description)}</div>
					))}
				</div>
				{enable_button && <Link href={cta_url}>
					<button className="text-white py-3 -sm:py-2 px-20 -sm:px-5 rounded-full mt-12 text-xl" style={{ 'backgroundColor': button_color}}>{cta_text}</button>
				</Link>}
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						.story h2 {
							font-family: TJ Evolette A Basic, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
							color: rgba(255, 88, 151, 1);
							font-size: 1.875rem;
  						line-height: 2.25rem;
							text-align: center;
							text-transform: uppercase;
							font-weight: 500;
							margin: 1rem 0;
						}
						.story p {
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
