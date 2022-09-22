import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType
}

const Paragraph = ({ slice }: Props) => {
	return (
		<section className="w-full">
			<div className="container w-full max-w-4xl -lg:max-w-xs -lg:px-4 font-light mt-8">
				<h3 className="mb-6">{RichText.asText(slice.primary.text)}</h3>
			</div>
		</section>
	);
};

export default Paragraph;
