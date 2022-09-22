import React from 'react';
import { SliceType } from '@core/prismic/client';
import ShareButton from '@components/news/ShareButton';

interface Props {
	slice: SliceType
}

const SocialShare = ({ slice }: Props): JSX.Element => {
	return (
		<>
			<div className="px-4" >
				<section className="flex-ec border-t">
					<ShareButton title="Share" variant="recipe" />
				</section>
			</div>
		</>
	);
};

export default SocialShare;