import React from 'react';
import Link from '@components/_shared/Link';
import RenderLottie from '@components/RenderLottie';
import nomNom from '@public/lottie/nom-nom.json';
import sanitizer from '@core/utils/sanitizer';

interface FeaturedProductProps {
	title: string;
	text: string;
	cta_text: {
		text: string;
		href: string;
	}
}

const FeaturedProduct = ({ title, text, cta_text }: FeaturedProductProps): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:py-12">
				<div className="container flex-cc flex-col w-full -lg:px-5">
					<h2 className="text-7xl -lg:text-4xl text-center font-bold font-secondary max-w-2xl">{sanitizer(title)}</h2>
					<p className="text-2xl -lg:text-base mt-4 text-center">{text}</p>
					<div className="mt-8 w-full flex-cc relative">
						<div className="h-192 -lg:h-80 bg-pastel-blue w-full max-w-7xl flex-cc">
							<img src="/images/happy-bday.png" alt="featured product" className="h-full -lg:w-full -lg:object-cover" />
						</div>
						<div className="absolute nom-nom transform -sm:scale-50 pointer-events-none">
							<RenderLottie data={nomNom} />
						</div>
					</div>
					<Link className="mt-12" href={cta_text.href || '/shop'}><button className="bg-pink text-white py-3 rounded-full lg:text-xl -lg:w-auto -lg:px-10 w-60">{cta_text.text}</button></Link>
				</div>
				<style jsx global>{`
					.nom-nom{
						max-width: 500px;
						left:-10rem;
						bottom:-15rem;
					}
				`}</style>
			</section>
		</>
	);
};

export default FeaturedProduct;
