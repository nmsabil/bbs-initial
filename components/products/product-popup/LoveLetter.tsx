import RenderLottie from '@components/RenderLottie';
import React from 'react';
import lottieData from '@public/lottie/yellow-heart.json';

const LoveLetter = ({ product }: any): JSX.Element => {
	return (
		<div className="relative w-full px-8 -md:px-4 pt-20 -md:pt-14 pb-16 -md:pb-8 bg-dark-violet mt-36 font-light">
			<div className="absolute inset-0 flex-cs full">
				<div className="relative w-64 -md:w-52 h-64 -md:h-52 -top-32 -md:-top-24">
					<RenderLottie data={lottieData} />
				</div>
			</div>
			<p className="mb-8 -md:mb-4 text-4xl -md:text-xl font-bold text-center text-white uppercase font-secondary">{product.acf.message ? product.acf.message.title : 'OUR HAPPINESS PROMISE'}</p>
			<p className="text-lg -md:text-base text-center text-white">{product.acf.message ? product.acf.message.description : 'If you are unhappy hilosophical, and economic system. This is thanks to the combination of the technics to the monetary uechnics to the monetary unit, which goes by the ticker symbol BTC. Launched anonym'}</p>
		</div>
	);
};

export default LoveLetter;
