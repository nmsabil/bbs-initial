import React from 'react';

interface PageHeaderProps {
    text: string
    color: string
		bgColor: string
}

const HeroImage = ({ text, color, bgColor }: PageHeaderProps): JSX.Element => {
	if (text && text != '') return (
		<section className="w-full h-130 -lg:h-80 flex-cc overflow-hidden" style={{ backgroundColor: bgColor }}>
			<h1 className="font-secondary font-black text-4xl md:text-8xl w-min text-center leading-snug" style={{ color: color }} >
				{text}
			</h1>
		</section>
	);
  else return (<section></section>);
};

export default HeroImage;
