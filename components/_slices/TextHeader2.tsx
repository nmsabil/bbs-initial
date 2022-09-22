import React from 'react';
import { RichText } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';
interface Props {
	slice: SliceType
}

const TextHeader2 = ({ slice }: Props) => {
	return (
		<section className="w-full pt-20 pb-10 -lg:pb-8 -lg:pt-10">
			<div className="container flex-cc flex-col w-full -lg:px-5">
				<h1 className={`text-4xl -lg:text-2xl font-secondary text-${slice.primary.title_alignment}`} style={{ color: slice.primary.title_color }}>{ RichText.asText(slice.primary.title) }</h1>
				<div className={`text-xl -lg:text-base font-light mt-8 -lg:mt-4 max-w-5xl -lg:max-w-3xl rich-text text-${slice.primary.description_alignment}`} style={{ color: slice.primary.description_color }}>{ RichText.render(slice.primary.description) }</div>
			</div>
		</section>
	);
};

export default TextHeader2;
