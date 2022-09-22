import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

interface CarouselContentProps {
	title: string,
	date: string,
	link: string,
	thumbnail: string
}

const CarouselContent = ({title, date, link, thumbnail}: CarouselContentProps): JSX.Element => {
	return (
		<div className="w-64 mr-4" >
			<div className="w-64 h-64 overflow-hidden">
				<img className="object-cover object-center h-full w-full" src={thumbnail} alt={title} />
			</div>
			<div className="flex-cc col mt-3" >
				<Link href={`/news/${link}`}>
					<a>
						<h3 className="font-medium text-center" >{title}</h3>
					</a>
				</Link>
				<h4 className="text-center" >{format(new Date(date), 'd MMMM yyyy')}</h4>
			</div>
		</div>
	);
};

export default CarouselContent;
