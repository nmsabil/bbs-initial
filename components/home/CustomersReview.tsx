import React from 'react';
import { AiFillStar } from 'react-icons/ai';

interface Props {
	data: Array<{
		review: string;
		description: string;
		name: string;
		score: number;
	}>
}

const CustomersReview = ({ data }: Props): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:py-12 bg-light-gray">
				<div className="container flex-cc flex-col w-full -lg:px-5">
					<ul className="w-full flex-bc gap-x-14 -lg:flex-col">
						{data.map((item, index) => (
							<li className={`text-center ${ index === data.length - 1 ? '' : '-lg:mb-7' }`} key={index}>
								<h4 className="lg:text-4.5xl font-medium">{ item.review }</h4>
								<h5 className="lg:text-2xl font-light mt-7 -lg:mt-1">{ item.description }</h5>
								<div className="text-2xl font-light mt-3 text-pink -lg:text-lg">{ item.name }</div>
								<div className="flex-cc mt-5 -lg:mt-2">
									{[...Array(item.score)].map((_, i) => (
										<AiFillStar key={i} className="text-semilight-pink text-4xl -lg:text-xl mx-2 -lg:mx-1"/>
									))}
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	);
};

// const data = [
// 	{
// 		review: 'Never going anywhere ever again!',
// 		description: 'A stunning job and absolutely delicious!',
// 		name: 'Forename or company',
// 		score: 5
// 	},
// 	{
// 		review: 'Never going anywhere ever again!',
// 		description: 'A stunning job and absolutely delicious!',
// 		name: 'Forename or company',
// 		score: 5
// 	},
// 	{
// 		review: 'Never going anywhere ever again!',
// 		description: 'A stunning job and absolutely delicious!',
// 		name: 'Forename or company',
// 		score: 5
// 	}
// ];

export default CustomersReview;
