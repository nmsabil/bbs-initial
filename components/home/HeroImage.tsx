import React from 'react';
import Link from '@components/_shared/Link';
import Banner from '@components/Banner';
import heartAnimation from '../../public/lottie/yellow-heart.json';

interface Props {
	title: string;
	banner: {
		text: string;
		color: string;
	}
	cta_text: {
		text: string;
		href: string;
	},
	image?: string;
	titlePosition?: string;
}

const HeroImage = ({ title, cta_text, banner, image , titlePosition}: Props): JSX.Element => {
	return (
		<>
			<div className={`w-full relative overflow-hidden bg-violet h-200 -sm:h-auto flex flex-col ${titlePosition === 'bottom' ? 'justify-end' : titlePosition === 'middle' ? 'justify-center' : 'justify-start'}`} style={{ minHeight: 600 }}>
				<div className={`container relative z-10 h-full pt-24 -xl:px-5 -xl:flex-sc -xl:col -xl:max-w-lg -xl:items-start -xl:pt-0 ${titlePosition !== 'middle' && titlePosition !== 'bottom' ? 'mt-16' : ''}`}>
					<h1 className="uppercase font-bold text-white text-7.5xl xl:max-w-lg -xl:text-5.5xl font-secondary text-center">{title}</h1>
					<Link href={cta_text.href}><button className={`px-20 py-3 -xl:px-5 mt-12 text-xl -xl:text-base text-white rounded-full bg-pink ${titlePosition !== 'bottom' ? '' : 'mb-16'}`}>{cta_text.text}</button></Link>
				</div>
				{image ? (
					<img src={image} alt="background" className="absolute top-0 left-0 w-full h-full object-cover" />
				) : (
					<img src="https://hlynurh.sg-host.com/wp-content/uploads/2021/10/HalloweenPackagingShot800pxCOMPRESSED.jpg" alt="background" className="absolute top-0 left-0 w-full h-full object-cover" />
				)}
			</div>
			<Banner background={banner.color || '#FF5897'} text={banner.text} lottie={heartAnimation} />
		</>
	);
};

export default HeroImage;