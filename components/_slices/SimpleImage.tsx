import { SliceType } from '@core/prismic/client';
import React from 'react';

interface Props {
	slice: SliceType
}

const SimpleImage = ({ slice }: Props) => {

	const {image , custom_class = ''} = slice.primary;

	return (
		<section className="w-full -sm:px-6">
			<div className="container max-w-5xl flex-cc flex-col w-full relative">
				<img src={image.url} alt={image.alt} className={custom_class}/>
			</div>
		</section>
	);
};

export default SimpleImage;
