import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import { format } from 'date-fns';
import ShareButton from './ShareButton';

interface Props {
	slice: SliceType;
}

const NewsContent = ({slice}: Props): JSX.Element => {
	const {title, date} = slice.primary;
	const contents = slice.items;
	return (
		<>
			<section className="w-full max-w-5xl mx-auto pt-16 relative">
				<div className="flex items-start">
					<ShareButton title={title} variant="sticky" />
					<div className="-sm:pr-8">
						<div className="sm:text-center max-w-md mx-auto">
							<div className="text-4xl font-secondary leading-normal uppercase mt-6 md:mt-0 rich-text">{RichText.render(title)}</div>
							<div className="text-xl mt-7 font-light">{format(new Date(date), 'dd/MM/yy')}</div>
						</div>
						<div className="mt-10 md:mt-24">
							{contents.map((item, i) => (
								<div key={i} className="w-full">
									{item.image.url && <img src={item.image.url} alt={item.image.alt} className="w-full mt-10" />}
									{item.pink_subheading.length !== 0 && (
										<div className="text-4xl font-secondary text-pink uppercase sm:text-center mt-14 mb-2 rich-text">
											{RichText.render(item.pink_subheading)}
										</div>
									)}
									{item.default_subheading.length !== 0 && (
										<div className="text-4xl font-secondary uppercase sm:text-center my-10 rich-text">
											{RichText.render(item.default_subheading)}
										</div>
									)}
									{item.text && (
										<div className={`font-light leading-normal space-y-4 max-w-3xl mx-auto mt-4 rich-text ${item.text_color === 'default' ? '' : 'text-pink'}`} style={{fontSize: '22px', maxWidth: '51rem'}}>
											{RichText.render(item.text)}
										</div>
									)}
								</div>
							))}
							<hr className="mt-20" />
							<ShareButton variant="normal" title={title} />
						</div>
					</div>

				</div>
			</section>
		</>
	);
};

export default NewsContent;
