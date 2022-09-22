import React from 'react';

interface PageHeaderProps {
    image: string
	image_mobile: string
    color: string
    mode?: string
}

const HeroImage = ({ image, image_mobile, color, mode = 'cover' }: PageHeaderProps): JSX.Element => {
	return (
		<section className="w-full h-130 -lg:h-80 flex-cc" style={{ backgroundColor: color }}>
			{image && <img src={image} className={`w-full h-full object-${mode} -md:hidden`}/>}
			{image_mobile && <img src={image} className={`w-full h-full object-${mode} md:hidden`}/>}
		</section>
	);
};

export default HeroImage;
