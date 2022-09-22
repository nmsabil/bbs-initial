import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType
}

const Hero = ({ slice }: Props) => {
	return (
		<section className="w-full h-155 flex-cc overflow-hidden mb-28 -lg:mb-12" style={{ backgroundColor: slice.primary.background_color }}>
			<h1 className="capitalize text-pink font-secondary font-black text-4xl md:text-8xl max-w-xs md:max-w-5xl text-center leading-snug" style={{ color: slice.primary.text_color }}>{RichText.asText(slice.primary.title)}</h1>
		</section>
	);
};

export default Hero;
