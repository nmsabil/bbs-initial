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
			{images?.map((item, index: number) => {
				return (
					<div key={index} className="w-full mr-3" style={{ height: 'fit-content' }}>
						{  item.image?.url ? (
							<img className="object-cover object-center" style={{ height: '36rem', width: '36rem',}} src={item.image.url} alt="" />
						) : (
							<div className="bg-gray w-full h-full" style={{ height: '36rem', width: '36rem',}}></div>
						) }
					</div>
				);
			})}
		</Flickity>
	);
}
