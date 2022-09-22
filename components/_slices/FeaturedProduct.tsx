import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import Link from '@components/_shared/Link';
import nomNom from '@public/lottie/nom-nom.json';
import RenderLottie from '@components/RenderLottie';

interface Props {
	slice: SliceType
}

const FeaturedProduct = ({ slice }: Props): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:py-12 relative" style={{zIndex: 2}}>
				<div className="container flex-cc flex-col w-full -lg:px-5">
					<h2 className="text-7xl -lg:text-4xl text-center font-bold font-secondary max-w-2xl">{RichText.asText(slice.primary.title)}</h2>
					<p className="text-2xl -lg:text-base mt-4 text-center font-light">{RichText.asText(slice.primary.description)}</p>
					<div className="mt-8 w-full flex-cc relative">
						{ (slice.primary.cta_text && slice.primary.cta_url) ? (
							<Link href={slice.primary.cta_url} className="w-full">
								<div className="h-192 -lg:h-130 -md:h-80 w-full max-w-7xl flex-cc m-auto">
									<img src={slice.primary.image.url} alt="featured product" className="h-full -lg:w-full -lg:object-cover" />
								</div>
							</Link>
						) : (
							<div className="h-192 -lg:h-130 -md:h-80 w-full max-w-7xl flex-cc m-auto">
								<img src={slice.primary.image.url} alt="featured product" className="h-full -lg:w-full -lg:object-cover" />
							</div>
						) }
						<div className="absolute nom-nom transform -sm:scale-50 pointer-events-none">
							<RenderLottie data={nomNom} />
						</div>
					</div>
					<Link className={slice.primary.cta_text && slice.primary.cta_url ? 'visible mt-12 mb-6' : 'hidden'} href={slice.primary.cta_url}>
						<button className="bg-pink text-white py-3 rounded-full lg:text-xl -lg:w-auto -lg:px-10 w-60">{RichText.asText(slice.primary.cta_text)}</button>
					</Link>
				</div>
				<style jsx global>{`
					.nom-nom{
						max-width: 500px;
						left:-10rem;
						bottom:-15rem;
					}
					@media (max-width: 1278px) {
						.nom-nom {
							left: -2rem;
						}
					}
					@media (max-width: 1023px) {
						.nom-nom {
							// max-width: 400px;
					    left: unset!important;
					    right: -5rem;
					    bottom: -13rem;
						}
					}
					@media (max-width: 767px) {
						.nom-nom {
							max-width: 400px;
					    left: unset!important;
					    right: -5rem;
					    bottom: -13rem;
						}
					}
				`}</style>
			</section>
		</>
	);
};

export default FeaturedProduct;
