import React from 'react';
import Flickity from 'react-flickity-component';

interface NavCarousel {
	setFlktyNav(any): any
	images: any
	FlktyMain: any
}

export default function NavCarousel({ setFlktyNav, images, FlktyMain }: NavCarousel) {

	function CarouselNav(index: number) {
		FlktyMain.select(index);
	}

	return (
		<Flickity
			className="overflow-hidden focus:outline-none transform transition-transform"
			flickityRef={(c) => setFlktyNav(c)}
			options={{
				freeScroll: false,
				contain: true,
				prevNextButtons: false,
				pageDots: false,
				cellAlign: 'left'
			}}
		>
			{images?.map((url: string, index: number) => {
				return (
					<div key={index} onClick={() => CarouselNav(index)} className="h-40 w-40 mr-3 cursor-pointer">
						<img className="object-cover object-center h-full w-full" src={url} alt="" />
					</div>
				);
			})}
		</Flickity>
	);
}
