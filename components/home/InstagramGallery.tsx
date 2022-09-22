import React from 'react';
import Link from '@components/_shared/Link';

interface InstagramGalleryProps {
	title: string
	text: string
	cta_text?: string
	data: any
}

const InstagramGallery = ({ title, text, cta_text, data }: InstagramGalleryProps): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:py-12">
				<div className="container flex-cc flex-col w-full">
					<h2 className="text-7xl -lg:text-5xl font-bold font-secondary text-center">{title}</h2>
					<p className="text-2xl -lg:text-base  mt-4 text-center">{text}</p>
					{data.length === 0 && <p className="text-2xl -lg:text-base mt-8 text-center">No Post Yet</p>}
					<ul className="instagram-grid grid grid-cols-6 w-full mt-8 text-center -lg:hidden">
						{data?.map((item, index) => (
							<li key={index}>
								<img src={item.imageUrl} alt="instagram post" className="h-full w-full object-cover" />
							</li>
						))}
					</ul>
					<ul className="instagram-grid grid grid-cols-2 w-full mt-8 text-center lg:hidden">
						{data?.slice(0, 4).map((item, index) => (
							<li key={index}>
								<img src={item.imageUrl} alt="instagram post" className="h-full w-full object-cover" />
							</li>
						))}
					</ul>
					{cta_text && <Link className="mt-12" href="/shop"><button className="bg-pink text-white py-3 rounded-full lg:text-xl -lg:w-auto -lg:px-10 w-60">{cta_text}</button></Link>}
				</div>
				<style jsx>{`
					.instagram-grid li{
						height:187px;
					}

					@media (min-width: 1024px){
						.instagram-grid li{
							height:266px;
						}
					}
				`}</style>
			</section>
		</>
	);
};

export default InstagramGallery;
