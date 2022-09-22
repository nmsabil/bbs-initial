import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType
}

const List = ({ slice }: Props) => {
	return (
		<>
			<section className="w-full">
				<div className="container w-full max-w-4xl -lg:max-w-xs -lg:px-4 font-light">
					<div className="careers-list rich-text">{RichText.render(slice.primary.list)}</div>
				</div>
			</section>
			<style
				dangerouslySetInnerHTML={{
					__html: `
					.careers-list ul {
						list-style-position: inside;
						list-style-type: disc;
						margin-bottom: 1.5rem;
					}
				`,
				}}
			/>
		</>
	);
};

export default List;
