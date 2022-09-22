import React from 'react';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { SliceType } from '@core/prismic/client';
import HeroImage from '@components/HeroImage';
import HeroText from '@components/HeroText';
interface Props {
	slice: SliceType
}

interface PrimaryProps{
  header_type: string,
  title: RichTextBlock[],
  background_color: string,
  title_color: string,
  image: {
    dimensions: { width: number, height: number },
    alt: null | string,
    copyright: null | string,
    url: string },
  image_mobile: {
    dimensions: { width: number, height: number },
    alt: null | string,
    copyright: null | string,
    url: string }
}

const SimpleHeader = ({ slice }: Props) => {
	const {background_color, title, header_type, image, image_mobile, title_color = '#FFF'} : PrimaryProps = slice.primary;

	if(header_type === 'image')
		return <HeroImage image={image.url} image_mobile={image_mobile.url} color={background_color} />;

	return <HeroText text={RichText.asText(title)} color={title_color} bgColor={background_color} />;

};

export default SimpleHeader;