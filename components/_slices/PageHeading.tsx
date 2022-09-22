import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType
}

const ClientList = ({ slice }: Props): JSX.Element => {
	return (
		<>
			<section className="w-full -lg:px-6">
				<div className="container max-w-5xl mt-20 flex-sc px-6 -md:px-3">
					<div className="-sm:text-left contact-header">
						<h1 className="text-4xl uppercase font-bold font-secondary mb-8">{RichText.asText(slice.primary.title)}</h1>
						<div className=" rich-text">
							{RichText.render(slice.primary.description)}
						</div>
					</div>
				</div>
				<style
					dangerouslySetInnerHTML={{
						__html: `
								.contact-header a {
										color: #FF5897;
										font-weight: bold;
										text-decoration: underline;
								}
								.contact-header p {
										font-weight: 300;
										max-width: 48rem;
										margin-bottom: 1rem;
								}
						`,
					}}
				/>
			</section>
		</>
	);
};

export default ClientList;
