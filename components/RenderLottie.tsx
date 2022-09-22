import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-web';

interface RenderLottieProps {
	data: any
	className?: string
	autoplay?: boolean
}

const RenderLottie = ({ data, className, autoplay = true }: RenderLottieProps) => {
	const animContainer = useRef(null);
	const [anim, setAnim] = useState(null);

	useEffect(() => {
		if (!anim) {
			setAnim(
				Lottie.loadAnimation({
					container: animContainer.current,
					renderer: 'svg',
					loop: autoplay,
					autoplay: autoplay,
					animationData: data,
				}),
			);
		}
	}, []);

	return (
		<>
			<div
				ref={animContainer}
				className={className}
			></div>
		</>
	);
};

export default RenderLottie;