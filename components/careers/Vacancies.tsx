import React from 'react';
import Link from '@components/_shared/Link';

interface ProductsShowcaseProps {
	title: string
	data: any
	description: string
}

const Vacancies = ({ title, data, description }: ProductsShowcaseProps): JSX.Element => {
	return (
		<>
			<section className="w-full pb-28 -md:pb-5">
				<div className="container flex-cc flex-col w-full -md:px-5">
					<h2 className="text-4xl -md:text-2xl font-medium font-secondary -md:text-center -md:border-t border-black w-full -md:pt-6">{title}</h2>
					<p className="md:hidden mt-6">{description}</p>
					<ul className="grid grid-cols-4 -md:grid-cols-2 w-full gap-4 mt-14 text-center">
						{data.map((item, index) => (
							<Link href={'/careers/' + item.slug} key={index}>
								<li key={index}>
									<div className="h-100 -md:h-48 flex-ss flex-col px-6 py-9 -md:px-3 -md:py-4" style={{ backgroundColor: item.acf.card_color }}>
										<div className="text-xl -md:text-base font-bold">{item.acf.job_type}</div>
										<div className="text-5xl -md:text-2xl font-bold mt-8 -md:mt-2 text-left font-secondary leading-tight text-pink">{item.title.rendered}</div>
									</div>
								</li>
							</Link>
						))}
					</ul>
				</div>
			</section>
		</>
	);
};

export default Vacancies;