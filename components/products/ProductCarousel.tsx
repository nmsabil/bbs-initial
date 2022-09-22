import React from 'react';
import Link from '@components/_shared/Link';
import RenderLottie from '@components/RenderLottie';
import sanitizer from '@core/utils/sanitizer';
import Flickity from 'react-flickity-component';

interface ProductsSliderProps {
	title: string;
	text: string;
	cta_text?: {
		text: string;
		href: string;
	}
	background?: string;
	lottie?: any;
	items: any
}

const ProductCarousel = ({ title, text, cta_text, background, lottie, items }: ProductsSliderProps): JSX.Element => {
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
					<Flickity className={'carousel w-full overflow-x-scroll outline-none mt-8 pb-6'} elementType={'div'} options={{freeScroll: false, contain: true}}>
						{items?.map((item, index) => {
							if (item?.price !== '') {
								return (
									<div key={index} className="mr-6">
										<div className="h-160 w-160 -lg:h-60 -lg:w-60 bg-gray-100 relative">
											{item.acf.tag_title && item.acf.tag_color && (
												<div className="triangle absolute right-0 top-0">
													<div className="triangle-top-right" style={{ borderTopColor: item.acf.tag_color }}>
														<span>{item.acf.tag_title}</span>
													</div>
												</div>
											)}
											{item.thumbnail ? (
												<img src={item.thumbnail} alt="happy bday" className="w-full h-full object-cover" />
											) : <img src="/images/no-image.jpg" alt="happy bday" className="w-full h-full object-cover" />}
										</div>
										<Link href={'/shop/' + item.slug}>
											<div className="mt-6 text-xl text-center">
												<h3 className="font-bold">{item.name}</h3>
												<span className={item.sale_price ? 'line-through' : ''}>
													{item.type == 'variable' && item.variations.filter(x => x.price != item.price).length > 0 && <span>From </span>}
													£{item?.price}
												</span>
												{item.sale_price && <span className="ml-4 text-pink">£{item.sale_price}</span>}
											</div>
										</Link>
									</div>
								);
							}
						})}
					</Flickity>
					{cta_text && <Link className="mt-12" href={cta_text.href || '/shop'}><button className="bg-pink text-white py-3 rounded-full lg:text-xl -lg:w-auto -lg:px-10 w-60">{cta_text.text}</button></Link>}
					<style
						dangerouslySetInnerHTML={{
							__html: `
							// .carousel::-webkit-scrollbar-track {
							// 	background: #e5e5e5;
							// 	width:90px !important;
							// }
							// .carousel::-webkit-scrollbar {
							// 	height: 6px;
							// }
							// .carousel::-webkit-scrollbar-thumb {
							// 	background: #FF5897;
							// 	border-radius: 5px;
							// }
							// .carousel::-webkit-scrollbar-track-piece{
							// 	width:80%;
							// 	display:none;
							// }
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

export default ProductCarousel;
