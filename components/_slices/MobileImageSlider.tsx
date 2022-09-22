import React from 'react';
import { SliceType } from '@core/prismic/client';
import Flickity from 'react-flickity-component';

interface Props {
	slice: SliceType
}

const MobileImageSlider = ({ slice }: Props) => {

	return (
		<>
			<Flickity
				className="overflow-hidden focus:outline-none flickity-with-dots md:hidden"
				options={{
					contain: true,
					prevNextButtons: true,
					pageDots: true,
					cellAlign: 'left',
					adaptiveHeight: true
				}}
			>
				{slice.items?.map((item, index: number) => {
					return (
						<div key={index} className="w-full mr-3" style={{ height: 'fit-content' }}>
							<img className="object-cover object-center" style={{ height: '100vw', width: '100vw',}}src={item.image.url} alt="" />
						</div>
					);
				})}
			</Flickity>
		</>
	);
};

export default MobileImageSlider;
