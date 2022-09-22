import React from 'react';

interface Props {
	title: string;
	data: Array<{
		image_url: string;
		alt: string;
	}>
}

const Customers = ({ title, data }: Props): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:py-12">
				<div className="container flex-cc flex-col w-full -lg:px-5">
					<h2 className="text-3xl font-medium font-secondary -lg:text-xl">{title}</h2>
					<div className="grid grid-cols-5 gap-20 -md:gap-10 -md:grid-cols-3 mt-20 -md:max-w-xs" >
						{data.map((image, i) => (
							<div className="flex-cc" key={i} >
								<img src={image.image_url} alt={image.alt || 'customers'} />
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Customers;