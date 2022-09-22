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
	image?: string
}

const Hero = ({ title, cta_text, banner, image }: Props): JSX.Element => {

	return (
		<>
			<div className="w-full overflow-hidden relative bg-violet h-160 -sm:h-auto">
				<div className="container relative h-full pt-24 -xl:px-5 -xl:pt-12 -xl:flex-sc -xl:col -xl:max-w-lg z-10" style={{maxWidth: 1200}}>
					<h1 className="uppercase font-bold text-white text-7.5xl xl:max-w-lg -xl:text-5.5xl -xl:text-center font-secondary -lg:w-130">{title}</h1>
					{cta_text.href && cta_text.href !== '' && (
						<Link href={cta_text.href}><button className="px-20 py-3 mt-12 text-xl text-white rounded-full bg-pink">{cta_text.text}</button></Link>
					)}
				</div>
				<img src={image} alt="background" className="absolute -sm:relative bottom-0 object-cover h-full right-0 left-0 w-full"/>
			</div>
			<Banner background={banner.color || '#FF5897'} text={banner.text} lottie={heartAnimation} />
		</>
	);
};

export default Hero;