import React from 'react';
import { SliceType } from '@core/prismic/client';

interface Props {
	slice: SliceType
}

/**
 *	Single image without any text
 */

const Image = ({ slice }: Props) => {
	return (
		<section className={`w-full ${slice.primary.desktop_only ? '-md:hidden' : ''}`}>
			<div className="container lg:px-20">
				<img src={slice.primary.image.url} alt="Custom cake" className="mt-6 mx-auto bg-cover bg-center"/>
			</div>
		</section>
	);
};

export default Image;
