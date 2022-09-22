import React from 'react';
import { SliceType } from '@core/prismic/client';

interface Props {
	slice: SliceType
}

/**
 * Grid image list (no text) with dynamic number of grid
 */

const Image = ({ slice }: Props) => {
	const images = slice.items;
	const maxColoumn = slice.primary.grid;

	return (
		<section className="w-full -md:px-5">
			<div className="container md:px-12">
				<div className={`grid grid-cols-${maxColoumn} gap-2 -md:gap-3 -md:grid-cols-2`}>
					{images.map((item,i) => (
						<div key={i} className="">
							<img src={item.image.url} alt="Custom cake" className="md:mt-6 mx-auto bg-cover bg-center"/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Image;
