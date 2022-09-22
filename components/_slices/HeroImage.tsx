import React from 'react';
import Link from '@components/_shared/Link';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType
}

const HeroImage = ({ slice }: Props): JSX.Element => {
	const getJustifyAlign = (slice) => {
		switch (slice.primary.mobile_hero_title_position) {
			case 'top':
				return 'start';
			case 'middle':
				return 'center';
			case 'bottom':
			default:
				return 'end';
		}
	};

	const getMargin = () => {
		const margin = '-md:mx-auto ' +  (slice.primary.content_position == 'right' ? 'ml-auto -md:mr-auto' : (slice.primary.content_position == 'center' ? 'ml-auto mr-auto' : ''));
		return margin;
	};

	const getTabletMargin = ()  => {
		const margin = slice.primary.content_position == 'right' ? 'md:mr-5 xl:mr-auto' : (slice.primary.content_position == 'left' ? 'md:ml-5 xl:ml-auto' : '');
		return margin;
	};

	// const getLink = () => {
	// 	const link_type = slice.primary.link.link_type;
	// 	const link = link_type == 'Document' ? `/${slice.primary.link.uid}` : slice.primary.link.url;
	// 	return link;
	// };


	return (
		<>
			<div className="w-full overflow-hidden relative bg-violet h-160 hero">
				<div className={`-md:text-center md:text-${slice.primary.content_position} ${getTabletMargin()} container flex flex-col relative h-full pt-24-xl:px-5 -xl:pt-24 -md:pb-16 -md:px-8 md:justify-center justify-${getJustifyAlign(slice)} -xl:col -xl:max-w-2xl z-10`}>
					<h1 className={'uppercase font-bold text-white text-7.5xl xl:max-w-3xl -xl:text-5.5xl font-secondary -lg:w-130 -md:max-w-full -md:text-center ' + getMargin()}>
						{RichText.asText(slice.primary.title)}
					</h1>
					{slice.primary.subtitle && <p className={'text-2xl -lg:text-base font-medium text-white mt-4 -md:max-w-xs max-w-md ' + getMargin()}>{RichText.asText(slice.primary.subtitle)}</p>}
					<Link className={'-md:ml-auto -md:mr-auto flex ' + getMargin()} href={slice.primary.cta_url}>
						<button className="px-20 py-3 -lg:px-10 mt-12 -lg:mt-6 text-xl -lg:text-lg text-white rounded-full bg-pink">
							{RichText.asText(slice.primary.cta_text)}
						</button>
					</Link>
				</div>
				{ slice.primary.background_image.url && <img src={slice.primary.background_image.url} alt="background" className={`absolute bottom-0 object-cover object-bottom h-full w-full right-0 left-0 ${slice.primary.background_image_mobile?.url ? '-lg:hidden' : ''}`}/> }
				{ slice.primary.background_image_mobile?.url && <img src={slice.primary.background_image_mobile.url} alt="background" className="absolute bottom-0 object-cover object-bottom h-full w-full right-0 left-0 lg:hidden"/> }
			</div>
			<style jsx>{`
					@media(min-width:1024px){
						.hero {
							max-height: calc(95vh - 208px);
						}
						.md:text-right {
							text-align: right;
						}
						.md:text-center {
							text-align: center;
						}
					}
					@media(max-width:767px){
							.hero{
									height: calc(85vh - 80px);
							}
					}
			`}</style>
		</>
	);
};

export default HeroImage;
