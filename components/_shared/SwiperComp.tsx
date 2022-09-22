import React from 'react';
import { Navigation, Pagination, Scrollbar, Keyboard, Mousewheel } from 'swiper';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Props {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	type?: string
}

const SwiperComp = ({ children, className } : Props): JSX.Element => {

	return (
		<>
			<Swiper
				className={`container relative overflow-visible ${className}`}
				modules={[Navigation, Pagination, Scrollbar, Keyboard, Mousewheel]}
				spaceBetween={10}
				slidesPerView={'auto'}
				navigation
				mousewheel={{forceToAxis: true}}
				keyboard={{ enabled: true }}
				scrollbar={{ draggable: true }}
			>
				{children}
			</Swiper>
			<style jsx>{`
			`}</style>
		</>
	);
};

export default SwiperComp;
