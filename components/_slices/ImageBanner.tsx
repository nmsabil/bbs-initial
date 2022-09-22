import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';

interface Props {
	slice: SliceType
}

const ImageBanner = ({ slice }: Props): JSX.Element => {
	const {background_color, heading, image, title, description, cta_url} = slice.primary;
	const Content = () => (
		<div className="w-full pb-28 -lg:pb-6 -lg:pt-4 flex-cc flex-col">
			<div className="w-full" style={{backgroundColor: `${background_color}`}}>
				<div className="w-full max-w-screen-2xl mx-auto relative overflow-hidden -lg:h-130 lg:h-[650px] flex justify-center">
					<h2 className="absolute top-9 lg:top-16 text-center font-secondary text-white font-bold text-5.25xl lg:text-7xl -md:max-w-xs">{ RichText.asText(heading) }</h2>
					<h4 className="absolute top-36 -lg:top-24 -md:top-36 text-center text-white font-bold text-xl -md:px-7">{ RichText.asText(title) }</h4>
					{ image.url && <img src={image.url} alt="banner" className="-lg:h-full -lg:w-full w-full xl:object-contain object-cover object-bottom"/>}
				</div>
			</div>
			<div className="text-center mt-5">
				<p className="text-lg">{RichText.asText(description)}</p>
			</div>
		</div>
	);

	if (cta_url){
		return (
			<Link href={cta_url}>
				<a>
					<Content />
				</a>
			</Link>
		);
	} else {
		return <Content />;
	}
};

export default ImageBanner;
