import React, { useEffect, useState } from 'react';
import MainCarousel from './MainCarousel';
import NavCarousel from './NavCarousel';

interface CarouselPhotoProps {
	images: any
}

const CarouselPhoto = ({ images }: CarouselPhotoProps) => {

	const [FlktyMain, setFlktyMain] = useState(null);
	const [FlktyNav, setFlktyNav] = useState(null);

	useEffect(() => {
		if (FlktyMain !== null) {
			FlktyMain.on('change', (i: number) => {
				FlktyNav.select(i);
			});
		}

	}, [FlktyMain]);

	return (
		<>
			<MainCarousel images={images} setFlktyMain={setFlktyMain} />
			<div className="mt-3 hidden lg:block">
				<NavCarousel
					images={images}
					FlktyMain={FlktyMain}
					setFlktyNav={setFlktyNav}
				/>
			</div>
		</>
	);
};

export default CarouselPhoto;