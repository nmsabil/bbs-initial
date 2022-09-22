import React from 'react';
import { SliceType } from '@core/prismic/client';
import TextWithCTA from '@components/TextWithCTA';
import { RichText } from 'prismic-reactjs';
interface Props {
	slice: SliceType
}

const CtaBox = ({ slice }: Props) => {
	const {title, desccription} = slice.primary;
	const cta = slice.items.map(item=>({
		cta_text : item.cta_label,
		cta_route : item.cta_url
	}));
	return (
		<TextWithCTA slice={slice} title={RichText.asText(title)} content={RichText.render(desccription)} cta={cta} />
	);
};

export default CtaBox;
