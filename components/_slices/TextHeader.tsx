import React from 'react';
import { RichText } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';
interface Props {
	slice: SliceType
}

const TextHeader = ({ slice }: Props) => {
	return (
		<section className="w-full pt-20 pb-10 -lg:pb-12 -lg:pt-24">
			<div className="container flex-cc flex-col w-full -lg:px-5">
				<h1 className={`text-7xl -lg:text-5.25xl font-secondary font-bold rich-text text-${slice.primary.title_alignment}`} style={{ color: slice.primary.title_color }}>{ RichText.asText(slice.primary.title) }</h1>
				<div className={`text-2xl -lg:text-base font-light mt-5 max-w-2xl rich-text text-${slice.primary.description_alignment}`} style={{ color: slice.primary.description_color }}>{ RichText.render(slice.primary.description) }</div>
			</div>
		</section>
	);
};

export default TextHeader;
