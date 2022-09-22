import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType
}

const RecipeContent = ({ slice }: Props): JSX.Element => {
	return (
		<>
			<div className="px-4 font-light">
				<hr className="mb-6"/>
				<article className="wordpress rich-text">
					{RichText.render(slice.primary.content)}
				</article>
			</div>
		</>
	);
};

export default RecipeContent;
