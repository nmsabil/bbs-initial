import React, { useRef, useState } from 'react';
import useResize from 'use-resizing';
import Flickity from 'react-flickity-component';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Thumbs} from 'swiper';
import useMouse from '@react-hook/mouse-position';

interface Props {
	images: any[];
	trainview?: boolean;
	zoomable?: boolean;
}

SwiperCore.use([Navigation, Pagination, Thumbs]);

const CarouselPhoto = ({ images, trainview, zoomable }: Props): JSX.Element => {
	const screen = useResize().width;
	const [FlickerMain, setFlickerMain] = useState(0);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const zoomAreaRef = useRef(null);
	const mouse = useMouse(zoomAreaRef);
	const [hover, setHover] = useState(false);

	return (
		<div className="flex justify-start col mb-12 pointer-events-auto" style={{ width: '100%' }}>
			<div className=" w-full overflow-hidden mb-2" ref={zoomAreaRef} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
				<Swiper
					id='main'
					navigation
					spaceBetween={8}
					slidesPerView={1}
					thumbs={{ swiper: thumbsSwiper}}
					onSlideChange={(swiper) => setFlickerMain(swiper.activeIndex)}>
					{images.map((image, index) => (
						<SwiperSlide key={index} className="product -sm:!w-full -sm:!h-[350px] sm:!h-[400px] sm:w-full overflow-hidden relative" style={{paddingBottom: '100%'}}>
							<ImageView url={image.src} mouse={mouse} isZoomed={hover && zoomable} />
						</SwiperSlide>
					))}
				</Swiper>

				<div className="flex-cc mt-3 lg:hidden">
					{[...Array(images.length)].map((item, index) =>
						<div className={`w-3 h-3 mx-1 rounded-full ${FlickerMain === index ? 'bg-pink' : 'bg-gray-accent'}`} key={index}></div>
					)}
				</div>
			</div>
			{trainview &&
			<div className=" w-full overflow-hidden">
				<div className="h-28">
					<Swiper id='thumbs' className="overflow-hidden focus:outline-none" navigation spaceBetween={8} slidesPerView={3} onSwiper={setThumbsSwiper}>
						{images.map((image, index) => (
							<SwiperSlide key={index} className="!h-28 !w-28 cursor-pointer">
								<img className="object-cover full" src={image.src} alt={`Train Image-${index}`} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
			}
		</div>
	);
};

interface ImageViewProps {
	url: any;
	mouse: any;
	isZoomed: boolean;
}

const ImageView = ({ url, mouse, isZoomed }: ImageViewProps) => {
	const adaptX = -(mouse.x - mouse.elementWidth / 2) / 3;
	const adaptY = -(mouse.y - mouse.elementHeight / 2) / 3;
	return (
		<img
			className="object-cover full transition-all duration-75"
			style={{ transform: isZoomed ? `scale(1.5) translate(${adaptX}px, ${adaptY}px)` : 'scale(1) translate(0, 0)' }}
			src={url}
			alt=""
		/>
	);
};

interface TrainViewProps {
	images: any[];
	flickityRef(arg0: any): void;
	updateIndex(arg0: number): void;
}

const TrainView = ({ images, flickityRef, updateIndex }: TrainViewProps) => {
	return (
		<div className="w-11/12 overflow-hidden">
			<div className="h-28">
				<Flickity
					className="overflow-hidden focus:outline-none"
					flickityRef={flickityRef}
					options={{
						freeScroll: false,
						contain: true,
						prevNextButtons: false,
						pageDots: false,
						cellAlign: 'left'
					}}
				>
					{images.map((image, index) => {
						return (
							<div key={index} onClick={() => updateIndex(index)} className="h-28 w-28 mr-2 cursor-pointer">
								<img className="object-cover full" src={image.src} alt="" />
							</div>
						);
					})}
				</Flickity>
			</div>
		</div>
	);
};

export default CarouselPhoto;
