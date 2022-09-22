import React, { useState, useEffect } from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import axios from 'axios';

interface Props {
	slice: SliceType
}

const InstagramGallery = ({ slice }: Props): JSX.Element => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await axios.get('/api/instagram');
			if(res.data.data){
				const instagramImages = res.data.data.slice(0, 12);
				setImages(instagramImages);
			}
		})();
	}, []);

	return (
		<>
			<section className="w-full py-28 -lg:py-12">
				<a href={slice.primary.link?.link_type == 'Web' ? slice.primary.link.url : ''} target={slice.primary.link?.target} className="container flex-cc flex-col w-full">
					<h2 className="text-7xl -lg:text-5xl font-bold font-secondary text-center -md:max-w-xs">{RichText.asText(slice.primary.title)}</h2>
					<p className="font-light text-2xl -lg:text-base  mt-4 text-center -md:max-w-xs">{RichText.asText(slice.primary.description)}</p>
					{images.length === 0 && <p className="font-light text-2xl -lg:text-base mt-8 text-center hidden">No Post Yet</p>}
					<ul className="instagram-grid grid grid-cols-6 w-full mt-8 text-center -lg:hidden">
						{images?.map((item, index) => (
							<li key={index} className="relative" style={{paddingBottom:'100%'}}>
								<img src={item.imageUrl} alt="instagram post" className="h-full w-full object-cover absolute" />
							</li>
						))}
					</ul>
					<ul className="instagram-grid grid grid-cols-2 w-full mt-8 text-center lg:hidden">
						{images?.slice(0, 4).map((item, index) => (
							<li key={index} className="relative" style={{paddingBottom:'100%'}}>
								<img src={item.imageUrl} alt="instagram post" className="h-full w-full object-cover absolute" />
							</li>
						))}
					</ul>
				</a>
				<style jsx>{`
					.instagram-grid li{
						// height:187px;
					}

					@media (min-width: 1024px){
						.instagram-grid li{
							// height:266px;
						}
					}
				`}</style>
			</section>
		</>
	);
};

export default InstagramGallery;
