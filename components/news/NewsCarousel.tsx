import React from 'react';
import Flickity from 'react-flickity-component';
import CarouselContent from './CarouselContent';

interface NewsCarouselProps {
	carousel: any
}

const NewsCarousel = ({carousel}: {carousel: NewsCarouselProps[]}): JSX.Element => {
	return (
		<>
			<Flickity
				className="custom-scrollbar w-full overflow-x-auto my-5 py-4 px-5 focus:outline-none"
				options={{
					freeScroll: false,
					contain: true,
					prevNextButtons: false,
					pageDots: false,
					cellAlign: 'left'
				}}>
				{carousel?.map((content: any, index: number) => (
					<CarouselContent key={index} title={content.title.rendered} date={content.date} link={content.slug} thumbnail={content._embedded['wp:featuredmedia'][0].source_url} />
				))}
			</Flickity>
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

export default NewsCarousel;
