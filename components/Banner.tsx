import sanitizer from '@core/utils/sanitizer';
import React from 'react';
import RenderLottie from './RenderLottie';

interface BannerProps {
	background: string
	text: string
	height?: string
	lottie?: any
	gif?: any
}

const Banner = ({ background, text, height = '', lottie, gif }: BannerProps): JSX.Element => {

	return (
		<>
			<div className={`w-full bg-pink h-75 -lg:h-32 flex-cc -lg:px-5 relative ${height} -lg:pt-12 -lg:pb-8`} style={{ backgroundColor: background }}>
				{lottie && (
					<div className="absolute w-80 h-80 -lg:w-48 -lg:h-48 -top-36  -lg:pt-12 ">
						<RenderLottie data={lottie} />
					</div>
				)}
				{gif && (
					<div className="absolute w-80 h-80 -lg:w-48 -lg:h-48 -top-36  -lg:pt-12 ">
						<img src={gif} alt="animation" />
					</div>
				)}
				<h3 className="relative text-center text-white text-4.5xl -lg:text-2xl -md:text-xl font-bold font-secondary">{sanitizer(text)}</h3>
			</div>
		</>
	);
};

export default Banner;
