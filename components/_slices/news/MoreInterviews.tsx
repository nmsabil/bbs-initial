import React from 'react';
import { SliceType } from '@core/prismic/client';
import CarouselContent from './CarouselContent';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useRouter } from 'next/router';

import SwiperComp from '@components/_shared/SwiperComp';
import {  SwiperSlide } from 'swiper/react';

interface Props {
	slice: SliceType;
}

const MoreInterviews = ({slice}:Props): JSX.Element => {
	const router = useRouter();
	const path = router.asPath?.split('/')
	const uid = path ? path[path.length-1] : '';

	const carousel = slice.items;
	const filteredCarousel = carousel.filter((item) => {
		return item.type === 'blog' && item.uid != uid;
	});
	return (
		<>
			<div className="max-w-5xl mx-auto w-full md:pl-10 mt-16 pb-16 pl-4">
				<div className="flex-bc md:px-0 px-5">
					<span className="hidden flex items-center text-medium-gray hover:text-pink"><BsChevronLeft className="mr-2" />Previous</span>
					<h3 className="md:text-2xl text-xl text-center font-secondary m-auto"><span className="text-pink">MORE</span><br/>ARTICLES</h3>
					<span className="hidden flex items-center text-medium-gray hover:text-pink">Next<BsChevronRight className="ml-2" /></span>
				</div>
				<SwiperComp
					className="custom-scrollbar swiper-small w-full overflow-x-auto my-5 py-4 px-5 focus:outline-none">
					{filteredCarousel?.map((content: any, index: number) => (
						<SwiperSlide className="w-64 mr-4" style={{maxWidth: '16rem'}} key={index}>
							<CarouselContent key={'cc-' + index} title={content.html_title} date={content.date_created} link={content.route} thumbnail={content.thumbnail.url} />
						</SwiperSlide>
					))}
				</SwiperComp>
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
							.custom-scrollbar::-webkit-scrollbar-track {
								background: #e5e5e5;
								width:90px !important;
							}
							.custom-scrollbar::-webkit-scrollbar {
								height: 6px;
							}
							.custom-scrollbar::-webkit-scrollbar-thumb {
								background: #FF5897;
								border-radius: 5px;
							}
							.custom-scrollbar::-webkit-scrollbar-track-piece{
								width:80%;
								display:none;
							}
              		`,
				}}
			/>
		</>
	);
};

export default MoreInterviews;
