import React from 'react';

interface PageHeaderProps {
    title: string
    text?: string
	hideTextOnMobile?: boolean
}

const PageHeader = ({ title, text, hideTextOnMobile }: PageHeaderProps): JSX.Element => {
	return (
		<>
			<section className="w-full py-28 -lg:py-12">
				<div className="container flex-cc flex-col w-full -lg:px-5">
					<h1 className="text-5.5xl -lg:text-5.25xl font-bold font-secondary text-center">{ title }</h1>
					<p className={`text-2xl -lg:text-base mt-10 max-w-4xl text-center ${hideTextOnMobile ? '-md:hidden' : ''}`}>{ text }</p>
				</div>
			</section>
		</>
	);
};

export default PageHeader;