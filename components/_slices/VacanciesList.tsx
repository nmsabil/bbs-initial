import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import Link from '@components/_shared/Link';

interface CareersProps extends SliceType {
	careers: any[];
}

interface Props {
	slice: CareersProps
}

/**
 *	Grid vacancies list on careers page
 */

const Image = ({ slice }: Props) => {

	const getGridSize = (length) => {
		// return `grid-cols-${length < 4 ? length : '4'} -xl:grid-cols-${length < 3 ? length : '3'} -md:grid-cols-${length < 2 ? length : '2'}`;
		return 'grid-cols-4 -xl:grid-cols-3 -md:grid-cols-2';
	}

	return (
		<>
			<section className="w-full pb-20 -md:pb-5 -xl:px-8 -md:px-1 -xl:text-center">
				<div className="container flex-cc flex-col w-full -md:px-1">
					<h2 className="text-center text-4xl -md:text-2xl font-medium font-secondary -md:text-center -md:border-t border-black w-full -md:pt-6">{RichText.asText(slice.primary.title)}</h2>
					<p className="md:hidden mt-6"></p>
					<ul className={`grid w-full gap-4 -lg:gap-3 mt-14 text-center ${getGridSize(slice.items.length)}`}>
						{slice.items.map((item) => (
							slice.careers.filter(data => data.uid === item.job.uid).map((career, index) => (
								<Link href={career.route} key={index} className="m-auto w-full">
									<li key={index}>
										<div className="md:h-100 md:w-full -xl:h-64 -md:h-44 -md:w-full flex-ss flex-col px-6 py-9 -md:px-3 -md:py-4" style={{ backgroundColor: item.background_color }}>
											<div className="text-xl -md:text-base font-bold">{RichText.asText(item.job_type)}</div>
											<div className="text-3xl -md:text-2xl font-bold mt-8 -md:mt-2 text-left font-secondary max-w-vxs leading-tight" style={{ color: item.text_color }}>{career.html_title}</div>
										</div>
									</li>
								</Link>
							))
						))
						}
					</ul>
					{slice.items.length < 1 && <p className="text-2xl -lg:text-base font-light mt-6 max-w-2xl rich-text text-center">No vacancies right now.</p>}
				</div>
			</section>
			<style jsx>{`
					.w-100 {
						width: 25rem;
					}
			`}</style>
		</>
	);
};

export default Image;
