import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import Link from '@components/_shared/Link';

interface Props {
	slice: SliceType;
}
const Error = ({ slice }: Props): JSX.Element => {
	const {  description, image, cta_url } = slice.primary;
	return (
		<section className="w-full h-full bg-no-repeat bg-map-dark">
			<div className="flex-cc col h-96">
				<Link href={cta_url}>
					<img src={image.url} alt="sorry" className="w-64" />
				</Link>
				<p className="text-xl max-w-xs px-10 text-center font-light">{RichText.asText(description)}</p>
			</div>
		</section>
	);
};

export default Error;
