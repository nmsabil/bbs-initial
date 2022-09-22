import React from 'react';
import Flickity from 'react-flickity-component';

interface MainCarouselProps {
	setFlktyMain: any
	images: any
}

export default function MainCarousel({ setFlktyMain, images }: MainCarouselProps) {
	return (
		<Flickity
			className="overflow-hidden focus:outline-none"
			flickityRef={(c) => setFlktyMain(c)}
			options={{
				contain: true,
				prevNextButtons: false,
				pageDots: false,
				cellAlign: 'left',
				adaptiveHeight: true
			}}
		>
			{images?.map((url: string, index: number) => {
				return (
					<div key={index} className="w-full mr-3" style={{ height: 'fit-content' }}>
						<img className="object-cover object-center h-full w-full" src={url} alt="" />
					</div>
				);
			})}
		</Flickity>
	);
}
