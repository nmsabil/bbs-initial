import React from 'react';
import { RichText } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';
import heartAnimation from '../../public/lottie/yellow-heart.json';
import RenderLottie from '@components/RenderLottie';

interface Props {
	slice: SliceType
}

const ColoredBanner = ({ slice }: Props) => {

	const getHeight = () => {
		const height = slice.primary.reduced_height ? 'h-32': 'h-48';
		return height;
	};
	const getGifTop = () => {
		const height = slice.primary.reduced_height ? '-top-44 -lg:-top-36': '-top-36 -xl:-top-36';
		return height;
	};


	return (
		<div className={'w-full bg-pink -lg:h-36 flex-cc -lg:px-5 relative -lg:pt-12 -lg:pb-8 ' + getHeight()} style={{ backgroundColor: slice.primary.background_color }}>
			{slice.primary.gif.url ? (
				<div className="absolute w-40 h-40 -lg:w-32 -lg:h-32 -top-20 -lg:-top-24 -lg:pt-12 ">
					<img src={slice.primary.gif.url} alt="animation" />
				</div>
			) : (
				<div className={'absolute w-80 h-80 -lg:w-48 -lg:h-48 -lg:pt-12 ' + getGifTop()}>
					<RenderLottie data={heartAnimation} />
				</div>
			)}
			<h3 className="relative text-center text-white text-4.5xl -lg:text-2xl -md:text-xl font-bold font-secondary px-32 -md:px-5">{RichText.asText(slice.primary.title)}</h3>
		</div>
	);
};

export default ColoredBanner;
