import React, { useState, useEffect } from 'react';
import { SliceType } from '@core/prismic/client';
import MainCarousel from './MainCarousel';
import NavCarousel from './NavCarousel';

interface Props {
	slice: SliceType
}

const ImageGallery = ({ slice }: Props) => {
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
			<MainCarousel images={slice.items} setFlktyMain={setFlktyMain} />
			<div className="mt-3 hidden lg:block">
				<NavCarousel
					images={slice.items}
					FlktyMain={FlktyMain}
					setFlktyNav={setFlktyNav}
				/>
			</div>
		</>
	);
};

export default ImageGallery;
