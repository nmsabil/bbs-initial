import { getRelatedProducts } from '@core/utils/shop';
import React, { useEffect, useState } from 'react';
import Link from '@components/_shared/Link';

import SwiperComp from '@components/_shared/SwiperComp';
import {  SwiperSlide } from 'swiper/react';

interface Props {
	product: any
}

const OtherProductsNew = ({ product }: Props): JSX.Element => {
	const [otherProducts, setOtherProducts] = useState([]);

	useEffect(() => {
		(async () => {
			const related_ids = product.related_ids;
			const related_product = product.acf.related_product;

			if(related_product && related_product.includes(',')){
				const relatedProducts = await getRelatedProducts(related_product);

				setOtherProducts(relatedProducts.data.products);
			} else if(related_ids.length > 0){
				const ids = related_ids.join();
				const relatedProducts = await getRelatedProducts(ids);

				setOtherProducts(relatedProducts.data.products);
			}
		})();
	}, []);

	return (
		<div className="w-full mt-20 pb-12">
			<p className="text-2xl font-secondary mb-4">YOU MAY ALSO LIKE...</p>
			<div className="w-full">
				<CarouselProductsNew data={otherProducts} />
			</div>
		</div>
	);
};

const CarouselProductsNew = ({ data }: { data: any }) => {
	return (
		<div className="w-full overflow-hidden">
			<div className="w-full h-26rem -md:h-76">
				<SwiperComp
					type={'small'}
					className="swiper-small w-full my-5 py-4 focus:outline-none !z-0">
					{data?.map((item, index) => (
						<SwiperSlide key={index} style={{maxWidth: '16rem'}}>
							<Link href={'/shop/' + item.slug} className="w-64 -md:w-40 mr-4 swiper-slide swiper-slide-small product" key={index}>
								<div className="overflow-hidden relative" style={{paddingBottom: '100%'}}>
									{item.images?.length && item.acf.tag_title != '' ?
										<>
											<img src={item.images[0] && item.images[0].src} alt="happy bday" className="w-full h-full object-cover absolute" />
											<span className="triangle"><span></span></span>
											<span className="vegan-text">{item.acf.tag_title}</span>
										</>
										:	(item.images[0] ? <img className="object-cover object-center h-full w-full absolute" src={item.images[0].src} alt="preview" /> : <div className="bg-gray w-full h-full absolute"></div>)}
								</div>
								<div className="flex-cc col mt-3" >
									<h3 className="text-xl -md:text-base font-bold text-center" >{item.name}</h3>
									<h4 className="text-center text-lg -md:text-base">
										<span className={item.sale_price ? 'line-through' : ''}>
											{item.type == 'variable' && item.variations.filter(x => x.price != item.price).length > 0 && <span>From </span>}
											£{item?.price}
										</span>
										{item.sale_price && <span className="ml-4 text-pink">£{item.sale_price}</span>}
									</h4>
								</div>
							</Link>
						</SwiperSlide>
					))}
				</SwiperComp>

				<style dangerouslySetInnerHTML={{
					__html: `
						.triangle:after {
							content: '';
							width: 0;
							height: 0;
							border-style: solid;
							border-width: 0 90px 90px 0;
							border-color: transparent #BDF2CA transparent transparent;
							right: 0;
							top: 0;
							position: absolute;
						}
						.vegan-text {
							position: absolute;
							top: -13px;
    					right: -7px;
							transform: rotate(45deg);
							font-size: 0.75rem;
							margin-top: 1.6rem;
							margin-right: 0.3rem;
							font-weight: 600;
							max-width: 60px;
    				text-align: center;
						}
						@media (max-width: 640px) {
							.triangle:after {
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
							}
						}
				`}} />
			</div>
		</div>
	);
};

export default OtherProductsNew;
