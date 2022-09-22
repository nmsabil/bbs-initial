import React from 'react';
import { SliceType } from '@core/prismic/client';

interface Props {
	slice: SliceType
}

const ShopHeader = ({ slice }: Props): JSX.Element => {
	const {image, image_mobile} = slice.primary;
	return (
		<>
			<section className="w-full h-130 -lg:h-96 flex-cc" style={{ backgroundColor: '#fbbde4' }}>
				{image && <img src={image.url} className={`w-full h-full object-cover ${image_mobile?.url ? '-md:hidden' : ''}`}/>}
				{image_mobile && <img src={image_mobile.url} className={'w-full h-full object-cover md:hidden'}/>}
			</section>
		</>
	);
};

export default ShopHeader;
