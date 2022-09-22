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
		<Link href={link || '/'}>
			<a>
				<div className="w-64 h-64 overflow-hidden relative" style={{paddingBottom: '100%'}}>
					<img className="object-cover object-center h-full w-full absolute" src={thumbnail} alt={title} />
				</div>
				<div className="flex-cc col mt-3" >
					<h3 className="font-medium text-center" >{title}</h3>
					<h4 className="text-center" >{format(new Date(date), 'dd/MM/yy')}</h4>
				</div>
			</a>
		</Link>
	);
};

export default CarouselContent;
