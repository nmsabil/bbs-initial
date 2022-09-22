import React from 'react';
import Blog from './Blog';
import { BlogType } from './BlogType';

import SwiperComp from '@components/_shared/SwiperComp';
import {  SwiperSlide } from 'swiper/react';

const Blogs = ({ blogs }: { blogs: BlogType[] }) => {
	return (
		<>
			<SwiperComp
				type={'small'}
				className="swiper-small my-5 py-4 focus:outline-none">
				{blogs?.map((blog: BlogType, index: number) => (
					<SwiperSlide style={{maxWidth: '16rem'}} key={blog.slug}>
						<Blog className={'swiper-slide swiper-slide-small'} key={index} data={blog} />
					</SwiperSlide>
				))}
			</SwiperComp>
			<style
				dangerouslySetInnerHTML={{
					__html: `
							// .custom-scrollbar::-webkit-scrollbar-track {
							// 	background: #e5e5e5;
							// 	width:90px !important;
							// }
							// .custom-scrollbar::-webkit-scrollbar {
							// 	height: 6px;
							// }
							// .custom-scrollbar::-webkit-scrollbar-thumb {
							// 	background: #FF5897;
							// 	border-radius: 5px;
							// }
							// .custom-scrollbar::-webkit-scrollbar-track-piece{
							// 	width:80%;
							// 	display:none;
							// }
              		`,
				}}
			/>
		</>
	);

};

export default Blogs;
