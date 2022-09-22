import React, { useEffect} from 'react';
import $ from 'jquery';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

interface Props {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	type?: string
}

const Slider = ({ children, style, className, type='large' }: Props): JSX.Element => {

	useEffect(() => {

		const $swiperSelector = $('.swiper-container');

		$swiperSelector.each(function(index) {
			const $this = $(this);
			$this.addClass('swiper-slider-' + index);


			// const swiper = new Swiper('.swiper-slider-' + index, {
			// 	slidesPerView: 'auto',
			// 	loop: false,
			// 	spaceBetween: 20,
			// 	// loopFillGroupWithBlank: false,
			// 	// slidesOffsetAfter:0,
			// 	// freeMode: true,
			// 	// centeredSlidesBounds: false,
			// 	breakpoints: {
			// 		1023: {
			// 			slidesPerView: (type == 'small') ? 'auto' : 2,
			// 			spaceBetween: 20,
			// 		}
			// 	},
			// 	scrollbar: {
			// 		el: '.swiper-scrollbar',
			// 		draggable: true,
			// 		// dragSize: dragSize
			// 	}
			// });
		});


	});

	return (
		<>
			<div className={'slider container relative'}>
				<div className={`swiper-container swiper-container-horizontal ${className}`}>
					<div className="swiper-wrapper">
						{children}
					</div>

					<div className="swiper-pagination"></div>

					<div className={`swiper-scrollbar swiper-scrollbar-${type}`} style={{display:'block!important'}}></div>

				</div>
			</div>
			<style jsx>{`
			`}</style>
		</>
	);
};

export default Slider;
