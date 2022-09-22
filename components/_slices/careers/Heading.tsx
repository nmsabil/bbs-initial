import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType
}

const Heading = ({ slice }: Props) => {
	return (
		<section className="w-full">
			<div className="container w-full max-w-4xl -lg:max-w-xs -lg:px-4">
				<h3 className={`text-2xl md:text-4xl font-secondary mb-3 text-${slice.primary.alignment}`} style={{ color: slice.primary.text_color }}>{RichText.asText(slice.primary.text)}</h3>
			</div>
		</section>
	);
};

export default Heading;
