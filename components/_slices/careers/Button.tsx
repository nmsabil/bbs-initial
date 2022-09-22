import React from 'react';
import { SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';

interface Props {
	slice: SliceType
}

const Button = ({ slice }: Props) => {
	return (
		<section className="w-full">
			<div className={`container w-full max-w-4xl -lg:max-w-xs -lg:px-4 text-${slice.primary.alignment}`}>
				<Link href={slice.primary.route1}>
					<button className="bg-pink text-white px-16 py-2 rounded-full mt-9 lg:text-xl">{slice.primary.label}</button>
				</Link>
			</div>
		</section>
	);
};

export default Button;
