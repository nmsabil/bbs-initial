import React, { useState, useEffect } from 'react';
import { RichText } from 'prismic-reactjs';
import Link from '@components/_shared/Link';
import { SliceType } from '@core/prismic/client';
import axios from 'axios';

import SwiperComp from '@components/_shared/SwiperComp';
import {  SwiperSlide } from 'swiper/react';

interface Props {
	slice: SliceType
}

const CategoryCarousel = ({ slice }: Props) => {
	const [categories, setCategories] = useState({});

	useEffect(() => {
		(async () => {
			if(slice.items.length > 0){
				const arrayOfSlugs = slice.items.map(item => {
					return item.category_slug;
				});
				const slugs = arrayOfSlugs.join(',');

				const response = await axios.get('api/categories?slugs=' + slugs);
				if (response.data?.data) response.data.data = response.data.data.filter(x => x != null);
				const _categories = response.data?.data ? response.data.data.reduce((obj, item) => Object.assign(obj, { [item.slug]: item }), {}) : [];
				setCategories(_categories);
			}
		})();
	}, []);

	return (
		<>
			<section className="w-full pt-20 pb-28 -lg:py-12 relative overflow-hidden" style={{ background: '#ffe2ee' }}>
				<div className="container flex-cc flex-col w-full relative -lg:px-5">
					<h2 className="text-7xl -lg:text-4xl text-center font-bold font-secondary max-w-2xl">{RichText.asText(slice.primary.title)}</h2>
					<p className="text-2xl -lg:text-base mt-4 mb-5 font-light text-center">{RichText.asText(slice.primary.description)}</p>
					<SwiperComp className={'outline-none mt-8 pb-6 lg:h-120'}>
						{/*Object.keys(categories).length === 0 && (
							<>
							{[...Array(4)].map((item, index) => (
									<div key={index} className="mr-6">
										<div className="h-144 w-144 -lg:h-60 -lg:w-60 bg-gray-100 relative" style={{ background: '#eeeeee' }}></div>
									</div>
								))}
							</>
						)*/}
						{slice.items?.map((item, index) => {
							return (
								<SwiperSlide key={index} className="mr-6 swiper-slide" style={{maxWidth: '24rem'}}>
									<Link href={'/shop?categories=' + item.category_slug}>
										<div className="h-100 w-96 -lg:h-60 -lg:w-60 bg-gray-100 relative" style={{paddingBottom: '100%'}}>
											{slice.items[index].category_image ? (
												<img src={slice.items[index].category_image.url} alt="happy bday" className="w-full h-full object-cover absolute" />
											) : <img src="/images/no-image.jpg" alt="happy bday" className="w-full h-full object-cover absolute" />}
										</div>
										<div className="mt-6 text-xl text-center">
											{slice.items[index].title?.length ? (
												<h3 className="font-bold">{RichText.asText(slice.items[index].title)}</h3>
											) : (
												<h3 className="font-bold">{categories[item.category_slug]?.name}</h3>
											)
											}
											<p className="">{RichText.asText(slice.items[index].subtitle)}</p>
										</div>
									</Link>
								</SwiperSlide>
							);
						})}
					</SwiperComp>
					{slice.primary.cta_text && <Link className="z-10 mt-20" href={slice.primary.cta_url}><button className="bg-pink text-white py-3 rounded-full lg:text-xl -lg:w-auto -lg:px-10 w-60">{RichText.asText(slice.primary.cta_text)}</button></Link>}
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
                        `,
						}}
					/>
				</div>
			</section>
		</>
	);
};

export default CategoryCarousel;
