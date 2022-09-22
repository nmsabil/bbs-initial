import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import { format } from 'date-fns';

interface Props {
	slice: SliceType
}

const RecipeDetails = ({ slice }: Props): JSX.Element => {
	return (
		<>
			<div className="px-4">
				<h1 className="capitalize font-secondary font-black text-4xl lg:text-5.5xl" >
					{RichText.asText(slice.primary.title)}
				</h1>
				<h3 className="mt-6 font-light">
					{format(new Date(slice.primary.date), 'dd/MM/yy')}
				</h3>
			</div>
		</>
	);
};

export default RecipeDetails;
