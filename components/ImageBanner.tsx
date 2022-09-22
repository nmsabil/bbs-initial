import React from 'react';
import parse from 'html-react-parser';

interface ImageBannerProps {
    image: string
    text: string
    title: string
}

const ImageBanner = ({ image, text = '', title }: ImageBannerProps): JSX.Element => {
	return (
		<>
			<div className="w-full pb-28 -lg:py-12 flex-cc flex-col">
				<div className="w-full relative -lg:h-130 flex-cc">
					<h2 className="absolute top-9 lg:top-20 text-center font-secondary text-white font-bold text-5.25xl lg:text-7xl">{ title }</h2>
					<img src={image} alt="banner" className="-lg:h-full -lg:w-full object-cover"/>
				</div>
				<div className="text-center mt-5">{ text  ? parse(text) : '' }</div>
			</div>
		</>
	);
};

export default ImageBanner;
