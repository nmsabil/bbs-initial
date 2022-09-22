import React, { useState, useEffect } from 'react';
import {  SliceType } from '@core/prismic/client';
import SwiperComp from '@components/_shared/SwiperComp';
import {  SwiperSlide } from 'swiper/react';
import axios from 'axios';
import Link from '@components/_shared/Link';
import { format } from 'date-fns';

interface Props {
	slice: SliceType
}

const RelatedRecipe = ({ slice }: Props): JSX.Element => {
	const [recipes, setRecipes] = useState([]);
	const items = slice.items;

	useEffect(() => {
		(async () => {
			const res = await axios.post('/api/recipes', {
				data: items
			}).then(res => res.data).catch(err => console.log(err));
			if(res.data){
				setRecipes(res.data);
			}
		})();
	}, []);

	return (
		<>
			<section className="mt-12 px-4 pb-10 lg:pb-5" >
				<h2 className="font-secondary text-2xl" >you may also like…</h2>
				<div className="w-full h-80 -md:h-76">
					<SwiperComp
						type={'small'}
						className="swiper-small my-5 py-4 focus:outline-none h-full">
						{recipes?.map((blog, index) => (
							<SwiperSlide style={{maxWidth: '16rem'}} key={blog.uid}>
								{Object.keys(blog).length > 0 && <Blog className={'swiper-slide swiper-slide-small'} key={index} data={blog} />}
							</SwiperSlide>
						))}
					</SwiperComp>
				</div>
			</section>
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

export default RelatedRecipe;

const Blog = (data: any): JSX.Element => {
	const className = data.className;
	const blog = data.data;
	return(
		<Link className={`${className}`} href={blog.route}>
			<div className="cursor-pointer w-64 h-64 mr-4" >
				<div className="w-64 h-64 overflow-hidden relative" style={{paddingBottom: '100%'}}>
					<img className="object-cover object-center h-full w-full absolute" src={blog.thumbnail.url} alt={blog.thumbnail.alt} />
				</div>
				<div className="flex-cc col mt-3" >
					<h3 className="font-medium text-center" >{blog.html_title}</h3>
					<h4 className="text-center" >{format(new Date(blog.date_created), 'd MMMM yyyy')}</h4>
				</div>
			</div>
		</Link>
	);
};
