import React from 'react';
import { SliceType } from '@core/prismic/client';

interface Props {
    slice: SliceType;
}

const NewsHero = ({ slice }: Props): JSX.Element => {
	const {image} = slice.primary;
	return (
		<section className="w-full h-130 -lg:h-80 flex-cc">
			<img src={image.url} className='w-full h-full object-cover'/>
		</section>
	);
};

export default NewsHero;
