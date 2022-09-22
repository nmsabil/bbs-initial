import React from 'react';
import Link from '@components/_shared/Link';
import RenderLottie from '@components/RenderLottie';
import sanitizer from '@core/utils/sanitizer';

interface CategoriesSliderProps {
	title: string;
	text: string;
	cta_text?: {
		text: string;
		href: string;
	}
	background?: string;
	categories: any;
	lottie?: any;
}

const CategoriesSlider = ({ title, text, cta_text, background, categories, lottie }: CategoriesSliderProps): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:py-12 relative overflow-hidden" style={{ background: background || '#ffffff' }}>
				{lottie && (
					<div className="absolute w-96 h-96 z-10 right-0 top-0 -sm:hidden">
						<RenderLottie data={lottie} />
					</div>
				)}
				<div className="container flex-cc flex-col w-full relative -lg:px-5">
					<h2 className="text-7xl -lg:text-4xl text-center font-bold font-secondary max-w-2xl">{sanitizer(title)}</h2>
					<p className="text-2xl -lg:text-base mt-4">{text}</p>
					<ul className="flex gap-4 mt-8 text-center overflow-x-auto pb-12 w-full mr-auto">
						{categories?.map((item, index) => (
							<Link href={'/shop?categories=' + item.slug} key={index}>
								<div className="h-160 w-160 -lg:h-60 -lg:w-60 bg-gray-100 relative">
									{item.image && <img src={item.image.src} alt={item.name} className="w-full h-full object-cover" />}
								</div>
								<div className="mt-6 text-xl">
									<h3 className="font-bold">{item.name}</h3>
									<h4>{item.description}</h4>
								</div>
							</Link>
						))}
					</ul>
					{cta_text && <Link className="mt-12" href={cta_text.href || '/shop'}><button className="bg-pink text-white py-3 rounded-full lg:text-xl -lg:w-auto -lg:px-10 w-60">{cta_text.text}</button></Link>}
					<style
						dangerouslySetInnerHTML={{
							__html: `
							ul::-webkit-scrollbar-track {
								background: #e5e5e5;
								width:90px !important;
							}
							ul::-webkit-scrollbar {
								height: 6px;
							}
							ul::-webkit-scrollbar-thumb {
								background: #FF5897;
								border-radius: 5px;
							}
							ul::-webkit-scrollbar-track-piece{
								width:80%;
								display:none;
							}
							.triangle .triangle-top-right {
								border-top: 100px solid;
								border-left: 100px solid transparent;
							}
							.triangle span{
								position: absolute;
								transform: rotate(45deg);
								color: black;
								width: 100%;
								top: 30px;
								left: 14px;
								font-size: 12px;
							}
							@media(min-width:280px){
								.triangle .triangle-top-right {
									border-top: 200px solid;
									border-left: 200px solid transparent;
								}
								.triangle span{
									top: 60px;
									left: 24px;
									font-size: 20px;
								}
							}
                        `,
						}}
					/>
				</div>
			</section>
		</>
	);
};

export default CategoriesSlider;
