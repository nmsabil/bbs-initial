import React, { useState, useEffect } from 'react';
import { RichText } from 'prismic-reactjs';
import RenderLottie from '@components/RenderLottie';
import Link from '@components/_shared/Link';
import { SliceType } from '@core/prismic/client';
import yumYum from '../../public/lottie/yum-yum.json';
import axios from 'axios';

import SwiperComp from '@components/_shared/SwiperComp';
import {  SwiperSlide } from 'swiper/react';

interface Props {
	slice: SliceType
}

const ProductCarousel = ({ slice }: Props) => {
	const [products, setProducts] = useState([]);


	useEffect(() => {
		(async () => {
			if(slice.items.length > 0){
				// const arrayOfIds = slice.items.map(item => {
				// 	return item.product_id;
				// })
				// const ids = arrayOfIds.join(',');
				// Lets use slugs instead
				const arrayOfSlugs = slice.items.map(item => {
					return item.slug;
				});
				const slugs = arrayOfSlugs.join(',');

				// const response = await axios.get('api/products?ids=' + ids);
				const response = await axios.get('api/products-by-slugs?slugs=' + slugs);
				if (response.data?.data) response.data.data = response.data.data.filter(x => x != null);
				const _products = response.data?.data ? response.data.data.reduce((obj, item) => Object.assign(obj, { [item.slug]: item }), {}) : [];
				setProducts(_products);
			}
		})();
	}, []);

	return (
		<>
			<section className="w-full pt-16 pb-48 -lg:pt-2 -lg:pb-20 relative overflow-hidden" style={{ background: '#ffffff' }}>
				<div className="absolute w-80 h-80 -lg:w-56 -lg:h-56 z-10 right-0 top-0 -md:hidden">
					<RenderLottie data={yumYum} />
				</div>
				<div className="container flex-cc flex-col w-full relative -lg:px-5" style={{zIndex:11}}>
					<h2 className="text-7xl -lg:text-4xl text-center font-bold font-secondary max-w-2xl">{RichText.asText(slice.primary.title)}</h2>
					<p className="text-2xl -lg:text-base mt-4 mb-5 font-light">{RichText.asText(slice.primary.subtitle)}</p>
					<SwiperComp className={'outline-none mt-8 pb-6 lg:h-120'}>
						{/*products.length === 0 && (
							<>
							{[...Array(4)].map((item, index) => (
									<div key={index} className="mr-6 swiper-slide">
										<div className="h-144 w-144 -lg:h-60 -lg:w-60 bg-gray-100 relative" style={{ background: '#eeeeee' }}></div>
									</div>
								))}
							</>
						)*/}
						{slice.items?.map((item, index) => {
							return (
								<SwiperSlide key={index} style={{maxWidth: '24rem'}}>
									<Link className="" href={'/shop/' + item.slug} key={index}>
										<div key={index} className="mr-6 cursor-pointer">
											<div>
												<div className="h-96 w-96 -lg:h-60 -lg:w-60 bg-gray-100 relative" style={{paddingBottom: '100%'}}>
													{item.product_image?.url ? (<img src={item.product_image.url} alt={item.label} className="w-full h-full object-cover" />)
														: (products[item.slug]?.images?.length ? (
															<img src={products[item.slug].images[0].src} alt={item.label} className="w-full h-full object-cover absolute" />
														) : <img src="/images/no-image.jpg" alt={item.label} className="w-full h-full object-cover absolute" />)
													}
													{products[item.slug]?.acf && products[item.slug]?.acf?.tag_title != '' &&
														<>
															<span className="triangle-vegan"></span>
															<span className="vegan-text">{products[item.slug]?.acf?.tag_title}</span>
														</>
													}
												</div>
												<div className="mt-6 text-xl text-center" style={{ maxWidth: '36rem' }}>
													<h3 className="font-bold">{ (item.product_title[0] && item.product_title[0].text) ? item.product_title[0].text : products[item.slug]?.name}</h3>
													{ item.product_price && <h4>£{item.product_price}</h4>}
													{ (!item.product_price && products[item.slug]?.price) && <h4>£{products[item.slug]?.price}</h4>}
												</div>
											</div>
										</div>
									</Link>
								</SwiperSlide>
							);
						})}
					</SwiperComp>
					<style
						dangerouslySetInnerHTML={{
							__html: `
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

							.triangle-vegan:after {
								content: '';
								width: 0;
								height: 0;
								border-style: solid;
								border-width: 0 150px 150px 0;
								border-color: transparent #BDF2CA transparent transparent;
								right: 0;
								top: 0;
								position: absolute;
							}
							.vegan-text {
								text-align: center;
								position: absolute;
								top: -21px;
	    					right: 2px;
								max-width: 83px;
								transform: rotate(45deg);
								font-size: 1.25rem;
								margin-top: 2.5rem;
								margin-right: 0.3rem;
								font-weight: 600;
							}
							@media (max-width: 1028px) {
								.triangle-vegan:after {
									content: '';
									width: 0;
									height: 0;
									border-style: solid;
									border-width: 0 70px 70px 0;
									border-color: transparent #BDF2CA transparent transparent;
									right: 0;
									top: 0;
									position: absolute;
								}
								.vegan-text {
									font-size: 0.6rem;
									margin-top: 1.3rem;
									max-width: 42px;
									top: -11px;
									right: -6px;
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
